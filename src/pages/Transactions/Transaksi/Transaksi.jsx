import React from 'react';
import {Container, Form} from "react-bootstrap";
import "../Transaksi/Transaksi.scss"
import HeaderNavigation from "../../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import Header from "../../../components/Header/Header";
import {connect} from 'react-redux';
import {downPaymentCart} from "../../../services/KeranjangService";

class Transaksi extends React.Component{
    state={
        name: this.props.currentUser.name,
        ktp:this.props.currentUser.nik,
        email:this.props.currentUser.email,
        userData: this.props.currentUser.user_id
    }

    handleInput=(name,input)=>{
        this.setState({
            [name]:input
        })
    }

    handleUploadData=()=>{
        downPaymentCart().then(function (res) {
            window.open(res,'_blank');
            window.location.reload();
        });
    }

    render() {
        return(
          <div className="transaksi">
              <Header/>
              <HeaderNavigation title='Informasi Pemesan'/>

              <Container className='pt-3 pb-3 mt-5 mb-5'>
                  <div className="masuk-sebagai mb-5">
                      <p>Masuk sebagai {this.props.currentUser.name}</p>
                  </div>
                  <p className='text-center bold-text'>Silahkan isi data untuk keranjang</p>
                  <Form>
                      <Form.Group >
                          <Form.Label>No KTP</Form.Label>
                          <Form.Control type="text"
                            value={this.state.ktp}
                            onChange={(e)=>this.handleInput('ktp', e.currentTarget.value)}/>
                      </Form.Group>
                      <Form.Group >
                          <Form.Label>Nama Pemesan</Form.Label>
                          <Form.Control type="text"
                            value={this.state.name}
                            onChange={(e)=>this.handleInput('name', e.currentTarget.value)}/>
                      </Form.Group>
                      <Form.Group >
                          <Form.Label>Email Pemesan</Form.Label>
                          <Form.Control type="text"
                            value={this.state.email}
                            onChange={(e)=>this.handleInput('email', e.currentTarget.value)}/>
                      </Form.Group>
                  </Form>

                  <div className="align-vertically align-center">
                      <button className='alt-button' onClick={()=>this.handleUploadData()}>
                          Lanjutkan ke pembayaran
                      </button>
                  </div>
              </Container>
          </div>
        );
    }

}

const mapStateToProps = state=>({
    currentUser: state.authentication.currentUser
})

export default connect(mapStateToProps, null)(Transaksi);