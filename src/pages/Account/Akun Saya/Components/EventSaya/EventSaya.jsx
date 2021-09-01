import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getUserEvent } from '../../../../../services/EventService';
import { getDateFormat } from '../../../../../utilities/Utilities';
import EventCard from '../EventCard/EventCard';
import './EventSaya.scss';

function EventSaya({ }) {
    const history = useHistory();
    const [userEvent, setUserEvent] = useState([]);

    useEffect(() => {
        getUserEvent().then((response) => {setUserEvent(response.data)})
    }, []);

    const handleClick = (item) => {
        history.push('dashboard/'+item?.event_id)
    }

    return (
        <>
            <div className="account_event_saya">
                <span className="title">Susun Event Anda</span>
                <span className="horizontal-scrollable">
                {
                    userEvent?.map((item, k) => (
                        <EventCard
                            filled={[
                                item?.event_organizer?.event_organizer_name,
                                getDateFormat(item?.event_date),
                                item?.event_location
                            ]}
                            action={()=>handleClick(item)}
                            key={k}
                        />
                    )
                )}
                </span>
                <span>
                    <Link to="/buat-event-saya" className="black-outline-btn">Buat Acara Lainnya</Link>
                </span>
            </div>
        </>
    )
}

export default connect(null, null)(EventSaya)
    