import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EventKosong from "../../../assets/images/EventKosong.png"
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2'
import { getTagihan } from '../../../services/PaymentService'
import { getDateFormat } from '../../../utilities/Utilities'
import EventCard from '../../Account/Akun Saya/Components/EventCard/EventCard'
import './eventbill.scss'

function Tagihan({ }) {
    const history = useHistory();
    const [tagihan, setTagihan] = useState([]);

    useEffect(() => {
        getTagihan().then((response) => {     
            setTagihan(response.data) 
        });
    }, [])

    return (
        <div className='min-height-95'>
            <HeaderNavigationV2 title={'Tagihan'} isBlack sticky={true} />

            <div className='container my-3'>
              {tagihan.length === 0 ?
                <>
                  <div className="flex-column d-flex justify-content-center">
                    <img src={EventKosong} alt="" className="w-50 img-transparent m-auto"/>
                  </div>
                  <p className='text-center'>Acaramu masih kosong! Yuk buat acara!</p>
                </>
                :
                <>
                  {
                    tagihan.map((item, k) => (
                      <>
                        <EventCard
                          filled={[
                            item?.event_organizer?.event_organizer_name,
                            getDateFormat(item?.event_date),
                            item?.event_location
                          ]}
                          action={() => history.push('/transaksi/tagihan/' + item?.event_id)}
                          key={k}
                        />
                        <div className="mb-3"></div>
                      </>
                    ))
                  }
                </>
              }
            </div>
        </div>
    )
}

export default connect(null, null)(Tagihan)
    