-- Drop Tables
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;

-- Create Tables
CREATE TABLE category (
    category_id int auto_increment,
    category_name text,
    PRIMARY KEY(category_id)
);

CREATE TABLE product (
    product_id int auto_increment,
    owner_id int, -- FK for user service
    product_name text,
    product_description text,
    product_price float,
    product_category_id int REFERENCES category(category_id),
    product_ship_location text,
    product_original_stock int,
    product_status enum ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    product_stock int,
    PRIMARY KEY(product_id)
);

