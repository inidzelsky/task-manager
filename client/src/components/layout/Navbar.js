//Basic dependencies
import React, { useContext, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuth, user, logout } = authContext;

  const onLogout = () => {
    logout();
  }

  const authList = (
    <Fragment>
      <li>
        Hello, {user && user.name + " "} 
        <Link to="/login" onClick={onLogout}>Logout <i className="fas fa-sign-out-alt"/></Link>
      </li>
    </Fragment>
  )

  const guestList = (
    <Fragment>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
    </Fragment>
  )

  return (
    <div className={isAuth ? "navbar bg-success" : "navbar bg-dark"}>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuth ? authList : guestList}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "TaskManager",
  icon: "fas fa-tasks"
};

export default Navbar;
