const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");

router.get("/", isUserAuth, (req, res) => {
	const id = req.userId;
	if (id) {
		res.send({ status: "ok" });
	} else {
		res.send({ status: "ko" });
	}
});
module.exports = router;
