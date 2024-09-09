import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqfed1Q-h0c99lRR9C4NZKXtkogaxT_II",
  authDomain: "e-commerce-6723e.firebaseapp.com",
  projectId: "e-commerce-6723e",
  storageBucket: "e-commerce-6723e.appspot.com",
  messagingSenderId: "132719052495",
  appId: "1:132719052495:web:7652a203b9d250bf1d19ba"
};

// initialize firebase app
const app = initializeApp(firebaseConfig);
 
// export
export const auth = getAuth(app);
 
export const googleAuthProvider = new GoogleAuthProvider();
