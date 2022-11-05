import { createSlice } from "@reduxjs/toolkit";

// The initial state when the application load in first time
const initialState = {
  movies: [],
  detail: null,
  SearchKey: "",
  token: localStorage.getItem("token"),
};

// Define the reducers
const movieSlicer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    _getAllMovie: (state, action) => {
        state.movies = action.payload;
    },
    _getDetailMovie: (state, action) => {
        state.detail = action.payload;
    },
    _getSearchKey: (state, action) => {
        state.SearchKey = action.payload;
    },
  },
});

// Export the reducer function, the functions will be called in actions
export const { _getAllMovie, _getDetailMovie, _getSearchKey } = movieSlicer.actions;

// Export the reducer to combine it with another reducers
export default movieSlicer.reducer;
