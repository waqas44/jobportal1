import React, { useEffect, useState } from 'react';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';

function Admin({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);

  const postsCollectionRef = collection(db, 'posts');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInitialLoad(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div class='mx-40 mb-5'>
        <div class='flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500'>
          <div class='flex flex-col items-start gap-3'>
            <h1 class='text-xl '>iOS Developer • Apple</h1>
            <p>Full Time - Remote</p>
            <div class='flex items-center gap-2'>
              <p class='text-gray-500 py-1 px-2 rounded-md border border-gray-500'>
                SwiftUI
              </p>
              <p class='text-gray-500 py-1 px-2 rounded-md border border-gray-500'>
                UiKit
              </p>
              <p class='text-gray-500 py-1 px-2 rounded-md border border-gray-500'>
                Core Data
              </p>
            </div>
          </div>
          <div>
            <p>Posted 13 Days ago</p>
            <a href='https://www.apple.com/careers/in/'>
              <button class='text-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white '>
                Apply
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className='homePage'>
        {initialLoad && (
          <div className='postList'>
            {postLists.map((post) => (
              <div className='post' key={post.id}>
                <div className='postHeader'>
                  <div className='title'>
                    <h1
                      className='text-3xl cursor-pointer'
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      {post.title}
                    </h1>
                  </div>
                </div>

                <div className='postTextContainer'>
                  <div>Job Title: {post.jobTitle}</div>
                  <div>Job Description: {post.jobDescription}</div>
                  <div>Company Name: {post.companyName}</div>
                  <div>
                    Job Type:{' '}
                    {Array.isArray(post.jobType)
                      ? post.jobType.join(', ')
                      : post.jobType}
                  </div>
                  <div>Skills: {post.skills}</div>
                  <div>Post Date: {post.postDate}</div>
                  <div>Location: {post.location}</div>
                  <div>Requirements (Degree): {post.requirements}</div>

                  <div>
                    <a href={post.jobLink}>
                      <button className='text-blue-500 text-sm border border-blue-500 px-5 py-1 rounded-md hover:bg-blue-500 hover:text-white '>
                        Apply
                      </button>
                    </a>
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
