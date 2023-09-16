import React, { useState } from 'react';
import './Css/StudentLoginForm.css';
import './Css/index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLoginForm = ({ className }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Get the navigate function
 
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the form data
    const formData = {
      email,
      password,
     
    };


    

    // Make the POST request to the server
    axios.post('http://localhost:3000/stdlogin', formData)
      .then((response) => {
        if (response.data.success) {
          console.log('Student login successful');
          // Perform actions for successful login, such as redirecting to a new page
            
          setEmail('');
          setPassword('');
          setIsLoggedIn(true); 
          navigate('/stdpanel'); // Use navigate to navigate to a new page
          //window.location.href = '/stdpanel';
          
        }
        else {
          console.log('Student login failed:', response.data.message);
          // Handle error condition, show an error message, etc.
        }
     
 
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };
  const existingClass = 'studentloginform';

  return (
    <div className=
    {`${existingClass} ${className}`}>
      <h1>Student Login</h1>
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

export default StudentLoginForm;
