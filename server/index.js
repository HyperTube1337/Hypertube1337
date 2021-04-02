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
const fs = require("fs");
const db = require("./db");
const torrentStream = require("torrent-stream");
const path = require("path");
const cron = require("node-cron");
const ffmpeg = require("ffmpeg");

cron.schedule("* * 22 * * *", () => {
  db.query("SELECT Last_watch, MoviePath FROM MoviesList", (err, result) => {
    var i = 0;
    while (i < result?.length) {
      if (result[i]?.Last_watch.setMonth(result[i]?.Last_watch.getMonth() + 1) <= new Date()) {
        if (result[i]?.MoviePath) {
          var Path = result[i]?.MoviePath.split("/");
        }
        fs.exists(`./stream/${Path[0]}`, (ex) => {
          if (ex) {
            fs.rm(`./stream/${Path[0]}`, { recursive: true }, (err) => {
              console.log(err);
            });
          }
        });
      }
      i++;
    }
  });
});
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
app.use("/streampPlayer", streampPlayer);
app.use("/tokenpass", tokenpass);
app.use("/confirm", confirm);
app.use("/stream/", (req, res) => {
  var MovieInfo = req.url.split("/");

  var engine = torrentStream("magnet:?xt=urn:btih:" + MovieInfo[1], { path: `./stream/${MovieInfo[1]}` });
  engine.on("ready", function () {
    engine.files.forEach(function (file) {
      if (path.extname(file.name).slice(1) === "jpg") {
      } else {
        if (path.extname(file.name).slice(1) === "mp4") {
          var range = req.headers.range;
          file.select();
          if (range) {
            const parts = range.replace("bytes=", "").split("-");
            const start = parseInt(parts[0]);
            const end = parts[1] ? parseInt(parts[1]) : file.length - 1;
            const chunkSize = end - start + 1;
            const header = {
              "Content-Range": `bytes ${start}-${end}/${file.length}`,
              "Accept-Ranges": "bytes",
              "Accept-Ranges": chunkSize,
              "Content-Type": `video/mp4`,
              "Content-Length": `${file.length}`,
            };
            res.writeHead(206, header);
            file.createReadStream({ start, end }).pipe(res);
          }
        } else if (path.extname(file.name).slice(1) === "mkv") {
          return;
        }
      }
    });
    engine.on("idle", function () {
      var MvPath = `${MovieInfo[1]}/${engine.files[0].path}`;
      db.query("UPDATE MoviesList SET MoviePath = ? WHERE imdbCode = ?;", [MvPath, MovieInfo[2]], (err, res) => {});
    });
  });
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
app.use("/subtitles", express.static("./subtitles"));
app.use("/editPassword", editPassword);

app.listen(3001, () => {
	// console.log("hello server");
});
