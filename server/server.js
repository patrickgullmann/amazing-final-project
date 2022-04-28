const { smileys, randomIntFromInterval } = require("./smileys.js");

const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

const cookieSession = require("cookie-session");
const secrets =
    process.env.SESSION_SECRET || require("./secrets").COOKIE_SECRET;
const { hash, compare } = require("./auth");
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

app.get("/api/user/id", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
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
