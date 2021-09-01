import React, { useEffect, useState } from 'react'
import NavigationBar from "../../../../components/ForMobile/NavigationBar/NavigationBar"
import { getTagihanTotal, getWaitingForPaymentTotal } from '../../../../services/PaymentService'
import AccountInfo from '../Components/AccountInfo/AccountInfo'
import Buttons from '../Components/Buttons/Buttons'
import EventSaya from '../Components/EventSaya/EventSaya'
import Transaction from '../Components/Transaction/Transaction'
import './AkunSayaMobile.scss'

function AkunSayaMobile() {

    const [countMenunggu, setCountMenunggu] = useState(0)
    const [countTagihan, setCountTagihan] = useState(0)

    useEffect(() => {
        getWaitingForPaymentTotal().then((response) => {setCountMenunggu(response.data)})
        getTagihanTotal().then((response) => {setCountTagihan(response.data)})
    }, [])

    return (
        <div>
            {console.log(countMenunggu)}
            <main>
                <AccountInfo />
                <EventSaya/>
                <hr className="account__divider" />
                    <Transaction
                      countMenunggu={countMenunggu}
                      countTagihan={countTagihan}
                      /*TODO: tambahin API buat narik datanya, lalu pas kepencet statenya jadi false lagi*/
                      existNewRiwayat={true}
                    />
                <hr className="account__divider" />
                <div className="account__buttons-container">
                    <Buttons />
                </div>
            </main><br/><br/><br/>
            <NavigationBar active="akun"  />
        </div>
    )
}

export default AkunSayaMobile
