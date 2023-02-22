const cTable = require('console.table');
const mysql2 = require('mysql2');
const inq = require('inquirer');


async function mainMenu() {
    const rawQuery = await inq.prompt([{type:'list', message: 'What would you like to do?',choices:['Update','New','Quit'], name:'userSelection'}]);
    return rawQuery;
}

async function init() {
    let quitChoice = false;
    while (!quitChoice) {
    const result=await mainMenu();
    console.log(`You have selected ${result.userSelection}, which is good.`);
    if (result.userSelection==='Quit') {quitChoice=true;}
    }
}


init();