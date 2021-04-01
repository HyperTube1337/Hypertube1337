// const express = require("express");
// const router = express.Router();
// const isUserAuth = require("./isUserAuth");
// const db = require("../db");

// router.post("/", isUserAuth, (req, res) => {
//   const id = req.userId;
//   const imdb = req.body.imdb;
//   const sqlSelect = "SELECT * FROM WatchedList WHERE user_id = ? AND imdbCode = ?";
//   db.query(sqlSelect, [id, imdb], (err, result) => {
//     if (err) {
//       res.send({ err: err });
//     }
//     if (result?.length === 0) {
//       db.query("INSERT INTO WatchedList(user_id,imdbCode) VALUES (?,?);", [id, imdb], (err, result) => {
//         if (err) {
//           res.send({ err: err });
//         } else {
//           res.send({ status: "ok" });
//         }
//       });
//     } else {
//       res.send({ status: "ko" });
//     }
//   });
// });
// module.exports = router;
// //
