import React from 'react'
import './VenueHomeCard.scss'

const VenueHomeCard = ({
    img,
    to,
    title,
}) => {
    return (
        <a
            href={to}
            className="venue-home-card__container"
            style={{
                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.59) 14.99%, rgba(0, 0, 0, 0) 43.66%), url(${img})`
            }}
        >
            <div className="content">
                <p className="title">
                    {title}
                </p>
            </div>
        </a>
    )
}

export default VenueHomeCard