const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, (req, res) => {
  res.render("p2k3/p3k");
});

router.get("/pelaporan-kependidikan", isLoggedIn, (req, res) => {
  res.render("p2k3/p3kLaporKependidikan");
});

router.get("/pelaporan-mahasiswa", isLoggedIn, (req, res) => {
  res.render("p2k3/p3kLaporMahasiswa");
});

router.get("/kotak-p3k-b", isLoggedIn, (req, res) => {
  res.render("p2k3/p3kKotakP3kB");
});

router.get("/kotak-p3k-c", isLoggedIn, (req, res) => {
  res.render("p2k3/p3kKotakP3kC");
});

router.get(
  "/pendataan-ketersediaan-alat-evakuasi-korban",
  isLoggedIn,
  (req, res) => {
    res.render("p2k3/pendataanAlatEvakuasiKorban");
  }
);

router.get("/formulir-pemulihan", isLoggedIn, (req, res) => {
  res.render("p2k3/formulirPemulihan");
});

module.exports = router;
