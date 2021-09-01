import React from 'react'
import { Table } from 'react-bootstrap'
import Button from '../../../../../../components/Button/Button'

function ListPackages({ packages, removePackages, isLoading }) {
    const onClick = idx => {
        removePackages(idx)
    }

    return (
        <>
            { packages.length > 0
                &&
                packages?.map((pkg, idx) => (
                    <div 
                        className="border-top border-bottom py-2"
                        key={idx}
                    >
                        <div className="mb-1">
                            <small>Package Name: </small>
                            <div>{pkg.venue_package_name}</div>
                        </div>
                        <div className="my-1">
                            <small>Package Price: </small>
                            <div>{pkg.venue_package_price}</div>
                        </div>
                        <div className="my-1">
                            <small>Package Sell Price: </small>
                            <div>{(pkg.venue_package_sell_price / pkg.venue_package_total_pax)}</div>
                        </div>
                        <div className="my-1">
                            <small>Package Minimum Pax: </small>
                            <div>{pkg.venue_package_minimum_pax}</div>
                        </div>
                        <div className="my-1">
                            <small>Package Description: </small>
                            <div>{pkg.venue_package_detail}</div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button
                                text="Remove"
                                onClick={() => onClick(idx)} 
                                color="danger"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ListPackages
