const express = require("express");
const Person = require("../models/person");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("social");
});

router.get("/posts", async (req, res) => {
  let people = await Person.find();
  res.render("posts", {people: people});
});

router.post("/create", async (req, res) => {
  let { username, email, image } = req.body;

  let person = await Person.create({
    username,
    email,
    image,
  });

  res.redirect("/posts");
});

module.exports = router;