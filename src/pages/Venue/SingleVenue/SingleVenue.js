import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useWindowSize from '../../../hooks/useWindowSize';
import { getSingleVenue } from '../../../redux/actions/venue/singleVenue';
import Desktop from './Desktop/SingleVenueDesktop';
import Mobile from './Mobile/SingleVenueMobile';

function SingleVenue({ getSingleVenue, venue }) {
    const { venue_route } = useParams();
    const {isMobile, size} = useWindowSize();

    useDocumentTitle((venue?.venue_name ?? "Venue")+' - Venue Jakarta - Littlecloud');

    useEffect(() => {
        getSingleVenue(venue_route)
    }, [getSingleVenue, venue_route])

    return (
        <>
            {
                isMobile
                    ? <Mobile />
                    : <Desktop />
            }
        </>
    )
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, {getSingleVenue})(SingleVenue)
