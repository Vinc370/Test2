import React from 'react'
import AddPackages from './Components/AddPackages'
import ListPackages from './Components/ListPackages'
import { Form } from 'react-bootstrap'

function Addons({ packages, addPackages, removePackages, isLoading }) {
    return (
        <Form.Group className="d-flex">
            <div className="d-flex w-50 w-lg-25 mt-4">
                <Form.Label className="w-100">Venue Packages</Form.Label>
                <span className="mr-4">: </span>
            </div>
            <div className="w-100">
                <div className="w-100">
                    <div className="mb-4">
                        <AddPackages 
                            addPackages={addPackages} 
                            isLoading={isLoading}
                        />
                    </div>
                    <ListPackages 
                        packages={packages}
                        removePackages={removePackages} 
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </Form.Group>
    )
}

export default Addons
