import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    //LOAD_USER
    const loadUser = async () => {
        setAuthToken(localStorage.token)
        try {
            const res = await axios.get('/api/auth/')
            dispatch({type: USER_LOADED, payload: res.data})
        } catch (error) {
            dispatch({type: AUTH_ERROR})
        }
    }

    //REGISTER_USER
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users',formData, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    //LOGIN_USER
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth',formData, config)

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }

    }

    //LOGOUT
    const logout = () => dispatch({type: LOGOUT})

    //CLEAR_ERRORS
    const clearErrors = () => dispatch({type: CLEAR_ERRORS})


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState