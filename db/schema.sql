DROP DATABASE IF EXISTS employeetrack_db;
CREATE DATABASE employeetrack_db;

USE employeetrack_db;

CREATE TABLE department(
  id int NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
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

USE employeetrack_db;

INSERT INTO department (department_name)
VALUES ("Management"),
       ("Finance"),
       ("Marketing"),
       ("Production department"),
       ("Human Resources"),
       ("Information Technology");

INSERT INTO role (title,salary,department_id)
VALUES ("Chief Executive Officer (CEO)",450000,1),
       ("Chief Financial Officer (CFO)",350000,1),
       ("Chief Operating Officer (COO)",250000,1),
       ("Customer Service Representative",40000,2),
       ("Sales Manager",140000,2),
       ("Product Developer",80000,3),
       ("Human Resources Specialist",95000,5),
       ("Accountant",65000,2),
       ("Marketing Manager",85000,3),
       ("Business Analyst",65000,3),
       ("Marketing Specialist",75000,3),
       ("Graphic Designer",60000,4),
       ("Receptionist",35000,4),
       ("Human Resource Personnel",50000,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 7, 1),
       ('Jane', 'Doe', 3, 1),
       ('Bob', 'Smith', 12, 1),
       ('Samantha', 'Johnson', 9, 1),
       ('Michael', 'Williams', 2, 1),
       ('Emily', 'Jones', 5, 1),
       ('David', 'Brown', 8, 1),
       ('Avery', 'Davis', 11, 1),
       ('Olivia', 'Miller', 4, 1),
       ('William', 'Wilson', 10, 1),
       ('Sophia', 'Moore', 6, 1),
       ('Ethan', 'Taylor', 13, 1),
       ('Isabella', 'Anderson', 2, 1),
       ('James', 'Thomas', 7, 1),
       ('Mia', 'Jackson', 3, 1),
       ('Benjamin', 'White', 12, 1),
       ('Charlotte', 'Harris', 9, 1),
       ('Lucas', 'Martin', 5, 1),
       ('Amelia', 'Thompson', 8, 1),
       ('Alexander', 'Garcia', 11, 1),
       ('Harper', 'Martinez', 4, 1),
       ('Daniel', 'Robinson', 10, 1),
       ('Abigail', 'Clark', 6, 1),
       ('Matthew','Rodriguez' ,13 ,1 ),
       ('Elizabeth','Lewis' ,2 ,1 ),
       ('Christopher','Lee' ,7 ,1 ),
       ('Victoria','Walker' ,3 ,1 ),
       ('Ryan','Hall' ,12 ,1 ),
       ('Grace','Allen' ,9 ,1 ),
       ('Nathan','Young' ,5 ,1 ),
       ('Chloe','King' ,8 ,1 ),
       ('Andrew','Wright' ,11 ,1 ),
       ('Zoe','Scott' ,4 ,1 ),
       ('William','Green' ,10 ,1 ),
       ('Madison','Baker' ,6 ,1 ),
       ('Joshua','Adams' ,13 ,1 ),
       ('Lily','Nelson' ,2 ,1 ),
       ('David','Carter' ,7 ,1 ),
       ('Alyssa','Mitchell' ,3 ,1 ),
       ('Logan','Perez' ,12 ,1 ),
       ('Lauren','Roberts' ,9 ,1 ),
       ('Elijah','Turner' ,5 ,1 ),
       ('Sofia','Phillips' ,8 ,1 ),
       ('Gabriel','Campbell' ,11 ,1 ),
       ('Avery','Parker' ,4 ,1 );