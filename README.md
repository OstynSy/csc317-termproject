# CSC 317 Term Project

## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information   |
|:-------------:|:-------------:|
| Student Name  | Ostyn Sy      |
| Student ID    | 921458262     |
| Student Email | osy@mail.sfsu.edu    |



# Build/Run Instructions

## Web Application
http://localhost:3000/

## Script for DatabaseTables
CREATE DATABASE IF NOT EXISTS 'csc317db';

USE 'csc317db'

CREATE TABLE IF NOT EXISTS `csc317db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `usertype` INT NOT NULL DEFAULT 0,
  `active` INT NOT NULL DEFAULT 0,
  `created` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `csc317db`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL,
  `description` VARCHAR(4096) NOT NULL,
  `photopath` VARCHAR(4096) NOT NULL,
  `thumbnail` VARCHAR(4096) NOT NULL,
  `active` INT NOT NULL DEFAULT 0,
  `created` DATETIME NOT NULL,
  `fk_userid` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `posts to users_idx` (`fk_userid` ASC) VISIBLE,
  CONSTRAINT `posts to users`
    FOREIGN KEY (`fk_userid`)
    REFERENCES `csc317db`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB

## Dependencies
To install dependencies:
    use 'npm i {dependency}' in console
1. nodemon
2. bcrypt
3. express-sessions 
3. express-mysql-session
4. mysql2
5. express-flash
6. express-handlebars
7. express
8. morgan
9. colors
10. debug
11. multer
12. sharp
13. axios
14. fetch

## Build Instructions
1. 
2. 

## Run Instructions
1. nodemon
