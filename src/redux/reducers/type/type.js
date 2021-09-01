import { 
    GET_ALL_TYPES,
    START_LOADING_ALL_TYPES,
} from '../../types/typeActionTypes'

const initialState = {
    types: [],
    isLoading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TYPES:
            return setAllType(state, action.payload)
        case START_LOADING_ALL_TYPES:
            return startLoading(state)
        default:
            return state
    }
}

const setAllType = (state, types) => {
    return {
        ...state,
        types,
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