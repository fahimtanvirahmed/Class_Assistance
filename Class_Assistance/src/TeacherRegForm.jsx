import React, { useState } from 'react';
import './Css/TeacherRegForm.css';
import './Css/index.css';


const TeacherRegistrationForm = ({ className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to server
    // You can access the form data in the component state (name, email, password, department, series, roll)
  };
  const existingClass = 'teacherregform';
  return (
    <div className=
    {`${existingClass} ${className}`}>
      <h1>Teacher Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

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

        <label htmlFor="department">Department:</label>
        <select
          id="department"
          className="department"
          name="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          <option selected disabled></option>
          <option disabled>Faculty of Electrical & Computer Engineering</option>
          <option value="CSE">Computer Science & Engineering(CSE)</option>
                <option value="EEE">Electrical & Electronic Engineering(EEE)</option>
                <option value="ECE">Electrical & Computer Engineering(ECE)</option>
                <option value="ETE">Electronics & Telecommunication Engineering(ETE)</option>
                
                <option disabled>Faculty of Mechanical Engineering</option>
                <option value="ME">Mechanical Engineering(ME)</option>
                <option value="MTE">Mechatronics Engineering(MTE)</option>
                <option value="MSE">Materials Science & Engineering(MSE)</option>
                <option value="IPE">Industrial & Production Engineering(IPE)</option>
                <option value="CFPE">Chemical & Food Process Engineering(CFPE)</option>
                <option value="GCE">Glass & Ceramic Engineering(GCE)</option>

                <option disabled>Faculty of Civil Engineering</option>
                <option value="CE">Civil Engineering (CE)</option>
                <option value="BECM">Building Engineering & Construction Management (BECM)</option>
                <option value="URP">Urban & Regional Planning (URP)</option>
                <option value="Arch">Architecture (Arch.)</option>
        </select><br /><br />



        <input type="submit" value="Sign Up" className="signup" />
      </form>
    </div>
  );
};

export default TeacherRegistrationForm;
