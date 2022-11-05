import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./movieReducer";

// We have reducers, it will called in store to create an global state
export default combineReducers({
  movie: movieReducer,
});
