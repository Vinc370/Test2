import { combineReducers } from 'redux'
import venueReducers from './venue/index'
import authentication from './authentication/authentication'
import transaction from "./transaction/index";
import cart from "./cart/cart";
import location from './location/location'
import culinary from './culinary/culinary'
import facility from './facility/facility'
import type from './type/type'
import promo from './promo/index'
import event from './event/event'

export default combineReducers({
    ...venueReducers,
    ...transaction,
    ...promo,
    event,
    authentication,
    cart,
    location,
    culinary,
    facility,
    type
})