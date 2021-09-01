import React from 'react'
import { useGoogleLogout } from 'react-google-login'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import AboutIcon from '../../../../../assets/icons/AboutIcon'
import HelpIcon from '../../../../../assets/icons/HelpIcon'
import LogoutIcon from '../../../../../assets/icons/LogoutIcon'
import MyAccountIcon from '../../../../../assets/icons/MyAccountIcon'
import RightArrowBold from '../../../../../assets/icons/RightArrowBold'
import { AUTH_GOOGLE, AUTH_LOGIN } from '../../../../../constants/LoginConstants'
import { googleLogout, loginLogout } from '../../../../../redux/actions/authentication/authentication'
import './Buttons.scss'


function Buttons({ googleLogout, loginLogout, authType }) {
    const history = useHistory()
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT,
    })

    const onClick = e => {
        e.preventDefault()

        if (authType === AUTH_LOGIN) {
            loginLogout()
        } else if (authType === AUTH_GOOGLE) {
            signOut()
            googleLogout()
        }

        history.push('/')
    }

    const getChangePasswordButton = () => {
        if (authType !== AUTH_LOGIN) {
            return null
        }

        return (
            <Link
                to="/change-password"
                className="buttons__item"
                style={linkStyle}
            >
                <span>Change Password</span>
                <RightArrowBold className="buttons__item-right-icon" />
            </Link>
        )
    }

    return (
        <>
            <div className="buttons__container">
                <Link 
                    to="/update-akun"
                    className="buttons__item"
                    style={linkStyle}
                >
                    <MyAccountIcon className="buttons__item-left-icon" />
                    <span>Akun Saya</span>
                    <RightArrowBold className="buttons__item-right-icon" />
                </Link>
                {/*<Link */}
                {/*    to="/my-voucher"*/}
                {/*    className="buttons__item"*/}
                {/*    style={linkStyle}*/}
                {/*>*/}
                {/*    <PromoIcon className="buttons__item-left-icon" />*/}
                {/*    <span>Voucher Saya</span>*/}
                {/*    <RightArrowBold className="buttons__item-right-icon" />*/}
                {/*</Link>*/}
                {/*/!* TODO: --demas-- link belum ada *!/*/}
                {/*<Link */}
                {/*    to="/my-voucher"*/}
                {/*    className="buttons__item"*/}
                {/*    style={linkStyle}*/}
                {/*>*/}
                {/*    <BellIcon className="buttons__item-left-icon" />*/}
                {/*    <span>Notifikasi</span>*/}
                {/*    <RightArrowBold className="buttons__item-right-icon" />*/}
                {/*</Link>*/}
                <a 
                    href="https://littlecloudeo.com/company/faq"
                    className="buttons__item"
                    style={linkStyle}
                    target="blank"
                >
                    <HelpIcon className="buttons__item-left-icon" />
                    <span>Bantuan</span>
                    <RightArrowBold className="buttons__item-right-icon" />
                </a>
                <a
                    href="https://littlecloudeo.com/company"
                    className="buttons__item"
                    style={linkStyle}
                    target="blank"
                >
                    <AboutIcon className="buttons__item-left-icon" />
                    <span>Tentang Kami</span>
                    <RightArrowBold className="buttons__item-right-icon" />
                </a>
                {/* <Link 
                    to="/keranjang"
                    className="buttons__item"
                    style={linkStyle}
                >
                    <span>Pembayaran</span>
                    <RightArrowBold className="buttons__item-right-icon" />
                </Link> */}

                {/* {getChangePasswordButton()} */}
            </div>

            <Link 
                to=""
                className="buttons__logout"
                onClick={e => onClick(e)}
            >
                <LogoutIcon className="buttons__logout-icon" />
                <span>Logout</span>
            </Link>
        </>
    )
}

const linkStyle = {
    borderRadius: '5px',
}

const mapStateToProps = state => ({
    authType: state.authentication.authType
})

export default connect(mapStateToProps, {
    googleLogout,
    loginLogout,
})(Buttons)
