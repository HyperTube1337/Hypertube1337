const express = require("express");
const router = express.Router();
const axios = require("axios");
const path = require("path");
const torrentStream = require("torrent-stream");
const fs = require("fs");
const { resolve } = require("path");
const { CLIENT_RENEG_LIMIT } = require("tls");

function getData(link) {
  return link;
}
async function getHashMovie(hash) {
  try {
    const {
      data: {
        data: {
          movies: [torrents],
        },
      },
    } = await axios.post(`https://yts.mx/api/v2/list_movies.json?quality=720p&query_term=${hash}page=1`);
    console.log(torrents);
  } catch (e) {}
  // axios.post(`https://yts.mx/api/v2/list_movies.json?quality=720p&query_term=${hash}&limit=1`).then((res) => res.data.data.movies[0].torrents[1].hash);
}

router.post("/", (req, res) => {
  var link = req.body.link;
  getHashMovie(link);
  // var engine = torrentStream("magnet:?xt=urn:btih:" + link, { path: "./stream/" + link });
  // engine.on("ready", function () {
  //   var test;
  //   engine.files.forEach(function (file) {
  //     if (path.extname(file.name).slice(1) === "mp4") {
  //       test = file.path;
  //     }
  //     // var newPath = '/new/path/' + file.path;
  //     // fs.rename(file.path, file.path / 5858);
  //     res.setHeader("Content-Length", file.length);
  //     res.setHeader("Content-Type", test);
  //     var stream = file.createReadStream();
  //     stream.pipe(res);
  //   });
  // });
});

module.exports = router;
