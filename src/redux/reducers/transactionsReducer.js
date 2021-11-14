import {
  TRANSACTION_LOADING,
  TRANSACTION_COMPLETED,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_BYMONTH_SUCCESS,
  GET_TRANSACTIONS_BYMONTH_FAIL,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
} from '_redux/actions/types';

const initialState = {
  isLoading: false,
  transactionData: null,
  isCompleted: false,
};

const transactionsReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TRANSACTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case TRANSACTION_COMPLETED:
      return {
        ...state,
        isCompleted: false,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactionData: payload,
        isLoading: false,
      };
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        transactionData: null,
        isLoading: false,
      };
    case GET_TRANSACTIONS_BYMONTH_SUCCESS:
      return {
        ...state,
        transactionData: payload,
        isLoading: false,
      };
    case GET_TRANSACTIONS_BYMONTH_FAIL:
      return {
        ...state,
        transactionData: null,
        isLoading: false,
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCompleted: true,
      };
    case ADD_TRANSACTION_FAIL:
      return {
        ...state,
        isLoading: false,
        isCompleted: false,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCompleted: true,
      };
    case UPDATE_TRANSACTION_FAIL:
      return {
        ...state,
        isLoading: false,
        isCompleted: false,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCompleted: true,
      };
    case DELETE_TRANSACTION_FAIL:
      return {
        ...state,
        isLoading: false,
        isCompleted: false,
      };
    default:
      return state;
  }
};

export default transactionsReducer;
