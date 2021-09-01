import { 
    INCREASE_VENUE_DETAIL_GUEST_COUNT,
    DECREASE_VENUE_DETAIL_GUEST_COUNT,
    CHANGE_VENUE_DETAIL_GUEST_COUNT,
    CHANGE_VENUE_SELECTED_PACKAGE,
    ADD_ADDONS,
    REMOVE_ADDONS,
} from "../../types/venueActionTypes";

import { getAddonsIndex } from '../../../utilities/VenueUtilities'

const initialState = {
    guestCount: 1,
    package: null,
    addons: [],
    addOnsPrice: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE_VENUE_DETAIL_GUEST_COUNT:
            return increaseGuestCount(state)
        case DECREASE_VENUE_DETAIL_GUEST_COUNT:
            return decreaseGuestCount(state)
        case CHANGE_VENUE_DETAIL_GUEST_COUNT:
            return changeGuestCount(state, action.payload)
        case CHANGE_VENUE_SELECTED_PACKAGE:
            return changePackage(state, action.payload)
        case ADD_ADDONS:
            return addAddons(state, action.payload)
        case REMOVE_ADDONS:
            return removeAddons(state, action.payload.addons, action.payload.addonsIndex)
        default:
            return state
    }
}

const decreaseGuestCount = state => {
    const newCount = state.guestCount - 1
    return {
        ...state,
        guestCount: (newCount < state.package.venue_package_minimum_pax) ? state.package.venue_package_minimum_pax : newCount
    }
}

const increaseGuestCount = state => {
    return {
        ...state,
        guestCount: state.guestCount + 1
    }
}

const changeGuestCount = (state, newCount) => {
    newCount = parseInt(newCount) || 1
    return {
        ...state,
        guestCount: (newCount < state.package.venue_package_minimum_pax) ? state.package.venue_package_minimum_pax : newCount
    }
}

const changePackage = (state, newPackage) => {
    return {
        ...state,
        package: newPackage,
        guestCount: (state.guestCount < newPackage.venue_package_minimum_pax) ? newPackage.venue_package_minimum_pax : state.guestCount
    }
}

const addAddons = (state, addons) => {
    const addonsList = state.addons
    let addOnsPrice = state.addOnsPrice

    addonsList.push(addons)
    addOnsPrice += parseInt(addons.venue_addons_price)

    return {
        ...state,
        addons: addonsList,
        addOnsPrice,
    }
}

const removeAddons = (state, addons, addonsIndex) => {
    const addonsList = state.addons
    let addOnsPrice = state.addOnsPrice

    addonsList.splice(addonsIndex, 1)
    addOnsPrice -= parseInt(addons.venue_addons_price)

    return {
        ...state,
        addons: addonsList,
        addOnsPrice
    }
}

export default reducer;