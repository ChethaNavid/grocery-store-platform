drop database grocery_store;

create database grocery_store;
use grocery_store;

show tables;

select * from users;
select * from categories;
select * from products;

insert into products (`name`, `quantity`, `inStock`, `price`, `description` ,`imgURL`, `categoryId`) value
('apple', 50 , 1 , 5, 'from USA', '####', 1);

insert into categories (`name`) value
('Fruit'), 
('Vegetables'), 
('Bakery'), 
('Beverages'), 
('Diary'), 
('Frozen'), 
('Meat'), 
<<<<<<< Updated upstream
('Snacks');

SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM products;
SET FOREIGN_KEY_CHECKS = 1;
=======
('Snacks');
>>>>>>> Stashed changes
