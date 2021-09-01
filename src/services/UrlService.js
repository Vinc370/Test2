let apiDomain = ''

if (process.env.NODE_ENV === 'production') {
    apiDomain = 'https://lc-api.littlecloudeo.com/'
} else {
    apiDomain = 'https://lc-api.littlecloudeo.com/'
}

class UrlService {
    static getApi(){
        return apiDomain + 'api'
    }

    static imageStorageUrl() {
        return apiDomain + 'img/storage'
    }

    static getImageUrl(image) {
        return apiDomain + 'img/storage/' + image
    }

    static registerUrl() {
        return apiDomain + 'api/register'
    }

    static loginUrl() {
        return apiDomain + 'api/login'
    }

    static logoutUrl() {
        return apiDomain + 'api/logout'
    }

    static venueUrl() {
        return apiDomain + 'api/venue'
    }

    static userUrl() {
        return apiDomain + 'api/user'
    }

    static vendorUrl(){
        return apiDomain + 'api/vendor'
    }

    static vendorUrlV2(){
        return apiDomain + 'api/v2/vendor'
    }

    static promoUrl(){
        return apiDomain + 'api/promo'
    }

    static keranjangUrl() {
        return apiDomain + 'api/keranjang'
    }

    static orderUrl() {
        return apiDomain + 'api/order'
    }

    static salesUrl() {
        return apiDomain + 'api/v2/sales'
    }
    
    static eventUrl(){
        return apiDomain + 'api/event-organizer'
    }

    static userEventUrl(){
        return apiDomain + 'api/v2/event'
    }

    static popularUrl(){
        return apiDomain + 'api/popular'
    }

    static promotionUrl(){
        return apiDomain + 'api/promotion'
    }

    static customOrderUrl(){
        return apiDomain + 'api/sales/custom-order'
    }

    static eventV2Url(){
        return apiDomain + 'api/v2/event'
    }

    static weddingUrl(){
        return apiDomain + 'api/weddings'
    }

    static paymentUrl(){
        return apiDomain + 'api/v2/payment'
    }
}

export default UrlService