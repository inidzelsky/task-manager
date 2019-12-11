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

export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
        loading: false
      };

    case ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        )
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case REMOVE_CURRENT:
      return { ...state, current: null };

    case CLEAR_STATE:
      return {
        ...state,
        tasks: null,
        current: null,
        erros: null,
        loading: true
      };

    case TASK_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
