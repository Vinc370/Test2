import {
    GET_ALL_VENUES,
    START_LOADING,
    STOP_LOADING,
    GET_ALL_VENUES_PAGINATE,
} from '../../types/venueActionTypes'

const initialState = {
    data: null,
    isLoading: false,
    error: false,
    page: 1,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VENUES:
            return setNewVenuesData(state, action)
        case GET_ALL_VENUES_PAGINATE:
            return setNewVenuesData(state, action)
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        default:
            return state
    }
}

const setNewVenuesData = (state, action) => {
    return {
        ...state,
        data: action.payload.data,
        page: action.payload.page,
        isLoading: false
    }
}

export default reducer;