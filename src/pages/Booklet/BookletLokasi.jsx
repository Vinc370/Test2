import 'jspdf-autotable'
import React from 'react'
import { getLocations, storeLocations } from '../../services/BookletService'
import './booklet.scss'
import BookletOneTableTemplate from './BookletOneTableTemplate'

const BookletLokasi = ({event_id}) => {
    
    return (
        <BookletOneTableTemplate
            event_id={event_id}
            getData={getLocations}
            storeData={storeLocations}
            detail={['name', 'address', 'room_detail', 'contact']}
            detailTitle={['Nama', 'Alamat', 'Detail Ruangan', 'Kontak']}
            type={{
                indonesian: 'Kontak Vendor',
                plural: 'locations'
            }}
        />
    )
}

export default BookletLokasi