import 'jspdf-autotable'
import React from 'react'
import { getVendorContacts, storeVendorContacts } from '../../services/BookletService'
import './booklet.scss'
import BookletOneTableTemplate from './BookletOneTableTemplate'

const BookletKontakVendor = ({event_id}) => {
    
    return (
        <BookletOneTableTemplate
            event_id={event_id}
            getData={getVendorContacts}
            storeData={storeVendorContacts}
            detail={['type', 'name', 'contact', 'crew', 'check_in', 'location']}
            detailTitle={['Vendor', 'Nama', 'Kontak', 'Kru', 'Check-in', 'Lokasi']}
            type={{
                indonesian: 'Kontak Vendor',
                plural: 'vendor_contacts'
            }}
        />
    )
}

export default BookletKontakVendor