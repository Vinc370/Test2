import React, { useEffect, useState } from 'react'
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon'
import ModalContainer from '../Modal/ModalContainer'

import './Gallery.scss'
import GalleryCarousel from './GalleryCarousel'

const Gallery = ({
    photos,
    isOpen,
    close,
    appbarTitle,
}) => {
    const [width, setWidth] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let breakpoint = getCurrentBreakpoint()
        setIsMobile(breakpoint === 'xs' || breakpoint === 'sm')
        handleResize()
        
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (isReady) setIsReady(false)
    }, [])

    const handleResize = () => {
        switch (getCurrentBreakpoint()) {
            case '2xl':
                if (width !== 1080) {
                    setWidth(1080)
                }
                break
            case 'xl':
                if (width !== 768) {
                    setWidth(768)
                }
                break
            case 'lg':
                if (width !== 640) {
                    setWidth(640)
                }
                break
            case 'md':
                if (width !== 560) {
                    setWidth(560)
                }
                break
            default:
                if (width !== 0) {
                    setWidth(0)
                }
                break
        }
    }

    return (
        <ModalContainer
            isOpen={isOpen} 
            fullScreen={true} 
        >
            <div className={`gallery__container`}>
                <div className="gallery__header-container">
                    <div className="gallery__header">
                        <p className="gallery__title">{ appbarTitle }</p>
                        <button
                            onClick={() => close()}
                            className="gallery__back-button"
                        >
                            <LeftArrowIcon />
                        </button>
                    </div>
                </div>
                {
                    isOpen ?
                    <>
                    {
                        <>
                            <div className="gallery__carousel-container">
                                <GalleryCarousel show={1}>
                                    {
                                        photos.map((photo, idx) =>
                                            <div key={idx} className="gallery__photo-item">
                                                <img src={photo} alt={photo} />
                                            </div>
                                        )
                                    }
                                </GalleryCarousel>
                            </div>
                        </>
                    }
                    </>
                    : null
                }
            </div>
        </ModalContainer>
    )
}

export default Gallery

function getCurrentBreakpoint() {
    if (window.matchMedia("only screen and (min-width: 1600px)").matches) {
        return '2xl'
    }
    if (window.matchMedia("only screen and (min-width: 1170px)").matches) {
        return 'xl'
    }
    if (window.matchMedia("only screen and (min-width: 1024px)").matches) {
        return 'lg'
    }
    if (window.matchMedia("only screen and (min-width: 768px)").matches) {
        return 'md'
    }
    if (window.matchMedia("only screen and (min-width: 640px)").matches) {
        return 'sm'
    }
    return 'xs'
}