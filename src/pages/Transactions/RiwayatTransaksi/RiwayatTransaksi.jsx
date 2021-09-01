import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TransaksiKosong from "../../../assets/images/transaksi-kosong.png"
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import Header from '../../../components/Header/Header'
import useWindowSize from '../../../hooks/useWindowSize'
import { getWaitingForPayment } from '../../../services/PaymentService'
import { getDateFormat, getMoneyFormat } from '../../../utilities/Utilities'
import EventCard from '../../Account/Akun Saya/Components/EventCard/EventCard'

function RiwayatTransaksi({ }) {
    const history = useHistory();
    const {isMobile, size} = useWindowSize();
    const [waitingPayment, setWaitingPayment] = useState([]);

    useEffect(() => {
        getWaitingForPayment().then((response) => {     
            setWaitingPayment(response.data) 
        });
    }, [])

    return (
        <div>
            {!isMobile && <Header/>}
            <HeaderNavigationV2 title={'Menunggu Pembayaran'} isBlack sticky={true} />

            <div className='container my-3'>
              {waitingPayment.length === 0 ?
                <>
                  <div className="flex-column d-flex justify-content-center" >
                    <img src={TransaksiKosong} alt="" className="w-50 img-transparent m-auto" />
                  </div>
                  <p className='text-center'>Transaksimu masih kosong! Yuk buat acara!</p>
                </>
                :
                <>
                  {
                    waitingPayment.map((item, k) => (
                      <EventCard
                        filled={[
                          item?.account_receivable_description,
                          getDateFormat(item?.account_receivable_date),
                          getMoneyFormat(item?.account_receivable_amount)
                        ]}
                        action={()=>history.push('/menunggu-pembayaran/'+item.account_receivable_id)}
                        key={k}
                        bottom={true}
                      />
                    ))
                  }
                </>
              }
            </div>
        </div>
    )
}

export default connect(null, null)(RiwayatTransaksi)
    