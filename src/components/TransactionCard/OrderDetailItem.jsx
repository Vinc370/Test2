import { connect } from "react-redux"
import NormalVendorPopup from "../../pages/Vendor Pages/PopupsForMobile/NormalVendorPopup"
import QuantityVendorPopup from "../../pages/Vendor Pages/PopupsForMobile/QuantityVendorPopup"
import ThemeVendorPopup from "../../pages/Vendor Pages/PopupsForMobile/ThemeVendorPopup"
import UrlService from "../../services/UrlService"
import { getMoneyFormat } from "../../utilities/Utilities"

function OrderDetailItem({order, percentage=100}) {
  percentage = parseInt(percentage)

  return (
    <>
      <div className="keranjang transaction-information">

          {/* event organizer */}
          <div className="cart-item cart-item__container">
            {order?.order_event_organizer?.map((item, k)=>(
              <div className='cart-item__content align-horizontally' key={k}>
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
                    {getMoneyFormat(item.package_event_organizer.package_event_organizer_price_promo * (percentage/100))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/*for vendor*/}
          {order?.order_vendor?.length === 0?
              <div/>
              :
              <div className="cart-item cart-item__container">
                {order?.order_vendor?.map((vendor, key)=>(
                    <div className='cart-item__content align-horizontally' key={key}>
                      <div className='align-vertically width-75'>
                        <p className='bold-text cart-item__name'>
                        {vendor.vendor.vendor_name} - {vendor.vendor_jasa.vendor_jasa_name} - {vendor.vendor_qty} pax
                        </p>
                        {vendor.vendor_jasa.vendor_jasa_type === "variation" ?
                            <ThemeVendorPopup service={vendor.vendor_jasa} uses={'keranjang'} cart_vendor_detail_id={vendor.cart_vendor_detail_id} variation={vendor.vendor_jasa_variation}/>
                            :
                            <>
                              {vendor.vendor_jasa.vendor_jasa_type === "counter" ?
                                  <QuantityVendorPopup service={vendor.vendor_jasa} uses={'keranjang'} cart_vendor_detail_id={vendor.cart_vendor_detail_id} vendor_qty = {vendor.vendor_qty}/>
                                  :
                                  <NormalVendorPopup service={vendor.vendor_jasa} uses={'keranjang'} cart_vendor_detail_id={vendor.cart_vendor_detail_id}/>
                              }
                            </>
                        }
                      </div>
                      <div className='cart-item__price align-vertically width-25 text-right'>
                        <p>{getMoneyFormat(vendor.vendor_jasa.vendor_jasa_price * vendor.vendor_qty * (percentage/100))}</p>
                      </div>
                    </div>
                ))}
              </div>
            }
        </div>
    </>
  )
}

export default connect(null, null)(OrderDetailItem)