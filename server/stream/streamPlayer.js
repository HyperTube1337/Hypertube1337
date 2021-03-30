const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require("path");
const torrentStream = require("torrent-stream");
const isUserAuth = require("../user/isUserAuth");
const OS = require("opensubtitles-api");
const OpenSubtitles = new OS("UserAgent");
var srt2vtt = require("srt-to-vtt");
var fs = require("fs");
const http = require("http");

function getSubtitle(link, imdb_code) {
  OpenSubtitles.api.LogIn("karroch", "Kokokoko123", "en", "UserAgent").then((res) => {
    if (res) {
      if (res.status === "200 OK") {
        OpenSubtitles.search({
          imdbid: imdb_code,
        }).then((subtitles) => {
          http.get(subtitles.en.utf8, (res) => {
            const path = `${__dirname}/${link}/${imdb_code}en.srt`;
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on("finish", () => {
              filePath.close();
              fs.createReadStream(filePath.path)
                .pipe(srt2vtt())
                .pipe(fs.createWriteStream(`${__dirname}/${link}/${imdb_code}en.vtt`));
              fs.exists(path, function (ex) {
                if (ex) {
                  fs.unlinkSync(path);
                }
              });
            });
            // fs.unlinkSync(path);
          });
          http.get(subtitles.ar.utf8, (res) => {
            const path = `${__dirname}/${link}/${imdb_code}ar.srt`;
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on("finish", () => {
              filePath.close();
              fs.createReadStream(filePath.path)
                .pipe(srt2vtt())
                .pipe(fs.createWriteStream(`${__dirname}/${link}/${imdb_code}ar.vtt`));
              fs.exists(path, function (ex) {
                if (ex) {
                  fs.unlinkSync(path);
                }
              });
            });
          });
          http.get(subtitles.fr.utf8, (res) => {
            const path = `${__dirname}/${link}/${imdb_code}fr.srt`;
            const filePath = fs.createWriteStream(path);
            res.pipe(filePath);
            filePath.on("finish", () => {
              filePath.close();
              fs.createReadStream(filePath.path)
                .pipe(srt2vtt())
                .pipe(fs.createWriteStream(`${__dirname}/${link}/${imdb_code}fr.vtt`));
              fs.exists(path, function (ex) {
                if (ex) {
                  fs.unlinkSync(path);
                }
              });
            });
          });
        });
      }
    }
  });
}
router.post("/", isUserAuth, (req, res) => {
  var link = req.body.link;
  var imdb_code = req.body.imdb_code;
  getSubtitle(link, imdb_code);
  var engine = torrentStream("magnet:?xt=urn:btih:" + link, { path: `./stream/${link}` });
  engine.on("ready", function () {
    var filePath;
    engine.files.forEach(function (file) {
      if (path.extname(file.name).slice(1) === "jpg") {
      } else {
        if (path.extname(file.name).slice(1) === "mp4") {
          filePath = file.path.substr(0, file.path.lastIndexOf(".")) + ".mp4";
        } else {
        }
      }
      res.setHeader("Content-Type", filePath);
      var stream = file.createReadStream();
      stream.pipe(res);
      // res.setHeader("Content-Length", file.length);
    });
  });
});

module.exports = router;
