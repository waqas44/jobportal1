import React, { useEffect, useState } from 'react';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

function Home({ isAuth }) {
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
      {initialLoad && (
        <div className='postList1' style={{ marginTop: 20 }}>
          {postLists.map((post) => (
            <div className='post' key={post.id}>
              <div className='mx-40 mb-5'>
                <div className='flex justify-between items-center px-6 py-4 bg-zinc-100 rounded-md border border-gray-200 shadow-lg hover:border-blue-500'>
                  <div className='flex flex-col items-start gap-3'>
                    <h1
                      className='text-xl cursor-pointer'
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      {post.jobTitle} • {post.companyName}
                    </h1>
                    <p>
                      Job Type -
                      {Array.isArray(post.jobType)
                        ? post.jobType.join(', ')
                        : post.jobType}
                    </p>

                    <div className='flex items-center gap-2'>
                      {/* <p> {post..map((b) => b)}</p> */}
                      Skills Required:
                      <p className='text-gray-500 py-1 px-2 rounded-md border border-gray-500'>
                        {Array.isArray(post.skillReq)
                          ? post.skillReq.join(', ')
                          : post.skillReq}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p>Apply Last Date : {post.postLastDate}</p>

                    <a href={post.jobLink}>
                      <button className='text-blue-500 border border-blue-500 px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white '>
                        Apply
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='homePage' style={{ display: 'none' }}>
        {initialLoad && (
          <div className='postList'>
            {postLists.map((post) => (
              <div className='post' key={post.id}>
                <div className='postHeader'>
                  <div className='title'>
                    <h1
                      className='text-lg  cursor-pointer'
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      {post.jobTitle}
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
      <Footer />
    </>
  );
}

export default Home;
