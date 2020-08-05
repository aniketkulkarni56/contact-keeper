import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CURRENT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts : [
            {
                type: "personal",
                id: 1,
                name: "john",
                phone: "12323232",
                email: "john@lesnar.com"
            },
            {
                type: "personal",
                id: 2,
                name: "brock",
                phone: "12323232",
                email: "brock@lesnar.com"
            },
            {
                type: "professional",
                id: 3,
                name: "anny",
                phone: "12323232",
                email: "anny@lesnar.com"
            }
        ],
        current : null,
        filtered: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    //ADD_CONTACT
    const addContact = contact => {
        contact.id = uuidv4()
        dispatch({type: ADD_CONTACT, payload: contact})
    }

    //DELETE_CONTACT
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id})
    }

    //SET_CURRENT_CONTACT
    const setCurrent = contact => { 
        dispatch({type: SET_CURRENT, payload: contact})
    }

    //CLEAR_CURRENT_CONTACT
    const clearCurrent = () => { 
        dispatch({type: CLEAR_CURRENT})
    }

    //UPDATE_CONTACT
    const updateContact = contact => { 
        dispatch({type: UPDATE_CONTACT, payload: contact})
    }

    //FILTER_CONTACTS
    const filterContacts = text => { 
        dispatch({type: FILTER_CONTACTS, payload: text})
    }

    //CLEAR_FILTER
    const clearFilter = () => { 
        dispatch({type: CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
            value={{ 
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact, 
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter }}> 
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState