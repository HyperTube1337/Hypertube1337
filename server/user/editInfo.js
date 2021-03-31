const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

const isEmail = require("../tools/isEmail");
const isName = require("../tools/isName");
const isUsername = require("../tools/isUsername");

/**
 * edit infos
 */

router.post("/", isUserAuth, (req, res) => {
	const id = req.userId;
	const { firstname, lastname, username, email, user_from } = req.body;
	console.log(user_from);
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
					(isName(firstname),
					isName(lastname),
					isUsername(username),
					isEmail(email))
				) {
					db.query(
						"SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? and username != ? LIMIT 1;",
						[username, result[0].username],
						(error, rslt) => {
							if (err) {
							} else if (rslt[0].count > 0)
								res.send("username is already used");
							else {
								db.query(
									"SELECT COUNT(*) AS count FROM `users` WHERE `email` = ? and email != ?LIMIT 1;",
									[email, result[0].email],
									(error, rslt) => {
										if (err) {
										} else if (rslt[0].count > 0)
											res.send("email is already used");
										else {
											db.query(
												"UPDATE users SET firstname = ?, lastname = ?, username= ?, email= ? WHERE id = ?",
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
