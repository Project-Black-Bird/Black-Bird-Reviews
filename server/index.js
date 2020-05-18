const express = require("express");
const massive = require("massive");

const session = require("express-session");
const routes = require("./routes");
const app = express();

const { DATABASE_URL, SERVER_HOST, SERVER_PORT, SESSION_SECRET } = process.env;
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

massive(DATABASE_URL).then((db) => {
  app.set("db", db);
  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`server listening on ${SERVER_HOST}:${SERVER_PORT}`);
  });
});
