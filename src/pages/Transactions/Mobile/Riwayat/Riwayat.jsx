import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TransaksiKosong from "../../../../assets/images/transaksi-kosong.png";
import HeaderNavigationV2 from '../../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2';
import { getRiwayatForPayment } from '../../../../services/PaymentService';
import { getDateFormat, getMoneyFormat } from '../../../../utilities/Utilities';
import EventCard from '../../../Account/Akun Saya/Components/EventCard/EventCard';

function Riwayat({ }) {
    const history = useHistory();
    const [riwayatPayment, setRiwayatPayment] = useState([]);

    useEffect(() => {
        getRiwayatForPayment().then((response) => {     
            setRiwayatPayment(response.data) 
        });
    }, [])

    return (
        <div className='min-height-95'>
            <HeaderNavigationV2 title={'Riwayat'} isBlack sticky={true} />

            <div className='container my-3'>
              {riwayatPayment.length === 0 ?
                <>
                  <div className="flex-column d-flex justify-content-center" >
                    <img src={TransaksiKosong} alt="" className="w-50 img-transparent m-auto" />
                  </div>
                  <p className='text-center'>Transaksimu masih kosong! Yuk buat acara!</p>
                </>
                :
                <>
                  {
                    riwayatPayment.map((item, k) => (
                      <EventCard
                        filled={[
                          item?.account_receivable_description,
                          getDateFormat(item?.account_receivable_date),
                          getMoneyFormat(item?.account_receivable_amount)
                        ]}
                        action={()=>history.push('/transaksi/riwayat/'+item.account_receivable_id)}
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

export default connect(null, null)(Riwayat)
    