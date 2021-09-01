import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import RightArrowBold from '../../../assets/icons/RightArrowBold'
import NewCarousel from '../../../components/Carousel/NewCarousel'
import ModalContainer from '../../../components/Modal/ModalContainer'

import './VariasiPopup.scss'
import {link} from "../../../sources/Variables";

const VariasiPopup = ({
    variation, // {id: number, image: string, title: string}
    onSelected, // (variation) => void
    variationName
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const onClick = (variasi) => {
        onSelected(variasi)
        setIsOpen(false)
    }

    return (
        <>
            <ModalContainer
                maxWidth={"50%"}
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                cardClassName="variasi-popup-card"
            >
                <div className="variasi-popup">
                    <button
                        className="close"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoMdClose />
                    </button>
                    <NewCarousel
                        show={1}
                        withIndicator={false}
                        renderPreviousButton={(previousItem, defaultClass, disabled) => (
                            <button onClick={previousItem} className={defaultClass} disabled={disabled}>
                                <RightArrowBold />
                            </button>
                        )}
                        renderNextButton={(nextItem, defaultClass, disabled) => (
                            <button onClick={nextItem} className={defaultClass} disabled={disabled}>
                                <RightArrowBold />
                            </button>
                        )}
                    >
                        {
                            variation.map(variasi =>
                                <div key={variasi.vendor_jasa_variation_id} className="carousel-item-container">
                                    <div className="variasi-item">
                                        <div className="image-container">
                                            <img
                                                src={link+'/img/storage/'+variasi.vendor_jasa_variation_photo}
                                                alt={variasi.vendor_jasa_variation_name}
                                            />
                                        </div>
                                        <div className="right-container">
                                            <p className="title">
                                                {variasi.vendor_jasa_variation_name}
                                            </p>
                                            <button
                                                onClick={() => onClick(variasi)}
                                                className="choose-button"
                                            >
                                                Pilih Variasi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </NewCarousel>
                </div>
            </ModalContainer>
            <button
                onClick={() => setIsOpen(true)}
                className="action-button"
            >
              {variationName}
            </button>
        </>
    )
}

export default VariasiPopup