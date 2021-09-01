import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useHistory, useParams, withRouter } from 'react-router-dom'
import HeartFavouriteLikeIcon from '../../assets/icons/HeartFavouriteLikeIcon'
import './booklet.scss'
import BookletKonsumsi from './BookletKonsumsi'
import BookletKontakKeluarga from './BookletKontakKeluarga'
import BookletKontakVendor from './BookletKontakVendor'
import BookletLokasi from './BookletLokasi'
import BookletPhotoSession from './BookletPhotoSession'
import BookletTransportasi from './BookletTransportasi'

const Booklet = () => {
    const { event_id, type } = useParams()
    const history = useHistory();

    const chosenBooklet = { 
        'lokasi': <BookletLokasi event_id={event_id}/>, 
        'kontak-keluarga': <BookletKontakKeluarga event_id={event_id}/>, 
        'kontak-vendor': <BookletKontakVendor event_id={event_id}/>, 
        'transportasi': <BookletTransportasi event_id={event_id}/>, 
        'konsumsi': <BookletKonsumsi event_id={event_id}/>, 
        'photo-session': <BookletPhotoSession event_id={event_id}/>
    };

    return (
        <>
            <div className="booklet-page-container">
                <div className="booklet-sticky-top">
                    <div className="booklet-header-logo cursor-pointer" onClick={()=>history.push(`/dashboard/${event_id}`)}>
                        <HeartFavouriteLikeIcon className="logo" />
                    </div>
                    <div className="booklet-header-container">
                        <div className="booklet-header">
                            <IoIosArrowBack className="back-icon" onClick={()=>history.goBack()} />
                            <p className="title">
                                Booklet
                            </p>
                        </div>
                        <div className="tabs-container">
                        <div className="tabs-wrapper">
                            <a href={"/booklet/"+event_id+"/lokasi"} className={"tab-item "+(type === 'lokasi' ? 'active' : '')}>
                                Lokasi
                            </a>
                            <a href={"/booklet/"+event_id+"/kontak-keluarga"} className={"tab-item "+(type === 'kontak-keluarga' ? 'active' : '')}>
                                Kontak Keluarga
                            </a>
                            <a href={"/booklet/"+event_id+"/kontak-vendor"} className={"tab-item "+(type === 'kontak-vendor' ? 'active' : '')}>
                                Kontak Vendor
                            </a>
                            <a href={"/booklet/"+event_id+"/transportasi"} className={"tab-item "+(type === 'transportasi' ? 'active' : '')}>
                                Transportasi
                            </a>
                            <a href={"/booklet/"+event_id+"/konsumsi"} className={"tab-item "+(type === 'konsumsi' ? 'active' : '')}>
                                Konsumsi
                            </a>
                            <a href={"/booklet/"+event_id+"/photo-session"} className={"tab-item "+(type === 'photo-session' ? 'active' : '')}>
                                Photo Session
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
                {chosenBooklet[type]}
            </div>
        </>
    )
}

export default withRouter(Booklet)