import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import LogoHeader from '../../../../components/Header/Desktop/LogoHeader/LogoHeader'
import LoginForm from '../Components/LoginForm'
import GoogleOauth from '../Components/GoogleOAuth'
import Header from '../../../../components/Header/Header'

import './abc.scss'

function DesktopLogin() {
    return (
        <>
            <Header />
            
            <div className="sidebysider">
            <Container className='py-3 py-sm-4 py-md-5'>
            <div className="inside1">
                <Row>
                    <Col lg={7}>
                        <div className="text-center mb-4 font-weight-bold">
                            <p className="loginsekarang">
                            Login Sekarang
                            </p>
                        </div>
                        
                        <LoginForm />
                        <div className="text-center mb-7">
                            Belum punya akun? <Link to="/register" className="text-signature">
                                <u>
                                    Daftar sekarang
                                </u>
                            </Link>
                        </div>

                        <div className="text-grey text-center">
                            Atau masuk dengan
                        </div>

                        <div className="d-flex justify-content-center">
                            <GoogleOauth />
                        </div>
                        
                    </Col>
                </Row>
            </div>
            </Container>
            <div className="inside2">
                <div className="inside3">
                    <p className="bigtext">
                        Make event
                        <br />
                        planning more
                        <br />
                        convenient
                    </p>
                </div>
            </div>
            </div>
        </>
    )
}

export default DesktopLogin