import 'jspdf-autotable'
import React from 'react'
import { getTransportations, storeTransportations } from '../../services/BookletService'
import './booklet.scss'
import BookletTwoTableTemplate from './BookletTwoTableTemplate'

const BookletTransportasi = ({event_id}) => {
    return (
        <BookletTwoTableTemplate
            event_id={event_id}
            getData={getTransportations}
            storeData={storeTransportations}
            detail={['name', 'passanger', 'stuff', 'plat']}
            detailTitle={['Nama', 'Penumpang', 'Barang / Titipan', 'Plat']}
            type={{
                indonesian: 'Transportasi',
                plural: 'transports'
            }}
            category={['Menuju Ke Pemberkatan', 'Pulang Dari Pemberkatan']}
        />
    )
}

export default BookletTransportasi