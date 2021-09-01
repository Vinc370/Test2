import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TransaksiKosong from "../../../../../assets/images/transaksi-kosong.png";
import { getTagihan } from "../../../../../services/PaymentService";
import { getDateFormat, getMoneyFormat } from "../../../../../utilities/Utilities";
import TransactionMain from "../../../Main/Transaction/TransactionMain";
import TransactionComponent from "../../Components/TransactionComponent";
import DetailTagihan from "./Detail Tagihan/DetailTagihan";

function TagihanDesktop(){
    const history = useHistory();
    const [tagihan, setTagihan] = useState([]);

    useEffect(() => {
        getTagihan().then((response) => {     
            setTagihan(response.data);
        });
    }, [])

    return (
        <>
            <TransactionMain
                type="tagihan"
                item={
                    tagihan.length === 0 ?
                      <div>
                        <div className="flex-column d-flex justify-content-center" >
                          <img src={TransaksiKosong} alt="" className="empty-image img-transparent m-auto" />
                        </div>
                        <p className='text-center'>Transaksimu masih kosong! Yuk buat acara!</p>
                      </div>
                      :
                      tagihan.map((item, k) => (
                          <TransactionComponent
                            key={k}
                            item={item}
                            usage={'tagihan'}
                            name={item?.event_organizer.event_organizer_name}
                            location={item?.event_location}
                            event_date={getDateFormat(item?.event_date)}
                            description={item?.account_receivable_description}
                            date={getDateFormat(item?.xendit_expiry_date)}
                            amount={getMoneyFormat(item?.total_price)}
                            action={<DetailTagihan item={item} k={k}/>}
                          />
                      ))
                }
            />
        </>
    )
}

export default TagihanDesktop;