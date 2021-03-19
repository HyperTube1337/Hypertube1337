const express = require("express");
const router = express.Router();
const db = require("../db");
const passport = require("../passport");
const isUserAuth = require("./isUserAuth");
const jwt = require("jsonwebtoken")
const jwt_secret = "this is a jsonwebtoken secret";

router.get("/failed", (req, res) => {
  res.send("<h1>Log in Failed :(</h1>");
});

router.get("/profile", isUserAuth, (req, res) => {
  res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`);
});
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", (req, res, next) =>
  passport.authenticate("google", { failureRedirect: "/failed" }, function (err, user) {
    console.log(err, "-----------", user);
        let token = jwt.sign({user}, jwt_secret);
    res.setHeader('set-cookie','jwt='+token)
    res.send("done")
    //     // res.redirect('/profile');
  })(req, res, next)
);
module.exports = router;
