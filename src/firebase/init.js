import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAIQVODs5bPHLeV1EKwq-ax-dybW-im0ms",
    authDomain: "wow-chat-88f4c.firebaseapp.com",
    databaseURL: "https://wow-chat-88f4c.firebaseio.com",
    projectId: "wow-chat-88f4c",
    storageBucket: "wow-chat-88f4c.appspot.com",
    messagingSenderId: "596608077448",
    appId: "1:596608077448:web:0c049d0b2882278147d93d",
    measurementId: "G-2NRL1401PQ"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()