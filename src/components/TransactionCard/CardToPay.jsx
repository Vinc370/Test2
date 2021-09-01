import { connect } from "react-redux";
import { getMoneyFormat, setLoadingText } from "../../utilities/Utilities";
import './CardToPay.scss';

function CardToPay({pay_name, pay_date, pay_total, payable, payFunction, isLoading}) {
    return (
        <>
            <div className="payment-card">
                <div className="card-header">
                    <p>
                        {setLoadingText(pay_name)}
                    </p>
                    <p className="text-right">
                        {setLoadingText(pay_date)}
                    </p>
                </div>
                <div className="card-content">
                    <div className="content-left">
                        <p>
                            Jumlah Tagihan
                        </p>
                        <p>
                            {getMoneyFormat(pay_total)}
                        </p>
                    </div>
                    <div className="content-right">
                            {
                                payable && 
                                    <button className="pay-now-button" onClick={()=>payFunction()} disabled={isLoading}>
                                        Bayar Sekarang
                                    </button>
                            }
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect(null, null)(CardToPay)