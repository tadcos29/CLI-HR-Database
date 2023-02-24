const mysql2 = require('mysql2/promise');
const inq = require('inquirer');

async function pollUser (prompt, type, listQuery) {
    switch (type) {
        case 'var30':
            rawQuery = await inq.prompt([{type:'input', message: `Please enter the ${prompt}:`, name:'userSelection'}]);
            if (rawQuery.userSelection === '' || (rawQuery.userSelection.length>30)) {console.log(`Please enter a valid ${prompt}, up to 30 characters in length.`); await pollUser(prompt, type);}
            else {return rawQuery.userSelection}
            break;
        case 'list':
            rawQuery = await inq.prompt([{type:'list', message: `Please enter the ${prompt}:`, choices:listQuery, name:'userSelection', loop:false, pageSize:12}]);
            return rawQuery.userSelection;
            break;
        case 'salary':
            const pattern=new RegExp(/^\d{1,20}\.\d{0,2}$/);
            rawQuery = await inq.prompt([{type:'input', message: `Please enter the ${prompt}:`, name:'userSelection'}]);
            if (!pattern.test(rawQuery.userSelection)) {console.log(`Please enter a number that looks like money. And please try to keep it somewhere under the total GDP of Earth.`); await pollUser(prompt, type);}
            return rawQuery.userSelection;
            break;
        default:
            break;
    }
   
}

async function processQuery(selection, db) {
    let queryLiteral='';
    console.log('DB obtained '+db);
    console.clear();
    switch (selection) {
        case 'View All Employees':
            queryLiteral=await db.query(`select emp.id as 'Id', CONCAT(emp.first_name,' ',emp.last_name) AS 'Name', IFNULL(role.title,'None') AS 'Title', IFNULL(department.dept_name,'None') AS 'Department', IFNULL(CONCAT('£',role.salary),'Zero!') AS 'Salary', IFNULL(CONCAT(mng.first_name,' ',mng.last_name),'None') AS 'Manager' FROM employee emp LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee mng ON emp.manager_id=mng.id;`);
            queryLiteral = queryLiteral[0];
        break;
        case 'View Employees By Manager':
            queryLiteral=await db.query(`select CONCAT(emp.first_name,' ',emp.last_name) AS 'Employee Name', IFNULL(CONCAT(mng.first_name,' ',mng.last_name),'None') AS 'Manager',  IFNULL(role.title,'None') AS 'Manager Title' FROM employee emp LEFT JOIN employee mng ON emp.manager_id=mng.id LEFT JOIN role on mng.role_id = role.id ORDER BY mng.id;`);
            queryLiteral = queryLiteral[0];
        break;
        case 'View Employees By Department':
            queryLiteral=await db.query(`select CONCAT(emp.first_name,' ',emp.last_name) AS 'Employee Name', IFNULL(role.title,'None') AS 'Title', IFNULL(department.dept_name,'None') AS 'Department' FROM employee emp LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department on role.department_id = department.id ORDER BY department.id;`);
            queryLiteral = queryLiteral[0];
        break;
        
        case 'View All Roles':
            queryLiteral=await db.query(`SELECT role.id AS 'Id', role.title as 'Job Title', role.salary AS 'Salary', IFNULL(department.dept_name,'None') AS 'Department' FROM role LEFT JOIN department ON role.department_id = department.id;`);
            queryLiteral = queryLiteral[0];
        break;
        case 'View All Departments':
            queryLiteral=await db.query(`SELECT id AS 'Id', dept_name as 'Department Name' FROM department;`);
            queryLiteral = queryLiteral[0];
        break;
        case 'Add Department':
            dName = await pollUser('department name', 'var30')
            queryLiteral=await db.query(`INSERT INTO department (dept_name) VALUES ('${dName}');`);
            queryLiteral=`${selection} complete. ${dName} added.`
        break;
        case 'Add Employee':
            fName = await pollUser(`employee's first name`, 'var30');
            lName = await pollUser(`employee's last name`, 'var30');
            roleList = await db.query(`SELECT role.title AS name, role.id AS value from role`);
            sRole = await pollUser(`employee's role`,'list',roleList[0]);
            managerList = await db.query(`SELECT CONCAT(employee.first_name,' ',employee.last_name) AS name, employee.id AS value FROM employee`);
            sMan = await pollUser(`employee's manager`,'list',managerList[0]);
            queryLiteral=await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${fName}','${lName}','${sRole}','${sMan}');`);
            queryLiteral=`${selection} complete. ${fName} ${lName} added.`
        break;
        case 'Add Role':
            rTitle = await pollUser(`title describing the role`, 'var30');
            rSalaryString = await pollUser(`salary for the ${rTitle}`, 'salary');
            deptList = await db.query(`SELECT dept_name AS name, department.id AS value from department`);
            rDept = await pollUser(`department associated with ${rTitle}`,'list',deptList[0]);
            rSalary=parseFloat(rSalaryString);
            queryLiteral=await db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${rTitle}','${rSalary}','${rDept}');`);
            queryLiteral=`${selection} complete. ${rTitle} added.`
        break;
        case 'Rename Department':
            deptList = await db.query(`SELECT dept_name AS name, department.id AS value from department`);
            dDept = await pollUser(`department to be renamed`,'list',deptList[0]);
            nName = await pollUser('new department name', 'var30')
            queryLiteral=await db.query(`UPDATE department SET dept_name='${nName}' WHERE department.id=${dDept};`);
            queryLiteral=`${selection} complete. The department is now known as ${nName}.`
        break;

        case 'Delete Employee':
            empList = await db.query(`SELECT CONCAT(employee.first_name,' ',employee.last_name) AS name, employee.id AS value from employee`);
            dEmployee = await pollUser(`employee to be deleted`,'list',empList[0]);
            queryLiteral=await db.query(`DELETE FROM employee WHERE employee.id=${dEmployee};`);
            queryLiteral=`${selection} complete. The employee has been deleted.`
        break;
        case 'Delete Department':
            deptList = await db.query(`SELECT dept_name AS name, department.id AS value from department`);
            dDept = await pollUser(`department to be deleted`,'list',deptList[0]);
            queryLiteral=await db.query(`DELETE FROM department WHERE department.id=${dDept};`);
            queryLiteral=`${selection} complete. The department has been deleted.`
        break;
        case 'Delete Role':
            roleList = await db.query(`SELECT role.title AS name, role.id AS value FROM role`);
            dRole = await pollUser(`role to be deleted`,'list',roleList[0]);
            queryLiteral=await db.query(`DELETE FROM role WHERE role.id=${dRole};`);
            console.log(roleList[0]);
            queryLiteral=`${selection} complete. The role has been deleted.`
        break;
        case 'Departmental Salary Budgets':
            // The table is Department - Number of Employees - Total Salary Outlay
            // SUM (employee salaries) WHERE employee->role->department is that department.
            deptList = await db.query(`SELECT dept_name AS name, department.id AS value from department`);
            dDept = await pollUser(`department to be renamed`,'list',deptList[0]);
            nName = await pollUser('new department name', 'var30')
            queryLiteral=await db.query(`UPDATE department SET dept_name='${nName}' WHERE department.id=${dDept};`);
            queryLiteral=`${selection} complete. The department is now known as ${nName}.`
        break;
        default:
        break;
    }
return queryLiteral
}


module.exports = {processQuery}