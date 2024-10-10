// import { createStore, applyMiddleware, combineReducers } from "redux";
// import authReducer from "./reducers/authReducer";
// import { thunk } from "redux-thunk";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
