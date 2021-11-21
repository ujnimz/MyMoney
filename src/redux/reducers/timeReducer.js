import {
  GET_CURRENT_TIME,
  GET_NEXT_TIME,
  GET_PREVIOUS_TIME,
} from '_redux/actions/types';

const initialState = {
  isReady: false,
  time: null,
  count: null,
};

const monthReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_CURRENT_TIME:
      return {
        ...state,
        isReady: true,
        time: payload,
        count: 0,
      };
    case GET_NEXT_TIME:
      return {
        ...state,
        isReady: true,
        time: payload,
        count: state.count + 1,
      };
    case GET_PREVIOUS_TIME:
      return {
        ...state,
        isReady: true,
        time: payload,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default monthReducer;
