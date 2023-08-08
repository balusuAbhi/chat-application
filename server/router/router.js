const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("pages/login.ejs");
});
Router.get("/home", (req, res) => {
  res.render("pages/home.ejs");
});

module.exports = Router;
