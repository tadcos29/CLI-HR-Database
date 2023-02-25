require('dotenv').config();
const cTable = require('console.table');
const mysql2 = require('mysql2/promise');
const inq = require('inquirer');
const {processQuery} = require('./src/queryConstruct');


const rgMainMenu = ['View/Edit Departments', 'View/Edit Roles', 'View/Edit Employees','Quit'];
const deptsMenu = ['View All Departments', 'Add Department', 'Rename Department', 'Delete Department','Departmental Salary Budgets', 'Back'];
const rolesMenu = ['View All Roles', 'Add Role', 'Change Salary', 'Delete Role', 'Back'];
const employeesMenu = ['View All Employees', 'View Employees By Manager', 'View Employees By Department', 'Add Employee', 'Reassign Role','Reassign Manager', 'Delete Employee', 'Back'];


async function createMenu(menu) {
    const rawQuery = await inq.prompt([{type:'list', message: 'What would you like to do?',choices:menu, name:'userSelection', loop:false, pageSize:12}]);
    return rawQuery;
}

async function init() {
    console.log(`***** WELCOME TO THE COMMAND LINE HR APPLICATION *****.\n`)
    const db = await mysql2.createConnection(
        {
          host: 'localhost',
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        },
        console.log(`Connected to the cli_hr_db database.`)
      );

    let quitChoice = false;
    while (!quitChoice) {
    const result=await createMenu(rgMainMenu);
    let backChoice=false;
    console.clear();
    switch (result.userSelection) {
        case 'View/Edit Departments':
        while(!backChoice) {
            const deptResult = await createMenu(deptsMenu);
            if (deptResult.userSelection==='Back') {backChoice=true;} 
            else {
                qResult= await processQuery(deptResult.userSelection, db);
                console.table(qResult);
            }
        }
        
        break;

        case 'View/Edit Roles':
            while(!backChoice) {
                const roleResult = await createMenu(rolesMenu);
                if (roleResult.userSelection==='Back') {backChoice=true;} 
                else {
                    qResult= await processQuery(roleResult.userSelection, db);
                    console.table(qResult);
                }
            }
        break;

        case 'View/Edit Employees':
        while(!backChoice) {
            const empResult = await createMenu(employeesMenu);
            if (empResult.userSelection==='Back') {backChoice=true;} 
            else {
                qResult= await processQuery(empResult.userSelection, db);
                console.table(qResult);
            }
        }
        break;
    
        default:
        break;
    }

    if (result.userSelection==='Quit') {quitChoice=true;}
    }
    await db.end();
}


init();