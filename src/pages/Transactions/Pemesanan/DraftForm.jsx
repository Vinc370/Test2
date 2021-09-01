import React, { useEffect, useState } from 'react';
import { FaMoneyCheck } from "react-icons/fa";
import { connect } from "react-redux";
import { Link, useHistory, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../../components/Button/Button';
import TransactionInformationDetail from '../../../components/TransactionCard/TransactionInformationDetail';
import { setInformasiAcaraOrigin } from "../../../redux/actions/event/event";
import { downPaymentCart, getCartInformation, getCartNominal } from "../../../services/KeranjangService";
import { getMoneyFormat } from "../../../utilities/Utilities";

const DraftForm = ({setInformasiAcaraOrigin, carts}) => {
  const history = useHistory();

  const [current_chosen_user_event, setCurrentChosenUserEvent] = useState(null);
  const [cart_information, setCartInformation] = useState(null);
  const [cart_nominal, setCartNominal] = useState({total: 0, dp: 0});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCartInformation().then((response) => { 
      setCartInformation(response.data);

      if(response.data !== "") {
        setCurrentChosenUserEvent(response.data.event)
      }
    });

    getCartNominal().then((response) => {setCartNominal(response.data)})
  }, []);

  const handleContinuePayment=async(e)=>{
    e.preventDefault();
    
    setIsLoading(true)

    await downPaymentCart()
      .then(function (res) {
        window.open(res.data,'_blank');
        history.push('/akun');
      })
      .catch(function (error) {
        if(error.response.status === 422) {
          Swal.fire({
            icon: 'warning',
            title: error.response.data.message.title,
            text: error.response.data.message.text,
            footer: '<a href="https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya mengalami kesulitan ketika ingin memesan." target="_blank">Hubungi kami</a>',
          });
        }
      });

    setIsLoading(false)
  };

  const chooseInformasiAcara = () => {
    setInformasiAcaraOrigin('keranjang')
    history.push('/event-saya')
  }

  return(
    <form className='keranjang-form' onSubmit={(e)=>handleContinuePayment(e)}>
        <div className="left">

          {/*for venue, NO ORDER FOR VENUE ANYMORE*/}
          {/*{this.props.carts.cart_venue_detail.length === 0?*/}
          {/*  <div/>*/}
          {/*  :*/}
          {/*  <div className='align-horizontally up-bottom-margin'>*/}
          {/*    <div className='align-vertically width-75'>*/}
          {/*      <p className='bold-text'>*/}
          {/*        {this.props.carts.cart_venue_detail[0].venue.venue_name} - {this.props.carts.cart_venue_detail[0].total_guest} pax*/}
          {/*      </p>*/}
          {/*      <PopupVenue data={this.props.carts.cart_venue_detail[0]} status = {this.state.result_status}/>*/}
          {/*    </div>*/}
          {/*    <div className='align-vertically width-25 text-right'>*/}
          {/*      <p>Rp. {this.props.carts.cart_venue_detail[0].venue_package.venue_package_sell_price * this.props.carts.cart_venue_detail[0].total_guest + (((this.props.carts.cart_venue_detail[0].venue_package.venue_package_sell_price * this.props.carts.cart_venue_detail[0].total_guest)*this.props.carts.cart_venue_detail[0].venue.venue_service_charge)/100)}</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*}*/}

          <TransactionInformationDetail
            event_organizer_detail = {carts.cart_event_organizer_detail}
            vendor_detail = {carts.cart_vendor_detail}
            informasiAcaraClick = {isLoading==false?chooseInformasiAcara:()=>{}}
            user_event = {current_chosen_user_event}
            keranjang={true}
          />

        </div>
        <div className="right">
          <div className="desktop-card">
            {/* {
              this.state.promo_code &&
              <div className="used_promo">
                <p>
                  Promo {this.state.promo_code}
                </p>
                <p>
                  - Rp 2.000.000
                </p>
              </div>
            } */}

            <div className='align-horizontally d-mobile'>
              <div className='align-vertically width-25 text-right'/>
              <div className='align-vertically width-75 border-bottom'/>
            </div>

            <div className='align-horizontally cart-total-amount'>
              <div className='cart-total-amount__label'>
                <p  className='bold-text'>Total</p>
              </div>
              <div className='cart-total-amount__amount'>
                <p  className='bold-text'>{getMoneyFormat(cart_nominal?.total)}</p>
              </div>
            </div>

            <div className='align-horizontally d-mobile'>
              <div className='align-vertically width-25 text-right'/>
              <div className='align-vertically width-75 border-bottom'/>

            </div>
            <br className="d-mobile" />

            <p>
              <FaMoneyCheck className='font-signature-color'/> &nbsp;
              &nbsp;
              Nominal Awal yang harus dibayarkan
            </p>
            <p className='input-text'>
              {getMoneyFormat(cart_nominal.dp)}
            </p>

            <p className="info d-mobile">
              Minimum Down Payment Required is 30%<br/>
              Read our full Terms of Service in here
            </p>

            {/* TODO: --demas-- belum ada fungsionalitasnya */}
            <Button 
                color="signature"
                text="Lanjutkan ke Pembayaran"
                type="submit"
                className="px-5 mb-1 w-100"
                disabled={isLoading}
            />

            <Link to="/request-meeting" className='small-italic-grey-text d-mobile'>
              <p>Untuk konsultasi & pertanyaan, hubungi tim kami disini</p>
            </Link>
          </div>

          <p className="info d-desktop">
            Minimum Down Payment Required is 30%<br/>
            Read our full Terms of Service in here
          </p>
            </div>
            <br className="d-mobile" />
    </form>
  );
}

const mapStateToProps = state =>({
  currentUser: state.authentication.currentUser
})

export default withRouter(connect(mapStateToProps, {setInformasiAcaraOrigin})(DraftForm))