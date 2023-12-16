// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxs5hzE7geOzQTX-2t4tUdxUgnfOLREr4",
    authDomain: "fir-88eb8.firebaseapp.com",
    projectId: "fir-88eb8",
    storageBucket: "fir-88eb8.appspot.com",
    messagingSenderId: "216790912789",
    appId: "1:216790912789:web:44d9fb5c67d52b51e5e31c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
