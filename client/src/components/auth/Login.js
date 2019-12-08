import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
  //Context init
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { error, clearErrors, loginUser, isAuth } = authContext;

  //Home page redirection and backend errors checking
  useEffect(() => {
    if (isAuth) {
      props.history.push("/");
    }

    if (error) {
      setAlert({type: "danger", msg: error.msg});
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuth, props.history]);

  //Frontend errors checking
  const checker = () => {
    const alerts = [];

    if (email === "" || password === "") {
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

    return alerts;
  };

  //User state init
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  //Form handlers
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();

    const alerts = checker();
    if (alerts.length > 0) {
      alerts.forEach(alert => setAlert(alert));
      return;
    }

    loginUser({email, password});
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
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
        <input
          type="submit"
          value="Login"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Login;
