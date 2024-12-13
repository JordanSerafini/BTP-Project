// Connexion à MongoDB
let db = connect("mongodb://admin:secret@localhost:27017/admin");

// Sélectionner la base de données cible
db = db.getSiblingDB("devis_db");