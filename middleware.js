//function untuk mengecek apakah ada user yang sedang login
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Silahkan masuk terlebih dahulu");
    return res.redirect("/");
  }
  next();
};

//function untuk mengecek apakah user yang ingin mengakses suatu halaman memiliki status "admin"
module.exports.isAdmin = (req, res, next) => {
  if (req.user.status !== "admin") {
    req.flash(
      "error",
      "Maaf anda tidak memiliki hak untuk mengakses halaman ini"
    );
    return res.redirect(req.originalUrl);
  }
  next();
};

//function ini, function khusus untuk halaman portal.

module.exports.isAdminTempat = (req, res, next) => {
  if (req.user.status !== "admin") {
    req.flash(
      "adminTempat",
      "Maaf anda tidak memiliki hak yang cukup untuk mengakses halaman ini."
    );
    return res.redirect("/portal");
  }
  next();
};
