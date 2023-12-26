import React, { useEffect, useState } from 'react';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../single.css';

function SinglePost() {
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const postId = useParams().id;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, 'posts', postId);
      const docSnap = await getDoc(postDoc);
      const postData = {
        title: docSnap.data().title,
        gender: docSnap.data().gender,
        age: docSnap.data().age,
        postText: docSnap.data().postText,
        author: docSnap.data().author.name,
      };
      setPost(postData);
      setFormData(postData); // Set initial form data
    };

    fetchPost();
  }, [postId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postDocRef = doc(db, 'posts', postId);
    await updateDoc(postDocRef, {
      title: formData.title,
      gender: formData.gender,
      age: formData.age,
      postText: formData.postText,
      // Update other fields as needed
    });

    // Fetch the updated data from Firebase
    const updatedDocSnap = await getDoc(postDocRef);
    const updatedPostData = {
      title: updatedDocSnap.data().title,
      gender: updatedDocSnap.data().gender,
      age: updatedDocSnap.data().age,
      postText: updatedDocSnap.data().postText,
      author: updatedDocSnap.data().author.name,
    };

    // Update the local state with the fetched data
    setPost(updatedPostData);
    setFormData(updatedPostData);

    setIsEditing(false);
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (shouldDelete) {
      const postDocRef = doc(db, 'posts', postId);
      await deleteDoc(postDocRef);
      navigate('/'); // Redirect to the home page after deletion using useNavigate
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='singlePost'>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Title'
          />
          <input
            className='border border-gray-300 rounded-md py-1 pl-4 '
            type='text'
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            placeholder='Gender'
          />
          <input
            className='border border-gray-300 rounded-md py-1 pl-4 '
            type='number'
            name='age'
            value={formData.age}
            onChange={handleChange}
            placeholder='Age'
          />
          <textarea
            name='postText'
            value={formData.postText}
            onChange={handleChange}
            placeholder='Post Text'
          ></textarea>
          {/* Add other fields as needed */}
          <button type='submit'>Update</button>
          <button type='button' onClick={handleDelete}>
            Delete
          </button>{' '}
          {/* Add delete button */}
        </form>
      ) : (
        <>
          <h1 className='text-3xl'>{post.title}</h1>
          <div className='posst-content'></div>
          <div className='postTextContainer'>
            <div>Gender: {post.gender}</div>
            <div>Age: {post.age}</div>
            <div>{post.postText}</div>
          </div>
          <h3>@{post.author}</h3>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>{' '}
          {/* Add delete button */}
        </>
      )}
    </div>
  );
}

export default SinglePost;
