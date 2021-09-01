import React, { useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import { useHistory } from 'react-router-dom'
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon'
import SearchIcon from '../../assets/icons/SearchIcon'
import HeaderNavigationV2 from '../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import Header from '../../components/Header/Header'
import ModalContainer from '../../components/Modal/ModalContainer'
import useWindowSize from '../../hooks/useWindowSize'
import './EventPlanning.scss'
import EventPlanningType from './EventPlanningType'


const EventPlanning = () => {
    const history = useHistory()
    const {isMobile, size} = useWindowSize();

    const [activeTab, setActiveTab] = useState('booklet')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDataType, setModalDataType] = useState(null)

    const onItemClick = (type) => {
        if (isMobile) {
            history.push(`/event-planning/${type}`)
        } else {
            setModalDataType(type)
            setIsModalOpen(true)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setModalDataType(null)
    }

    return (
        <>
            {
                !isMobile &&
                <Header />
            }
            <HeaderNavigationV2
                title="Susun Acara"
                titleCentered
                isBlack
                renderRightIcon={(isBlack) =>
                    <div className="event-planning-header-search-icon">
                        <SearchIcon />
                    </div>
                }
            />
            <ModalContainer
                isOpen={isModalOpen && !!modalDataType}
                close={() => closeModal()}
                maxWidth={1041}
                cardClassName="event-planning-type-modal-card"
            >
                <EventPlanningType
                    typeProps={modalDataType}
                    close={closeModal}
                />
            </ModalContainer>
            <div className="event-planning-container">
                <div
                    className="header-image"
                    style={{
                        backgroundImage: `url(${'https://placeimg.com/400/400/people'})`
                    }}
                >
                    <div className="header-content">
                        <p className="title d-desktop">
                            We're Getting Married!
                        </p>
                        <p className="until d-desktop">
                            How long until your wedding?
                        </p>
                        <div className="time-container">
                            <div className="time">
                                <span>000</span>
                                <span>Days</span>
                            </div>
                            <div className="divider">
                                :
                            </div>
                            <div className="time">
                                <span>00</span>
                                <span>Hours</span>
                            </div>
                            <div className="divider">
                                :
                            </div>
                            <div className="time">
                                <span>00</span>
                                <span>Mins</span>
                            </div>
                            <div className="divider">
                                :
                            </div>
                            <div className="time">
                                <span>00</span>
                                <span>Secs</span>
                            </div>
                        </div>
                        <button className="susun-booklet-button d-desktop">
                            Susun Booklet <LeftArrowIcon />
                        </button>
                    </div>
                    <div className="susun-booklet-button-container d-mobile">
                        <button className="susun-booklet-button">
                            Susun Booklet <LeftArrowIcon />
                        </button>
                    </div>
                </div>
                <div className="content-container general-desktop-container">
                    <div className="tab-slider-container">
                        <div className="tab-slider-wrapper">
                            <div className="tab-slider-item-container">
                                <div
                                    className={`tab-slider-item ${activeTab === 'booklet' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('booklet')}
                                >
                                    Booklet
                                </div>
                            </div>
                            <div className="tab-slider-item-container">
                                <div
                                    className={`tab-slider-item ${activeTab === 'vendor' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('vendor')}
                                >
                                    Vendor
                                </div>
                            </div>
                            <div className="tab-slider-item-container">
                                <div
                                    className={`tab-slider-item ${activeTab === 'tamu' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('tamu')}
                                >
                                    Tamu
                                </div>
                            </div>
                            <div className="tab-slider-item-container">
                                <div
                                    className={`tab-slider-item ${activeTab === 'jadwal-meeting' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('jadwal-meeting')}
                                >
                                    Jadwal Meeting
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-container">
                    <div onClick={() => onItemClick('kontak-keluarga-pria')} className="list-item finished">
                        <span className="circle">
                            <IoMdCheckmark className="icon" />
                        </span>
                        <p className="content">
                            Kontak Keluarga Pria
                        </p>
                    </div>
                    <div onClick={() => onItemClick('kontak-keluarga-wanita')} className="list-item">
                        <span className="circle">
                            <IoMdCheckmark className="icon" />
                        </span>
                        <p className="content">
                            Kontak Keluarga Wanita
                        </p>
                    </div>
                    <div onClick={() => onItemClick('kontak-saksi-catatan-sipil')} className="list-item">
                        <span className="circle">
                            <IoMdCheckmark className="icon" />
                        </span>
                        <p className="content">
                            Kontak Saksi Catatan Sipil
                        </p>
                    </div>
                    <div onClick={() => onItemClick('kontak-saksi-catatan-sipil')} className="list-item">
                        <span className="circle">
                            <IoMdCheckmark className="icon" />
                        </span>
                        <p className="content">
                            Kontak Saksi Catatan Sipil
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default EventPlanning