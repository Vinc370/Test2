import { 
    GET_ALL_CULINARIES,
    START_LOADING_ALL_CULINARIES,
} from '../../types/culinaryActionTypes'

const initialState = {
    culinaries: [],
    isLoading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CULINARIES:
            return setAllCulinaries(state, action.payload)
        case START_LOADING_ALL_CULINARIES:
            return startLoading(state)
        default:
            return state
    }
}

const setAllCulinaries = (state, culinaries) => {
    return {
        ...state,
        culinaries,
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