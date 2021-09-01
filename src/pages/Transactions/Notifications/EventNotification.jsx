import React from 'react'
import {connect} from 'react-redux'
import ImageSlider from "../../../components/Carousel/HorizontalSlider";
import {FaMicrophone} from "react-icons/all";
import {isBookingEvent} from "../../../redux/actions/transaction/transaction";
import {getPopularEvents} from "../../../services/EventService";

class EventNotification extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            event_organizers: [],
        }
    }

    async componentDidMount() {
        let response = await getPopularEvents();
        this.setState({event_organizers: response.data})
    }

    skipEvent=()=>{
        this.props.isBookingEvent()
        if(this.props.transaction.have_seen_venue === false){
            return this.props.history.push('/venue-notification')
        }
        if(this.props.transaction.have_seen_vendor === false){
            return this.props.history.push('/vendor-notification')
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
                                <FaMicrophone size={50} className='text-white'/>
                            </div>
                            <br/>

                            <p className='text-white font-weight-bolder bigger-text text-center'>Temukan Beragam Event Organizer Yang Menarik untuk Acaramu!</p>
                            <p className='text-white text-center'>Cari event organizer berdasarkan tema, gaya acara yang sesuai dengan kamu dan promo!</p>

                            <br/>
                            <div className="image-container white-background m-auto p-3">
                                <ImageSlider contents={this.state.event_organizers} type={'event'}/>
                            </div>
                            <br/>

                            <div className="align-vertically d-flex align-center">
                                <button className='alt-button' onClick={()=>this.props.history.push('/event-organizer')}> Lihat EO yang tersedia </button>
                            </div>
                            <br/>
                            <div className="align-vertically align-center">
                                <p style={{color: "white"}} className='small border-bottom' onClick={()=>this.skipEvent()}>Lewati</p>
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

export default connect(mapStateToProps, {isBookingEvent})(EventNotification);