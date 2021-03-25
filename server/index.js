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

// console.log(DbCreds);

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
  connectionString:DATABASE_URL,
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
