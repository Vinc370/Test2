import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import GalleryIcon from '../../../../assets/icons/GalleryIcon'
import LocationIcon from '../../../../assets/icons/LocationIcon'
import ProfileIcon from '../../../../assets/icons/ProfileIcon'
import RestaurantIcon from '../../../../assets/icons/RestaurantIcon'
import ShareIcon from '../../../../assets/icons/ShareIcon'
import HeaderNavigationV2 from '../../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import Gallery from '../../../../components/Gallery/Gallery'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'
import ShareModal from '../../../../components/ShareModal/ShareModal'
import {
    changeGuestCount, decreaseGuestCount, increaseGuestCount
} from '../../../../redux/actions/venue/venueDetailData'
import UrlService from '../../../../services/UrlService'
import { clickGAHandler, getMoneyFormat } from '../../../../utilities/Utilities'
import { getSmallestPricedPackage } from '../../../../utilities/VenueUtilities'
import Fasilitas from '../Components/Fasilitas/Fasilitas'
import InformasiTambahan from '../Components/InformasiTambahan'
import ImageHeader from './Components/ImageHeader'
import './SingleVenueMobile.scss'

function SingleVenueMobile({ venue, isLoading, notFound, error, guestCount, increaseGuestCount, decreaseGuestCount, changeGuestCount,singleVenue }) {
    const [content, setContent] = useState(null)
    const history = useHistory()

    const [isGalleryOpen, setIsGalleryOpen] = useState(false)
    const [isSharePopUp, setIsSharePopUp] = useState(false)

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
                    <ShareModal
                        isOpen={isSharePopUp}
                        close={()=>setIsSharePopUp(false)}
                    />
                    <Gallery
                        photos={venue.venue_image?.map(image => UrlService.getImageUrl(image))}
                        isOpen={isGalleryOpen}
                        close={() => setIsGalleryOpen(false)}
                        appbarTitle="Gallery"
                    />
                    <div className="new-single-venue">
                        {/* <HeaderNavigation title='Venue'/> */}
                        <HeaderNavigationV2 isTransparent/>
                        <ImageHeader />
                        {/* TODO add image slider */}
                        <div className="header-section">
                            <button
                                className="gallery-button"
                                onClick={() => setIsGalleryOpen(true)}
                            >
                                <GalleryIcon className="gallery-icon" />
                                {venue.venue_image.length} Foto
                            </button>
                            <div className="event-description p-3">
                                <h1 className='event-name'>
                                    {venue.venue_name}
                                </h1>
                                {/* <hr className='m-2'/> */}
                                <p className="event-pricing money-text m-0 bigger-text">
                                    Mulai dari {getMoneyFormat((getSmallestPricedPackage(venue).venue_package_sell_price / getSmallestPricedPackage(venue).venue_package_total_pax))}
                                </p>
                                <div className="event-location">
                                    <LocationIcon />
                                    {venue.venue_address}
                                </div>
                                <div className="extra-information">
                                    <ProfileIcon />
                                    <span>
                                        {venue.venue_max_capacity} Pax
                                    </span>
                                    <RestaurantIcon />
                                    <span>
                                        {venue.culinary.venue_one_category_name}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="content-section">
                            {/* TODO: --demas-- action nya belum ada */}
                            <div className="contact-us">
                                <a className="contact-button text-center" href={"https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya tertarik dengan Venue "+venue.venue_name+"%0A%0A"+window.location.href} target='_blank' onClick={clickGAHandler('Venue - '+venue.venue_name, 'Chat dan Pesan')}>
                                    Chat dan Pesan
                                </a>
                                <button className="share-button" onClick={()=>setIsSharePopUp(true)}>
                                    <ShareIcon className="icon" />
                                </button>
                            </div>

                            <p className="amenities-title section-title__primary">
                                Amenities
                            </p>
                            <div className="fasilitas-container">
                                <Fasilitas />
                            </div>

                            <InformasiTambahan />
                        </div>
                        
                         {/* */}
                        {/* <div className="px-3 px-sm-5">
                            <Description />

                            <div className="m-5 m-sm-6 text-center">
                                <WAButton className="w-75 font-size-sm-12" />
                            </div>
                            <hr />

                            <div className="my-4">
                            <Paket height={300} />
                            </div>

                            <div className="d-flex flex-column align-items-center my-4">
                                <div className="mb-2 font-weight-bold font-size-8 font-size-sm-10">
                                    Jumlah tamu
                                </div>
                                <NumberInputWithButtons 
                                    value={guestCount}
                                    onIncrease={increaseGuestCount}
                                    onDecrease={decreaseGuestCount}
                                    onChange={changeGuestCount}
                                />
                            </div>

                            <div className="text-grey text-center font-size-6 font-size-sm-7">
                                <em>{venue.venue_name} menetapkan service charge sebesar {venue.venue_service_charge}%</em>
                            </div>
                            <hr />

                        </div> */}
                            {/* TODO hide excessive addon */}
                            {/* <div className="my-4">
                            <div className="mb-3 font-weight-bold font-size-8 font-size-sm-10">
                                Add-ons
                            </div>
                            <AddOns />
                            </div>
                            <hr />
                            <InformasiTambahan /> */}
                    </div>
                    
                </>
            )
        }
    }, [changeGuestCount, decreaseGuestCount, error, guestCount, history, increaseGuestCount, isLoading, notFound, venue, isGalleryOpen, isSharePopUp])

    return (
        <main>
            {content}
        </main>
    )
}

const mapStateToProps = state => ({
    guestCount: state.venueDetailData.guestCount,
    venue: state.singleVenue.data,
    isLoading: state.singleVenue.isLoading,
    notFound: state.singleVenue.notFound,
    error: state.singleVenue.error,
    singleVenue: state.singleVenue
})

export default connect(
    mapStateToProps,
    {
        increaseGuestCount,
        decreaseGuestCount,
        changeGuestCount,
    }
)(SingleVenueMobile)
