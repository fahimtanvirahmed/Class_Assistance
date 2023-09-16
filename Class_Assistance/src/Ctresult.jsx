// ResultPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { teamarks } = location.state;
  console.log(teamarks)

  // Group the teamarks data by roll number and calculate CT marks for each roll
  const rolledMarks = teamarks.reduce((result, dataRow) => {
    console.log("result")
    console.log(result)
    console.log("datarow")
    console.log(dataRow)
    
    const existingRoll = result.find((row) => row.roll === dataRow.roll);
    if (!existingRoll) {
      result.push({
        roll: dataRow.roll,
        ct1: dataRow.ctno === 'ct1' ? dataRow.marks : '-',
        ct2: dataRow.ctno === 'ct2' ? dataRow.marks : '-',
        ct3: dataRow.ctno === 'ct3' ? dataRow.marks : '-',
      });
    } else {
      if (dataRow.ctno === 'ct1') {
        existingRoll.ct1 = dataRow.marks;
      } else if (dataRow.ctno === 'ct2') {
        existingRoll.ct2 = dataRow.marks;
      } else if (dataRow.ctno === 'ct3') {
        existingRoll.ct3 = dataRow.marks;
      }
    }
    return result;
  }, []);

  return (
    <div>
      <h1>CT Marks Result</h1>
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
          {rolledMarks.map((dataRow) => (
            <tr key={dataRow.roll}>
              <td>{dataRow.roll}</td>
              <td>{dataRow.ct1}</td>
              <td>{dataRow.ct2}</td>
              <td>{dataRow.ct3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultPage;
