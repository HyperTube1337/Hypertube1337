const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./user/register");
const tokenpass = require("./user/tokenpass");
const confirm = require("./user/confirm");
const fgpass = require("./user/fgpass");
const changepass = require("./user/changepass");
const login = require("./user/login");
const streampPlayer = require("./stream/streamPlayer");
const passport = require("passport");
const oauth = require("./user/oauth");
const isUserAuth = require("./user/isUserAuth");
const getusername = require("./user/getusername");
const getDataByUser = require("./user/getDataByUser");
const editInfo = require("./user/editInfo");
const editImage = require("./user/editImage");
const bodyParser = require("body-parser");
const editPassword = require("./user/editPassword");
const checkStatus = require("./user/checkStatus");
const watchedList = require("./user/watchedList");
const getWatchedlist = require("./user/getWatchedList");
const InsertCmnt = require("./user/insertCmnt");
const getCmnt = require("./user/getCmnt");
var fs = require("fs");

app.use(cors({ origin: true, credentials: true }));
// app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(passport.initialize());
app.use("/", oauth);
app.use("/register", register);
app.use("/getCmnt", getCmnt);
app.use("/watchedlist", watchedList);
app.use("/insertCmnt", InsertCmnt);
app.use("/getWatchedlist", getWatchedlist);
app.use("/checkStatus", checkStatus);
app.use("/stream", streampPlayer);
app.use("/tokenpass", tokenpass);
app.use("/confirm", confirm);
app.use("/stream/", (req, res) => {
	// const { path } = req.params;
	const status = fs.statSync(__dirname + "/stream/" + decodeURI(req.url));
	// const range;
	// res.statusCode = 206;
	// console.log(status);
	// console.log("headers", req.headers);
	var ranges;
	let end;
	if (req.headers.range) {
		ranges = req.headers.range;
		end = ranges.substr(6).split("-");
	}
	console.log(end[0]);
	res.setHeader("Content-Length", 1 + status.size - end[0]);
	res.setHeader(
		"Content-Range",
		`bytes ${end[0]}-${status.size}/${status.size}`
	);
	// res.status(206);
	// res.setHeader("Content-Length", status.size);
	// console.log(req.headers, req.url);
	fs.createReadStream(__dirname + "/stream/" + decodeURI(req.url)).pipe(res);
});
app.use("/fgpass", fgpass);
app.use("/changepass", changepass);
app.use("/login", login);
app.use("/isUserAuth", isUserAuth);
app.use("/getusername", getusername);
app.use("/getDataByUser", getDataByUser);
app.use("/edit", editInfo);
app.use("/editImage", editImage);
app.use("/images", express.static("./images"));
app.use("/editPassword", editPassword);

app.listen(3001, () => {
	// console.log("hello server");
});
