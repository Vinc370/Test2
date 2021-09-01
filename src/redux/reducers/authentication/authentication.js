import {
    LOGIN,
    START_LOADING_LOGIN,
    END_LOADING_LOGIN,
    LOGOUT,
} from '../../types/authenticationActionTypes'

const initialState = {
    currentUser: null,
    accessToken: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    authType: null,
    customOrder: null,
    accountAlert: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload.currentUser,
                accessToken: action.payload.accessToken,
                authType: action.payload.authType,
                isLoggedIn: true,
                isLoading: false,
                customOrder: action.payload.customOrder,
                accountAlert: action.payload.accountAlert
            }
        case LOGOUT:
            return initialState
        case START_LOADING_LOGIN:
            return {
                ...state,
                isLoading: true,
            }
        case END_LOADING_LOGIN:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default reducer