import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HeaderNavigationV2 from '../../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import GoogleOAuth from '../Components/GoogleOAuth'
import LoginForm from '../Components/LoginForm'
import RegisterBottom from './components/RegisterBottom'

function MobileLogin() {
    return (
        <>
            <HeaderNavigationV2
                title={'Login'}
                isBlack
                sticky={true}
            />

            <Container className='item-container'>
                <Row>
                    <Col lg={7} className="">
                        <LoginForm />
                        <div className="text-center">
                            <Link to="/forgot-password" className="text-signature">
                                Lupa password?
                            </Link>
                        </div>
                        <div className="text-grey text-center mt-5 mb-3">
                            Atau masuk dengan
                        </div>
                        <div className='d-flex align-center'>
                            <GoogleOAuth />
                        </div>
                    </Col>
                </Row>
            </Container>
            <RegisterBottom />
        </>
    )
}

export default MobileLogin