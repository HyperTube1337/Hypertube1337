const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const { isUsername } = require("../tools/helpers");

/**
 * refactored nd validated by ahaloua
 */

router.get("/:profilename", isUserAuth, (req, resp) => {
	const { profilename: username } = req.params;
	if (username && isUsername(username)) {
		const id = req.userId;
		db.query(
			"SELECT `users`.`id` FROM `users` WHERE `users`.`username` = ?",
			username,
			(err, [res]) => {
				if (err) {
					resp.send({ err });
				} else if (res) {
					if (res.id === id) {
						db.query(
							"SELECT `users`.`firstname`, `users`.`lastname`, `users`.`username`, `users`.`email`, `users`.`profilePic`, `users`.`user_from` FROM `users` WHERE `users`.`username` = ?",
							[username, id],
							(err, rslt) => {
								if (err) {
									resp.send({ err });
								} else if (rslt.length > 0) {
									resp.send({
										message: "user logged",
										data: rslt,
									});
								}
							}
						);
					} else {
						db.query(
							"SELECT `users`.`firstname`, `users`.`lastname`, `users`.`username`, `users`.`profilePic`, `users`.`user_from` FROM `users` WHERE `users`.`username` = ?",
							username,
							(err, rslt) => {
								if (err) {
									resp.send({ err });
								} else {
									resp.send({
										message: "not the user logged",
										data: rslt,
									});
								}
							}
						);
					}
				} else if (!res?.length) {
					resp.send("no user found");
				}
			}
		);
	} else {
		resp.send("bad param");
	}
});

module.exports = router;
