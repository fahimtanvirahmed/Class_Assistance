import React, { useEffect, useState } from 'react';
import './Css/Attendence.css'; // Import the CSS stylesheet
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const YourComponent = () => {
  const [rollStart, setRollStart] = useState(1903001);
  const [tableData, setTableData] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // useEffect(() => {
  //   scrollDiv(rollStart);
  // }, [rollStart]);
 

  const location = useLocation();
  const { department, series, course, section,day } = location.state;
  console.log(department);
  console.log(series);
  console.log(section);
  console.log(course);

  const handleInputChange = (index, checked) => {
    // Update the attendance state with the new value for the specified row
    setAttendance((prevAttendance) => {
      const newAttendance = [...prevAttendance];
      newAttendance[index] = checked ? 1 : 0;
      // newAttendance[index] = checked;
      return newAttendance;
    });
  };

  useEffect(() => {
    setRollStart((prevRollStart) => {
      switch (section) {
        case 'A':
          resetAttendance(1903001);
          return 1903001;
        case 'B':
          resetAttendance(1903061);
          return 1903061;
        case 'C':
          resetAttendance(1903121);
          return 1903121;
        default:
          return prevRollStart;
      }
    });
  }, [section]);

  const resetAttendance = (start) => {
    const initialAttendance = [];
    for (let i = 0; i < 3; i++) {
      initialAttendance.push(false);
    }
    setAttendance(initialAttendance);
    scrollDiv(start);
  };


  // const changeScrollDiv = (value) => {
  //   console.log(value)
  //   console.log(section)
   
  //   if (value === 'A') {
  //     setRollStart(1903001);
  //   } else if (value === 'B') {
  //     setRollStart(1903061);
  //   } else if (value === 'C') {
  //     setRollStart(1903121);
  //   }
  //   console.log(rollStart)
   
    
  // };
 

  const handleFormSubmit = () => {
    console.log(rollStart)
    console.log(department);
    console.log(course);
    console.log(series);
    console.log(section);
    const dataToInsert = tableData.map((row, index) => ({
      roll: (rollStart + index).toString(),
      attendance: attendance[index],
    }));
    // Call your API or database insertion function here with dataToInsert
    // Example: insertDataToDatabase(dataToInsert);
   // console.log(dataToInsert);
    const finalInputData = dataToInsert.map((data) => ({
      ...data,
      department,
      section,
      course,
      series,
      day,

    }));
    insertDataToDatabase(finalInputData);

    //insertDataToDatabase(dataToInsert);
  };


  //  // Send the data to your backend API endpoint
  const insertDataToDatabase = (data) => {
   axios.post('http://localhost:3000/attendence', data)
   .then((response) => {
     console.log('Data inserted successfully');
   })
   .catch((error) => {
     console.error('Error inserting data:', error);
   });
  };

  const scrollDiv = (rollStart) => {
    const data = [];
    const initialAttendance = [];
    for (let i = 0; i < 3; i++) {
      initialAttendance.push(0);
      const roll = rollStart.toString();
      const isEven = i % 2 === 0;
      const backgroundColor = isEven ? 'rgb(165, 243, 243)' : 'rgb(30, 126, 126)';

      data.push(
        <tr key={i} className="row" style={{ backgroundColor }}>
          <td>{roll}</td>
          <td>
            <input
              className="input-field"
              type="checkbox"
              checked={attendance[i]}

              // onChange={(e) => handleInputChange(i, e.target.checked)}
              onChange={() => handleInputChange(index, !attendance[i])}
            />
          </td>
        </tr>
      );
      rollStart = rollStart + 1;
    }
    setTableData(data);
    

  setAttendance(initialAttendance);
  };

  return (
    <div className="Ctmarkupl">
      {/* <select onChange={(e) => changeScrollDiv(e.target.value)}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select> */}
      <table>
        <thead>
          <tr style={{ backgroundColor: 'rgb(30, 126, 126)' }}>
            <th>Roll</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody id="table">{tableData}</tbody>
      </table>
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default YourComponent;
