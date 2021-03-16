const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./user/register");
const tokenpass = require("./user/tokenpass");
const confirm = require("./user/confirm");
const fgpass = require("./user/fgpass");
const changepass = require("./user/changepass");
const login = require("./user/login");

app.use(cors());
app.use(express.json());
app.use("/register", register);
app.use("/tokenpass", tokenpass);
app.use("/confirm", confirm);
app.use("/fgpass", fgpass);
app.use("/changepass", changepass);
app.use("/login", login);


app.listen(3001, () => {
  console.log("hello server");
});
