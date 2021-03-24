const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require("path");
const torrentStream = require("torrent-stream");
const fs = require("fs");

router.post("/", (req, res) => {
  var link = req.body.link;
  var engine = torrentStream("magnet:?xt=urn:btih:" + link, { path: "./stream/" + link });
  engine.on("ready", function () {
    var test;
    engine.files.forEach(function (file) {
      if (path.extname(file.name).slice(1) === "mp4") {
        test = file.path;
      }
      res.setHeader("Content-Length", file.length);
      res.setHeader("Content-Type", test);
      var stream = file.createReadStream();
      stream.pipe(res);
    });
  });
});

module.exports = router;
