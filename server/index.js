require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const routes = require("./routes");
const app = express();

const {
  DATABASE_URL,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,

  SESSION_SECRET,
  SSL_MODE,
} = process.env;
let { SERVER_HOST, SERVER_PORT } = process.env;
SERVER_HOST = SERVER_HOST || "localhost";
SERVER_PORT = SERVER_PORT || 5050;

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
  app.listen(SERVER_PORT, SERVER_HOST, (server) => {
    console.log(`server listening on http://${SERVER_HOST}:${SERVER_PORT}`);
  });
});
