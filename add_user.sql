-- Create the database if doesn't exist then use it
CREATE DATABASE IF NOT EXISTS click_fit;
USE click_fit;

-- If it already exists simply use the database
-- USE click_fit;

-- We'll Create the Users Table first with all the things we want it to store
CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    password VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    active TINYINT DEFAULT 1,
    PRIMARY KEY (ID)
);

-- Then create stored procedure `addUser` which will take in the value and run the commands to store it in database
DELIMITER //

CREATE PROCEDURE addUser(
    IN userEmail VARCHAR(255),
    IN userPassword VARCHAR(255),
    IN userType VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, password, type)
    VALUES (userEmail, userPassword, userType);
END //

DELIMITER ;

-- Let's call the stored procedure `addUser` to Insert a New User
CALL addUser('arshadchowdhury46@gmail.com', 'password123', 'admin');

-- To run this script simply go to your terminal and run "Get-Content add_user.sql | mysql -u root -p"
-- Then it'll ask for your root password give the password and database and tables will be created with the data we entered in addUser method

