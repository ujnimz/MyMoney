import {
  USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from './types';

import {
  auth,
  db,
  doc,
  getDoc,
  updateDoc,
  deleteUser,
  Timestamp,
} from '_firebase/fbConfig';

import {Alert} from 'react-native';

// USER LOADING
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// GET_USER
export const getUser = () => async dispatch => {
  dispatch(setUserLoading());
  try {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    let userData = null;
    if (docSnap.exists()) {
      //console.log('Document data:', docSnap.data());
      userData = docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }

    return dispatch({
      type: GET_USER_SUCCESS,
      payload: userData,
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
      type: GET_USER_FAIL,
    });
  }
};

// UPDATE_USER
export const updateUser = userData => async dispatch => {
  const {name, currency, image} = userData;
  if (name === '') return Alert.alert('Invalid!', 'Please add your full name.');
  if (currency === '')
    return Alert.alert('Invalid!', 'Please add the currency.');
  dispatch(setUserLoading());
  try {
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await updateDoc(docRef, {
      name,
      currency,
      image,
      updatedAt: Timestamp.now(),
    });
    dispatch(getUser());
    Alert.alert('Success', 'Profile updated successfully.');
    return dispatch({
      type: UPDATE_USER_SUCCESS,
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
      type: UPDATE_USER_FAIL,
    });
  }
};

// DELETE_USER
export const removeUser = () => async dispatch => {
  dispatch(setUserLoading());
  try {
    const user = auth.currentUser;
    await deleteDoc(doc(db, 'users', user.uid));
    // Here Add delete all the transactions
    await deleteUser(user);

    Alert.alert('Success', 'Profile deleted successfully.');
    return dispatch({
      type: DELETE_USER_SUCCESS,
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
      type: DELETE_USER_FAIL,
    });
  }
};
