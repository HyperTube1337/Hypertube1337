const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/:profilename", isUserAuth, (req, resp) => {
  const username = req.params.profilename;
  const id = req.userId;
  db.query("SELECT id FROM `users` WHERE username = ?", username, (err, res) => {
    if (err) {
      resp.send({ err: err });
    } else if (res?.length > 0) {
      if (res[0].id === id) {
        console.log("user logged");
        db.query(
          "SELECT firstname,lastname,username,email,profilePic, user_from FROM `users` where username = ? and id = ?",
          [username, id],
          (err, rslt) => {
            if (err) {
              resp.send({ err: err });
            } else if (rslt.length > 0) {
              resp.send({message: "user logged", data : rslt })
            }
          }
        );
      } else {
        console.log("not the user logged");
        db.query(
          "SELECT firstname,lastname,username,profilePic,user_from FROM `users` where username = ?",
          username,
          (err, rslt) => {
            if (err) {
              resp.send({ err: err });
            } else {
              resp.send({message: "not the user logged", data : rslt });
            }
          }
        );
      }
    } else if (!res?.length) {
      console.log("no user found");
      resp.send("no user found")
    }
  });
});

module.exports = router;
