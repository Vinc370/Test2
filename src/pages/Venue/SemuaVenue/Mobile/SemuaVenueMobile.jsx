import React, { useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { connect } from 'react-redux'
import FilterIcon from '../../../../assets/icons/FilterIcon'
import Header from '../../../../components/Header/Header'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'
import Pagination from '../Components/Pagination/Pagination'
import VenueCard from '../Components/VenueCard/VenueCard'
import FilterModal from './Components/FilterModal/FilterModal'
import { body } from './SemuaVenueMobile.module.scss'
import './SemuaVenueMobile.scss'
import EventKosong from "../../../../assets/images/EventKosong.png";

function SemuaVenueMobile({ venuesData, isLoading, error }) {
    const [content, setContent] = useState(null)

    const [filterShow, setFilterShow] = useState(false)

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
                        <div className="semua-venue-mobile__list-container px-3 px-sm-4">
                            { venues.map(venue => 
                                <VenueCard 
                                    venue={venue} 
                                    key={venue.venue_id}
                                    className="semua-venue-mobile__venue-card"
                                />
                            )}
                            <div className="d-flex justify-content-center">
                                <Pagination pageCount={venuesData.last_page} />
                            </div>
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
        <>
            <MetaTags>
                <meta name="description" content="Cari venue hotel atau restoran termurah hanya di Littlecloud. Transaksi mudah, aman, dan proses instan." />
            </MetaTags>
            <FilterModal
                show={ filterShow } 
                handleClose={() => setFilterShow(false)} 
            />
            <div className={`${body} semua-venue-mobile`}>
                {/* <CurrentPageHeader currentPage="Semua Venue" /> */}
                <Header type="white" sticky showNewMobile />
                <div className="px-3 px-sm-4">
                    <div className={`align-horizontally text-evenly semua-venue-mobile__section-title`}>
                        <div>
                            <h5 className='font-weight-bold'>Venue di Jakarta</h5>
                        </div>
                        <button
                            onClick={() => setFilterShow(true)}
                            className="semua-venue-mobile__filter-icon"
                        >
                            <FilterIcon className="icon" />
                        </button>
                    </div>
                </div>
                {content}
                <br/><br/>
                {/* <div className={filterFooter} >
                    <SortFilterFooter />
                </div> */}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    venuesData: state.allVenue.data,
    isLoading: state.allVenue.isLoading,
    error: state.allVenue.error,
})

export default connect(mapStateToProps, null)(SemuaVenueMobile)
