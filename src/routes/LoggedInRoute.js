import React, { useReducer, useEffect } from 'react'
import { checkUserLoginFromToken } from '../services/AuthService'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setLogin, logout } from '../redux/actions/authentication/authentication'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import PropTypes from 'prop-types'
import {
    AUTH_LOGIN,
    AUTH_GOOGLE,
    AUTH_FACEBOOK,
} from '../constants/LoginConstants'

// TODO: refactor
/**
 * Basic input component
 * @param {object} props
 * @param {any} props.component             The component to render
 * @param {string} props.redirectPath       Where the user will be redirected to when they haven't log in yet. Default is '/'
 * @param {string} props.authType           Specifies what auth type is accepted for this route. Value between 'login', 'google' or 'facebook'. Default is null (all types accepted)
 * @example 
 * <LoggedInRoute path='/admin' redirectPath='/login' exact component={Admin}/>
 */
function LoggedInRoute({ component: Component, setLogin, logout, redirectPath = '', authType = null, ...rest }) {
    const loadingSpinner = (
        <LoadingSpinner 
            className="py-7"    
        />
    )

    const reducer = (_, action) => {
        switch (action.type) {
            case 'reset':
                    return loadingSpinner
            case 'logged_in':
                return <Route {...rest} render={
                    props => <Component {...rest} {...props} />
                }/>
            case 'unauthorized':
                return <Route {...rest} render={
                    props => <Redirect to={
                        {
                            pathname: redirectPath,
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }/>
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(
        reducer, 
        loadingSpinner
    )

    useEffect(() => {
        dispatch({type: 'reset'})

        let auth
        if (authType === 'login') {
            auth = AUTH_LOGIN
        } else if (authType === 'google') {
            auth = AUTH_GOOGLE
        } else if (authType === 'facebook') {
            auth = AUTH_FACEBOOK
        }

        checkUserLoginFromToken(
            () => dispatch({type: 'logged_in'}),
            () => dispatch({type: 'unauthorized'}),
            auth
        )
    }, [setLogin, logout, Component, authType])

    return (
        <div>
            {state}
        </div>
    )
}

LoggedInRoute.propTypes = {
    component: PropTypes.any.isRequired,
    redirectPath: PropTypes.string,
    authType: PropTypes.string,
}

export default connect(null, {setLogin, logout})(LoggedInRoute)
