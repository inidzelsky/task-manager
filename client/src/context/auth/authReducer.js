import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOAD_USER,
    LOAD_FAILURE,
    LOGOUT,
    CLEAR_ERRORS
  } from "../types";

export default (state, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
                loading: false
            }

        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false
            }

        case LOGOUT:
        case LOAD_FAILURE:
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}