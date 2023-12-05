// store/index.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Middleware for handling asynchronous actions
import rootReducer from "./reducers"; // Import your root reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
