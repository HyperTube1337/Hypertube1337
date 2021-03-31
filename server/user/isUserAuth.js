const jwt_secret = "this is a jsonwebtoken secret";
const jwt = require("jsonwebtoken");

/**
 * refactored by ahaloua :)
 */

const isUserAuth = (req, res, next) => {
	const cookie = req.headers.cookie;
	if (!cookie) res.send("we need a token");
	else {
		const [garbage, token] = cookie.split("jwt=");
		if (!token) res.send("we need a token");
		else {
			jwt.verify(token, jwt_secret, (err, decoded) => {
				if (err) {
					res.send("U failed to authenticate");
				} else {
					req.userId = decoded.id;
					next();
				}
			});
		}
	}
};

module.exports = isUserAuth;
