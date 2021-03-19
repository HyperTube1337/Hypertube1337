const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
GOOGLE_CLIENT_ID = "786908425148-6p1p601gavkec85f1063ra7o6tksndlj.apps.googleusercontent.com";
GOOGLE_CLIENT_SECRET = "6Kid-W_BzCLqkGsHiEls7Y61";
const db = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      db.query("select user_id from users where user_id = ?" , 'Go' + profile.id, (err, res)=>{
        console.log(res.length)
        if(err)
        res.send(err)
        else if(res.length === 0){
          db.query("insert into users set firstname= ? , lastname = ? , username = ? , email = ? , user_id = ? , profilePic = ?, user_from = 'Google'", [profile._json.given_name, profile._json.family_name, profile._json.name, profile._json.email, 'Go' + profile._json.sub, profile._json.picture])
        }
        else{
          console.log("found")
          return cb(null, 'Go' + profile._json.sub);
        }
      })
      // de.query({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      //   if (profile) {
      //     user = profile;
      //     return cb(null, user);
      //   }
      //   else {
      //     return cb(null, false);
      //     }
    }
  )
);

module.exports = passport