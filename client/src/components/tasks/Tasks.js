import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import TasksContext from "../../context/tasks/tasksContext";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import TasksItem from "./TasksItem";
import Spinner from "../layout/Spinner";

const Tasks = () => {
  const tasksContext = useContext(TasksContext);
  const { tasks, getTasks, loading, error } = tasksContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    getTasks();

    if(error)
      setAlert({
        type: "danger",
        msg: error,
        id: uuid.v4()
      });
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {!tasks && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alerts />
          {!tasks.length ? (
            <h3 className="text-primary">Enter your tasks to the left</h3>
          ) : (
            <TransitionGroup>
              {tasks.map(task => (
                <CSSTransition key={task._id} timeout={500} classNames="item">
                  <TasksItem key={task._id} task={task} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Tasks;
