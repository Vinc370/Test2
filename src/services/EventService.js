import UrlService from "./UrlService";
import axios from "axios";

export const getAllEvents = async data =>{
  const response = await axios.get(UrlService.eventUrl(), data)
  return response
}

export const getAllEventPackages = async data =>{
  const response = await axios.get(`${UrlService.eventUrl()}/`+data)
  return response
}

export const getSingleEvent = async data =>{
  const response = await axios.get(`${UrlService.eventUrl()}/package/`+data)
  return response
}

export const getPopularEvents = async ()=>{
  const response = await axios.get(`${UrlService.popularUrl()}/event`)
  return response
}

export const getUserEvent = async () => {
  const response = await axios.get(`${UrlService.userEventUrl()}/active`)
  return response
}

export const storeUserEvent = async (data) => {
  const response = await axios.post(`${UrlService.userEventUrl()}/store`, data)
  return response
}

export const storeEventV2 = async data =>{
  const response = await axios.post(`${UrlService.eventV2Url()}/store`, data)
  return response
}

export const getUserEventByID = async (id) => {
  const response = await axios.get(`${UrlService.userEventUrl()}/${id}`)
  return response
}