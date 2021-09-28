const express = require("express");
const moment = require("moment");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");

const Tempat = require("../models/tempat");
const User = require("../models/user");
const LaporanKecelakaan = require("../models/laporanKecelakaan");
const LaporanKotakP3k = require("../models/laporanKotakP3k");
const LaporanAlatEvakuasi = require("../models/laporanAlatEvakuasi");
const LaporanPemulihanAlat = require("../models/laporanPemulihanAlatEvakuasi");
const path = require("path");

const upik3 = require("../controllers/upik3");

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

const converDate = {
  regular: function (tanggal) {
    const arrayOfDate = tanggal.split("-");
    return new Date(`${arrayOfDate[2]}-${arrayOfDate[1]}-${arrayOfDate[0]}`);
  },
  regularLokal: function (tanggal) {
    return `${("0" + tanggal.getDate()).slice(-2)}-${(
      "0" +
      (tanggal.getMonth() + 1)
    ).slice(-2)}-${tanggal.getFullYear()}`;
  },
  regularLokalMoment: function (tanggal) {
    return moment(this.converDateEu(tanggal))
      .locale("id")
      .format("DD MMMM YYYY");
  },
  converDateEu: function (tanggal) {
    return `${tanggal.getFullYear()}-${("0" + (tanggal.getMonth() + 1)).slice(
      -2
    )}-${("0" + tanggal.getDate()).slice(-2)}`;
  },
};

function convertDate(tanggal) {
  const newDate = tanggal.split("-");
  const isoDate = new Date(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);
  return isoDate;
}

router.get("/", isLoggedIn, upik3.dashboard);

router.post(
  "/kuesioner",
  isLoggedIn,
  upload.array("dokumentasi"),
  upik3.halamanKuesioner
);

router
  .route("/pelaporan-kependidikan")
  .get(isLoggedIn, upik3.halamanLaporanPendidikan)
  .post(isLoggedIn, upik3.submitLaporanPendidikan);

router
  .route("/pelaporan-mahasiswa")
  .get(isLoggedIn, upik3.halamanLaporanMahasiswa)
  .post(isLoggedIn, upik3.submitLaporanMahasiswa);

router
  .route("/kotak-p3k-b")
  .get(isLoggedIn, upik3.halamanKotakP3kB)
  .post(isLoggedIn, upik3.submitKotakP3kB);

router
  .route("/kotak-p3k-c")
  .get(isLoggedIn, upik3.halamanKotakP3kC)
  .post(isLoggedIn, upik3.submitKotakP3kC);

router
  .route("/pendataan-ketersediaan-alat-evakuasi-korban")
  .get(isLoggedIn, (req, res) => {
    res.render("p2k3/pendataanAlatEvakuasiKorban");
  })
  .post(isLoggedIn, upik3.submitKetersediaanAlatEvakuasi);

router
  .route("/formulir-pemulihan")
  .get(isLoggedIn, async (req, res) => {
    const foundTempat = await Tempat.find({});
    res.render("p2k3/p3kFormulirPemulihan", { foundTempat });
  })
  .post("/formulir-pemulihan", isLoggedIn, upik3.submitPemulihan);

router.get("/data-laporan-kecelakaan", isLoggedIn, async (req, res) => {
  const foundTempat = await Tempat.find({});
  const laporans = await LaporanKecelakaan.find({})
    .populate("saksi")
    .populate("validasi.user");
  res.render("p2k3/p3kDataLaporanKecelakaan", {
    laporans,
    foundTempat,
    moment,
    converDate,
  });
});

router.delete("/data-laporan-kecelakaan", isLoggedIn, async (req, res) => {
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
  const data = req.body;
  const tanggalValid = convertDate(data.tanggalKejadian);
  data.tanggalKejadian = tanggalValid;
  const laporan = await LaporanKecelakaan.findByIdAndUpdate(
    req.body.idLaporan,
    data
  )
    .then(() => req.flash("success", "Laporan Berhasil Diedit"))
    .catch((e) => req.flash("error", `Error : ${e}`));
  res.redirect("/upik3/data-laporan-kecelakaan");
});

router.put("/data-laporan-kecelakaan/approve", isLoggedIn, async (req, res) => {
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
  const users = await User.find({});
  const laporans = await LaporanKotakP3k.find({})
    .populate("inspektor")
    .populate("validasi.user");
  res.render("p2k3/p3kDataLaporanKotakP3k", { laporans, users, converDate });
});

router.delete("/data-laporan-kotak-p3k", isLoggedIn, async (req, res) => {
  await LaporanKotakP3k.findByIdAndDelete(req.body.idLaporan)
    .then(() => {
      return req.flash("success", "Laporan Berhasil Dihapus");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-kotak-p3k");
});

router.put("/data-laporan-kotak-p3k", isLoggedIn, async (req, res) => {
  const data = req.body;
  const user = await User.findById(data.namaInspektor);
  const laporan = await LaporanKotakP3k.findById(data.idLaporan);
  const validDate = convertDate(data.tanggalInspeksi);
  data.inspektor = user;
  data.tanggalInspeksi = validDate;
  await LaporanKotakP3k.findByIdAndUpdate(data.idLaporan, data)
    .then(() => {
      return req.flash("success", "Laporan Berhasil Diedit");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-kotak-p3k");
});

router.put("/data-laporan-kotak-p3k/approve", isLoggedIn, async (req, res) => {
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
  const users = await User.find({});
  const laporans = await LaporanAlatEvakuasi.find({})
    .populate("inspektor")
    .populate("validasi.user");
  res.render("p2k3/p3kDataLaporanAlatEvakuasi", {
    laporans,
    users,
    converDate,
  });
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
  const data = req.body;
  const user = await User.findById(data.namaInspektor);
  data.inspektor = user;
  await LaporanAlatEvakuasi.findByIdAndUpdate(data.idLaporan, data)
    .then(() => {
      return req.flash("success", "Laporan Berhasil Diedit");
    })
    .catch((e) => {
      return req.flash("error", `Error : ${e}`);
    });
  res.redirect("/upik3/data-laporan-alat-evakuasi");
});

router.put(
  "/data-laporan-alat-evakuasi/approve",
  isLoggedIn,
  async (req, res) => {
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
    res.redirect("/upik3/data-laporan-alat-evakuasi");
  }
);

router.get(
  "/data-laporan-pemulihan-alat-evakuasi",
  isLoggedIn,
  async (req, res) => {
    const foundTempat = await Tempat.find({});
    const users = await User.find({});
    const laporans = await LaporanPemulihanAlat.find({})
      .populate("inspektor")
      .populate("validasi.user");
    res.render("p2k3/p3kDataLaporanPemulihanAlatEvakuasi", {
      laporans,
      foundTempat,
      users,
      converDate,
    });
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
    const data = req.body;
    const user = await User.findById(data.namaInspektor);
    data.inspektor = user;
    data.tanggalInspeksi = convertDate(data.tanggalInspeksi);

    await LaporanPemulihanAlat.findByIdAndUpdate(data.idLaporan, data)
      .then(() => {
        return req.flash("success", "Laporan Berhasil Diedit");
      })
      .catch((e) => {
        return req.flash("error", `Error : ${e}`);
      });
    res.redirect("/upik3/data-laporan-pemulihan-alat-evakuasi");
  }
);

router.put(
  "/data-laporan-pemulihan-alat-evakuasi/approve",
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
