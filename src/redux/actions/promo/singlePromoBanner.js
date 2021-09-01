import {
    LOAD_SINGLE_BANNER,
    START_LOADING_SINGLE_BANNER,
    ERROR_LOADING_SINGLE_BANNER,
    NOT_FOUND_SINGLE_BANNER,
} from '../../types/promoActionTypes'

import {
    getPromoBannerByUrl
} from '../../../services/PromoService'

export const getSinglePromoBanner = url => {
    return async (dispatch) => {
        startLoading(dispatch)

        try {
            const response = await getPromoBannerByUrl(url)
            if (response.status === 204) {
                setBannerNotFound(dispatch)
                return
            }
            
            dispatch({
                type: LOAD_SINGLE_BANNER,
                payload: response.data
            })

        } catch (error) {
            errorLoading(dispatch)
        }
    }
}

export const startLoading = dispatch => {
    dispatch({type: START_LOADING_SINGLE_BANNER})
}

export const errorLoading = dispatch => {
    dispatch({type: ERROR_LOADING_SINGLE_BANNER})
}

export const setBannerNotFound = dispatch => {
    dispatch({type: NOT_FOUND_SINGLE_BANNER})
}