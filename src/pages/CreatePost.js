import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
// import MultiSelect from 'react-multi-select-component';
import { MultiSelect } from 'react-multi-select-component'; // Import the multi-select component

export const skills = [
  { label: 'React', value: 'react' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Node.js', value: 'nodejs' },
  // ... add more courses
];
function CreatePost({ isAuth }) {
  // const [title, setTitle] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('remote'); // Default to 'remote'
  const [workHours, setWorkHours] = useState('');
  const [postDate, setPostDate] = useState('');
  const [postLastDate, setPostLastDate] = useState('');
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const postsCollectionRef = collection(db, 'posts');
  let navigate = useNavigate();

  const createPostNew = async () => {
    await addDoc(postsCollectionRef, {
      // title,
      jobTitle,
      jobLink,
      jobDescription,
      companyName,
      jobType,
      workHours,
      postDate,
      postLastDate,
      location,
      requirements,
      skillReq: selectedSkills.map((skill) => skill.value), // Convert selected skills to an array of values

      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, []);

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1 className='text-3xl'>Post A Job</h1>

        {/* <div className='inputGp'>
          <label> Title:</label>
          <input
            placeholder='Title...'
            onChange={(event) => setTitle(event.target.value)}
          />
        </div> */}
        <div className='inputGp'>
          <label> Job Title:</label>
          <input
            placeholder='Job Title...'
            onChange={(event) => setJobTitle(event.target.value)}
          />
        </div>
        <div className='inputGp'>
          <label> Job Url Link:</label>
          <input
            placeholder='https://google.com/job...'
            onChange={(event) => setJobLink(event.target.value)}
          />
        </div>

        <div className='inputGp'>
          <label> Job Description:</label>
          <textarea
            placeholder='Description...'
            onChange={(event) => setJobDescription(event.target.value)}
          />
        </div>

        <div className='inputGp'>
          <label> Company Name:</label>
          <input
            placeholder='AH Traders ...'
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </div>

        <div className='inputGp'>
          <label> Job Type:</label>
          <select
            defaultValue={jobType}
            onChange={(event) => setJobType(event.target.value)}
          >
            <option value='remote'>Remote</option>
            <option value='inoffice'>In Office</option>
          </select>
        </div>

        <div className='inputGp'>
          <label> Work Hours:</label>
          <input
            placeholder='40h / Week...'
            onChange={(event) => setWorkHours(event.target.value)}
          />
        </div>

        <div className='inputGp'>
          <label> Job Post Date:</label>
          <input
            type='date'
            onChange={(event) => setPostDate(event.target.value)}
          />
        </div>
        <div className='inputGp'>
          <label> Job Last Date to Apply:</label>
          <input
            type='date'
            onChange={(event) => setPostLastDate(event.target.value)}
          />
        </div>

        <div className='inputGp'>
          <label> Location:</label>
          <input
            placeholder='Lahore, PK...'
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

        <div className='inputGp'>
          <label> Requirements (Degree):</label>
          <input
            placeholder='Master or Bachelor in Computer Science ...'
            onChange={(event) => setRequirements(event.target.value)}
          />
        </div>
        <div className='inputGp'>
          <label> Skills:</label>
          <MultiSelect
            className='text-black'
            options={skills}
            value={selectedSkills}
            onChange={setSelectedSkills}
            labelledBy='Select'
          />
        </div>

        <button
          className='text-3xl bg-slate-600 hover:bg-blue-600'
          onClick={() => createPostNew(selectedSkills)} // Pass selectedSkills as an argument
        >
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
