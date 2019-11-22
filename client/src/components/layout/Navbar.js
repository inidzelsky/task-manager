//Basic dependencies
import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuth } = authContext;

  return (
    <div className={isAuth ? "navbar bg-success" : "navbar bg-dark"}>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
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
