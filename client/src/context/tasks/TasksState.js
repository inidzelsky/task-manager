//Basic imports
import React, { useReducer, useContext } from "react";
import axios from "axios";

//Secondary imports
import AuthContext from "../auth/authContext";
import TasksContext from "./tasksContext";
import taskReducer from "./tasksReducer";
import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  SET_CURRENT,
  REMOVE_CURRENT,
  GET_TASKS,
  CLEAR_STATE,
  TASK_ERROR
} from "../types";

const TasksState = props => {
  const authContext = useContext(AuthContext);
  const { id } = authContext;

  const initialState = {
    tasks: null,
    current: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //GET_TASKS
  const getTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", id);
      dispatch({type: GET_TASKS, payload: res.data.tasks});
    } catch (e) {
      
    }
  }

  //ADD_TASK
  const addTask = async (task) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/tasks", task, config);
      dispatch({ type: ADD_TASK, payload: res.data });
    } catch (e) {
      dispatch({ type: TASK_ERROR, payload: e.response.data });
    }
  };

  //REMOVE_TASK
  const removeTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      dispatch({ type: REMOVE_TASK, payload: id });
    } catch(e) {
      dispatch({ type: TASK_ERROR, payload: e.response.data });
    }
  };

  //UPDATE_TASK
  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task._id}`, task);
      dispatch({ type: UPDATE_TASK, payload: res.data });
    } catch (e) {
      dispatch({ type: TASK_ERROR, payload: e.response.data });
    }
  };

  //SET_CURRENT
  const setCurrent = task => {
    dispatch({ type: SET_CURRENT, payload: task });
  };

  //REMOVE_CURRENT
  const removeCurrent = () => {
    dispatch({ type: REMOVE_CURRENT });
  };

  //CLEAR_STATE
  const clearState = () => {
    dispatch({ type: CLEAR_STATE });
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        loading: state.loading,
        error: state.error,
        addTask,
        removeTask,
        setCurrent,
        removeCurrent,
        updateTask,
        getTasks,
        clearState
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
