const express = require("express");
const router = express.Router();
const send_Email = require("../send_Email");
const bcrypt = require("bcrypt");
const { isEmail, isName, isPassword, isUsername } = require("../tools/helpers");
const db = require("../db");

router.post("/", (req, res) => {
	const { firstname, lastname, username, email, password } = req.body;
	if (
		firstname &&
		lastname &&
		username &&
		email &&
		password &&
		isName(firstname) &&
		isName(lastname) &&
		isUsername(username) &&
		isEmail(email) &&
		isPassword(password)
	) {
		require("crypto").randomBytes(48, function (err, buffer) {
			var token = buffer.toString("hex");
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					// console.log(err);
				}
				db.query(
					"SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1;",
					[username, email],
					(error, rslt) => {
						if (err) {
							// console.log(err);
						} else if (rslt[0].count > 0)
							res.send({
								message:
									"Email and or username are already used",
							});
						else
							db.query(
								"INSERT INTO users(firstname,lastname,username,email,password,token) VALUES (?,?,?,?,?,?);",
								[
									firstname,
									lastname,
									username,
									email,
									hash,
									token,
								],
								(err, result) => {
									if (err) {
										// console.log(err);
									} else {
										if (
											send_Email(
												email,
												"Confirm account",
												`<p>To activate your account please click <a href="http://localhost:3000/confirm/${token}">Here</a></p>`
											)
										) {
											res.send({ message: "done" });
										} else {
											res.send({
												message: "Email not send",
											});
										}
									}
								}
							);
					}
				);
			});
		});
	} else res.send("error");
});

module.exports = router;
