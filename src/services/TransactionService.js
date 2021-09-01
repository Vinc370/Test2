import axios from 'axios'
import UrlService from './UrlService'

export const getCustomOrderByID = async (id) => {
    const response = await axios.get(`${UrlService.customOrderUrl()}/${id}`)
    return response
}

export const addCustomOrderToCart = async () =>{
    const response = await axios.post(`${UrlService.customOrderUrl()}/add-to-cart`)
    return response
}

export const forceAddCustomOrderToCart = async () =>{
    const response = await axios.post(`${UrlService.customOrderUrl()}/add-to-cart/force`)
    return response
}

export const getUserCustomOrder = async () => {
    const response = await axios.get(`${UrlService.salesUrl()}/custom-order`)
    return response
}