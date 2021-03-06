DROP DATABASE IF EXISTS cards_db;

CREATE DATABASE cards_db;

USE cards_db;

CREATE TABLE decks(
	`id` INT AUTO_INCREMENT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE cards(
	`id` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `img` VARCHAR(255),
    `description` VARCHAR(255),
    `deck_id` INT,
    `attributes` JSON,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE users(
	`id` INT AUTO_INCREMENT NOT NULL,
	`name` VARCHAR(255) NOT NULL,
    `deck_id` INT,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
