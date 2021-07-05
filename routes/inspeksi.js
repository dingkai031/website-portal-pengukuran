const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.render("p2k3/p3k");
});

router.get("/pelaporan-kependidikan", (req, res) => {
  res.render("p2k3/p3kLaporKependidikan");
});

router.get("/pelaporan-mahasiswa", (req, res) => {
  res.render("p2k3/p3kLaporMahasiswa");
});

router.get("/kotak-p3k-b", (req, res) => {
  res.render("p2k3/p3kKotakP3kB");
});

router.get("/kotak-p3k-c", (req, res) => {
  res.render("p2k3/p3kKotakP3kC");
});

router.get("/pendataan-ketersediaan-alat-evakuasi-korban", (req, res) => {
  res.render("p2k3/pendataanAlatEvakuasiKorban");
});

router.get("/formulir-pemulihan", (req, res) => {
  res.render("p2k3/formulirPemulihan");
});

module.exports = router;
