import axios from 'axios'
import UrlService from './UrlService'

export const getHistory = async () => {
    const response = await axios.get(`${UrlService.orderUrl()}/history`)
    return response
}

export const getPayment = async order_id => {
    const response = await axios.get(`${UrlService.orderUrl()}/get-payment/${order_id}`)
    return response
}

export const getAllOrders = async data => {
    const response = await axios.get(`${UrlService.orderUrl()}/show`, {params:data})
    return response
}

export const payOrder = async data =>{
    const response = await axios.post(`${UrlService.orderUrl()}/pay`, data)
    return response
}

export const confirmationOrder = async data =>{
    const response = await axios.post(`${UrlService.orderUrl()}/Confirmation/status`, data)
    return response
}