const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const Admin = require("../models/Admin")

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  passport.use(
    "admin-local",
    new LocalStrategy(
      { usernameField: "email" },
      (email, password, done) => {
        Admin.findOne({ email: email }, (err, admin) => {
          if (err) {
            return done(err);
          }
          if (!admin) {
            return done(null, false, {
              msg: "Email or password is incorrect.",
            });
          }
          admin.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, admin);
            }
            return done(null, false, {
              msg: "Email or password is incorrect.",
            });
          });
        });
      }
    )
  );
  

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
