import {
    FILL_VENDOR_JASA_ID,
    FILL_VENUE_ID,
    FILL_EVENT_ORGANIZER_ID,
    FILL_PACKAGE_EVENT_ORGANIZER_ID,
    FILL_PACKAGE_EVENT_ORGANIZER_THEME_ID,
    FILL_EVENT_NOTES,
    IS_BOOKING_EVENT,
    IS_BOOKING_VENUE,
    IS_BOOKING_VENDOR,
    REMOVE_VENDOR_JASA_ID,
    SET_INITIAL_STATE
} from "../../types/transactionActionTypes";

export const setInitialState = ()=>({
    type: SET_INITIAL_STATE
})

export const removeVendorJasa = (removedId) =>({
    type: REMOVE_VENDOR_JASA_ID,
    payload: removedId
})

export const fillEventOrganizer = (newId) => ({
    type: FILL_EVENT_ORGANIZER_ID,
    payload: newId,
})

export const fillPackageEventOrganizer = (newId) =>({
    type:FILL_PACKAGE_EVENT_ORGANIZER_ID,
    payload:newId,
})

export const fillPackageEventOrganizerTheme = (newId) =>({
    type: FILL_PACKAGE_EVENT_ORGANIZER_THEME_ID,
    payload:newId,
})

export const fillVenue = (newId) => ({
    type: FILL_VENUE_ID,
    payload: newId,
})

export const fillVendorJasa = (newId) => ({
    type: FILL_VENDOR_JASA_ID,
    payload: newId,
})

export const isBookingEvent = () =>({
    type: IS_BOOKING_EVENT
})

export const isBookingVenue = ()=>({
    type: IS_BOOKING_VENUE
})

export const isBookingVendor = ()=>({
    type: IS_BOOKING_VENDOR
})

export const fillEventNotes = (notes) =>({
    type: FILL_EVENT_NOTES,
    payload: notes
})
