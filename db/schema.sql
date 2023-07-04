DROP DATABASE IF EXISTS employeetrack_db;
CREATE DATABASE employeetrack_db;

USE employeetrack_db;

CREATE TABLE department(
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE work_role (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(256) NOT NULL,
  salary INT,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id int NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);