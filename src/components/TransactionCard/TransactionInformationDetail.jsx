import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import EventCard from '../../pages/Account/Akun Saya/Components/EventCard/EventCard';
import NormalVendorPopup from '../../pages/Vendor Pages/PopupsForMobile/NormalVendorPopup';
import QuantityVendorPopup from '../../pages/Vendor Pages/PopupsForMobile/QuantityVendorPopup';
import ThemeVendorPopup from '../../pages/Vendor Pages/PopupsForMobile/ThemeVendorPopup';
import UrlService from '../../services/UrlService';
import { getDateFormat, getMoneyFormat } from '../../utilities/Utilities';
import './TransactionInformationDetail.scss';

function TransactionInformationDetail({user_event, informasiAcaraClick, event_organizer_detail, vendor_detail, keranjang=false}) {

  return (
    <>
      <div className="keranjang transaction-information">
        <div className="keranjang-form">
          {/* informasi acara */}
          <div>
            <div className=''>
              <Form.Label>Informasi Acara</Form.Label>
              <EventCard
                filled={
                  user_event === null ? 
                  ['Tambahkan Informasi Acaramu'] :
                  [
                    user_event?.event_organizer?.event_organizer_name,
                    getDateFormat(user_event?.event_date),
                    user_event?.event_location
                  ]
                }
                action={informasiAcaraClick}
              />
              <div>
              </div>
            </div>
          </div>

          {/* event organizer */}
          <div className="cart-item cart-item__container">
            {event_organizer_detail?.map((item, k)=>(
              <div className='cart-item__content align-horizontally mt-3' key={k}>
                <div className='align-vertically width-75'>
                  <p className='bold-text cart-item__name'>
                    {item.event_organizer.event_organizer_name+" - "+item.package_event_organizer.package_event_organizer_name}
                  </p>
                  <div>
                    <a href={UrlService.getImageUrl(item.attachment)} target="_blank" className='primary-text' style={{color: '#007bff'}}> Lihat Detail</a>
                  </div>
                </div>
                <div className='cart-item__price align-vertically width-25 text-right'>
                  <p>
                    {getMoneyFormat(item.package_event_organizer.package_event_organizer_price_promo)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/*for vendor*/}
          {vendor_detail?.length === 0?
              <div/>
              :
              <div className="cart-item cart-item__container">
                {vendor_detail?.map((vendor, key)=>(
                    <div className='cart-item__content align-horizontally' key={key}>
                      <div className='align-vertically width-75'>
                        <p className='bold-text cart-item__name'>
                        {vendor.vendor.vendor_name} - {vendor.vendor_jasa.vendor_jasa_name} - {vendor.vendor_qty} pax
                        </p>
                        {vendor.vendor_jasa.vendor_jasa_type === "variation" ?
                            <ThemeVendorPopup service={vendor.vendor_jasa} uses={'keranjang'} cart_vendor_detail_id={vendor.cart_vendor_detail_id} variation={vendor.vendor_jasa_variation} action={keranjang}/>
                            :
                            <>
                              {vendor.vendor_jasa.vendor_jasa_type === "counter" ?
                                  <QuantityVendorPopup service={vendor.vendor_jasa} uses={'keranjang'} cart_vendor_detail_id={vendor.cart_vendor_detail_id} vendor_qty = {vendor.vendor_qty} action={keranjang}/>
                                  :
                                  <NormalVendorPopup service={vendor.vendor_jasa} uses={'keranjang'} cart_vendor_detail_id={vendor.cart_vendor_detail_id} action={keranjang}/>
                              }
                            </>
                        }
                      </div>
                      <div className='cart-item__price align-vertically width-25 text-right'>
                        <p>{getMoneyFormat(vendor.vendor_jasa.vendor_jasa_price * vendor.vendor_qty)}</p>
                      </div>
                    </div>
                ))}
              </div>
            }
        </div>
      </div>
    </>
  )
}

export default connect(null, null)(TransactionInformationDetail)