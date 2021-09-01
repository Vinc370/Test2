import {
    INFORMASI_ACARA_ORIGIN
} from '../../types/eventActionTypes'

const initialState = {
    origin: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INFORMASI_ACARA_ORIGIN:
            return {
                ...state,
                origin: action.payload
            }
        default:
            return state
    }
}

export default reducer