module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Silahkan masuk terlebih dahulu");
    return res.redirect("/");
  }
  next();
};
