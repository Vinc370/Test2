import React, { useState } from 'react'
import SemiRoundedButton from '../../../../../components/Button/SemiRoundedButton'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { processVenue } from '../../processVenue'
import {getMoneyFormat} from "../../../../../utilities/Utilities";
import ReactWhatsapp from "react-whatsapp";
import {FaWhatsapp} from "react-icons/all";

function Footer({ venueDetailData, venue_id, transaction, isLoggedIn, singleVenue }) {
    const history = useHistory()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () =>{
        if (!isLoggedIn) {
          history.push('/login?redirect=' + location.pathname)
          return
        }
        
        setIsLoading(true)
        processVenue(callback, setIsLoading, venue_id)
      }
    
      const callback = () => {
        setIsLoading(false)
        redirect()
      }
    
      const redirect = () => {
        if(transaction.have_seen_event === false){
          return history.push('/event-notification')
        }
        if(transaction.have_seen_vendor === false){
          return history.push('/vendor-notification')
        }
    
        return history.push('/keranjang')
      }

    return (
        <div 
            className="bg-signature d-flex justify-content-between align-items-center p-3 position-sticky"
            style={footerStyle}
        >
            <div className="text-white">
                <div className="font-size-6 font-size-sm-8">Total Harga</div>
                <div className="font-size-8 font-size-sm-10">{getMoneyFormat((venueDetailData.package.venue_package_sell_price / venueDetailData.package.venue_package_total_pax) * venueDetailData.guestCount + venueDetailData.addOnsPrice)}</div>
            </div>

            <ReactWhatsapp number='0833847298347'
                           message={"Halo, saya tertarik pada venue dengan nama "+singleVenue.data.venue_name} className='p-0 m-0 rounded'>
              <div className='btn-success pr-2 pl-2 pb-1 pt-1 rounded'>
                <FaWhatsapp size={15}/>
                &nbsp;&nbsp;Hubungi Kami
              </div>
            </ReactWhatsapp>

            {/*<SemiRoundedButton */}
            {/*    text="Selanjutnya" */}
            {/*    color="orange"*/}
            {/*    className="font-size-9 font-size-sm-9"*/}
            {/*    style={buttonStyle}*/}
            {/*    onClick={() => onClick()}*/}
            {/*    disabled={isLoading}*/}
            {/*/>*/}
        </div>
    )
}

const buttonStyle = {
    width: '40%'
}

const footerStyle = {
    bottom: 0
}

const mapStateToProps = state => ({
    venue_id: state.singleVenue.data.venue_id,
    venueDetailData: state.venueDetailData,
    transaction: state.transaction,
    isLoggedIn: state.authentication.isLoggedIn,
    singleVenue: state.singleVenue
})

export default connect(mapStateToProps, null)(Footer)
