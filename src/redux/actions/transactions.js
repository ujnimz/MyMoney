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
  GET_CURRENT_TIME,
  GET_NEXT_TIME,
  GET_PREVIOUS_TIME,
} from './types';

import firebase from 'firebase/app';

import {db} from '_firebase/fbConfig';

import {getThisYear, getThisMonthIndex} from '_utils/useDateTime';

import {showMessage} from 'react-native-flash-message';

// TRANSACTIONS LOADING
export const setTransactionLoading = () => {
  return {
    type: TRANSACTION_LOADING,
  };
};

// ROLLBACK COMPLETED
export const rollbackCompleted = () => {
  return {
    type: TRANSACTION_COMPLETED,
  };
};

// GET ALL TRANSACTIONS
export const getTransactions = () => async dispatch => {
  dispatch(setTransactionLoading());
  try {
    let catData = [];
    const user = firebase.auth().currentUser;

    const catRef = db.collection('transactions');

    // Create a query against the collection.
    const q = catRef.where('uid', '==', user.uid).orderBy('date', 'desc');

    const querySnapshot = await q.get();
    querySnapshot.forEach(doc => {
      const data = doc.data();
      data.id = doc.id;
      delete data.uid;
      catData.push(data);
    });
    return dispatch({
      type: GET_TRANSACTIONS_SUCCESS,
      payload: catData,
    });
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
          type: 'warning',
        });
        break;
      default:
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
    }
    return dispatch({
      type: GET_TRANSACTIONS_FAIL,
    });
  }
};

// GET TRANSACTIONS BY MONTH
export const getTransactionsByDate = (month, year) => async dispatch => {
  dispatch(setTransactionLoading());
  try {
    let catData = [];
    const user = firebase.auth().currentUser;

    const catRef = db.collection('transactions');

    // Create a query against the collection.
    const q = catRef
      .where('uid', '==', user.uid)
      .where('month', '==', month)
      .where('year', '==', year)
      .orderBy('date', 'desc');

    const querySnapshot = await q.get();
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data.id = doc.id;
      delete data.uid;
      catData.push(data);
    });
    //console.log(catData);
    return dispatch({
      type: GET_TRANSACTIONS_BYMONTH_SUCCESS,
      payload: catData,
    });
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
          type: 'warning',
        });
        break;
      default:
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
    }
    return dispatch({
      type: GET_TRANSACTIONS_BYMONTH_FAIL,
    });
  }
};

// ADD TRANSACTION
export const addTransaction = newTransaction => async dispatch => {
  const {amount, notes, category, date} = newTransaction;
  if (amount === '')
    return showMessage({
      message: 'Please add amount.',
      type: 'warning',
    });
  if (notes === '')
    return showMessage({
      message: 'Please add a note.',
      type: 'warning',
    });
  if (!category)
    return showMessage({
      message: 'Please choose a category',
      type: 'warning',
    });
  if (!date)
    return showMessage({
      message: 'Please choose a date.',
      type: 'warning',
    });
  dispatch(setTransactionLoading());
  try {
    const user = firebase.auth().currentUser;
    newTransaction.uid = user.uid;
    newTransaction.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    newTransaction.date = firebase.firestore.Timestamp.fromDate(date);

    await db.collection('transactions').add(newTransaction);

    dispatch(getTransactionsByDate(getThisMonthIndex(), getThisYear()));

    showMessage({
      message: 'The transaction has been added successfully.',
      type: 'success',
    });

    return dispatch({
      type: ADD_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
          type: 'warning',
        });
        break;
      default:
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
    }
    return dispatch({
      type: ADD_TRANSACTION_FAIL,
    });
  }
};

// UPDATE TRANSACTION
export const updateTransaction = newTransaction => async dispatch => {
  const {id, title, icon, type} = newTransaction;
  if (title === '')
    return showMessage({
      message: 'Please add category name.',
      type: 'warning',
    });
  if (icon === '')
    return showMessage({
      message: 'Please choose an icon.',
      type: 'warning',
    });
  dispatch(setTransactionLoading());
  try {
    const user = firebase.auth().currentUser;
    await db.collection('transactions').doc(id).update({
      uid: user.uid,
      title,
      icon,
      type,
    });
    dispatch(getTransactions());

    showMessage({
      message: 'The transaction has been updated successfully.',
      type: 'success',
    });

    return dispatch({
      type: UPDATE_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
          type: 'warning',
        });
        break;
      default:
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
    }
    return dispatch({
      type: UPDATE_TRANSACTION_FAIL,
    });
  }
};

// DELETE TRANSACTION
export const deleteTransaction = catId => async dispatch => {
  dispatch(setTransactionLoading());
  try {
    await db.collection('transactions').doc(catId).delete();
    dispatch(getTransactions());

    showMessage({
      message: 'The transaction has been deleted successfully.',
      type: 'success',
    });

    return dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
          type: 'warning',
        });
        break;
      default:
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
    }
    return dispatch({
      type: DELETE_TRANSACTION_FAIL,
    });
  }
};
