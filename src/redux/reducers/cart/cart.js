import {
  GET_TRANSACTION_DETAIL,
  GET_PROMO,
  INSERT_EVENT_DATE,
  INSERT_EVENT_END_TIME,
  INSERT_EVENT_LOCATION,
  INSERT_EVENT_START_TIME,
  PAYMENT_TRANSACTION,
  PAYMENT_FROM
} from "../../types/cartActionTypes";

const initialState= {
  'transaction':{},
  'promo':{},
  'event_date':'',
  'event_end_time':'',
  'event_start_time':'',
  'event_location':'',
  'payment_transaction':{},
  'payment_from': ''
}

const reducer = (state = initialState, action) =>{
  switch (action.type){
    case GET_TRANSACTION_DETAIL:
      return getTransactionDetail(state, action.payload)
    case GET_PROMO:
      return getPromo(state,action.payload)
    case INSERT_EVENT_START_TIME:
      return fillEventStartTime(state, action.payload)
    case INSERT_EVENT_LOCATION:
      return fillEventLocation(state, action.payload)
    case INSERT_EVENT_END_TIME:
      return fillEventEndTime(state, action.payload)
    case INSERT_EVENT_DATE:
      return fillEventDate(state, action.payload)
    case PAYMENT_TRANSACTION:
      return getPaymentTransaction(state, action.payload)
    case PAYMENT_FROM:
      return getPaymentFrom(state, action.payload)
    default:
      return state
  }
}

const getPaymentFrom = (state, info) =>{
  return{
    ...state,
    payment_from: info
  }
}

const getPaymentTransaction = (state, object) =>{
  return{
    ...state,
    payment_transaction: object
  }
}

const getTransactionDetail = (state, object) => {
  return {
    ...state,
    transaction: object
  }
}

const getPromo = (state, object) => {
  return {
    ...state,
    promo: object
  }
}

const fillEventLocation = (state, info) => {
  return {
    ...state,
    event_location: info
  }
}

const fillEventEndTime = (state, info) => {
  return {
    ...state,
    event_end_time: info
  }
}

const fillEventStartTime = (state, info) => {
  return {
    ...state,
    event_start_time: info
  }
}

const fillEventDate = (state, info) => {
  return {
    ...state,
    event_date: info
  }
}

export default reducer;