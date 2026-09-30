// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOeuXR1jhGmtdmyvEg5BcI9pECal4BRFs",
  authDomain: "backend-test-abfe9.firebaseapp.com",
  projectId: "backend-test-abfe9",
  storageBucket: "backend-test-abfe9.firebasestorage.app",
  messagingSenderId: "561791318509",
  appId: "1:561791318509:web:905312f2744283eca40fe4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
