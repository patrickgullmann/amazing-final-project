const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/amazing-final-project`
);

module.exports.getSetupMarkers = () => {
    return db.query(`SELECT * FROM potential_incident_places`);
};

exports.addMarker = (title, description, longitude, latitude, url, counter) => {
    return db.query(
        `INSERT INTO potential_incident_places (title, description, longitude, latitude, url, counter)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, description, longitude, latitude, url, counter]
    );
};

module.exports.getMarkerInfo = () => {
    return db.query(`SELECT * FROM potential_incident_places`);
};

exports.getMarkerCount = (markerId) => {
    return db.query(
        `SELECT counter FROM potential_incident_places WHERE id = $1`,
        [markerId]
    );
};

exports.increaseMarkerCount = (markerId, newCount) => {
    return db.query(
        `UPDATE potential_incident_places SET counter = $2 WHERE id = $1 RETURNING *`,
        [markerId, newCount]
    );
};
