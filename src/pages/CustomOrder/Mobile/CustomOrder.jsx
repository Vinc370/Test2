import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import PaperIcon from '../../../assets/icons/PaperIcon';
import RightArrowBold from '../../../assets/icons/RightArrowBold';
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2';
import Header from "../../../components/Header/Header";
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { addCustomOrderToCart, forceAddCustomOrderToCart } from "../../../services/TransactionService";
import UrlService from '../../../services/UrlService';
import { getDateFormat, getMoneyFormat } from '../../../utilities/Utilities';
import './CustomOrder.scss';

function CustomOrder({customOrder, error, notFound}){
    const [content, setContent] = useState(null)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    const addToCart = async () => {
        setIsLoading(true)
        try{
            await addCustomOrderToCart()
                .then((response) => {
                    history.push('/keranjang')
                })
                .catch((error) => {
                    if(error.response.status === 422) {
                      Swal.fire({
                        icon: 'warning',
                        title: error.response.data.message,
                        text: 'Jika kamu melanjutkan maka semua barang di keranjang akan dihapus dan digantikan dengan pesanan ini',
                        footer: '<a href="https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya mengalami kesulitan ketika ingin memesan event." target="_blank">Hubungi kami</a>',
                        showCancelButton: true,
                        confirmButtonText: 'Lanjutkan',
                        cancelButtonText: 'Kembali',
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          await forceAddCustomOrderToCart().then((res2) => {
                              history.push('/keranjang')
                          });
                        }
                      });
                    }
                  })
        }catch(err){
            
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (isLoading) {
            setContent(<LoadingSpinner className="mt-5" />)
            return
        }
        if (error) {
            setContent(<h1>Error occured, please reload the page</h1>)
            return
        }
        if (notFound) {
            history.push('/')
            return
        }
        if (customOrder) {
            setContent(
                <>
                    <Header/>
                    <HeaderNavigationV2
                        title={`Custom Order Request - ${customOrder?.custom_order_id}`}
                        isBlack
                    />
                    <div className='manage-custom-order'>
                        {/* <div className="up-bottom-margin"/> */}
                        <div className="container-custom-order general-desktop-container">
                            {/* <h5>Custom Order Request</h5> */}

                            <div className="custom-orders up-bottom-margin">
                                <h1 className="d-desktop page-title section-title__primary">
                                    Custom Order
                                </h1>
                                <div className="card mb-4">
                                    <div className="card-header d-flex justify-content-between">
                                        <div className="card-left font-weight-bold">{customOrder?.custom_order_id}</div>
                                        <div className="card-right">{getDateFormat(customOrder?.event.event_date, null, "dd", "mmmm", "yyyy")}</div>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item no-border-color">
                                            <strong>Customer Details</strong>
                                            <ul className="list-style-none">
                                                <li>{customOrder?.event.user.name}</li>
                                                <li>{customOrder?.event.user.email}</li>
                                                <li>{customOrder?.event.user.phone}</li>
                                            </ul>
                                        </li>
                                        <li className="list-group-item no-border-color">
                                            <strong>Lokasi Acara</strong>
                                            <h3>{customOrder?.event.event_location}</h3>
                                        </li>
                                    </ul>
                                </div>

                                <div className="order-details mb-4">
                                    <h5 className='section-title__primary'>Order Details</h5>
                                    <div className="items-container">
                                        <div className="item">
                                            <p className='m-0 d-flex justify-content-between'>
                                                <label>
                                                    {customOrder?.event_organizer.event_organizer_name+" "+customOrder?.package_event_organizer.package_event_organizer_name}
                                                </label>
                                                <label>
                                                    {getMoneyFormat(customOrder?.package_event_organizer.package_event_organizer_price_promo)}
                                                </label>
                                            </p>
                                            <p className=''>
                                                Lihat Detail
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='align-horizontally top-line d-mobile'>
                                    <div className='align-vertically width-50 text-right'/>
                                    <div className='align-vertically width-50 border-bottom'/>
                                </div>
                                <div className="d-flex justify-content-between total-container d-mobile">
                                    <h4 className="font-weight-bold">Total</h4>
                                    <h4 className="font-weight-bold">{getMoneyFormat(customOrder?.package_event_organizer.package_event_organizer_price_promo)}</h4>
                                </div>
                                <div className='align-horizontally bottom-line d-mobile'>
                                    <div className='align-vertically width-50 text-right'/>
                                    <div className='align-vertically width-50 border-bottom'/>
                                </div>

                                <div className="mb-4 attachment-container d-mobile">
                                    <h5 className='section-title__primary'>Attachment</h5>
                                    <a href={UrlService.getImageUrl(customOrder?.custom_order_attachment)} target="_blank" className="attachment-file">
                                        <PaperIcon className="attachment-file__icon" />
                                        <p className="attachment-file__name">
                                        {customOrder?.custom_order_attachment}
                                        </p>
                                        <RightArrowBold className="attachment-file__arrow" />
                                    </a>
                                </div>

                                <div className="mb-4 note-container">
                                    <p className='m-0 font-weight-bold d-flex justify-content-between'>
                                        <label>
                                            Note
                                        </label>
                                    </p>
                                    <p className='m-0 mb-1'>
                                        {customOrder?.custom_order_note}
                                    </p>
                                </div>

                                <div className="contact-us button-container d-mobile">
                                    <button className="btn-lc mb-3" onClick={()=>addToCart()}>
                                        Add to Cart
                                    </button>
                                    <button className="btn-lc-reverse">
                                        Contact Our Team
                                    </button>
                                </div>
                            </div>
                            <div className="total-card d-desktop">
                                <p className="title">
                                    Attachment
                                </p>
                                <a href={UrlService.getImageUrl(customOrder?.custom_order_attachment)}className="attachment-file">
                                    <PaperIcon className="attachment-file__icon" />
                                    <p className="attachment-file__name">
                                    {customOrder?.custom_order_attachment}
                                    </p>
                                    {/* <RightArrowBold className="attachment-file__arrow" /> */}
                                </a>
                                <div className="total-container">
                                    <p className="label">
                                        Total Price
                                    </p>
                                    <p className="amount">
                                        {getMoneyFormat(customOrder?.package_event_organizer.package_event_organizer_price_promo)}
                                    </p>
                                </div>
                                <div className="contact-us button-container">
                                    <button className="btn-lc mb-3" onClick={()=>addToCart()}>
                                        Add to Cart
                                    </button>
                                    <button className="btn-lc-reverse">
                                        Contact Our Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }, [customOrder, error, notFound])
    
    return(
        <main>
            {content}
        </main>
    );
    
}

const mapStateToProps = state => ({
    customOrder: state.customOrder?.data,
    error: state.customOrder?.error,
    notFound: state.customOrder?.notFound,
})

export default connect(mapStateToProps, null)(CustomOrder)