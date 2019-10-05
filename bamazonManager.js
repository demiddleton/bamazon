var mysql = require("mysql");

var inquirer = require("inquirer");

var table = require('text-table');

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
  //console.log("connected as id " + connection.threadId);
  startMgr();
});

function startMgr() {
  inquirer
    .prompt([

      {
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "mgrChoice"
      }

    ]).then(function (option) {
      
      switch (option) {
        case "View Products for Sale":
          viewProducts();
          break;

          case "View Low Inventory":
          viewInventory();
          break;

          case "Add to Inventory":
          addInventory();
          break;

          case "Add New Product":
          addProduct();
          break;

        default:
          console.log("Please enter a command.");
          break;
      }
    })
}

function viewProducts() {

  console.log("Here is a list of all products for sale...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    for (var i = 0; i < res.length; i++) {

      var t = table([
        [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      ], { align: ['r', 'r', 'r', 'r', 'r'] });
      console.log(t);
      
    }
    //promptUser();

  });

  }
