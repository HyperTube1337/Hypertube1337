const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.post("/", isUserAuth, (req, res) => {
  const imdb = req.body.imdb_code;
  const sqlSelect = "SELECT username, profilePic, cmntContent, `time` FROM cmnt INNER JOIN users ON users.id = cmnt.user_id WHERE cmnt.imdb_code = ?";
  db.query(sqlSelect, imdb, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else if (result.length > 0) {
      res.send(result);
    }
  });
});

module.exports = router;
