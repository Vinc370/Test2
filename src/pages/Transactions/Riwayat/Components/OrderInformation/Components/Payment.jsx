import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import LoadingSpinner from '../../../../../../components/LoadingSpinner/LoadingSpinner'
import { getPayment } from '../../../../../../services/OrderService'

function Payment({ order }) {
    const history = useHistory()
    const [payment, setPayment] = useState(<LoadingSpinner />)

    useEffect(() => {
        const renderPayment = async () => {
            try {
                const response = await getPayment(order.order_id)
                setPayment(response.data?.map(payment => (
                    <div key={payment.account_receivable_id}>
                        <div className='align-horizontally'>
                            <div className='align-vertically w-50'>
                                <p>{payment.account_receivable_description}</p>
                            </div>
                            <div className='align-vertically w-50'>
                                <p className='bold-text'>{payment.account_receivable_type}</p>
                            </div>
                        </div>

                        <div className='align-horizontally'>
                            <div className='align-vertically w-50'>
                                <p>Total Biaya</p>
                            </div>
                            <div className='align-vertically w-50'>
                                <p className='bold-text'>Rp. {payment.account_receivable_amount}</p>
                            </div>
                        </div>
                    </div>
                )))
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    history.push('/')
                    return
                }
                
                setPayment(<h4 className="text-center">Something went wrong when trying to load data, please try again</h4>)
            }
        }

        renderPayment()
    }, [history, order])

    return (
        <>
            <p className='bold-text'>Informasi Pembayaran</p>
            {payment} 
        </>
    )
}

export default Payment
