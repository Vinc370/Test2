import React, { useState } from 'react';
import { connect } from 'react-redux';
import ShareIcon from '../../../../../../../../assets/icons/ShareIcon';
import ShareModal from '../../../../../../../../components/ShareModal/ShareModal';
import { fillVenue, isBookingVenue } from "../../../../../../../../redux/actions/transaction/transaction";
import './Description.scss';


function Description({ venue }) {
    const [isSharePopUp, setIsSharePopUp] = useState(false)

    return (
        <div className="description-container">
            <ShareModal
                isOpen={isSharePopUp}
                close={()=>setIsSharePopUp(false)}
            />
            <div className="title-container">
                <h1 className="title">{venue.venue_name}</h1>
                <button className="share-button" onClick={()=>setIsSharePopUp(true)}>
                    <ShareIcon /> Share
                </button>
            </div>
            <p className="address">
                {venue.venue_address}
            </p>
            {/* <div className="my-2 font-weight-bold">
                {venue.location.venue_one_category_name}, {venue.culinary.venue_one_category_name}
            </div> */}
            {/* <div className="bg-light font-weight-bold font-size-8 my-3 py-4 px-3 d-flex align-items-center">
                <div>mulai dari:</div> 
                <div className="text-signature font-weight-bold font-size-12 mx-2">Rp {getSmallestPricedPackage(venue).venue_package_sell_price}</div>
                <div 
                    className="position-relative font-size-7"
                    style={paxStyle}
                >
                    /pax
                </div>
            </div>
            <div>
                <WAButton 
                    className="font-size-8"
                    style={btnStyle} 
                />
            </div> */}
        </div>
    )
}

const btnStyle = {
    width: '150px',
}

const separatorStyle = {
    height: '2px',
}

const paxStyle = {
    top: '5px',
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, {fillVenue, isBookingVenue})(Description)
