const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./user/register");
const tokenpass = require("./user/tokenpass");
const confirm = require("./user/confirm");
const fgpass = require("./user/fgpass");


app.use(cors());
app.use(express.json());
app.use("/register", register);
app.use("/tokenpass", tokenpass);
app.use("/confirm", confirm);
app.use("/fgpass", fgpass);


app.listen(3001, () => {
  console.log("hello server");
});
