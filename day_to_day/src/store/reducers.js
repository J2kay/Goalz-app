// store/reducers.js
import { combineReducers } from "redux";

const initialState = {
  user: null,
  error: null,
};

// Example reducer
const authReducer = (
  state = { isAuthenticated: false, user: null },
  action
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

// Combine reducers if you have more than one
const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers as needed
});

export default rootReducer;
