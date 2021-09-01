import { 
    INCREASE_VENUE_DETAIL_GUEST_COUNT,
    DECREASE_VENUE_DETAIL_GUEST_COUNT,
    CHANGE_VENUE_DETAIL_GUEST_COUNT,
    CHANGE_VENUE_SELECTED_PACKAGE,
    ADD_ADDONS,
    REMOVE_ADDONS,
} from "../../types/venueActionTypes";

import { isAddonsAdded } from '../../../utilities/VenueUtilities'

export const increaseGuestCount = () => ({
    type: INCREASE_VENUE_DETAIL_GUEST_COUNT,
})

export const decreaseGuestCount = () => ({
    type: DECREASE_VENUE_DETAIL_GUEST_COUNT,
})

export const changeGuestCount = newCount => ({
    type: CHANGE_VENUE_DETAIL_GUEST_COUNT,
    payload: newCount,
})

export const changeSelectedPackage = newPackage => ({
    type: CHANGE_VENUE_SELECTED_PACKAGE,
    payload: newPackage,
})

export const addAddons = addons => {
    return async (dispatch) => {
        const isAdded = isAddonsAdded(addons)
        if (isAdded.added) {
            return
        }
    
        dispatch({
            type: ADD_ADDONS,
            payload: addons,
        })
    }
}

export const removeAddons = addons => {
    return async (dispatch) => {
        const isAdded = isAddonsAdded(addons)
        if (!isAdded.added) {
            return
        }
    
        dispatch({
            type: REMOVE_ADDONS,
            payload: {
                addons,
                addonsIndex: isAdded.idx
            },
        })
    }
}