import axios from "axios"
import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useGoogleLogout } from 'react-google-login'
import { IoMdArrowDropdown, IoMdCall } from 'react-icons/io'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import BurgerMenu from '../../assets/icons/BurgerMenu'
import LeftArrowIcon from '../../assets/icons/LeftArrowIcon'
import SearchIcon from '../../assets/icons/SearchIcon'
import { AUTH_GOOGLE, AUTH_LOGIN } from '../../constants/LoginConstants'
import { googleLogout, loginLogout } from '../../redux/actions/authentication/authentication'
import { getAllEvents } from '../../services/EventService'
import UrlService from '../../services/UrlService'
import { link } from "../../sources/Variables"
import './Header.scss'

function Header({
    isLoggedIn,
    type,
    showNewMobile,
    sticky=true,
    fixed=false,
    googleLogout,
    loginLogout,
    authType,
    user
}) {
    const history = useHistory()
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT,
    })

    const logout = e => {
        e.preventDefault()

        if (authType === AUTH_LOGIN) {
            loginLogout()
        } else if (authType === AUTH_GOOGLE) {
            signOut()
            googleLogout()
        }

        history.push('/')

        setIsSidebarOpen(false)
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isHeaderSearchFocus, setIsHeaderSearchFocus] = useState(false)

    const [isBuatEventOpen, setIsBuatEventOpen] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [data, setData] = useState([])

    const [event_organizers, setEventOrganizer] = useState(null);

    const handleSearch =(input) =>{

        if(input === ''){
            return clearData()
        }
        const url = link + '/api/search'
        const formData = new FormData()

        setKeyword(input)
        formData.append('keyword', keyword)
        axios({
            method: 'post',
            url: url,
            data: formData,
            headers: { 'Content-Type': 'application/json' },
        }).then(function(response) {
            setData(response.data)
        })
    }

    const onHeaderInputFocus = () => setIsHeaderSearchFocus(true)
    const onHeaderInputBlur = () => setIsHeaderSearchFocus(false)

    const clearData=()=>{
        setData([])
    }

    useEffect(() => {
        getAllEvents().then((data) => { setEventOrganizer(data.data) });
    }, [])

    return (
        <>
            <Container fluid className={`header color-transition ${type || ''} ${sticky ? 'sticky' : ''} ${fixed ? 'fixed' : ''}`} style={{zIndex: 1302}}>
                {
                    showNewMobile &&
                    <Row className="header-mobile-container">
                        <Col xs={12} className="header-mobile">

                            <Link to="/">
                                <img
                                  src={`/${type === 'white' ? 'logo-dark.png' : 'littlecloud_logo.png'}`}
                                  alt="LittleCloud"
                                  width="120"
                                  height="35"
                                  className="img-transparent cursor-pointer"
                                />
                            </Link>
                            <div>
                                <Link to="/search" className='mr-3'>
                                    <SearchIcon />
                                </Link>
                                <BurgerMenu onClick={() => setIsSidebarOpen(true)} />
                            </div>

                        </Col>
                    </Row>
                }
                <div className={`header-desktop ${type || 'white'}`}>
                    <div className="general-container header-new">
                        <div className="left">
                            <Link to="/" className="logo">
                                <img
                                    src={(type === 'white' || !type) ? '/littlecloud_logo_dark 2.png' : '/littlecloud_logo_white 2.png'}
                                    alt="logo"
                                    height="35"
                                    width="152"
                                    className="img-transparent cursor-pointer"
                                />
                            </Link>
                        </div>
                        <div className="center">
                            <div className={`buat-event`}>
                                <span>
                                    Buat Event <IoMdArrowDropdown className="icon" />
                                </span>
                                <div className={`dropdown`}>
                                    {event_organizers?.slice(0,4)?.map((event_organizer, key) => (
                                        <a
                                            href={'/event-organizer/' + event_organizer.event_organizer_route}
                                            key={key}
                                            className="dropdown-item"
                                        >
                                            <div className="image-container">
                                                <img
                                                    src={UrlService.getImageUrl('logo-home-background-'+event_organizer.event_organizer_image)}
                                                    alt={event_organizer.event_organizer_name}
                                                />
                                            </div>
                                            <div className="label-container">
                                                <p>{event_organizer.event_organizer_name}</p>
                                                <p className='small'>{event_organizer.event_organizer_description}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <Link to="/keranjang">
                                Keranjang
                            </Link>
                            {/* TODO: belum ada linknya */}
                            <a href="https://instagram.com/littlecloudeo" target="_blank">
                                Inspirasi
                            </a>
                        </div>
                        <div className="right">
                            {
                                isLoggedIn ?
                                    <>
                                        <Link to="/event-saya">
                                            Event Saya
                                        </Link>
                                        <span className="divider-login" />
                                        <Link to="/akun">
                                            Akun Saya
                                        </Link>
                                        <span className="divider-login" />
                                        <Link
                                            to=""
                                            onClick={logout}
                                        >
                                            Logout
                                        </Link>
                                    </>
                                    :
                                    <>
                                        {/* TODO: belum ada linknya */}
                                        <a href='https://api.whatsapp.com/send?phone=62895343534808' target='_blank'>
                                            <IoMdCall className="call-icon" />
                                        </a>
                                        <span className="divider-not-login" />
                                        <span>
                                            <Link to="/login">
                                                Masuk
                                            </Link>
                                            /
                                            <Link to="/register">
                                                Daftar
                                            </Link>
                                        </span>
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <Row className='p-3 light-grey-background align-horizontally sub-header-desktop'>
                    <div className="for-header">
                        <Link to='/tambah-venue' className='grey-text mr-2 '>Daftar Menjadi Mitra</Link>
                        <a href='https://littlecloudeo.com/company' target='_blank' className='grey-text mr-2'>Tentang Kami</a>
                        <a href='https://littlecloudeo.com/company/faq' target='_blank' className='grey-text mr-2'>Bantuan</a>
                        <Link to='https://www.instagram.com/littlecloudeo/' target='_blank' className='grey-text mr-2'>Instagram</Link>
                        <Link to='https://www.youtube.com/channel/UC9hHzrzqOi2xmaph1cWASjQ' target='_blank' className='grey-text mr-2'>Youtube</Link>
                    </div>
                </Row>
            </Container>

            <>
                {
                    isSidebarOpen &&
                    <div
                        className="sidebar__backdrop"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                }
                <div className={`sidebar__container ${isSidebarOpen ? 'open' : ''}`}>
                    {
                        isLoggedIn ?
                            <>
                                {
                                    user &&
                                    <div className="sidebar__account-info">
                                        <Image
                                            src={link + '/img/storage/' + user.image}
                                            // style={imageStyle}
                                            className="account-image"
                                        />
                                        <div className="account-name">{user.name}</div>
                                    </div>
                                }
                                <Link
                                    to="/"
                                    className="link"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/keranjang"
                                    className="link"
                                >
                                    Keranjang Saya
                                    <LeftArrowIcon className={`icon`} />
                                </Link>
                                <Link
                                    to="/transaksi"
                                    className="link"
                                >
                                    Transaksi
                                    <LeftArrowIcon className={`icon`} />
                                </Link>
                            </>
                            :
                            <>
                                <p className="title">
                                    Littlecloud EO
                                </p>
                                <Link
                                    to="/login"
                                >
                                    Login / Register
                                </Link>
                            </>
                    }
                    <div
                        className={`sidebar__dropdown-button`}
                        onClick={() => setIsBuatEventOpen(prev => !prev)}
                    >
                        <p>
                            Buat Event
                        </p>
                        <LeftArrowIcon className={`icon ${isBuatEventOpen ? 'open' : ''}`} />
                    </div>
                    <div className={`sidebar__dropdown-container ${isBuatEventOpen ? 'open' : ''}`}>
                        {event_organizers?.slice(0,4)?.map((event_organizer, key) => (
                            <Link to={'/event-organizer/' + event_organizer.event_organizer_route} key={key} className="link">
                                {event_organizer.event_organizer_name}
                            </Link>
                        ))}
                    </div>
                    <hr className="sidebar__divider" />
                    <a
                        href="https://littlecloudeo.com/company/faq"
                        className="link"
                        target='_blank'
                        rel="noreferrer noopener"
                    >
                        Bantuan
                    </a>
                    {/* TODO: belum ada linknya */}
                    <Link
                        to={'/request-meeting'}
                        target={'_blank'}
                        className="link"
                    >
                        Hubungi Kami
                    </Link>
                    <Link
                        to="/tambah-venue"
                        className="link"
                    >
                        Daftar Menjadi Mitra
                    </Link>
                    {
                        isLoggedIn ?
                            <>
                                <hr className="sidebar__divider" />
                                <Link
                                    to="/akun"
                                    className="link"
                                >
                                    Akun Saya
                                </Link>
                                <span
                                    className="link red"
                                    onClick={logout}
                                >
                                    Logout
                                </span>
                            </>
                            :
                            null
                    }
                </div>
            </>
        </>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.authentication.isLoggedIn,
    authType: state.authentication.authType,
    user: state.authentication.currentUser,
})

export default connect(
    mapStateToProps, {
        googleLogout,
        loginLogout,
    }
)(Header)
