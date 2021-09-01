import { getAllCulinaries } from '../../../services/VenueService'
import {
    GET_ALL_CULINARIES,
    START_LOADING_ALL_CULINARIES,
} from '../../types/culinaryActionTypes'

export const initAllCulinaries = () => {
    return async (dispatch) => {
        startLoading(dispatch)

        const response = await getAllCulinaries()
        dispatch({
            type: GET_ALL_CULINARIES,
            payload: response.data,
        })
    }
}

const startLoading = dispatch => {
    dispatch({
        type: START_LOADING_ALL_CULINARIES,
    })
}