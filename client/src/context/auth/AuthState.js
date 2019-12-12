import React, { useReducer } from "react";
import axios from "axios";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
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
import setAuthToken from "../../utils/setAuthToken";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    error: null,
    isAuth: null,
    loading: true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Log in user
  const loginUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data });
    }
  };

  //Register user
  const registerUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/register", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAILURE, payload: err.response.data });
    }
  };

  //Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      return;
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: LOAD_FAILURE });
    }
  };

  //Logout
  const logout = () => dispatch({ type: LOGOUT });

  //Clear errors
  const clearErrors = (timeout = 5000) => {
    setTimeout(() => dispatch({ type: CLEAR_ERRORS }), timeout);
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        isAuth: state.isAuth,
        loading: state.loading,
        registerUser,
        loginUser,
        clearErrors,
        loadUser,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
