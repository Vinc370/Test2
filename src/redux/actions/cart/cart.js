import {
  GET_PROMO, GET_TRANSACTION_DETAIL, INSERT_EVENT_DATE, INSERT_EVENT_END_TIME, INSERT_EVENT_LOCATION, INSERT_EVENT_START_TIME, PAYMENT_FROM, PAYMENT_TRANSACTION
} from "../../types/cartActionTypes";

export const getTransactionDetail = (object) =>({
  type: GET_TRANSACTION_DETAIL,
  payload: object
})

export const getPromo = (object) =>({
  type: GET_PROMO,
  payload: object
})

export const fillEventLocation = (info) => ({
  type: INSERT_EVENT_LOCATION,
  payload: info
})

export const fillEventEndTime = (info) => ({
  type: INSERT_EVENT_END_TIME,
  payload: info
})

export const fillEventStartTime = (info) => ({
  type: INSERT_EVENT_START_TIME,
  payload: info
})

export const fillEventDate = (info) => ({
  type: INSERT_EVENT_DATE,
  payload: info
})

export const getPaymentTransaction = (id) =>({
  type: PAYMENT_TRANSACTION,
  payload: id
})

export const getPaymentFrom =(info)=>({
  type: PAYMENT_FROM,
  payload: info
})