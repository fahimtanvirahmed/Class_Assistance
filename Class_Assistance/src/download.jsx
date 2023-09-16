

import React, { useState } from 'react';
import axios from 'axios';
const YourComponent = () => {
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');


  // ... Rest of the code ...

  // Add functions to handle changes in department, course, and section selections
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };
  const requestData = {
    department: department,
    course: course,
    // Add any other data needed in the request body
  };
 

  const handleDownload = () => {
    // axios
    //   .get('http://localhost:3000/', {
    //     responseType: 'blob', // Set the response type to blob
    //   })
    // axios
    // .post('http://localhost:3000/', {
    //   department: department,
    //   course: course,
      
    // })
   

    axios
      .post('http://localhost:3000/download', requestData, {
        responseType: 'blob', // Set the response type to blob
      })
      .then((response) => {
        console.log(response.data)
        // Create a Blob object from the response data
        const blob = new Blob([response.data], { type: 'application/pdf' });

        // Create a temporary URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element to initiate the file download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'datas.pdf';
        link.click();

        // Clean up the temporary URL
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };

  return (
    <div>
      <label htmlFor="department">Department:</label>
      <select id="department" value={department} onChange={handleDepartmentChange}>
     
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
        

      </select>
      <br />

      <label htmlFor="course">Course:</label>
      <select id="course" value={course} onChange={handleCourseChange}>
      <option selected disabled></option>
          <option disabled>Faculty of Electrical & Computer Engineering</option>
          <option value="cse 3101">Computer Science & Engineering(CSE)</option>

      </select>
      <br />

      <br />

      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default YourComponent;