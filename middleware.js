module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Silahkan masuk terlebih dahulu");
    return res.redirect("/");
  }
  next();
};
