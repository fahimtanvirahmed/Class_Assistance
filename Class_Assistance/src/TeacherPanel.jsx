import React from 'react';
import './Css/TeacherPanel.css'
import { Link } from 'react-router-dom';

function TeacherPanel() {
  return (
    <div className="teacherpanel">
    <div className="linkbox">
      <div>
      <Link to="/selectoption" target="_blank">Click here for Upload the CT Marks</Link>

      </div>
      <br />
      <br />
      <br />
      <div>
      <Link to="/selectattendence" target="_blank">Click here for upload Attendance</Link>
      <br />
      <br />
      <div>

      <Link to="/teaattendence" target="_blank">Click here for see  Attendance</Link>
      </div>

      </div>
    </div>
    </div>
  );
}

export default TeacherPanel;
