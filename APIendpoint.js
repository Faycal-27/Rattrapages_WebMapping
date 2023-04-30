const express = require('express');
const mysql = require('mysql');
const app = express();

// Connection to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
});

// Define endpoints
app.get('/surface-density', (req, res) => {
  const query = 'SELECT COUNT(*) / SUM(surf_tot) as density FROM shops';
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json({density: result[0].density});
  });
});

app.get('/density-population', (req, res) => {
  const query = 'SELECT COUNT(*) / population as density FROM neighborhoods';
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json({density: result[0].density});
  });
});

app.get('/density-no-website', (req, res) => {
  const query = `SELECT COUNT(*) / (SELECT COUNT(*) FROM shops WHERE website IS NULL) as density 
                 FROM shops 
                 WHERE website IS NULL`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.json({density: result[0].density});
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
