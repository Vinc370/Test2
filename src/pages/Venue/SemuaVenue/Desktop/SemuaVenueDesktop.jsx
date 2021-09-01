import React from 'react'
import Header from '../../../../components/Header/Header'
import { Container, Col, Row } from 'react-bootstrap'
import AllVenues from './Components/AllVenues/AllVenues'
import FilterSideBar from './Components/FilterSideBar/FilterSideBar'
import MetaTags from 'react-meta-tags';
import './SemuaVenueDesktop.scss'

function SemuaVenueDesktop() {
    return (
        <div className="semua-venue-desktop">
            <MetaTags>
                <meta name="description" content="Cari venue hotel atau restoran termurah hanya di Littlecloud. Transaksi mudah, aman, dan proses instan." />
            </MetaTags>
            <Header />
            <div className="general-container">
                <Row>
                    <Col xs={12}>
                        <h1 className="section-title__primary">
                            Venue di Jakarta
                        </h1>
                    </Col>
                    <Col xs={3}>
                        <FilterSideBar />
                    </Col>
                    <Col>
                        <AllVenues />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SemuaVenueDesktop
