import {
  AUTH_LOADING,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '_redux/actions/types';

const initialState = {
  isLoading: false,
  isInitializing: true,
  userEmail: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isInitializing: false,
        user: payload,
      };
    case AUTH_FAIL:
      return {
        ...state,
        isInitializing: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userEmail: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userEmail: null,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
