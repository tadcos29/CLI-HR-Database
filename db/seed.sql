USE cli_hr_db

INSERT INTO department (dept_name)
VALUES ('Temporal Salvage'), ('Soul Sales'), ('Matchmaking'), ('Accountability');

INSERT INTO role (title, salary, department_id)
VALUES ('Director', 7000.00, null),
('Chief Temporal Salvager', 150000.00, 1),
 ('Temporal Salvager',150000.00, 1),
  ('Chief Soul Salesperson', 130000.00, 2),
   ('Soul Salesperson', 90000.00, 2),
    ('Head Matchmaker', 170000.00, 3),
     ('Matchmaker', 120000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, null ), ('Emma', 'Woodhouse', 6, 1), ('Charles', 'Swann', 2, 1);