const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAdmin, isAdminTempat } = require("../middleware");

const Tempat = require("../models/tempat");
const User = require("../models/user");

router.get("/", isLoggedIn, isAdminTempat, async (req, res) => {
  const foundUsers = await User.find({});
  const tempats = await Tempat.find({});
  res.render("admin/adminKelolaUser", { foundUsers, tempats });
});

router.post("/", isLoggedIn, isAdminTempat, async (req, res) => {
  const body = req.body;
  body.username = req.body.email;
  await User.register(body, req.body.password)
    .then((data) => {
      console.log(data);
      req.flash("success", `User Baru Berhasil Ditambahkan`);
    })
    .catch((e) => {
      req.flash("error", `Gagal Menambahkan User Baru, Error : ${e}`);
    });

  res.redirect("/kelola-user");
});

router.put("/", isLoggedIn, isAdminTempat, async (req, res) => {
  const body = req.body;
  body.username = req.body.email;
  await User.findByIdAndUpdate(req.body.idUser, body)
    .then((data) => {
      console.log(data);
      req.flash("success", `User Berhasil Diubah`);
    })
    .catch((e) => {
      req.flash("error", `Error : ${e}`);
    });

  res.redirect("/kelola-user");
});

router.put("/ubah-password", isLoggedIn, isAdminTempat, async (req, res) => {
  const foundUser = await User.findByUsername(req.body.username);
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.password;
  await foundUser
    .changePassword(oldPassword, newPassword)
    .then(() => {
      req.flash("success", `Password ${req.body.username} berhasil diubah`);
    })
    .catch(() => {
      req.flash("error", `Error : Password yang anda masukkan salah`);
    });
  res.redirect("/kelola-user");
});

module.exports = router;
