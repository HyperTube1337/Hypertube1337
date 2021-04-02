const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");

router.get("/", isUserAuth, (req, res) => {
	const id = req.userId;
	const sqlSelect = "SELECT `imdbCode` FROM WatchedList WHERE user_id = ? ";
	db.query(sqlSelect, id, (err, result) => {
		if (result?.length > 0) {
			res.send(result);
		} else if (err) {
			res.send({ err: "error" });
		} else {
			res.send({ status: "not found any movie" });
		}
	});
});
module.exports = router;
