import React, { useEffect, useState } from 'react'
import Header from '../../../../components/Header/Header'
import Footer from '../../../../components/Footer/Footer'
// import TopPart from './Components/TopPart/TopPart'
import BottomPart from './Components/BottomPart/BottomPart'
// import Footer from './Components/Footer/Footer'
import { connect } from 'react-redux'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'
import { useHistory } from 'react-router-dom'
import Images from './Components/TopPart/Components/Images/Images'

import './SingleVenueDesktop.scss'


function SingleVenueDesktop({ venue, isLoading, notFound, error }) {
    const [content, setContent] = useState(null)
    const history = useHistory()

    useEffect(() => {
        if (isLoading) {
            setContent(<LoadingSpinner className="mt-5" />)
            return
        }
        if (error) {
            setContent(<h1>Error occured, please reload the page</h1>)
            return
        }
        if (notFound) {
            history.push('/')
            return
        }
        
        if (venue) {
            setContent(
                <>
                    {/* <main> */}
                        {/* <TopPart /> */}
                    {/* </main> */}
                    <Images />
                    <BottomPart className="" />
                    {/* <Footer venue_id={venue.venue_id}/> */}
                </>
            )
        }
    }, [isLoading, error, notFound, venue, history]) 

    return (
        <>
            <Header />
            <div className="single-venue-desktop-container general-desktop-container">
                {content}
            </div>
            
        </>
    )
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data,
    isLoading: state.singleVenue.isLoading,
    notFound: state.singleVenue.notFound,
    error: state.singleVenue.error,
})

export default connect(mapStateToProps, null)(SingleVenueDesktop)
