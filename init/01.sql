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
    product_image_url text,
    product_description text,
    product_price float,
    product_category_id int REFERENCES category(category_id),
    product_ship_location text,
    product_original_stock int,
    product_status enum ('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    product_stock int,
    PRIMARY KEY(product_id)
);

INSERT INTO category(category_name) VALUES
('Fashion'),
('Tech'),
('Home'),
('Edibles');

INSERT INTO product(owner_id, product_name, product_image_url, product_description, product_price, product_category_id, product_ship_location, product_original_stock, product_stock) VALUES
(1, 'Hoodie', 'https://storage.googleapis.com/buyee-image-assets/1.jfif', 'Basicaly a hoodie', 0.5, 1, 'Singapore', 10, 10),
(1, 'Airpods Pro', 'https://storage.googleapis.com/buyee-image-assets/2.jfif','True Wireless Stero by Apple', 0.5, 2, 'Singapore', 10, 10),
(1, 'Nothing Ear 1', 'https://storage.googleapis.com/buyee-image-assets/3.jfif','True Wireless Stero by Nothing', 0.5, 2, 'Singapore', 10, 10),
(2, 'Ikea ALEX', 'https://storage.googleapis.com/buyee-image-assets/4.jfif','Drawer unit, 36x70 cm', 0.5, 3, 'Singapore', 10, 10),
(2, '2L Water Bottle', 'https://storage.googleapis.com/buyee-image-assets/5.jfif', 'Just water', 0.5, 4, 'Singapore', 10, 10),
(3, 'Russell Taylors Belgian Waffle Maker', 'https://storage.googleapis.com/buyee-image-assets/6.jfif','Stainless steel with black trimmings

Nonstick Pan

Four easy to cut sections

Temperature control

Cool touch handle

Anti-slip rubber base', 27.99, 4, 'Singapore', 10, 10),
(1, 'Ruffles Sour Cream & Onion', 'https://storage.googleapis.com/buyee-image-assets/7.jfif', 'Ruffles Sour Cream & Onion Potato Chips are made with potatoes, all natural oil and salt for the delicious taste you love. Ridges make these chips extra crunchy and perfect for dipping!', 0.5, 4, 'Singapore', 10, 10);