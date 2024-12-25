// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBN_wqTClUvYgjQ3v0DoYizVYsZhOtEBc",
    authDomain: "aipaago.firebaseapp.com",
    projectId: "aipaago",
    storageBucket: "aipaago.appspot.com",
    messagingSenderId: "699277129675",
    appId: "1:699277129675:web:5fc5077dd92d60e870a84e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)


