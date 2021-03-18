const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
GOOGLE_CLIENT_ID = "786908425148-6p1p601gavkec85f1063ra7o6tksndlj.apps.googleusercontent.com";
GOOGLE_CLIENT_SECRET = "6Kid-W_BzCLqkGsHiEls7Y61";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
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
