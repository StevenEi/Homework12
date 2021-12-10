INSERT INTO department (name)
VALUES ("History"),
("Math"),
("Chemistry"),
("Biology"),
("Admin"),
("Physics");
       
INSERT INTO role (title, salary, department_id)
VALUES ("History Guy", 275000, 1),
("Math Guy", 500000, 2),
("Chemistry Girl", 250000, 3),
("Biology Girl", 70000, 4),
("Head Person", 100000, 5),
("Physics Guy", 15000, 6);
      
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Head", "Person", 5, 1),
(2, "Ted", "Teddington", 2, 1),
(3, "Ken", "Kennington", 6, 1),
(4, "Stephanie", "Stephanie-ington", 3, 1),
(5, "Bob", "Bobbington", 1, 1),
(6, "Josie", "Josie-ington", 4, 1);