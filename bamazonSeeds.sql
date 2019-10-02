DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(25),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO PRODUCTS (product_name, department_name, price, stock_quantity)
VALUES
("Pillow", "Bedding", 5, 50),
("Comforter", "Bedding", 98.99, 25),
("Shower Curtain", "Bath", 23.49, 20),
("Shower Liner", "Bath", 12.99, 35),
("Blender", "Kitchen", 34.99, 10),
("Airfryer", "Kitchen", 112.95, 8),
("Bedskirt", "Bedding", 15, 13),
("Dishcloth", "Kitchen", 2.99, 46),
("Rug Set", "Bath", 23.99, 13),
("Toothbrush Holder", "Bath", 4, 20);

