const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASS,
      database: process.env.DB_HOST
    },
    console.log(`Connected to the employeeTracker_db database.`)
  );

  module.exports = db