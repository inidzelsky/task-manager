import React, { useReducer } from "react";

import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    errors: null,
    isAuth: null,
    loading: true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Log in user
  //Register user
  //Load user
  //Logout
  //Clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        errors: state.errors,
        isAuth: state.isAuth,
        loading: state.loading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
