//Basic dependencies
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import PrivateRoute from "./components/routing/PrivateRoute";

//Context
import TasksState from "./context/tasks/TasksState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  return (
    <AuthState>
      <TasksState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </TasksState>
    </AuthState>
  );
};

export default App;
