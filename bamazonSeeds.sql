DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(25),
  price INT(100),
  stock_quantity INT(500),
  PRIMARY KEY (id)
);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);