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
import Banner from '../components/Banner';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Admin({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [editedPostId, setEditedPostId] = useState(null);

  // New state variables

  const [jobTitle, setJobTitle] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('remote');
  const [workHours, setWorkHours] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postLastDate, setPostLastDate] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');

  const predefinedJobTypes = ['Remote', 'In Office', 'Part Time'];

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

    setJobTitle(post.jobTitle);
    setJobLink(post.jobLink);
    setJobDescription(post.jobDescription);
    setCompanyName(post.companyName);
    setJobType(post.jobType);
    setWorkHours(post.setWorkHours);
    setPostDate(post.postDate);
    setPostLastDate(post.postLastDate);
    setLocation(post.location);
    setRequirements(post.requirements);
    setEditedPost(post);
  };

  const cancelEditing = () => {
    setIsEditing(false);

    setEditedPostId(null);

    setJobTitle('');
    setJobLink('');
    setJobDescription('');
    setCompanyName('');
    setJobType('');
    setWorkHours('');
    setPostDate('');
    setPostLastDate('');
    setLocation('');
    setRequirements('');
    setEditedPost({});
  };

  const updatePost = async () => {
    const postDoc = doc(db, 'posts', editedPostId);
    await updateDoc(postDoc, {
      jobTitle: editedPost.jobTitle,
      jobLink: editedPost.jobLink,
      jobDescription: editedPost.jobDescription,
      companyName: editedPost.companyName,
      jobType: editedPost.jobType,
      workHours: editedPost.workHours,
      postDate: editedPost.postDate,
      postLastDate: editedPost.postLastDate,
      location: editedPost.location,
      requirements: editedPost.requirements,
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
    <>
      <div className='homePage'>
        {initialLoad && (
          <div className='postList'>
            {postLists.map((post) => (
              <div className='post ' key={post.id}>
                <div className='editDeleteButtons'>
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <>
                      {editedPostId === post.id ? (
                        <>
                          <button
                            className='text-purple-800 text-sm border border-purple-400 px-5 py-1 rounded-md hover:bg-purple-400 hover:text-white mr-2'
                            onClick={updatePost}
                          >
                            Save
                          </button>
                          <button
                            className='text-orange-400 text-sm border border-orange-400 px-5 py-1 rounded-md hover:bg-orange-500 hover:text-white mr-2'
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className='text-blue-500 text-sm border border-blue-500 px-5 py-1 rounded-md hover:bg-blue-500 hover:text-white mr-3 '
                          onClick={() => startEditing(post)}
                        >
                          Edit
                        </button>
                      )}
                      <button onClick={() => deletePost(post.id)}>🗑️</button>
                    </>
                  )}
                </div>
                <div className='postHeader'>
                  <div className='title'>
                    <label> Job Title:</label>
                    {editedPostId === post.id ? (
                      <input
                        className='border-gray-300'
                        type='text'
                        value={editedPost.jobTitle}
                        onChange={(e) =>
                          setEditedPost({
                            ...editedPost,
                            jobTitle: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <h1
                        className='text-3xl cursor-pointer inline-block'
                        onClick={() => navigate(`/posts/${post.id}`)}
                      >
                        {post.jobTitle}
                      </h1>
                    )}
                  </div>
                </div>

                <div>
                  <label>Job Url Link:</label>
                  {editedPostId === post.id ? (
                    <input
                      type='url'
                      name='url'
                      id='url'
                      value={editedPost.jobLink}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost,
                          jobLink: e.target.value,
                        })
                      }
                      placeholder='https://example.com'
                      pattern='https://.*'
                      size='30'
                      required
                    />
                  ) : (
                    <a href={post.jobLink}>
                      <button className='text-blue-500 text-sm border border-blue-500 px-5 py-1 rounded-md hover:bg-blue-500 hover:text-white '>
                        Apply
                      </button>
                    </a>
                  )}
                </div>

                <div className='postTextContainer'>
                  <div>
                    <label>Job Description:</label>
                    {editedPostId === post.id ? (
                      <ReactQuill
                        value={editedPost.jobDescription}
                        onChange={(value) =>
                          setEditedPost({
                            ...editedPost,
                            jobDescription: value,
                          })
                        }
                        placeholder='Write your job description...'
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.jobDescription,
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <label> Company Name:</label>
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
                    <label> Job Type:</label>
                    {editedPostId === post.id ? (
                      <select
                        multiple
                        value={editedPost.jobType || []} // Ensure value is an array
                        onChange={(e) => {
                          const selectedJobTypes = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          );
                          setEditedPost({
                            ...editedPost,
                            jobType: selectedJobTypes,
                          });
                        }}
                      >
                        {/* Dropdown options from predefined job types */}
                        {predefinedJobTypes.map((jobType, index) => (
                          <option key={index} value={jobType}>
                            {jobType}
                          </option>
                        ))}
                      </select>
                    ) : Array.isArray(post.jobType) ? (
                      post.jobType.join(', ')
                    ) : (
                      post.jobType
                    )}
                  </div>
                  <div>
                    <label> Work Hours :</label>
                    {editedPostId === post.id ? (
                      <input
                        type='text'
                        value={editedPost.workHours}
                        onChange={(e) =>
                          setEditedPost({
                            ...editedPost,
                            workHours: e.target.value,
                          })
                        }
                      />
                    ) : (
                      post.workHours
                    )}
                  </div>
                  <div>
                    <label>Post Date:</label>
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
                    <label>Post Last Date:</label>
                    {editedPostId === post.id ? (
                      <input
                        type='date'
                        value={editedPost.postLastDate}
                        onChange={(e) =>
                          setEditedPost({
                            ...editedPost,
                            postLastDate: e.target.value,
                          })
                        }
                      />
                    ) : (
                      post.postLastDate
                    )}
                  </div>

                  <div>
                    <label>Location:</label>
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
                    <label>Requirements (Degree):</label>
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
                </div>
                <h3>@{post.author.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
