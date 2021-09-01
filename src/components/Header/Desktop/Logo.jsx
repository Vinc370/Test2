import React from 'react'
import { Link } from 'react-router-dom'
import { NavbarBrand } from 'react-bootstrap'

function Logo() {
    return (
        <NavbarBrand
            as={ Link }
            to="/"
        >
            <span className="h2 text-signature font-weight-bold">
                Littlecloud
            </span>
        </NavbarBrand>
    )
}

export default Logo
