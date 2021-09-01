import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import EventKosong from '../../../assets/images/EventKosong.png';
import HeaderNavigationV2 from "../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2";
import Header from "../../../components/Header/Header";
import useWindowSize from '../../../hooks/useWindowSize';
import { getUserEvent } from '../../../services/EventService';
import { forceStoreCartInformation, storeCartInformation } from '../../../services/KeranjangService';
import { getDateFormat } from '../../../utilities/Utilities';
import EventCard from '../../Account/Akun Saya/Components/EventCard/EventCard';
import './EventList.scss';

const EventList = ({informasiEventOrigin}) => {
  const history = useHistory();
  const [userEvent, setUserEvent] = useState([]);

  const {isMobile, size} = useWindowSize();

  const handleClick = async (item) => {
    if(informasiEventOrigin === 'keranjang') {
      await storeCartInformation({event_id: item.event_id})
        .then((response) => {  
          history.push('keranjang')
        })
        .catch((error) => {
          if(error.response.status === 422) {
            Swal.fire({
              icon: 'warning',
              title: error.response.data.message,
              text: 'Jika kamu melanjutkan maka semua barang di keranjang akan dihapus dan silakan melakukan pemesanan ulang',
              footer: '<a href="https://api.whatsapp.com/send?phone=62895343534808&text=Halo,%0ASaya mengalami kesulitan ketika ingin memesan event." target="_blank">Hubungi kami</a>',
              showCancelButton: true,
              confirmButtonText: 'Lanjutkan',
              cancelButtonText: 'Kembali',
            }).then(async (result) => {
              if (result.isConfirmed) {
                await forceStoreCartInformation({event_id: item.event_id})
                history.push('keranjang')
              }
            });
          }
        })
    } else {
      history.push('dashboard/'+item.event_id)
    }
  }

  useEffect(() => {
    getUserEvent().then((response) => {setUserEvent(response.data)})
  }, []);

  useEffect(() => {
    if(informasiEventOrigin === 'keranjang') {
      window.onbeforeunload = function() {return true;};
      return () => {window.onbeforeunload = null;};
    }
  }, []);

  return (
    <div className='min-height-95'>
      {!isMobile && <Header/>}
      <HeaderNavigationV2 title={'Event Saya'} isBlack sticky={true} />
      <div className='container my-3'>
        
      {userEvent.length === 0 ?
          <>
            <div className="flex-column d-flex justify-content-center" >
              <img src={EventKosong} alt="" className="w-50 img-transparent m-auto" />
            </div>
            <p className='text-center'>Acaramu masih kosong! Yuk buat acara!</p>
          </>
          :
          <>
            {
              userEvent?.map((item, k) => (
                <>
                  <EventCard
                    filled={
                      [
                        item?.event_organizer?.event_organizer_name,
                        getDateFormat(item?.event_date),
                        item?.event_location
                      ]
                    }
                    action={()=>handleClick(item)}
                    key={k}
                  />
                  <div className="mb-3"></div>
                </>
              ))}
          </>
        }
        <div className="text-center mt-3">
          <Link to="/buat-event-saya" className="black-outline-btn">Buat Acara Lainnya</Link>
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = state =>({
  userEvent: state.authentication.userEvent,
  informasiEventOrigin: state.event.origin
})

export default withRouter(connect(mapStateToProps, null)(EventList))