const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");

const Author = require("./models/author");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      Author.findOne({ username: username }, function(err, author) {
        if (err) {
          return done(err);
        }
        if (!author) {
          return done(null, false, { message: "incorrect username" });
        }
        bcrypt.compare(password, author.password, (err, res) => {
          if (res) {
            return done(null, author, { message: "logged in" });
          } else {
            return done(null, false, { message: "incorrect password" });
          }
        });
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SEC
    },
    function(payload, done) {
      Author.findById(payload._id, (err, author) => {
        if (err) {
          return done(err, false);
        }
        if (author) {
          return done(null, author);
        }
      });
    }
  )
);

module.exports = passport;
