//==========Model Database===============

const User = require("./models/users");
const Alat = require("./models/alat");

//========Global Setting===============
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//========Definisi Ruang Kerja===============

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

//========Definisi Form Data===============
app.use(express.urlencoded({ extended: true }));

//========MongooseDataBase===============

mongoose
  .connect("mongodb://localhost:27017/pendidikan", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("koneksi sukses ke Database port 27017 Sukses");
  })
  .catch(e => {
    console.log(`koneksike data base tidak berhasil : ${e}`);
  });

//========Routing===============

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/portal", (req, res) => {
  res.render("landingPage");
});
//===================================================================
app.get("/inspeksi", (req, res) => {
  res.render("inspeksi");
});
//===================================================================
app.get("/maintenance", (req, res) => {
  res.render("maintenance");
});

app.get("/maintenance/data-alat", async (req, res) => {
  const alats = await Alat.find({});
  res.render("maintenanceDataAlat", { alats });
});

app.post("/maintenance/data-alat", async (req, res) => {
  const {
    name: nameBaru,
    tanggal: tanggalBaru,
    spesifikasi: spesifikasiBaru,
    jumlah: jumlahBaru,
    lokasi: lokasiBaru,
    kategori: kategoriBaru
  } = req.body;
  const newDate = tanggalBaru.split("-");
  const validDate = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
  const isoDate = new Date(validDate);
  const newAlatObject = {
    nama: nameBaru,
    tanggalPeroleh: isoDate,
    spesifikasi: spesifikasiBaru,
    jumlah: jumlahBaru,
    lokasi: lokasiBaru,
    kategori: kategoriBaru
  };
  const newAlat = new Alat(newAlatObject);
  await newAlat.save();
  res.redirect("/maintenance/data-alat");
});

app.get("/maintenance/maintenance", (req, res) => {
  res.render("maintenanceMaintenance");
});
//===================================================================
app.get("/p3k", (req, res) => {
  res.render("p3k");
});

app.get("/p3k/pelaporan-kependidikan", (req, res) => {
  res.render("p3kLaporKependidikan");
});

app.get("/p3k/pelaporan-mahasiswa", (req, res) => {
  res.render("p3kLaporMahasiswa");
});

app.get("/p3k/kotak-p3k-b", (req, res) => {
  res.render("p3kKotakP3kB");
});

app.get("/p3k/kotak-p3k-c", (req, res) => {
  res.render("p3kKotakP3kC");
});

app.get("/p3k/pendataan-ketersediaan-alat-evakuasi-korban", (req, res) => {
  res.render("pendataanAlatEvakuasiKorban");
});

app.get("/p3k/formulir-pemulihan", (req, res) => {
  res.render("formulirPemulihan");
});

//========Error Handling===============
app.get("*", (req, res) => {
  res.send("<h1>TIDAK DITEMUKAN </h1>");
});

//========Port Setting===============
app.listen(8080, () => {
  console.log("listening on port 8080");
});
