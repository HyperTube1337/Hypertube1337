const express = require("express");
const router = express.Router();
const isUserAuth = require("./isUserAuth");
const db = require("../db");
const fs = require("fs");
const md5 = require("md5");
const jimp = require("jimp");

saveImage = (image, folder) => {
  return new Promise((resolve, reject) => {
    const imgName = md5(new Date().getTime()) + ".jpg";
    const imgDest = `${folder}/${imgName}`;
    // console.log(image);

    const base64Data = image ? image.replace(/^data:image\/\w+;base64,/, "") : "";
    const buffer = Buffer.from(base64Data, "base64");
    jimp.read(buffer, (err, rslt) => {
      if (err) {
      } else {
        fs.writeFile(imgDest, base64Data, "base64", function (err) {
          if (err) {
            reject("error_1");
          } else {
            resolve(imgName);
          }
        });
      }
    });
  });
};

router.post("/", isUserAuth, (req, res) => {
  const id = req.userId;
  const content = req.body.content;
  const folder = "./images";
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  db.query("select profilePic from users where id = ?", [id], (err, resp) => {
    if (err) {
      res.send(err);
    } else if (resp.length > 0) {
      const img = resp[0].profilePic
      if (fs.existsSync(`${folder}/${img}`)) {
        fs.unlinkSync(`${folder}/${img}`);
      }
    } else if (!resp.length) {
      // console.log("no image");
    }
    saveImage(content, folder).then((rslt) => {
      if (rslt) {
        db.query("UPDATE users SET profilePic = ? WHERE id = ?", [rslt, id]);
        res.send("updated");
      }
    });
  });
});

module.exports = router;
