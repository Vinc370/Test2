import React  from 'react';
import "../Konfirmasi Pembayaran/KonfirmasiPembayaran.scss"
import { Image, Accordion, Card, Button, Form} from "react-bootstrap";
import HeaderNavigation from "../../../components/ForMobile/HeaderNavigation/HeaderNavigation";
import {FaAngleRight} from "react-icons/fa";
import PopupCancel from "./PopupCancel";
import Header from "../../../components/Header/Header";
import {connect} from 'react-redux'
import {cartConfirmationStatus} from "../../../services/KeranjangService";
import {confirmationOrder, payOrder} from "../../../services/OrderService";
import Swal from "sweetalert2";

class KonfirmasiPembayaran extends React.Component{

    state={
        sudah_pilih_method: false,
        method: "Bank Central Asia",
        imageObj:[],
        bukti_file:null,
        payment_transaction: this.props.payment_transaction,
        userData: this.props.currentUser.user_id
    }

    pilih_method=()=>{
        if(this.state.sudah_pilih_method === false) {
            this.setState({sudah_pilih_method: true})
        }else{
            this.setState({sudah_pilih_method: false})
        }
    }

    chosen_method=()=>{
        if(this.state.sudah_pilih_method === true){
            return this.state.method
        }else{
            return "Pilih Metode Pembayaran:"
        }
    }

    getCartTotalPrice=(transaction)=>{

        var eventPrice = 0
        var vendorPrice = 0
        var venuePrice = 0

        if(transaction.cart_event_organizer_detail.length !== 0){
            eventPrice = transaction.cart_event_organizer_detail[0].package_event_organizer.package_event_organizer_price
        }

        if(transaction.cart_vendor_detail.length !==0){
            transaction.cart_vendor_detail?.map((vendor)=>{
                vendorPrice += vendor.vendor_jasa.vendor_jasa_price
            })
        }

        if(transaction.cart_venue_detail.length !==0){
            venuePrice =transaction.cart_venue_detail[0].venue_package.venue_package_sell_price/transaction.cart_venue_detail[0].venue_package.venue_package_total_pax
        }

        return eventPrice + vendorPrice + venuePrice
    }

    getOrderTotalPrice=(transaction)=>{
        var eventPrice = 0
        var vendorPrice = 0
        var venuePrice = 0

        if(transaction.order_event_organizer.length !== 0){
            eventPrice = transaction.order_event_organizer[0].package_event_organizer.package_event_organizer_price
        }

        if(transaction.order_vendor.length !==0){
            transaction.order_vendor?.map((vendor)=>{
                vendorPrice += vendor.vendor_jasa.vendor_jasa_price
            })
        }

        if(transaction.order_venue.length !==0){
            venuePrice =transaction.order_venue[0].venue_package.venue_package_sell_price/transaction.order_venue[0].venue_package.venue_package_total_pax
        }

        return eventPrice + vendorPrice + venuePrice
    }

    view_method=()=>{
        if(this.state.sudah_pilih_method === false){
            return (
                <div className="align-horizontally">
                    <div className="metode" onClick={this.pilih_method}>
                        <Image
                          className='w-100 mb-1 image-account'
                          src={'https://cdn-2.tstatic.net/jogja/foto/bank/images/bank-bca.jpg'}
                        />
                        <br className='for-line'/>

                        <div className="align-horizontally">
                            <p>BCA</p>

                            <FaAngleRight className='for-icon'/>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="metode-terpilih">

                    <p className='ml-2'>No. Rekening: </p>
                    <p className='bold-text bigger-text m-2'>82827918273</p>
                    <p className='ml-2'>A/N PT Kreasi Inovasi Bangsa</p>
                    <div className="align-vertically align-center">

                        <br/>

                        <Accordion className='petunjuk-bayar'>
                            <Card>

                                <Accordion.Toggle as={Button} variant='link' eventKey="0" className='p-0 text-secondary'>
                                    <Card.Header>
                                        Petunjuk transfer (ATM)
                                    </Card.Header>
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Accusantium aliquid amet doloremque dolorum et facere, facilis
                                            ipsum quas sit vel. Beatae corporis culpa cum eos esse
                                            fugit nam quo tempore?
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>

                                <Accordion.Toggle as={Button} variant='link' eventKey="1" className='p-0 text-secondary'>
                                    <Card.Header>
                                        Petunjuk transfer (Klik BCA)
                                    </Card.Header>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            Accusantium aliquid amet doloremque dolorum et facere, facilis
                                            ipsum quas sit vel. Beatae corporis culpa cum eos esse
                                            fugit nam quo tempore?
                                        </p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <br/>
                        <button className='grey-button ' onClick={this.pilih_method}>Ubah Metode Pembayaran</button>
                        <br/>

                        <div className=''>
                            <Form.Label htmlFor="image-file">
                                <div
                                  role="button"
                                  className="signature-button"
                                >
                                    Unggah Bukti Pembayaran
                                </div>
                            </Form.Label>
                            <Form.Control
                              type="file"
                              className="d-none"
                              id="image-file"
                              accept="image/*"
                              onChange={(e)=>this.uploadFile(e)}
                              multiple
                            />
                        </div>
                        <Image src={this.state.imageObject} className='w-50 mt-2 mb-2'/>
                        {this.state.bukti_file !== null ?
                          <button className='green-button ' onClick={()=>this.uploadConfirmationData()}>Bayar Sekarang</button>
                            :
                          <div></div>
                        }

                        <PopupCancel/>
                    </div>
                </div>
            );
        }
    }

    uploadFile =(e)=>{
        const fileObj = e.target.files
        const imageObject = URL.createObjectURL(fileObj[0])

        var bukti_file = {
            path: e.target.files[0],
            src: URL.createObjectURL(e.target.files[0])
        }

        this.setState({imageObject: imageObject, bukti_file: bukti_file})
    }

    async uploadConfirmationData (){
        Swal.fire({
            icon: 'info',
            title:'Sedang Upload',
            text: 'Mohon tunggu beberapa saat, konfirmasi pembayaran sedang diupload.',
            timer: 10000,
        })

        var order_id= ''
        var from =''
        var description = this.props.payment_from;
        var isSuccess = false

        if(description === "Pelunasan DP"){
            order_id = this.state.payment_transaction.user_id
            from = 'cart'
        }else if(description === "Pelunasan Keseluruhan"){
            order_id = this.state.payment_transaction.order_id
            from = 'order'
        }

        var type ="BCA"
        var bodyFormData = new FormData();
        bodyFormData.set('order_id', order_id);
        bodyFormData.set('description', description);
        bodyFormData.set('type', type);
        bodyFormData.set('from', from);
        bodyFormData.append('bukti_file', this.state.bukti_file.path, this.state.bukti_file.src);
        bodyFormData.append('amount', 0)

        var orderFormData = new FormData()
        orderFormData.append('order_id', this.state.payment_transaction.order_id)

        var userFormData = new FormData()
        userFormData.append('user_id', this.state.userData)
        await payOrder(bodyFormData).then((res)=>{
            isSuccess = true
        })

        if(isSuccess && from === 'order'){
            try{
                await confirmationOrder(orderFormData).then((res)=>{
                    this.successConfirmation()
                })
            }catch (e) {
                Swal.fire({
                    icon: 'error',
                    title:'Something wrong happened',
                    text: 'Please try again',
                    timer: 3000,
                })
            }

        }else if(isSuccess && from === 'cart'){
            try{
                await cartConfirmationStatus(userFormData).then((res)=>{
                    this.successConfirmation()
                })
            }catch (e) {
                Swal.fire({
                    icon: 'error',
                    title:'Something wrong happened',
                    text: 'Please try again',
                    timer: 3000,
                })
            }

        }

    }

    successConfirmation = () =>{

        this.props.history.push('/keranjang')
    }

    render() {
        return(
          <div className='konfirmasi-pembayaran'>

              <Header/>
              <HeaderNavigation title='Pemesanan'/>

              <div className="up-bottom-padding">

                  <p className='small-italic-grey-text text-center'>Quotation number: {this.state.payment_transaction.order_id}</p>

                  <div className="total-bayar">
                      <React.Fragment>
                          {this.props.payment_from === "Pelunasan Keseluruhan"?
                            <p>Total Pelunasan: </p>
                            :
                            <p>Total Pembayaran DP: </p>
                          }
                      </React.Fragment>
                      <p className='bold-text bigger-text'>
                          {this.props.payment_from === "Pelunasan DP"?
                            <div>
                                Rp. {this.getCartTotalPrice(this.state.payment_transaction)/2}
                            </div>
                            :
                            <div>
                                Rp. {this.getOrderTotalPrice(this.state.payment_transaction)/2}
                            </div>
                          }
                      </p>
                      <p>
                          {this.props.payment_from === "Pelunasan DP"?
                            <div>
                                Rp. {this.getCartTotalPrice(this.state.payment_transaction)}
                            </div>
                            :
                            <div>
                                Rp. {this.getOrderTotalPrice(this.state.payment_transaction)}
                            </div>
                          }
                      </p>
                  </div>

                  <div className="metode-bayar up-bottom-margin">
                      <div>
                          <p className='bold-text ml-2'>{this.chosen_method()}</p>
                          <hr className='for-border'/>
                          {this.view_method()}
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

const mapStateToProps = state =>({
    payment_transaction: state.cart.payment_transaction,
    currentUser: state.authentication.currentUser,
    payment_from: state.cart.payment_from
})

export default connect(mapStateToProps, null)(KonfirmasiPembayaran);