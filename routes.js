const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/HomeController");
const contactController = require("./src/controllers/ContactController");

route.get("/", homeController.homePage);
route.post("/", homeController.postPage);

route.get("/contact", contactController.homePage);

module.exports = route;
