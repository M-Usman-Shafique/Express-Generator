const express = require("express");
const Person = require("../models/person");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("createPerson");
});

router.get("/people", async (req, res) => {
  let people = await Person.find();
  res.render("people", { people: people });
});

router.get("/edit/:id", async (req, res) => {
  let person = await Person.findOne({ _id: req.params.id });
  res.render("editPerson", { person });
});

router.post("/update/:id", async (req, res) => {
  let { username, email, image} = req.body;
  let person = await Person.findOneAndUpdate({ _id: req.params.id }, {username, email, image}, {new: true});
  res.redirect("/people");
});

router.get("/delete/:id", async (req, res) => {
  let person = await Person.findOneAndDelete({ _id: req.params.id });
  res.redirect("/people");
});

router.post("/create", async (req, res) => {
  let { username, email, image } = req.body;

  let person = await Person.create({
    username,
    email,
    image,
  });

  res.redirect("/people");
});

module.exports = router;
