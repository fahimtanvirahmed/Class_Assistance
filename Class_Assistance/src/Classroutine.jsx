import React, { useState } from 'react';
 import './Css/Classroutine.css';
import axios from 'axios';


function RoutineTable() {
  const [routine, setRoutine] = useState([]);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedRoutine = [...routine];
    if (!updatedRoutine[rowIndex]) {
      updatedRoutine[rowIndex] = [];
    }
    updatedRoutine[rowIndex][colIndex] = value;
    setRoutine(updatedRoutine);
    console.log(updatedRoutine)
  };

  const daysOfWeek = [ 'saturday', 'sunday','monday', 'tuesday', 'wednesday',];
  const timePeriods = ['8:00 AM', '9:00 AM', '10:00 AM', /* ... more time periods ... */];
//   const saveRoutine = () => {
//     // Prepare the routine data for sending
//     const routineData = timePeriods.map((time, rowIndex) => {
//       const dayData = daysOfWeek.map((day, colIndex) => routine[rowIndex]?.[colIndex] || '');
//       return { time, ...dayData };
//     });

    const saveRoutine = () => {
        // Prepare the routine data for sending
        const routineData = timePeriods.map((time, rowIndex) => {
          const dayData = daysOfWeek.map((day, colIndex) => routine[rowIndex]?.[colIndex] || '');
          return { time, saturday: dayData[0], sunday: dayData[1], monday: dayData[2], tuesday: dayData[3], wednesday: dayData[4] };
        });


    // Send a POST request to the backend
    // axios.post('http://localhost:3000/classroutine', routineData)
    axios.post('http://localhost:3000/classroutine', routineData, {
        headers: {
          'Content-Type': 'application/json' // Set the content type header
        }
      })
      .then(response => {
        console.log(routineData)
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error saving routine:', error);
      });
  };



  const renderTable = () => {
    return (
      <table className="routine-table">
        <thead>
          <tr>
            <th>Time</th>
            {daysOfWeek.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {timePeriods.map((time, rowIndex) => (
            <tr key={time}>
              <td>{time}</td>
              {daysOfWeek.map((day, colIndex) => (
                <td key={day}>
                  {/* <input
                    type="text"
                    value={routine[rowIndex]?.[colIndex] || ''}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  /> */}
                  <textarea
                    value={routine[rowIndex]?.[colIndex] || ''}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    rows={4} // Adjust the number of rows as needed
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="routine-container">
      <h1>Weekly Routine</h1>
      {renderTable()}
      <button onClick={saveRoutine}>Save Routine</button>
      
    </div>
  );
}

export default RoutineTable;

