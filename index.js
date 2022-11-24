import mysql from "mysql2"
import inquirer from "inquirer"

import "console.table";



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employeeTracker_db'
})

const viewRoles = async ()=> {
    const [results] = await connection.promise().query(
        'SELECT * FROM role'
    )
    console.table(results)

    menuPrompt()
}

const viewDepartments = async ()=> {
    const [results] = await connection.promise().query(
        'SELECT * FROM department'
    )
    console.table(results)

    menuPrompt()
}

const viewEmployees = async ()=> {
    const [results] = await connection.promise().query(
        'SELECT * FROM employee'
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
        // {
        //     type: 'list',
        //     name: 'action',
        //     message: 'Please select from the following job roles:',
        //     choices: ['SELECT job_title FROM role']
        // },
        // {
        //     type: 'input',
        //     name: 'manager_id',
        //     message: 'Who is their manager?'
        // }
    ])

    try {
        const [answers] = await connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?)`,
            [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
        )
        console.log('Employee Added!')

        menuPrompt()
    } catch(err) {
        throw new Error(err)
    }
}


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