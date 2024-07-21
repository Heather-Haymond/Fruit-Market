-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- User table with a unique username and a constraint on total_cash
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "total_cash" DECIMAL(10, 2) DEFAULT 100.00 CHECK (total_cash >= 0)
);

-- Fruits table with constraints on current_price
CREATE TABLE "fruits" ( 
    "id" SERIAL PRIMARY KEY, 
    "name" VARCHAR(100) NOT NULL, 
    "current_price" DECIMAL(10, 2) NOT NULL CHECK (current_price >= 0.50 AND current_price <= 9.99)
); 

-- Inventory table with foreign key constraints referencing user and fruits tables
CREATE TABLE "inventory" ( 
    "id" SERIAL PRIMARY KEY, 
    "user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE, 
    "fruit_id" INTEGER REFERENCES "fruits"(id) ON DELETE CASCADE, 
    "quantity" INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    "purchase_price" DECIMAL(10, 2) NOT NULL CHECK (purchase_price >= 0.50)
); 

-- Insert initial fruit data
INSERT INTO "fruits" ("name", "current_price")
VALUES 
    ('passion_fruit', 3.99),
    ('durian', 3.50),
    ('jackfruit', 2.75),
    ('dragon_fruit', 4.25);