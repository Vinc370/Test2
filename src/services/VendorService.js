import axios from 'axios'
import UrlService from './UrlService'

export const getAllVendors = async () =>{
  const response = await axios.get(UrlService.vendorUrl())
  return response
}

export const getAllMappingVendors = async (data) =>{
  const response = await axios.get(`${UrlService.vendorUrlV2()}/mapping`, {params:data})
  return response
}

export const getVendor = async (vendor_route) => {
  const response = await axios.get(`${UrlService.vendorUrl()}/route/${vendor_route}`)
  return response
}