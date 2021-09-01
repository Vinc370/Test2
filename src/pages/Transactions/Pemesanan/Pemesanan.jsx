import React from 'react';
import { Image } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationAlertIcon from '../../../assets/icons/NotificationAlertIcon';
import Logo from "../../../assets/images/Logo.png";
import NavigationBar from "../../../components/ForMobile/NavigationBar/NavigationBar";
import Header from "../../../components/Header/Header";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { setInitialState } from "../../../redux/actions/transaction/transaction";
import { getUserCart } from "../../../services/KeranjangService";
import "../Pemesanan/Pemesanan.scss";
import DraftForm from "./DraftForm";
import EmptyCart from "../../../assets/images/keranjang-kosong.png";

class Pemesanan extends React.Component{
    state={
      chosen:"draft",
      leftOption:"active-border",
      currentUser: this.props.currentUser,
      rightOption:'',
      leftButton: "grey-button",
      rightButton: "white-button",
      detailCartId: 0,
      accessToken: this.props.accessToken,
      customOrder: this.props.customOrder,
      carts:[],
      checkNum:"",
      contents: <LoadingSpinner />
    }

    state_draft = () =>{
        this.setState({chosen: "draft",leftOption: "active-border", rightOption:"", leftButton: "grey-button", rightButton: "white-button"});
    }

    state_active_transactions = () => {
        this.setState({chosen: "transactions", leftOption:'', rightOption:"active-border", leftButton: "white-button", rightButton: "grey-button"});
    }

    state_keranjang_berjalan = () => {
        this.setState({chosen: "keranjang-berjalan"})
    }

    handleChange=(name,value)=>{
      value = value.replace(/,/g, "");
      const x = Number(value);
      this.setState({
        [name]: x.toLocaleString()
      })
    }

    renderEmptyCart = () =>{
      return(
        <div>
          <div className='up-bottom-margin d-flex flex-column align-center'>
            <Image src={EmptyCart} className='mw-100 img-transparent' style={{height: "20em"}}/>
            <p className='text-center'>Pemesananmu masih kosong! Yuk buat acara!</p>
          </div>
        </div>
      )
    }

    viewState = () => {
      let carts = this.state.carts

      if(this.state.chosen === "draft"){
          return(
            <React.Fragment>
              {
                this.props.customOrder !== "" && this.props.customOrder !== null &&
                <div className="keranjang-information-container small font-weight-bold d-flex m-3 p-2 rounded align-items-center">
                  <div className="px-2">
                    <NotificationAlertIcon string="!"/>
                  </div>
                  <div>
                    Anda menerima penawaran khusus dari tim kami <br />
                    <a href={'custom-order/'+this.props.customOrder.custom_order_id} className="text-danger">klik disini</a>
                  </div>
                </div>
              }
              {carts != null ?
                <React.Fragment>
                  {carts.cart_vendor_detail !== undefined || carts.cart_venue_detail !== undefined || carts.cart_event_organizer_detail !== undefined ?
                    <React.Fragment>
                      {carts.cart_vendor_detail.length > 0 || carts.cart_event_organizer_detail.length > 0 || carts.cart_venue_detail.length > 0?
                        <div>
                          <DraftForm carts={carts}/>
                        </div>
                        :
                        <React.Fragment>
                          {this.renderEmptyCart()}
                        </React.Fragment>
                      }
                    </React.Fragment>
                    :
                    <React.Fragment>
                      {this.renderEmptyCart()}
                    </React.Fragment>
                  }
                </React.Fragment>
                :
                <React.Fragment>{this.renderEmptyCart()}</React.Fragment>
              }
            </React.Fragment>
          );
      }
    }

    async componentDidMount() {
      let response = await getUserCart()
      this.setState({carts: response.data})

      this.props.setInitialState()
    }

    render() {
      return(
        <div className='min-height-95'>
          <Header
            showNewMobile
            type="white"
          />
          <div className='keranjang'>
            {/* <HeaderNavigation title='Keranjang Saya'/> */}

            <div className='container-keranjang general-desktop-container mt-lg-5'>
              <div className='align-horizontally'>
                <div className="w-100">
                  <h1 className="page-title section-title__primary d-desktop">
                    Pemesanan
                  </h1>
                  {/* <div className='align-horizontally for-options'>
                    <div className={"for-button d-flex align-items-center mr-2 " + this.state.leftOption}>
                      <button className={this.state.leftButton+' m-auto'} onClick={this.state_draft}>Pemesanan Baru</button>
                    </div>
                    <div className="vl">
                    </div>
                    <div className={"for-button d-flex align-items-center mr-2 " + this.state.rightOption}>
                      <button className={this.state.rightButton+' m-auto'} onClick={this.state_active_transactions}>Pemesanan Aktif</button>
                    </div>
                  </div> */}

                  {/* <hr className='horizontal-line'/>
                  <div className="up-bottom-margin"></div> */}
                  {this.viewState()}

                </div>

                {/* <Col sm={4} className='information-box'>
                  <CardNoImage
                    title='Cara Memesan'
                    text='Anda dapat melakukan meeting dan berkonsultasi terlebih dahulu bersama sales kami / langsung melakukan transaksi di website'
                    link='Butuh bantuan? Hubungi CS kami'
                    linkDestination='https://littlecloudeo.com/company/tutorial'
                  />

                  <CardNoImage
                    title='Kebijakan Pembatalan'
                    text='Apabila anda sudah melakukan transaksi melalui website kami dan anda ingin membatalkan transaksi tersebut, anda dapat melihat kebijakan pembatalan kami'
                    link='Lihat kebijakan pembatalan'
                    linkDestination='https://littlecloudeo.com/company/2020/12/11/kebijakan-pembatalan/'
                  />
                </Col> */}
              </div>
            </div>

            {/*  */}
            <NavigationBar
              active="keranjang"
            />
          </div>
        </div>
        );
    }
}

const mapStateToProps = state =>({
  accessToken: state.authentication.accessToken,
  currentUser: state.authentication.currentUser,
  customOrder: state.authentication.customOrder
})

export default connect(mapStateToProps, {setInitialState})(Pemesanan);