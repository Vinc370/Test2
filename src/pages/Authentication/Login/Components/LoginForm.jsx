import React, { useState, useEffect } from 'react'
import { Form, Container, FormGroup, FormLabel } from 'react-bootstrap'
import BasicInput from '../../../../components/Form/Input/BasicInput'
import RoundedButton from '../../../../components/Button/RoundedButton'
import { login } from '../../../../redux/actions/authentication/authentication'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useQuery from '../../../../hooks/useQuery'

function LoginForm({ login, isLoading, error }) {
    const history = useHistory()
    const query = useQuery()
    const [data, setData] = useState({
        email: '',
        password: '',
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
        const res = await login(data)
        
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
                    border={['left', 'top', 'right', 'bottom']}

                    value={data.email}
                    onChange={e => onChange(e)}
                    disabled={isLoading}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel className="text-grey">Password</FormLabel>
                <BasicInput
                    id="password"
                    type="password"
                    name="password"
                    border={['left', 'top', 'right', 'bottom']}
                    value={data.password}
                    onChange={e => onChange(e)}
                    disabled={isLoading}
                    
                />
            </FormGroup>

            <div className="text-danger text-center small font-italic">
                {errorMessage}
            </div>

            <br />
            <br />
                <RoundedButton 
                    text="Login"
                    type="submit"
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '0rem'
                    }}
                />
        </Form>
    )
}

const mapStateToProps = state => ({
    isLoading: state.authentication.isLoading,
    error: state.authentication.error,
})

export default connect(
    mapStateToProps, 
    {login}
)(LoginForm)