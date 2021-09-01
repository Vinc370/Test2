import React from 'react'
import { Card, CardImg } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MapPinIcon from '../../../../../assets/icons/MapPinIcon'
import UserIcon from '../../../../../assets/icons/UserIcon'
import UrlService from '../../../../../services/UrlService'
import { getMoneyFormat } from "../../../../../utilities/Utilities"
import './VenueCard.scss'

function VenueCard({ venue, className }) {
    const getSmallestPricedPackage = () => {
        return venue.venue_package.reduce((accumulator, currentPackage) => {
            return (currentPackage.venue_package_sell_price / currentPackage.venue_package_total_pax) < (accumulator.venue_package_sell_price / accumulator.venue_package_total_pax) ? currentPackage : accumulator
        })
    }

    return (
        // TODO link according to venue id
        <Link to={"/venue/"+ venue.venue_route}>
            <Card className={className}>
                <Card.Body
                  style={cardBodyStyle}
                  className="venue-body d-flex align-items-center position-relative">
                    {/* Star Seller dihilangkan terlebih dahulu */}
                    {/* {
                        venue.venue_star_seller === 'true'
                            && 
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip>
                                    Star Seller Venue
                                </Tooltip>
                            }
                        >
                            <FaStar className="position-absolute font-size-10 font-size-md-15 text-warning venue-star-seller-icon" />
                        </OverlayTrigger>
                    } */}
                    <CardImg 
                        className="venue-image"
                        src={`${UrlService.imageStorageUrl()}/${venue.venue_image[0]}`}
                    />
                    <Card.Body
                      style={cardBodyStyle}
                      className="venue-content d-lg-flex align-items-center justify-content-between p-3">
                        <div className=" venue-card-info">
                            <Card.Title className="venue-title font-weight-bold">
                                {venue.venue_name}
                            </Card.Title>
                            <Card.Text className="venue-location text-muted mb-1 mb-sm-2">
                                {/* TODO request endpoint single location */}
                                <MapPinIcon className="venue-location__icon" /> {venue.location.venue_one_category_name}
                            </Card.Text>
                            <Card.Text className="venue-pax text-muted mb-1 mb-sm-2">
                                <UserIcon className="venue-pax__icon" /> {venue.venue_max_capacity}pax
                            </Card.Text>
                        </div>
                        <div className="venue-price-container">
                            <p className='venue-price-container__price text-success m-0 font-weight-bold'>
                                {getMoneyFormat(Math.ceil(getSmallestPricedPackage().venue_package_sell_price/getSmallestPricedPackage().venue_package_total_pax))}
                            </p>
                            <span className="venue-price-container__pax position-relative pax"> 
                                <em className="text-muted">&nbsp;/pax</em>
                            </span>
                        </div>
                    </Card.Body>
                </Card.Body>
            </Card>
        </Link>
    )
}

const cardBodyStyle = {
    margin:"0",
    padding:"0"
}

export default VenueCard
