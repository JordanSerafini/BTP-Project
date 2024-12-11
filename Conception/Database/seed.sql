BEGIN;

INSERT INTO "personnel" (firstname, lastname, emploi, email, phone, age) VALUES
('Jean', 'Martin', 'Chef de chantier', 'jean.martin@example.com', '0601020304', 45),
('Paul', 'Dupont', 'Ouvrier', 'paul.dupont@example.com', '0605060708', 34),
('Luc', 'Durand', 'Carreleur', 'luc.durand@example.com', '0611223344', 29),
('Michel', 'Petit', 'Carreleur', 'michel.petit@example.com', '0622334455', 38),
('Julien', 'Blanc', 'Manoeuvre', 'julien.blanc@example.com', '0633445566', 27),
('David', 'Morel', 'Manoeuvre', 'david.morel@example.com', '0644556677', 31),
('Olivier', 'Lemoine', 'Carreleur', 'olivier.lemoine@example.com', '0655667788', 36),
('Patrick', 'Girard', 'Chef de chantier', 'patrick.girard@example.com', '0666778899', 49),
('Pierre', 'Chevalier', 'Ouvrier', 'pierre.chevalier@example.com', '0677889900', 33),
('Thierry', 'Roux', 'Manoeuvre', 'thierry.roux@example.com', '0688990011', 29);

INSERT INTO "outils" (titre, description, image, quantité, quantité_disponible, notes) VALUES
('Truelle', 'Pour poser le ciment', NULL, 20, 15, NULL),
('Marteau', 'Pour casser les anciens carreaux', NULL, 10, 8, NULL),
('Mélangeur', 'Pour mélanger le mortier', NULL, 5, 4, NULL),
('Niveau à bulle', 'Pour vérifier les alignements', NULL, 15, 12, NULL),
('Coupe-carreaux', 'Pour couper les carreaux', NULL, 8, 6, NULL),
('Seau', 'Pour transporter le mortier', NULL, 10, 7, NULL);

INSERT INTO "materiel" (titre, description, image, quantité, quantité_disponible, prix_ht, prix_ttc, notes) VALUES
('Carrelage beige 30x30', 'Carrelage standard', NULL, 100, 70, 15.00, 18.00, NULL),
('Carrelage gris 20x20', 'Carrelage antidérapant', NULL, 200, 150, 20.00, 24.00, NULL),
('Mortier colle', 'Sac de 25kg', NULL, 50, 30, 7.50, 9.00, NULL),
('Mortier joint', 'Sac de 10kg', NULL, 40, 25, 5.00, 6.00, NULL),
('Plaque de plâtre', 'Pour cloisons', NULL, 30, 20, 10.00, 12.00, NULL);

INSERT INTO "client" (nom, prenom, adresse, ville, code_postal, email, phone, notes) VALUES
('Dupont', 'Marie', '10 rue des Lilas', 'Lyon', '69001', 'marie.dupont@example.com', '0611223344', NULL),
('Durand', 'Louis', '25 avenue des Fleurs', 'Marseille', '13001', 'louis.durand@example.com', '0622334455', NULL),
('Morel', 'Anne', '5 place des Rosiers', 'Toulouse', '31000', 'anne.morel@example.com', '0633445566', NULL),
('Petit', 'Julie', '15 boulevard des Acacias', 'Bordeaux', '33000', 'julie.petit@example.com', '0644556677', NULL),
('Chevalier', 'Marc', '20 chemin des Vignes', 'Nice', '06000', 'marc.chevalier@example.com', '0655667788', NULL);

INSERT INTO "prestation" (titre, description, prix_ht, prix_ttc, notes) VALUES
('Pose de carrelage standard', 'Carrelage 30x30', 30.00, 36.00, NULL),
('Pose de carrelage antidérapant', 'Carrelage 20x20', 40.00, 48.00, NULL),
('Réparation de carrelage', 'Réparation localisée', 20.00, 24.00, NULL);

INSERT INTO "devis" (titre, notes, client_id, created_at) VALUES
('Rénovation salle de bain', NULL, 1, '2023-06-15'),
('Pose carrelage cuisine', NULL, 2, '2023-07-20'),
('Terrasse extérieure', NULL, 3, '2023-08-10'),
('Piscine privée', NULL, 4, '2023-09-05'),
('Salon et séjour', NULL, 5, '2023-10-01'),
('Carrelage garage', NULL, 1, '2023-11-01'),
('Salle de conférence', NULL, 2, '2023-12-10'),
('Entrée principale', NULL, 3, '2024-01-15'),
('Cuisine moderne', NULL, 4, '2024-02-01'),
('Salle à manger', NULL, 5, '2024-02-15');

INSERT INTO "devis_prestation" (devis_id, prestation_id, quantite) VALUES
(1, 1, 15), (1, 3, 5), (2, 2, 20), (3, 1, 30), (4, 2, 25), (5, 1, 40),
(6, 1, 10), (7, 2, 15), (8, 1, 20), (9, 3, 5), (10, 2, 25);

INSERT INTO "chantiers" (titre, description, adresse, ville, code_postal, date_debut, date_fin, client_id, devis_id, notes) VALUES
('Salle de bain rénovée', 'Pose de carrelage et réparation', '10 rue des Lilas', 'Lyon', '69001', '2023-06-20', '2023-07-05', 1, 1, NULL),
('Cuisine moderne', 'Pose de carrelage antiderapant', '25 avenue des Fleurs', 'Marseille', '13001', '2023-07-25', '2023-08-10', 2, 2, NULL),
('Terrasse carrelée', 'Pose de carrelage extérieur', '5 place des Rosiers', 'Toulouse', '31000', '2023-08-15', '2023-09-01', 3, 3, NULL),
('Piscine design', 'Pose de carrelage pour piscine', '15 boulevard des Acacias', 'Bordeaux', '33000', '2023-09-10', '2023-09-25', 4, 4, NULL),
('Salon spacieux', 'Pose de carrelage intérieur', '20 chemin des Vignes', 'Nice', '06000', '2023-10-05', '2023-10-20', 5, 5, NULL),
('Garage moderne', 'Pose de carrelage pour garage', '30 rue des Sapins', 'Lyon', '69001', '2023-11-05', '2023-11-20', 1, 6, NULL),
('Salle polyvalente', 'Pose pour grande surface', '40 avenue du Parc', 'Marseille', '13001', '2023-12-01', '2023-12-15', 2, 7, NULL),
('Entrée moderne', 'Carrelage décoratif', '60 rue du Nord', 'Toulouse', '31000', '2024-01-05', '2024-01-20', 3, 8, NULL);

INSERT INTO "chantier_personnel" (chantier_id, personnel_id) VALUES
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(6, 1), (6, 2), (7, 3), (7, 4), (8, 5), (8, 6);

INSERT INTO "chantier_outils" (chantier_id, outil_id, quantite) VALUES
(1, 1, 5), (1, 2, 3), (2, 3, 2), (2, 4, 4), (3, 5, 6), (4, 6, 7), (5, 1, 8),
(6, 3, 3), (7, 4, 2), (8, 5, 4);

COMMIT;
