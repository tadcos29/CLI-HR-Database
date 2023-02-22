const cTable = require('console.table');
const mysql2 = require('mysql2/promise');
const inq = require('inquirer');
const {processQuery} = require('./src/queryConstruct');

const rgMainMenu = ['View/Edit Departments', 'View/Edit Roles', 'View/Edit Employees','Quit'];
const deptsMenu = ['View All Departments', 'Add Department', 'Edit Department', 'Delete Department', 'Back'];
const rolesMenu = ['View All Roles', 'Add Role', 'Edit Role', 'Delete Role', 'Back'];
const employeesMenu = ['View All Employees', 'Add Employee', 'Edit Employee', 'Delete Employee', 'Back'];



async function createMenu(menu) {
    const rawQuery = await inq.prompt([{type:'list', message: 'What would you like to do?',choices:menu, name:'userSelection', loop:false}]);
    return rawQuery;
}

async function init() {

    const db = await mysql2.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'password',
          database: 'cli_hr_db'
        },
        console.log(`Connected to the cli_hr_db database.`)
      );
   // testList = await db.query(`show tables`);
   // console.log(testList);
   // maybe?


    let quitChoice = false;
    while (!quitChoice) {
    const result=await createMenu(rgMainMenu);
    console.log(`You have selected ${result.userSelection}, which is good.`);
    let backChoice=false;
    switch (result.userSelection) {
        case 'View/Edit Departments':
        while(!backChoice) {
            const deptResult = await createMenu(deptsMenu);
            if (deptResult.userSelection==='Back') {backChoice=true;} 
            else {console.log(`You have selected: ${deptResult.userSelection}`);}
        }
        showAll = await db.query(`select dept_name AS 'Department' from department`);
        console.table(showAll[0]);
        break;

        case 'View/Edit Roles':
        showAll = await db.query(`select title AS 'Title' from role`);
        console.table(showAll[0]);
        break;

        case 'View/Edit Employees':
        showAll = await db.query(`select CONCAT(employee.first_name,' ',employee.last_name) AS 'Name' from employee`);
        console.table(showAll[0]);
            
        break;
    
        default:
            break;
    }
    //console.log(`Meanwhile, have this here query:`);
    //results = await db.query(`select CONCAT(employee.first_name,' ',employee.last_name) AS 'Name' from employee`);
    // The first item of results.
    // console.table(results[0]);
    if (result.userSelection==='Quit') {quitChoice=true;}
    }
    await db.end();
}


init();