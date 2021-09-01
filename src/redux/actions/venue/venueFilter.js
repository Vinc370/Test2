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

export const increaseGuestCount = () => {
    return async (dispatch) => {
        dispatch({
            type: INCREASE_GUEST_COUNT,
        })
    }
}

export const decreaseGuestCount = () => {
    return async (dispatch) => {
        dispatch({
            type: DECREASE_GUEST_COUNT,
        })
    }
}

export const changeGuestCount = (newCount) => {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_GUEST_COUNT,
            payload: newCount,
        })
    }
}

export const changePaxPriceRange = (value) => {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_PAX_PRICE_RANGE,
            payload: value,
        })
    }
}

export const changePaxPriceMin = (value) => {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_PAX_PRICE_MIN,
            payload: value,
        })
    }
}

export const changePaxPriceMax = (value) => {
    return async (dispatch) => {
        dispatch({
            type: CHANGE_PAX_PRICE_MAX,
            payload: value,
        })
    }
}

export const addLocationFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: ADD_LOCATION_FILTER,
            payload: value,
        })
    }
}

export const removeLocationFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_LOCATION_FILTER,
            payload: value,
        })
    }
}

export const addCulinaryFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: ADD_CULINARY_FILTER,
            payload: value,
        })
    }
}

export const removeCulinaryFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_CULINARY_FILTER,
            payload: value,
        })
    }
}

export const addFacilityFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: ADD_FACILITY_FILTER,
            payload: value,
        })
    }
}

export const removeFacilityFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_FACILITY_FILTER,
            payload: value,
        })
    }
}

export const addTypeFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: ADD_TYPE_FILTER,
            payload: value,
        })
    }
}

export const removeTypeFilter = value => {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_TYPE_FILTER,
            payload: value,
        })
    }
}