import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Box, Typography, Button, Grid, Container } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

import CreatePost from './pages/CreatePost';

import Login from './pages/Login';
import SinglePost from './pages/singlepost';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Admin1 from './pages/admin1';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});
function App() {
  const theme = createTheme();

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  }

  function ProtectedRoute({ children, isAuth }) {
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function CreatePost({ isAuth }) {
  if (!isAuth ) { // Implement isAdminUser() logic
      return <Navigate to="/" replace />;
  }
  // Post creation form
}

  return (
    <ThemeProvider theme={theme}>
            <CssBaseline />

    <Router>
      <div className='navbar'>
        <Link to='/'> Home </Link>

        {!isAuth ? (
          <Link to='/login'> Login </Link>
        ) : (
          <>
            <Link to='/createpost'> Add Job </Link>
      
            <Link to='/admin1'> Admin Panel </Link>
       
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </div>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />

        {/* <Route path='/admin1' element={<Admin1 isAuth={isAuth} />} /> */}
        <Route
        path="/admin1"
        element={
            <ProtectedRoute isAuth={isAuth}>
                <Admin1 isAuth={isAuth} />
            </ProtectedRoute>
        }
    />

        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
     
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/posts/:id' element={<SinglePost isAuth={isAuth} />} />

      </Routes>
    </Router>
  </ThemeProvider>

  );
}

export default App;
