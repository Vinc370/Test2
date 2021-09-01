import {
    FILL_EVENT_ORGANIZER_ID,
    FILL_PACKAGE_EVENT_ORGANIZER_ID,
    FILL_PACKAGE_EVENT_ORGANIZER_THEME_ID,
    FILL_EVENT_NOTES,
    IS_BOOKING_EVENT,
    IS_BOOKING_VENDOR,
    IS_BOOKING_VENUE,
    FILL_VENDOR_JASA_ID,
    FILL_VENUE_ID,
    REMOVE_VENDOR_JASA_ID,
    SET_INITIAL_STATE
} from "../../types/transactionActionTypes";

const initialState= {
    'transaction_event_organizer_id': 0,
    'transaction_package_event_organizer_id':0,
    'transaction_package_event_organizer_theme_id': null,
    'event_notes':'',
    'have_seen_event': false,
    'have_seen_venue': false,
    'have_seen_vendor': false,
    'transaction_venue_id':0,
    'transaction_venue_package_id':0,
    'transaction_vendor':[],
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case FILL_EVENT_ORGANIZER_ID:
            return fillEventOrganizer(state, action.payload)
        case FILL_PACKAGE_EVENT_ORGANIZER_ID:
            return fillPackageEventOrganizer(state, action.payload)
        case FILL_PACKAGE_EVENT_ORGANIZER_THEME_ID:
            return fillPackageEventOrganizerTheme(state, action.payload)
        case FILL_EVENT_NOTES:
            return fillEventNotes(state, action.payload)
        case IS_BOOKING_VENDOR:
            return isBookingVendor(state)
        case IS_BOOKING_VENUE:
            return isBookingVenue(state)
        case IS_BOOKING_EVENT:
            return isBookingEvent(state)
        case FILL_VENUE_ID:
            return fillVenue(state, action.payload)
        case FILL_VENDOR_JASA_ID:
            return fillVendorJasa(state, action.payload)
        case REMOVE_VENDOR_JASA_ID:
            return removeVendorJasa(state, action.payload)
        case SET_INITIAL_STATE:
            return initialState
        default:
            return state
    }
}

const isBookingEvent = (state) => {
    return {
        ...state,
        have_seen_event: true
    }
}


const isBookingVenue = (state) => {
    return {
        ...state,
        have_seen_venue: true
    }
}


const isBookingVendor = (state) => {
    return {
        ...state,
        have_seen_vendor: true
    }
}


const fillEventNotes = (state, notes) => {
    return {
        ...state,
        event_notes: notes
    }
}


const fillEventOrganizer = (state, newId) => {
    return {
        ...state,
        transaction_event_organizer_id: newId
    }
}

const fillPackageEventOrganizer = (state, newId) => {
    return {
        ...state,
        transaction_package_event_organizer_id: newId
    }
}

const fillPackageEventOrganizerTheme = (state, newId) => {
    return {
        ...state,
        transaction_package_event_organizer_theme_id: newId
    }
}

const fillVendorJasa = (state, newObject) =>{
    let index = state.transaction_vendor?.map((a) => {return a.vendor_jasa_id}).indexOf(newObject.vendor_jasa_id)
    if(index === -1){
        return {
            ...state,
            transaction_vendor: [...state.transaction_vendor, newObject]
        }
    }
    return state
}

const removeVendorJasa =(state, removedId)=>{
    return {
        ...state,
        transaction_vendor: state.transaction_vendor.filter(vendor => vendor.vendor_jasa_id !== removedId)
    }
}

const fillVenue = (state,newId) =>{
    return {
        ...state,
        transaction_venue_id: newId
    }
}

export default reducer;