import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCd9qfmz_tNXIwvjg_89b3aYTtWeswiF9w",
  authDomain: "aplikacjawyjazdy.firebaseapp.com",
  projectId: "aplikacjawyjazdy",
  storageBucket: "aplikacjawyjazdy.firebasestorage.app",
  messagingSenderId: "2575283687",
  appId: "1:2575283687:web:b3a399e662193f1ec93942",
  measurementId: "G-1RVNMP9DD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export potrzebnych usług
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
