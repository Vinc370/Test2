import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { startLoginLoading, endLoginLoading, googleLogin } from '../../../../redux/actions/authentication/authentication'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useQuery from '../../../../hooks/useQuery'

function GoogleOAuth({ isLoading, startLoginLoading, endLoginLoading, googleLogin }) {
    const history = useHistory()
    const query = useQuery()

    const onFailure = _ => {
        endLoginLoading('Google login failed or canceled')
    }

    const onSuccess = async res => {
        const success = await googleLogin(res.accessToken)
        if (success) {
            const redirect = query.get('redirect') || '/'
            history.push(redirect)
        }
    }

    return (
        <>
            <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT}
                onSuccess={onSuccess}
                onFailure={onFailure}
                onRequest={() => startLoginLoading()}
                disabled={isLoading}
            />
        </>
    )
}

const mapStateToProps = state => ({
    isLoading: state.authentication.isLoading
})

export default connect(mapStateToProps, {
    startLoginLoading,
    endLoginLoading,
    googleLogin,
})(GoogleOAuth)
