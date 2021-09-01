import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from '../../../../../../components/Button/Button'

function AddAddons({ addAddons, isLoading }) {
    const [newAddon, setNewAddon] = useState({
        venue_addons_name: '',
        venue_addons_price: 0,
    })

    const onClick = () => {
        addAddons(newAddon)
    }

    const onChange = e => {
        setNewAddon(newAddon => ({
            ...newAddon,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <div className="d-flex w-100">
                <div className="w-50 pr-2">
                    <Form.Label htmlFor="add-on-name">Add-on Name</Form.Label>
                    <Form.Control 
                        className="bg-lightgrey border-0 shadow-none w-100"
                        id="add-on-name"
                        name="venue_addons_name"
                        value={newAddon.venue_addons_name}
                        onChange={onChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="w-50 pl-2">
                    <Form.Label htmlFor="add-on-price">Add-on Price (Rp)</Form.Label>
                    <Form.Control 
                        type="number"
                        name="venue_addons_price"
                        className="bg-lightgrey border-0 shadow-none w-100"
                        id="add-on-price"
                        value={newAddon.venue_addons_price}
                        onChange={onChange}
                        disabled={isLoading}
                    />
                </div>
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

export default AddAddons
