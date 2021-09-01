import React, { useEffect, useState } from 'react';
import HeaderNavigationV2 from "../../components/ForMobile/HeaderNavigation/HeaderNavigationV2";
import Header from "../../components/Header/Header";
import { getAllEvents, storeEventV2 } from "../../services/EventService";
import { getAllLocations } from "../../services/VenueService";
import './CreateEvent.scss';

function CreateEvent(){
  const [data, setData] = useState({
    event_location: '',
    event_date: '',
    event_organizer_id: ''
  })

  const onChange = e => {
    setData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const [locations, setLocations] = useState([]);
  const [event_organizers, setEventOrganizer] = useState([]);

  useEffect(() => {
    getAllLocations().then((response) => {
      setLocations(response.data);
    })
    getAllEvents().then((response) => {
      setEventOrganizer(response.data)
    });
  }, [])

  const processCreateEvent =()=>{
    storeEventV2(data)
  }

  return (
    <div>
      <Header/>

      <HeaderNavigationV2 title={'Buat Event'} isBlack />
      <br/>
      <div className="container mt-4 mb-4 create-event ">
        <div className='mb-4'>
          <p className="title">Place of the event?</p>
          {locations?.map((location)=>(
            <div className='d-flex'>
              <input type='radio' className='mt-1' name='event_location' onChange={(e)=>onChange(e)} value={location.venue_one_category_name}/> &nbsp; <p className='ml-2 m-0'>{location.venue_one_category_name}</p>
            </div>
          ))}
        </div>
        <div className='mb-4'>
          <p className='title'>Event date? </p>
          <div>
            <div className="d-flex">
              <input type='date' className='w-100' name='event_date' onChange={(e)=>onChange(e)}/>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <p className='title'>Type of event? </p>
          <div>
            {event_organizers?.map((event)=>(
              <div className='d-flex'>
                <input type='radio' className='mt-1' name='event_organizer_id' onChange={(e)=>onChange(e)} value={event.event_organizer_id}/> &nbsp; <p className='ml-2 m-0'>{event.event_organizer_name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button className='signature-button' onClick={()=>processCreateEvent()}>Buat acaramu</button>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;