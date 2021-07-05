//==========Model Database===============

const User = require("./models/users");
const Alat = require("./models/alat");
const Tempat = require("./models/tempat");

//==========Definisi Routes===============
const maintenanceRoutes = require("./routes/maintenance");
const inspeksiRoutes = require("./routes/inspeksi");

//========Global Setting===============
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//========Definisi Ruang Kerja===============

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

//========Definisi Form Data===============
app.use(express.urlencoded({ extended: true }));

//=====Form Method selain POST DAN GET======
app.use(methodOverride("_method"));

//========MongooseDataBase===============

mongoose
  .connect("mongodb://localhost:27017/pendidikan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
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
  res.render("inspeksi/inspeksi");
});
//===================================================================
app.use("/maintenance", maintenanceRoutes);
//===================================================================

app.use("/p3k", inspeksiRoutes);

// ========Error Handling===============
app.all("*", (req, res) => {
  res.status(404).send("<h1>TIDAK DITEMUKAN </h1>");
});

//========Port Setting===============
app.listen(8080, () => {
  console.log("listening on port 8080");
});
