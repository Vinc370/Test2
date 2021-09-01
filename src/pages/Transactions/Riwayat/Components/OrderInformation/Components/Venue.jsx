import React from 'react'
import styles from './popup-cancel.module.scss'

function Venue({ order_venue }) {
    const venue_price = (order_venue.venue_package.venue_package_sell_price / order_venue.venue_package.venue_package_total_pax) * order_venue.total_guest
    const service_venue_price = ((order_venue.venue_package.venue_package_sell_price / order_venue.venue_package.venue_package_total_pax) * order_venue.total_guest * order_venue.venue.venue_service_charge) / 100

    return (
        <div className={`popup-resto ${styles.resetHeight}`}>
            <h4 className='bold-text text-center py-3'>{order_venue.venue.venue_name}</h4>
            <p className='text-center font-size-6 font-size-lg-10'>{order_venue.venue.venue_address}</p>

            <br/>
            <div className="grey-box">
                <h5>Pembayaran Restoran</h5>
                <br/>

                <div className="align-horizontally for-menu">
                    <div className='right' >
                    <p className='bold-text'>{order_venue.venue_package.venue_package_name} - {order_venue.total_guest} pax</p>
                    <p className='bold-text'>Service Charge Restoran ({order_venue.venue.venue_service_charge}%)</p>
                    <p className='bold-text'>Total</p>
                    </div>

                    <div className='align-right left'>
                        <p className='bold-text'>Rp. {venue_price}</p>
                        <p className='bold-text border-bottom-black'> Rp. {service_venue_price} </p>
                        <p className='bold-text'>Rp. {venue_price + service_venue_price}</p>
                    </div>
                </div>

            </div>

            <br/>
            <div className="centering-text border-bottom">
                <h4 className='bold-text border-bottom'>{order_venue.venue_package.venue_package_name}</h4>
                <h5>Rp {(order_venue.venue_package.venue_package_sell_price / order_venue.venue_package.venue_package_total_pax)}/++</h5>
                <br/>
                <p>{order_venue.venue_package.venue_package_detail}</p>
            </div>
            <br/>
        </div>
    )
}

export default Venue
