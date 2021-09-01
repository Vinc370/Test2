import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import KeranjangKosong from "../../../assets/images/keranjang-kosong.png"
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import { getWaitingForPayment } from '../../../services/PaymentService'
import { getDateFormat, getMoneyFormat } from '../../../utilities/Utilities'
import EventCard from '../../Account/Akun Saya/Components/EventCard/EventCard'

function MenungguPembayaran({ }) {
    const history = useHistory();
    const [waitingPayment, setWaitingPayment] = useState([]);

    useEffect(() => {
        getWaitingForPayment().then((response) => {     
            setWaitingPayment(response.data) 
        });
    }, []);

    return (
        <div className='min-height-95'>
            <HeaderNavigationV2 title={'Menunggu Pembayaran'} isBlack sticky={true} />

            <div className='container my-3'>
              {waitingPayment.length === 0 ?
                <>
                  <div className="flex-column d-flex justify-content-center" >
                    <img src={KeranjangKosong} alt="" className="empty-image img-transparent m-auto" />
                  </div>
                  <p className='text-center'>Tidak ada transaksi yang sedang menunggu untuk dibayar!</p>
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
                        action={()=>history.push('/transaksi/menunggu-pembayaran/'+item.account_receivable_id)}
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

export default connect(null, null)(MenungguPembayaran)
    