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

      var t = table([
        [res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      ], { align: ['r', 'r', 'r', 'r', 'r'] });
      console.log(t);    
      
    }
    console.log("\r");
    promptUser();

  });

}

function promptUser() {

  //Prompt the user to answer 2 questions.
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
    ]).then(function (option) {

      connection.query("SELECT product_name, department_name, price, stock_quantity FROM products WHERE id = ?",
        [option.itemID], function (err, res) {
          if (err) throw err;
          //console.log(res);
          if (option.units > res[0].stock_quantity || res[0].stock_quantity === 0) {
            console.log("Insufficient inventory!  Please try again later.");
            confirm.end();

          } else {
            
            console.log("OK, you would like to purchase " + option.units + " " + res[0].product_name + " for " + res[0].price + " each.");
            console.log("\r");

            var id = option.itemID;

            var deplete = res[0].stock_quantity - option.units;
            //console.log("Deplete : " + deplete);
            //console.log(res[0]);
            //console.log("ID : " + id);
            var total = parseFloat(option.units * res[0].price).toFixed(2);
            var query = "UPDATE products SET stock_quantity = " + deplete + " WHERE id = " + id;
            //console.log(query)            
            
            connection.query(
              query, function (err, res) {
                if (err) {
                  //console.log("This is what causing it to error");
                  throw err;
                }
                //console.log (res);
              })
            console.log("Your order has been processed\r");

            console.log("Your total cost is $" + total + "\r");
            console.log("Thank you for shopping at bamazon! There are " + deplete + " " + res[0].product_name + "'s left, if you would like to buy more.\r");
            console.log("\r");
          }
          confirmEnd();
          
        })
    })   
  
}


function confirmEnd() {
  //Confirm that the user is finished shopping
  inquirer
    .prompt([

      {
        type: "list",
        message: "Would you like to continue shopping?",
        choices: ["Yes", "No"],
        name: "decision"
      }

    ]).then(function (option) {
      connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;

      if (option.decision === "No") {
        connection.end();
      } else {
        start();
      }
    })
  })

}

