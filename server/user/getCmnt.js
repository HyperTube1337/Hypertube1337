const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

/**
 * it can be refactord but the probelm is in the front data catch
 */

router.post("/", isUserAuth, (req, res) => {
	const imdb = req.body.imdb_code;
	const stmt =
		"SELECT `users`.`username`, `users`.`profilePic`, `cmnt`.`cmntContent`, `cmnt`.`time` FROM `cmnt` JOIN `users` ON `users`.`id` = `cmnt`.`user_id` WHERE `cmnt`.`imdb_code` = ?";
	db.query(stmt, imdb, (err, result) => {
		if (err) {
			res.send({ err });
		} else if (result.length > 0) {
			res.send(result);
		}
	});
});

module.exports = router;
