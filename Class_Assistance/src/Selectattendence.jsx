import React, { useState } from 'react';
import './Css/SelectOption.css'
import Attendence from './Attendence'
import {Link, useNavigate } from 'react-router-dom';
const TeacherPanel = () => {
  const [department, setDepartment] = useState('');
  const [series, setSeries] = useState('');
  const [section, setSection] = useState('');
  const [marks, setMarks] = useState('');
  const [day, setDay] = useState('');
  const [course, setCourse] = useState('');
  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  const clearInput = (target) => {
    if (target.value === 'clear input') {
      target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const onchange = (e) => {

    setActive(true);
    // Handle form submission logic here
  };
  //   if(active)
  // {
  //   return(
  //     <CtMarkUpload department={department}series={series}roll={series}marks={marks}course={course}/>
  //   )
  // }
  if (active) {
    navigate('/attendence', {
      state: {
        department,
        series,
        course,
        section,
        day
      },
    });
  }

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

          <label htmlFor="CT no.">Section</label>
          <select
            id="ctno"
            className="ctno"
            name="ctno"
            required
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option selected disabled></option>
            <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
          </select>
          <br />
          <br />
          <label htmlFor="course">Day</label>
          <input
            type="number"
            className="course"
            id="day"
            name="day"
            placeholder="Enter day no"
            required
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <br />
          <br />



          <input type="submit" value="Next" className="submit" onClick={onchange} />
        </form>
      </div>
    </div>
  );
};

export default TeacherPanel;
