import React, { useMemo, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router'
import PaperIcon from '../../assets/icons/PaperIcon'
import RightArrowBold from '../../assets/icons/RightArrowBold'
import HeaderNavigationV2 from '../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import { useClickaway } from '../../hooks/ClickAwayHooks'

import './EventPlanningType.scss'

const EventPlanningType = ({
    typeProps,
    close, // to close modal from desktop ver
}) => {
    let {type} = useParams()
    const dropdownContainerRef = useRef(null)
    const threeDotsRef = useRef(null)

    const usedType = useMemo(() => typeProps || type, [typeProps, type])

    const title = useMemo(() => 
        usedType ?
            usedType.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
            : ''
    , [usedType])

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useClickaway(dropdownContainerRef, () => {
        setIsDropdownOpen(false)
    }, [threeDotsRef])

    return (
        <>
            {
                !typeProps ?
                <HeaderNavigationV2
                    isBlack
                    renderRightIcon={isBlack =>
                        <div ref={threeDotsRef} className="event-planning-type-header-right-icon">
                            <BsThreeDotsVertical onClick={() => setIsDropdownOpen(prev => !prev)} />
                            <div ref={dropdownContainerRef} className={`dropdown-container ${isDropdownOpen ? 'open' : ''}`}>
                                <div className="item">
                                    Tandai sebagai selesai
                                </div>
                                <div className="item">
                                    Hapus
                                </div>
                            </div>
                        </div>
                    }
                />
                :
                <div className="modal-control">
                    <div ref={threeDotsRef} className="event-planning-type-header-right-icon">
                        <BsThreeDotsVertical onClick={() => setIsDropdownOpen(prev => !prev)} />
                        <div ref={dropdownContainerRef} className={`dropdown-container ${isDropdownOpen ? 'open' : ''}`}>
                            <div className="item">
                                Tandai sebagai selesai
                            </div>
                            <div className="item">
                                Hapus
                            </div>
                        </div>
                    </div>
                    <div className="close-modal-button" onClick={() => close()}>
                        <IoMdClose />
                    </div>
                </div>
            }
            <div className="event-planning-type-container general-desktop-container">
                <div className="left">
                    <h1 className="title">
                        {title}
                    </h1>
                    <p className="description">
                        Input seluruh nama dan nomor telepon dari anggota keluarga inti CPP. Jangan lupa menetapkan satu PIC keluarga
                    </p>
                    <p className="section-title__primary">
                        Lampiran
                    </p>
                    <a
                        href={'#'}
                        className="attachment-file"
                    >
                        <PaperIcon className="attachment-file__icon" />
                        <p className="attachment-file__name">
                            Format Dummy
                        </p>
                        <RightArrowBold className="attachment-file__arrow d-mobile" />
                    </a>
                    <p className="section-title__primary d-mobile">
                        Tutorial
                    </p>
                    <div className="video-container d-mobile">
                        <div className="video-wrapper">
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=-RJSbO8UZVY'}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                    <div className="buttons-container">
                        <button className="button-susun-booklet">
                            Susun Booklet
                        </button>
                        <button className="button-ingatkan-saya">
                            Ingatkan Saya
                        </button>                
                    </div>
                </div>
                <div className="right d-desktop">
                    <p className="section-title__primary">
                        Tutorial
                    </p>
                    <div className="video-container">
                        <div className="video-wrapper">
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=-RJSbO8UZVY'}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventPlanningType