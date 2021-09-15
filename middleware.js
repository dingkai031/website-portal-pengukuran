module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Silahkan masuk terlebih dahulu");
    return res.redirect("/");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  console.log(req.user.status);
  if (req.user.status !== "admin") {
    console.log("bukan admin");
    req.flash(
      "error",
      "Maaf anda tidak memiliki hak untuk mengakses halaman ini"
    );
    return res.redirect(req.baseUrl);
  }
  console.log("next");
  next();
};
