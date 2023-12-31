import React, { useEffect, useState } from 'react';
import { getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import '../single.css';
import Banner from '../components/Banner';

function SinglePost2() {
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
        title: docSnap.data().title,
        jobTitle: docSnap.data().jobTitle,
        companyName: docSnap.data().companyName,
        jobDescription: docSnap.data().jobDescription,
        jobType: docSnap.data().jobType,
        location: docSnap.data().location,
        postDate: docSnap.data().postDate,
        requirements: docSnap.data().requirements,
        skills: docSnap.data().skills,
        gender: docSnap.data().gender,
        age: docSnap.data().age,
        postText: docSnap.data().postText,
        author: docSnap.data().author.name,
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
      title: formData.title,
      gender: formData.gender,
      age: formData.age,
      postText: formData.postText,
      // Update other fields as needed
    });

    // Fetch the updated data from Firebase
    const updatedDocSnap = await getDoc(postDocRef);
    const updatedPostData = {
      title: updatedDocSnap.data().title,
      gender: updatedDocSnap.data().gender,
      age: updatedDocSnap.data().age,
      postText: updatedDocSnap.data().postText,
      author: updatedDocSnap.data().author.name,
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
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Title'
            />
            <input
              className='border border-gray-300 rounded-md py-1 pl-4 '
              type='text'
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              placeholder='Gender'
            />
            <input
              className='border border-gray-300 rounded-md py-1 pl-4 '
              type='number'
              name='age'
              value={formData.age}
              onChange={handleChange}
              placeholder='Age'
            />
            <textarea
              name='postText'
              value={formData.postText}
              onChange={handleChange}
              placeholder='Post Text'
            ></textarea>
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
              <div className='post-content'>
                Company Name : {post.companyName}
              </div>
              <div className='post-content'>
                Job Description : <pre>{post.jobDescription}</pre>
              </div>
              <div className='post-content'>Job Type : {post.jobType}</div>
              <div className='post-content'>Location : {post.location}</div>
              <div className='post-content'>Skills : {post.skills}</div>
              <div className='post-content'>Post Date : {post.postDate}</div>
              <div className='post-content'>
                Requirements :{post.requirements}
              </div>
              <div className='post-content'>Job Link : {post.jobLink}</div>
              <div className='post-content'>Post Date : {post.postDate}</div>

              <div>Gender: {post.gender}</div>
              <div>Age: {post.age}</div>
              <div>{post.postText}</div>
            </div>
            <h3>@{post.author}</h3>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>{' '}
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
                <div>Lahore, Pakistan</div>
              </div>
              {/* <div className='meta-tag money no-float'>
                <div>$40,000 - $200,000 / year</div>
              </div> */}
              <div className='certificate meta-tag no-float'>
                <div>Master or Bachelor in Computer Science</div>
              </div>
              <div className='clock meta-tag no-float'>
                <div>40h / week</div>
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
                      <div>
                        BrainX is hiring a full-time Shopify Web
                        Developer/Designer. The ideal candidate will be an
                        expert in Shopify development, including building custom
                        themes and features from scratch as well as
                        modifications to existing elements with expert-level
                        knowledge of HTML, CSS/SCSS &amp; JavaScript, and
                        conversion rate optimization for landing pages and PDPs.
                      </div>
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
                    href='https://forms.gle/7N8hCXwWTr8SLShN8'
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
                        href='https://www.facebook.com/sharer.php?u=https://careers.brainxtech.com/jobs/shopify-developer-2023-12-08'
                      ></a>
                      <a
                        className='twitter icons-so w-inline-block'
                        href='https://twitter.com/intent/tweet?url=https://careers.brainxtech.com/jobs/shopify-developer-2023-12-08'
                      ></a>
                      <a
                        className='linkin icons-so w-inline-block'
                        href='https://www.linkedin.com/shareArticle?mini=true&amp;url=https://careers.brainxtech.com/jobs/shopify-developer-2023-12-08'
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
                      Full-Time
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

export default SinglePost2;
