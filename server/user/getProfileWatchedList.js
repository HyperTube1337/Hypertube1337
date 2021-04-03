const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

/**
 * abdo makhalnich nssaweb chi haja hna 7it mteneg :(
 */

router.post("/", isUserAuth, (req, res) => {
	const username = req.body.username;
	if (typeof username !== "undefined") {
		const sqlSelect = "SELECT `id` FROM users WHERE username = ? ";
		db.query(sqlSelect, username, (err, result) => {
			if (result.length > 0) {
				const qlr =
					"SELECT `imdbCode` FROM WatchedList WHERE user_id = ? ";
				db.query(qlr, result[0].id, (err, result) => {
					if (result?.length > 0) {
						res.send(result);
					} else if (err) {
						res.send({ err: "error" });
					} else {
						res.send({ status: "not found any movie" });
					}
				});
			}
		});
	} else {
		res.send({ status: "bad params" });
	}
});

module.exports = router;
