
import React, { useState } from 'react';
import axios from 'axios';
import './Css/Stdattendence.css';
const AttendanceForm = () => {
  const [roll, setRoll] = useState('1903001');
  const [course, setCourse] = useState('cse 3105');
  const [attendanceData, setAttendanceData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/stdattendence', { roll, course });
      setAttendanceData(response.data);
      console.log(attendanceData)
      {attendanceData.map((attendance, index) => (      
          console.log(attendance.attendance)
        
      ))}
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  return (
    <div className='stdattend'>
      <form onSubmit={handleSubmit}>
      <label htmlFor="CT no.">Roll no: </label>
        <input
          type="number"
          placeholder="Enter Roll Number"
          className='ctno1'
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <br />
      <label htmlFor="CT no.">Course no: </label>

        <input
          type="text"
          className='department1'
          placeholder="Enter Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button type="submit" classname="sub">Get Attendance</button>
      </form>

      {/* {attendanceData && (
        <div>
          
          <h2>Attendance for Roll {roll} and Course {course}:</h2>
          <ul>
            {attendanceData.map((attendance, index) => (
              <li key={index}>
                
                day:{attendance.day} Attendance: {attendance.attendance}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {attendanceData && (
        <div>
          <h2>Attendance for Roll {roll} and Course {course}:</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance, index) => (
                <tr key={index}>
                  <td>{attendance.day}</td>
                  <td>{attendance.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceForm;
