import 'jspdf-autotable'
import React from 'react'
import { getImages, storeImages } from '../../services/BookletService'
import './booklet.scss'
import BookletTwoTableTemplate from './BookletTwoTableTemplate'

const BookletPhotoSession = ({event_id}) => {
    return (
        <BookletTwoTableTemplate
            event_id={event_id}
            getData={getImages}
            storeData={storeImages}
            detail={['name']}
            detailTitle={['Nama']}
            type={{
                indonesian: 'Photo Session',
                plural: 'photo_list'
            }}
            category={['Pemberkatan / Akad Nikah', 'Resepsi']}
        />
    )
}

export default BookletPhotoSession