import React from 'react'
import { Modal } from 'react-bootstrap'
import './FilterModal.scss'
import JumlahTamu from './Components/JumlahTamu/JumlahTamu'
import SelectionFilter from './Components/SelectionFilter/SelectionFilter'
import HargaPerPax from './Components/HargaPerPax/HargaPerPax'
import { connect } from 'react-redux'

import {
    addCulinaryFilter,
    addFacilityFilter,
    addLocationFilter,
    addTypeFilter,
    removeCulinaryFilter,
    removeFacilityFilter,
    removeLocationFilter,
    removeTypeFilter,
} from '../../../../../../redux/actions/venue/venueFilter'

import {
    getCategoryOneID,
    getCategoryTypeID,
    getCategoryOneName,
    getCategoryTypeName,
} from '../../../../../../utilities/VenueUtilities'

function FilterModal({
    show, 
    handleClose,
    addCulinaryFilter,
    addFacilityFilter,
    addLocationFilter,
    addTypeFilter,
    removeCulinaryFilter,
    removeFacilityFilter,
    removeLocationFilter,
    removeTypeFilter,
    culinaries,
    facilities,
    locations,
    types,
    filterCulinaries,
    filterFacilities,
    filterLocations,
    filterTypes,
}) {
    return (
        <Modal 
            show={ show } 
            onHide={ handleClose }
            dialogClassName="filter-modal-dialog"
            contentClassName="filter-modal"
            centered
            style={{
                fontFamily: "'Roboto', sans-serif",
            }}
        >
            <Modal.Header>
                <Modal.Title className="font-weight-bold text-center w-100 filter-title font-size-10">Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <JumlahTamu className="mb-2" />
                <SelectionFilter 
                    label="Venue Style :" 
                    data={types}
                    getID={getCategoryOneID}
                    getName={getCategoryOneName}
                    add={addTypeFilter}
                    remove={removeTypeFilter}
                    filterData={filterTypes}
                />
                <SelectionFilter 
                    label="Lokasi :" 
                    data={locations}
                    getID={getCategoryOneID}
                    getName={getCategoryOneName}
                    add={addLocationFilter}
                    remove={removeLocationFilter}
                    filterData={filterLocations}
                />
                <SelectionFilter
                    label="Kuliner :" 
                    data={culinaries}
                    getID={getCategoryOneID}
                    getName={getCategoryOneName}
                    add={addCulinaryFilter}
                    remove={removeCulinaryFilter}
                    filterData={filterCulinaries}
                />
                <HargaPerPax />
                <SelectionFilter
                    label="Fasilitas :" 
                    data={facilities}
                    getID={getCategoryTypeID}
                    getName={getCategoryTypeName}
                    add={addFacilityFilter}
                    remove={removeFacilityFilter}
                    filterData={filterFacilities}
                />
            </Modal.Body>
            <Modal.Footer>
                <div className="filter-modal__filter-buttons">
                    {/* TODO: --demas-- belum ada onlick nya */}
                    <button
                        className="reset-button"
                    >
                        Reset
                    </button>
                    <button
                        className="apply-button"
                        onClick={handleClose}
                    >
                        Apply
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
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
})(FilterModal)
