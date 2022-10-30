import {
  USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from './types';

import firebase from 'firebase/app';

import {EmailAuthProvider, db} from '_firebase/fbConfig';

import {showMessage} from 'react-native-flash-message';

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
    const user = firebase.auth().currentUser;
    const docRef = db.collection('users').doc(user.uid);
    const docSnap = await docRef.get();
    let userData = null;
    if (docSnap.exists) {
      //console.log('Document data:', docSnap.data());
      userData = docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      showMessage({
        message: 'Something went wrong. No user account.',
        type: 'danger',
      });
    }

    return dispatch({
      type: GET_USER_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
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
      type: GET_USER_FAIL,
    });
  }
};

// UPDATE_USER
export const updateUser = userData => async dispatch => {
  const {name, currency, image} = userData;
  if (name === '')
    return showMessage({
      message: 'Please enter your name.',
      type: 'warning',
    });
  if (currency === '')
    return showMessage({
      message: 'Please add the currency.',
      type: 'warning',
    });
  dispatch(setUserLoading());
  try {
    const user = firebase.auth().currentUser;
    const docRef = db.collection('users').doc(user.uid);
    await docRef.update({
      name,
      currency,
      image,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(getUser());

    showMessage({
      message: 'Profile updated successfully.',
      type: 'success',
    });
    return dispatch({
      type: UPDATE_USER_SUCCESS,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        showMessage({
          message: 'Please check your email address again.',
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
      type: UPDATE_USER_FAIL,
    });
  }
};

// DELETE_USER
export const removeUser = password => async dispatch => {
  dispatch(setUserLoading());
  try {
    const user = firebase.auth().currentUser;

    const credentials = await EmailAuthProvider.credential(
      user.email,
      password,
    );
    await user.reauthenticateWithCredential(credentials);

    const batch = db.batch();

    // To Delete all the transactions
    const traRef = db.collection('transactions');
    const traQ = traRef.where('uid', '==', user.uid).orderBy('date', 'desc');
    const traQSnapshot = await traQ.get();
    traQSnapshot.forEach(({id}) => {
      const traDocRef = db.collection('transactions').doc(id);
      batch.delete(traDocRef);
    });

    // To Delete all the categories
    const catRef = db.collection('categories');
    const catQ = catRef.where('uid', '==', user.uid);
    const catQSnapshot = await catQ.get();
    catQSnapshot.forEach(({id}) => {
      const catDocRef = db.collection('categories').doc(id);
      batch.delete(catDocRef);
    });
    // Delete all the transactions and categories
    await batch.commit();
    // Delete user details document
    await db.collection('users').doc(user.uid).delete();
    // Finally delete the user account
    await user.delete();

    showMessage({
      message: 'Profile deleted successfully.',
      type: 'success',
    });
    return dispatch({
      type: DELETE_USER_SUCCESS,
    });
  } catch (error) {
    switch (error.code) {
      case 'auth/wrong-password':
        showMessage({
          message: 'The password you entered is invalid.',
          type: 'danger',
        });
        break;
      case 'auth/too-many-requests':
        showMessage({
          message: 'Account temporary disabled. Try again later.',
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
      type: DELETE_USER_FAIL,
    });
  }
};
