import React, { useReducer } from 'react'
import uuid from "uuid";

import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
    const initialState = [];
    const [ state, dispatch ] = useReducer(alertReducer, initialState);

    //SET AND REMOVE ALERT
    const setAlert = (alert, timeout = 5000) => {
        alert.id = uuid.v4();
        dispatch({type: SET_ALERT, payload: alert});

        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: alert.id}), timeout);
    }

    return (
        <AlertContext.Provider value={{alerts: state, setAlert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;
