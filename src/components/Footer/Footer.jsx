import React, { useEffect, useState } from 'react'
import { getAllEvents } from '../../services/EventService'

import './Footer.scss'

import FooterImage from '../../assets/images/footer-image.png'
import FooterImageMobile from '../../assets/images/footer-image-mobile.png'

import { domainLink } from '../../sources/Variables'
import LocationIcon from '../../assets/icons/LocationIcon'
import MailIcon from '../../assets/icons/MailIcon'
import { FaFacebookSquare, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    const [eventOrganizers, setEventOrganizers] = useState([])
    const [email, setEmail] = useState('')

    useEffect( () => {
        let response = getAllEvents();

        response.then(function(res){
            setEventOrganizers(res.data)
        })
    }, [])

    const socialMediaList = (
        <>
            <a href="https://www.facebook.com/littlecloudeo/" target="_blank" rel="noopener noreferrer" >
                <FaFacebookSquare/>
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer" >
                <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" >
                <FaLinkedinIn />
            </a> */}
            <a  href="https://www.youtube.com/channel/UC9hHzrzqOi2xmaph1cWASjQ" target="_blank" rel="noopener noreferrer" >
                <FaYoutube />
            </a>
            <a  href="https://www.instagram.com/littlecloudeo/" target="_blank" rel="noopener noreferrer" >
                <FaInstagram />
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer" >
                <FaGooglePlusG />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" >
                <FaPinterest />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" >
                <FaRss />
            </a> */}  
        </>
    )

    return (
        <footer className="page-footer pb-5 border-top">
            <div className="general-container">
                <div className="mobile-footer">
                    <div className="jasa">
                        <p className="title">
                            Jasa
                        </p>
                        <div className="items-container">
                            {
                                eventOrganizers?.slice(0, 4)?.map((event, index) =>
                                    <a
                                        href={domainLink+'/event-organizer/'+event.event_organizer_route} 
                                        target="_blank" rel="noopener noreferrer"
                                        rel="noopener noreferrer"
                                        key={index}
                                        className="item"
                                    >
                                        {event.event_organizer_name}
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    <div className="about">
                        <p className="title">
                            Tentang Littlecloud
                        </p>
                        <div className="items-container">
                            <a href='https://littlecloudeo.com/company' target='_blank' className="item">Tentang Kami</a>
                            <a href='https://api.whatsapp.com/send?phone=62895343534808' target='_blank' className="item">Kontak Kami</a>
                            <a className="item">Terms & Condition</a>
                            <a href='https://littlecloudeo.com/company/faq' target='_blank' className="item">Bantuan</a>
                            <a href='https://littlecloudeo.com/company/karir' target='_blank' className="item">Karir</a>
                        </div>
                    </div>
                    <div className="news-letter-container">
                        <p className="news-letter">
                            News Letter
                        </p>
                        <div className="email-input-container">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <MailIcon />
                        </div>
                    </div>
                    <div className="logo">
                        <img
                            src={FooterImageMobile}
                            alt="littlecloud logo"
                            className="img-transparent"
                        />
                    </div>
                    <div className="copyright">
                        © 2020 Little Cloud. All rights reserved.
                    </div>
                    <div className="social-media-container">
                        {socialMediaList}
                    </div>
                    <div className="email">
                        <a target="_blank" rel="noopener noreferrer" href="mailto:company@littlecloudeo.com ">
                            company@littlecloudeo.com 
                        </a>
                    </div>
                    <div className="phone-number">
                        <a target="_blank" rel="noopener noreferrer" href="tel:62895343534808">
                            0895343534808
                        </a>
                    </div>
                    <div className="contact">
                        <p className="title">
                            Head Office
                        </p>
                        <div className="address-container">
                            <LocationIcon />
                            <p className="address">
                                PT Kreasi Inovasi Bangsa JI. Ternate no 6 Cideng, Gambir, Kota Jakarta pusat
                            </p>
                        </div>
                    </div>
                </div>
                <div className="desktop-footer">
                    <div className="logo">
                        <img
                            src={FooterImage}
                            alt="littlecloud logo"
                            className="img-transparent"
                        />
                    </div>
                    <div className="jasa">
                        <p className="title">
                            Jasa
                        </p>
                        <div className="items-container">
                            {
                                eventOrganizers?.map((event, index) =>
                                    <a
                                        href={domainLink+'/event-organizer/'+event.event_organizer_route} 
                                        target="_blank" rel="noopener noreferrer"
                                        rel="noopener noreferrer"
                                        key={index}
                                        className="item"
                                    >
                                        {event.event_organizer_name}
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    <div className="about">
                        <p className="title">
                            Tentang Littlecloud
                        </p>
                        <div className="items-container">
                            <a href='https://littlecloudeo.com/company' target='_blank' className="item">Tentang Kami</a>
                            <a className="item">Kontak Kami</a>
                            <a className="item">Terms & Condition</a>
                            <a href='https://littlecloudeo.com/company/faq' target='_blank' className="item">Bantuan</a>
                            <a className="item">Karir</a>
                        </div>
                    </div>
                    <div className="contact">
                        <p className="title">
                            Head Office
                        </p>
                        <div className="address-container">
                            <LocationIcon />
                            <p className="address">
                                PT Kreasi Inovasi Bangsa JI. Ternate no 6 Cideng, Gambir, Kota Jakarta pusat
                            </p>
                        </div>
                        <p className="news-letter">
                            News Letter
                        </p>
                        <div className="email-input-container">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <MailIcon />
                        </div>
                        <div className="social-media-title">
                            Social Media
                        </div>
                        <div className="social-media-container">
                            {socialMediaList}
                        </div>
                    </div>
                    <div className="email">
                        <a target="_blank" rel="noopener noreferrer" href="mailto:company@littlecloudeo.com">
                            company@littlecloudeo.com
                        </a>
                    </div>
                    <div className="phone-number">
                        <a target="_blank" rel="noopener noreferrer" href="tel:6289534354808">
                            089534354808
                        </a>
                    </div>
                    <div className="copyright">
                        © 2020 Little Cloud. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer