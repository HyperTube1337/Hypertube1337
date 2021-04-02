const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
/**
 * to be changed
 */
const isPassword = require("../tools/isPassword");
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/", isUserAuth, (req, res) => {
	const { Opassword, Npassword } = req.body;
	const id = req.userId;
	const stmt =
		"SELECT `users`.`password` FROM `users` WHERE `users`.`id` = ?";

	if (Opassword && Npassword && isPassword(Npassword)) {
		db.query(stmt, id, (err, [result]) => {
			if (err) {
				res.send({ err: err });
			}
			if (result) {
				bcrypt.compare(Opassword, result.password, (error, rslt) => {
					if (rslt) {
						bcrypt.hash(Npassword, 10, (err, hash) => {
							db.query(
								"UPDATE `users` SET `users`.`password` = ? WHERE `users`.`id` = ?",
								[hash, id]
							);
							res.send("modified");
						});
					} else {
						res.send("inccorect password");
					}
				});
			}
		});
	} else res.send("error");
});
module.exports = router;
