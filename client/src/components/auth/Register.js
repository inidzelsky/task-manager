import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Register = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    passwordc: ""
  });

  const { email, name, password, passwordc } = user;

  const checker = () => {
    const alerts = [];

    if (email === "" || name === "" || password === "") {
      alerts.push({ type: "danger", msg: "Some fields are empty" });
    }

    if (password.length < 6) {
      alerts.push({
        type: "danger",
        msg: "Password is 6 symbols min"
      });
    }

    if (password !== passwordc) {
      alerts.push({ type: "danger", msg: "Passwords are not equal" });
    }

    return alerts;
  };

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();

    const alerts = checker();
    if (alerts.length > 0) {
      alerts.forEach(alert => setAlert(alert));
      return;
    }

    alert("Account registered!");
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
