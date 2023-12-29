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

function Admin2({ isAuth }) {
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
  const [skills, setSkills] = useState([]);
  const [postDate, setPostDate] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [jobLink, setJobLink] = useState('');

  const availableSkills = [
    'JavaScript',
    'React.js',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Ruby',
    // Add more as needed
  ];
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
      skills: skills.editedPost.join(', '), // Store skills as a string
      postDate: editedPost.postDate,
      location: editedPost.location,
      requirements: editedPost.requirements,
      jobLink: editedPost.jobLink,
    });
    cancelEditing();
  };

  useEffect(() => {
    // ... other useEffect code

    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      setPostList(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          skills: doc.data().skills ? doc.data().skills.split(', ') : [], // Split skills string into array
        }))
      );
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
                  <label> Title:</label>
                  {editedPostId === post.id ? (
                    <input
                      className='border-gray-300'
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
              </div>

              <div className='postTextContainer'>
                <div>
                  <label> Job Title:</label>
                  {editedPostId === post.id ? (
                    <input
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
                    post.jobTitle
                  )}
                </div>
                <div>
                  <label>Job Description:</label>
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
                  <label>Skills:</label>
                  {editedPostId === post.id ? (
                    <select
                      multiple
                      value={skills.map((skill) => skill.name)} // Use skill names as value
                      onChange={(e) => setSkills(e.target.value)}
                    >
                      {availableSkills.map((skill) => (
                        <option key={skill.id} value={skill.name}>
                          {skill.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    post.skills.join(', ')
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

                <div>
                  <label>Job Url Link:</label>
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
                      <button className='text-blue-500 text-sm border border-blue-500 px-5 py-1 rounded-md hover:bg-blue-500 hover:text-white '>
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

export default Admin2;
