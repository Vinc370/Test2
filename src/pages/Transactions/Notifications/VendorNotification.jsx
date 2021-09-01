import React from 'react'
import {connect} from 'react-redux'
import {Button} from "react-bootstrap";
import CustomImage from "../../../components/CustomImage/CustomImage";
import {FaMagic} from "react-icons/all";
import {isBookingVendor} from "../../../redux/actions/transaction/transaction";
import {getAllVendors} from "../../../services/VendorService";

class VendorNotification extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            vendors:[],
        }
    }
    async componentDidMount() {
        let response = await getAllVendors()
        this.setState({vendors: response.data})
    }
    skipVendor=()=>{
        this.props.isBookingVendor()
        if(this.props.transaction.have_seen_event === false){
            return this.props.history.push('/event-notification')
        }
        if(this.props.transaction.have_seen_venue === false){
            return this.props.history.push('/venue-notification')
        }
        return this.props.history.push('/keranjang')
    }
    render(){
        return(
            <div className='notifications'>

                <div className='event-notification'>
                    <div className="signature-color-background ">

                        <div className='py-5'>

                            <div className="align-vertically d-flex align-center">
                                <FaMagic size={50} className='text-white'/>
                            </div>
                            <br/>

                            <p className='text-white font-weight-bolder bigger-text text-center'>Temukan Beragam Beragam Kebutuhan Acara Lainnya! </p>
                            <p className='text-white text-center'>Cari kebutuhan vendor mulai dari kue, dress, makeup, hingga meja bundar!</p>

                            <br/>
                            <div className="image-container white-background m-auto p-3">
                                <div className="align-horizontally align-center vendor-acara">
                                    {this.state.vendors?.map((vendor, key) => (
                                        <CustomImage
                                            source={vendor.vendor_image}
                                            link={'/vendor/' + vendor.vendor_id}
                                        />
                                    ))}
                                </div>
                            </div>
                            <br/>

                            <div className="align-vertically d-flex align-center">
                                <Button className='alt-button' onClick={()=>this.props.history.push('/vendor')}> Lihat Vendor Acara </Button>
                            </div>
                            <br/>
                            <div className="align-vertically align-center">
                                <p style={{color: "white"}} className='small border-bottom' onClick={()=>this.skipVendor()}>Lewati</p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    transaction: state.transaction
})

export default connect(mapStateToProps, {isBookingVendor})(VendorNotification);