import React, { useContext, useState } from "react";
import TasksContext from "../../context/tasks/tasksContext";

const TasksItem = ({ task }) => {
  const tasksContext = useContext(TasksContext);
  const {
    updateTask,
    removeTask,
    setCurrent,
    removeCurrent,
    current
  } = tasksContext;
  const { _id, title, done } = task;

  const [completed, setCompleted] = useState(done);

  const onRemove = () => {
    if (current && task._id === current._id) removeCurrent();

    removeTask(_id);
  };

  const onSet = () => {
    setCurrent(task);
  };

  const onCompleted = () => {
    updateTask({ _id, title, done: !completed });
    setCompleted(!completed);
  };

  return (
    <div className="card bg-light">
      {completed ? (
        <h3 className="text-primary text-left">
          <i className="far fa-check-circle" />
          <strike>{" " + title}</strike>
        </h3>
      ) : (
        <h3 className="text-primary text-left">
          <i className="far fa-times-circle" />
          {" " + title}
        </h3>
      )}
      <p>
        <button className="btn btn-success btn-sml" onClick={onCompleted}>
          {/* Change the font color when uncompleted */}
          {completed ? "Uncompleted" : "Completed"}
        </button>
        <button className="btn btn-primary btn-sml" onClick={onSet}>
          Edit
        </button>
        <button className="btn btn-danger btn-sml" onClick={onRemove}>
          Remove
        </button>
      </p>
    </div>
  );
};

export default TasksItem;
