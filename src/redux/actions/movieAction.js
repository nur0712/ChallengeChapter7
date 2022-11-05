import axios from "axios";

import {
  _getAllMovie,
  _getDetailMovie,
  _getSearchKey,
} from "../reducers/movieReducer";

// This function will be called in component and it will triggered the reducers
export const getAllMovie = () => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=05f6cab85bf9d4f4c5d9018a962d5f29"
    );

    // Dispatch to reducers
    dispatch(_getAllMovie(data));
  } catch (error) {
    throw error;
  }
};

export const getDetailMovie = (id) => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=05f6cab85bf9d4f4c5d9018a962d5f29`
    );

    // Dispatch to reducers
    dispatch(_getDetailMovie(data));
  } catch (error) {
    throw error;
  }
};

export const getSearchKey = (query) => async (dispatch) => {
  try {
    // Imagize we get data from API (the variable is users)
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=05f6cab85bf9d4f4c5d9018a962d5f29&query=${query}`
    );

    // Dispatch to reducers
    dispatch(_getSearchKey(data));
  } catch (error) {
    throw error;
  }
};
