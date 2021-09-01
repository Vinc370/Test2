import { useEffect, useState } from "react";
import TransaksiKosong from "../../../../../assets/images/transaksi-kosong.png";
import { getWaitingForPayment } from "../../../../../services/PaymentService";
import { getDateFormat, getMoneyFormat } from "../../../../../utilities/Utilities";
import TransactionMain from "../../../Main/Transaction/TransactionMain";
import TransactionComponent from "../../Components/TransactionComponent";
import DetailRiwayat from "../Riwayat/Detail Riwayat/DetailRiwayat";
import './MenungguPembayaran.scss';

function MenungguPembayaranDesktop(){
    const [waitingPayments, setWaitingPayments] = useState([]);

    useEffect(() => {
        getWaitingForPayment().then((response) => {     
            setWaitingPayments(response.data) 
        });
    }, []);

    const payNow = (waitingPayment) => {
        window.open("https://checkout-staging.xendit.co/web/"+waitingPayment?.xendit_id)
    }

    return (
        <>
            <TransactionMain
                type="menunggu-pembayaran"
                item={
                    <>
                        {
                            waitingPayments.length === 0 ?
                            <div>
                              <div className="flex-column d-flex justify-content-center" >
                                <img src={TransaksiKosong} alt="" className="img-transparent m-auto empty-image" />
                              </div>
                              <p className='text-center'>Tidak ada transaksi yang sedang menunggu untuk dibayar!</p>
                            </div>
                            :
                            waitingPayments.map((item, k) => (
                                <TransactionComponent
                                  key={k}
                                  name={item?.account_receivable_description}
                                  location={item?.event.event_location}
                                  status={'BELUM BAYAR'}
                                  event_date={'Tanggal Acara: '+getDateFormat(item?.event.event_date)}
                                  description={'Event: '+item?.event.event_organizer.event_organizer_name}
                                  date={item?.xendit_expiry_date}
                                  amount={getMoneyFormat(item?.account_receivable_amount)}
                                  action={
                                    <button onClick={()=>payNow(item)} className='button'>{'Bayar Sekarang'}</button>
                                  }
                                  action2={
                                    <DetailRiwayat riwayatPayment={item} k={k} />
                                  }
                                />
                            ))
                        }
                    </>
                }
            />
        </>
    )
}

export default MenungguPembayaranDesktop;