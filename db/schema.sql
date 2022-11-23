DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    salary DEC(10, 1)
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_title VARCHAR(30) NOT NULL,
    salary DEC(10),
    department_id VARCHAR(30) NOT NULL,
    manager VARCHAR(30) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES roles(department_name),
    FOREIGN KEY (salary) REFERENCES roles(salary)
);