const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/amazing-final-project`
);

module.exports.getSetupMarkers = () => {
    return db.query(`SELECT * FROM potential_incident_places`);
};

exports.addMarker = (name, longitude, latitude) => {
    return db.query(
        `INSERT INTO potential_incident_places (name, longitude, latitude)
        VALUES ($1, $2, $3) RETURNING *`,
        [name, longitude, latitude]
    );
};

module.exports.getMarkerInfo = () => {
    return db.query(`SELECT * FROM potential_incident_places`);
};

exports.getMarkerInfo = (markerId) => {
    return db.query(`SELECT * FROM potential_incident_places WHERE id = $1`, [
        markerId,
    ]);
};
