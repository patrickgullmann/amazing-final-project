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

app.post("/api/new-marker", async (req, res) => {
    const { name, longitude, latitude } = req.body;
    const { rows } = await db.addMarker(name, longitude, latitude);
    //console.log(rows[0]);
    res.json(rows[0]);
});

app.get("/api/get-marker-info/:markerId", async (req, res) => {
    const markerId = req.params.markerId;
    const { rows } = await db.getMarkerInfo(markerId);
    console.log(rows[0]);
    res.json(rows[0]);
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
