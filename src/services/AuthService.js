import axios from 'axios'
import UrlService from './UrlService'

import {
    clearTokenAndHeader,
    setHeaderFromToken,
    loginStandardUser,
    loginGoogleUser,
} from '../utilities/LoginUtilities'

import {
    AUTH_LOGIN,
    AUTH_GOOGLE,
} from '../constants/LoginConstants'

export const register = async data => {
    const response = await axios.post(`${UrlService.registerUrl()}`, data)
    return response
}

export const login = async data => {
    const response = await axios.post(UrlService.loginUrl(), data)
    return response
}

export const updateProfile = async data => {
    const response = await axios.post(`${UrlService.userUrl()}/update-account`, data)
    return response
}

export const loginLogout = () => {
    try {
        axios.post(UrlService.logoutUrl())
    } catch (error) {
        
    }
}

export const getCurrentUser = async () => {
    const authType = setHeaderFromToken()

    if (!authType) {
        return
    }


    try {
        const response = await getCurrentUserFromServer()

        return {
            user: response.data,
            authType
        }

    } catch (error) {
        clearTokenAndHeader(authType)
        return null
    }
}

export const getCurrentGoogleUser = async () => {
    const response = await getCurrentUserFromServer()
    return response
}

export const getCurrentLoginUser = async () => {
    const response = await axios.get(UrlService.userUrl() + '/loginUser');
    return response
}

const getCurrentUserFromServer = async () => {
    const response = await axios.get(UrlService.userUrl() + '/current')
    return response
}

export const checkUserLoginFromToken = async (onSuccess = null, onFailed = null, authType = null) => {
    const data = await getCurrentUser()

    if (data) {
        if (authType && data.authType !== authType) {
            failCheckUserLoginFromToken(onFailed)
            return
        }
        
        switch (data.authType) {
            case AUTH_LOGIN:
                loginStandardUser(data.user)
                break
            case AUTH_GOOGLE:
                loginGoogleUser(data.user)
                break

            default:
                break;
        }

        if (onSuccess) {
            onSuccess()
        }
    } else {
        failCheckUserLoginFromToken(onFailed)
    }
}

const failCheckUserLoginFromToken = (onFailed) => {
    if (onFailed) {
        onFailed()
    }

    clearTokenAndHeader()
}

export const getUserAlert = async () => {
    const response = await axios.get(`${UrlService.userUrl()}/alert`)
    return response
}