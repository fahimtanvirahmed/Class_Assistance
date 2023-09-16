import React, { useEffect, useState } from 'react';
import axios from 'axios';




function DisplayRoutine() {
  const [routineData, setRoutineData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch routine data from the backend
    axios.get('http://localhost:3000/getroutines')
      .then(response => {
        setRoutineData(response.data);
      })
      .catch(error => {
        console.error('Error fetching routine data:', error);
      });
  }, []);

  // ... previous code ...

const downloadRoutinePDF = () => {
  axios
    .post('http://localhost:3000/showroutine', routineData, {
      responseType: 'blob', // Set the response type to blob
    })
    .then((response) => {
      // Create a Blob object from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a temporary URL for the Blob object
      const url = window.URL.createObjectURL(blob);

      // Create a link element to initiate the file download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'routine.pdf'; // Change the filename as needed
      link.click();

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error downloading PDF:', error);
    });
};




 
  

  // Render the routine data in a table or any desired format
  // const renderRoutineTable = () => {
  //   // Map over routineData and create table rows
  //   return routineData.map(routine => (
  //     <tr key={routine.routine_id}>
  //       <td>{routine.time}</td>
  //       <td>{routine.saturday}</td>
  //       <td>{routine.sunday}</td>
  //       <td>{routine.monday}</td>
  //       <td>{routine.tuesday}</td>
  //       <td>{routine.wednesday}</td>
  //     </tr>
  //   ));
  // };
  const renderRoutineTable = () => {
    // Map over routineData and create table rows
    return routineData.map(routine => (
      <tr key={routine.routine_id}>
        <td>{routine.time}</td>
        <td style={{ whiteSpace: 'pre-line' }}>{routine.saturday}</td>
        <td style={{ whiteSpace: 'pre-line' }}>{routine.sunday}</td>
        <td style={{ whiteSpace: 'pre-line' }}>{routine.monday}</td>
        <td style={{ whiteSpace: 'pre-line' }}>{routine.tuesday}</td>
        <td style={{ whiteSpace: 'pre-line' }}>{routine.wednesday}</td>
      </tr>
    ));
  };
  

  return (
    <div>
      <h1>Weekly Routine</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Saturday</th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
          </tr>
        </thead>
        <tbody>
          {renderRoutineTable()}
        </tbody>
      </table>
      

<button onClick={downloadRoutinePDF}>Download Routine as PDF</button>
    </div>
  );
}

export default DisplayRoutine;
