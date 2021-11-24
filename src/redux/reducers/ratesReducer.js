import {
  GET_RATES_FAIL,
  GET_RATES_SUCCESS,
  GET_RATES_LOADING,
} from '_redux/actions/types';

const initialState = {
  isLoading: false,
  rates: null,
};

const ratesReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_RATES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rates: payload,
      };
    case GET_RATES_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default ratesReducer;
