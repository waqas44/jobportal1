import React from 'react';
import logofooter from '../assets/brainx-logo-811f640d07d01575d8fb210cad138c1957098e038fc353240525309ee3e1e4c1.png';

function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className='w-container'>
          <div className='align-center'>
            <a className='w-inline-block' href={'/'}>
              <img src={logofooter} style={{ width: 170 }} alt='BrainX' />
            </a>
            <div className='space'></div>
            <div>
              <a
                className='icons-so w-inline-block'
                href='https://www.facebook.com/BrainXCareers/'
              ></a>
              <a
                className='icons-so twitter w-inline-block'
                href='https://twitter.com/BrainXTechs'
              ></a>
              <a
                className='linkin icons-so w-inline-block'
                href='https://www.linkedin.com/company/13258108/'
              ></a>
            </div>
            <div className='space'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
