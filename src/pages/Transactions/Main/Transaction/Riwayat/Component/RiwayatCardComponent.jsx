import { connect } from "react-redux"
import OrderDetailItem from "../../../../../../components/TransactionCard/OrderDetailItem"

function RiwayatCardComponent({riwayatPayment}) {
    return (
        <>
            <label className="form-label">Detail Order</label>
            {
                riwayatPayment?.account_receivable_detail?.map((detail, k) => (
                    <OrderDetailItem
                        order={detail.order}
                        percentage={riwayatPayment.account_receivable_percentage}
                        key={k}
                    />
                ))
            }
        </>
    )
}

export default connect(null, null)(RiwayatCardComponent)