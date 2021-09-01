import {
    getAllVenues as getAllVenuesService,
    getVenuesWithPaginate,
} from '../../../services/VenueService'

import {
    GET_ALL_VENUES,
    GET_ALL_VENUES_PAGINATE,
    START_LOADING,
    STOP_LOADING,
} from '../../types/venueActionTypes'

import store from '../../../redux/Store'

export const getAllVenues = () => {
    return async (dispatch) => {
        startLoading(dispatch)
        const response = await getAllVenuesService()

        dispatch({
            type: GET_ALL_VENUES,
            payload: response
        })
    }
}

export const getAllVenuesPaginate = (page = 1, perPage = 7) => {
    return async (dispatch) => {
        startLoading(dispatch)
        let response

        const params = store.getState().venueFilter;
        try {
            response = await getVenuesWithPaginate(page, params, perPage)
        } catch (error) {
            stopLoading(dispatch)
            return
        }

        dispatch({
            type: GET_ALL_VENUES_PAGINATE,
            payload: {
                data: response.data,
                page,
            }
        })
    }
}

const startLoading = dispatch => {
    dispatch({
        type: START_LOADING,
    })
}

const stopLoading = dispatch => {
    dispatch({
        type: STOP_LOADING,
    })
}