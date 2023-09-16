import React, { useState } from 'react';
import axios from 'axios'; // Add this line to import Axios
import './Css/CTresultbySearch.css'; // Import the CSS stylesheet
import './Css/index.css'; // Import the CSS stylesheet

function CTResultBySearch() {
  const [roll, setRoll] = useState('1903001');
  const [course, setCourse] = useState('cse 3101');
  const [ctno, setCtno] = useState('');
  const [result, setResult] = useState('cv');
  const [error, setError] = useState(false);
  const [className, setclassName] = useState(null);
  

  const handleSubmit = async (e) => {
    if(className)
    setclassName(null)
    else
   setclassName("active-popup");
    e.preventDefault();
    console.log('djf');

    try {
      const response = await axios.post('http://localhost:3000/ctresultbysearch', {
        roll: roll,
        course: course,
        ctno: ctno
      });
      
      
      const data = response.data;
      console.log(data);
      if (data.error) {
        setError(data.error);
        setResult('');
      } else {
        setResult(
          <p>
            Course Title: {data.course}<br />
            Ct No: {data.ctno}<br />
            Roll: {data.roll}<br />
            Marks: {data.marks}
          </p>
        );
        setError(false);
      }
    } catch (error) {
      setError(true);
      setResult('');
    }
  };
  const onChange =  () => {

    if(className)
    setclassName(null)
    else
   setclassName("active-popup");
  
 }
    
  const existingClass="result";

  return (
    
    <div className="Ctresultby1">
    <div className="Searchbox">
      <h1 className="head">Get Your CT marks</h1>
      <form id="search-form" onSubmit={handleSubmit}>
        <label htmlFor="roll">Roll Number</label>
        <input type="number" id="roll" name="roll" value={roll} onChange={(e) => setRoll(e.target.value)} required /><br /><br />
        <label htmlFor="course">Course Title</label>
        <input type="text" id="course" name="course" value={course} onChange={(e) => setCourse(e.target.value)} required /><br /><br />
        <label htmlFor="ctno">Select Ct no.</label>
        <select id="ctselect" className="ctselect" value={ctno} onChange={(e) => setCtno(e.target.value)} required>
          <option value="ct1">CT-1</option>
          <option value="ct2">CT-2</option>
          <option value="ct3">CT-3</option>
          <option value="ct4">CT-4</option>
        </select>
        <button type="submit" className="searchbtn" onClick={handleSubmit}>Search</button>
      </form>

      <div id="result" className={`${existingClass} ${className}`}>
        {error ? <p>"Not Uploaded yet"</p> : result}
      </div>
    </div>
    </div>
  );
}

export default CTResultBySearch;
