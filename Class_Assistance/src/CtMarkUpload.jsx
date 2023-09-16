import React, { useEffect, useState } from 'react';
import './Css/CtMarkUpload.css'; // Import the CSS stylesheet
import axios from 'axios'
import { useLocation } from 'react-router-dom';
const YourComponent = () => {
 // { department, series, course,ctno }
  const [rollStart, setRollStart] = useState(1903001);
  const [tableData, setTableData] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  useEffect(() => {
    scrollDiv(rollStart);
  }, [rollStart]);
  const location = useLocation();
  const { department, series, course, ctno } = location.state;

  const handleInputChange = (index, value) => {
    // Update the inputValues state with the new value for the specified row
    setInputValues((prevInputValues) => {
      const newInputValues = [...prevInputValues];
      newInputValues[index] = value;
      return newInputValues;
    });
  };

  const changeScrollDiv = (value) => {
    if (value === "A") {
      setRollStart(1903001);
    } else if (value === "B") {
      setRollStart(1903061);
    } else if (value === "C") {
      setRollStart(1903121);
    }
  };

  const scrollDiv = (rollStart) => {
    let data = [];
    for (let i = 0; i < 3; i++) {
      const roll = rollStart.toString();
      const isEven = i % 2 === 0;
      const backgroundColor = isEven ? 'rgb(165, 243, 243)' : 'rgb(30, 126, 126)';
      // const inputField = <input className="input-field" type="number" />;
      const inputField = (
        <input
          className="input-field"
          type="number"
          value={inputValues[i]}
          onChange={(e) => handleInputChange(i, e.target.value)}
        />
      );
      
      data.push(
        <tr key={i} className="row" style={{ backgroundColor }}>
          <td>{roll}</td>
          <td>{inputField}</td>
        </tr>
      );
      rollStart = rollStart + 1;
    }
    setTableData(data);
  
  
  };
  const insertDataToDatabase = (data) => {
    axios.post('http://localhost:3000/ctmarkupload', data)
      .then((response) => {
        alert
        ('Ct mark uploaded')
        console.log('Data inserted successfully');
      })
      .catch((error) => {
        alert('error occured')
        console.error('Error inserting data:', error);
      });
  };
  
  const handleFormSubmit = () => {
    console.log(department);
    console.log(ctno);
    console.log(series);
    const inputData = tableData.map((row, index) => ({
      roll: (rollStart + index).toString(),
      marks: inputValues[index],
     

    }));
    const finalInputData = inputData.map((data) => ({
      ...data,
      department,
      ctno,
      course,
      series,

    }));
    insertDataToDatabase(finalInputData);
    
  };
  
  // const handleKeyDown = (event, index) => {
  //   if (event.keyCode === 'Enter') {
  //     event.preventDefault();
  //     const nextIndex = index + 1;
  //     const inputFields = document.querySelectorAll('.input-field');
  //     if (nextIndex < inputFields.length) {
  //       inputFields[nextIndex].focus();
  //     }
  //   }
  // };

  return (

    <div className='Ctmarkupl'>
        <select onChange={(e) => changeScrollDiv(e.target.value)}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
      <table>
        <thead>
          <tr style={{ backgroundColor: 'rgb(30, 126, 126)' }}>
            <th>Roll</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody id="table">{tableData}</tbody>
      </table>

      <button onClick={handleFormSubmit}>Submit</button>

      

      {/* Enter-key next textbox */}
      
      {/* {tableData.length > 0 &&
        tableData.map((_, index) => (
          // <input
          //   key={index}
          //   className="input-field"
          //   type="number"
            onKeyDown={(event) => handleKeyDown(event, index)}
          // />
        ))} */}
    


   {/* <button onClick={handleFormSubmit}>Submit</button> */}

    </div>
 
  );
};


export default YourComponent;
