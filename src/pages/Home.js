import React, { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const postsCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInitialLoad(true); // Mark initial load as complete
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, [deletePost]); // Empty dependency array to run only once

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getPosts();
  // }, [deletePost]);

  return (
    <div className='homePage'>
      {initialLoad && (
        <div className='postList'>
          {postLists.map((post) => (
            <div className='post' key={post.id}>
              <div className='postHeader'>
                <div className='title'>
                  <h1
                    className='text-3xl'
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    {post.title}
                  </h1>
                </div>
                <div className='deletePost'>
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      &#128465;
                    </button>
                  )}
                </div>
              </div>
              <div className='postTextContainer'>
                <div> Gender: {post.gender} </div>
                <div> Age : {post.age} </div>
                <div> {post.postText} </div>
              </div>
              <h3>@{post.author.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
