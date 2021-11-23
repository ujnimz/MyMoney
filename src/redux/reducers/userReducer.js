import {
  USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '_redux/actions/types';

const initialState = {
  isLoading: false,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userData: payload,
        isLoading: false,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        userData: null,
        isLoading: false,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
