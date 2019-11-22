import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  SET_CURRENT,
  REMOVE_CURRENT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };

    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case REMOVE_CURRENT:
      return { ...state, current: null };

    default:
      return state;
  }
};
