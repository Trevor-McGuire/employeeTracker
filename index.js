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
const startInquire = () => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: actionArray
    },
  ])
  .then((response) => {
    console.log("\n")
    // takes index value of prompt and calls a specific function
    switch (actionArray.indexOf(response.action)) {
      case 0:viewAllEmployees();break;
      case 1:AddEmployee();break;
      case 2:UpdateEmployeeWorkRole();break;
      case 3:ViewAllWorkRoles();break;
      case 4:AddWorkRole();break;
      case 5:ViewAllDepartments();break;
      case 6:AddDepartment();break;
    }
  })
}
startInquire()
// select, order, and print all employee last and first names to console
const viewAllEmployees = () => {
  connection.query('SELECT * FROM employee ORDER BY last_name', (err, rows) => {
    console.log(rows.forEach(e => console.log(`${e.last_name}, ${e.first_name}`)));
    startInquire()
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
  connection.query('SELECT * FROM work_role ORDER BY title', (err, rows) => {
    console.log(rows.forEach(e => console.log(e.title)));
    startInquire()
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
  connection.query('SELECT * FROM department ORDER BY department_name', (err, rows) => {
    console.log(rows.forEach(e => console.log(e.department_name)));
    startInquire()
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
  