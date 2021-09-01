import React from 'react'
import { Navbar, NavbarBrand } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

/**
 * Header mobile yang cuman ngasih tau sekarang page apa
 * @param {object} props 
 * @param {string} props.currentPage  Current page yang ditampilin
 * @example
 * <CurrentPageHeader currentPage="Home Page" />
 */
function CurrentPageHeader({ currentPage }) {
    const history = useHistory()

    return (
        <Navbar bg="signature" variant="dark">
            <NavbarBrand onClick={history.goBack} role="button" className="">
                <span className="mr-3 h5">
                    &lt;
                </span>
                <span className="font-size-8 font-size-md-10">
                    {currentPage}
                </span>
            </NavbarBrand>
        </Navbar>
    )
}

CurrentPageHeader.propTypes = {
    currentPage: PropTypes.string.isRequired
}

export default CurrentPageHeader