import axios from 'axios'
import UrlService from './UrlService'

export const getAllVenues = async () => {
    try {
        const response = await axios.get(UrlService.venueUrl())
        return response.data
    } catch (error) {
        
    }
}

export const getVenuesWithPaginate = async (page, params, perPage) => {
    const response = await axios.get(`${UrlService.venueUrl()}/paginate/${perPage}`, {
        params: {
            page,
            params,
        },
    })
    return response
}

export const getVenue = async (venue_route) => {
    const response = await axios.get(`${UrlService.venueUrl()}/${venue_route}`)
    return response
}

export const getAllLocations = async () => {
    const response = await axios.get(`${UrlService.venueUrl()}/category/one/Lokasi`)
    return response
}

export const getAllCulinaries = async () => {
    const response = await axios.get(`${UrlService.venueUrl()}/category/one/Kuliner`)
    return response
}

export const getAllUsedFacilities = async () => {
    const response = await axios.get(`${UrlService.venueUrl()}/category/type/fasilitas`)
    return response
}

export const requestNewVenue = async data => {
    const response = await axios.post(`${UrlService.venueUrl()}/tambah`, data)
    return response
}

export const getPopularVenues = async ()=>{
    const response = await axios.get(`${UrlService.popularUrl()}/venue`)
    return response
}

export const getAllTypes = async ()=>{
    const response = await axios.get(`${UrlService.venueUrl()}/category/one/Type`)
    return response
}
