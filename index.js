import mysql from "mysql2"
import inquirer from "inquirer"

// const cTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpwg1981',
    database: 'employeeTracker_db'
})

const viewRoles = async ()=> {
    const [results] = await connection.promise().query(
        'SELECT * FROM roles'
    )
    console.table(results)

    menuPrompt()
}

const viewDepartments = async ()=> {
    const [results] = await connection.promise().query(
        'SELECT * FROM departments'
    )
    console.table(results)

    menuPrompt()
}

const viewEmployees = async ()=> {
    const [results] = await connection.promise().query(
        'SELECT * FROM employees'
    )
    console.table(results)

    menuPrompt()
}

const addEmployee = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },
        {
            type: 'input',
            name: 'job_title',
            message: 'What is their job title?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?'
        }
    ])

    try {
        const [results] = await connection.promise().query(
            `INSERT INTO employees (first_name, last_name, job_title, manager)
            VALUES (?,?,?,?)`,
            [answers.first_name, answers.last_name, answers.job_title, answers.manager]
        )
        console.log('Employee Added!')

        menuPrompt()
    } catch(err) {
        throw new Error(err)
    }
}

// function viewDepartments() {
//     const [results] = "SELECT * FROM department"
//     connection.query(answer, function(err, res) {
//         console.table(res);
//         menuPrompt();
//     })
//    }

const menuPrompt = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Please select from the following options:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
        }
    ])



    if (answers.action === 'View all departments') {
        viewDepartments()
    } else if (answers.action === 'View all roles') {
        viewRoles()
    } else if (answers.action === 'View all employees') {
        viewEmployees()
    } else if (answers.action === 'Add a department') {
        addDepartment()
    } else if (answers.action === 'Add a role') {
        addRole()
    } else if (answers.action === 'Add an employee') {
        addEmployee()
    } else if (answers.action === 'Update an employee role') {
        updateEmployeeRole()
    } else {
        process.exit(0)
    }
}

menuPrompt()