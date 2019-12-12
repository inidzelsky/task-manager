import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  //Contexts init and decomposing
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { registerUser, error, clearErrors, isAuth } = authContext;

  //Backend error checking
  useEffect(() => {
    if (isAuth) {
      props.history.push("/");
    }

    if (error) {
      if (error.type === "Exist") {
        setAlert({msg: error.msg, type: "danger", icon: "fas fa-user-times"});
      } else {
        setAlert({msg: error.msg, type: "danger"});
      }

      clearErrors();
    } 
    //eslint-disable-next-line
  }, [error, isAuth, props.history]);

  //Frontend error checking
  const checker = () => {
    const alerts = [];

    if (email === "" || name === "" || password === "") {
      alerts.push({
        type: "danger",
        msg: "Some fields are empty",
        icon: "fab fa-creative-commons-zero"
      });
    }

    if (password.length < 6) {
      alerts.push({
        type: "danger",
        msg: "Password is 6 symbols min",
        icon: "fas fa-less-than"
      });
    }

    if (password !== passwordc) {
      alerts.push({
        type: "danger",
        msg: "Passwords are not equal",
        icon: "fas fa-key"
      });
    }

    return alerts;
  };

  //User state init
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    passwordc: ""
  });

  const { email, name, password, passwordc } = user;

  //Form handlers
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();

    const alerts = checker();
    if (alerts.length > 0) {
      alerts.forEach(alert => setAlert(alert));
      return;
    }

    registerUser({email, name, password});
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordc">Confirm Password</label>
          <input
            type="password"
            name="passwordc"
            value={passwordc}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Register;
