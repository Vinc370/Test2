import 'jspdf-autotable'
import React from 'react'
import { getFamilyContacts, storeFamilyContacts } from '../../services/BookletService'
import './booklet.scss'
import BookletTwoTableTemplate from './BookletTwoTableTemplate'

const BookletKontakKeluarga = ({event_id}) => {
    return (
        <BookletTwoTableTemplate
            event_id={event_id}
            getData={getFamilyContacts}
            storeData={storeFamilyContacts}
            detail={['name', 'as', 'contact', 'relationship', 'description']}
            detailTitle={['Nama', 'Sebagai', 'Contact', 'Hubungan', 'NB']}
            type={{
                indonesian: 'Kontak Keluarga',
                plural: 'family_contacts'
            }}
            category={['Daftar Kontak Mempelai Pria', 'Daftar Kontak Mempelai Wanita']}
        />
    )
}

export default BookletKontakKeluarga