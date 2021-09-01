import SoundSystem from '../../../../../assets/icons/SoundSystem'
import ParkirLuas from '../../../../../assets/icons/ParkirLuas'
import DurasiFleksibel from '../../../../../assets/icons/DurasiFleksibel'
import Projector from '../../../../../assets/icons/Projector'
import NoServiceCharge from '../../../../../assets/icons/NoServiceCharge'

export const getFacilityIcon = facility => {
    if (facility.venue_category_facility.venue_category_name.toLowerCase() === 'sound system') {
        return SoundSystem
    } else if (facility.venue_category_facility.venue_category_name.toLowerCase() === 'proyektor') {
        return Projector
    } else if (facility.venue_category_facility.venue_category_name.toLowerCase() === 'durasi fleksibel') {
        return DurasiFleksibel
    } else if (facility.venue_category_facility.venue_category_name.toLowerCase() === 'tanpa service charge') {
        return NoServiceCharge
    } else if (facility.venue_category_facility.venue_category_name.toLowerCase() === 'parkir mudah') {
        return ParkirLuas
    } 
}