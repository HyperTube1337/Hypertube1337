const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require("path");
const torrentStream = require("torrent-stream");
const fs = require("fs");

// const OS = require("opensubtitles-api");
// const OpenSubtitles = new OS("UserAgent");

router.post("/", (req, res) => {
  var link = req.body.link;
  let test = [];
  var engine = torrentStream("magnet:?xt=urn:btih:" + link, { path: "./stream/" + link });
  engine.on("ready", function () {
    engine.files.forEach(function (file) {
      if (path.extname(file.name).slice(1) === "jpg") {
      } else {
        if (path.extname(file.name).slice(1) === "mp4") {
          test.path = file.path;
          test.range = file.length;
          file.path = file.path.substr(0, file.path.lastIndexOf(".")) + ".mkv";
          path.resolve(file.path);
        } else {
        }
      }
      // res.setHeader("Content-Length", file.length);
      res.setHeader("Content-Type", test.path);
      var stream = file.createReadStream();
      stream.pipe(res);
    });
  });
});

module.exports = router;
