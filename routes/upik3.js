const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");

const Tempat = require("../models/tempat");
const User = require("../models/user");
const LaporanKecelakaan = require("../models/laporanKecelakaan");
const LaporanKotakP3k = require("../models/laporanKotakP3k");
const LaporanAlatEvakuasi = require("../models/laporanAlatEvakuasi");
const LaporanPemulihanAlat = require("../models/laporanPemulihanAlatEvakuasi");
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.jenis === "pelaporan-mahasiswa") {
      if (req.body.jenisTurunan === "Mahasiswa-Minor") {
        return cb(
          null,
          path.join(
            __dirname,
            "../public/img/dokumentasiInspeksi/pelaporanMahasiswa/mahasiswaMinor"
          )
        );
      } else {
        return cb(
          null,
          path.join(
            __dirname,
            "../public/img/dokumentasiInspeksi/pelaporanMahasiswa/mahasiswaMayor"
          )
        );
      }
    } else if (req.body.jenis === "pelaporan-kependidikan") {
      if (req.body.jenisTurunan === "Tenaga Kependidikan-Minor") {
        return cb(
          null,
          path.join(
            __dirname,
            "../public/img/dokumentasiInspeksi/pelaporanTenagaKependidikan/minor"
          )
        );
      } else {
        return cb(
          null,
          path.join(
            __dirname,
            "../public/img/dokumentasiInspeksi/pelaporanTenagaKependidikan/mayor"
          )
        );
      }
    } else if (req.body.jenis === "kotak-p3k-b") {
      return cb(
        null,
        path.join(
          __dirname,
          "../public/img/dokumentasiInspeksi/pelaporanKotakP3kB"
        )
      );
    } else if (req.body.jenis === "kotak-p3k-c") {
      return cb(
        null,
        path.join(
          __dirname,
          "../public/img/dokumentasiInspeksi/pelaporanKotakP3kC"
        )
      );
    } else if (
      req.body.jenis === "pendataan-ketersediaan-alat-evakuasi-korban"
    ) {
      return cb(
        null,
        path.join(
          __dirname,
          "../public/img/dokumentasiInspeksi/pelaporanKetersediaanKotaP3k"
        )
      );
    } else if (req.body.jenis === "formulir-pemulihan") {
      return cb(
        null,
        path.join(
          __dirname,
          "../public/img/dokumentasiInspeksi/pelaporanPemulihan"
        )
      );
    }
  },
  filename: function (req, file, cb) {
    if (req.body.jenis === "pelaporan-mahasiswa") {
      if (req.body.jenisTurunan === "Mahasiswa-Minor") {
        return cb(
          null,
          file.fieldname + "-Mahasiswa-Minor-" + Date.now() + ".jpg"
        );
      } else {
        return cb(
          null,
          file.fieldname + "-Mahasiswa-Mayor-" + Date.now() + ".jpg"
        );
      }
    } else if (req.body.jenis === "pelaporan-kependidikan") {
      if (req.body.jenisTurunan === "Tenaga Kependidikan-Minor") {
        return cb(
          null,
          file.fieldname + "-TenagaKependidikan-Minor-" + Date.now() + ".jpg"
        );
      } else {
        return cb(
          null,
          file.fieldname + "-TenagaKependidikan-Mayor-" + Date.now() + ".jpg"
        );
      }
    } else if (req.body.jenis === "kotak-p3k-b") {
      return cb(null, file.fieldname + "-KotakP3kB-" + Date.now() + ".jpg");
    } else if (req.body.jenis === "kotak-p3k-c") {
      return cb(null, file.fieldname + "-KotakP3kC-" + Date.now() + ".jpg");
    } else if (
      req.body.jenis === "pendataan-ketersediaan-alat-evakuasi-korban"
    ) {
      return cb(
        null,
        file.fieldname +
          "-data-ketersediaan-alat-evakuasi-" +
          Date.now() +
          ".jpg"
      );
    } else if (req.body.jenis === "formulir-pemulihan") {
      return cb(
        null,
        file.fieldname + "-data-laporan-pemulihan-" + Date.now() + ".jpg"
      );
    }
  },
});

const upload = multer({ storage });

function convertDate(tanggal) {
  const newDate = tanggal.split("-");
  const isoDate = new Date(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);
  return isoDate;
}

function removeSpace(string) {
  return string.replace(/\s+/g, "");
}

router.get("/", (req, res) => {
  res.render("p2k3/p3k");
});

router.post("/kuesioner", upload.array("dokumentasi"), (req, res) => {
  let foto = [];
  const dataFoto = req.files;
  for (const obj of dataFoto) {
    foto.push(obj.filename);
  }
  const obj = req.body;
  obj.dokumentasi = foto;
  const jenis = obj.jenis;
  const dataForm = JSON.stringify(obj);
  res.render("p2k3/p3kKuesioner", { dataForm, jenis });
});

router.get("/pelaporan-kependidikan", isLoggedIn, async (req, res) => {
  const foundTempat = await Tempat.find({});
  res.render("p2k3/p3kLaporKependidikan", { foundTempat });
});

router.post("/pelaporan-kependidikan", isLoggedIn, async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalKejadian = convertDate(data.tanggalKejadian);
  const { alatEvakuasi1, alatEvakuasi2 } = data;
  delete data.jenis;
  data.alatEvakuasi1 = alatEvakuasi1 || "-";
  data.alatEvakuasi2 = alatEvakuasi2 || "-";
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.saksi = foundUser;
  const laporanKecelakaan = new LaporanKecelakaan(dataMerged);
  await laporanKecelakaan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/pelaporan-kependidikan");
});

router.get("/pelaporan-mahasiswa", async (req, res) => {
  const foundTempat = await Tempat.find({});
  res.render("p2k3/p3kLaporMahasiswa", { foundTempat });
});

router.post("/pelaporan-mahasiswa", isLoggedIn, async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalKejadian = convertDate(data.tanggalKejadian);
  const { alatEvakuasi1, alatEvakuasi2 } = data;
  delete data.jenis;
  data.alatEvakuasi1 = alatEvakuasi1 || "-";
  data.alatEvakuasi2 = alatEvakuasi2 || "-";
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.saksi = foundUser;
  const laporanKecelakaan = new LaporanKecelakaan(dataMerged);
  await laporanKecelakaan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/pelaporan-mahasiswa");
});

router.get("/kotak-p3k-b", (req, res) => {
  res.render("p2k3/p3kKotakP3kB");
});

router.post("/kotak-p3k-b", async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
  delete data.jenis;
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.inspektor = foundUser;
  const laporan = new LaporanKotakP3k(dataMerged);
  await laporan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/kotak-p3k-b");
});

router.get("/kotak-p3k-c", (req, res) => {
  res.render("p2k3/p3kKotakP3kC");
});

router.post("/kotak-p3k-c", async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
  delete data.jenis;
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.inspektor = foundUser;
  const laporan = new LaporanKotakP3k(dataMerged);
  await laporan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/kotak-p3k-c");
});

router.get(
  "/pendataan-ketersediaan-alat-evakuasi-korban",
  isLoggedIn,
  (req, res) => {
    res.render("p2k3/pendataanAlatEvakuasiKorban");
  }
);

router.post(
  "/pendataan-ketersediaan-alat-evakuasi-korban",
  isLoggedIn,
  async (req, res) => {
    const { dataInspeksi } = req.body;
    delete req.body.dataInspeksi;
    const data = JSON.parse(dataInspeksi);
    data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
    delete data.jenis;
    const dataMerged = { ...data, ...req.body };
    const foundUser = await User.findById(req.user._id);
    dataMerged.inspektor = foundUser;
    const laporan = new LaporanAlatEvakuasi(dataMerged);
    await laporan
      .save()
      .then(() => {
        return req.flash("success", `Inspeksi berhasil ditambahkan`);
      })
      .catch((e) => {
        return req.flash("error", `error ${e}`);
      });
    res.redirect("/upik3/kotak-p3k-c");
  }
);

router.get("/formulir-pemulihan", isLoggedIn, async (req, res) => {
  const foundTempat = await Tempat.find({});
  res.render("p2k3/p3kFormulirPemulihan", { foundTempat });
});

router.post("/formulir-pemulihan", isLoggedIn, async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
  const { alatEvakuasi1, alatEvakuasi2 } = data;
  delete data.jenis;
  data.alatEvakuasi1 = alatEvakuasi1 || "-";
  data.alatEvakuasi2 = alatEvakuasi2 || "-";
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.inspektor = foundUser;
  const laporanPemulihan = new LaporanPemulihanAlat(dataMerged);
  await laporanPemulihan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/formulir-pemulihan");
});

router.get("/data-laporan-kecelakaan", async (req, res) => {
  const laporans = await LaporanKecelakaan.find({})
    .populate("saksi")
    .populate("validasi.user");
  res.render("p2k3/p3kDataLaporanKecelakaan", { laporans });
});

router.delete("/data-laporan-kecelakaan", async (req, res) => {
  const { idLaporan } = req.body;
  const foundLaporan = await LaporanKecelakaan.findByIdAndDelete(idLaporan)
    .then(() => {
      return req.flash("success", "Laporan Berhasil Dihapus");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-kecelakaan");
});

router.put("/data-laporan-kecelakaan", isLoggedIn, async (req, res) => {
  const { idLaporan } = req.body;
  const foundLaporan = await LaporanKecelakaan.findById(idLaporan);
  const foundUser = await User.findById(req.user._id);
  foundLaporan.validasi.status = true;
  foundLaporan.validasi.user = foundUser;
  foundLaporan
    .save()
    .then(() => {
      return req.flash("success", "Laporan Berhasil Divalidasi");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-kecelakaan");
});

router.get("/data-laporan-kotak-p3k", isLoggedIn, async (req, res) => {
  const laporans = await LaporanKotakP3k.find({})
    .populate("inspektor")
    .populate("validasi.user");
  res.render("p2k3/p3kDataLaporanKotakP3k", { laporans });
});

router.delete("/data-laporan-kotak-p3k", async (req, res) => {
  await LaporanKotakP3k.findByIdAndDelete(req.body.idLaporan)
    .then(() => {
      return req.flash("success", "Laporan Berhasil Dihapus");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-kotak-p3k");
});

router.put("/data-laporan-kotak-p3k", async (req, res) => {
  const { idLaporan } = req.body;
  const foundLaporan = await LaporanKotakP3k.findById(idLaporan);
  const foundUser = await User.findById(req.user._id);
  foundLaporan.validasi.status = true;
  foundLaporan.validasi.user = foundUser;
  foundLaporan
    .save()
    .then(() => {
      return req.flash("success", "Laporan Berhasil Divalidasi");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-kotak-p3k");
});

router.get("/data-laporan-alat-evakuasi", isLoggedIn, async (req, res) => {
  const laporans = await LaporanAlatEvakuasi.find({})
    .populate("inspektor")
    .populate("validasi.user");
  res.render("p2k3/p3kDataLaporanAlatEvakuasi", { laporans });
});

router.delete("/data-laporan-alat-evakuasi", isLoggedIn, async (req, res) => {
  await LaporanAlatEvakuasi.findByIdAndDelete(req.body.idLaporan)
    .then(() => {
      return req.flash("success", "Laporan Berhasil Dihapus");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-alat-evakuasi");
});

router.put("/data-laporan-alat-evakuasi", isLoggedIn, async (req, res) => {
  const foundLaporan = await LaporanAlatEvakuasi.findById(req.body.idLaporan);
  const foundUser = await User.findById(req.user._id);
  foundLaporan.validasi.status = true;
  foundLaporan.validasi.user = foundUser;
  foundLaporan
    .save()
    .then(() => {
      return req.flash("success", "Laporan Berhasil Divalidasi");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-kotak-p3k");
});

router.get(
  "/data-laporan-pemulihan-alat-evakuasi",
  isLoggedIn,
  async (req, res) => {
    const laporans = await LaporanPemulihanAlat.find({})
      .populate("inspektor")
      .populate("validasi.user");
    res.render("p2k3/p3kDataLaporanPemulihanAlatEvakuasi", { laporans });
  }
);

router.delete(
  "/data-laporan-pemulihan-alat-evakuasi",
  isLoggedIn,
  async (req, res) => {
    await LaporanPemulihanAlat.findByIdAndDelete(req.body.idLaporan)
      .then(() => {
        return req.flash("success", "Laporan Berhasil Dihapus");
      })
      .catch((e) => {
        return req.flash("error", `Error : ${e}`);
      });
    res.redirect("/upik3/data-laporan-pemulihan-alat-evakuasi");
  }
);

router.put(
  "/data-laporan-pemulihan-alat-evakuasi",
  isLoggedIn,
  async (req, res) => {
    const foundLaporan = await LaporanPemulihanAlat.findById(
      req.body.idLaporan
    );
    const foundUser = await User.findById(req.user._id);
    foundLaporan.validasi.status = true;
    foundLaporan.validasi.user = foundUser;
    foundLaporan
      .save()
      .then(() => {
        return req.flash("success", "Laporan Berhasil Divalidasi");
      })
      .catch((e) => {
        return req.flash("error", `Error : ${e}`);
      });
    res.redirect("/upik3/data-laporan-pemulihan-alat-evakuasi");
  }
);

module.exports = router;