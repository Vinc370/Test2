import PropTypes from 'prop-types'
import React from 'react'
import { Image } from 'react-bootstrap'
import Logo from '../../assets/images/Logo.png'
import './LoadingSpinner.scss'

/**
 * Loading spinner placeholder for when fetching data (default 25% of width)
 * @param {string} props.className      Additional classes to be added into the loading container
 */

function LoadingSpinner({ className }) {
    return (
        <div className={`loading-spinner bg-white m-0 ${className}`}>
            <div 
                className="vertical-center-loading">
                <div className="loading-container">
                    <Image
                      src={Logo}
                      className="img-transparent loading-image"
                    />
                </div>
            </div> 
        </div>
    )
}

const imgContainerStyle = {
    paddingBottom: '100%',
}

const imgStyle = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    objectFit: 'cover',
    objectPosition: 'center',
}

LoadingSpinner.propTypes = {
    animation: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
}

export default LoadingSpinner