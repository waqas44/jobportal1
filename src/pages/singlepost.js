import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useParams } from 'react-router-dom';

function SinglePost() {
  const [post, setPost] = useState({});
  const postId = useParams().id; // Get the post ID from the URL parameter

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, 'posts', postId);
      const docSnap = await getDoc(postDoc);

      // Assuming you only need certain fields from the post
      // Adjust this based on your actual requirements
      const postData = {
        title: docSnap.data().title,
        gender: docSnap.data().gender,
        age: docSnap.data().age,
        postText: docSnap.data().postText,
        // ... add more fields if needed
        author: docSnap.data().author.name,
      };

      setPost(postData);
    };

    fetchPost();
  }, [postId]);

  return (
    <div className='singlePost'>
      {/* Display post details here using the 'post' state object */}
      <h1 className='text-3xl'>{post.title}</h1>
      <div className='posst-content'> </div>
      <div className='postTextContainer'>
        <div> Gender: {post.gender} </div>
        <div> Age : {post.age} </div>
        <div> {post.postText} </div>
      </div>
      <h3>@{post.author}</h3>
      {/* ... rest of your post content */}
    </div>
  );
}

export default SinglePost;
