import React, { useState } from 'react'
import SemiRoundedButton from '../../../../../../components/Button/SemiRoundedButton'
import { connect } from 'react-redux'
import { footer } from './Footer.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { processVenue } from '../../../processVenue'
import ReactWhatsapp from "react-whatsapp";
import {FaWhatsapp} from "react-icons/all";

function Footer({ venue_id, venueData, isLoggedIn, transaction, singleVenue }){
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
    <footer className={`bg-signature py-3 px-5 d-flex justify-content-between align-items-center text-white position-sticky ${footer}`}>
      <div className="font-size-12">
        {venueData.package.venue_package_name} - {venueData.guestCount} Pax
      </div>
      <div className="d-flex align-items-center">
        <div className="mr-5 font-size-9">
          Rp {(venueData.package.venue_package_sell_price / venueData.package.venue_package_total_pax) * venueData.guestCount + venueData.addOnsPrice}
        </div>
        <ReactWhatsapp number='0833847298347'
                       message={"Halo, saya tertarik pada venue dengan nama "+singleVenue.data.venue_name} className='p-0 m-0 rounded'>
          <div className='btn-success pr-2 pl-2 pb-1 pt-1 rounded'>
            <FaWhatsapp size={15}/>
            &nbsp;&nbsp;Hubungi Kami
          </div>
        </ReactWhatsapp>
        {/*<SemiRoundedButton*/}
        {/*  text="Pesan Sekarang"*/}
        {/*  color="orange"*/}
        {/*  className="font-size-7 font-size-sm-9"*/}
        {/*  onClick={() => onClick()}*/}
        {/*  disabled={isLoading}*/}
        {/*/>*/}
      </div>
    </footer>
  )
}

const mapStateToProps = state => ({
    venue_id: state.singleVenue.data.venue_id,
    venueData: state.venueDetailData,
    transaction: state.transaction,
    isLoggedIn: state.authentication.isLoggedIn,
    singleVenue: state.singleVenue
})

export default connect(mapStateToProps, null)(Footer)
