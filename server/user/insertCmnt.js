const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

/**
 * to be refactored after
 */

router.post("/", isUserAuth, (req, res) => {
	const id = req.userId;
	const cmnt = req.body.cmntCentent;
	const time = new Date();
	const imdb = req.body.imdb_code;
	if (typeof cmnt !== "undefined" && typeof imdb !== "undefined") {
		const sqlSelect =
			"INSERT INTO `cmnt`(`user_id`, `cmntContent`, `time`, `imdb_code`) VALUES (?,?,?,?) ";
		db.query(sqlSelect, [id, cmnt, time, imdb], (err, result) => {
			if (err) {
				res.send({ err: err });
			} else {
				const getData =
					"SELECT profilePic, username FROM `users` WHERE id = ? ";
				db.query(getData, id, (err, reslt) => {
					if (err) {
						res.send({ err: err });
					} else {
						res.send(reslt);
					}
				});
			}
		});
	} else {
		res.send({ err: "bad params" });
	}
});
module.exports = router;
