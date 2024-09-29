const express = require("express");
const User = require("./users");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

router.get("/create", async function (req, res) {
  const createdUser = await User.create({
    name: "Adnan",
    age: 27,
    email: "adnan@test.com",
  });
  res.send(createdUser);
});

router.get("/allUsers", async function (req, res) {
  const allUsers = await User.find();
  res.send(allUsers);
});

router.get("/oneUser", async function (req, res) {
  const oneUser = await User.findOne({ name: "Noman" });
  res.send(oneUser);
});

router.get("/deleteUser", async function (req, res) {
  const deletedUser = await User.findOneAndDelete({ name: "Noman" });
  res.send(deletedUser);
});

router.get("/deleteAll", async function (req, res) {
  const deletedUsers = await User.deleteMany();
  res.send(deletedUsers);
});

// Creating Session
router.get("/banned", async function (req, res) {
  req.session.banned = true;
  res.send("<h1>ban session is true</h1>")
});

// Reading Session
router.get("/checkban", async function (req, res) {
  if (req.session.banned) {
    res.send("<h1>You are banned</h1>");
  } else {
    res.send("<h1>Not banned</h1>")
  }
});

// Removing Session
router.get("/removeban", async function (req, res) {
  req.session.destroy((error) => {
    if (error) throw error;
    res.send("<h1>ban removed</h1>")
  })
});

// Creating Cookie
router.get("/cookie", async function (req, res) {
  res.cookie("username", "Ali");
  res.send("<h1>Cookie created</h1>")
});

// Read Cookie
router.get("/check", async function (req, res) {
  console.log(req.cookies.username)
  res.send("<h1>Check server console</h1>")
});

// Read Cookie
router.get("/clear", async function (req, res) {
  res.clearCookie("username");
  res.send("<h1>Cookie cleared</h1>")
});

module.exports = router;
