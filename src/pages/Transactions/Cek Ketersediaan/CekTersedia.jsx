import React  from 'react';
import {Container, Form} from "react-bootstrap";
import { GiBackwardTime } from "react-icons/gi";
import HeaderNavigation from "../../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import {domainLink} from "../../../sources/Variables";
import Header from "../../../components/Header/Header";
import {connect} from "react-redux";
import {cartProcessStatus, storeCartInformation} from "../../../services/KeranjangService";
import Footer from "../../../components/Footer/Footer";

class CekTersedia extends React.Component{

  state={
    userData: this.props.currentUser.user_id,
    phone_number: this.props.currentUser.phone,
  }

  handleInput=(name, input)=>{
    this.setState({
      [name]: input
    })
  }

  async insertInformation(){
    var formData = new FormData()
    formData.append('user_id', this.state.userData)
    formData.append('event_date', this.props.cart.event_date)
    formData.append('event_start_time', this.props.cart.event_start_time)
    formData.append('event_end_time', this.props.cart.event_end_time)
    formData.append('location',this.props.cart.event_location)
    formData.append('phone', this.state.phone_number)
    formData.append('status', 'Process');

    var userFormData = new FormData();
    userFormData.append('user_id', this.state.userData)

    try{
      await storeCartInformation(formData)
      await cartProcessStatus(userFormData)
    }catch(err){
      
    }

    window.location.href = this.getCurrentUrl() + '/keranjang'
  }

  getCurrentUrl = ()=>{
    var curr = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
    return curr
  }

  render() {
      return(
        <div className="proses-order">
            <Header/>
            <HeaderNavigation title='Transaksi'/>
            <Container>
                <div className="up-bottom-margin align-vertically align-center">
                    <GiBackwardTime size={200} className='text-secondary'/>
                    <p className='text-center bold-text text-secondary'>Menghubungi pihak yang bersangkutan..</p>

                    <div className="up-bottom-margin">
                        <p className='text-center'>
                            Tidak dapat menunggu? Jangan khawatir, tim kami akan menghubungi anda via WA setelah mendapat konfirmasi
                        </p>

                        <p className='bold-text'>Masukkan nomor handphone</p>
                        <Form.Control type='text' placeholder='08XX XXXX XXXX'
                            value={this.state.phone_number}
                            onChange={(e)=>this.handleInput('phone_number', e.target.value)}/>

                        <br/>

                        <div className="d-flex align-center">
                            <button className='alt-button' onClick={()=>this.insertInformation()}>Proses Pemesanan</button>
                        </div>

                    </div>
                </div>
            </Container>
          
        </div>
      );
  }
}

const mapStateToProps = state =>({
  currentUser: state.authentication.currentUser,
  cart: state.cart
})
export default connect(mapStateToProps, null)(CekTersedia);