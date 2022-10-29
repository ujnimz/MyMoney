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

import {db} from '_firebase/fbConfig';

import firebase from 'firebase/app';

import {showMessage} from 'react-native-flash-message';

// AUTH LOADING
export const setAuthLoading = () => {
  return {
    type: AUTH_LOADING,
  };
};

// AUTH STATUS
export const authStatus = () => async dispatch => {
  try {
    await firebase.auth().onAuthStateChanged(user => {
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
        showMessage({
          message: 'The user session expired. Login again.',
          type: 'danger',
        });
        break;
      default:
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
    }
    return dispatch({
      type: AUTH_FAIL,
    });
  }
};

// LOGIN
export const loginUser = user => async dispatch => {
  const {email, password} = user;
  if (email === '')
    return showMessage({
      message: 'Please add your email.',
      type: 'warning',
    });
  if (password === '')
    return showMessage({
      message: 'Please add your password.',
      type: 'warning',
    });
  dispatch(setAuthLoading());
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: userCredential.user,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
          type: 'warning',
        });
        break;
      case 'auth/wrong-password':
        showMessage({
          message: 'Please check your password again.',
          type: 'warning',
        });
        break;
      case 'auth/user-not-found':
        showMessage({
          message: 'There is no user corresponding to the given email.',
          type: 'warning',
        });
        break;
      case 'auth/user-disabled':
        showMessage({
          message:
            'The user corresponding to the given email has been disabled.',
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
      type: LOGIN_FAIL,
    });
  }
};

// REGISTER
export const registerUser = user => async dispatch => {
  const {name, email, password} = user;
  if (name === '')
    return showMessage({
      message: 'Please add your name.',
      type: 'warning',
    });
  if (email === '')
    return showMessage({
      message: 'Please add a valid email.',
      type: 'warning',
    });
  if (password === '')
    return showMessage({
      message: 'Please add a password.',
      type: 'warning',
    });
  dispatch(setAuthLoading());
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(userCredential.user.uid).set({
      name: name,
      currency: 'BHD',
      image: '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    showMessage({
      message: 'Hi, Welcome!. Your account has been created successfully.',
      type: 'success',
    });

    return dispatch({
      type: REGISTER_SUCCESS,
      payload: userCredential.user.email,
    });
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        showMessage({
          message: 'The email address is already in use.',
          type: 'warning',
        });
        break;
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
          type: 'warning',
        });
        break;
      case 'auth/weak-password':
        showMessage({
          message: 'The password is not strong enough.',
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
      type: REGISTER_FAIL,
    });
  }
};

// LOGOUT
export const logoutUser = () => async dispatch => {
  dispatch(setAuthLoading());
  try {
    await firebase.auth().signOut();

    showMessage({
      message: 'You are signed out successfully.',
      type: 'success',
    });

    return dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    showMessage({
      message: 'There was an error.',
      type: 'danger',
    });
    return dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
