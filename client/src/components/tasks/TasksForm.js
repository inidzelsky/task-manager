import React, { useState, useContext, useEffect } from "react";
import TasksContext from "../../context/tasks/tasksContext";

const TasksForm = () => {
  //Initialising and decomposing tasksContext
  const tasksContext = useContext(TasksContext);
  const { addTask, current, removeCurrent, updateTask } = tasksContext;

  //Creating a state
  const [task, setTask] = useState({
    title: "",
    done: false,
    date: Date.now
  });

  const { title } = task;

  //Using useEffect hook
  useEffect(() => {
    if (current) {
      setTask(current);
    } else {
      setTask({
        title: "",
        done: false,
        date: Date.now
      });
    }
  }, [current]);

  const removeAll = () => removeCurrent();
  const onChange = e => setTask({ ...task, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();

    if (task.title.length === 0) return;

    if (current) {
      updateTask(task);
      removeAll();
    } else {
      addTask(task);
    }

    setTask({
      title: "",
      done: true,
      date: Date.now
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>{current ? "Edit a task" : "Add a task"}</h2>
      <input
        type="text"
        placeholder="Task"
        name="title"
        onChange={onChange}
        value={title}
      />
      <div className="grid-2">
        <input
          type="submit"
          value={current ? "Edit" : "Add"}
          className="btn btn-primary btn-block"
        />
        <input
          type="button"
          value="Clear"
          className="btn btn-light btn-blocks"
          onClick={removeAll}
        />
      </div>
    </form>
  );
};

export default TasksForm;
