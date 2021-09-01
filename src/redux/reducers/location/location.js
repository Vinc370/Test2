import { 
    GET_ALL_LOCATIONS,
    START_LOADING_ALL_LOCATIONS,
} from '../../types/locationActionTypes'

const initialState = {
    locations: [],
    isLoading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_LOCATIONS:
            return setAllLocation(state, action.payload)
        case START_LOADING_ALL_LOCATIONS:
            return startLoading(state)
        default:
            return state
    }
}

const setAllLocation = (state, locations) => {
    return {
        ...state,
        locations,
        isLoading: false,
    }
}

const startLoading = state => {
    return {
        ...state,
        isLoading: true,
    }
}

export default reducer