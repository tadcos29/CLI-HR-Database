DROP DATABASE IF EXISTS cli_hr_db;
CREATE DATABASE cli_hr_db;

USE cli_hr_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(20,2),
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
  ON DELETE SET NULL
);