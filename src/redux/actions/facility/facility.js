import { getAllUsedFacilities } from '../../../services/VenueService'
import {
    GET_ALL_USED_FACILITIES
} from '../../types/facilityActionTypes'

export const initAllUsedFacilities = () => {
    return async (dispatch) => {
        const response = await getAllUsedFacilities()
        dispatch({
            type: GET_ALL_USED_FACILITIES,
            payload: response.data,
        })
    }
}