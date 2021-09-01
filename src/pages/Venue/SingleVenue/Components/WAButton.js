import React from 'react'
import SemiRoundedButton from '../../../../components/Button/SemiRoundedButton'
import { Link } from 'react-router-dom'

function WAButton({ className, style }) {
    return (
        <Link to="/request-meeting">
            <SemiRoundedButton 
                className={`${className} bg-transparent text-success border border-success border-2`}
                text="Chat Via WA"
                style={style}
            />
        </Link>
    )
}

export default WAButton
