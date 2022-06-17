import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "multi-player-4a661.firebaseapp.com",
  projectId: "multi-player-4a661",
  storageBucket: "multi-player-4a661.appspot.com",
  messagingSenderId: "261862276884",
  appId: "1:261862276884:web:04fad929dd80fcc4970c01",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
