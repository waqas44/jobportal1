import React, { useEffect, useState } from 'react';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import '../single.css';
import Banner from '../components/Banner';

function SinglePost() {
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const postId = useParams().id;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = doc(db, 'posts', postId);
      const docSnap = await getDoc(postDoc);
      const postData = {
        jobTitle: docSnap.data().jobTitle,
        jobLink: docSnap.data().jobLink,
        jobDescription: docSnap.data().jobDescription,
        companyName: docSnap.data().companyName,
        jobType: docSnap.data().jobType,
        workHours: docSnap.data().workHours,
        postDate: docSnap.data().postDate,
        postLastDate: docSnap.data().postLastDate,
        location: docSnap.data().location,
        requirements: docSnap.data().requirements,

        author: docSnap.data().author.name,

        postUrl: `http://localhost:3000/posts/${postId}`,
      };
      console.log(docSnap.data());
      setPost(postData);
      setFormData(postData); // Set initial form data
    };

    fetchPost();
  }, [postId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postDocRef = doc(db, 'posts', postId);
    await updateDoc(postDocRef, {
      jobTitle: formData.jobTitle,
      jobLink: formData.jobLink,
      jobDescription: formData.jobDescription,
      companyName: formData.companyName,
      jobType: formData.jobType,
      workHours: formData.workHours,
      postDate: formData.postDate,
      postLastDate: formData.postLastDate,
      location: formData.location,
      requirements: formData.requirements,

      // Update other fields as needed
    });

    // Fetch the updated data from Firebase
    const updatedDocSnap = await getDoc(postDocRef);
    const updatedPostData = {
      jobTitle: updatedDocSnap.data().jobTitle,
      jobLink: updatedDocSnap.data().jobLink,
      jobDescription: updatedDocSnap.data().jobDescription,
      companyName: updatedDocSnap.data().companyName,
      jobType: updatedDocSnap.data().jobType,
      workHours: updatedDocSnap.data().workHours,
      postDate: updatedDocSnap.data().postDate,
      postLastDate: updatedDocSnap.data().postLastDate,
      location: updatedDocSnap.data().location,
      requirements: updatedDocSnap.data().requirements,
    };

    // Update the local state with the fetched data
    setPost(updatedPostData);
    setFormData(updatedPostData);

    setIsEditing(false);
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );

    if (shouldDelete) {
      const postDocRef = doc(db, 'posts', postId);
      await deleteDoc(postDocRef);
      navigate('/'); // Redirect to the home page after deletion using useNavigate
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelHandle = () => {
    setIsEditing(false);
  };
  return (
    <>
      <div className='singlePost'>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='jobTitle'
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder='Job title'
            />
            <input
              type='url'
              name='jobLink'
              value={formData.jobLink}
              onChange={handleChange}
              placeholder='job link'
            />
            <input
              type='text'
              name='jobDescription'
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder='Job Description'
            />

            <input
              type='text'
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
              placeholder='Company Name'
            />

            {/* <select defaultValue={formData.jobType} onChange={handleChange}>
              <option value='remote'>Remote</option>
              <option value='inoffice'>In Office</option>
            </select> */}

            <select
              onChange={handleChange2}
              name='jobType'
              value={formData.jobType}
              className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'
            >
              <option value='' disabled hidden>
                Job Role
              </option>
              <option value='iOS Developer'>iOS Developer</option>
              <option value='Frontend Developer'>Frontend Developer</option>
              <option value='Backend Developer'>Backend Developer</option>
              <option value='Android Developer'>Android Developer</option>
              <option value='Developer Advocate'>Developer Advocate</option>
            </select>
            <input
              type='text'
              name='workHours'
              value={formData.workHours}
              onChange={handleChange}
              placeholder='40h / week ...'
            />

            <input
              type='date'
              name='postDate'
              value={formData.postDate}
              onChange={handleChange}
            />

            <input
              type='date'
              name='postLastDate'
              value={formData.postLastDate}
              onChange={handleChange}
            />

            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='e.g. Lahore, Pak'
            />
            <input
              type='text'
              name='requirements'
              value={formData.requirements}
              onChange={handleChange}
              placeholder='Master bachlor ...'
            />
            {/* Add other fields as needed */}
            <button type='submit'>Update</button>
            <button type='button' onClick={cancelHandle}>
              Cancel
            </button>
            {/* Add delete button */}
          </form>
        ) : (
          <>
            <h1 className='text-3xl'>{post.title}</h1>
            <div className='postTextContainer'>
              <div className='post-content'>Job Title : {post.jobTitle}</div>
              <div className='post-content'>Job Link : {post.jobLink}</div>
              <div className='post-content'>
                Job Description : <pre>{post.jobDescription}</pre>
              </div>

              <div className='post-content'>
                Company Name : {post.companyName}
              </div>
              <div className='post-content'>Job Type : {post.jobType}</div>
              <div className='post-content'>
                Working Hours : {post.workHours}
              </div>
              <div className='post-content'>Post Date : {post.postDate}</div>

              <div className='post-content'>
                Post Last Date : {post.postLastDate}
              </div>
              <div className='post-content'>Location : {post.location}</div>
              <div className='post-content'>
                Requirements :{post.requirements}
              </div>
            </div>
            <h3>@{post.author}</h3>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            {/* Add delete button */}
          </>
        )}
      </div>
      <Banner postInfo={post} />
      <div className='section'>
        <div className='w-container'>
          <div className='align-center'>
            <h2 className='logo-title'>{post.jobTitle}</h2>
            <div className='small space'></div>
            <div>
              <div className='meta-tag no-float'>
                <div> {post.companyName}</div>
              </div>
              <div className='marker meta-tag no-float'>
                <div>{post.location}</div>
              </div>
              {/* <div className='meta-tag money no-float'>
                <div>$40,000 - $200,000 / year</div>
              </div> */}
              <div className='certificate meta-tag no-float'>
                <div>{post.requirements}</div>
              </div>
              <div className='clock meta-tag no-float'>
                <div>{post.workHours}</div>
              </div>
            </div>
            <div className='big space super-big'></div>
          </div>
          <div>
            <div className='w-row'>
              <div className='w-col w-col-8'>
                <div>
                  <h2 className='smaller-font'>Job Details</h2>
                  <div className='small space'></div>
                  <div className='w-richtext'>
                    <div className='trix-content'>
                      <div>{post.jobDescription}</div>
                    </div>

                    <h5>Job Responsibilities</h5>
                    <div className='trix-content'>
                      <ul>
                        <li>Strong knowledge of liquid programming language</li>
                        <li>Strong knowledge of developing Shopify apps</li>
                        <li>
                          Generate custom-tailored Shopify theme and alter
                          pre-existing templates.
                        </li>
                        <li>
                          Act as a Shopify expert, specializing in all facets of
                          the e-commerce platform.
                        </li>
                        <li>
                          Strong hands to Install and customize the new Shopify
                          theme.
                        </li>
                        <li>
                          Clear concept of HTML5, CSS3, javascript/Jquery.
                        </li>
                        <li>
                          Strong hands to Install and customize the new Shopify
                          theme.
                        </li>
                      </ul>
                    </div>

                    <h5>Skills Required</h5>
                    <div className='trix-content'>
                      <ul>
                        <li>
                          BS/MS degree in Computer Science, Software
                          Engineering, or a related subject.
                        </li>
                        <li>
                          <strong>2 Years - 3 Years of experience</strong> is
                          required.
                        </li>
                        <li>
                          Excellent written and verbal communication skills.
                        </li>
                        <li>
                          Highly self-motivated and proven Analytical and
                          Problem-Solving skills.
                        </li>
                        <li>
                          Ability to work both independently and in a
                          collaborative environment.
                        </li>
                        <li>
                          Experience developing within the Shopify and Shopify
                          Plus platforms
                        </li>
                        <li>
                          Experience developing private and public Shopify Apps
                        </li>
                        <li>
                          Experience in front-end technologies including, but
                          not limited to, JavaScript, AJAX, HTML, CSS, SASS
                        </li>
                        <li>Superb troubleshooting &amp; debugging skills</li>
                        <li>
                          A disciplined approach to testing and quality
                          assurance
                        </li>
                      </ul>
                    </div>

                    <p>
                      We have an amazing team of qualified individuals working
                      on highly innovative enterprise projects. People who work
                      with us work with cutting-edge technologies while
                      contributing success to the company as well as to
                      themselves. This is obviously above and beyond the usual
                      stuff (excellent pay, medical benefits and frequent
                      appraisals).
                    </p>
                  </div>
                </div>
              </div>
              <div className='column-space w-col w-col-4'>
                <div>
                  <a
                    className='button full w-button'
                    data-ix='show-popup-on-click'
                    href={post.jobLink}
                    style={{ transition: 'all 0.4s ease 0s' }}
                  >
                    Apply For Job
                  </a>
                </div>
                <div className='big space'></div>
                <div>
                  <h2 className='smaller-font'>Share This Job</h2>
                  <div className='small space'></div>
                  <div className='text-center-1'>
                    <div>
                      <a
                        className='icons-so w-inline-block'
                        href={`https://www.facebook.com/sharer.php?u=${post.postUrl}`}
                      ></a>
                      <a
                        className='twitter icons-so w-inline-block'
                        href={`https://twitter.com/intent/tweet?url=${post.postUrl}`}
                      ></a>
                      <a
                        className='linkin icons-so w-inline-block'
                        // href='https://www.linkedin.com/shareArticle?mini=true&amp;url=https://careers.brainxtech.com/jobs/shopify-developer-2023-12-08'

                        href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=${post.postUrl}`}
                      ></a>
                    </div>
                  </div>
                </div>
                <div className='big space'></div>
                <div>
                  <h2 className='smaller-font'>Job Type</h2>
                  <div className='small space'></div>
                  <div className='text-center-1'>
                    <div
                      className='different in-pages job-time'
                      style={{ backgroundColor: '#5cb85c' }}
                    >
                      {post.jobType}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='space'></div>
          <div className='align-center'>
            <a
              className='button full w-button'
              data-ix='show-popup-on-click'
              href='https://forms.gle/7N8hCXwWTr8SLShN8'
              style={{ transition: 'all 0.4s ease 0s', width: 300 }}
            >
              Apply For Job
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
