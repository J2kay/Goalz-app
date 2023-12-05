import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoBPMztmaDZpYyrhbacs3rQZNwJBaiZf8",
  authDomain: "day-to-day-53e0e.firebaseapp.com",
  projectId: "day-to-day-53e0e",
  storageBucket: "day-to-day-53e0e.appspot.com",
  messagingSenderId: "1094711916392",
  appId: "1:1094711916392:web:91a5c6be32450ca25c08dd",
  measurementId: "G-DKK5LWV494",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export default app;
