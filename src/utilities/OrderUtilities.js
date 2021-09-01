export const getPrice= transaction => {
    var eventPrice = 0
    var vendorPrice = 0
    var venuePrice = 0

    if(transaction.order_event_organizer.length !== 0){
        eventPrice = transaction.order_event_organizer[0].package_event_organizer.package_event_organizer_price
    }

    if(transaction.order_vendor.length !== 0){
        transaction.order_vendor.forEach(vendor => {
            vendorPrice += vendor.vendor_jasa.vendor_jasa_price
        });
    }

    if(transaction.order_venue.length !== 0){
        venuePrice = (transaction.order_venue[0].venue_package.venue_package_sell_price / transaction.order_venue[0].venue_package.venue_package_total_pax)
    }
    return eventPrice + vendorPrice + venuePrice
}

