import React from 'react'
import Payment from './Components/Payment'
import EO from './Components/EO'
import Venue from './Components/Venue'
import Vendor from './Components/Vendor'

function OrderInformation({ order }) {
    return (
        <div className='keranjang-berjalan'>
            <p className="small-italic-grey-text text-center">
                Order Number: {order.order_id}
            </p>

            <p className='bold-text'>Detail Acara</p>

            <div className='align-horizontally d-grid grid-template-col-2'>
                <div className='align-vertically'>
                    <p>Tanggal Acara</p>
                </div>
                <div className='align-vertically'>
                    <p className='bold-text'>
                        {order.tanggal_acara}
                    </p>
                </div>
            </div>

            {/* Waktu acara dihilangkan dulu */}
            {/* <div className='align-horizontally d-grid grid-template-col-2'>
                <div className='align-vertically'>
                    <p>Waktu Acara</p>
                </div>
                <div className='align-vertically'>
                    <p className='bold-text'>
                        {order.event_start_time} - {order.event_end_time}
                    </p>
                </div>
            </div> */}

            <div className='align-horizontally d-grid grid-template-col-2'>
                <div className='align-vertically'>
                    <p>Lokasi Acara</p>
                </div>
                <div className='align-vertically'>
                    <p className='bold-text'>{order.location}</p>
                </div>
            </div>

            <div>
                <p className='bold-text mt-5'>Pemesanan</p>

                <div className="border-top border-bottom py-3">
                    <EO eo={order.order_event_organizer[0]} />
                </div>

                <div className="border-top border-bottom py-3">
                    <Venue order_venue={order.order_venue[0]} />
                </div>

                <div className="border-top border-bottom py-3">
                    <Vendor vendors={order.order_vendor} />
                </div>
            </div>

            <div className="border-top border-bottom py-3">
                <Payment order={order} />
            </div>
            
        </div>
    )
}

export default OrderInformation
