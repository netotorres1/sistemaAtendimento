import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyCppmoGBTyLeJOgR_1WFdpqEaqCp1E8mBE",
    authDomain: "sistema-atendimento-ec338.firebaseapp.com",
    projectId: "sistema-atendimento-ec338",
    storageBucket: "sistema-atendimento-ec338.appspot.com",
    messagingSenderId: "218649153173",
    appId: "1:218649153173:web:00bb97f7342b9f2f95d59c",
    measurementId: "G-TV4BZPFR06"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;