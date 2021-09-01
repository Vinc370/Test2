import axios from 'axios'
import UrlService from './UrlService'

export const getUserCart = async () => {
    const response = await axios.get(UrlService.keranjangUrl())
    return response
}

export const insertNewCart = async data => {
    const response = await axios.post(`${UrlService.keranjangUrl()}/store`, data)
    return response
}

export const addVenueToCart = async data => {
    const response = await axios.post(`${UrlService.keranjangUrl()}/venue/edit`, data)
    return response
}

export const updateEventToCart = async data => {
    const response = await axios.post(`${UrlService.keranjangUrl()}/event-organizer/edit`, data)
    return response
}

export const storeCartInformation = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/store-information`, data)
    return response
}

export const forceStoreCartInformation = async data => {
    const response = await axios.post(`${UrlService.keranjangUrl()}/store-information/force`, data)
    return response
}

export const downPaymentCart = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/payment/down-payment`, data);
    return response
};

export const pelunasanPayment = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/payment/pelunasan`, data);
    return response
};

export const cartProcessStatus = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/process/status`, data)
    return response
}

export const cartConfirmationStatus = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/confirmation/status`, data)
    return response
}

export const getCartInformation = async () => {
    const response = await axios.get(UrlService.keranjangUrl()+'/get-information')
    return response
}

export const getCartNominal = async () => {
    const response = await axios.get(UrlService.keranjangUrl()+'/get-cart-nominal')
    return response
}

export const deleteEventCart = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/event_organizer/delete`, {params: data})
    return response
}

export const deleteVenueCart = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/venue/delete`, data)
    return response
}

export const updateVenueGuest = async data =>{
    const response = await axios.post(`${UrlService.keranjangUrl()}/venue/update-quantity`, data)
    return response
}

//vendor
export const storeVendorToCart = async data => {
    const response = await axios.post(`${UrlService.keranjangUrl()}/vendor/store`, data)
    return response
}

export const forceStoreVendorToCart = async data => {
    const response = await axios.post(`${UrlService.keranjangUrl()}/vendor/store/force`, data)
    return response
}