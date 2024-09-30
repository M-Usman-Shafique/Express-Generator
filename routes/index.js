const express = require("express");
const User = require("./users");
const router = express.Router();
const passport = require("passport");
const user = require("./user");
const localStrategy = require("passport-local");

passport.use(new localStrategy(user.authenticate()));

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

// Search on the basis of a specific name
router.get("/allUsers", async function (req, res) {
  // new RegExp(search, flag);
  const regex = new RegExp("^usMan$", i);
  const allUsers = await User.find({ name: regex });
  res.send(allUsers);
});

// Search on the basis of a field exists in schema:
router.get("/allUsers", async function (req, res) {
  const allUsers = await User.find({ age: { $exists: true } });
  res.send(allUsers);
});

// Search users between a specific range of date:
router.get("/allUsers", async function (req, res) {
  const date1 = new Date("2024-08-30");
  const date2 = new Date("2024-09-30");
  const allUsers = await User.find({ createdAt: { $gte: date1, $lte: date2 } });
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
router.get("/banned", function (req, res) {
  req.session.banned = true;
  res.send("<h1>ban session is true</h1>");
});

// Reading Session
router.get("/checkban", function (req, res) {
  if (req.session.banned) {
    res.send("<h1>You are banned</h1>");
  } else {
    res.send("<h1>Not banned</h1>");
  }
});

// Removing Session
router.get("/removeban", function (req, res) {
  req.session.destroy((error) => {
    if (error) throw error;
    res.send("<h1>ban removed</h1>");
  });
});

// Creating Cookie
router.get("/cookie", function (req, res) {
  res.cookie("username", "Ali");
  res.send("<h1>Cookie created</h1>");
});

// Read Cookie
router.get("/check", function (req, res) {
  console.log(req.cookies.username);
  res.send("<h1>Check server console</h1>");
});

// Read Cookie
router.get("/clear", function (req, res) {
  res.clearCookie("username");
  res.send("<h1>Cookie cleared</h1>");
});

// Flash Messages

router.get("/flash", function (req, res) {
  res.render("flashError");
});

router.get("/fail", function (req, res) {
  req.flash("name", "Azib");
  req.flash("age", 14);
  res.send("flash message created.");
});

router.get("/checkfail", function (req, res) {
  console.log(req.flash("name"), req.flash("age"));
  res.send("see server console");
});

router.get("/profile", isLoggedIn, function (req, res) {
  // res.send("<h1>Welcome to profile</h1>");
  res.render("profile");
});

router.get("/login", function (req, res) {
  // res.send("Login page");
  res.render("login")
})

// register route
router.post("/register", function (req, res) {
  var userdata = new user({
    username: req.body.username,
    secret: req.body.secret,
  });

  user.register(userdata, req.body.password).then(function (registereduser) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/login");
    });
  });
});

// Login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

// Code for Logout
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
