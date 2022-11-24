import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDZhFsR3COqfVJMuioJsaTefiMh1N2jW6Y",
    authDomain: "ecommerce-dd78c.firebaseapp.com",
    projectId: "ecommerce-dd78c",
    storageBucket: "ecommerce-dd78c.appspot.com",
    messagingSenderId: "193508024766",
    appId: "1:193508024766:web:dd292b8f260fe8cccfd9ef"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export { db, auth}