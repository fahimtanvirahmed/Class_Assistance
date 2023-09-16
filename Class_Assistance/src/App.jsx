import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';


import './Css/index.css'
import './Css/Navbar.css'
import StudentRegForm from './StudentRegForm'
import TeacherRegForm from './TeacherRegForm'
import StudentLoginForm from './StudentLoginForm'
import TeacherLoginForm from './TeacherLoginForm'
import StudentPanel from './StudentPanel';
import TeacherPanel from './TeacherPanel';
import CTresultbySearch from './CTresultbySearch';
import SelectOption from './SelectOption';
import Ctmarkupload from './CtMarkUpload';
import Download from './download';
import Attendence from './Attendence';
import Stdattendence from './Stdattendence';
import Selectattendence from './Selectattendence';
import Teaattendence from './Teaattendence';
import Teashowmarks from './Teashowmarks';
import ResultPage from './Ctresult';
import Classroutine from './Classroutine';
import Showroutine from './Showroutine';




function Navbar({onChange1,onChange2,onChange3,onChange4}){

return (
  

  <div className="navbar">
    <nav className="navigation">
      <Link to="/stdreg" className="student-reg-link" onClick={onChange1}>
        Registration(Student)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Link>
      <Link to="/teacherreg" className="teacher-reg-link"  onClick={onChange2}>
        Registration(Teacher)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Link>
      <Link to="/stdlogin" className="student-login-link" onClick={onChange3}>
        Log In(Student)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Link>
      <Link to="/teacherlogin" className="teacher-login-link" onClick={onChange4}>
        Log In(Teacher)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Link>
    </nav>
  </div>
);
}


// const ContactLink = () => (
//   <div className="contact">
//     <a href="ContactInfo.html" target="_blank">Contact With Me</a>
//   </div>
// );

// const AdminLogin = () => (
//   <div className="adminlogin">
//     <h1>Admin Panel</h1>
//     <form action="/adminlogin" method="post">
//       <label htmlFor="username">Username:</label>
//       <input type="text" id="username" className="username" name="username" required /><br /><br />
//       {/* Rest of the form content */}
//       <input type="submit" value="Login" className="loginbtn" />
//     </form>
//   </div>
// );

// const AdminButton = () => (
//   <button type="submit" className="admin">Admin</button>
// );

export default function App (){
const [showStudentRegForm, setShowStudentRegForm] = useState(false);
const handleStudentRegLinkClick = () => {
    setShowStudentRegForm(!showStudentRegForm);
  };
const [showTeacherRegForm, setshowTeacherRegForm] = useState(false);
const handleTeacherrRegLinkClick = () => {
  setshowTeacherRegForm(!showTeacherRegForm);
  };
const [showStudentLogForm, setshowStudentLogForm] = useState(false);
const handleStudentLogLinkClick = () => {
  setshowStudentLogForm(!showStudentLogForm);
  };
const [showTeacherLogForm, setshowTeacherLogForm] = useState(false);
const handleTeacherLogLinkClick = () => {
  setshowTeacherLogForm(!showTeacherLogForm);
  };

return(
  <Router>
  <div className='body'>
  <Routes>
  <Route path='/' element={
    <Navbar onChange1=
    {handleStudentRegLinkClick}onChange2={handleTeacherrRegLinkClick}
    onChange3=
    {handleStudentLogLinkClick}onChange4={handleTeacherLogLinkClick}
    />}/>

  
  {/* {showStudentRegForm?
    <StudentRegForm className="active-popup "/>:<StudentRegForm />
  }
    {showTeacherRegForm?
    <TeacherRegForm className="active-popup "/>:<TeacherRegForm />
  }
    {showStudentLogForm?
    <StudentLoginForm className="active-popup "/>:<StudentLoginForm />
  }
    {showTeacherLogForm?
    <TeacherLoginForm className="active-popup "/>:<TeacherLoginForm />
  } */}
  
  <Route path="/stdreg" element={showStudentRegForm ? <StudentRegForm className="active-popup" /> : <StudentRegForm />} />
          <Route path="/teacherreg" element={showTeacherRegForm ? <TeacherRegForm className="active-popup" /> : <TeacherRegForm />} />
          <Route path="/stdlogin" element={showStudentLogForm ? <StudentLoginForm className="active-popup" /> : <StudentLoginForm />} />
          <Route path="/teacherlogin" element={showTeacherLogForm ? <TeacherLoginForm className="active-popup" /> : <TeacherLoginForm />} />
          <Route path="/stdpanel" element={<StudentPanel />} />
          <Route path="/teacherpanel" element={<TeacherPanel />} />
          <Route path="/selectoption" element={< SelectOption/>} />
          <Route path="/ctmarkupload" element={< Ctmarkupload/>} />
          <Route path="/download" element={< Download/>} />
          <Route path="/ctresultbysearch" element={< CTresultbySearch/>} />
          <Route path="/attendence" element={< Attendence/>} />
          <Route path="/selectattendence" element={< Selectattendence/>} />
          <Route path="/stdattendence" element={< Stdattendence/>} />
          <Route path="/teaattendence" element={< Teaattendence/>} />
          <Route path="/teashowmarks" element={< Teashowmarks/>} />
          <Route path="/teashowmarks/result" element={<ResultPage />} />
          <Route path="/classroutine" element={<Classroutine />} />
          <Route path="/showroutine" element={<Showroutine />} />
          
          
  </Routes>
      </div>
    </Router> 
);
}
