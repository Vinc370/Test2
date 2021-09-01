import React, { useEffect, useState } from 'react'
import VenueCard from '../../../Components/VenueCard/VenueCard'
import LoadingSpinner from '../../../../../../components/LoadingSpinner/LoadingSpinner'
import { connect } from 'react-redux'
import { getAllVenuesPaginate } from '../../../../../../redux/actions/venue/allVenue'
import Pagination from '../../../Components/Pagination/Pagination'

import './AllVenues.scss'
import EventKosong from "../../../../../../assets/images/EventKosong.png";

function AllVenues({ venuesData, isLoading, error, getAllVenuesPaginate }) {
    const [content, setContent] = useState(null)

    useEffect(() => {
        if (error) {
            setContent( <h1>Something went wrong, please reload the page</h1> )
            return
        } 

        if (isLoading) {
            setContent( <LoadingSpinner className="my-5" /> )
        } else {
            if (!venuesData) {
                return
            }

            const venues = Object.values(venuesData.data)
            if (venues.length > 0) {
                setContent(
                    <>
                        { venues.map(venue => 
                                <VenueCard 
                                    venue={venue} 
                                    className="card-filter-shadow" 
                                    key={venue.venue_id}    
                                />
                            )
                        }
                        <div className="justify-content-center d-flex">
                            <Pagination pageCount={venuesData.last_page} />
                        </div>
                    </>
                )
            } else {
                setContent(
                <div>
                    <div className="flex-column d-flex justify-content-center" >
                        <img src={EventKosong} alt="" className="w-50 img-transparent m-auto" />
                    </div>
                    <p className='text-center'>No Venues Available</p>
                </div>)
            }
        }
    }, [error, isLoading, venuesData])

    return (
        <div className="all-venues d-grid grid-gap-2">
            {content}
        </div>
    )
}

const mapStateToProps = state => ({
    venuesData: state.allVenue.data,
    isLoading: state.allVenue.isLoading,
    error: state.allVenue.error,
})

export default connect(mapStateToProps, {getAllVenuesPaginate})(AllVenues)
