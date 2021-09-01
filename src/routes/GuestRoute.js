import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import { logout, setLogin } from '../redux/actions/authentication/authentication'
import { checkUserLoginFromToken } from '../services/AuthService'

// TODO: refactor
/**
 * Basic input component
 * @param {object} props
 * @param {any} props.component             The component to render
 * @param {string} props.redirectPath       Where the user will be redirected to when they haven't log in yet. Default is '/'
 * @example 
 * <GuestRoute path='/login' redirectPath='/homepage' component={Login}/>
 */
function GuestRoute({ component: Component, setLogin, logout, redirectPath='/', ...rest }) {
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
                    props => <Redirect to={
                        {
                            pathname: redirectPath,
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }/>
            case 'unauthorized':
                return <Route {...rest} render={
                    props => <Component {...rest} {...props} />
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
        checkUserLoginFromToken(
            () => dispatch({type: 'logged_in'}),
            () => dispatch({type: 'unauthorized'}),
        )
    }, [setLogin, logout, Component])

    return (
        <div>
            {state}
        </div>
    )
}

GuestRoute.propTypes = {
    component: PropTypes.any.isRequired,
    redirectPath: PropTypes.string,
}

export default connect(null, {setLogin, logout})(GuestRoute)
