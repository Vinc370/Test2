import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import HeaderNavigationV2 from '../../../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import TransactionInformationDetail from '../../../../../components/TransactionCard/TransactionInformationDetail'
import { getRiwayatForPaymentDetail } from '../../../../../services/PaymentService'
import RiwayatCardComponent from '../../../Main/Transaction/Riwayat/Component/RiwayatCardComponent'

function RiwayatDetail({ }) {
    const history = useHistory();
    const { id } = useParams()
    const [riwayatPayment, setRiwayatPayment] = useState([]);

    useEffect(() => {
        getRiwayatForPaymentDetail(id)
            .then((response) => {     
                if(response.status === 204) history.push('/akun')
                setRiwayatPayment(response.data) 
            });
    }, [])

    const chooseInformasiAcara = (event_id) => {
        history.push('/dashboard/'+event_id)
    }
    
    return (
        <div className='min-height-95'>
            <HeaderNavigationV2 title={'Detail Riwayat'} isBlack sticky={true} />

            <div className='container my-3'>
                <TransactionInformationDetail
                    informasiAcaraClick={()=>chooseInformasiAcara(riwayatPayment?.event.event_id)}
                    user_event={riwayatPayment?.event}
                />
                <RiwayatCardComponent
                    riwayatPayment={riwayatPayment}
                />
            </div>
        </div>
    )
}

export default connect(null, null)(RiwayatDetail)
    