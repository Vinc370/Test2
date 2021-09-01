import React from 'react'
import { Link } from 'react-router-dom'

import './KonsultasiAcaraCard.scss'

// interface KonsultasiAcaraCardProps {
//     img: string
//     title: string
//     /**
//      * also include the 'minute' text
//      */
//     time: string
//     to: string
// }

const KonsultasiAcaraCard = (props) => {
    return (
        <Link to={props.to}>
            <div className="konsultasi-card">
                <div
                    style={{
                        backgroundImage: `url("${props.img}")`
                    }}
                >
                    <div className="overlay" />
                    <p className="title">
                        {props.title}
                    </p>
                    <p className="subtitle">
                        {props.time}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default KonsultasiAcaraCard