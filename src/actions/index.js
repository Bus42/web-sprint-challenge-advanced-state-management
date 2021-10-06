import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333";

export const SMURF_LOADING = "SMURF_LOADING";
export const SMURF_SUCCESS = "SMURF_SUCCESS";
export const SMURF_FAIL = "SMURF_FAIL";
export const ADD_SMURF = "ADD_SMURF";
export const SET_ERROR = "SET_ERROR";

export const fetchSmurfs = () => (dispatch) => {
  dispatch(smurfLoad());
  axios
    .get("/smurfs")
    .then((res) => {
      dispatch(smurfSuccess(res.data));
    })
    .catch(function (error) {
      console.log({error})
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        dispatch(setError(error.response.data));
        dispatch(setError(error.response.status));
        dispatch(setError(error.response.headers));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        dispatch(setError(error.request));
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch(setError("Error", error.message));
      }
      dispatch(setError(error.config));
    });
};

export const setError = (message) => {
  return {
    type: SET_ERROR,
    payload: message,
  };
};

export const addSmurf = (smurf) => {
  return {
    type: ADD_SMURF,
    payload: { ...smurf },
  };
};

export const smurfFail = (error) => {
  return {
    type: SMURF_FAIL,
    payload: error,
    loading: false,
  };
};

export const smurfLoad = () => {
  return { type: SMURF_LOADING };
};

export const smurfSuccess = (smurfs) => {
  return {
    type: SMURF_SUCCESS,
    payload: smurfs,
    loading: false
  };
};

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.
