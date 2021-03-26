const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require("path");
const torrentStream = require("torrent-stream");
const fs = require("fs");
const yifysubtitles = require("yifysubtitles");

// const OS = require("opensubtitles-api");
// const OpenSubtitles = new OS("UserAgent");
// async function sub() {
//   const results = await yifysubtitles("tt4154756", {
//     path: "./",
//     langs: ["en"],
//   });
//   console.log(results);
// }
router.post("/", (req, res) => {
  var link = req.body.link;
  let test;
  // sub();
  var engine = torrentStream("magnet:?xt=urn:btih:" + link, { path: `./stream/${link}` });
  engine.on("ready", function () {
    engine.files.forEach(function (file) {
      if (path.extname(file.name).slice(1) === "jpg") {
      } else {
        if (path.extname(file.name).slice(1) === "mp4") {
          // test = file.path;
          // file.path = file.path.substr(0, file.path.lastIndexOf(".")) + ".mkv";
        } else {
        }
      }

      // res.setHeader("Content-Length", file.length);
      res.setHeader("Content-Type", file.path);
      var stream = file.createReadStream();
      stream.pipe(res);
    });
  });
});

module.exports = router;
