// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  firebase: {
    projectId: 'analisis-de-datos-8e55c',
    appId: '1:746068536198:web:f152764299fb1518fd1a07',
    databaseURL: 'https://analisis-de-datos-8e55c-default-rtdb.firebaseio.com',
    storageBucket: 'analisis-de-datos-8e55c.appspot.com',
    apiKey: 'AIzaSyADw0D-MHAcICa0XuSnrfsJSAWhoykkuSg',
    authDomain: 'analisis-de-datos-8e55c.firebaseapp.com',
    messagingSenderId: '746068536198',
  }
};

// Initialize Firebase
