const express = require("express");
const router = express.Router();
const db = require("../db");
const passport = require("../passport");
const isUserAuth = require("./isUserAuth");
const jwt = require("jsonwebtoken");
const jwt_secret = "this is a jsonwebtoken secret";

router.get("/auth/google", passport.authenticate("google"));

router.get("/auth/google/callback", (req, res, next) =>
  passport.authenticate("google", function (err, user) {
    if (err) return res.redirect("http://localhost:3000/login");
    let token = jwt.sign({ user }, jwt_secret);
    res.cookie("jwt", token, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false });
    res.redirect("http://localhost:3000/");
  })(req, res, next)
);

router.get("/auth/github", passport.authenticate("github"));

router.get("/auth/github/callback", (req, res, next) =>
  passport.authenticate("github", function (err, user) {
    if (err) return res.redirect("http://localhost:3000/login");
    let token = jwt.sign({ user }, jwt_secret);
    res.cookie("jwt", token, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false });
    res.redirect("http://localhost:3000/");
  })(req, res, next)
);

router.get("/auth/42", passport.authenticate("42"));

router.get("/auth/42/callback", (req, res, next) =>
  passport.authenticate("42", function (err, user) {
    if (err) return res.redirect("http://localhost:3000/login");
    let token = jwt.sign({ user }, jwt_secret);
    res.cookie("jwt", token, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false });
    res.redirect("http://localhost:3000/");
  })(req, res, next)
);
module.exports = router;
