import axios from "axios"
import UrlService from "./UrlService"

export const getPromoBannerByUrl = async (url) =>{
    const response = await axios.get(`${UrlService.promoUrl()}/banner/${url}`)
    return response
}

export const getAllPromoBanner = async () =>{
    const response = await axios.get(`${UrlService.promoUrl()}/banner/`)
    return response
}