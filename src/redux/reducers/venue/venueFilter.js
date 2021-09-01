import { 
    INCREASE_GUEST_COUNT, 
    DECREASE_GUEST_COUNT,
    CHANGE_GUEST_COUNT,
    CHANGE_PAX_PRICE_RANGE,
    CHANGE_PAX_PRICE_MIN,
    CHANGE_PAX_PRICE_MAX,
    ADD_LOCATION_FILTER,
    REMOVE_LOCATION_FILTER,
    ADD_CULINARY_FILTER,
    REMOVE_CULINARY_FILTER,
    ADD_FACILITY_FILTER,
    REMOVE_FACILITY_FILTER,
    ADD_TYPE_FILTER,
    REMOVE_TYPE_FILTER,
} from '../../types/venueActionTypes'
import { MAX_PRICE_PER_PAX } from '../../../constants/VenueFilterConstants'

const initialState = {
    guestCount: 1,
    paxPriceRange: {
        min: 100000,
        max: MAX_PRICE_PER_PAX
    },
    locations: [],
    culinaries: [],
    facilities: [],
    types: new URLSearchParams(window.location.search).has('type') ? [new URLSearchParams(window.location.search).get('type')] : [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE_GUEST_COUNT:
            return increaseGuestCount(state)
        case DECREASE_GUEST_COUNT:
            return decreaseGuestCount(state)
        case CHANGE_GUEST_COUNT:
            return changeGuestCount(state, action.payload)
        case CHANGE_PAX_PRICE_RANGE:
            return changePaxPriceRange(state, action.payload)
        case CHANGE_PAX_PRICE_MIN:
            return changePaxPriceMin(state, action.payload)
        case CHANGE_PAX_PRICE_MAX:
            return changePaxPriceMax(state, action.payload)
        case ADD_LOCATION_FILTER:
            return addLocationFilter(state, action.payload)
        case REMOVE_LOCATION_FILTER:
            return removeLocationFilter(state, action.payload)
        case ADD_CULINARY_FILTER:
            return addCulinaryFilter(state, action.payload)
        case REMOVE_CULINARY_FILTER:
            return removeCulinaryFilter(state, action.payload)
        case ADD_FACILITY_FILTER:
            return addFacilityFilter(state, action.payload)
        case REMOVE_FACILITY_FILTER:
            return removeFacilityFilter(state, action.payload)
        case ADD_TYPE_FILTER:
            return addTypeFilter(state, action.payload)
        case REMOVE_TYPE_FILTER:
            return removeTypeFilter(state, action.payload)
        default:
            return state
    }
}

const decreaseGuestCount = state => {
    if (state.guestCount === 1) {
        return {
            ...state,
            guestCount: state.guestCount
        }
    }
    return {
        ...state,
        guestCount: state.guestCount - 1
    }
}

const increaseGuestCount = state => {
    return {
        ...state,
        guestCount: state.guestCount + 1
    }
}

const changeGuestCount = (state, newCount) => {
    newCount = parseInt(newCount) || 1
    return {
        ...state,
        guestCount: (newCount < 1) ? 1 : newCount
    }
}

const changePaxPriceRange = (state, value) => {
    return {
        ...state,
        paxPriceRange: {
            min: value[0],
            max: value[1],
        }
    }
}

const changePaxPriceMin = (state, value) => {
    return {
        ...state,
        paxPriceRange: {
            min: value,
            max: state.paxPriceRange.max
        }
    }
}

const changePaxPriceMax = (state, value) => {
    return {
        ...state,
        paxPriceRange: {
            min: state.paxPriceRange.min,
            max: value
        }
    }
}

const addLocationFilter = (state, value) => {
    if (state.locations.includes(value)) {
        return state
    }

    const newLocations = state.locations
    newLocations.push(value)

    return {
        ...state,
        locations: newLocations,
    }
}

const removeLocationFilter = (state, value) => {
    if (!state.locations.includes(value)) {
        return state
    }

    const newLocations = state.locations
    const removeIndex = newLocations.indexOf(value)

    if (removeIndex === -1) {
        return state
    } 

    newLocations.splice(removeIndex, 1)
    return {
        ...state,
        locations: newLocations,
    }
}

const addCulinaryFilter = (state, value) => {
    if (state.culinaries.includes(value)) {
        return state
    }

    const newCulinaries = state.culinaries
    newCulinaries.push(value)

    return {
        ...state,
        culinaries: newCulinaries,
    }
}

const removeCulinaryFilter = (state, value) => {
    if (!state.culinaries.includes(value)) {
        return state
    }

    const newCulinaries = state.culinaries
    const removeIndex = newCulinaries.indexOf(value)

    if (removeIndex === -1) {
        return state
    } 

    newCulinaries.splice(removeIndex, 1)
    return {
        ...state,
        culinaries: newCulinaries,
    }
}

const addFacilityFilter = (state, value) => {
    if (state.facilities.includes(value)) {
        return state
    }

    const newFacilities = state.facilities
    newFacilities.push(value)

    return {
        ...state,
        facilities: newFacilities,
    }
}

const removeFacilityFilter = (state, value) => {
    if (!state.facilities.includes(value)) {
        return state
    }

    const newFacilities = state.facilities
    const removeIndex = newFacilities.indexOf(value)

    if (removeIndex === -1) {
        return state
    }

    newFacilities.splice(removeIndex, 1)
    return {
        ...state,
        facilities: newFacilities,
    }
}

const addTypeFilter = (state, value) => {
    if (state.types.includes(value)) {
        return state
    }

    const newTypes = state.types
    newTypes.push(value)

    return {
        ...state,
        types: newTypes,
    }
}

const removeTypeFilter = (state, value) => {
    if (!state.types.includes(value)) {
        return state
    }

    const newTypes = state.types
    const removeIndex = newTypes.indexOf(value)

    if (removeIndex === -1) {
        return state
    }

    newTypes.splice(removeIndex, 1)
    return {
        ...state,
        types: newTypes,
    }
}

export default reducer;