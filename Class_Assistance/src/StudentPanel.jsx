import React from 'react';
import './Css/StudentPanel.css'
import './Css/index.css'
// import { Link } from 'react-router-dom';
function StudentPanel() {
  return (
    <div className='stdpanel'>
    <div className="linkbox">
      <marquee direction="bottom">
        <h1 className="notice">CT Result Uploaded. Click the link to get your result.</h1>
      </marquee>

      {/* <Link to="/" target="_blank">Click here to search your Marks</Link> */}
      
      <a href="/ctresultbysearch" target="">Click here to search your Marks</a>
      <a href="/stdattendence" target="">Click here to search your attendece</a>
    </div>
    
    </div>
  );
}

export default StudentPanel;
