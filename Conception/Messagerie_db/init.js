// Connexion à MongoDB
let db = connect("mongodb://admin:secret@mongo_db:27017/admin");

// Sélectionner la base de données cible
db = db.getSiblingDB("messagerie_db");

// Création des utilisateurs
let user1 = db.users.insertOne({
  username: "jordan",
  email: "jean@example.com",
  password: "hashed_password_jean",
  profile_image: null,
  status: "online",
  created_at: new Date(),
});

let user2 = db.users.insertOne({
  username: "paul",
  email: "paul@example.com",
  password: "hashed_password_paul",
  profile_image: null,
  status: "offline",
  created_at: new Date(),
});

let user3 = db.users.insertOne({
  username: "marie",
  email: "marie@example.com",
  password: "hashed_password_marie",
  profile_image: null,
  status: "away",
  created_at: new Date(),
});

let user4 = db.users.insertOne({
  username: "sophie",
  email: "sophie@example.com",
  password: "hashed_password_sophie",
  profile_image: null,
  status: "online",
  created_at: new Date(),
});

let user5 = db.users.insertOne({
  username: "luc",
  email: "luc@example.com",
  password: "hashed_password_luc",
  profile_image: null,
  status: "offline",
  created_at: new Date(),
});

// Création des groupes
let group1 = db.groups.insertOne({
  name: "Projet Alpha",
  type: "group",
  members: [
    { user_id: user1.insertedId, joined_at: new Date() },
    { user_id: user2.insertedId, joined_at: new Date() },
    { user_id: user3.insertedId, joined_at: new Date() },
  ],
  created_by: user1.insertedId,
  created_at: new Date(),
});

let group2 = db.groups.insertOne({
  name: null, // Discussion directe
  type: "direct",
  members: [
    { user_id: user1.insertedId, joined_at: new Date() },
    { user_id: user2.insertedId, joined_at: new Date() },
  ],
  created_by: user1.insertedId,
  created_at: new Date(),
});

let group3 = db.groups.insertOne({
  name: "Projet Beta",
  type: "group",
  members: [
    { user_id: user3.insertedId, joined_at: new Date() },
    { user_id: user4.insertedId, joined_at: new Date() },
    { user_id: user5.insertedId, joined_at: new Date() },
  ],
  created_by: user3.insertedId,
  created_at: new Date(),
});

// Création des messages
db.messages.insertOne({
  group_id: group1.insertedId,
  sender_id: user1.insertedId,
  content: "Bienvenue dans le projet Alpha !",
  status: "sent",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group1.insertedId,
  sender_id: user2.insertedId,
  content: "Merci Jean, ravi de participer.",
  status: "read",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group2.insertedId,
  sender_id: user1.insertedId,
  content: "Salut Paul, ça va ?",
  status: "delivered",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group2.insertedId,
  sender_id: user2.insertedId,
  content: "Salut Jean, oui ça va et toi ?",
  status: "read",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group3.insertedId,
  sender_id: user3.insertedId,
  content: "Lancement du projet Beta, bienvenue à tous !",
  status: "sent",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group3.insertedId,
  sender_id: user4.insertedId,
  content: "Merci Marie, prête pour le projet.",
  status: "delivered",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group3.insertedId,
  sender_id: user5.insertedId,
  content: "Hâte de commencer ce nouveau projet.",
  status: "read",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group1.insertedId,
  sender_id: user3.insertedId,
  content: "Jean, peux-tu partager les fichiers ?",
  status: "sent",
  created_at: new Date(),
});

db.messages.insertOne({
  group_id: group1.insertedId,
  sender_id: user1.insertedId,
  content: "Bien sûr, je vais les envoyer sous peu.",
  status: "delivered",
  created_at: new Date(),
});

// Affichage final pour confirmer
print("Initialisation de la base de données MongoDB terminée.");
