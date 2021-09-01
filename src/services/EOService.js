import axios from 'axios'
import UrlService from './UrlService'

export const getPackage = async package_id => {
    const response = axios.get(`${UrlService.eventUrl()}/package/${package_id}`)
    return response
}