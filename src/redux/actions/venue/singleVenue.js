import {
    LOAD_SINGLE_VENUE,
    START_LOADING_SINGLE_VENUE,
    ERROR_LOADING_SINGLE_VENUE,
    NOT_FOUND_SINGLE_VENUE,
} from '../../types/venueActionTypes'

import {
    getVenue
} from '../../../services/VenueService'

import { changeSelectedPackage } from './venueDetailData'
import store from '../../../redux/Store'

export const getSingleVenue = venue_route => {
    return async (dispatch) => {
        startLoading(dispatch)

        try {
            const response = await getVenue(venue_route)
            if (response.status === 204) {
                setVenueNotFound(dispatch)
                return
            }
            
            if (!store.getState().venueDetailData.package) {
                dispatch(changeSelectedPackage(response.data.venue_package[0]))
            }
            
            dispatch({
                type: LOAD_SINGLE_VENUE,
                payload: response.data
            })

        } catch (error) {
            errorLoading(dispatch)
        }
    }
}

export const startLoading = dispatch => {
    dispatch({type: START_LOADING_SINGLE_VENUE})
}

export const errorLoading = dispatch => {
    dispatch({type: ERROR_LOADING_SINGLE_VENUE})
}

export const setVenueNotFound = dispatch => {
    dispatch({type: NOT_FOUND_SINGLE_VENUE})
}