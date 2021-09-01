import React from 'react'
import AddAddons from './Components/AddAddons'
import ListAddons from './Components/ListAddons'
import { Form } from 'react-bootstrap'

function Addons({ addons, addAddons, removeAddons, isLoading }) {
    return (
        <Form.Group className="d-flex">
            <div className="d-flex w-50 w-lg-25 mt-4">
                <Form.Label className="w-100">Venue Add-ons</Form.Label>
                <span className="mr-4">: </span>
            </div>
            <div className="w-100">
                <div className="w-100">
                    <div className="mb-4">
                        <AddAddons 
                            addAddons={addAddons} 
                            isLoading={isLoading}
                        />
                    </div>
                    <ListAddons 
                        addons={addons}
                        removeAddons={removeAddons} 
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </Form.Group>
    )
}

export default Addons
