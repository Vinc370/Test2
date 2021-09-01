import React from 'react'
import './Notifications.scss'
import {Button} from "react-bootstrap";
import {connect} from 'react-redux'
import ImageSlider from "../../../components/Carousel/HorizontalSlider";
import {FaMapMarkedAlt} from "react-icons/all";
import {isBookingVenue} from "../../../redux/actions/transaction/transaction";
import {getAllVenues} from "../../../services/VenueService";

class VenueNotification extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            venues: [],
        }
    }

    async componentDidMount() {
        let response = await getAllVenues()
        this.setState({venues: response})
    }

    skipVenue=()=>{
        this.props.isBookingVenue()
        if(this.props.transaction.have_seen_vendor === false){
           return this.props.history.push('/vendor-notification')
        }
        if(this.props.transaction.have_seen_event === false){
            return this.props.history.push('/event-notification')
        }
        return this.props.history.push('/keranjang')
    }

    render(){
        return(
            <div className='notifications'>

                <div className='venue-notification'>

                    <div className="signature-color-background ">

                        <div className='py-5'>

                            <div className="align-vertically d-flex align-center">
                                <FaMapMarkedAlt size={50} className='text-white'/>
                            </div>
                            <br/>

                            <p className='text-white font-weight-bolder bigger-text text-center'>Temukan Beragam Promo dan Tempat Yang Menarik untuk Acaramu!</p>
                            <p className='text-white text-center'>Cari tempat berdasarkan lokasi, harga, kapasitas, gaya restoran dan promo!</p>

                            <br/>
                            <div className="image-container white-background m-auto p-3">
                                <ImageSlider contents={this.state.venues} type={'venue'}/>
                            </div>
                            <br/>

                            <div className="align-vertically d-flex align-center">
                                <Button className='alt-button' onClick={()=>this.props.history.push('/venue')}> Lihat Restoran & Hotel </Button>
                            </div>
                            <br/>
                            <div className="align-vertically align-center" >
                                <p onClick={()=>this.skipVenue()}
                                   style={{color: "white"}} className='small border-bottom'>
                                    Lewati
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps =state =>({
    transaction: state.transaction
})
export default connect(mapStateToProps, {isBookingVenue})(VenueNotification);