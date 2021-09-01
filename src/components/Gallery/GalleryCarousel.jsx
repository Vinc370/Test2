import React, { useState, ReactNode, useEffect, useCallback, useRef } from 'react';
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import _ from 'lodash';

import classes from './GalleryCarousel.scss'

// interface IProps {
//     show: number
//     children: ReactNode[]
//     sliderClass?: string
// }

const GalleryCarousel = ({
    show,
    children,
    sliderClass
}) => {
    const thumbsRef = useRef(null)

    const [state, setState] = useState({
        activeIndex: 0
    })

    const [touchPosition, setTouchPosition] = useState(null)

    const [currentThumbScroll, setCurrentThumbScroll] = useState(0)
    const [currentThumbSize, setCurrentThumbSize] = useState(0)
    const [currentThumbScrollWidth, setCurrentThumbScrollWidth] = useState(0)
    
    const [length, setLength] = useState(children.length)

    const [breakpoint, setBP] = useState('xs')
    
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        
        const breakpoint = getCurrentBreakpoint()
        setBP(breakpoint)

        setCurrentThumbSize(prev => thumbsRef.current?.clientWidth || prev)
        setCurrentThumbScroll(prev => thumbsRef.current?.scrollLeft !== undefined ? thumbsRef.current.scrollLeft : prev)
        setCurrentThumbScrollWidth(prev => thumbsRef.current?.scrollWidth !== undefined ? thumbsRef.current.scrollWidth : prev)
        
        thumbsRef.current?.addEventListener('resize', thumbResized)

        return () => {
            window.removeEventListener('resize', handleResize)
            thumbsRef.current?.removeEventListener('resize', thumbResized)
        }
    }, [])

    useEffect(() => {
        setLength(children.length)
    }, [children])

    useEffect(() => {
        const margin = ['xs', 'sm', 'md'].includes(breakpoint) ? 8 : 12 
        const size = (['xs', 'sm'].includes(breakpoint) ? 96 : 128) + margin
        var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
        if (isSmoothScrollSupported) {
            thumbsRef.current?.scrollTo({
                left: size * state.activeIndex,
                behavior: "smooth",
            })
        } else {
            document.documentElement.scrollTop = size * state.activeIndex
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [state.activeIndex])

    const handleResize = () => {
        setState({activeIndex: 0})
        const breakpoint = getCurrentBreakpoint()
        setBP(breakpoint)
    }

    const thumbScrolled = () => {
        setCurrentThumbScroll(prev => thumbsRef.current?.scrollLeft !== undefined ? thumbsRef.current.scrollLeft : prev)
        setCurrentThumbScrollWidth(prev => thumbsRef.current?.scrollWidth !== undefined ? thumbsRef.current.scrollWidth : prev)
    }

    const thumbResized = () => {
        setCurrentThumbSize(prev => thumbsRef.current?.clientWidth || prev)
    }

    const handleKeyDown = useCallback(function(e){
        const key = e.key
        switch (key) {
        case 'ArrowRight':
            nextCard()
            break
        case 'ArrowLeft':
            prevCard()
            break
        }
    }, [state.activeIndex, length])

    const nextCard = () => {
        if (state.activeIndex < (length - show)) {
            let newActiveIndex = state.activeIndex;
            newActiveIndex = newActiveIndex+1;
            setState({ activeIndex : newActiveIndex });
        }
    }

    const prevCard = () => {
        if (state.activeIndex > 0) {
            let newActiveIndex = state.activeIndex;
            newActiveIndex = newActiveIndex-1;
            setState({ activeIndex : newActiveIndex });
        }
    }

    const setCard  = (index) => {
        setState({ activeIndex: index })
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition
        if (touchDown === null) {
            return
        }

        const touchUp = e.touches[0].clientX
        const diff = touchDown - touchUp

        if (diff > 5) {
            nextCard()
        }

        if (diff < -5) {
            prevCard()
        }

        setTouchPosition(null)
    }

    const scrollLeft = () => {
        var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
        if (isSmoothScrollSupported) {
            thumbsRef.current?.scrollTo({
                left: thumbsRef.current.scrollLeft - (currentThumbSize / 3),
                behavior: "smooth",
            })
        } else {
            document.documentElement.scrollTop = thumbsRef.current.scrollLeft - (currentThumbSize / 3)
        }
    }

    const scrollRight = () => {
        var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
        if (isSmoothScrollSupported) {
            thumbsRef.current?.scrollTo({
                left: thumbsRef.current.scrollLeft + (currentThumbSize / 3),
                behavior: "smooth",
            })
        } else {
            document.documentElement.scrollTop = thumbsRef.current.scrollLeft + (currentThumbSize / 3)
        }
    }

    return (
        <>
            {/* carousel */}
            <div className="carousel__container relative my-0 mx-auto h-full">
                {
                    state.activeIndex > 0 ?
                    <div className="carousel__left-arrow hidden lg:block absolute left-0 z-1 top-1/2 ml-12" style={{ transform: 'translateY(-50%)' }}>
                        <button
                            onClick={() => prevCard()}
                            className="bg-white hover:bg-gray-efef transform active:scale-90 shadow-lg relative h-16 w-16 rounded-full text-4xl text-white p-5 outline-none focus:outline-none transition-all duration-150 linear"
                        >
                            <LeftArrowIcon />
                            {/* <FontAwesomeIcon icon="angle-left" size="lg" width="0" className="absolute inset-0 mx-auto my-auto text-gray-77" /> */}
                        </button>
                    </div>
                    : null
                }
                <div className="carousel__content-container overflow-hidden lg:p-0 h-full" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div className={`carousel__content-wrapper flex transition-all duration-300 ease-in-out ${sliderClass || ''} h-full`} style={{ transform : `translateX(-${state.activeIndex * (100/show)}%)`}}>
                        { children }
                    </div>
                </div>
                {
                    state.activeIndex < length - show ?
                    <div className="carousel__right-arrow hidden lg:block absolute right-0 z-1 top-1/2 mr-12" style={{ transform: 'translateY(-50%)' }}>
                        <button
                            onClick={() => nextCard()}
                            className="bg-white hover:bg-gray-efef transform active:scale-90 shadow-lg relative h-16 w-16 rounded-full text-4xl text-white p-5 outline-none focus:outline-none transition-all duration-150 linear"
                        >
                            <LeftArrowIcon />
                        </button>
                    </div>
                    : null
                }
            </div>
            {/* thumbnails */}
            <div className="thumbnail__container absolute bottom-0 max-w-full max-h-32 border-t border-gray-ee py-2">
                <div className="thumbnail__wrapper relative h-full">
                    {
                        currentThumbScroll > 0 &&
                        <div className="thumbnail__left-icon hidden lg:block absolute left-0 z-1 top-1/2 ml-4" style={{ transform: 'translateY(-50%)' }}>
                            <button
                                onClick={() => scrollLeft()}
                                className="bg-white hover:bg-gray-efef transform active:scale-90 shadow-md relative h-10 w-10 rounded-full text-4xl text-white p-3 outline-none focus:outline-none transition-all duration-150 linear"
                            >
                                <LeftArrowIcon />
                            </button>
                        </div>
                    }
                    <div className={`thumbnail__content-wrapper overflow-auto h-full lg:mx-16 ${classes.thumbsContainer}`} ref={thumbsRef} onScroll={thumbScrolled}>
                        <div className="thumbnail__contents flex h-full">
                            {
                                children.map((child, index) => (
                                    <div key={index} onClick={() => setCard(index)} className={`thumbnail__item ${index === 0 ? 'ml-2 lg:ml-3' : ''} mr-2 lg:mr-3 overflow-hidden flex-shrink-0 w-24 h-20 md:w-32 md:h-24 transition-opacity duration-300 ${classes.thumbs} ${state.activeIndex === index ? 'active' : ``}`}>
                                        { child }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        (currentThumbScroll + currentThumbSize) < currentThumbScrollWidth &&
                        <div className="thumbnail__right-icon hidden lg:block absolute right-0 z-1 top-1/2 mr-4" style={{ transform: 'translateY(-50%)' }}>
                            <button
                                onClick={() => scrollRight()}
                                className="bg-white hover:bg-gray-efef transform active:scale-90 shadow-lg relative h-10 w-10 rounded-full text-4xl text-white p-3 outline-none focus:outline-none transition-all duration-150 linear"
                            >
                                <LeftArrowIcon />
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default GalleryCarousel

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
