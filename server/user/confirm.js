const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * refactored by ahaloua
 */

router.post("/", (req, res) => {
	const { token } = req.body;
	const stmt =
		"SELECT `users`.`confirm`, `users`.`token` FROM `users` WHERE `users`.`token` = ?";
	db.query(stmt, token, (err, [result]) => {
		if (err) {
			res.send({ err });
		}
		if (result) {
			if (result.token === token) {
				db.query(
					"UPDATE `users` SET `users`.`confirm` = 1 WHERE `users`.`token` = ?",
					token
				);
				if (result.confirm)
					db.query(
						"UPDATE `users` SET `users`.`token` = NULL WHERE `users`.`token` = ?",
						[token]
					);
				res.send({ message: "Verified" });
			}
		} else res.send({ message: "token not found" });
	});
});

module.exports = router;
