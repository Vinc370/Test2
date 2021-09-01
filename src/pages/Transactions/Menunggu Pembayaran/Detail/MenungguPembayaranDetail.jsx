import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import HeaderNavigationV2 from '../../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import CardToPay from '../../../../components/TransactionCard/CardToPay'
import OrderDetailItem from '../../../../components/TransactionCard/OrderDetailItem'
import TransactionInformationDetail from '../../../../components/TransactionCard/TransactionInformationDetail'
import { getWaitingForPaymentDetail } from '../../../../services/PaymentService'
import './MenungguPembayaranDetail.scss'

function MenungguPembayaranDetail({ }) {
    const history = useHistory();
    const { id } = useParams()
    const [waitingPayment, setWaitingPayment] = useState([]);

    useEffect(() => {
        getWaitingForPaymentDetail(id)
            .then((response) => {     
                if(response.status === 204) history.push('/akun')
                setWaitingPayment(response.data) 
            });
    }, [])

    const chooseInformasiAcara = () => {
        history.push('/dashboard/'+id)
    }

    const payNow = () => {
        window.open("https://checkout-staging.xendit.co/web/"+waitingPayment?.xendit_id)
    }

    return (
        <>
            <HeaderNavigationV2 title={'Detail Menunggu Pembayaran'} isBlack sticky={true} />

            <div className='container my-3'>
                <TransactionInformationDetail
                    informasiAcaraClick={chooseInformasiAcara}
                    user_event={waitingPayment?.event}
                />

                <div>
                    <label className="form-label">Detail Order</label>
                    {
                        waitingPayment?.account_receivable_detail?.map((detail, k) => (
                            <OrderDetailItem
                                order={detail.order}
                                percentage={waitingPayment.account_receivable_percentage}
                                key={k}
                            />
                        ))
                    }
                </div>

                <div>
                    <label className="form-label">Pembayaran</label>
                    <CardToPay
                        pay_name = {waitingPayment?.account_receivable_description}
                        pay_total = {waitingPayment?.account_receivable_amount}
                        pay_date = ""
                        payable = {true}
                        payFunction = {payNow}
                    />
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(MenungguPembayaranDetail)
    