import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import HeaderNavigationV2 from '../../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import { getTagihanDetail } from '../../../../services/PaymentService'
import TagihanCardComponent from '../../Main/Transaction/Tagihan/Component/TagihanCardComponent'

function TagihanDetail({ }) {
    const history = useHistory();
    const { id } = useParams();
    const [tagihan, setTagihan] = useState(null);

    useEffect(() => {
        getTagihanDetail(id).then((response) => {     
            setTagihan(response.data) 
        }).catch((error)=>{
            history.push('/akun')    
        });
    }, [])

    return (
        <div className="the-container">
            <div className="event-bill-page-container">
                <HeaderNavigationV2 title={'Tagihan Detail'} isBlack sticky={true} />

                <TagihanCardComponent
                    tagihan={tagihan}
                />
            </div>
        </div>
    )
}

export default connect(null, null)(TagihanDetail)
    