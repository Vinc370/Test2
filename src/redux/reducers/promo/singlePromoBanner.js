import {
    LOAD_SINGLE_BANNER,
    START_LOADING_SINGLE_BANNER,
    ERROR_LOADING_SINGLE_BANNER,
    NOT_FOUND_SINGLE_BANNER,
} from '../../types/promoActionTypes'

const initialState = {
    data: null,
    isLoading: false,
    notFound: false,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SINGLE_BANNER:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            }
        case START_LOADING_SINGLE_BANNER:
            return {
                ...state,
                isLoading: true,
            }
        case ERROR_LOADING_SINGLE_BANNER:
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case NOT_FOUND_SINGLE_BANNER:
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