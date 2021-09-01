import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Popups.scss'
import {Button, Image} from "react-bootstrap";
import {isBookingVendor, isBookingVenue} from "../../../../redux/actions/transaction/transaction";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {getSingleEvent} from "../../../../services/EventService";
import {deleteEventCart} from "../../../../services/KeranjangService";
import UrlService from "../../../../services/UrlService";
import Swal from "sweetalert2";
import {getMoneyFormat} from "../../../../utilities/Utilities";

class PopupEO extends React.Component{
  state = {
    accessToken: this.props.accessToken,
    currentUser: this.props.currentUser,
    package_event_organizer: {
      package_event_organizer_description: [],
    },
  }

  async componentDidMount() {
    var package_id = this.props.data.package_event_organizer.package_event_organizer_id
    let response = await getSingleEvent(package_id)
    this.setState({package_event_organizer: response.data})
  }

  async onDeleteCartItem (){

    try{
      await deleteEventCart({'user_id':this.state.currentUser.user_id})
      window.location.reload()
    }catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something Wrong Happened',
        text: 'Please try again',
        timer: 3000,
      })
    }
  }

  onChangeEvent=()=>{
    this.props.isBookingVendor()
    this.props.isBookingVenue()
  }

  render(){
      return(
        <Popup trigger={<a className='primary-text small-grey-text small'> Lihat Detail</a>} modal>
            {close => (
              <div className='popup-eo'>
                <div className='for-close border-bottom' onClick={close}>
                    &times;
                </div>
                <img src={UrlService.getImageUrl(this.props.data.package_event_organizer.package_event_organizer_image)} alt="" className='rounded'/>
                <div className='px-1'>
                  <h4 className='bold-text m-0 mb-1 mt-2'>{this.props.data.package_event_organizer.package_event_organizer_name}</h4>
                  <p className='bold-text text-success m-0 mb-1'>{getMoneyFormat(this.props.data.package_event_organizer.package_event_organizer_price_promo)}</p>

                  <br/>

                  <h5>Deskripsi Paket</h5>
                  {this.state.package_event_organizer.package_event_organizer_description?.map(
                    (description, key) => (
                      <div key={key}>
                        <p className='m-0'>
                          {description.package_event_organizer_description_title}
                        </p>
                        <p className='small-italic-grey-text m-0 mb-1'>
                          {description.package_event_organizer_description_name}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <br/>

                {this.props.data.package_event_organizer_theme === "{}" || this.props.data.package_event_organizer_theme === null || this.props.data.package_event_organizer_theme.length === 0?
                  <div></div>
                  :
                  <div>
                    <p className='bold-text text-center'>Tema Dekorasi</p>

                    <div className='d-flex align-center'>
                      <Image
                        className='rounded mw-100 mb-3'
                        src={UrlService.getImageUrl(this.props.data.package_event_organizer_theme.package_event_organizer_theme_photo)}/>
                    </div>

                    <br/>
                    <p className='text-center text-info'>{this.props.data.package_event_organizer_theme.package_event_organizer_theme_name}</p>
                  </div>
                }
                {this.props.status ==="Pending" || this.props.status === "Problem" ?
                  <div>
                    <Link to={'/event-organizer'} className='bigger-text'>
                      <Button className='btn-success mb-2 w-100'onClick={()=>this.onChangeEvent()}>
                        Ubah Paket
                      </Button>
                    </Link>
                    <Link to={'/keranjang'}>
                      <Button className='btn-danger w-100' onClick={()=>this.onDeleteCartItem()}>
                        Hapus
                      </Button>
                    </Link>
                  </div>
                  :
                  <div>

                  </div>
                }

              </div>
            )}
        </Popup>
      )
    }
}

const mapStateToProps = state =>({
  accessToken: state.authentication.accessToken,
  currentUser: state.authentication.currentUser
})
export default connect(mapStateToProps, {isBookingVenue, isBookingVendor})(PopupEO);