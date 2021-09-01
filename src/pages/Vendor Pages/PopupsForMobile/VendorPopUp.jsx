import React, { useEffect, useMemo, useState } from 'react'
import UrlService from '../../../services/UrlService'
import { getMoneyFormat } from '../../../utilities/Utilities'
import './VendorPopUp.scss'


const VendorPopUp = ({isOpen, data, close, submit}) => {
    const [count, setCount] = useState(0)

    const [activeIndex, setActiveIndex] = useState(0)
    const [touchPosition, setTouchPosition] = useState(null)
    const length = useMemo(() => {
        return 3
    }, [])
    
    const show = 1
    
    useEffect(() => {
        setCount(0)
        if (isOpen && data !== null) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen, data])

    const nextCard = () => {
        if (activeIndex < (length - show)) {
            let newActiveIndex = activeIndex;
            newActiveIndex = newActiveIndex+1;
            setActiveIndex(newActiveIndex);
        }
    }

    const prevCard = () => {
        if (activeIndex > 0) {
            let newActiveIndex = activeIndex;
            newActiveIndex = newActiveIndex-1;
            setActiveIndex(newActiveIndex);
        }
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

    return (
        <>
            {
                (isOpen && data !== null) &&
                <div
                    className="vendorpopup__backdrop"
                    onClick={close}
                />
            }
            <div className={`vendorpopup__container ${(isOpen && data !== null) ? 'open' : 'close'}`}>
                <p className="vendorpopup__jasa-name">
                    {data?.vendor_jasa_name}
                </p>
                <p className="vendorpopup__jasa-price">
                    {getMoneyFormat(data?.vendor_jasa_price)}
                </p>
                {
                    data?.vendor_jasa_type === "counter" ?
                        <div className="vendorpopup__counter-container">
                            <p className="vendorpopup__counter-title">
                                Jumlah
                            </p>
                            <div className="vendorpopup__counter-buttons">
                                <button
                                    className={`vendorpopup__button ${count <= 0 ? 'disabled' : ''}`}
                                    onClick={() => setCount(prev => prev - 1)}
                                    disabled={count <= 0}
                                >
                                    -
                                </button>
                                <div className="vendorpopup__counter">
                                    {count}
                                </div>
                                <button
                                    className="vendorpopup__button"
                                    onClick={() => setCount(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        : data?.vendor_jasa_type !== "single" ?
                            <div className="vendorpopup__carousel" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                                <div className={`vendorpopup__carousel-wrapper`} style={{ transform : `translateX(${20 + (activeIndex * -60)}%)`}}>
                                    {
                                        data?.vendor_jasa_variation?.map((v, key) =>
                                            <div className="vendorpopup__item-container">
                                                <div className="vendorpopup__item">
                                                    <img
                                                        src={UrlService.getImageUrl(v.vendor_jasa_variation_photo)}
                                                        alt="test"
                                                        width="200"
                                                        height="200"
                                                    />
                                                </div>
                                                {
                                                    activeIndex === key &&
                                                    <p>
                                                        {v.vendor_jasa_variation_name}
                                                    </p>
                                                }
                                            </div>
                                        )
                                    }
                            </div>
                        </div> : null
                }
                <div className={`vendorpopup__jasa-detail ${data?.vendor_jasa_type || ''}`}>
                    <p className="title">
                        Deskripsi Paket :
                    </p>
                    <p className="content">
                        {data?.vendor_jasa_detail}
                    </p>
                </div>
                <div className="vendorpopup__button-container">
                    <button
                        onClick={() => submit(data, activeIndex, count)}
                    >
                        Pesan
                    </button>
                </div>
            </div>
        </>
    )
}

export default VendorPopUp