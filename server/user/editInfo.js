const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const { isEmail, isName, isUsername } = require("../tools/helpers");

/**
 * edit infos
 * Querise refactored by ahaloua :)
 * edit a bug of line 34
 */

router.post("/", isUserAuth, (req, res) => {
	const id = req.userId;
	const { firstname, lastname, username, email, user_from } = req.body;
	// console.log(user_from);
	if (!user_from) {
		const stmt =
			"SELECT `users`.`firstname`, `users`.`lastname`, `users`.`username`, `users`.`email` FROM `users` WHERE `users`.`id` = ?";
		db.query(stmt, id, (err, [result]) => {
			if (err) {
				res.send({ err });
			}
			if (result) {
				if (
					result.firstname === firstname &&
					result.lastname === lastname &&
					result.username === username &&
					result.email === email
				) {
					res.send("nothing changed");
				} else if (
					isName(firstname) &&
					isName(lastname) &&
					isUsername(username) &&
					isEmail(email)
				) {
					// console.log("Ach hada >> ", isName(lastname));
					db.query(
						"SELECT COUNT(*) AS `count` FROM `users` WHERE `users`.`username` = ? AND `users`.`id` <> ?",
						[username, id],
						(error, [rslt]) => {
							if (err) {
							} else if (rslt.count > 0)
								res.send("username is already used");
							else {
								db.query(
									"SELECT COUNT(*) AS `count` FROM `users` WHERE `users`.`email` = ? AND `users`.`id` <> ?",
									[email, id],
									(error, [rslt]) => {
										if (err) {
										} else if (rslt.count > 0)
											res.send("email is already used");
										else {
											db.query(
												"UPDATE `users` SET `users`.`firstname` = ?, `users`.`lastname` = ?, `users`.`username` = ?, `users`.`email` = ? WHERE `users`.`id` = ?",
												[
													firstname,
													lastname,
													username,
													email,
													id,
												]
											);
											res.send("updated");
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
	} else {
		res.send("error");
	}
});

module.exports = router;
