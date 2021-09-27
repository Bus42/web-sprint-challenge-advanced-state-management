import axios from "axios";
axios.defaults.baseURL = "http://localhost:3333";

export const SMURF_LOADING = "SMURF_LOADING";
export const SMURF_SUCCESS = "SMURF_SUCCESS";
export const SMURF_FAIL = "SMURF_FAIL";
export const ADD_SMURF = "ADD_SMURF";
export const SET_ERROR = "SET_ERROR";

export const fetchSmurfs = () => (dispatch) => {
  console.log('fetchSmurfs called')
  dispatch(smurfLoad());
  axios
    .get("/posts")
    .then((res) => {
      dispatch(smurfSuccess(res.data));
    })
    .catch((err) => {
      dispatch(smurfFail(err));
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
  };
};

export const smurfLoad = () => {
  return { type: SMURF_LOADING };
};

export const smurfSuccess = (smurfs) => {
  return {
    type: SMURF_SUCCESS,
    payload: smurfs,
  };
};

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.
