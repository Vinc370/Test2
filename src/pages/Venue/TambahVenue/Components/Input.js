import React from 'react'
import { Form } from 'react-bootstrap'

function Input({ label, className, type = "text", placeholder = "", controlId = "", ...rest}) {
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
                type={type} 
                placeholder={placeholder}
                className="bg-lightgrey border-0 shadow-none"
                {...rest}    
            />
        </Form.Group>
    )
}

export default Input
