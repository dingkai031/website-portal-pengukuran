//==========Model Database===============

const User = require("./models/user");
const Alat = require("./models/alat");
const Tempat = require("./models/tempat");

//==========Definisi Routes===============
const maintenanceRoutes = require("./routes/maintenance");
const upik3Routes = require("./routes/upik3");
const inspeksiRoutes = require("./routes/inspeksi");

//========Global Setting===============
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrat = require("passport-local");

const { isLoggedIn } = require("./middleware");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//================definisi Session======
const session = require("express-session");

const sessionConfig = {
  secret: "i34ftyni(&NXCT)MY#(joie(@V*NY",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

//========Definisi Ruang Kerja===============

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

//========Definisi Form Data===============
app.use(express.urlencoded({ extended: true }));

//=====Form Method selain POST DAN GET======
app.use(methodOverride("_method"));

//=============Passport=====================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrat(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========MongooseDataBase===============

mongoose
  .connect("mongodb://localhost:27017/pendidikan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("koneksi sukses ke Database port 27017 Sukses");
  })
  .catch((e) => {
    console.log(`koneksike data base tidak berhasil : ${e}`);
  });
//=======================================
app.use(flash());
//=========Pesan Flash===========
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.hapus = req.flash("hapus");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

//=================================

//========Routing===============

app.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render("login");
  }
  res.redirect("/portal");
});

app.post(
  "/",
  passport.authenticate("local", {
    failureFlash: "Email atau password salah",
    failureRedirect: "/",
  }),
  (req, res) => {
    const redirectUrl = req.session.returnTo || "/portal";
    res.redirect(redirectUrl);
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Anda berhasil keluar");
  res.redirect("/");
});

app.get("/portal", isLoggedIn, (req, res) => {
  res.render("landingPage");
});
//===================================================================
app.use("/inspeksi", inspeksiRoutes);
//===================================================================
app.use("/maintenance", maintenanceRoutes);
//===================================================================
app.use("/upik3", upik3Routes);
// ========Error Handling===============
app.all("*", (req, res) => {
  res.status(404).send("<h1>TIDAK DITEMUKAN </h1>");
});

//========Port Setting===============
app.listen(8080, () => {
  console.log("listening on port 8080");
});
