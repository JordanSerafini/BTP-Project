BEGIN;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, 
    profile_image TEXT, 
    status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'away')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name TEXT, -- Nom du groupe (null si discussion directe)
    type TEXT NOT NULL CHECK (type IN ('group', 'direct')), -- 'group' ou 'direct'
    last_message_id INTEGER REFERENCES messages(id) ON DELETE SET NULL,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE group_members (
    id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL, 
    status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read'));
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;