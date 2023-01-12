const express = require("express");
const route = express.Router();
const HomeController = require("./src/controllers/HomeController");
const LoginController = require("./src/controllers/LoginController");
const ContactController = require("./src/controllers/ContactController");

//home routes
route.get("/", HomeController.index);

//login routes
route.get("/login/index", LoginController.index);
route.post("/login/register", LoginController.register);
route.post("/login/signin", LoginController.signIn);
route.get("/login/signout", LoginController.signOut);

//contact routes
route.get("/contact/index", ContactController.index);

module.exports = route;
