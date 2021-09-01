const LOGIN_TOKEN = 'littlecloudeo_token'
const GOOGLE_TOKEN = 'google_token'

export const getLoginToken = () => {
    return getSessionToken(LOGIN_TOKEN)
}

export const setLoginToken = value => {
    setSessionToken(LOGIN_TOKEN, value)
}

export const removeLoginToken = () => {
    if (getLoginToken()) {
        removeSessionToken(LOGIN_TOKEN)
    }
}

export const getGoogleToken = () => {
    return getSessionToken(GOOGLE_TOKEN)
}

export const setGoogleToken = value => {
    setSessionToken(GOOGLE_TOKEN, value)
}

export const removeGoogleToken = () => {
    if (getGoogleToken()) {
        removeSessionToken(GOOGLE_TOKEN)
    }
}

const getSessionToken = token_name => {
    return localStorage.getItem(token_name);
}

const setSessionToken = (token_name, value) => {
    localStorage.setItem(token_name, value)
}

const removeSessionToken = token_name => {
    localStorage.removeItem(token_name)
}