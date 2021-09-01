import React from 'react'
import { getMoneyFormat } from '../../utilities/Utilities'

import './DecorationThemeCard.scss'

const DecorationThemeCard = (props) => {
    return (
        <div className="decoration-theme-card decoration-theme-card__container">
            <div className="decoration-theme-card__image-container">
                <img
                    src={props.imgUrl}
                    alt={props.title}
                    width="299"
                    height="185"
                />
            </div>
            <div className={`decoration-theme-card__content ${!props.price ? 'no-price' : ''}`}>
                <p className="title">
                    {props.title}
                </p>
                <div className="price-container">
                    <div className="colors">
                        {
                            props.colors?.map((color, index) =>
                                <div
                                    key={`${color}_${index}`}
                                    className="color"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                />
                            )
                        }
                    </div>
                    {
                        props.price &&
                        <p className="price">
                            {getMoneyFormat(props.price)}
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default DecorationThemeCard