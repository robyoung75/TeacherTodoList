// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyApTaAE-F3_bYf0iwOnziWazrJALKYo6OY",
  authDomain: "todolistapp-726ec.firebaseapp.com",
  databaseURL: "https://todolistapp-726ec.firebaseio.com",
  projectId: "todolistapp-726ec",
  messagingSenderId: "999027088703",
  appId: "1:999027088703:web:bc2a88b956f98c6509078a",
  measurementId: "G-8C106MH5N2",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
