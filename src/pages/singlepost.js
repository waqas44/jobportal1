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
      setPost(docSnap.data());
    };

    fetchPost();
  }, [postId]);

  return (
    <div className='singlePost'>
      {/* Display post details here using the 'post' state object */}
      <h1 className='text-3xl'>{post.title}</h1>
      {/* ... rest of your post content */}
    </div>
  );
}

export default SinglePost;
