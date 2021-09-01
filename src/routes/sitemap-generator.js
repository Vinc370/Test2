require("babel-register")({
    presets: ["es2015", "react"]
});

const router = require("./sitemap-routes").default;
const getAllVenues = require("../services/VenueService").getAllVenues;
const getAllVendors = require("../services/VendorService").getAllVendors;
const getVendor = require("../services/VendorService").getVendor;
const getAllEvents = require("../services/EventService").getAllEvents;
const getAllEventPackages = require("../services/EventService").getAllEventPackages;
const getAllPromoBanner = require("../services/PromoService").getAllPromoBanner;
const Sitemap = require("react-router-sitemap").default;
const processWords = require("../utilities/Utilities").processWords;

async function generateSitemap() {
    let venueMap = [];
    let vendorMap = [];
    let vendorJasaMap = [];
    let eventOrganizerMap = [];
    let packageEventOrganizerMap = [];
    let promoBannerMap = [];
    
    try {
        const venues = await getAllVenues()
        for(var i = 0; i < venues.length; i++) {
            venueMap.push({ venue_route: venues[i].venue_route });
        }

        const responseVendor = await getAllVendors()
        const vendors = responseVendor.data
        for(var i = 0; i < vendors.length; i++) {
            vendorMap.push({ vendor_route: vendors[i].vendor_route });

            const responseVendorJasa = await getVendor(vendors[i].vendor_route)
            const vendor_jasas = responseVendorJasa.data.vendor_jasa
            for(var j = 0; j < vendor_jasas.length; j++) {
                vendorJasaMap.push({ id: vendor_jasas[j].vendor_jasa_id, name: processWords(vendor_jasas[j].vendor_jasa_name), vendor_name: processWords(vendors[i].vendor_name) });
            }
        }

        const responseEventOrganizer = await getAllEvents()
        const event_organizers = responseEventOrganizer.data
        for(var i = 0; i < event_organizers.length; i++) {
            eventOrganizerMap.push({ event_organizer_route: event_organizers[i].event_organizer_route });
            
            const responsePackageEventOrganizer = await getAllEventPackages(event_organizers[i].event_organizer_route)
            const package_event_organizers = responsePackageEventOrganizer.data.package_event_organizer
            for(var j = 0; j < package_event_organizers.length; j++) {
                packageEventOrganizerMap.push({ id: package_event_organizers[j].package_event_organizer_id, name: processWords(package_event_organizers[j].package_event_organizer_name), event_organizer_name: processWords(event_organizers[i].event_organizer_name) });
            }
        }

        const responsePromoBanner = await getAllPromoBanner()
        const promo_banners = responsePromoBanner.data
        for(var i = 0; i < promo_banners.length; i++) {
            promoBannerMap.push({ url: promo_banners[i].promotion_url});
        }

        const paramsConfig = {
            "/vendor/:vendor_route": vendorMap,
            "/vendor/:vendor_name/:name/:id": vendorJasaMap,
            "/venue/:venue_route": venueMap,
            "/event-organizer/:event_organizer_route": eventOrganizerMap,
            "/event-organizer/:event_organizer_name/:name/:id": packageEventOrganizerMap,
            "/promo/:url": promoBannerMap,
        };

        return (
        new Sitemap(router)
            .applyParams(paramsConfig)
            .build("https://www.littlecloudeo.com")
            .save("./public/sitemap.xml")
        );
    } catch(e) {
        
    } 
}

generateSitemap();