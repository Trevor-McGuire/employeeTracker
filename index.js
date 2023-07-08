const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql');

const { v4: uuidv4 } = require('uuid');
uuidv4()

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
const AddEmployee = async () => {
  await inquirer
  .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee\'s first name?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee\'s last name?',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is their role?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is their manager?',
    },
  ])
  .then((response) => {
    var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}')`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    viewAllEmployees()
  })
  
}
const UpdateEmployeeWorkRole = () => {
  connection.query('SELECT * FROM employee ORDER BY last_name', (err, rows) => {
    const employeeArray = []
    rows.forEach(e => employeeArray.push(`${e.last_name}, ${e.first_name}`));
    console.log(employeeArray)
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'What employee needs their work role changed?',
        choices: employeeArray
      },
    ])
    .then((response) => {
      console.log(response.employee,"asdf")
    })
    // startInquire()
  })
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
  