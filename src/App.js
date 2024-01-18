import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

import CreatePost from './pages/CreatePost';

import Login from './pages/Login';
import SinglePost from './pages/singlepost';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import AdminArea from './pages/AdminArea';

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
            {/* <Link to='/createpost2'> Add Job2</Link> */}
            <Link to='/AdminArea'> AdminArea Panel </Link>

            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </div>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />

        <Route path='/AdminArea' element={<AdminArea isAuth={isAuth} />} />

        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />

        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/posts/:id' element={<SinglePost isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
