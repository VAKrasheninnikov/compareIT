import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBpen4YJ-mv0hsrVuOK__XzkaXUFcfwZpI",
    authDomain: "compareitapp-1882a.firebaseapp.com",
    projectId: "compareitapp-1882a",
    storageBucket: "compareitapp-1882a.appspot.com",
    messagingSenderId: "282327619125",
    appId: "1:282327619125:web:e944863d12c95119aec37c"
  };


const fire = firebase.initializeApp(firebaseConfig);

export default fire;