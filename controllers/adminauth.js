const passport = require("passport");
const validator = require("validator");
const Admin = require("../models/Admin");

exports.getAdminLogin = (req, res) => {
  if (req.user && req.user.isAdmin) {
    return res.redirect("/admin/dashboard");
  }
  res.render("adminlogin", {
    title: "Admin Login",
  });
};

exports.postAdminLogin = (req, res, next) => {
  const validationErrors = [];

  // validate admin credentials
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }

  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: "Password cannot be blank." });
  }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/admin");
  }

  passport.authenticate("admin-local", (err, admin, info) => {
    if (err) {
      return next(err);
    }
    if (!admin) {
      req.flash("errors", info);
      return res.redirect("/admin");
    }

    req.logIn(admin, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in as an admin." });
      console.log("Logged in as admin")
      console.log(req.session)
      console.log(req.isAuthenticated())
      res.render("admindash.ejs");
      console.log("You are now viewing dashboard")
    });
  })(req, res, next);
};

