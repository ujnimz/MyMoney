import {
  CAT_LOADING,
  CAT_COMPLETED,
  GET_CAT_SUCCESS,
  GET_CAT_FAIL,
  ADD_CAT_SUCCESS,
  ADD_CAT_FAIL,
  UPDATE_CAT_SUCCESS,
  UPDATE_CAT_FAIL,
  DELETE_CAT_SUCCESS,
  DELETE_CAT_FAIL,
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
  serverTimestamp,
} from '_firebase/fbConfig';

import {Alert} from 'react-native';

// USER LOADING
export const setCatLoading = () => {
  return {
    type: CAT_LOADING,
  };
};

// ROLLBACK COMPLETED
export const rollbackCompleted = () => {
  return {
    type: CAT_COMPLETED,
  };
};

// GET CATEGORY
export const getCat = () => async dispatch => {
  dispatch(setCatLoading());
  try {
    let catData = [];
    const user = auth.currentUser;

    const catRef = collection(db, 'categories');

    // Create a query against the collection.
    const q = query(catRef, where('uid', '==', user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      data.id = doc.id;
      delete data.uid;
      catData.push(data);
    });

    return dispatch({
      type: GET_CAT_SUCCESS,
      payload: catData,
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
      type: GET_CAT_FAIL,
    });
  }
};

// ADD CATEGORY
export const addCat = newCat => async dispatch => {
  const {title, icon, type} = newCat;
  if (title === '') return Alert.alert('Invalid!', 'Please add category name.');
  if (icon === '') return Alert.alert('Invalid!', 'Please choose an icon.');
  if (type === '')
    return Alert.alert('Invalid!', 'Please choose Debit or Credit.');
  dispatch(setCatLoading());
  try {
    const user = auth.currentUser;
    newCat.uid = user.uid;

    await addDoc(collection(db, 'categories'), newCat);

    dispatch(getCat());
    return dispatch({
      type: ADD_CAT_SUCCESS,
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
      type: ADD_CAT_FAIL,
    });
  }
};

// UPDATE CATEGORY
export const updateCat = newCat => async dispatch => {
  const {id, title, icon, type} = newCat;
  if (title === '') return Alert.alert('Invalid!', 'Please add category name.');
  if (icon === '') return Alert.alert('Invalid!', 'Please choose an icon.');
  dispatch(setCatLoading());
  try {
    const user = auth.currentUser;

    await setDoc(doc(db, 'categories', id), {uid: user.uid, title, icon, type});
    dispatch(getCat());
    return dispatch({
      type: UPDATE_CAT_SUCCESS,
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
      type: UPDATE_CAT_FAIL,
    });
  }
};

// DELETE CATEGORY
export const deleteCat = catId => async dispatch => {
  console.log(catId);
  dispatch(setCatLoading());
  try {
    await deleteDoc(doc(db, 'categories', catId));
    dispatch(getCat());
    return dispatch({
      type: DELETE_CAT_SUCCESS,
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
      type: DELETE_CAT_FAIL,
    });
  }
};
