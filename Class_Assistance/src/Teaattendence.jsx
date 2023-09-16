import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Css/SelectOption.css';
// import jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const AttendanceForm = () => {
  // ... your existing code ...
  const [course, setCourse] = useState('');
    const [series, setSeries] = useState('');
    const [section, setSection] = useState('');
    const [department, setDepartment] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsButtonClicked(true);
      try {
        const response = await axios.post('http://localhost:3000/teaattendence', { course, series, section, department });
        setAttendanceData(response.data);
       
  
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };
  

  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Generate the table data as a string
    const tableData = attendanceData.map((attendance, index) => [
      attendance.roll,
      attendance.t,
    ]);

    // Set the table column headers
    const headers = [['Roll', 'Attendance']];

    // Set the table options
    const options = {
      startY: 50, // Y position for the first row
    };

    // Add the table to the PDF document
    doc.autoTable({
      head: headers,
      body: tableData,
      ...options,
    });

    // Save the PDF
    doc.save('attendance.pdf');
  };

  return (
    <div>
     
      <form onSubmit={handleSubmit}>
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

      <button type="submit">Get Attendance</button>
      </form>
      <button onClick={handleDownloadPDF}>Download PDF</button>

      {/* The table */}
      {attendanceData.length > 0 && (
        <div ref={pdfRef}>
          Total attendence of  a roll
<table>
  <thead>
    <tr>
      <th>Roll</th>
      <th>Attendance</th>
    </tr>
  </thead>
  <tbody>
    {attendanceData.map((attendance, index) => (
      <tr key={index}>
        <td>{attendance.roll}</td>
        <td>{attendance.t}</td>
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





// import React, { useState } from 'react';
// import axios from 'axios';
// import './Css/SelectOption.css'
// const AttendanceForm = () => {
//   const [course, setCourse] = useState('');
//   const [series, setSeries] = useState('');
//   const [section, setSection] = useState('');
//   const [department, setDepartment] = useState('');
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [isButtonClicked, setIsButtonClicked] = useState(false);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsButtonClicked(true);
//     try {
//       const response = await axios.post('http://localhost:3000/teaattendence', { course, series, section, department });
//       setAttendanceData(response.data);
     

//     } catch (error) {
//       console.error('Error fetching attendance data:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
      // <label htmlFor="department">Department:</label>
      //     <select
      //       id="department"
      //       className="department"
      //       name="department"
      //       required
      //       value={department}
      //       onChange={(e) => setDepartment(e.target.value)}
      //     >
      //       <option selected disabled></option>
      //       <option disabled>Faculty of Electrical &amp; Computer Engineering</option>
      //       <option value="CSE">Computer Science &amp; Engineering(CSE)</option>
      //       <option value="EEE">Electrical &amp; Electronic Engineering(EEE)</option>
      //       <option value="ECE">Electrical &amp; Computer Engineering(ECE)</option>
      //       <option value="ETE">Electronics &amp; Telecommunication Engineering(ETE)</option>
      //       <option disabled>Faculty of Mechanical Engineering</option>
      //       <option value="ME">Mechanical Engineering(ME)</option>
      //       <option value="MTE">Mechatronics Engineering(MTE)</option>
      //       <option value="MSE">Materials Science &amp; Engineering(MSE)</option>
      //       <option value="IPE">Industrial &amp; Production Engineering(IPE)</option>
      //       <option value="CFPE">Chemical &amp; Food Process Engineering(CFPE)</option>
      //       <option value="GCE">Glass &amp; Ceramic Engineering(GCE)</option>
      //       <option disabled>Faculty of Civil Engineering</option>
      //       <option value="CE">Civil Engineering (CE)</option>
      //       <option value="BECM">Building Engineering &amp; Construction Management (BECM)</option>
      //       <option value="URP">Urban &amp; Regional Planning (URP)</option>
      //       <option value="Arch">Architecture (Arch.)</option>
      //     </select>
        //   <br />
        //   <br />

        //   <label htmlFor="series">Series:</label>
        //   <select
        //     id="series"
        //     className="series"
        //     name="series"
        //     required
        //     value={series}
        //     onChange={(e) => setSeries(e.target.value)}
        //   >
        //     <option selected disabled></option>
        //     <option value="17">17 series</option>
        //     <option value="18">18 series</option>
        //     <option value="19">19 series</option>
        //     <option value="20">20 series</option>
        //     <option value="21">21 series</option>
        //   </select>
        //   <br />
        //   <br />

        //   <label htmlFor="course">Course Title</label>
        //   <input
        //     type="text"
        //     className="course"
        //     id="course"
        //     name="course"
        //     placeholder="Enter Course Title"
        //     required
        //     value={course}
        //     onChange={(e) => setCourse(e.target.value)}
        //   />
          
        //   <br />
        //   <br />

        //   <label htmlFor="CT no.">Section</label>
        //   <select
        //     id="ctno"
        //     className="ctno"
        //     name="ctno"
        //     required
        //     value={section}
        //     onChange={(e) => setSection(e.target.value)}
        //   >
        //     <option selected disabled></option>
        //     <option value="A">A</option>
        // <option value="B">B</option>
        // <option value="C">C</option>
        //   </select>
        //   <br />
        //   <br />
//         <button type="submit">Get Attendance</button>
//       </form>

//       {attendanceData.length > 0 && (
//         <div>
//           <h2>Attendance for Course: {course}, Series: {series}, Section: {section}, Department: {department}</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Roll</th>
//                 <th>Attendance</th>
//               </tr>
//             </thead>
//             <tbody>
//             {attendanceData.map((attendance, index) => (
             
//               <tr key={index}>
//                <td>{attendance.roll}</td>
//                <td> {attendance.t}</td>
//               </tr>
//             ))}
//           </tbody>
//           </table>
//         </div>)
     
//       }
//        {isButtonClicked && attendanceData.length === 0 && (
//         <div style={{ color: "#de801c", margin: "23px", padding: "17px", backgroundColor: "green", borderRadius: '5px' }}>
//           <p>No data found.</p>
//         </div>
//       )}

   
//     </div>

//   );
// };

// export default AttendanceForm;
