import axios from 'axios'
import UrlService from './UrlService'

export const getHistory = async (event_id) => {
    const response = await axios.get(`${UrlService.weddingUrl()}/${event_id}/histories`)
    return response
}

export const getLocations = async (event_id) => {
    const response = await axios.get(`${UrlService.weddingUrl()}/${event_id}/locations`)
    return response
}

export const storeLocations = async (event_id, data) => {
    const response = await axios.post(`${UrlService.weddingUrl()}/${event_id}/locations`, data)
    return response
}

export const getFamilyContacts = async (event_id) => {
    const response = await axios.get(`${UrlService.weddingUrl()}/${event_id}/family-contacts`)
    return response
}

export const storeFamilyContacts = async (event_id, data) => {
    const response = await axios.post(`${UrlService.weddingUrl()}/${event_id}/family-contacts`, data)
    return response
}

export const getVendorContacts = async (event_id) => {
    const response = await axios.get(`${UrlService.weddingUrl()}/${event_id}/vendor-contacts`)
    return response
}

export const storeVendorContacts = async (event_id, data) => {
    const response = await axios.post(`${UrlService.weddingUrl()}/${event_id}/vendor-contacts`, data)
    return response
}

export const getConsumptions = async (event_id) => {
    const response = await axios.get(`${UrlService.weddingUrl()}/${event_id}/consumptions`)
    return response
}

export const storeConsumptions = async (event_id, data) => {
    const response = await axios.post(`${UrlService.weddingUrl()}/${event_id}/consumptions`, data)
    return response
}

export const getImages = async (event_id) => {
    const response = await axios.get(`${UrlService.weddingUrl()}/${event_id}/photos`)
    return response
}

export const storeImages = async (event_id, data) => {
    const response = await axios.post(`${UrlService.weddingUrl()}/${event_id}/photos`, data)
    return response
}

export const getTransportations = async (event_id) => {
    const response = await axios.get(`${UrlService.weddingUrl()}/${event_id}/transportations`)
    return response
}

export const storeTransportations = async (event_id, data) => {
    const response = await axios.post(`${UrlService.weddingUrl()}/${event_id}/transportations`, data)
    return response
}