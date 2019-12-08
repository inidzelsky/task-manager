import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <TransitionGroup>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <CSSTransition key={alert.id} timeout={500} classNames="item">
            <div
              className={`alert alert-${alert.type}`}
              style={{ margin: "20px" }}
            >
              <i className={alert.icon ? alert.icon : "fas fa-info-circle"} />
              {" "}
              {alert.msg}
            </div>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

export default Alerts;
