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
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
        name: "mgrChoice"
      }

    ]).then(function (option) {

      switch (option.mgrChoice) {
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

        case "Exit":
          connection.end();
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
    confirmEnd();
  });
}

function viewInventory() {

  console.log("The following items have a stock quanity less than 5:\n");
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    for (var i = 0; i < res.length; i++) {

      var t = table([
        [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      ], { align: ['r', 'r', 'r', 'r', 'r'] });
      console.log(t);
    }
    confirmEnd();
  });
}

function addInventory() {
  console.log("Here is a list our current inventory...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      var t = table([
        [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      ], { align: ['r', 'r', 'r', 'r', 'r'] });
      console.log(t);
    }
    promptMgr();
  });
}


function promptMgr() {

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID of the product that you would like to replenish?",
        name: "itemID"
      },

      {
        type: "input",
        message: "How many units would you like to restock?",
        name: "units"
      }
    ]).then(function (mgrOption) {

      connection.query("SELECT product_name, department_name, price, stock_quantity FROM products WHERE id = ?",
        [mgrOption.itemID], function (err, res) {
          if (err) throw err;

          var id = mgrOption.itemID;
          var units = parseInt(mgrOption.units);
          var stock_quantity = parseInt(res[0].stock_quantity);

          var increase = stock_quantity + units;
          // console.log("Increase : " + increase);
          // console.log(res[0]);
          // console.log("ID : " + id);

          var query = "UPDATE products SET stock_quantity = " + increase + " WHERE id = " + id;
          //console.log(query)

          connection.query(
            query, function (err, res) {
              if (err) {
                //console.log("This is what causing it to error");
                throw err;
              }
              //console.log(res);
            })
          console.log("Your request has been processed\r");
          console.log("There are " + increase + " " + res[0].product_name + "'s in inventory.\r");
          console.log("\r");

          confirmEnd();
        })
    })
}

function addProduct() {

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new product?",
        name: "name"
      },

      {
        type: "input",
        message: "What is the department name?",
        name: "department"
      },

      {
        type: "input",
        message: "What is the price?",
        name: "price"
      },

      {
        type: "input",
        message: "What is the quantity of items being stocked?",
        name: "quantity"
      }

    ]).then(function (newProduct) {
      connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(newProduct);

        // connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (" + product + ", " + department + ", " price + ", " quantity +" )",
        //  function (err, res) {
        //     if (err) throw err;

        //     console.log(query);
        //   })          
      })
    });
}

function confirmEnd() {
  //Confirm that the user is finished shopping
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to perform another task?",
        choices: ["Yes", "No"],
        name: "decision"
      }

    ]).then(function (option) {
      connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        if (option.decision === "No") {
          connection.end();
        } else {
          startMgr();
        }
      })
    })
}
