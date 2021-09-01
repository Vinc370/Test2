import {
    USER_CUSTOM_ORDER,
    LOAD_CUSTOM_ORDER,
    START_LOADING_CUSTOM_ORDER,
    ERROR_LOADING_CUSTOM_ORDER,
    NOT_FOUND_CUSTOM_ORDER,
} from '../../types/transactionActionTypes'

import {
    getCustomOrderByID
} from '../../../services/TransactionService'

export const getCustomOrder = id => {
    return async (dispatch) => {
        startLoading(dispatch)

        try {
            const response = await getCustomOrderByID(id)
            if (response.status === 204) {
                setCustomOrderNotFound(dispatch)
                return
            }
            
            dispatch({
                type: LOAD_CUSTOM_ORDER,
                payload: response.data
            })

        } catch (error) {
            errorLoading(dispatch)
        }
    }
}

export const setCustomOrder = (dispatch, data) => {
    dispatch({
        type: USER_CUSTOM_ORDER,
        payload: data
    })
}

export const startLoading = dispatch => {
    dispatch({type: START_LOADING_CUSTOM_ORDER})
}

export const errorLoading = dispatch => {
    dispatch({type: ERROR_LOADING_CUSTOM_ORDER})
}

export const setCustomOrderNotFound = dispatch => {
    dispatch({type: NOT_FOUND_CUSTOM_ORDER})
}