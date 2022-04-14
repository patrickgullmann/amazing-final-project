DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS reset_codes CASCADE;

-- new users table:
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first       VARCHAR(255) NOT NULL CHECK (first != ''),
    last        VARCHAR(255) NOT NULL CHECK (last != ''),
    email       VARCHAR(255) NOT NULL UNIQUE CONSTRAINT valid_email CHECK (email ~ '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'),
    password    VARCHAR(255) NOT NULL,
    image_url   VARCHAR(255),
    biography   VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- for code resetting:
CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--friendsss
CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    recipient_id INTEGER NOT NULL REFERENCES users(id),
    accepted BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--smth to test all of this stuff
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(206,1,true);
INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES(202,1,false);
DELETE FROM friendships WHERE id = 1;