const redux = require("redux");
const reduxThunk = require("redux-thunk").default;
const axios = require("axios");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  loading: false,
  user: [],
  message: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}
function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
}
function fetchUsersFailure(message) {
  return {
    type: FETCH_USERS_FAILED,
    payload: message,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        user: action.payload,
        message: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        user: [],
        message: "",
      };
    default:
      return state;
  }
};

const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        // error Message
        dispatch(fetchUsersFailure(err.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

console.log("InitialSate ", store.getState());
store.subscribe(() => {});

store.dispatch(fetchUser());
