require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const routes = require("./routes");
const path = require("path");
const app = express();

const { DATABASE_URL, SESSION_SECRET, SSL_MODE } = process.env;

if (DATABASE_URL == null) {
  console.error("DATABASE CREDS WERE NULL OR NOT DEFINED! APP WILL NOT START");
}
let DbCreds = /^postgres:\/\/([A-Za-z0-9]+)\:([0-9A-Za-z]+)@([A-Za-z0-9\.\-]+):(\d+)\/([a-zA-Z0-9]+)/.exec(
  DATABASE_URL
);
// console.log(DbCreds);
let DATABASE_USERNAME = DbCreds[1];
let DATABASE_PASSWORD = DbCreds[2];
let DATABASE_HOST = DbCreds[3];
let DATABASE_PORT = DbCreds[4];
let DATABASE_NAME = DbCreds[5];

let { SERVER_HOST, SERVER_PORT, HOST, PORT } = process.env;

HOST = SERVER_HOST || HOST || "localhost";
PORT = SERVER_PORT || PORT || 5050;

app.use(express.json());

app.use(
  session({
    // dont save the session if the session has not been touched
    saveUninitialized: false,
    // unsure what this does...
    resave: true,
    /**
     * this renews the session when
     * the session is modified
     */
    rolling: true,
    secret: SESSION_SECRET || "THIS IS A SECRET",
  })
);
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/api", routes);
massive({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  ssl: {
    mode: SSL_MODE || "require",
    rejectUnauthorized: false,
  },
}).then((db) => {
  app.set("db", db);
  app.listen(PORT, HOST, (server) => {
    console.log(`server listening on http://${HOST}:${PORT}`);
  });
});
