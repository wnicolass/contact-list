require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit("connected to db");
  })
  .catch((e) => console.log(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");

const {
  globalMiddleware,
  checkCSRFError,
  tokenInjection,
  serverError,
} = require("./src/middlewares/middleware");

// app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const expiryDate = 1000 * 60 * 60 * 24 * 7;
const sessionOptions = session({
  secret: process.env.SESSIONSECRET,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: expiryDate,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(globalMiddleware);
app.use(checkCSRFError);
app.use(tokenInjection);
app.use(routes);
app.use(serverError);

app.on("connected to db", () => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
