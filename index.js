const inquirer = require("inquirer")
const db = require("./config/connection.js")

function launchQuestions() {
    inquirer.prompt([
        {
            // possible to use inquirer table prompt possibly? Look into that npm package 
            type: "list",
            name: "selectOption",
            message: "Please select an action",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"]
        },
    ])
        .then((answers) => {
            switch (answers.selectOption) {
                case "View all departments":
                    viewDepartmentsFunc();
                    break;
                case "View all roles":
                    viewRolesFunc();
                    break;
                case "View all employees":
                    viewEmployeesFunc();
                    break;
                case "Add a department":
                    addDepartmentInq();
                    break;
                case "Add a role":
                    addRoleInq();
                    break;
                case "Add an employee":
                    addEmployeeInq();
                    break;
                case "Update an employee role":
                    employeeUpdateFunc();
                    break;
                case "Exit":
                    console.log("Goodbye")
                    return
            }
        })
}

function viewDepartmentsFunc() {
    db.query("SELECT * FROM department", function (err, query) {
        if (err) {
            throw err
        }
        else {
            console.log("\n")
            console.table(query)
        }
    })
    launchQuestions()
};

function viewRolesFunc() {
    db.query("SELECT * FROM role", function (err, query) {
        if (err) {
            throw err
        }
        else {
            console.log("\n")
            console.table(query)
        }
    })
    launchQuestions()
};

function viewEmployeesFunc() {
    db.query("SELECT * FROM employee", function (err, query) {
        if (err) {
            throw err
        }
        else {
            console.log("\n")
            console.table(query)
        }
    })
    launchQuestions()
};

function addDepartmentInq() {
    inquirer.prompt([
        {
            type: "input",
            name: "addDepartment",
            message: "What is the name of the department?",
        },
    ])
        .then((addAnswers) => {
            console.log("The " + addAnswers.addDepartment + " department has been created")
            db.query("INSERT INTO department (name) VALUES (?)",
                [addAnswers.addDepartment],
                function () {
                    launchQuestions()
                })
        })
}

function addRoleInq() {
    db.query("SELECT * FROM department", function (err, results) {
        var departmentArray = []
        for (let i = 0; i < results.length; i++) {
            var obj = { name: results[i].name, value: results[i].id }
            departmentArray.push(obj)
        }
        inquirer.prompt([
            {
                type: "input",
                name: "addRoleName",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "addRoleSalary",
                message: "What is the salary for this role?",
            },
            {
                type: "list",
                name: "addRoleDep",
                message: "What department does this role belong to?",
                choices: departmentArray
            },
        ]).then((addAnswers) => {
            console.log("The " + addAnswers.addRoleName + " role has been created")
            db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
                [addAnswers.addRoleName, addAnswers.addRoleSalary, addAnswers.addRoleDep],
                function () {
                    launchQuestions()
                })
        })
    })
}

function addEmployeeInq() {
    db.query("SELECT * FROM employee", function (err, results) {
        var employeeArray = []
        for (let i = 0; i < results.length; i++) {
            var employeeObj = { name: results[i].first_name + " " + results[i].last_name, value: results[i].id }
            employeeArray.push(employeeObj)
        }
        db.query("SELECT * FROM role", function (err, results) {
            var roleArray = []
            for (let i = 0; i < results.length; i++) {
                var roleObj = { name: results[i].title, value: results[i].id }
                roleArray.push(roleObj)
            }
            inquirer.prompt([
                {
                    type: "input",
                    name: "addEmployeeFN",
                    message: "What is the employee's first name?",
                },
                {
                    type: "input",
                    name: "addEmployeeLN",
                    message: "What is the employee's last name?",
                },
                {
                    type: "list",
                    name: "addEmployeeRole",
                    message: "What is the employee's role?",
                    choices: roleArray
                },
                {
                    type: "list",
                    name: "addEmployeeManager",
                    message: "Who is the employee's manager?",
                    choices: employeeArray
                },
            ])
                .then((addAnswers) => {
                    console.log(addAnswers.addEmployeeFN + " " + addAnswers.addEmployeeLN + " has been added to the database")
                    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                        [addAnswers.addEmployeeFN, addAnswers.addEmployeeLN, addAnswers.addEmployeeRole, addAnswers.addEmployeeManager],
                        function () {
                            launchQuestions()
                        })
                })
        })
    })
}

function employeeUpdateFunc() {
    db.query("SELECT * FROM employee", function (err, results) {
        db.query("SELECT * FROM employee", function (err, results) {
            var employeeListArray = []
            for (let i = 0; i < results.length; i++) {
                var employeeListObj = { name: results[i].first_name + " " + results[i].last_name, value: results[i].id }
                employeeListArray.push(employeeListObj)
            }
            db.query("SELECT * FROM role", function (err, results) {
                var roleAssignArray = []
                for (let i = 0; i < results.length; i++) {
                    var roleAssignObj = { name: results[i].title, value: results[i].id }
                    roleAssignArray.push(roleAssignObj)
                }
                inquirer.prompt([
                    {
                        type: "list",
                        name: "selectEmployee",
                        message: "What is the name of the employee that needs to be updated?",
                        choices: employeeListArray
                    },
                    {
                        type: "list",
                        name: "roleAssign",
                        message: "What role do you want to assign the employee?",
                        choices: roleAssignArray
                    },
                ]).then((addAnswers) => {
                    console.log("The employee's role has been updated")
                    db.query("UPDATE `employee` (role_id) VALUES (?)",
                        [addAnswers.roleAssign],
                        function () {
                            launchQuestions()
                        })
                })
            })
        })
    })
}
launchQuestions()