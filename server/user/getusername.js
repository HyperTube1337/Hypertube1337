const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

/**
 * refactored by ahaloua
 */

router.get("/", isUserAuth, (req, res) => {
	const id = req.userId;
	const stmt =
		"SELECT `users`.`username` FROM `users` WHERE `users`.`id` = ?";
	db.query(stmt, id, (err, [result]) => {
		if (err) {
			res.send({ err: err });
		} else if (result) {
			res.send(result.username);
		}
	});
});

module.exports = router;
