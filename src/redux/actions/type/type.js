import { getAllTypes } from '../../../services/VenueService'
import {
    GET_ALL_TYPES,
    START_LOADING_ALL_TYPES,
} from '../../types/typeActionTypes'

export const initAllTypes = () => {
    return async (dispatch) => {
        startLoading(dispatch)

        const response = await getAllTypes()
        dispatch({
            type: GET_ALL_TYPES,
            payload: response.data,
        })
    }
}

const startLoading = dispatch => {
    dispatch({
        type: START_LOADING_ALL_TYPES,
    })
}