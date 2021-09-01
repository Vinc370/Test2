import React, { useEffect, useState } from 'react'
import { getPackage } from '../../../../../../services/EOService'
import LoadingSpinner from '../../../../../../components/LoadingSpinner/LoadingSpinner'
import { Image } from 'react-bootstrap'
import UrlService from '../../../../../../services/UrlService'

function EO({ eo }) {
    const [description, setDescription] = useState(<LoadingSpinner />)

    useEffect(() => {
        const fetchDescription = async () => {
            const package_id = eo.package_event_organizer.package_event_organizer_id
            
            try {
                const response = await getPackage(package_id)
                setDescription(response.data.package_event_organizer_description?.map((desc, key) => (
                    <div key={key}>
                        <p className='bold-text'>
                            {desc.package_event_organizer_description_title}
                        </p>
                        <p className='small-italic-grey-text'>
                            {desc.package_event_organizer_description_name}
                        </p>
                    </div>
                )))
            } catch (error) {
                setDescription(<h4>Something went wrong when trying to display</h4>)
            }
        }

        fetchDescription()
    }, [eo])

    return (
        <div>
            <h4 className='bold-text text-center'>{eo.package_event_organizer.package_event_organizer_name}</h4>
            <p className='bold-text text-center text-success'>Rp. {eo.package_event_organizer.package_event_organizer_price} Nett</p>
            
            <br/>

            <h5>Deskripsi Paket</h5>
            {description}

            <br/>
            
            <p className='bold-text text-center'>Tema Dekorasi</p>
            <div>
                <Image
                    className="rounded"
                    // dak ada di table tapi di active transactions ada bikin kekgini jadi yauds
                    src={UrlService.getImageUrl(eo.package_event_organizer_theme_photo)}
                />
                <br/>
                <p className='text-center text-info'>{eo.package_event_organizer_theme.package_event_organizer_theme_name}</p>
            </div>
        </div>
    )
}

export default EO
