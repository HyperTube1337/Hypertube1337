const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const isEmail = require("../tools/isEmail");
const isName = require("../tools/isName");
const isUsername = require("../tools/isUsername");

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const { firstname, lastname, username, email, user_from} = req.body;
  if (!user_from) {
    const sqlInsert = "SELECT * FROM users WHERE id = ?";
    db.query(sqlInsert, id, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        if (
          result[0].firstname === firstname &&
          result[0].lastname === lastname &&
          result[0].username === username &&
          result[0].email === email
        ) {
          res.send("nothing changed");
          // console.log("nothing changed");
        } else if ((isName(firstname), isName(lastname), isUsername(username), isEmail(email))) {
          db.query(
            "SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? and username != ? LIMIT 1;",
            [username, result[0].username],
            (error, rslt) => {
              // console.log(rslt[0].count);
              if (err) {
                // console.log(err);
              } else if (rslt[0].count > 0) res.send("username is already used");
              else {
                db.query(
                  "SELECT COUNT(*) AS count FROM `users` WHERE `email` = ? and email != ?LIMIT 1;",
                  [email, result[0].email],
                  (error, rslt) => {
                    // console.log(rslt[0].count);
                    if (err) {
                      // console.log(err);
                    } else if (rslt[0].count > 0) res.send("email is already used");
                    else {
                      db.query("UPDATE users SET firstname = ?, lastname = ?, username= ?, email= ? WHERE id = ?", [
                        firstname,
                        lastname,
                        username,
                        email,
                        id,
                      ]);
                      res.send("updated");
                      // console.log("updated;");
                    }
                  }
                );
              }
            }
          );
        } else {
          res.send("error");
        }
      }
    });
  }else{
    res.send("error")
  }
});

module.exports = router;
