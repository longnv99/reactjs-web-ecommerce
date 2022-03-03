import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBaa_KquDhg6P5DsWYXCL1EIuYfMwh7d9E",
    authDomain: "reactjs-ecommerce-ac6d0.firebaseapp.com",
    projectId: "reactjs-ecommerce-ac6d0",
    storageBucket: "reactjs-ecommerce-ac6d0.appspot.com",
    messagingSenderId: "700311587176",
    appId: "1:700311587176:web:a3e760937c0b18b3216edd",
    measurementId: "G-MD1HPLQJV7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }