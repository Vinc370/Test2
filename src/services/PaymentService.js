import axios from 'axios'
import UrlService from './UrlService'

export const getRiwayatForPayment = async () => {
    const response = axios.get(`${UrlService.paymentUrl()}/riwayat`)
    return response
}

export const getWaitingForPayment = async () => {
    const response = axios.get(`${UrlService.paymentUrl()}/waiting`)
    return response
}

export const getWaitingForPaymentTotal = async () => {
    const response = axios.get(`${UrlService.paymentUrl()}/waiting/total`)
    return response
}

export const getRiwayatForPaymentDetail = async (id) => {
    const response = axios.get(`${UrlService.paymentUrl()}/riwayat/${id}`)
    return response
}

export const getWaitingForPaymentDetail = async (id) => {
    const response = axios.get(`${UrlService.paymentUrl()}/waiting/${id}`)
    return response
}

export const getTagihan = async () => {
    const response = axios.get(`${UrlService.paymentUrl()}/tagihan`)
    return response
}

export const getTagihanTotal = async () => {
    const response = axios.get(`${UrlService.paymentUrl()}/tagihan/total`)
    return response
}

export const getTagihanDetail = async (id) => {
    const response = axios.get(`${UrlService.paymentUrl()}/tagihan/${id}`)
    return response
}

export const getStatePaymentDetail = async (id) => {
    const response = axios.get(`${UrlService.paymentUrl()}/state-payment/${id}`)
    return response
}

export const paymentInTagihan = async (id) => {
    const response = axios.post(`${UrlService.paymentUrl()}/tagihan/payment-schedule/${id}`)
    return response
}