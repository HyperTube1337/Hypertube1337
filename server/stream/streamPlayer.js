const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const isUserAuth = require("../user/isUserAuth");
const OS = require("opensubtitles-api");
const OpenSubtitles = new OS("UserAgent");
var srt2vtt = require("srt-to-vtt");
var fs = require("fs");
const http = require("http");

// function getSubtitle(link, imdb_code) {
//   OpenSubtitles.api.LogIn("karroch", "Kokokoko123", "en", "UserAgent").then((res) => {
//     if (res) {
//       if (res.status === "200 OK") {
//         OpenSubtitles.search({
//           imdbid: imdb_code,
//         }).then((subtitles) => {
//           if (subtitles.en.utf8) {
//             http.get(subtitles.en.utf8, (res) => {
//               const path = `${__dirname}/../subtitles/${imdb_code}en.srt`;
//               const filePath = fs.createWriteStream(path);
//               res.pipe(filePath);
//               filePath.on("finish", () => {
//                 filePath.close();
//                 fs.createReadStream(filePath.path)
//                   .pipe(srt2vtt())
//                   .pipe(fs.createWriteStream(`${__dirname}/../subtitles/${imdb_code}en.vtt`));
//                 fs.exists(path, function (ex) {
//                   if (ex) {
//                     fs.unlinkSync(path);
//                   }
//                 });
//               });
//             });
//           }
//           if (subtitles.ar) {
//             http.get(subtitles.ar.utf8, (res) => {
//               const path = `${__dirname}/../subtitles/${imdb_code}ar.srt`;
//               const filePath = fs.createWriteStream(path);
//               res.pipe(filePath);
//               filePath.on("finish", () => {
//                 filePath.close();
//                 fs.createReadStream(filePath.path)
//                   .pipe(srt2vtt())
//                   .pipe(fs.createWriteStream(`${__dirname}/../subtitles/${imdb_code}ar.vtt`));
//                 fs.exists(path, function (ex) {
//                   if (ex) {
//                     fs.unlinkSync(path);
//                   }
//                 });
//               });
//             });
//           }
//           if (subtitles.fr) {
//             http.get(subtitles.fr.utf8, (res) => {
//               const path = `${__dirname}/../subtitles/${imdb_code}fr.srt`;
//               const filePath = fs.createWriteStream(path);
//               res.pipe(filePath);
//               filePath.on("finish", () => {
//                 filePath.close();
//                 fs.createReadStream(filePath.path)
//                   .pipe(srt2vtt())
//                   .pipe(fs.createWriteStream(`${__dirname}/../subtitles/${imdb_code}fr.vtt`));
//                 fs.exists(path, function (ex) {
//                   if (ex) {
//                     fs.unlinkSync(path);
//                   }
//                 });
//               });
//             });
//           }
//         });
//       }
//     }
//   });
// }
router.post("/", isUserAuth, (req, res) => {
	var link = req.body.link;
	var imdb_code = req.body.imdb_code;
	// getSubtitle(link, imdb_code);
	db.query(
		"SELECT `MoviePath` FROM `MoviesList` WHERE imdbCode = ?;",
		imdb_code,
		(err, [result]) => {
			if (result) {
				if (result.MoviePath !== "null") {
					res.send({ path: result.MoviePath });
				} else {
					res.send({ down: "download" });
				}
			}
		}
	);
});

module.exports = router;
