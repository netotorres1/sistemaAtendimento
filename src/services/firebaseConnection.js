import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD5FUCVfPluyBsMeGs3b1OPhXqE4qpOJPw",
    authDomain: "sistema-atendimento2.firebaseapp.com",
    projectId: "sistema-atendimento2",
    storageBucket: "sistema-atendimento2.appspot.com",
    messagingSenderId: "609148377816",
    appId: "1:609148377816:web:364c5f0c869dff3c3c95ad",
    measurementId: "G-YXWMHMKXZL"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;