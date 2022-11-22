import mysql from "mysql2"
import inquirer from "inquirer"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpwg1981',
    database: 'employeeTracker_db'
})

const menuPrompt = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Please select from the following options:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])

    if (answers.action === 'View all departments') {
        searchDepartments()
    } else if (answers.action === 'View all roles') {
        searchRoles()
    } else if (answers.action === 'View all employees') {
        searchEmployees()
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