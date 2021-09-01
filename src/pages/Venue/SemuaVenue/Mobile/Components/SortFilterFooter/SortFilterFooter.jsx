import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsFilter } from 'react-icons/bs'
import { GrSort } from 'react-icons/gr'
import './SortFilterFooter.scss'
import FilterModal from '../FilterModal/FilterModal'

function SortFilterFooter() {
    const [filterShow, setFilterShow] = useState(false)

    const handleShow = () => {
        setFilterShow(true)
    }
    
    const handleClose = () => {
        setFilterShow(false)
    }

    return (
        <>
            <FilterModal 
                show={ filterShow } 
                handleClose={ handleClose } 
            />
            <Container fluid className="footer-container text-center bg-light py-2 card-shadow text-signature font-weight-bold position-fixed"
                style={footerContainerStyle}
            >
                <Row>
                    <Col 
                        role="button" 
                        onClick={ handleShow }
                    >
                        <BsFilter className="filter-icon" /> Filter
                    </Col>
                    <div 
                        className='bg-secondary' 
                        style={{
                            width: '1px'
                        }}
                    />
                    {/*<Col role="button">*/}
                    {/*    <GrSort /> Urutkan*/}
                    {/*</Col>*/}
                </Row>
            </Container>
        </>
    )
}

const footerContainerStyle={
    bottom:0
}
export default SortFilterFooter
