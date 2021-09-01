import React from 'react'
import { Carousel } from 'react-bootstrap'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { connect } from 'react-redux'
import { changeSelectedPackage } from '../../../../redux/actions/venue/venueDetailData'
import {getMoneyFormat} from "../../../../utilities/Utilities";

function Paket({ height, venue, changeSelectedPackage }) {
    const carouselItemStyle = {
        fontFamily: "'Libre Baskerville', serif",
        minHeight: `${height}px`,
    }

    const getPackages = () => (
        venue.venue_package?.map(pkg =>
            <Carousel.Item 
                className="text-center border border-gold border-3 p-4 p-md-5"
                style={carouselItemStyle}
                key={pkg.venue_package_id}
            >
                <div className="mb-4">
                    <b>
                        <div className="py-1 font-size-sm-12">{pkg.venue_package_name}</div>
                        <div className="border-top border-1 border-dark py-1 font-size-sm-12">{getMoneyFormat((pkg.venue_package_sell_price / pkg.venue_package_total_pax))}</div>
                        <div className="font-size-6 font-weight-light">min. {pkg.venue_package_minimum_pax} pax</div>
                    </b>
                </div>
                <div className="p-0 m-0 font-size-7 font-size-sm-8">
                    {pkg.venue_package_detail}
                </div>
            </Carousel.Item>    
        )
    )

    return (
        <Carousel 
            nextIcon={<GrNext className="font-size-sm-15" />} 
            prevIcon={<GrPrevious className="font-size-sm-15" />} 
            interval={null} 
            className="px-5 px-sm-8 mx-sm-5"
            indicators={false}
            onSlide={index => changeSelectedPackage(venue.venue_package[index])}
        >
            {getPackages()}
        </Carousel>
    )
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data,
})

export default connect(mapStateToProps, {changeSelectedPackage})(Paket)
