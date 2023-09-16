import React, { useState } from 'react';
import './Css/TeacherLoginForm.css';
import './Css/index.css';


const TeacherLoginForm = ({ className }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to server
    // You can access the form data in the component state (name, email, password, department, series, roll)
  };
  const existingClass = 'teacherloginform';
  return (
    <div className=
    {`${existingClass} ${className}`}>
      <h1>Teacher Login</h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <input type="submit" value="Sign Up" className="signup" />
      </form>
    </div>
  );
};

export default TeacherLoginForm;
