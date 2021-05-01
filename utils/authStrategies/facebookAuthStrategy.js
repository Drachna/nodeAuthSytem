const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

const strategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_KEY,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRETE_KEY,
  callbackURL: "http://localhost:4000/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
)

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
