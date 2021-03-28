const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const SCHOOLStrategy = require("passport-42").Strategy;
const passport = require("passport");
const db = require("./db");

GOOGLE_CLIENT_ID = "786908425148-6p1p601gavkec85f1063ra7o6tksndlj.apps.googleusercontent.com";
GOOGLE_CLIENT_SECRET = "6Kid-W_BzCLqkGsHiEls7Y61";

GITHUB_CLIENT_ID = "2b4b39ef4e55d97ae0f5";
GITHUB_CLIENT_SECRET = "595b0aff80b3e59bb1f07b2748cdfe1262ca3913";

SCHOOL_CLIENT_ID = "db6a44d27e63c4912c3fc7780cc5df4951b931767cc686afb4fb89b9d4404291";
SCHOOL_CLIENT_SECRET = "61a1511946f2f4702a597348ae3ccf00d82bfbac5548a772f8f3239add6282e8";


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      db.query("select user_id from users where user_id = ?", "Go" + profile.id, (err, res) => {
        if (err) res.send(err);
        else if (res.length === 0) {
          db.query(
            "SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1;",
            [profile._json.name, profile._json.email],
            (error, rslt) => {
              if (error) {
                // console.log(error);
              } else if (rslt[0].count > 0) {
                // console.log("Email and or username are already used");
                return cb("error");
              } else {
                db.query(
                  "insert into users set firstname= ? , lastname = ? , username = ? , email = ? , user_id = ? , profilePic = ?, user_from = 'Google'",
                  [
                    profile._json.given_name,
                    profile._json.family_name,
                    profile._json.name,
                    profile._json.email,
                    "Go" + profile._json.sub,
                    profile._json.picture,
                  ]
                );
                db.query("select id from users where user_id = ?", ["Go" + profile._json.sub], (err, rsl) => {
                  return cb(null, rsl[0].id);
                });
              }
            }
          );
        } else {
          // console.log("found");
          db.query("select id from users where user_id = ?", ["Go" + profile._json.sub], (err, rsl) => {
            return cb(null, rsl[0].id);
          });
        }
      });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/github/callback",
      scope: ["user:email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      db.query("select user_id from users where user_id = ?", "Gi" + profile.id, (err, res) => {
        if (err) res.send(err);
        else if (res.length === 0) {
          db.query(
            "SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1;",
            [profile._json.login, profile.emails[0].value],
            (error, rslt) => {
              if (error) {
                // console.log(error);
              } else if (rslt[0].count > 0) {
                // console.log("Email and or username are already used");
                return cb("error");
              } else {
                db.query(
                  "insert into users set firstname= ? , lastname = ? , username = ? , email = ? , user_id = ? , profilePic = ?, user_from = 'Github'",
                  [
                    "",
                    "",
                    profile._json.login,
                    profile.emails[0].value,
                    "Gi" + profile._json.id,
                    profile._json.avatar_url,
                  ]
                );
                db.query("select id from users where user_id = ?", ["Gi" + profile._json.id], (err, rsl) => {
                  return cb(null, rsl[0].id);
                });
              }
            }
          );
        } else {
          // console.log("found");
          db.query("select id from users where user_id = ?", ["Gi" + profile._json.id], (err, rsl) => {
            return cb(null, rsl[0].id);
          });
        }
      });
    }
  )
);

passport.use(
  new SCHOOLStrategy(
    {
      clientID: SCHOOL_CLIENT_ID,
      clientSecret: SCHOOL_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/42/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      db.query("select user_id from users where user_id = ?", "42" + profile.id, (err, res) => {
        if (err) res.send(err);
        else if (res.length === 0) {
          db.query(
            "SELECT COUNT(*) AS count FROM `users` WHERE `username` = ? OR `email` = ? LIMIT 1;",
            [profile._json.login, profile._json.email],
            (error, rslt) => {
              if (error) {
                // console.log(error);
              } else if (rslt[0].count > 0) {
                // console.log("Email and or username are already used");
                return cb("error");
              } else {
                db.query(
                  "insert into users set firstname= ? , lastname = ? , username = ? , email = ? , user_id = ? , profilePic = ?, user_from = 'School'",
                  [
                    profile._json.first_name,
                    profile._json.last_name,
                    profile._json.login,
                    profile._json.email,
                    "42" + profile._json.id,
                    profile._json.image_url,
                  ]
                );
                db.query("select id from users where user_id = ?", ["42" + profile._json.id], (err, rsl) => {
                  return cb(null, rsl[0].id);
                });
              }
            }
          );
        } else {
          // console.log("found");
          db.query("select id from users where user_id = ?", ["42" + profile._json.id], (err, rsl) => {
            return cb(null, rsl[0].id);
          });
        }
      });
    }
  )
);
module.exports = passport;
