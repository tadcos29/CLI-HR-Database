const mysql2 = require('mysql2/promise');
const inq = require('inquirer');

//But that's rubbish. Do a case based on type.

async function pollUser30 () {
    const rawQuery = await inq.prompt([{type:'input', message: 'Please enter a name for the new department:', name:'userSelection'}]);
    if (rawQuery.userSelection === '' || (rawQuery.userSelection.length>30)) {console.log('Please enter a valid department name, up to 30 characters in length.'); await pollUser();}
    else {return rawQuery.userSelection}
    
}

async function processQuery(selection) {
    let query='';
    switch (selection) {
        case 'View All Employees':
            query=`select emp.id as 'Id', CONCAT(emp.first_name,' ',emp.last_name) AS 'Name', role.title AS 'Title', IFNULL(department.dept_name,'None') AS 'Department', role.salary AS 'Salary', IFNULL(CONCAT(mng.first_name,' ',mng.last_name),'None') AS 'Manager' FROM employee emp JOIN role ON emp.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee mng ON emp.manager_id=mng.id;`
            break;
        case 'View All Roles':
                query=`SELECT role.id AS 'Id', role.title as 'Job Title', role.salary AS 'Salary', IFNULL(department.dept_name,'None') AS 'Department' FROM role LEFT JOIN department ON role.department_id = department.id;`
        break;
        case 'View All Departments':
            query=`SELECT id AS 'Id', dept_name as 'Department Name' FROM department;`
        break;
        case 'Add Department':
            dName = await pollUser30()
            query = `INSERT INTO department (dept_name) VALUES ('${dName}');`
        break;
        case 'Add Employee':
            dName = await pollUser30()
            query = `INSERT INTO department (dept_name) VALUES ('${dName}');`
        break;
        default:
        break;
    }
return query
}


module.exports = {processQuery}