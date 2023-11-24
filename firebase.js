// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvPgN44w1XbfKvqndQ3BV9W_EB2atPCNw",
  authDomain: "cog-sol-test-task-db.firebaseapp.com",
  databaseURL: "https://cog-sol-test-task-db-default-rtdb.firebaseio.com",
  projectId: "cog-sol-test-task-db",
  storageBucket: "cog-sol-test-task-db.appspot.com",
  messagingSenderId: "29694058647",
  appId: "1:29694058647:web:5ebb5f9661e21ae0d109d2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
