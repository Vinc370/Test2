import React, { useEffect, useState } from "react";
import TransaksiKosong from "../../../../../assets/images/transaksi-kosong.png";
import { getRiwayatForPayment } from "../../../../../services/PaymentService";
import { getDateFormat, getMoneyFormat } from '../../../../../utilities/Utilities';
import TransactionMain from "../../../Main/Transaction/TransactionMain";
import TransactionComponent from "../../Components/TransactionComponent";
import DetailRiwayat from "./Detail Riwayat/DetailRiwayat";

function RiwayatDesktop(){
    const [riwayatPayment, setRiwayatPayment] = useState([]);

    useEffect(() => {
        getRiwayatForPayment().then((response) => {
            setRiwayatPayment(response.data)
        });
    }, []);

    return (
        <>
            <TransactionMain
                type="riwayat"
                item={
                    riwayatPayment.length === 0 ?
                      <div>
                        <div className="flex-column d-flex justify-content-center" >
                          <img src={TransaksiKosong} alt="" className="empty-image img-transparent m-auto" />
                        </div>
                        <p className='text-center'>Kamu belum memiliki riwayat pembayaran!</p>
                      </div>
                      :
                    riwayatPayment.map((item, k) => (
                        <TransactionComponent
                          status={'SUDAH DIBAYAR'}
                          usage={'riwayat'}
                          name={item?.account_receivable_description}
                          location={item?.event.event_location}
                          event_date={getDateFormat(item?.event.event_date)}
                          description= {'Event: '+item?.event.event_organizer.event_organizer_name}
                          date ={getDateFormat(item?.account_receivable_date)}
                          amount = {getMoneyFormat(item?.account_receivable_amount)}
                          action={<DetailRiwayat riwayatPayment={item} k={k}/>}
                        />
                    ))
                }
            />
        </>
    )
}

export default RiwayatDesktop;