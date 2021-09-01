import { 
    setAuthHeader,
    removeAuthHeader,
} from './RequestHeader'

import {
    setLoginToken,
    getLoginToken,
    removeLoginToken,
    setGoogleToken,
    getGoogleToken,
    removeGoogleToken,
} from './SessionStorage'

import {
    AUTH_GOOGLE,
    AUTH_LOGIN,
} from '../constants/LoginConstants'

import store from '../redux/Store'
import { setLogin } from '../redux/actions/authentication/authentication'

export const setTokenAndHeader = (token, authType, init = false) => {
    // TODO: refactor
    if (init) {
        token = `${authType}.${token}`
    }
    switch (authType) {
        case AUTH_GOOGLE:
            setGoogleToken(token)
            break
        case AUTH_LOGIN:
            setLoginToken(token)
            break

        default:
            break
    }
    setAuthHeader(token)
}

export const setHeaderFromToken = () => {
    if (setHeaderFromStandardLogin()) {
        return AUTH_LOGIN
    } else if (setHeaderFromGoogleLogin()) {
        return AUTH_GOOGLE
    }
    return null
}

const setHeaderFromStandardLogin = () => {
    const token = getLoginToken()

    if (token) {
        setAuthHeader(token)
        return true
    }
    return false
}

const setHeaderFromGoogleLogin = () => {
    const token = getGoogleToken()
    if (token) {
        setAuthHeader(token)
        return true
    }
    return false
}

export const clearTokenAndHeader = authType => {
    switch (authType) {
        case AUTH_LOGIN:
            removeLoginToken()
            break;
        case AUTH_GOOGLE:
            removeGoogleToken()
            break;

        default:
            break;
    }
    removeAuthHeader()
}

export const loginStandardUser = userData => {
    dispatchLoginUser(userData, getLoginToken(), AUTH_LOGIN)
}

export const loginGoogleUser = userData => {
    dispatchLoginUser(userData, getGoogleToken(), AUTH_GOOGLE)
}

export const dispatchLoginUser = (userData, token, authType) => {
    store.dispatch(
        setLogin({
            currentUser: userData,
            accessToken: token,
            authType
        })
    )
}