DROP TABLE IF EXISTS potential_incident_places;

 CREATE TABLE potential_incident_places(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    longitude DECIMAL NOT NULL,
    latitude DECIMAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

--   CREATE TABLE comments(
--     id SERIAL PRIMARY KEY,
--     sender_id INTEGER NOT NULL REFERENCES potential_incident_places(id),    
--     comment VARCHAR NOT NULL,
--     ggf. rating or times clicked!
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--  );

 
INSERT INTO potential_incident_places (name, longitude, latitude) VALUES ('Place 1', 13.383309, 52.516806 );
INSERT INTO potential_incident_places (name, longitude, latitude) VALUES ('Place 2', 13.383309, 52.616806 );
INSERT INTO potential_incident_places (name, longitude, latitude) VALUES ('Place 3', 13.483309, 52.616806 );

