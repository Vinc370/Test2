import React from 'react'
import { Navbar } from 'react-bootstrap'
import Logo from '../Logo'

/**
 * Navbar with only brand logo
 */
function LogoHeader() {
    return (
        <Navbar className="pl-5 border-bottom border-3">
            <Logo/>
        </Navbar>
    )
}

export default LogoHeader
