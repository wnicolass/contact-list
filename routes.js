const express = require("express");
const route = express.Router();
const HomeController = require("./src/controllers/HomeController");
const LoginController = require("./src/controllers/LoginController");
const ContactController = require("./src/controllers/ContactController");

const { loginRequired } = require("./src/middlewares/middleware");

//home routes
route.get("/", HomeController.index);

//login routes
route.get("/login/index", LoginController.index);
route.post("/login/register", LoginController.register);
route.post("/login/signin", LoginController.signIn);
route.get("/login/signout", LoginController.signOut);

//contact routes
route.get("/contact/index", loginRequired, ContactController.index);
route.post("/contact/create", loginRequired, ContactController.create);
route.get("/contact/index/:id", loginRequired, ContactController.editIndex);
route.post("/contact/edit/:id", loginRequired, ContactController.edit);
route.get("/contact/delete/:id", loginRequired, ContactController.delete);

module.exports = route;
