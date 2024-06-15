// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKy-K5tbLuuOZWCFLC_T1vk8dvdMKAlsk",
  authDomain: "nytt-b8d63.firebaseapp.com",
  projectId: "nytt-b8d63",
  storageBucket: "nytt-b8d63.appspot.com",
  messagingSenderId: "108700048665",
  appId: "1:108700048665:web:1c0a369791793b865ab988"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};