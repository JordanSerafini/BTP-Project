CREATE DATABASE btp_db;
\connect btp_db
CREATE USER user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE btp_db TO user;

BEGIN;

CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "image" TEXT,
    "phone" TEXT,
    "age" INTEGER,
    "address" TEXT,
    "city" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "personnel" (
    "id" SERIAL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,   
    "emploi" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "phone" TEXT,
    "age" INTEGER
);

CREATE TABLE IF NOT EXISTS "outils" (
    "id" SERIAL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "description" TEXT,   
    "image" TEXT,
    "quantité" INTEGER NOT NULL,
    "quantité_disponible" INTEGER NOT NULL,
    "notes" TEXT
);

CREATE TABLE IF NOT EXISTS "materiel" (
    "id" SERIAL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "description" TEXT,   
    "image" TEXT,
    "quantité" INTEGER NOT NULL,
    "quantité_disponible" INTEGER NOT NULL,
    "prix_ht" DECIMAL(10, 2),
    "prix_ttc" DECIMAL(10, 2),
    "notes" TEXT
);

CREATE TABLE IF NOT EXISTS "client" (
    "id" SERIAL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT,   
    "adresse" TEXT,
    "ville" TEXT NOT NULL,
    "code_postal" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "notes" TEXT
);

CREATE TABLE IF NOT EXISTS "prestation" (
    "id" SERIAL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "prix_ht" DECIMAL(10, 2),
    "prix_ttc" DECIMAL(10, 2),  
    "notes" TEXT
);

CREATE TABLE IF NOT EXISTS "devis" ( 
    "id" SERIAL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "notes" TEXT,
    "client_id" INTEGER NOT NULL REFERENCES client(id) ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "devis_prestation" (
    "id" SERIAL PRIMARY KEY,
    "devis_id" INTEGER NOT NULL REFERENCES devis(id) ON DELETE CASCADE,
    "prestation_id" INTEGER NOT NULL REFERENCES prestation(id) ON DELETE CASCADE,
    "quantite" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "devis_materiel" (
    "id" SERIAL PRIMARY KEY,
    "devis_id" INTEGER NOT NULL REFERENCES devis(id) ON DELETE CASCADE,
    "materiel_id" INTEGER NOT NULL REFERENCES materiel(id) ON DELETE CASCADE,
    "quantite" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "chantiers" (
    "id" SERIAL PRIMARY KEY,
    "titre" TEXT NOT NULL,
    "description" TEXT,   
    "adresse" TEXT,
    "ville" TEXT,
    "code_postal" TEXT,
    "date_debut" DATE,
    "date_fin" DATE,
    "client_id" INTEGER NOT NULL REFERENCES client(id) ON DELETE CASCADE,
    "devis_id" INTEGER NOT NULL REFERENCES devis(id) ON DELETE CASCADE,
    "notes" TEXT
);

CREATE TABLE IF NOT EXISTS "chantier_personnel" (
    "id" SERIAL PRIMARY KEY,
    "chantier_id" INTEGER NOT NULL REFERENCES chantiers(id) ON DELETE CASCADE,
    "personnel_id" INTEGER NOT NULL REFERENCES personnel(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "chantier_outils" (
    "id" SERIAL PRIMARY KEY,
    "chantier_id" INTEGER NOT NULL REFERENCES chantiers(id) ON DELETE CASCADE,
    "outil_id" INTEGER NOT NULL REFERENCES outils(id) ON DELETE CASCADE,
    "quantite" INTEGER NOT NULL
);



COMMIT;
