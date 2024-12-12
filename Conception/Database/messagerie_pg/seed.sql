BEGIN;

INSERT INTO users (username, email, password, profile_image, status) VALUES
('jordan', 'jean@example.com', 'hashed_password_jean', NULL, 'online'),
('paul', 'paul@example.com', 'hashed_password_paul', NULL, 'offline'),
('marie', 'marie@example.com', 'hashed_password_marie', NULL, 'away');

INSERT INTO groups (name, type, created_by) VALUES
('Projet Alpha', 'group', 1),
(NULL, 'direct', 1),
(NULL, 'direct', 2);

INSERT INTO group_members (group_id, user_id) VALUES
(1, 1), (1, 2), (1, 3), 
(2, 1), (2, 2), 
(3, 2), (3, 3); -- Discussion directe entre Paul et Marie

INSERT INTO messages (group_id, sender_id, content, attachments, status) VALUES
(1, 1, 'Bienvenue dans le projet Alpha !', NULL, 'sent'),
(1, 2, 'Merci Jean, ravi de participer.', NULL, 'read'),
(2, 1, 'Salut Paul, ça va ?', NULL, 'delivered'),
(2, 2, 'Salut Jean, oui ça va et toi ?', NULL, 'read');

COMMIT;