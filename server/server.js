const { smileys, randomIntFromInterval } = require("./smileys.js");

const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

const cookieSession = require("cookie-session");
const secrets =
    process.env.SESSION_SECRET || require("./secrets").COOKIE_SECRET;
const db = require("./db");

const { uploader } = require("./upload");
const s3 = require("./s3");

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const cookieSessionMiddleware = cookieSession({
    secret: secrets,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use((req, res, next) => {
    res.set("x-frame-options", "deny");
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

/* ------------------ NON-SETUP PART ------------------------------------------------------------ */

app.get("/api/setup-markers", async (req, res) => {
    const { rows } = await db.getSetupMarkers();
    //console.log(rows);
    res.json(rows);
});

app.post(
    "/api/new-marker",
    uploader.single("file"),
    s3.upload,
    async (req, res) => {
        const { title, description } = req.body;
        const { longitude, latitude } = JSON.parse(req.body.location);
        const url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
        const counter = 1;

        const { rows } = await db.addMarker(
            title,
            description,
            longitude,
            latitude,
            url,
            counter
        );
        //console.log(rows[0]);
        res.json(rows[0]);
    }
);

app.get("/api/increase-count-for-marker/:markerId", async (req, res) => {
    const markerId = req.params.markerId;
    const { rows } = await db.getMarkerCount(markerId);
    const { rows: newRows } = await db.increaseMarkerCount(
        markerId,
        rows[0].counter + 1
    );
    res.json(newRows[0]);
});

/* ------------------ ALL ROUTES BEFORE HERE AND SOCKETS PART ------------------------------------ */

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log(
        ` ${
            smileys[randomIntFromInterval(0, smileys.length - 1)]
        } Eyoo I'm listening on 3000 webpack ${
            smileys[randomIntFromInterval(0, smileys.length - 1)]
        } `
    );
});

let onlineUsers = {};

io.on("connection", async (socket) => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    //setup for onlineUsers
    onlineUsers[socket.id] = userId;
    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
    });
});

//npm run dev:server // npm run dev:client // npm run build (shows bundle)
