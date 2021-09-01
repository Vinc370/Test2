import React from 'react'
import Images from './Components/Images/Images'
import Description from './Components/Description/Description'
import { connect } from 'react-redux'
import StarWithOverlay from '../../../../../../components/StarWithOverlay/StarWithOverlay'
import HeaderNavigation from "../../../../../../components/ForMobile/HeaderNavigation/HeaderNavigation";

function TopPart({ venue }) {
    return (
        <div className="d-grid grid-template-col-2 grid-gap-8 position-relative">
            <Images />
            <Description />
            {
                venue.venue_star_seller === 'true'
                    &&
                    <StarWithOverlay 
                        tooltip="Star Seller Venue"
                        className="position-absolute font-size-15"
                        style={starStyle}
                    />
            }
        </div>
    )
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

const starStyle = {
    top: '25px',
    right: '25px',
}

export default connect(mapStateToProps, null)(TopPart)
