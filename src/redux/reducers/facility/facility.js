import { 
    GET_ALL_USED_FACILITIES,
} from '../../types/facilityActionTypes'

const initialState = {
    facilities: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USED_FACILITIES:
            return setAllUsedFacilities(state, action.payload)
        default:
            return state
    }
}

const setAllUsedFacilities = (state, facilities) => {
    return {
        ...state,
        facilities,
    }
}

export default reducer