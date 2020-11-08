// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  
  measurementId: "G-8C106MH5N2",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
