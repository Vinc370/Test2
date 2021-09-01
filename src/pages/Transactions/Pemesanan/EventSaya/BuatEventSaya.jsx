import { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import BasicInput from '../../../../components/Form/Input/BasicInput';
import HeaderNavigationV2 from '../../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2';
import Header from '../../../../components/Header/Header';
import useWindowSize from '../../../../hooks/useWindowSize';
import { getAllEvents, storeUserEvent } from '../../../../services/EventService';

const BuatEventSaya = ({informasiEventOrigin}) => {
    const [event_organizers, setEventOrganizer] = useState([]);
    const history = useHistory()
    const {isMobile, size} = useWindowSize();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllEvents().then((data) => { setEventOrganizer(data.data) });
    }, []);
    
    useEffect(() => {
        if(informasiEventOrigin === 'keranjang') {
          window.onbeforeunload = function() {return true;};
          return () => {window.onbeforeunload = null;};
        }
    }, []);

    const [data, setData] = useState({
        event_location: '',
        event_date: '',
        event_organizer_id: '',
        errors: {},
    })

    const onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        
        setData(data => ({
            ...data,
            [name]: value 
        }))
    }

    const onSubmit = async e => {
        e.preventDefault();

        setIsLoading(true)
    
        try {
            await storeUserEvent(data)

            if(informasiEventOrigin === 'keranjang') {
                history.push('keranjang')
            } else {
                history.push('event-saya')
            }

        } catch (error) {
            handleError(error)
        }

        setIsLoading(false)
    }

    const handleError = error => {
        if (error.response) {
          if (error.response.status === 422) {
            setData(data => ({
              ...data,
              errors: error.response.data.errors
            }))
            return
          }
        }
  
        setData(data => ({
          ...data,
          errors: {
            server: 'Connection error, please try again'
          }
        }))
        return
    } 
    
    return (
        <div>
            {!isMobile && <Header/>}
            <HeaderNavigationV2 title={'Buat Event Saya'} isBlack sticky={true} />

            <div className='container my-3'>
                <Form onSubmit={e => onSubmit(e)}>
                    <Form.Group className="mb-3 mb-lg-4">
                        <Form.Label className="mb-2">Lokasi</Form.Label>
                        <select 
                            className="form-control" 
                            name="event_location" 
                            onChange={e => onChange(e)}
                            disabled={isLoading}
                            value={data.event_location}
                        >
                            <option value="">Pilih Lokasi</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Depok">Depok</option>
                            <option value="Tangerang">Tangerang</option>
                            <option value="Bekasi">Bekasi</option>
                            <option value="Belum Ditentukan">Belum Ditentukan</option>
                        </select>
                        <div className="text-danger mb-3 mb-lg-4 font-size-8">{data.errors?.event_location}</div>
                    </Form.Group>
                    <Form.Group className="mb-3 mb-lg-4">
                        <Form.Label className="mb-2">Tanggal Acara</Form.Label>
                        <BasicInput 
                            type="date"
                            name="event_date"
                            value={data.event_date}
                            onChange={e => onChange(e)}
                            disabled={isLoading}
                        />
                        <div className="text-danger mb-3 mb-lg-4 font-size-8">{data.errors?.event_date}</div>
                    </Form.Group>
                    <Form.Group className="mb-3 mb-lg-4">
                        <Form.Label className="mb-2">Event</Form.Label>
                        <select 
                            className="form-control" 
                            name="event_organizer_id" 
                            onChange={e => onChange(e)}
                            disabled={isLoading}
                        >
                            <option value="">Pilih Event</option>
                            {
                                event_organizers?.map((item, k) => (
                                    <option key={k} value={item.event_organizer_id} selected={data.event_organizer_id === item.event_organizer_id ? true : false}>
                                        {item.event_organizer_name}
                                    </option>
                                ))
                            }
                        </select>
                        <div className="text-danger mb-3 mb-lg-4 font-size-8">{data.errors?.event_organizer_id}</div>
                    </Form.Group>
                    <div className="mt-4 d-flex justify-content-center">
                        <Button 
                            color="signature"
                            text="Simpan"
                            type="submit"
                            className="px-5 mb-1 w-100"
                            disabled={isLoading}
                        />
                    </div>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    informasiEventOrigin: state.event.origin
})

export default connect(mapStateToProps, null)(BuatEventSaya);