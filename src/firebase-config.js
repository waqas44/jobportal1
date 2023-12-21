// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAEIXjl8W55fKU4hs3mRU57ljmdIUlGfUg',
  authDomain: 'forjobportal-efdbf.firebaseapp.com',
  projectId: 'forjobportal-efdbf',
  storageBucket: 'forjobportal-efdbf.appspot.com',
  messagingSenderId: '95206001929',
  appId: '1:95206001929:web:d82a6fe5472aefe01057d8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
