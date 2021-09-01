import store from '../../../redux/Store'
import Swal from 'sweetalert2'
import {getUserCart, addVenueToCart, insertNewCart, getCartInformation} from '../../../services/KeranjangService';
import { fillVenue, isBookingVenue } from '../../../redux/actions/transaction/transaction'

export const processVenue = async (callback, setIsLoading, venue_id) =>{
    let carts
    let informations
    try {
        const response = await getUserCart({'user_id': store.getState().authentication.currentUser.user_id})
        carts = response.data

        const responseInformations = await getCartInformation()
        informations = responseInformations.data
    } catch (error) {
        showErrorPopup()
        setIsLoading(false)
      return
    }

    store.dispatch(fillVenue(venue_id))
    store.dispatch(isBookingVenue())

    const formData = getFormData(venue_id)
    let service

    if(informations !== ""){
      if(informations.status !== "Pending"){
        return showErrorPopup('Your transactions is being processed')
      }
    }

    if(carts.cart_venue_detail.length !== 0 ){
        service = addVenueToCart
        alert('addVenueToCart')
    }else{
        service = insertNewCart
        alert('insertNewCart')
      }

    try {
        await service(formData)
    } catch (error) {
        showErrorPopup('')
        setIsLoading(false)
        return
    }

    callback()
  }

  const getFormData = (venue_id) => {
    const formData = new FormData();
    formData.append("user_id", store.getState().authentication.currentUser.user_id)
    formData.append('venue_id', venue_id)
    formData.append('venue_package_id', store.getState().venueDetailData.package.venue_package_id)
    formData.append('total_guest', store.getState().venueDetailData.guestCount)
    formData.append('venue_notes', "")
    var venue_addons = store.getState().venueDetailData.addons.filter(addons => addons.venue_id == venue_id)
    var json_venue_addons = JSON.stringify(venue_addons)

    formData.append('venue_addons', json_venue_addons);
    return formData
  }

const showErrorPopup = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Something Wrong Happened',
        text: text ==='' ? 'Please try again': text,
        timer: 3000,
    })
}