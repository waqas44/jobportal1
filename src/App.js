import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

import CreatePost from './pages/CreatePost';

import Login from './pages/Login';
import SinglePost from './pages/singlepost';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Admin1 from './pages/admin1';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };

  return (
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

        <Route path='/admin1' element={<Admin1 isAuth={isAuth} />} />
    

        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
     
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/posts/:id' element={<SinglePost isAuth={isAuth} />} />

      </Routes>
    </Router>
  );
}

export default App;
