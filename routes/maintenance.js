const express = require("express");
const router = express.Router({ mergeParams: true });

const Alat = require("../models/alat");
const Tempat = require("../models/tempat");
const User = require("../models/user");
const path = require("path");

const { isLoggedIn } = require("../middleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "fotoAlat") {
      cb(null, path.join(__dirname, "../public/img/fotoAlat"));
    } else if (file.fieldname === "dokumentasiMaintenance") {
      cb(null, path.join(__dirname, "../public/img/dokumentasiMaintenance"));
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "fotoAlat") {
      cb(null, req.body.name + "-" + Date.now() + ".jpg");
    } else {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    }
  },
});

const upload = multer({ storage });

function convertDate(tanggal) {
  const newDate = tanggal.split("-");
  const isoDate = new Date(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);
  return isoDate;
}
//=========================================================================================================================
router.get("/", isLoggedIn, async (req, res) => {
  const jenisTempatQuery = false;
  let foundAlat = await Alat.find({
    "lokasi.namaLokasi": req.user.lokasi,
    "permintaanMaintenance.teknisi": req.user._id,
    "permintaanMaintenance.kondisiSelesai": false,
  }).populate("permintaanMaintenance.teknisi");
  let foundIndexPermintaan;
  for (const alat of foundAlat) {
    foundIndexPermintaan = alat.permintaanMaintenance.findIndex(
      (obj) =>
        obj.teknisi.nip.toString() === req.user.nip.toString() &&
        obj.kondisiSelesai === false
    );
    if (foundIndexPermintaan !== -1) {
      break;
    }
  }
  if (foundIndexPermintaan === -1) {
    foundAlat = false;
  }

  const foundTeknisi = (await User.find({ status: "teknisi" })).length;
  const foundKabeng = (await User.find({ status: "kabeng" })).length;
  const foundKalab = (await User.find({ status: "kalab" })).length;
  const foundBauk = (await User.find({ status: "bauk" })).length;
  const foundUpik3 = (await User.find({ status: "upik3" })).length;
  const totalKetuaTempat = parseInt(foundKalab) + parseInt(foundKabeng);
  const foundBengkel = (await Tempat.find({ jenis: "maintenancebengkel" }))
    .length;
  const foundLab = (await Tempat.find({ jenis: "maintenancelab" })).length;
  const foundAlatNew = await Alat.find({});
  const foundPermintaanMaintenance = [];
  for (const alat of foundAlatNew) {
    foundPermintaanMaintenance.push(
      parseInt(alat.permintaanMaintenance.length)
    );
  }
  const data = {
    jumlahTeknisi: foundTeknisi,
    jumlahKetuaTempat: totalKetuaTempat,
    jumlahBauk: foundBauk,
    jumlahUpik3: foundUpik3,
    jumlahBengkel: foundBengkel,
    jumlahLab: foundLab,
    jumlahAlat: foundAlatNew.length,
    jumlahPermintaanMaintenance: foundPermintaanMaintenance.reduce((x, y) => {
      return x + y;
    }),
  };
  const foundJenisTempat = await Tempat.findOne({ nama: req.user.lokasi });
  res.render("maintenance/maintenance", {
    foundJenisTempat,
    jenisTempatQuery,
    foundAlat,
    data,
  });
});

router.put(
  "/",
  upload.array("dokumentasiMaintenance"),
  isLoggedIn,
  async (req, res) => {
    const {
      idAlat,
      nipTeknisi,
      tanggalPermintaan,
      ketKondisi,
      ketPerbaikan,
      opsiCek,
      tanggalMaintenance,
    } = req.body;
    const tanggalPermintaanValid = convertDate(tanggalPermintaan);
    const namaFoto = [];
    for (const img of req.files) {
      namaFoto.push(img.filename);
    }
    const foundAlatMaintenance = await Alat.findById(idAlat).populate(
      "permintaanMaintenance.teknisi"
    );
    const foundPermintaan =
      foundAlatMaintenance.permintaanMaintenance.findIndex(
        (obj) =>
          obj.teknisi.nip.toString() === nipTeknisi.toString() &&
          obj.tanggalPermintaanMaintenance.toString() ===
            tanggalPermintaanValid.toString()
      );
    foundAlatMaintenance.permintaanMaintenance[
      foundPermintaan
    ].dilaksanakan = true;
    if (
      foundAlatMaintenance.permintaanMaintenance[foundPermintaan].dilaksanakan
    ) {
      for (const fotoBaru of namaFoto) {
        foundAlatMaintenance.permintaanMaintenance[
          foundPermintaan
        ].dokumentasi.push(fotoBaru);
      }
    } else {
      foundAlatMaintenance.permintaanMaintenance[foundPermintaan].dokumentasi =
        namaFoto;
    }

    foundAlatMaintenance.permintaanMaintenance[foundPermintaan].kondisi =
      ketKondisi;
    foundAlatMaintenance.permintaanMaintenance[foundPermintaan].opsiCek =
      opsiCek;
    foundAlatMaintenance.permintaanMaintenance[foundPermintaan].keterangan =
      ketPerbaikan;
    foundAlatMaintenance.permintaanMaintenance[
      foundPermintaan
    ].tanggalTeknisiMaintenance = convertDate(tanggalMaintenance);
    if (opsiCek !== "selesai") {
      const { tanggalMaintenanceBerikutnya } = req.body;
      foundAlatMaintenance.permintaanMaintenance[
        foundPermintaan
      ].tanggalPermintaanMaintenance = convertDate(
        tanggalMaintenanceBerikutnya
      );
    } else if (opsiCek === "selesai") {
      foundAlatMaintenance.permintaanMaintenance[
        foundPermintaan
      ].kondisiSelesai = true;
    }

    const updated = await foundAlatMaintenance.save().catch((e) => {
      console.log(e);
      req.flash(
        "error",
        "Data maintenance tidak berhasil dimasukkan, silahkan dicoba lagi"
      );
    });
    req.flash("success", "Data maintenance berhasil dimasukkan");
    res.redirect("/maintenance");
  }
);

router.get("/:jenisTempatQuery", isLoggedIn, async (req, res) => {
  const { jenisTempatQuery } = req.params;
  const kumpulanTempat =
    req.user.status === "admin" ||
    req.user.status === "upik3" ||
    req.user.status === "bauk"
      ? await Tempat.find({
          jenis: jenisTempatQuery,
        })
      : await Tempat.find({
          jenis: jenisTempatQuery,
          nama: req.user.lokasi,
        });
  if (kumpulanTempat.length !== 0) {
    const foundJenisTempat = await Tempat.findOne({ nama: req.user.lokasi });
    res.render("maintenance/maintenanceTempat", {
      foundJenisTempat,
      jenisTempatQuery,
      kumpulanTempat,
    });
  } else {
    res.send("<h1>Halaman tidak ditemukan</h1>");
  }
});

router.get("/:jenisTempatQuery/:namaTempat", isLoggedIn, async (req, res) => {
  const { jenisTempatQuery, namaTempat } = req.params;
  const tempatTerpilih = await Tempat.findOne({ alamat: namaTempat });
  if (tempatTerpilih) {
    const foundJenisTempat = await Tempat.findOne({ nama: req.user.lokasi });
    res.render("maintenance/maintenanceTempatPilihan", {
      foundJenisTempat,
      jenisTempatQuery,
      tempatTerpilih,
    });
  } else {
    res.send("<h1>Halaman tidak ditemukan</h1>");
  }
});

router.get(
  "/:jenisTempatQuery/:namaTempat/data-alat",
  isLoggedIn,
  async (req, res) => {
    const { jenisTempatQuery, namaTempat } = req.params;
    const tempatTerpilih = await Tempat.findOne({ alamat: namaTempat });
    const kumpulanAlat = await Alat.find({
      "lokasi.namaLokasi": `${tempatTerpilih.nama}`,
    });
    const foundJenisTempat = await Tempat.findOne({ nama: req.user.lokasi });
    res.render("maintenance/maintenanceDataAlat", {
      foundJenisTempat,
      jenisTempatQuery,
      tempatTerpilih,
      kumpulanAlat,
    });
  }
);
router.post(
  "/:jenisTempatQuery/:namaTempat/data-alat",
  isLoggedIn,
  upload.single("fotoAlat"),
  async (req, res) => {
    const { jenisTempatQuery, namaTempat } = req.params;
    const {
      name,
      tanggal,
      spesifikasi,
      konsumsiTenagaMin,
      konsumsiTenagaMax,
      kemampuanAlatMin,
      kemampuanAlatMax,
      jumlah,
      lokasi,
      kategori,
    } = req.body;
    console.log(req.file);
    const { filename } = req.file;
    const isoDate = convertDate(tanggal);

    const newAlatObject = {
      foto: filename,
      nama: name,
      tanggalPeroleh: isoDate,
      spesifikasi: spesifikasi,
      konsumsiTenaga: {
        minimal: konsumsiTenagaMin,
        maksimal: konsumsiTenagaMax,
      },
      kemampuanAlat: {
        minimal: kemampuanAlatMin,
        maksimal: kemampuanAlatMax,
      },
      lokasi: {
        namaLokasi: lokasi,
        jumlah: jumlah,
      },
      kategori: kategori,
    };
    const newAlat = new Alat(newAlatObject);
    await newAlat
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        res.send(`Error : ${e}`);
      });
    req.flash("success", `Alat ${name} di ${lokasi} berhasil ditambahkan`);
    res.redirect(`/maintenance/${jenisTempatQuery}/${namaTempat}/data-alat`);
  }
);
router.put(
  "/:jenisTempatQuery/:namaTempat/data-alat",
  isLoggedIn,
  async (req, res) => {
    const { jenisTempatQuery, namaTempat } = req.params;
    const {
      idAlat,
      name,
      tanggal,
      spesifikasi,
      konsumsiTenagaMin,
      konsumsiTenagaMax,
      kemampuanAlatMin,
      kemampuanAlatMax,
      jumlah,
      kategori,
    } = req.body;
    const validDate = convertDate(tanggal);
    const foundAlat = await Alat.findById(idAlat);
    foundAlat.nama = name;
    foundAlat.tanggalPeroleh = validDate;
    foundAlat.spesifikasi = spesifikasi;
    foundAlat.lokasi.jumlah = jumlah;
    foundAlat.kategori = kategori;
    foundAlat.konsumsiTenaga.minimal = konsumsiTenagaMin;
    foundAlat.konsumsiTenaga.maksimal = konsumsiTenagaMax;
    foundAlat.kemampuanAlat.minimal = kemampuanAlatMin;
    foundAlat.kemampuanAlat.maksimal = kemampuanAlatMax;
    await foundAlat
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(`error : ${e}`);
      });

    req.flash("success", `Alat ${name} berhasil diubah`);
    res.redirect(`/maintenance/${jenisTempatQuery}/${namaTempat}/data-alat`);
  }
);
router.delete(
  "/:jenisTempatQuery/:namaTempat/data-alat",
  isLoggedIn,
  async (req, res) => {
    const { idAlat, namaAlat } = req.body;
    const { jenisTempatQuery, namaTempat } = req.params;
    const terhapus = await Alat.findByIdAndDelete(idAlat);
    req.flash("delete", `Alat ${namaAlat} berhasil dihapus`);
    res.redirect(`/maintenance/${jenisTempatQuery}/${namaTempat}/data-alat`);
  }
);

router.get(
  "/:jenisTempatQuery/:alamatTempat/data-alat/:idAlat",
  async (req, res) => {
    const { jenisTempatQuery, alamatTempat, idAlat } = req.params;
    const foundedTempat = await Tempat.findOne({ alamat: alamatTempat });
    const foundTeknisi = await User.find({
      lokasi: foundedTempat.nama,
      status: "teknisi",
    });
    const foundedAlat = await Alat.findById(idAlat).populate(
      "permintaanMaintenance.teknisi"
    );
    const foundJenisTempat = await Tempat.findOne({ nama: req.user.lokasi });
    res.render("maintenance/maintenanceFormMaintenance", {
      foundJenisTempat,
      jenisTempatQuery,
      foundedAlat,
      foundedTempat,
      foundTeknisi,
    });
  }
);

router.post(
  "/:jenisTempatQuery/:alamatTempat/data-alat/:idAlat",
  isLoggedIn,
  async (req, res) => {
    const { idAlat, jenisTempatQuery, alamatTempat } = req.params;
    const { teknisi, permintaanMaintenance } = req.body;
    const isoDate = convertDate(permintaanMaintenance);
    const teknisiTerpilih = await User.findById(teknisi);
    const peminta = await User.findById(req.user._id);
    const alatMaintenance = await Alat.findById(idAlat);
    alatMaintenance.permintaanMaintenance.push({
      peminta,
      teknisi: teknisiTerpilih,
      tanggalPermintaanMaintenance: isoDate,
    });
    const selesai = await alatMaintenance.save();
    req.flash(
      "success",
      `Permintaan Maintenance untuk ${alatMaintenance.nama} berhasil dimasukkan`
    );
    res.redirect(
      `/maintenance/${jenisTempatQuery}/${alamatTempat}/data-alat/${idAlat}`
    );
  }
);

router.delete(
  "/:jenisTempatQuery/:alamatTempat/data-alat/:idAlat",
  isLoggedIn,
  async (req, res) => {
    const { idAlat, jenisTempatQuery, alamatTempat } = req.params;
    const { idTeknisi, tanggalMaintenance } = req.body;
    const alatFound = await Alat.findById(idAlat).populate(
      "permintaanMaintenance.teknisi"
    );
    const foundPermintaan = alatFound.permintaanMaintenance.findIndex(
      (obj) =>
        obj.teknisi._id.toString() === idTeknisi.toString() &&
        obj.tanggalPermintaanMaintenance == tanggalMaintenance
    );
    alatFound.permintaanMaintenance.splice(foundPermintaan, 1);
    const saved = await alatFound.save();

    req.flash("hapus", "Permintaan Maintenance Berhasil dihapus");
    res.redirect(
      `/maintenance/${jenisTempatQuery}/${alamatTempat}/data-alat/${idAlat}`
    );
  }
);

router.put(
  "/:jenisTempatQuery/:alamatTempat/data-alat/:idAlat",
  isLoggedIn,
  async (req, res) => {
    const { idAlat, jenisTempatQuery, alamatTempat } = req.params;
    const { teknisi, permintaanMaintenanceEdit, oldTeknisi, oldDate } =
      req.body;
    const tanggalValid = convertDate(permintaanMaintenanceEdit);
    const tanggalBaru = new Date(tanggalValid);
    const userFound = await User.findById(teknisi);
    const alatFound = await Alat.findById(idAlat);
    const foundPermintaan = alatFound.permintaanMaintenance.findIndex(
      (obj) =>
        obj.teknisi.toString() === oldTeknisi.toString() &&
        obj.tanggalPermintaanMaintenance.toString() === oldDate.toString()
    );
    alatFound.permintaanMaintenance[foundPermintaan].teknisi = userFound;
    alatFound.permintaanMaintenance[
      foundPermintaan
    ].tanggalPermintaanMaintenance = tanggalBaru;
    const berubah = await alatFound.save();
    req.flash("success", "Permintaan Maintenance Berhasil diubah");
    res.redirect(
      `/maintenance/${jenisTempatQuery}/${alamatTempat}/data-alat/${idAlat}`
    );
  }
);

router.get(
  "/:jenisTempatQuery/:alamatTempat/data-alat/riwayat/:idAlat",
  isLoggedIn,
  async (req, res) => {
    const { jenisTempatQuery, alamatTempat, idAlat } = req.params;
    const foundAlat = await Alat.findById(idAlat)
      .populate("permintaanMaintenance.teknisi")
      .populate("permintaanMaintenance.peminta")
      .populate("permintaanMaintenance.validasi.kepalaTempat.user")
      .populate("permintaanMaintenance.validasi.bauk.user")
      .populate("permintaanMaintenance.validasi.upik3.user")
      .catch((e) => {
        req.flash("hapus", "Alat tidak ditemukan");
        return res.redirect(
          `/maintenance/${jenisTempatQuery}/${alamatTempat}/data-alat`
        );
      });
    if (foundAlat !== undefined) {
      const foundJenisTempat = await Tempat.findOne({ nama: req.user.lokasi });
      res.render("maintenance/maintenanceHistory", {
        foundJenisTempat,
        jenisTempatQuery,
        alamatTempat,
        foundAlat,
        idAlat,
      });
    }
  }
);

router.put(
  "/:jenisTempatQuery/:alamatTempat/data-alat/riwayat/:idAlat/kepalaTempat/:idPermintaanMaintenance",
  isLoggedIn,
  async (req, res) => {
    const { jenisTempatQuery, alamatTempat, idAlat, idPermintaanMaintenance } =
      req.params;
    const alatFound = await Alat.findById(idAlat);
    const foundPermintaan = alatFound.permintaanMaintenance.findIndex(
      (obj) => obj._id.toString() === idPermintaanMaintenance.toString()
    );
    if (req.user.status === "kalab" || req.user.status === "kabeng") {
      const foundUser = await User.findById(req.user._id);
      alatFound.permintaanMaintenance[
        foundPermintaan
      ].validasi.kepalaTempat.status = true;
      alatFound.permintaanMaintenance[
        foundPermintaan
      ].validasi.kepalaTempat.user = foundUser;
    } else if (req.user.status === "bauk") {
      const foundUser = await User.findById(req.user._id);
      alatFound.permintaanMaintenance[
        foundPermintaan
      ].validasi.bauk.status = true;
      alatFound.permintaanMaintenance[foundPermintaan].validasi.bauk.user =
        foundUser;
    } else if (req.user.status === "upik3") {
      const foundUser = await User.findById(req.user._id);
      alatFound.permintaanMaintenance[
        foundPermintaan
      ].validasi.upik3.status = true;
      alatFound.permintaanMaintenance[foundPermintaan].validasi.upik3.user =
        foundUser;
    }
    const updated = await alatFound.save();
    req.flash(
      "success",
      `Approval oleh ${req.user.nama}-${req.user.status} berhasil`
    );
    res.redirect(
      `/maintenance/${jenisTempatQuery}/${alamatTempat}/data-alat/riwayat/${idAlat}`
    );
  }
);

module.exports = router;
