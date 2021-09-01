import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from '../../../../../../components/Button/Button'

function AddPackages({ addPackages, isLoading }) {
    const [newPackage, setNewPackage] = useState({
        venue_package_name: '',
        venue_package_detail: '',
        venue_package_price: 0,
        venue_package_sell_price: 0,
        venue_package_total_pax: 0,
        venue_package_minimum_pax: 0,
    })

    const onChange = e => {
        setNewPackage(newPackage => ({
            ...newPackage,
            [e.target.name]: e.target.value
        }))
    }

    const onClick = () => {
        addPackages(newPackage)
    }

    return (
        <>
            <div className="d-grid grid-template-col-2 grid-template-col-md-3 grid-gap-1">
                <div className="w-100">
                    <Form.Label htmlFor="venue_package_name">Package Name</Form.Label>
                    <Form.Control 
                        name="venue_package_name"
                        className="bg-lightgrey border-0 shadow-none w-100"
                        id="venue_package_name"
                        value={newPackage.venue_package_name}
                        onChange={onChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="w-100">
                    <Form.Label htmlFor="venue_package_name">Package Price (Rp)</Form.Label>
                    <Form.Control 
                        type="number"
                        name="venue_package_price"
                        className="bg-lightgrey border-0 shadow-none w-100"
                        id="venue_package_price"
                        value={newPackage.venue_package_price}
                        onChange={onChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="w-100">
                    <Form.Label htmlFor="venue_package_name">Package Sell Price (Rp)</Form.Label>
                    <Form.Control 
                        type="number"
                        name="venue_package_sell_price"
                        className="bg-lightgrey border-0 shadow-none w-100"
                        id="venue_package_sell_price"
                        value={newPackage.venue_package_sell_price}
                        onChange={onChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="w-100">
                    <Form.Label htmlFor="venue_package_total_pax">Total Pax (Rp)</Form.Label>
                    <Form.Control 
                        type="number"
                        name="venue_package_total_pax"
                        className="bg-lightgrey border-0 shadow-none w-100"
                        id="venue_package_total_pax"
                        value={newPackage.venue_package_total_pax}
                        onChange={onChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="w-100">
                    <Form.Label htmlFor="venue_package_name">Package Minimum Pax</Form.Label>
                    <Form.Control 
                        type="number"
                        name="venue_package_minimum_pax"
                        className="bg-lightgrey border-0 shadow-none w-100"
                        id="venue_package_minimum_pax"
                        value={newPackage.venue_package_minimum_pax}
                        onChange={onChange}
                        disabled={isLoading}
                    />
                </div>
            </div>
            <div className="mt-3">
                <Form.Label htmlFor="venue_package_name">Package Description</Form.Label>
                <Form.Control 
                    name="venue_package_detail"
                    className="bg-lightgrey border-0 shadow-none w-100"
                    id="venue_package_detail"
                    value={newPackage.venue_package_detail}
                    onChange={onChange}
                    disabled={isLoading}
                />
            </div>
            <div className="d-flex justify-content-end mt-2">
                <Button 
                    text="+"
                    onClick={() => onClick()}
                    disabled={isLoading}
                />
            </div>
        </>
    )
}

export default AddPackages
