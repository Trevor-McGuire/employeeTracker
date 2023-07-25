const inquirer = require('inquirer')
const mysql = require('mysql2');

require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

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

function start() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        "View All Departments",
        "View All Employees",
        "View All Roles",
      ]
    },
  ])
  .then( (response) => {
    if (response.action === "Add A Department") {
      let message = ['What is the name of the new department?']
      let table = `department`
      let headers = `department_name`
      add(message,table,headers)
    }
    if (response.action === "Add A Role") {
      let messageArr = [
        'What is the new role title?',
        'What is the salary for the role?',
        'What department oversees the role?'
      ]
      let table = `role`
      let headers = `title,salary,department_id`
      add(messageArr,table,headers)
    }
    if (response.action === "Add An Employee") {
      let messageArr = [
        'What is the employee\'s first name?',
        'What is the employee\'s last name?',
        'What is the role id for the employee?',
        'What is the manager id for the employee?'
      ]
      let table = `employee`
      let headers = `first_name, last_name, role_id, manager_id`
      add(messageArr,table,headers)
    }
    if (response.action === "Update An Employee Role") {
      update()
    }
    if (response.action === "View All Departments") {
      view(`department`)
    }
    if (response.action === "View All Employees") {
      view(`employee`)
    }
    if (response.action === "View All Roles") {
      view(`role`)
    }
  })
}


const view = (table) =>{
  let myPromise = new Promise(function(myResolve, myReject) {
    connection.query(`USE employeetrack_db;SELECT * FROM ${table};`, (err, results) => {
      if (err) throw err
      myResolve(results[1])
    });
  });
  myPromise.then(function(value) {
    console.table(value);
    start()
  });
};

const add = (messageArr,table,headers,values) => {
  const prompts = []
  for (i=0 ; i<messageArr.length ; i++) {
    let question = {
      type: 'input',
      name: `action${i}`,
      message: messageArr[i]
    }
    prompts.push(question)
  }
  inquirer
  .prompt(prompts)
  .then((response) => {
    sql = `INSERT INTO ${table} (${headers}) VALUES ('${Object.values(response).toString().replace(/,/g,"','")}');`
    connection.query(sql, (err) => {
      if (err) throw err
    });
  })
  .then((response) => {
    view(table)
  })
}
const update = () => {
  let myPromise = new Promise(function(myResolve, myReject) {
    connection.query('SELECT last_name, first_name, id FROM employee ORDER BY last_name', (err, results) => {
      if (err) throw err
      myResolve(results)
    });
  });
  myPromise.then(function(value) {
    let nameArr = []
    value.forEach(element => {
      nameArr.push(Object.values(element).toString())
    });
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Which employee needs a new role id?',
        choices: nameArr
      },
      {
        type: 'input',
        name: 'role',
        message: 'What is the new role id?',
      },
    ])
    .then( (response) => {
      let name = response.name
      let index = name.lastIndexOf(",") + 1
      let len = name.length
      let id = name.toString().slice(index,len)

      sql = `UPDATE employee SET role_id = ${response.role} WHERE id = ${id}`
      connection.query(sql, (err) => {
        if (err) throw err
      });
    })
    .then((response) => {
      view(`employee`)
    })
  });
}
start()