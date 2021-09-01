import axios from 'axios'
import UrlService from './UrlService'

export const changePassword = async data => {
    const response = axios.post(`${UrlService.userUrl()}/change-password`, data)
    return response
}

export const getAllPromotions = async() =>{
    const response = axios.get(`${UrlService.promotionUrl()}`)
    return response
}

export const getOTP = async data =>{
    const response = axios.post(UrlService.getApi() + '/forgot', data)
    return response
}

export const resetPassword = async data =>{
    const response = axios.post(UrlService.getApi() + '/check-otp', data)
    return response
}