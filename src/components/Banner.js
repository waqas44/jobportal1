import React from 'react';

// import '../../src/Job.css';
import '../assets/Job.css';
import logo from '../assets/brainx-logo-811f640d07d01575d8fb210cad138c1957098e038fc353240525309ee3e1e4c1.png';
function Banner(props) {
  return (
    <div className='sub-banner' data-ix='show-scroll-navigation-on-scroll'>
      <div className='container-center w-container'>
        <div
          className='client-big-logo'
          style={{
            backgroundImage: 'url(' + logo + ')',
            width: 200,
            height: 300,
          }}
        ></div>
        <div className='align-center'>
          <h1 className='just-title sub-banner-title'>
            {props.postInfo.companyName}
          </h1>
          <a className='website-title' href={props.postInfo.jobLink}>
            View Website
          </a>
          <div>
            <div className='category-text'>Software</div>
            <div className='category-text'>| &nbsp;Posted on:</div>
            <div className='category-text'>{props.postInfo.postDate}</div>
            <div className='category-text'>| &nbsp;Late Date to apply:</div>
            <div className='category-text'>2024-01-01</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
