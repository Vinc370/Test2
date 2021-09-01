import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Popups.scss';
import {FaPlus, FaMinus} from "react-icons/fa";
import {Button, Form} from "react-bootstrap";
import {isBookingEvent, isBookingVendor} from "../../../../redux/actions/transaction/transaction";
import {Link} from "react-router-dom";
import {deleteVenueCart, updateVenueGuest} from "../../../../services/KeranjangService";
import {connect} from 'react-redux'
import Swal from "sweetalert2";
import UrlService from "../../../../services/UrlService";

class PopupVenue extends React.Component{

  state={
    userData:this.props.currentUser.user_id,
    total_guest: this.props.data.total_guest
  }

  async onDeleteCartItem (){
    var formData= new FormData();
    formData.append('user_id', this.state.userData)

    let res = {}
    try{
      res = await deleteVenueCart(formData)
    }catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something Wrong Happened',
        text: 'Please try again',
        timer: 3000,
      })
    }
    if(res.data === 'success'){
      window.location.reload()
    }
  }

  onChangeVenue=()=>{
    this.props.isBookingEvent()
    this.props.isBookingVendor()
  }

  addPax=()=>{
    this.setState({
      total_guest: this.state.total_guest + 1
    })
  }

  decreasePax=()=>{
    if(this.props.data.venue_package.venue_package_minimum_pax < this.state.total_guest){
      this.setState({
        total_guest: this.state.total_guest - 1
      })
    }
  }

  async onChangeQuantity(){
    var formData= new FormData();
    formData.append('user_id', this.state.userData)
    formData.append('total_guest', this.state.total_guest)

    let res ={}
      try{
      res = await updateVenueGuest(formData)
    }catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Something Wrong Happened',
        text: 'Please try again',
        timer: 3000,
      })
    }
    if(res.data === 'success'){
      window.location.reload()
    }
  }

  countVenueAddonsPrice =(venue_addons)=>{
    var totalPrice = 0
    if(venue_addons !== null && venue_addons.length !== 0 && venue_addons !== undefined){
      for(var i = 0; i < venue_addons.length; i++){
        totalPrice += parseInt(venue_addons[i].venue_addons_price)
      }
    }
    return totalPrice
  }

  render() {
      let venue_price= (this.props.data.venue_package.venue_package_sell_price / this.props.data.venue_package.venue_package_total_pax) * this.props.data.total_guest
      let service_venue_price = ((this.props.data.venue_package.venue_package_sell_price / this.props.data.venue_package.venue_package_total_pax) * this.props.data.total_guest*this.props.data.venue.venue_service_charge)/100
      let addons_price = this.countVenueAddonsPrice(this.props.data.venue_addons)
      return(
        <Popup trigger={<a className='primary-text' style={{color: '#007bff'}}> Lihat Detail</a>} modal>
            {close => (
              <div className='popup-resto'>
                  <div className='for-close ' onClick={close}>
                      &times;
                  </div>
                  <img src={UrlService.getImageUrl(this.props.data.venue.venue_image[1])} alt='' className='rounded w-100'/>
                  <h4 className='bold-text py-3'>{this.props.data.venue.venue_name}</h4>
                  <p className=''>{this.props.data.venue.venue_address}</p>

                  <div className="grey-box">
                    <h5>Pembayaran Restoran</h5>
                    <br/>

                    <div className="align-horizontally for-menu">
                      <div className="right">
                        <p className='bold-text'>{this.props.data.venue_package.venue_package_name} - {this.props.data.total_guest} pax</p>
                      </div>
                      <div className="left align-right">
                        <p className=''>Rp. {venue_price}</p>
                      </div>
                    </div>

                    {this.props.data.venue_addons === null || this.props.data.venue_addons === undefined || this.props.data.venue_addons.length === 0?
                      <div/>
                      :
                      <React.Fragment>
                        {this.props.data.venue_addons?.map((addons)=>(
                          <div>
                            <div className="align-horizontally for-menu">
                              <div className='right' >
                                <p className='bold-text m-0'>Venue addons: </p>
                              </div>
                            </div>
                            <div className="align-horizontally for-menu">
                              <div className="right">
                                <p className='bold-text m-0'> - {addons.venue_addons_name}</p>
                              </div>
                              <div className="left align-right">
                                <p className=' m-0'> Rp. {addons.venue_addons_price} </p>
                              </div>
                            </div>
                          </div>

                        ))}
                      </React.Fragment>
                    }
                    <br/>

                    <div className="align-horizontally for-menu">
                      <div className="right">
                        <p className='bold-text'>Service Charge Restoran ({this.props.data.venue.venue_service_charge}%)</p>
                      </div>
                      <div className="left align-right">
                        <p className=' border-bottom-black'> Rp. {service_venue_price} </p>
                      </div>
                    </div>

                    <div className="align-horizontally for-menu">
                      <div className='right' >
                        <p className='bold-text'>Total</p>
                      </div>

                      <div className='align-right left'>
                        <p className=''>Rp. {venue_price + service_venue_price + parseInt(addons_price)}</p>
                      </div>
                    </div>

                  </div>

                  <br/>
                  <div className="centering-text border-bottom">
                      <h4 className='bold-text border-bottom'>{this.props.data.venue_package.venue_package_name}</h4>
                      <h5>Rp {this.props.data.venue_package.venue_package_sell_price / this.props.data.venue_package.venue_package_total_pax}/++</h5>
                      <br/>
                      <p>{this.props.data.venue_package.venue_package_detail}</p>
                  </div>
                  <br/>

                  <div className="align-horizontally align-center">
                    <FaMinus className='m-1 font-signature-color' onClick={()=>this.decreasePax()}/>
                    <Form.Control type="number" className='w-25 text-center' value={this.state.total_guest}/>
                    <FaPlus className='m-1 font-signature-color' onClick={()=>this.addPax()}/>
                  </div>
                  <br/>

                  {this.props.data.status === "Pending" || this.props.data.status === "Problem"?
                    <div>
                      <Button className='btn-warning w-100 mb-2' onClick={()=>this.onChangeQuantity()}>Ganti Kuantitas</Button>
                      <br/>
                      <Button className='btn-info w-100 mb-2 ' onClick={()=>this.onChangeVenue()}>
                        <Link to={'/venue'} className=''>
                          Ganti Restoran
                        </Link>
                      </Button>
                      <br/>
                      <Button className='btn-danger mb-2 w-100' onClick={()=>this.onDeleteCartItem()}>Hapus</Button>
                    </div>
                    :
                    <div></div>
                  }

              </div>
            )}
        </Popup>
      )
    }
}

const mapStateToProps = state =>({
  currentUser: state.authentication.currentUser
})
export default connect(mapStateToProps, {isBookingVendor, isBookingEvent})(PopupVenue)