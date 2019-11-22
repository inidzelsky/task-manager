import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Login = () => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const checker = () => {
    const alerts = [];

    if (email === "" || password === "") {
        alerts.push({type: "danger", msg: "Some fields are empty"});
    }

    if (password.length < 6) {
        alerts.push({type: "danger", msg: "Password is 6 symbols min"});
    }

    return alerts;
}

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();

    const alerts = checker();
    if (alerts.length > 0) {
        alerts.forEach(alert => setAlert(alert));
        return;
    }

    alert("Login success");
  }

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
