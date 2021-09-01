import React from 'react'
import CheckboxFilter from './Components/CheckboxFilter/CheckboxFilter'
import RentangHarga from './Components/RentangHarga/RentangHarga'
import JumlahTamu from './Components/JumlahTamu/JumlahTamu'
import { connect } from 'react-redux'

import {
    addCulinaryFilter,
    addLocationFilter,
    addFacilityFilter,
    addTypeFilter,
    removeCulinaryFilter, 
    removeLocationFilter,
    removeFacilityFilter,
    removeTypeFilter,
} from '../../../../../../redux/actions/venue/venueFilter'

import {
    getCategoryOneID,
    getCategoryTypeID,
    getCategoryOneName,
    getCategoryTypeName,
} from '../../../../../../utilities/VenueUtilities'

import './FilterSideBar.scss'
import SelectFilter from './Components/SelectFilter/SelectFilter'
import HargaPerPax from '../../../Mobile/Components/FilterModal/Components/HargaPerPax/HargaPerPax'
import SelectionFilter from "../../../Mobile/Components/FilterModal/Components/SelectionFilter/SelectionFilter";

function FilterSideBar({ 
    locations, 
    culinaries,
    facilities, 
    types, 
    filterLocations, 
    filterCulinaries,
    filterFacilities, 
    filterTypes, 
    addCulinaryFilter,
    addLocationFilter,
    addFacilityFilter,
    addTypeFilter,
    removeCulinaryFilter,
    removeLocationFilter,
    removeFacilityFilter,
    removeTypeFilter,
}) {

    return (
        <div className="filter-sidebar">
            <h3 className="font-weight-bold mb-5">Filters</h3>
            <div className="d-grid">
                <CheckboxFilter 
                    label="Venue Style"
                    data={types}
                    getID={getCategoryOneID}
                    getName={getCategoryOneName}
                    add={addTypeFilter}
                    remove={removeTypeFilter}
                    filterData={filterTypes}
                />
                <CheckboxFilter 
                    label="Berdasarkan Lokasi"
                    data={locations}
                    getID={getCategoryOneID}
                    getName={getCategoryOneName}
                    add={addLocationFilter}
                    remove={removeLocationFilter}
                    filterData={filterLocations}
                /> 
                <CheckboxFilter 
                    label="Culinary Style"
                    data={culinaries}
                    getID={getCategoryOneID}
                    getName={getCategoryOneName}
                    add={addCulinaryFilter}
                    remove={removeCulinaryFilter}
                    filterData={filterCulinaries}
                />
                {/* <RentangHarga /> */}
                <HargaPerPax
                    title="Price Range"
                />
                {/* <JumlahTamu /> */}
                <CheckboxFilter 
                    label="Facility" 
                    data={facilities}
                    getID={getCategoryTypeID}
                    getName={getCategoryTypeName}
                    add={addFacilityFilter}
                    remove={removeFacilityFilter}
                    filterData={filterFacilities}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    locations: state.location.locations,
    culinaries: state.culinary.culinaries,
    facilities: state.facility.facilities,
    types: state.type.types,
    filterLocations: state.venueFilter.locations,
    filterCulinaries: state.venueFilter.culinaries,
    filterFacilities: state.venueFilter.facilities,
    filterTypes: state.venueFilter.types,
})

export default connect(mapStateToProps, {
    addCulinaryFilter,
    removeCulinaryFilter,
    addLocationFilter,
    removeLocationFilter,
    addFacilityFilter,
    removeFacilityFilter,
    addTypeFilter,
    removeTypeFilter,
})(FilterSideBar)
