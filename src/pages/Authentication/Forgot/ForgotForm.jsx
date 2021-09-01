import React, { useState, useEffect } from 'react'
import { Form, Container, FormGroup, FormLabel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import RoundedButton from '../../../components/Button/RoundedButton'
import BasicInput from '../../../components/Form/Input/BasicInput'
import useQuery from '../../../hooks/useQuery'
import {forgot} from '../../../redux/actions/authentication/authentication'

function ForgotForm({ forgot, isLoading, error }) {
    const history = useHistory()
    const query = useQuery()
    const [data, setData] = useState({
        email: '',
    })

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (error) {
            setErrorMessage(error)
        }
    }, [error])

    const onChange = e => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async e => {
        e.preventDefault()
        const res = await forgot(data)
        
        if (res) {
            const redirect = query.get('redirect') || '/'
            history.push(redirect)
        }
    }

    return (
        <Form 
            className="my-3 position-relative"
            onSubmit={e => onSubmit(e)}
        >
            <FormGroup>
                <FormLabel className="text-grey">Email</FormLabel>
                <BasicInput
                    id="email"
                    type="email"
                    name="email"
                    border={['bottom']}
                    value={data.email}
                    onChange={e => onChange(e)}
                    disabled={isLoading}
                />
            </FormGroup>

            <div className="text-danger text-center small font-italic">
                {errorMessage}
            </div>

            <Container className="d-flex justify-content-center mt-5 mt-md-6">
                <RoundedButton 
                    text="Submit" 
                    color="orange" 
                    large 
                    style={{
                        width: '75%'
                    }}
                    type="submit"
                    disabled={isLoading}
                />
            </Container>
        </Form>
    )
}

const mapStateToProps = state => ({
    isLoading: state.authentication.isLoading,
    error: state.authentication.error,
})

export default connect(
    mapStateToProps, 
    {forgot}
)(ForgotForm)