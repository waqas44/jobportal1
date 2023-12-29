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
import { Link, useNavigate } from 'react-router-dom';

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [editedPostId, setEditedPostId] = useState(null);

  // New state variables
  const [title, setTitle] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('');
  const [skills, setSkills] = useState('');
  const [postDate, setPostDate] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [jobLink, setJobLink] = useState('');

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
    setEditedPostId(post.id);
    setTitle(post.title);
    setJobTitle(post.jobTitle);
    setJobDescription(post.jobDescription);
    setCompanyName(post.companyName);
    setJobType(post.jobType);
    setSkills(post.skills);
    setPostDate(post.postDate);
    setLocation(post.location);
    setRequirements(post.requirements);
    setJobLink(post.jobLink);
    setEditedPost(post);
  };

  const cancelEditing = () => {
    setIsEditing(false);

    setEditedPostId(null);
    setTitle('');
    setJobTitle('');
    setJobDescription('');
    setCompanyName('');
    setJobType('');
    setSkills('');
    setPostDate('');
    setLocation('');
    setRequirements('');
    setJobLink('');
    setEditedPost({});
  };

  const updatePost = async () => {
    const postDoc = doc(db, 'posts', editedPostId);
    await updateDoc(postDoc, {
      title: editedPost.title,
      jobTitle: editedPost.jobTitle,
      jobDescription: editedPost.jobDescription,
      companyName: editedPost.companyName,
      jobType: editedPost.jobType,
      skills: editedPost.skills,
      postDate: editedPost.postDate,
      location: editedPost.location,
      requirements: editedPost.requirements,
      jobLink: editedPost.jobLink,
    });
    cancelEditing();
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInitialLoad(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='homePage'>
      {initialLoad && (
        <div className='postList'>
          {postLists.map((post) => (
            <div className='post ' key={post.id}>
              <div className='postHeader'>
                <div className='title'>
                  Title:
                  {
                    <h1
                      className='text-3xl cursor-pointer'
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      {post.title}
                    </h1>
                  }
                </div>

                <div className='editDeleteButtons'>
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <>
                      {editedPostId === post.id ? (
                        <>
                          <button onClick={updatePost}>Save</button>
                          <button onClick={cancelEditing}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => startEditing(post)}>Edit</button>
                      )}
                      <button onClick={() => deletePost(post.id)}>🗑️</button>
                    </>
                  )}
                </div>
              </div>

              <div className='postTextContainer'>
                <div>{post.jobTitle}</div>
                <div>
                  Job Description:{' '}
                  {editedPostId === post.id ? (
                    <textarea
                      value={editedPost.jobDescription}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          jobDescription: e.target.value,
                        })
                      }
                    />
                  ) : (
                    post.jobDescription
                  )}
                </div>
                <div>
                  Company Name:{' '}
                  {editedPostId === post.id ? (
                    <input
                      type='text'
                      value={editedPost.companyName}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          companyName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    post.companyName
                  )}
                </div>
                <div>
                  Job Type:{' '}
                  {editedPostId === post.id ? (
                    <input
                      type='text'
                      value={editedPost.jobType}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          jobType: e.target.value,
                        })
                      }
                    />
                  ) : (
                    post.jobType
                  )}
                </div>
                <div>
                  Skills:{' '}
                  {editedPostId === post.id ? (
                    <input
                      type='text'
                      value={editedPost.skills}
                      onChange={(e) =>
                        setEditedPost({ ...editedPost, skills: e.target.value })
                      }
                    />
                  ) : (
                    post.skills
                  )}
                </div>
                <div>
                  Post Date:{' '}
                  {editedPostId === post.id ? (
                    <input
                      type='date'
                      value={editedPost.postDate}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          postDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    post.postDate
                  )}
                </div>
                <div>
                  Location:{' '}
                  {editedPostId === post.id ? (
                    <input
                      type='text'
                      value={editedPost.location}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          location: e.target.value,
                        })
                      }
                    />
                  ) : (
                    post.location
                  )}
                </div>
                <div>
                  Requirements (Degree):{' '}
                  {editedPostId === post.id ? (
                    <input
                      type='text'
                      value={editedPost.requirements}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          requirements: e.target.value,
                        })
                      }
                    />
                  ) : (
                    post.requirements
                  )}
                </div>

                <div>
                  Job Url Link:
                  {editedPostId === post.id ? (
                    <input
                      type='text'
                      value={editedPost.jobLink}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          jobLink: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <a href={post.jobLink}>
                      <button className='text-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white '>
                        Apply
                      </button>
                    </a>
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
