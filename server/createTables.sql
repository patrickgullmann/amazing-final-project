DROP TABLE IF EXISTS potential_incident_places;

 CREATE TABLE potential_incident_places(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    url VARCHAR(255),
    longitude DECIMAL NOT NULL,
    latitude DECIMAL NOT NULL,
    counter INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

--   CREATE TABLE comments(
--     id SERIAL PRIMARY KEY,
--     sender_id INTEGER NOT NULL REFERENCES potential_incident_places(id),    
--     comment VARCHAR NOT NULL,
--     ggf. rating or times clicked!
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--  );

 
INSERT INTO potential_incident_places (title, description, longitude, latitude, counter) VALUES ('Kotttttiiii', 'Wow Kotti ist echt beim rechts-abbiegen', 13.583309, 52.516806, 6);


