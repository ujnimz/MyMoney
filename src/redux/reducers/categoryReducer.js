import {
  CAT_LOADING,
  CAT_COMPLETED,
  GET_CAT_SUCCESS,
  GET_CAT_FAIL,
  ADD_CAT_SUCCESS,
  ADD_CAT_FAIL,
  UPDATE_CAT_SUCCESS,
  UPDATE_CAT_FAIL,
} from '_redux/actions/types';

const initialState = {
  isLoading: false,
  catData: null,
  isCompleted: false,
};

const categoryReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CAT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CAT_COMPLETED:
      return {
        ...state,
        isCompleted: false,
      };
    case GET_CAT_SUCCESS:
      return {
        ...state,
        catData: payload,
        isLoading: false,
      };
    case GET_CAT_FAIL:
      return {
        ...state,
        catData: null,
        isLoading: false,
      };
    case ADD_CAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCompleted: true,
      };
    case ADD_CAT_FAIL:
      return {
        ...state,
        isLoading: false,
        isCompleted: false,
      };
    case UPDATE_CAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCompleted: true,
      };
    case UPDATE_CAT_FAIL:
      return {
        ...state,
        isLoading: false,
        isCompleted: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
