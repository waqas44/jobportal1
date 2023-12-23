import React, { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPostText, setEditedPostText] = useState('');
  const postsCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  };

  const startEditing = (id, postText) => {
    setEditingPostId(id);
    setEditedPostText(postText);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditedPostText('');
  };

  const updatePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await updateDoc(postDoc, {
      postText: editedPostText,
    });
    cancelEditing();
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInitialLoad(true);
    });

    return () => unsubscribe();
  }, []); // Empty dependency array to run only once

  return (
    <div className='homePage'>
      {initialLoad && (
        <div className='postList'>
          {postLists.map((post) => (
            <div className='post' key={post.id}>
              <div className='postHeader'>
                <div className='title'>
                  {editingPostId === post.id ? (
                    <input
                      type='text'
                      value={editedPostText}
                      onChange={(e) => setEditedPostText(e.target.value)}
                    />
                  ) : (
                    <h1
                      className='text-3xl cursor-pointer'
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      {post.title}
                    </h1>
                  )}
                </div>
                <div className='editDeleteButtons'>
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <>
                      {editingPostId === post.id ? (
                        <>
                          <button onClick={() => updatePost(post.id)}>
                            Save
                          </button>
                          <button onClick={cancelEditing}>Cancel</button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEditing(post.id, post.postText)}
                        >
                          Edit
                        </button>
                      )}
                      <button onClick={() => deletePost(post.id)}>
                        &#128465;
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className='postTextContainer'>
                <div> Gender: {post.gender} </div>
                <div> Age: {post.age} </div>
                <div>
                  {' '}
                  {editingPostId === post.id
                    ? editedPostText
                    : post.postText}{' '}
                </div>
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
