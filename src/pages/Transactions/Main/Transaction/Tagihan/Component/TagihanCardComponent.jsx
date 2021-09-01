import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CalendarIconModified from '../../../../../../assets/icons/CalendarIconModified';
import LocationIcon from '../../../../../../assets/icons/LocationIcon';
import CardToPay from '../../../../../../components/TransactionCard/CardToPay';
import { getStatePaymentDetail, paymentInTagihan } from '../../../../../../services/PaymentService';
import { getDateFormat, getMoneyFormat } from '../../../../../../utilities/Utilities';
import ProgressBar from '../../../../../../components/ProgressBar/ProgressBar'

function TagihanCardComponent({ tagihan }) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [payment_state, setPaymentState] = useState([]);

    const chooseInformasiAcara = (event_id) => {
        history.push('/dashboard/'+event_id);
    }

    useEffect(() => {
        getStatePaymentDetail(tagihan?.event_id).then((response) => {
            setPaymentState(response.data) 
        })
    }, [tagihan])

    const checkStep = () => {
        const len = payment_state?.length;
        for(let i=0;i<len;i++) {
            if(payment_state[i]?.payment_status === 'Belum Lunas') return i;
        }
        return len;
    }

    const payNow = async (payment_schedule) => {
        setIsLoading(true)

        if(payment_schedule?.payment_status === "Belum Lunas" && new Date() >= new Date(payment_schedule?.payment_schedule_cycle_date+' 00:00:00')) {
            await paymentInTagihan(payment_schedule?.payment_schedule_id)
            .then(function (res) {
                window.open("https://checkout-staging.xendit.co/web/"+res.data,'_blank');
            })
            .catch(function (error) {
              
            });
        }

        setIsLoading(false)
    }

    return (
        <div className="event-bill-content general-desktop-container">
            <div className="event-bill-left">
                <div className="calendar-container cursor-pointer" onClick={()=>chooseInformasiAcara(tagihan?.event_id)}>
                    <CalendarIconModified className="calendar-icon" />
                    <div className="right-content">
                        <p>
                            {tagihan?.event_organizer?.event_organizer_name}
                        </p>
                        <div className="detail-with-icon">
                            <CalendarIconModified className="calendar-icon-small" />
                            <p>
                                {getDateFormat(tagihan?.event_date)}
                            </p>
                        </div>
                        <div className="detail-with-icon">
                            <LocationIcon className="location-icon-small" />
                            <p>
                                {tagihan?.event_location}
                            </p>
                        </div>
                    </div>
                </div>
                <p className="progress-title">
                    Progress Pembayaran
                </p>
                <div className="progress-container">
                    {
                        tagihan !== null &&
                        <ProgressBar
                            current={checkStep()}
                            total={payment_state?.length}
                            data={payment_state}
                            name='payment_schedule_type_name'
                        />
                    }
                </div>
                <p className="detail-title">
                    Perincian Pembayaran
                </p>
                <div className="payment-list">
                    {
                        tagihan?.orders?.map((order, k) => (
                            <>
                                {
                                    order?.order_event_organizer?.map((item, k2) => (
                                        <div className="single-line" key={k2}>
                                            <p>
                                                {item?.event_organizer.event_organizer_name+' - '+item?.package_event_organizer.package_event_organizer_name}
                                            </p>
                                            <p>
                                                {getMoneyFormat(item?.package_event_organizer.package_event_organizer_price_promo)}
                                            </p>
                                        </div>
                                    ))
                                }
                                {
                                    order?.order_vendor?.map((item, k2) => (
                                        <div className="single-line" key={k2}>
                                            <p>
                                                {item?.vendor.vendor_name+' - '+item?.vendor_jasa.vendor_jasa_name+' - '+item?.vendor_qty+' pax'}
                                            </p>
                                            <p>
                                                {getMoneyFormat(item?.vendor_jasa.vendor_jasa_price)}
                                            </p>
                                        </div>
                                    ))
                                }
                                {
                                    order?.order_venue?.map((item, k2) => (
                                        <div className="single-line" key={k2}>
                                            <p>
                                                {item?.venue.venue_name+' - '+item?.venue_package.venue_package_name}
                                            </p>
                                            <p>
                                                {getMoneyFormat(item?.venue_package.venue_package_price)}
                                            </p>
                                        </div>
                                    ))
                                }
                            </>
                        ))
                    }
                    <hr />
                    <div className="single-line total-bill">
                        <p>
                            Total Tagihan
                        </p>
                        <p>
                            {getMoneyFormat(tagihan?.total_price)}
                        </p>
                    </div>
                    <div className="single-line received-payment">
                        <p>
                            Pembayaran Diterima
                        </p>
                        <p>
                            {getMoneyFormat(tagihan?.total_receive)}
                        </p>
                    </div>
                </div>
            </div>
            <p className="payment-schedule-title">
                Jadwal Pembayaran
            </p>
            <div className="payment-schedule-list">
                {
                    payment_state?.map((item, k) => (
                        item?.payment_status === "Belum Lunas" ?
                            <CardToPay
                                pay_name = {item?.payment_schedule_type_name}
                                pay_total = {item?.total_price}
                                pay_date = {getDateFormat(item?.payment_schedule_due_date)}
                                payable = {new Date() >= new Date(item?.payment_schedule_cycle_date+' 00:00:00')}
                                payFunction = {()=>payNow(item)}
                                key = {k}
                                isLoading = {isLoading}
                            /> : null
                    ))
                }
            </div>
        </div>
    )
}

export default connect(null, null)(TagihanCardComponent)
    