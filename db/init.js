const mysql = require('mysql2');
const fs = require('fs')

require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const sql = fs.readFileSync('./db/schema.sql').toString();

connection.query(
  sql,
  function(err, results, fields) {
    if (err) throw err
    console.log("employeetrack_db init")
  }
);

connection.end();