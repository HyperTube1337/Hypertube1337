const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * is Email needs to refactor
 */

const isEmail = require("../tools/isEmail");

const send_Email = require("../send_Email");

/**
 * refactored by ahaloua
 */

router.post("/", (req, res) => {
	require("crypto").randomBytes(48, function (err, buffer) {
		const token = buffer.toString("hex");
		const email = req.body.email;
		if ((email, isEmail(email))) {
			const stmt =
				"SELECT `users`.`id` FROM `users` WHERE `users`.`email` = ?";
			db.query(stmt, email, (err, [result]) => {
				if (err) {
					res.send({ err });
				}
				if (result) {
					db.query(
						"UPDATE `users` SET `users`.`tokenPass` = ? WHERE `users`.`email` = ?",
						[token, email]
					);

					if (
						send_Email(
							email,
							"Reset password",
							`<p>To recover your account please click <a href="http://localhost:3000/changepass/${token}">Here</a></p>`
						)
					)
						res.send({ message: "done" });
				} else {
					res.send("email not found");
				}
			});
		} else res.send("error");
	});
});

module.exports = router;
