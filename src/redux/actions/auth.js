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
} from './types';

import {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  db,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from '_firebase/fbConfig';

import {Alert} from 'react-native';

// AUTH LOADING
export const setAuthLoading = () => {
  return {
    type: AUTH_LOADING,
  };
};

// AUTH STATUS
export const authStatus = () => async dispatch => {
  try {
    await onAuthStateChanged(auth, user => {
      if (user) {
        return dispatch({
          type: AUTH_SUCCESS,
          payload: user,
        });
      } else {
        return dispatch({
          type: AUTH_SUCCESS,
          payload: null,
        });
      }
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/user-token-expired':
        Alert.alert('Expired', 'The user session expired. Login again.');
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
    }
    return dispatch({
      type: AUTH_FAIL,
    });
  }
};

// LOGIN
export const loginUser = user => async dispatch => {
  const {email, password} = user;
  if (email === '') return Alert.alert('Invalid!', 'Please add you email.');
  if (password === '') return Alert.alert('Invalid!', 'Please add a password.');
  dispatch(setAuthLoading());
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: userCredential.user,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Invalid', 'Please check your email address again.');
        break;
      case 'auth/wrong-password':
        Alert.alert('Wrong Password', 'Please check your password again.');
        break;
      case 'auth/user-not-found':
        Alert.alert(
          'Not Found',
          'There is no user corresponding to the given email.',
        );
        break;
      case 'auth/user-disabled':
        Alert.alert(
          'Disabled',
          'The user corresponding to the given email has been disabled.',
        );
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
    }
    return dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// REGISTER
export const registerUser = user => async dispatch => {
  const {name, email, password} = user;
  if (name === '') return Alert.alert('Invalid!', 'Please add your name.');
  if (email === '') return Alert.alert('Invalid!', 'Please add you email.');
  if (password === '') return Alert.alert('Invalid!', 'Please add a password.');
  dispatch(setAuthLoading());
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: name,
      theme: 'light',
      currency: 'BHD',
      createdAt: serverTimestamp(),
    });
    return dispatch({
      type: REGISTER_SUCCESS,
      payload: userCredential.user.email,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        Alert.alert('Invalid!', 'The email address is already in use.');
        break;
      case 'auth/invalid-email':
        Alert.alert('Invalid!', 'Please check your email address again.');
        break;
      case 'auth/weak-password':
        Alert.alert('Invalid!', 'The password is not strong enough.');
        break;
      default:
        Alert.alert('Oops!', 'Something went wrong.');
    }
    return dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// LOGOUT
export const logoutUser = () => async dispatch => {
  dispatch(setAuthLoading());
  try {
    await signOut(auth);
    return dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
