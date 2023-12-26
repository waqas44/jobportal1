import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [postText, setPostText] = useState('');

  const postsCollectionRef = collection(db, 'posts');
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      gender: gender,
      age: age,
    });
    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, []);

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1 className='text-3xl'>Post A Job</h1>
        <div className='inputGp'>
          <label> Job Title:</label>
          <input
            placeholder='Title...'
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div className='inputGp'>
          <label> Gender:</label>
          <input
            placeholder='Gender ...'
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </div>
        <div className='inputGp'>
          <label> Age:</label>
          <input
            placeholder='Age...'
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </div>

        <div className='inputGp'>
          <label> Post:</label>
          <textarea
            placeholder='Post...'
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button
          className='text-3xl bg-slate-600 hover:bg-blue-600'
          onClick={createPost}
        >
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
