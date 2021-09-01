import {
    AUTH_GOOGLE, AUTH_LOGIN
} from '../../../constants/LoginConstants'
import {
    getCurrentGoogleUser, getUserAlert, login as loginService,
    loginLogout as logoutService
} from '../../../services/AuthService'
import {
    getUserCustomOrder
} from '../../../services/TransactionService'
import {
    clearTokenAndHeader, setTokenAndHeader
} from '../../../utilities/LoginUtilities'
import {
    END_LOADING_LOGIN, LOGIN, LOGOUT, START_LOADING_LOGIN
} from '../../types/authenticationActionTypes'

//login
export const login = data => {
    return async (dispatch) => {
        let response

        dispatch(startLoginLoading())

        try {
            response = await loginService(data)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    dispatch(endLoginLoading(error.response.data.error))
                    return false
                }
            }
            dispatch(endLoginLoading('Connection failed, please try again'))
            return false
        }
        
        setStateToLogin(
            dispatch, 
            {
                accessToken: response.data.access_token,
                currentUser: response.data.user,
                authType: AUTH_LOGIN,
                customOrder: null,
                accountAlert: null,
            },
            true
        )

        return true
    }
}

export const forgot = data => {
    return async (dispatch) => {
        let response

        dispatch(startLoginLoading())

        try {
            response = await loginService(data)
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    dispatch(endLoginLoading(error.response.data.error))
                    return false
                }
            }
            dispatch(endLoginLoading('Connection failed, please try again'))
            return false
        }
        
        setStateToLogin(
            dispatch, 
            {
                accessToken: response.data.access_token,
                currentUser: response.data.user,
                authType: AUTH_LOGIN,
                customOrder: null,
                accountAlert: null,
            },
            true
        )
        return true
    }
}

export const googleLogin = accessToken => {
    return async (dispatch) => {
        let response

        setTokenAndHeader(accessToken, AUTH_GOOGLE, true)

        try {
            response = await getCurrentGoogleUser()
        } catch (error) {
            if (error.response) {
                dispatch(endLoginLoading(error.response.data.message))
                clearTokenAndHeader(AUTH_GOOGLE)
                return false
            }
            dispatch(endLoginLoading('Connection failed, please try again'))
            clearTokenAndHeader(AUTH_GOOGLE)
            return false
        }
        
        dispatch(endLoginLoading())
        setStateToLogin(
            dispatch, 
            {
                accessToken: accessToken,
                currentUser: response.data,
                authType: AUTH_GOOGLE,
                customOrder: null,
                accountAlert: null,
            },
            true
        )

        return true
    }
}

export const setLogin = data => {
    return dispatch => {
        setStateToLogin(dispatch, data)
    }
}

export const loginLogout = () => {
    return async (dispatch) => {
        logoutService()
        clearTokenAndHeader(AUTH_LOGIN)
        dispatch(logout())
    }
}

export const googleLogout = () => {
    return async (dispatch) => {
        clearTokenAndHeader(AUTH_GOOGLE)
        dispatch(logout())
    }
}

export const logout = () => ({
    type: LOGOUT,
})

export const startLoginLoading = () => ({
    type: START_LOADING_LOGIN,
})

export const endLoginLoading = (error = null) => ({
    type: END_LOADING_LOGIN,
    payload: error,
})

const setStateToLogin = async (dispatch, data, initToken = false) => {
    setTokenAndHeader(data.accessToken, data.authType, initToken)

    try {
        let response = await getUserCustomOrder()
        data.customOrder = response.data
    } catch (error) {
        data.customOrder = null
    }

    try {
        let response = await getUserAlert()
        data.accountAlert = response.data
    } catch (error) {
        data.accountAlert = null
    }
    
    dispatch({
        type: LOGIN,
        payload: data
    })
}