import 'jspdf-autotable'
import React from 'react'
import { getConsumptions, storeConsumptions } from '../../services/BookletService'
import './booklet.scss'
import BookletOneTableTemplate from './BookletOneTableTemplate'

const BookletKonsumsi = ({event_id}) => {
    
    return (
        <BookletOneTableTemplate
            event_id={event_id}
            getData={getConsumptions}
            storeData={storeConsumptions}
            detail={['description', 'receive_time', 'receive_location', 'name']}
            detailTitle={['Deskripsi', 'Waktu Penerimaan', 'Konsumsi Penerimaan', 'Keterangan']}
            type={{
                indonesian: 'Konsumsi',
                plural: 'consumptions'
            }}
        />
    )
}

export default BookletKonsumsi