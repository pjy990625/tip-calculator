CREATE TABLE locations (
    location_id serial PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL
);
CREATE TABLE employees (
    employee_id serial PRIMARY KEY,
    location_id INT REFERENCES locations(location_id),
    employee_name VARCHAR(100) NOT NULL,
    employee_role VARCHAR(1) NOT NULL
);
CREATE TABLE dates (
    date_id serial PRIMARY KEY,
    date DATE NOT NULL UNIQUE
);
CREATE TABLE tips (
    tip_id serial PRIMARY KEY,
    location_id INT REFERENCES locations(location_id),
    date_id INT REFERENCES dates(date_id),
    morning_tip_amount NUMERIC(6, 2) NOT NULL,
    evening_tip_amount NUMERIC(6, 2) NOT NULL
);
CREATE TABLE work_hours (
    hour_id serial PRIMARY KEY,
    employee_id INT REFERENCES employees(employee_id),
    date_id INT REFERENCES dates(date_id),
    hours_worked NUMERIC(4, 2) NOT NULL,
    shift_period VARCHAR(10) NOT NULL
);
INSERT INTO locations (location_name)
VALUES ('Port Coquitlam'),
    ('Langley');
INSERT INTO employees (location_id, employee_name, employee_role)
VALUES (1, 'John Doe', 'K'),
    (2, 'Jane Smith', 'S'),
    (1, 'Michael Brown', 'S'),
    (2, 'Lisa Johnson', 'S'),
    (2, 'Emily Davis', 'K'),
    (1, 'James Wilson', 'S'),
    (1, 'Sarah Miller', 'K'),
    (2, 'David Martinez', 'K'),
    (2, 'Sophia Lee', 'S');
INSERT INTO dates (date)
VALUES ('2024-08-01'),
    ('2024-08-02'),
    ('2024-08-03'),
    ('2024-08-04'),
    ('2024-08-05'),
    ('2024-08-06'),
    ('2024-08-07');
INSERT INTO tips (
        location_id,
        date_id,
        morning_tip_amount,
        evening_tip_amount
    )
VALUES (1, 1, 250.75, 320.50),
    (2, 1, 180.25, 210.00),
    (1, 2, 200.50, 290.30),
    (2, 2, 170.40, 225.75),
    (1, 3, 260.85, 310.60),
    (2, 3, 190.00, 230.45),
    (1, 4, 220.00, 305.10),
    (2, 4, 185.75, 240.30);
INSERT INTO work_hours (employee_id, date_id, hours_worked, shift_period)
VALUES (1, 1, 4.50, 'Morning'),
    (2, 1, 5.00, 'Evening'),
    (3, 2, 4.00, 'Morning'),
    (4, 2, 4.75, 'Evening'),
    (5, 3, 3.50, 'Morning'),
    (6, 3, 5.00, 'Evening'),
    (7, 4, 4.25, 'Morning'),
    (8, 4, 4.50, 'Evening');