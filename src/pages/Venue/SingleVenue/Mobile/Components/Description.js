import React from 'react'
import { connect } from 'react-redux'
import { getSmallestPricedPackage } from '../../../../../utilities/VenueUtilities';
import {getMoneyFormat} from "../../../../../utilities/Utilities";

function Description({ venue }) {
    return (
        <div>
            <div className="my-3 my-sm-4">
                <b className="font-size-8 font-size-sm-11">Paket Acara Mulai Dari</b>
                <div className="text-success font-size-sm-12">
                    <b>{getMoneyFormat((getSmallestPricedPackage(venue).venue_package_sell_price / getSmallestPricedPackage(venue).venue_package_total_pax))}</b>
                </div>
            </div>
            <div 
                className="d-grid grid-gap-2"
                style={descStyle}
            >
                <b className="font-size-8 font-size-sm-11">
                    {venue.location.venue_one_category_name}, {venue.culinary.venue_one_category_name}
                </b>
                <b className="font-size-6 font-size-sm-7">
                    {venue.venue_address}
                </b>
            </div>
        </div>
    )
}

const descStyle = {
    gridTemplateColumns: '1fr 1fr'
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, null)(Description)
