import React from 'react'
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux'
import UrlService from '../../../../../services/UrlService'
import StarWithOverlay from '../../../../../components/StarWithOverlay/StarWithOverlay'

function ImageHeader({ venue }) {
    return (
        <div className="image-header position-relative">
            <Image src={UrlService.getImageUrl(venue.venue_image[0])} fluid/>
            {/* <div 
                className="position-absolute w-100 h-100"
                style={overlayStyle}
            >
            </div> */}
            {/* <h1 
                className="position-absolute font-size-12 font-size-sm-20 text-white"
                style={nameStyle}
            >
                {venue.venue_name} 
                {
                    venue.venue_star_seller === 'true'
                        &&
                        <StarWithOverlay 
                            tooltip="Star Seller Venue" 
                            className="font-size-13 ml-2" 
                        />
                }
            </h1> */}
        </div>
    )
}

const nameStyle = {
    bottom: '1rem',
    left: '1rem'
}

const overlayStyle = {
    top: 0,
    left: 0,
    backgroundImage: 'linear-gradient(transparent, 60%, black)'
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, null)(ImageHeader)
