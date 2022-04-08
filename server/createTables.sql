DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS reset_codes CASCADE;

-- new users table:
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first       VARCHAR(255) NOT NULL CHECK (first != ''),
    last        VARCHAR(255) NOT NULL CHECK (last != ''),
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    image_url   VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- for code resetting:
CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
