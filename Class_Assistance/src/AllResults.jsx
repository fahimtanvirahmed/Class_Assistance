import React, { useEffect, useState } from 'react';
import './Css/AllResults.css'; // Import the CSS stylesheet

function AllResults() {
  const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('/ct_data');
//       const responseData = await response.json();
//       setData(responseData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="6">CT MARKS</th>
          </tr>
          <tr>
            <th>Department</th>
            <th>Series</th>
            <th>Course</th>
            <th>CT No.</th>
            <th>Roll</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((row, index) => (
            <tr key={index}>
              <td>{row.department}</td>
              <td>{row.series}</td>
              <td>{row.course}</td>
              <td>{row.ctno}</td>
              <td>{row.roll}</td>
              <td>{row.marks}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default AllResults;
