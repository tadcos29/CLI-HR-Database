# Command Line HR Database (Bootcamp Challenge 12)

## Introduction and Purpose:

I used this bootcamp exercise to practice using MySQL syntax, and indeed it gave me opportunity to construct some reasonably complex queries. Asynchronous function calls became an important part of the programme flow as well, and I was able to practice using async/await for easier Promise handling.

## Scenario:

A fictional business owner wishes to be able to view and manage the departments, roles, and employees in their company.

## Technical Overview:

### Usage Video 

[Google drive link](https://drive.google.com/file/d/1IoidQG-rcjDfJluEsKIYBy3DbgmqsYJu/view). Please view at full screen for best results.

### Screenshot

![image](https://user-images.githubusercontent.com/121476474/221329219-9286e5cd-1a6a-40fc-8d35-7ea52b57b8f3.png)

Following installation (npm i) the application is initialised from the command line using 'npm start'. 

It presents the user with an inquirer top-level menu, allowing them to choose which part of the organisational structure (departments, roles, and employees, respectively) they wish to view or alter.

![image](https://user-images.githubusercontent.com/121476474/221329568-fa09438d-8b67-43d0-aae3-998bc686acee.png)

The following functionalities are available:

### Employees

Employees may be viewed in an aggregate table listing their id, name, salary, title, department, and manager. They may also be viewed grouped by manager or by department.

Employees may be added, deleted, reassigned to a different manager, or reassigned to a different role.

### Roles

A list of roles may be viewed. Roles can be added (the process also sets the salary and assigns them to a department) or deleted. The salary for an existing role may be modified.

### Departments

A list of departments may be viewed. Departments can be added, renamed, or deleted. Additionally, a mode for viewing a list of departments along with the total salary outlay for each one is provided.

## Testing and Dependencies

This project uses dotenv for environmental variable control. If cloning, please modify and rename the supplied .env.GENERIC file.

The cli_hr_db database schema and a sample seed file are provided in the /db/ directory.

This project uses [inquirer](https://www.npmjs.com/package/inquirer) to collect user input, [Express.js](https://expressjs.com/) for connectivity, [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console, and
[mysql2](https://www.npmjs.com/package/mysql2) for node.js access to the MySQL database.
