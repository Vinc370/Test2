import React from 'react'
import { Form } from 'react-bootstrap'

function Dropdown({ label, className, controlId = "", allData, ...rest }) {

    return (
        <Form.Group 
            controlId={controlId}
            className={`d-flex ${className}`}
        >
            <div className="d-flex align-items-center w-50 w-lg-25">
                <Form.Label className="w-100">
                    {label}
                </Form.Label>
                <span className="mr-4">: </span>
            </div>
            <Form.Control 
                as="select"
                {...rest}
            >
                {
                    allData?.map(data => (
                        <option 
                            value={data.venue_one_category_id}
                            key={data.venue_one_category_id}
                        >
                            {data.venue_one_category_name}
                        </option>
                    ))
                }
            </Form.Control>
        </Form.Group>
    )
}

export default Dropdown
