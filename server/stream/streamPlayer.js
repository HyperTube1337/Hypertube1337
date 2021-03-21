const express = require("express");
const router = express.Router();
const torrentStream = require("torrent-stream");

router.post("/", (req, res) => {
  var link = req.body.link;
  var engine = torrentStream(link);
  engine.on("ready", function () {
    engine.files.forEach(function (file) {
      console.log("filename:", file.name);
      var stream = file.createReadStream();
      path: "./";
    });
  });
});

module.exports = router;
