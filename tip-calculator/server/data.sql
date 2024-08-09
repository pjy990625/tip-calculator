CREATE DATABASE kai;
CREATE TABLE branches (
    branch_id serial PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL
);
CREATE TABLE employees (
    employee_id serial PRIMARY KEY,
    branch_id INT REFERENCES branches(branch_id),
    employee_fname VARCHAR(100) NOT NULL,
    employee_lname VARCHAR(50) NOT NULL,
    employee_role VARCHAR(1) NOT NULL
);
CREATE TABLE tips (
    tip_id serial PRIMARY KEY,
    branch_id INT REFERENCES branches(branch_id),
    tip_date DATE NOT NULL,
    morning_tip_amount NUMERIC(10, 2) NOT NULL,
    evening_tip_amount NUMERIC(10, 2) NOT NULL
);
CREATE TABLE work_hours (
    work_id serial PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id),
    work_date DATE NOT NULL,
    hours_worked NUMERIC(4, 2) NOT NULL
);

INSERT INTO branches (branch_name) VALUES ('Port Coquitlam'), ('Langley');