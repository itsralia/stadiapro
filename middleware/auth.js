

module.exports = {
  ensureAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    else{
      console.log(req.isAuthenticated())
      console.log("Cant log you in")
      res.redirect("/admin");

    }
  },

  ensureAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error", "Please login to view your locations");
      res.redirect("/");
    }
  },

  ensureGuest: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  }
};

