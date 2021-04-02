const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isPassword, isUsername } = require("../tools/helpers");
const jwt_secret = "this is a jsonwebtoken secret";

/**
 * refatored by ahaloua :)
 */

router.post("/", (req, res) => {
	const { username, password } = req.body;
	if (username && password && isUsername(username) && isPassword(password)) {
		const stmt =
			"SELECT `users`.`id`, `users`.`password`, `users`.`confirm` FROM `users` WHERE `username` = ?";
		db.query(stmt, username, (err, [result]) => {
			if (err) {
				res.send({ err });
			}
			if (result) {
				const { id, password: dbPassword, confirm } = result;
				bcrypt.compare(password, dbPassword, (error, rslt) => {
					if (rslt) {
						if (confirm) {
							jwt.sign({ id }, jwt_secret, (err, token) => {
								res.send({ token });
							});
						} else {
							res.send({ message: "Please check your email" });
						}
					} else {
						res.send({ message: "Wrong combination!" });
					}
				});
			} else {
				res.send({ message: "User Dosen't exist" });
			}
		});
	} else {
		res.send({ message: "error" });
	}
});

module.exports = router;
