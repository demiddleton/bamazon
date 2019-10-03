var mysql = require("mysql");

var inquirer = require("inquirer");

//Create variables to get user input
var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

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
  start();
});

function start() {
  console.log("Here is a list of all products for sale...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    for (var i = 0; i < res.length; i++) {

      console.log(`${res[i].id}    ${res[i].product_name}   ${res[i].department_name}   ${res[i].price}    ${res[i].stock_quantity}`);
    }
    promptUser();

    connection.end();
  });
}

function promptUser() {
  //Create a "Prompt" with 2questions.
  inquirer
    .prompt([
    
      {
        type: "input",
        message: "What is the ID of the product that you would like to purchase?",
        name: "itemID"
      },

      {
        type: "input",
        message: "How many units would you like to purchase?",
        name: "units"
      }
    ])
  }

