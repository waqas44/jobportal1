import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBc7IjSuYVq-tk6auoQk8nr1QS8BE7V03U',
  authDomain: 'forjobportal2.firebaseapp.com',
  projectId: 'forjobportal2',
  storageBucket: 'forjobportal2.appspot.com',
  messagingSenderId: '203639925715',
  appId: '1:203639925715:web:9bf16405bc933566f61d26',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
