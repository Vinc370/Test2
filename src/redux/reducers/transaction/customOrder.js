import { LOGOUT } from '../../types/authenticationActionTypes'

import {
    LOAD_CUSTOM_ORDER,
    START_LOADING_CUSTOM_ORDER,
    ERROR_LOADING_CUSTOM_ORDER,
    NOT_FOUND_CUSTOM_ORDER,
} from '../../types/transactionActionTypes'

const initialState = {
    data: null,
    isLoading: false,
    notFound: false,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CUSTOM_ORDER:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case START_LOADING_CUSTOM_ORDER:
            return {
                ...state,
                isLoading: true,
            }
        case ERROR_LOADING_CUSTOM_ORDER:
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case NOT_FOUND_CUSTOM_ORDER:
            return {
                ...state,
                isLoading: false,
                notFound: true,
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}

export default reducer