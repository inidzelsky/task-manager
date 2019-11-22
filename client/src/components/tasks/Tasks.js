import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TasksContext from "../../context/tasks/tasksContext";
import TasksItem from "./TasksItem";

const Tasks = () => {
  const tasksContext = useContext(TasksContext);
  const { tasks } = tasksContext;

  return (
    <Fragment>
      <TransitionGroup>
      {tasks.map(task => (
        <CSSTransition key={task.id} timeout={500} classNames="item">
          <TasksItem key={task.id} task={task} />
        </CSSTransition>
      ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Tasks;
