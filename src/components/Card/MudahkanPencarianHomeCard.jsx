import React from 'react'
import { Link } from 'react-router-dom'
import './MudahkanPencarianHomeCard.scss'

const MudahkanPencarianHomeCard = ({
    title, // string
    subtitle, // string
    img, // string
    to, // string
}) => {
    return (
        <Link
            to={to}
            className="mudahkan-pencarian-card__container"
        >
            <div className="img-container">
                <img
                    src={img}
                    alt={title}
                    width="393"
                    height="240"
                />
            </div>
            <p className="title">
                {title}
            </p>
            <p className="subtitle">
                {subtitle}
            </p>
        </Link>
    )
}

export default MudahkanPencarianHomeCard