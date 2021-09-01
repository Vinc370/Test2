import {
    LOAD_SINGLE_VENUE,
    START_LOADING_SINGLE_VENUE,
    ERROR_LOADING_SINGLE_VENUE,
    NOT_FOUND_SINGLE_VENUE,
} from '../../types/venueActionTypes'

const initialState = {
    data: null,
    isLoading: false,
    notFound: false,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SINGLE_VENUE:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case START_LOADING_SINGLE_VENUE:
            return {
                ...state,
                isLoading: true,
            }
        case ERROR_LOADING_SINGLE_VENUE:
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case NOT_FOUND_SINGLE_VENUE:
            return {
                ...state,
                isLoading: false,
                notFound: true,
            }
        default:
            return state
    }
}

export default reducer