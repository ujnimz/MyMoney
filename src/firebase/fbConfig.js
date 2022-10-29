import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  updateProfile,
  signOut,
  deleteUser,
} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  Timestamp,
  orderBy,
  writeBatch,
} from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  //measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {
  auth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  updateProfile,
  signOut,
  deleteUser,
  db,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  Timestamp,
  orderBy,
  writeBatch,
};
