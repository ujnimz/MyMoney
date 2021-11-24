import {GET_RATES_FAIL, GET_RATES_SUCCESS, GET_RATES_LOADING} from './types';
import axios from 'axios';

// AUTH LOADING
export const setRatesLoading = () => {
  return {
    type: GET_RATES_LOADING,
  };
};

// GET_CURRENT_TIME
export const getLatestRates = () => async dispatch => {
  dispatch(setRatesLoading());
  const baseCur = 'BHD';

  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_RATES_ACCESS_KEY}&symbols=USD,BHD`,
    );
    //console.log(response.data);
    return dispatch({
      type: GET_RATES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    return dispatch({
      type: GET_RATES_FAIL,
    });
  }
};
