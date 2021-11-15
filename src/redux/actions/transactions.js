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
} from './types';

import {
  auth,
  db,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  Timestamp,
  orderBy,
} from '_firebase/fbConfig';

import {Alert} from 'react-native';

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
    const user = auth.currentUser;

    const catRef = collection(db, 'transactions');

    // Create a query against the collection.
    const q = query(
      catRef,
      where('uid', '==', user.uid),
      orderBy('date', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
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
        Alert.alert('Invalid', 'Please check your email address again.');
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
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
    const user = auth.currentUser;

    const catRef = collection(db, 'transactions');

    // Create a query against the collection.
    const q = query(
      catRef,
      where('uid', '==', user.uid),
      where('month', '==', month),
      where('year', '==', year),
      orderBy('date', 'desc'),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data.id = doc.id;
      delete data.uid;
      catData.push(data);
    });
    console.log(catData);
    return dispatch({
      type: GET_TRANSACTIONS_BYMONTH_SUCCESS,
      payload: catData,
    });
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Invalid', 'Please check your email address again.');
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
    }
    return dispatch({
      type: GET_TRANSACTIONS_BYMONTH_FAIL,
    });
  }
};

// ADD TRANSACTION
export const addTransaction = newTransaction => async dispatch => {
  const {amount, notes, category, date} = newTransaction;
  if (amount === '') return Alert.alert('Invalid!', 'Please add the amount.');
  if (notes === '') return Alert.alert('Invalid!', 'Please add a note.');
  if (!category) return Alert.alert('Invalid!', 'Please choose a category');
  if (!date) return Alert.alert('Invalid!', 'Please choose a date.');
  dispatch(setTransactionLoading());
  try {
    const user = auth.currentUser;
    newTransaction.uid = user.uid;
    newTransaction.createdAt = Timestamp.now();
    newTransaction.date = Timestamp.fromDate(date);

    await addDoc(collection(db, 'transactions'), newTransaction);

    dispatch(getTransactions());
    return dispatch({
      type: ADD_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Invalid', 'Please check your email address again.');
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
    }
    return dispatch({
      type: ADD_TRANSACTION_FAIL,
    });
  }
};

// UPDATE TRANSACTION
export const updateTransaction = newTransaction => async dispatch => {
  const {id, title, icon, type} = newTransaction;
  if (title === '') return Alert.alert('Invalid!', 'Please add category name.');
  if (icon === '') return Alert.alert('Invalid!', 'Please choose an icon.');
  dispatch(setTransactionLoading());
  try {
    const user = auth.currentUser;

    await setDoc(doc(db, 'transactions', id), {
      uid: user.uid,
      title,
      icon,
      type,
    });
    dispatch(getTransactions());
    return dispatch({
      type: UPDATE_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Invalid', 'Please check your email address again.');
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
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
    await deleteDoc(doc(db, 'transactions', catId));
    dispatch(getTransactions());
    return dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Invalid', 'Please check your email address again.');
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
    }
    return dispatch({
      type: DELETE_TRANSACTION_FAIL,
    });
  }
};
