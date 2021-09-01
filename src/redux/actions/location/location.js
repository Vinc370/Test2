import { getAllLocations } from '../../../services/VenueService'
import {
    GET_ALL_LOCATIONS,
    START_LOADING_ALL_LOCATIONS,
} from '../../types/locationActionTypes'

export const initAllLocations = () => {
    return async (dispatch) => {
        startLoading(dispatch)

        const response = await getAllLocations()
        dispatch({
            type: GET_ALL_LOCATIONS,
            payload: response.data,
        })
    }
}

const startLoading = dispatch => {
    dispatch({
        type: START_LOADING_ALL_LOCATIONS,
    })
}