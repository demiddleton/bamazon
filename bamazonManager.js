var mysql = require("mysql");

var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startMgr();
  });

  function startMgr () {
    inquirer
    .prompt([

      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Yes", "No"],
        name: "mgrChoice"
      }

    ]).then(function (option) {
      if (err) throw err;

      if (option === "No") {
        connection.end();
      } else {
        start();
      }
    })
  }