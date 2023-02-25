USE cli_hr_db

INSERT INTO department (dept_name)
VALUES 
('Temporal Salvage'),
('Soul Sales'), 
('Matchmaking'), 
('Accountability'),
('Research and Exploration');

INSERT INTO role (title, salary, department_id)
VALUES ('Director', 7000.00, null), 
('Chief Temporal Salvager', 150000.00, 1),
('Temporal Salvager', 150000.00, 1),
('Chief Soul Salesperson', 130000.00, 2),
('Soul Salesperson', 90000.00, 2),
('Head Matchmaker', 170000.00, 3), 
('Matchmaker', 120000.00, 3), 
('Head of Accountability', 120000.00, 4),
('Senior Pursuivant', 120000.00, 4), 
('Pursuivant', 120000.00, 4), 
('Ledgerkeeper', 120000.00, 4), 
('Chief Investigator', 120000.00, 5), 
('Senior Investigator', 120000.00, 5),
('Investigator', 120000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 1, null ),
('Emma', 'Woodhouse', 6, 1),
('Charles', 'Swann', 2, 1),
('Oriane', 'de Guermantes', 3, 3),
('Palamede', ' de Charlus', 3, 3),
('Dementiy', 'Veen', 3, 3),
('Anne', 'Steele', 7, 2),
('Fitzwilliam', 'Darcy', 7, 2),
('Pavel', 'Chichikov', 4, 1),
('Annabel', 'Lee', 5, 9),
('Johann Georg', 'Faust', 5, 9),
('Ivan', 'Karamazov', 8, 1),
('Javert', 'Vidocq', 9, 12),
('Charles', 'Marlow', 10, 12),
('Catherine', 'Earnshaw', 10, 12),
('Rodion', 'Raskolnikov', 11, 13),
('Victor', 'Frankenstein', 12, 1),
('Timofey', 'Pnin', 13, 17),
('Abraham', 'van Helsing', 13, 17),
('Ammon', 'Lymphater', 14, 17),
('Nemo', 'Dakkar', 14, 18),
('Jane', 'Porter', 14, 18);