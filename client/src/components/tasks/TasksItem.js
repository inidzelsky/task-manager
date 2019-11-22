import React, { useContext } from "react";
import TasksContext from "../../context/tasks/tasksContext";

const TasksItem = ({ task }) => {
  const tasksContext = useContext(TasksContext);

  const { updateTask, removeTask, setCurrent, removeCurrent, current } = tasksContext;
  const { id, title, done } = task;

  const onRemove = () => {
    if (current && task.id === current.id) 
      removeCurrent();
    removeTask(id);
  }

  const onSet = () => {
    setCurrent(task);
  }

  const onCompleted = () => {
    task.done = !done;
    updateTask(task);
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        <i className={done ? "far fa-check-circle" : "far fa-times-circle"} />
        {" " + title}
      </h3>
      <p>
        <button className="btn btn-success btn-sml" onClick={onCompleted}>
          {/* Change the font color when uncompleted */}
          {done ? "Uncompleted" : "Completed"}
        </button>
        <button className="btn btn-dark btn-sml" onClick={onSet}>Edit</button>
        <button className="btn btn-danger btn-sml" onClick={onRemove}>Remove</button>
      </p>
    </div>
  );
};

export default TasksItem;
