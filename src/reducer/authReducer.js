import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
} from "../actions/constants";

const initialState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  authError: null,
  loading: false,
  message: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
      };

      break;
    case LOGIN_ERROR:
      state = {
        ...state,
        authenticate: false,
        authError: action.payload.error,
      };

      break;
    case LOGIN_FAILURE:
      state = {
        ...state,
        authenticate: false,
        authError: action.payload.error,
      };

      break;
    case LOGOUT_SUCCESS:
      state = {
        ...initialState,
      };

      break;
    case LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };

      break;
    case LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };

      break;
  }

  return state;
};
export default authReducer;
