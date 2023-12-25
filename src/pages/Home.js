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
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const postsCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();

  const deletePost = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (confirmation) {
      const postDoc = doc(db, 'posts', id);
      await deleteDoc(postDoc);
    }
  };

  const startEditing = (post) => {
    setIsEditing(true);
    setEditedPost(post);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedPost({});
  };

  const updatePost = async () => {
    const postDoc = doc(db, 'posts', editedPost.id);
    await updateDoc(postDoc, {
      title: editedPost.title,
      postText: editedPost.postText,
      gender: editedPost.gender,
      age: editedPost.age,
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
                  {isEditing ? (
                    <input
                      type='text'
                      value={editedPost.title}
                      onChange={(e) =>
                        setEditedPost({ ...editedPost, title: e.target.value })
                      }
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
                      {isEditing ? (
                        <>
                          <button onClick={updatePost}>Save</button>
                          <button onClick={cancelEditing}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => startEditing(post)}>Edit</button>
                      )}
                      <button onClick={() => deletePost(post.id)}>
                        &#128465;
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className='postTextContainer'>
                <div>
                  {' '}
                  Gender:
                  {isEditing ? (
                    <input
                      type='text'
                      value={editedPost.gender}
                      onChange={(e) =>
                        setEditedPost({ ...editedPost, gender: e.target.value })
                      }
                    />
                  ) : (
                    post.gender
                  )}
                </div>
                <div>
                  {' '}
                  Age:
                  {isEditing ? (
                    <input
                      type='text'
                      value={editedPost.age}
                      onChange={(e) =>
                        setEditedPost({ ...editedPost, age: e.target.value })
                      }
                    />
                  ) : (
                    post.age
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <textarea
                      value={editedPost.postText}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          postText: e.target.value,
                        })
                      }
                    />
                  ) : (
                    post.postText
                  )}
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
