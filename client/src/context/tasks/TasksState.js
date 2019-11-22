//Basic imports
import React, { useReducer } from "react";
import uuid from "uuid";

//Secondary imports
import TasksContext from "./tasksContext";
import taskReducer from "./tasksReducer";
import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  SET_CURRENT,
  REMOVE_CURRENT
} from "../types";

const TasksState = props => {
  const initialState = {
    tasks: [
      {
        id: 1,
        title: "Finish my WEB project",
        done: false,
        date: Date.now
      },
      {
        id: 2,
        title: 'Read the book "Don Quixote.Part 2"',
        done: false,
        date: Date.now
      },
      {
        id: 3,
        title: "Accompish the C++ course",
        done: true,
        date: Date.now
      }
    ],

    current: null
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);
  //ADD_TASK
  const addTask = task => {
    task.id = uuid.v4();
    dispatch({ type: ADD_TASK, payload: task });
  };

  //REMOVE_TASK
  const removeTask = id => {
    dispatch({ type: REMOVE_TASK, payload: id });
  };

  //SET_CURRENT
  const setCurrent = task => {
    dispatch({ type: SET_CURRENT, payload: task });
  };

  //REMOVE_CURRENT
  const removeCurrent = () => {
    dispatch({ type: REMOVE_CURRENT });
  };

  //UPDATE_TASK
  const updateTask = task => {
    dispatch({ type: UPDATE_TASK, payload: task });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        addTask,
        removeTask,
        setCurrent,
        removeCurrent,
        updateTask
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
