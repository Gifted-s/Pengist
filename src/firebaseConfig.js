import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCFWiWBzLrovTeIrOgGVM2gmQWdnd56Fyc",
    authDomain: "test-project-34def.firebaseapp.com",
    databaseURL: "https://test-project-34def.firebaseio.com",
    projectId: "test-project-34def",
    storageBucket: "test-project-34def.appspot.com",
    messagingSenderId: "13998930621",
    appId: "1:13998930621:web:7a6d2d62554fb3213655d4",
    measurementId: "G-C42343XHF9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();