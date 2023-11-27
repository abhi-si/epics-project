// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBa1IJJOkbiRqWERU0hH_owEdNZCm22Lao",
  authDomain: "aahaar-c860d.firebaseapp.com",
  projectId: "aahaar-c860d",
  storageBucket: "aahaar-c860d.appspot.com",
  messagingSenderId: "266367683719",
  appId: "1:266367683719:web:c0b4c86180d0c38adb7c22",
  measurementId: "G-RLRTNLHXST",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };