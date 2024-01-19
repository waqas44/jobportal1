// AdminDashboard.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { auth } from '../firebase-config';
import { FirebaseDataProvider } from 'ra-data-firebase';
import { FirebaseAuthProvider } from 'react-admin-firebase';

const config = {
  apiKey: 'AIzaSyAEIXjl8W55fKU4hs3mRU57ljmdIUlGfUg',
  authDomain: 'forjobportal-efdbf.firebaseapp.com',
  projectId: 'forjobportal-efdbf',
  storageBucket: 'forjobportal-efdbf.appspot.com',
  messagingSenderId: '95206001929',
  appId: '1:95206001929:web:d82a6fe5472aefe01057d8',
};

const options = {
  // Your firebase authentication persistence settings if needed
};

const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

const AdminDashboard = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name='posts' auth={auth} />
  </Admin>
);

export default AdminDashboard;
