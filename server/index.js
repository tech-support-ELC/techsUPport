
const express = require("express");
const path = require("path");
const cluster = require("cluster");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const { User } = require('./db/models')
const sessionStore = new SequelizeStore({ db });
const numCPUs = require("os").cpus().length;
const isDev = process.env.NODE_ENV !== "production";
if (isDev) require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = express();
module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {


  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "We have the best Capstone team",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // app.use(cors({
  //   origin: CLIENT_ORIGIN
  // }))

  // Image upload middleware
  // app.use(require('./cloudinaryMiddleware'))

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  app.use("/api", require("./api"));
  app.use("/auth", require("./auth"));

  // Answer API requests.
  // app.get("/api", function (req, res) {
  //   res.set("Content-Type", "application/json");
  //   res.send('{"message":"Hello from the custom server!"}');
  // });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../react-ui/build", "index.html"));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });

  app.listen(PORT, async function () {
    console.error(
      `Node ${
      isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
    await sessionStore.sync()
    await db.sync();
    console.log("db synced");
  });
}
