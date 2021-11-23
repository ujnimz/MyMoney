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
  reauthenticateWithCredential,
  EmailAuthProvider,
  db,
  doc,
  getDoc,
  updateDoc,
  deleteUser,
  Timestamp,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  writeBatch,
} from '_firebase/fbConfig';

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
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    let userData = null;
    if (docSnap.exists()) {
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
    const user = auth.currentUser;
    const docRef = doc(db, 'users', user.uid);
    await updateDoc(docRef, {
      name,
      currency,
      image,
      updatedAt: Timestamp.now(),
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
    const user = auth.currentUser;

    const credentials = await EmailAuthProvider.credential(
      user.email,
      password,
    );
    await reauthenticateWithCredential(user, credentials);

    const batch = writeBatch(db);

    // To Delete all the transactions
    const traRef = collection(db, 'transactions');
    const traQ = query(
      traRef,
      where('uid', '==', user.uid),
      orderBy('date', 'desc'),
    );
    const traQSnapshot = await getDocs(traQ);
    traQSnapshot.forEach(({id}) => {
      const traDocRef = doc(db, 'transactions', id);
      batch.delete(traDocRef);
    });

    // To Delete all the categories
    const catRef = collection(db, 'categories');
    const catQ = query(catRef, where('uid', '==', user.uid));
    const catQSnapshot = await getDocs(catQ);
    catQSnapshot.forEach(({id}) => {
      const catDocRef = doc(db, 'categories', id);
      batch.delete(catDocRef);
    });
    // Delete all the transactions and categories
    await batch.commit();
    // Delete user details document
    await deleteDoc(doc(db, 'users', user.uid));
    // Finally delete the user account
    await deleteUser(user);

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
