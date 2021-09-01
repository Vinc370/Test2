import React, { useState, useEffect } from 'react'
import TransactionCard from '../../../../components/TransactionCard/TransactionCard'
import { getHistory } from '../../../../services/OrderService'
import { useHistory } from 'react-router-dom'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'
import { getPrice } from '../../../../utilities/OrderUtilities'

function RiwayatTransaksi({ onClick }) {
    const [content, setContent] = useState(<LoadingSpinner />)
    const history = useHistory()

    useEffect(() => {
        const mapOrders = orders => {
            return orders?.map(order => (
                <div key={order.order_id}>
                    <div 
                        className='card' 
                        role='button'
                        onClick={() => onClick(order)}
                    >
                        <TransactionCard 
                            title={order.order_name} 
                            date={order.tanggal_acara} 
                            price={getPrice(order)} 
                            status={order.order_status}
                            ok="yes"
                        />
                    </div>
                    <br/>
                </div>
            ))
        }

        const getOrderData = async () => {
            try {
                const response = await getHistory()
                if (response.data.length === 0) {
                    setContent(<h1 className="text-center mt-2">Belum ada transaksi</h1>)
                } else {
                    setContent(mapOrders(response.data))
                }
            } catch (error) {
                if (error.response.status === 401) {
                    history.push('/login')
                } else {
                    setContent(
                        <h1 className="text-center mt-3">Something went wrong, please try again</h1>
                    )
                }
            }
        }

        getOrderData()
    }, [history, onClick])

    return (
        <>
            {content}
        </>
    )
}

export default RiwayatTransaksi