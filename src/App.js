import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

import CreatePost from './pages/CreatePost';
import CreatePost2 from './pages/CreatePost2';
import Login from './pages/Login';
import SinglePost from './pages/singlepost';
import SinglePost2 from './pages/singlepost2';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Admin from './pages/AdminArea';
import Admin2 from './pages/admin2';

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
            <Link to='/admin'> Admin Panel </Link>
            {/* <Link to='/admin2'> Admin 2 </Link> */}
            <button onClick={signUserOut}> Log Out</button>
          </>
        )}
      </div>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        {/* <Route path='/home2' element={<Home2 isAuth={isAuth} />} /> */}
        <Route path='/admin' element={<Admin isAuth={isAuth} />} />
        {/* <Route path='/admin2' element={<Admin2 isAuth={isAuth} />} /> */}

        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
        {/* <Route path='/createpost2' element={<CreatePost2 isAuth={isAuth} />} /> */}
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/posts/:id' element={<SinglePost isAuth={isAuth} />} />
        {/* <Route path='/posts2/:id' element={<SinglePost2 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
