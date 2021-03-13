const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./user/register");


app.use(cors());
app.use(express.json());
app.use("/register", register);
app.listen(3001, () => {
  console.log("hello server");
});
