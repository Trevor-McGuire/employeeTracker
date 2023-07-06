const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fabbom-huvrov-waxze5',
  database: 'employeetrack_db'
});

const actionArray = [
  "View all employees",
  "Add employee",
  "Update employee work role",
  "View all work roles",
  "Add work role",
  "View all departments",
  "Add department"
]

console.info(`

███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝

████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░
╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗
░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝
░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗
░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║
░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝

`)
inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: actionArray
    },
  ])
  .then( function(response) {
    const actionInt = actionArray.indexOf(response.action)
    const actionVal = response.action
    console.info(`Action Choosen: ${actionVal} (${actionInt})`)
    switch (actionInt) {
      case 0:viewAllEmployees();break;
      case 1:AddEmployee();break;
      case 2:UpdateEmployeeWorkRole();break;
      case 3:ViewAllWorkRoles();break;
      case 4:AddWorkRole();break;
      case 5:ViewAllDepartments();break;
      case 6:AddDepartment();break;
    }
  })

  const viewAllEmployees = () => {
    connection.query('SELECT * FROM employee ORDER BY last_name', (err, rows) => {
      console.log(Object.keys(rows[0]));
      console.log(rows.forEach(e => console.log(`${e.last_name}, ${e.first_name}`)));
    });
  }
  const AddEmployee = () => {
    console.info("AddEmployee()")
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
      });
    });
  }
  const UpdateEmployeeWorkRole = () => {
    console.info("UpdateEmployeeWorkRole()")
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
      });
    });
  }
  const ViewAllWorkRoles = () => {
    console.info("ViewAllWorkRoles()")
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
      });
    });
  }
  const AddWorkRole = () => {
    console.info("AddWorkRole()")
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
      });
    });
  }
  const ViewAllDepartments = () => {
    console.info("ViewAllDepartments()")
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
      });
    });
  }
  const AddDepartment = () => {
    console.info("AddDepartment()")
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
      connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
      });
    });
  }
  