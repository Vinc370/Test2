import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useWindowSize from '../../../hooks/useWindowSize';
import { getAllVenuesPaginate } from '../../../redux/actions/venue/allVenue';
import Desktop from './Desktop/SemuaVenueDesktop';
import Mobile from './Mobile/SemuaVenueMobile';

function SemuaVenue({ getAllVenuesPaginate }) {
    useDocumentTitle('Semua Venue di Jakarta - Littlecloud');
    const {isMobile, size} = useWindowSize();

    useEffect(() => {
        getAllVenuesPaginate(1)
    }, [getAllVenuesPaginate])

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

export default connect(null, {
    getAllVenuesPaginate
})(SemuaVenue)
