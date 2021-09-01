import React from 'react'
import { Table } from 'react-bootstrap'
import Button from '../../../../../../components/Button/Button'

function ListAddons({ addons, removeAddons, isLoading }) {
    const onClick = value => {
        removeAddons(value)
    }

    return (
        <>
            { addons.length > 0
                &&
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Add-on Name</th>
                            <th>Add-on Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            addons?.map((addon, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{addon.venue_addons_name}</td>
                                    <td>{addon.venue_addons_price}</td>
                                    <td className="d-flex justify-content-center">
                                        <Button
                                            text="Remove"
                                            onClick={() => onClick(idx)} 
                                            color="danger"
                                            disabled={isLoading}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            }
        </>
    )
}

export default ListAddons
