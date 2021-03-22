const jwt_secret = "this is a jsonwebtoken secret";
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

const isUserAuth = (req, res, next) => {
  // console.log(req.headers.cookie, "cookie");
  const cookie = req.headers.cookie;
  if (!cookie) res.send("we need a token");
  else {
    const token = cookie.split("jwt=");
    if (token.length !== 2) res.send("we need a token");
    else {
      jwt.verify(token[1], jwt_secret, (err, decoded) => {
        if (err) {
          res.send("U failed to authenticate");
        } else {
          // user = jwt_decode(token[1]);
          // req.userId = user.user
          req.userId = decoded.id
          // console.log(req.userId)
          next();
        }
      });
    }
  }
};

module.exports = isUserAuth;
