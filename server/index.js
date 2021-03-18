const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./user/register");
const tokenpass = require("./user/tokenpass");
const confirm = require("./user/confirm");
const fgpass = require("./user/fgpass");
const changepass = require("./user/changepass");
const login = require("./user/login");
const passport = require('passport');
const isUserAuth = require("./user/isUserAuth");
require('./passport');

app.use(cors());
app.use(express.json());
app.use("/register", register);
app.use("/tokenpass", tokenpass);
app.use("/confirm", confirm);
app.use("/fgpass", fgpass);
app.use("/changepass", changepass);
app.use("/login", login);
app.use("/isUserAuth", isUserAuth);
app.use(passport.initialize());

app.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>')
});

app.get('/profile', isUserAuth, (req, res) => {
  res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`)
});
app.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/profile');
  }
);

app.listen(3001, () => {
  console.log("hello server");
});
