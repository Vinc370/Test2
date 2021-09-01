import React from 'react'
import { Col, Row } from 'react-bootstrap'
import LeftPart from './Components/LeftPart/LeftPart'
import RightPart from './Components/RightPart/RightPart'

function BottomPart({ className }) {
    return (
        <div className={className}>
            <Row>
                <Col lg={8} xl={7}>
                    <LeftPart />
                </Col>
                <Col className="d-sm-none d-lg-block">
                    <RightPart />
                </Col>
            </Row>
        </div>
    )
}

export default BottomPart
