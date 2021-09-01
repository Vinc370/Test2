import store from '../redux/Store';

export const getSmallestPricedPackage = venue => {
    return venue.venue_package.reduce((accumulator, currentPackage) => {
        return (currentPackage.venue_package_sell_price / currentPackage.venue_package_total_pax) < (accumulator.venue_package_sell_price / accumulator.venue_package_total_pax) ? currentPackage : accumulator
    })
}

export const isAddonsAdded = addons => {
    const addonsList = store.getState().venueDetailData.addons

    for (const idx in addonsList) {
        const curr = addonsList[idx];
        if (curr.venue_addons_id === addons.venue_addons_id) {
            return {
                added: true,
                idx
            }
        }
    }

    return {added: false}
}

export const getCategoryOneID = data => {
    return data.venue_one_category_id
}

export const getCategoryOneName = data => {
    return data.venue_one_category_name
}

export const getCategoryTypeID = data => {
    return data.venue_category_id
}

export const getCategoryTypeName = data => {
    return data.venue_category_name
}