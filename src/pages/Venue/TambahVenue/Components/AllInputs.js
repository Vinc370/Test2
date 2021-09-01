import React, { useEffect } from 'react'
import Input from './Input'
import Dropdown from './Dropdown'
import { connect } from 'react-redux'

function AllInputs({ onChange, data, setData, isLoading, locations, culinaries, types }) {
    useEffect(() => {
        if (!culinaries.length) {
            return
        }

        setData(data => ({
            ...data,
            venue_culinary: culinaries[0].venue_one_category_id
        }))
    }, [culinaries, setData])

    useEffect(() => {
        if (!locations.length) {
            return
        }

        setData(data => ({
            ...data,
            venue_location: locations[0].venue_one_category_id
        }))
    }, [locations, setData])

    useEffect(() => {
        if (!types.length) {
            return
        }

        setData(data => ({
            ...data,
            venue_type: types[0].venue_one_category_id
        }))
    }, [types, setData])

    useEffect(() => {
        if (!SVGUnitTypes.length) {
            return
        }

        setData(data => ({
            ...data,
            venue_type: types[0].venue_one_category_id
        }))
    }, [types, setData])

    return (
        <>
            <Input 
                label="Nama Venue" 
                className="mb-4 mb-lg-5"
                controlId="place"
                name="venue_name"
                value={data.venue_name}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
            <Input 
                label="Alamat Lengkap" 
                className="mb-2"
                controlId="address"
                name="venue_address"
                value={data.venue_address}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
            <Input 
                label="No Telp" 
                className="mb-2"
                type="telephone"
                controlId="telephone"
                name="venue_phone"
                value={data.venue_phone}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
            <Dropdown 
                label="Lokasi"
                className="mb-2"
                controlId="location"
                name="venue_location"
                value={data.venue_location}
                allData={locations}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
            <Dropdown 
                label="Kuliner"
                className="mb-2"
                controlId="culinary"
                name="venue_culinary"
                value={data.venue_culinary}
                allData={culinaries}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
            <Dropdown 
                label="Type"
                className="mb-2"
                controlId="type"
                name="venue_type"
                value={data.venue_type}
                allData={types}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
            <Input 
                label="Email" 
                className="mb-2"
                type="email"
                controlId="email"
                name="venue_email"
                value={data.venue_email}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
            <Input 
                label="Max Tamu" 
                className="mb-2"
                type="number"
                controlId="count"
                name="venue_max_capacity"
                value={data.venue_max_capacity}
                onChange={event => onChange(event)}
                min={1}
                max={200}
                disabled={isLoading}
            />
            <Input 
                label="Service Charge (%)" 
                className="mb-2"
                type="number"
                controlId="service"
                name="venue_service_charge"
                value={data.venue_service_charge}
                onChange={event => onChange(event)}
                min={1}
                max={50}
                disabled={isLoading}
            />
            <Input 
                label="Service Charge Detail" 
                className="mb-2"
                controlId="service"
                name="venue_service_charge_detail"
                value={data.venue_service_charge_detail}
                onChange={event => onChange(event)}
                disabled={isLoading}
            />
        </>
    )
}

const mapStateToProps = state => ({
    locations: state.location.locations,
    culinaries: state.culinary.culinaries,
    types: state.type.types,
})

export default connect(mapStateToProps, null)(AllInputs)
