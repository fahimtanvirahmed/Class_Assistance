// const express = require('express');
import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createObjectCsvWriter } from 'csv-writer';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { PDFDocument, rgb } from 'pdf-lib'





// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const app = express();
// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

const query = 'SELECT * FROM marks';

// Path to save the CSV file
// const csvFilePath = __dirname+'/data.csv';
const csvFilePath = `${__dirname}\\data.csv`;
console.log(csvFilePath);

// MySQL connection Code
const connection = mysql.createConnection({
  host: 'localhost', // Replace with MySQL host
  user: 'root', // Replace with MySQL username
  password: '', // Replace with MySQL password
  port: "3308",
   database: 'vite', // Replace with MySQL database name
});

// Connection to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});




app.post('/stdreg', (req, res) => {
  const { name, email, password, department, series, roll } = req.body; // Extract form data from request body
  // Insert form data into MySQL
  const sql = 'INSERT INTO student (name, email, password, department, series, roll) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, email, password, department, series, roll], (err, result) => {
    if (err) {
      console.error('Error occurred while inserting data:', err);
      return;
    }
    console.log('Student Data inserted into database:', result);

    // Send response to client
    res.redirect(req.get('referer') + '?response=Submitted.');
  });
});

// `SELECT * FROM student WHERE email = ? AND password = ?`
//Login for Student
app.post('/stdlogin', (req, res) => {
  const { email, password } = req.body;

  const query =`SELECT * FROM student WHERE email = ? AND password = ?`;

  connection.query(query, [email, password], (err, result) => {
      if (err) {
          console.log('Error occured while fetching data:', err);
          return;
      }
      if (result.length > 0) {
        console.log('Student Loginn Successful.', result);
        //  res.redirect('/stdpanel');
        res.json({ success: true }); // Send success respons
      } else {
        console.log('Student Login failed.', result);
          res.redirect(req.get('referer') + '?response=Invalid email or password');
      }
  });
});

//ct mark  upload
app.post('/ctmarkupload', (req, res) => {
  const data = req.body;
  console.log(data);

  // const query = 'INSERT INTO marks(roll,marks,department,course,series,ctno) VALUES ?';
  // const values = data.map((row) => [row.roll, row.marks,row.department,row.course,row.series,row.ctno]);
  const query = 'INSERT INTO marks(roll, marks, department, ctno, course, series) VALUES ?';
  const values = data.map((row) => [
    row.roll,
    row.marks,
    row.department,
    row.ctno,
    row.course,
    row.series
  ]);
  connection.query(query, [values], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Failed to insert data' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  });
});

// API endpoint to insert attendance data
app.post('/attendence', (req, res) => {
  const dataToInsert = req.body;
  console.log(dataToInsert)
  const sql = 'INSERT INTO attend (roll, attendance,day,department, section, course, series) VALUES ?';
  const values = dataToInsert.map((row) => [
    row.roll, 
    row.attendance,
    row.day,
    row.department,
    row.section,
    row.course,
    row.series
   ]);

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }
  });
});

app.post('/stdattendence', (req, res) => {
  const { roll, course } = req.body;
  const sql = 'SELECT day,attendance FROM attend WHERE roll = ? AND course = ?';
  connection.query(sql, [roll, course], (err, result) => {
    if (err) {
      console.error('Error fetching attendance data from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(result)
      res.json(result);
    }
  });
});

app.post('/teaattendence', (req, res) => {
  const { course, series, section, department } = req.body;
  const sql = 'SELECT roll,sum(attendance) as t FROM attend WHERE course = ? AND series = ? AND section = ? AND department = ? group by roll';
  connection.query(sql, [course, series, section, department], (err, result) => {
    if (err) {
      console.error('Error fetching attendance data from the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log(result)
      res.json(result);
    }
  });
});


/// Route to generate PDF file
app.post('/download', (req, res) => {
  const { department, course} = req.body;
  console.log(department)
  console.log(course)

  // Fetch data from MySQL database based on department, course, and section
  const query = `SELECT roll, marks FROM marks WHERE department='${department}' AND course='${course}' `;
  //const query = `SELECT roll, marks FROM marks WHERE department='ME' AND course='cse 3101' `;
  connection.query(query, (err, results) => {
    console.log(results)
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
      return;
    }

    // Generate PDF using pdfkit
    const doc = new PDFDocument();
    doc.pipe(res); // Pipe the PDF document to the response

    // Write data to the PDF
    results.forEach((row) => {
      console.log(`Roll: ${row.roll}, Marks: ${row.marks}`);
      doc.text(`Roll: ${row.roll}, Marks: ${row.marks}`);
      // console.log(doc)
    });

    doc.end(); // Finalize the PDF document

    // Set response headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="datas.pdf"');
  });
});




  
app.post('/ctresultbysearch', (req, res) => {
  const { roll, course, ctno } = req.body;
  console.log('fasdfsd')
  
  const sqlQuery = `SELECT * FROM marks WHERE roll=${roll} AND course='${course}' AND ctno='${ctno}'`;
  
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.json({ error: 'An error occurred during the search.' });
      return;
    }

    if (results.length === 0) {
      res.json({ error: 'No data found for the provided search criteria.' });
    } else {
      res.json(results[0]);
    }
  });
});


app.post('/teashowmarks', (req, res) => {
  const {  course, series,department } = req.body;
  console.log(department)
  console.log(series)
  console.log(course)

  // Fetch data for ct1
  const ctno1 = 'ct1';
  const sql1 = 'SELECT roll, marks AS ct1 FROM marks WHERE department = ? AND course = ? AND series = ? AND ctno = ?';
  connection.query(sql1, [department, course, series, ctno1], (err1, result1) => {
    if (err1) {
      console.error('Error fetching ct1 data from the database:', err1);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Fetch data for ct2
      console.log(result1)
      const ctno2 = 'ct2';
      const sql2 = 'SELECT roll, marks AS ct2 FROM marks WHERE department = ? AND course = ? AND series = ? AND ctno = ?';
      connection.query(sql2, [department, course, series, ctno2], (err2, result2) => {
        if (err2) {
          console.error('Error fetching ct2 data from the database:', err2);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Fetch data for ct3
          const ctno3 = 'ct3';
          const sql3 = 'SELECT roll, marks AS ct3 FROM marks WHERE department = ? AND course = ? AND series = ? AND ctno = ?';
          connection.query(sql3, [department, course, series, ctno3], (err3, result3) => {
            if (err3) {
              console.error('Error fetching ct3 data from the database:', err3);
              res.status(500).json({ error: 'Internal Server Error' });
            } 
            
            else {
              
              // Combine the data from ct1, ct2, and ct3
              const combinedData = [...result1, ...result2, ...result3];
              console.log(combinedData)
              res.json(combinedData);
            }
          });
        }
      });
    }
  });
});


// API endpoint to save routine
app.post('/classroutine', (req, res) => {
  const routineData = req.body; // Assuming the request body contains routine data
  console.log(routineData)
  routineData.map(data => [
    console.log(data.time),
    console.log(data.saturday)
  ]);

// console.log(routineData)

  // Convert routineData into an array of values for bulk insert
  const routineValues = routineData.map(data => [
    data.time,
    data.saturday,
    data.sunday,
    data.monday,
    data.tuesday,
    data.wednesday
  ]);
  console.log(routineValues)
 

  // Bulk insert routine data into MySQL
  const query = 'INSERT INTO routines (time, saturday, sunday, monday, tuesday, wednesday) VALUES ?';
  connection.query(query, [routineValues], (error, results) => {
    if (error) {
      console.error('Error saving routine:', error);
      res.status(500).send('Error saving routine');
    } else {
      console.log('Routine saved successfully');
      res.status(200).send('Routine saved successfully');
    }
  });
});


app.get('/getroutines', (req, res) => {
  // Define an SQL query to select all routines from the database
  const query = 'SELECT * FROM routines';

  // Execute the query to retrieve routine data from the database
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching routines:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Send the retrieved routine data as a JSON response
      res.status(200).json(results);
    }
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
