import React, { useState } from 'react';
import { Col, Container, Form, FormGroup, FormLabel, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import RoundedButton from "../../../components/Button/RoundedButton";
import BasicInput from "../../../components/Form/Input/BasicInput";
import HeaderNavigationV2 from '../../../components/ForMobile/HeaderNavigation/HeaderNavigationV2';
import Header from '../../../components/Header/Header';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useQuery from "../../../hooks/useQuery";
import { login } from '../../../redux/actions/authentication/authentication';
import store from '../../../redux/Store';
import { register } from '../../../services/AuthService';

function Register() {
    useDocumentTitle('Daftar - Littlecloud');

    const history = useHistory()
    const query = useQuery()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })
    const [error_label, setErrorLabel] = useState(null);
    const [disabledButton, setDisabledButton]= useState("");

    const onChange = e => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async e => {
        e.preventDefault()

        try{
            setDisabledButton('disabled')
            await register(data)
            store.dispatch(login(data))
            history.push('/')
            setDisabledButton('')
        } catch(err){
            setDisabledButton('')
            setErrorLabel(err.response.data.errors)
        }
    };

    return(
        <div className='register'>
            <Header />
            <HeaderNavigationV2
                title={'Daftar'}
                isBlack
            />
            <Container className='item-container'>
                <Row>
                    <Col lg={7}>
                    <Form
                        className="my-3"
                        onSubmit={e => onSubmit(e)}
                    >
                        <div className="text-center mb-4 font-weight-bold">
                            Sudah memiliki akun? <Link to="/login" className="text-signature"><u>Login Sekarang</u></Link>
                        </div>
                        <FormGroup>
                            <FormLabel className="text-grey">Name</FormLabel>
                            <BasicInput
                                onChange={e => onChange(e)}
                                name="name"
                                type="text"
                                border={['bottom']}
                            />
                        </FormGroup>
                        <div className="text-danger text-center small font-italic">
                            {error_label?.name}
                        </div>
                        <FormGroup>
                            <FormLabel className="text-grey">Email</FormLabel>
                            <BasicInput
                                onChange={e => onChange(e)}
                                name="email"
                                type="email"
                                border={['bottom']}
                            />
                        </FormGroup>
                        <div className="text-danger text-center small font-italic">
                            {error_label?.email}
                        </div>
                        <FormGroup>
                            <FormLabel className="text-grey">Phone</FormLabel>
                            <BasicInput
                                onChange={e => onChange(e)}
                                name="phone"
                                type="text"
                                border={['bottom']}
                            />
                        </FormGroup>
                        <div className="text-danger text-center small font-italic">
                            {error_label?.phone}
                        </div>
                        <FormGroup>
                            <FormLabel className="text-grey">Password</FormLabel>
                            <BasicInput
                                onChange={e => onChange(e)}
                                name="password"
                                type="password"
                                border={['bottom']}
                            />
                        </FormGroup>
                        <div className="text-danger text-center small font-italic">
                            {error_label?.password}
                        </div>
                        {/*<br/>*/}
                        {/*<FormGroup>*/}
                        {/*    <Row>*/}
                        {/*        <Col>*/}
                        {/*            <FormLabel className="text-grey mr-3">Pilih lokasi tinggal anda</FormLabel>*/}
                        {/*        </Col>*/}
                        {/*        <Col>*/}
                        {/*            <select className='p-1 w-100 rounded'*/}
                        {/*                    name='location_id'*/}
                        {/*                    onChange={e => onChange(e)}*/}
                        {/*            >*/}
                        {/*                <option*/}
                        {/*                    value={0}>*/}
                        {/*                    Select*/}
                        {/*                </option>*/}
                        {/*                {venue_locations?.map((venue_location, key)=>(*/}
                        {/*                    <option*/}
                        {/*                        value={venue_location.venue_one_category_id} key={key}>*/}

                        {/*                        {venue_location.venue_one_category_name}*/}
                        {/*                    </option>*/}
                        {/*                ))}*/}
                        {/*            </select>*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}

                        {/*</FormGroup>*/}

                        <Container className="d-flex justify-content-center mt-5 mt-md-6">
                            {console.log(disabledButton)}
                            <RoundedButton
                                type="submit"
                                text="Register"
                                color="orange"
                                large
                                style={{
                                    width: '75%'
                                }}
                                className={disabledButton}
                            />
                        </Container>
                    </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default connect(null, {})(Register)