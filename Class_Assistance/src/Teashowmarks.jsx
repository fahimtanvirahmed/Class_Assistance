import React, { useState } from 'react';
import './Css/SelectOption.css'
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherPanel = () => {
  const [department, setDepartment] = useState('CSE');
  const [series, setSeries] = useState('17');
  const [course, setCourse] = useState('cse 3101');
  const [teamarks, serTeamarks] = useState('');

  const navigate = useNavigate();
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/teashowmarks', { course,series,department });
      serTeamarks(response.data);
      navigate('/teashowmarks/result', { state: { teamarks: response.data } });
      console.log(teamarks)
   
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };
 

  return (
    <div className='selectopt'>
      <a className='total' href="AllResults.html" target="_blank">
        Click Here to See all result
      </a>
      <div className="CT-Marks">
        <form action="/ctmarks" method="post" onSubmit={handleSubmit}>
          <h1>&nbsp;&nbsp;&nbsp;&nbsp;CT Marks</h1>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            className="department"
            name="department"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option selected disabled></option>
            <option disabled>Faculty of Electrical &amp; Computer Engineering</option>
            <option value="CSE">Computer Science &amp; Engineering(CSE)</option>
            <option value="EEE">Electrical &amp; Electronic Engineering(EEE)</option>
            <option value="ECE">Electrical &amp; Computer Engineering(ECE)</option>
            <option value="ETE">Electronics &amp; Telecommunication Engineering(ETE)</option>
            <option disabled>Faculty of Mechanical Engineering</option>
            <option value="ME">Mechanical Engineering(ME)</option>
            <option value="MTE">Mechatronics Engineering(MTE)</option>
            <option value="MSE">Materials Science &amp; Engineering(MSE)</option>
            <option value="IPE">Industrial &amp; Production Engineering(IPE)</option>
            <option value="CFPE">Chemical &amp; Food Process Engineering(CFPE)</option>
            <option value="GCE">Glass &amp; Ceramic Engineering(GCE)</option>
            <option disabled>Faculty of Civil Engineering</option>
            <option value="CE">Civil Engineering (CE)</option>
            <option value="BECM">Building Engineering &amp; Construction Management (BECM)</option>
            <option value="URP">Urban &amp; Regional Planning (URP)</option>
            <option value="Arch">Architecture (Arch.)</option>
          </select>
          <br />
          <br />

          <label htmlFor="series">Series:</label>
          <select
            id="series"
            className="series"
            name="series"
            required
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          >
            <option selected disabled></option>
            <option value="17">17 series</option>
            <option value="18">18 series</option>
            <option value="19">19 series</option>
            <option value="20">20 series</option>
            <option value="21">21 series</option>
          </select>
          <br />
          <br />

          <label htmlFor="course">Course Title</label>
          <input
            type="text"
            className="course"
            id="course"
            name="course"
            placeholder="Enter Course Title"
            required
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <br />
          <br />


          <button type="submit">Get marks</button>


          {/* <input type="submit" value="Next" className="submit" onClick={onchange} /> */}
        </form>
      </div>
      <div>
      {/* {teamarks.length > 0 && (
       <table>
       <thead>
         <tr>
           <th>Roll</th>
           <th>CT1</th>
           <th>CT2</th>
           <th>CT3</th>
         </tr>
       </thead>
       <tbody>
         {teamarks.map((dataRow,index) => (
           <tr key={dataRow.roll + index}>
             <td>{dataRow.roll}</td>
             <td>{dataRow.ct1}</td>
             <td>{dataRow.ct2}</td>
             <td>{dataRow.ct3}</td>
           </tr>
         ))}
       </tbody>
     </table>
    )} */}
    </div>

    </div>
  );
};

export default TeacherPanel;
