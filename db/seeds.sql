USE employeeTracker_db;

INSERT INTO roles (job_title, department_name, salary)
VALUES ("Sales Lead", "Sales", 1000000), 
("Salesperson", "Sales", 80000),
("Lead Engineer", "Engineering", 150000),
("Software Engineer", "Engineering", 120000),
("Account Manager", "Finance", 160000),
("Accountant", "Finance", 125000),
("Legal Team Lead", "Legal", 250000),
("Lawyer", "Legal", 190000);

INSERT INTO departments (department_name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO employees (first_name, last_name, job_title, salary, department_id, manager)
VALUES ("Peter", "Geipel", "Software Engineer", 120000, "Engineering", "Josh Smith");