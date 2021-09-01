import React, { useState } from 'react'
import { Image, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import styles from './Images.module.scss'
import './Images.scss'
import UrlService from '../../../../../../../../services/UrlService'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import GalleryIcon from '../../../../../../../../assets/icons/GalleryIcon'
import Gallery from '../../../../../../../../components/Gallery/Gallery'

function Images({ venue }) {
    const [highlightedImage, setHighlightedImage] = useState(venue.venue_image[0])
    const [showModal, setShowModal] = useState(false)
    
    const allImages = venue.venue_image

    return (
        <>
            <div className="images-container">
                {
                    allImages?.slice(0,5)?.map((image, index) =>
                        <div 
                            className="image-item"
                            // style={smallImgContainerStyle}
                            // role="button"
                            // onClick={() => setHighlightedImage(image)}
                            key={image}
                        >
                            <Image 
                                src={UrlService.getImageUrl(image)}
                                onClick={() => setShowModal(true)}
                                // className="rounded w-100 h-100 position-absolute"
                                // style={imgStyle}
                            />
                            {
                                (allImages.length >= 5 && index === 4) &&
                                <div
                                    className="overlay"
                                    role="button"
                                    onClick={() => setShowModal(true)}
                                >
                                    <GalleryIcon />
                                    <p>
                                        {allImages.length} Foto
                                    </p>
                                </div>
                            }
                        </div>    
                    )
                }
            </div>
            <Gallery
                appbarTitle="Gallery"
                isOpen={showModal}
                photos={allImages?.map(image => UrlService.getImageUrl(image))}
                close={() => setShowModal(false)}
            />
            {/* <div className="d-flex flex-column align-items-center justify-content-center">
                <div
                    className="position-relative w-100 mb-2"
                    style={imgContainerStyle}
                >
                    <TransitionGroup component={null}>
                        <CSSTransition 
                            classNames={{
                                enter: styles.enter,
                                enterActive: styles.enterActive,
                                exit: styles.exit,
                                exitActive: styles.exitActive,
                            }}
                            timeout={300}
                            key={highlightedImage}
                        >   
                            <div 
                                role="button"
                                onClick={() => setShowModal(true)}
                            >
                                <div className={'position-absolute w-100 h-100 ' + styles.overlay} />
                                <Image 
                                    src={UrlService.getImageUrl(highlightedImage)}
                                    className="rounded w-100 h-100 position-absolute"
                                    style={imgStyle}
                                />
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <div className="w-100 d-grid grid-template-col-6 grid-gap-1">
                    {getImages()}
                </div>
                <Modal 
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    centered
                    contentClassName={styles.modalContent}
                >
                    <Image 
                        src={UrlService.getImageUrl(highlightedImage)} 
                        className="mw-100 mh-100"
                    />
                </Modal>
            </div> */}
        </>
    )
}

const imgContainerStyle = {
    paddingBottom: '70%'
}

const smallImgContainerStyle = {
    paddingBottom: '100%'
}

const imgStyle = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    objectFit: 'cover',
    objectPosition: 'center',
}

const mapStateToProps = state => ({
    venue: state.singleVenue.data
})

export default connect(mapStateToProps, null)(Images)
