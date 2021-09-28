const fs = require("fs");
const path = require("path");

const Tempat = require("../models/tempat");
const Riwayat = require("../models/riwayat");

const express = require("express");
const router = express.Router({ mergeParams: true });
const moment = require("moment");
const { isLoggedIn, isAdmin } = require("../middleware");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "denah") {
      cb(null, path.join(__dirname, "../public/img/denah"));
    } else {
      cb(null, path.join(__dirname, "../public/img/dokumentasi"));
    }
  },
  filename: function (req, file, cb) {
    console.log(file.fieldname);
    if (file.fieldname === "denah") {
      cb(null, req.body.namaTempat + ".jpg");
    } else {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
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
// ----------------------------------------------------------------------------------------------------------------------------

router.get("/", isLoggedIn, async (req, res) => {
  let { menu } = req.params;
  if (menu === undefined) {
    menu = "inspeksi";
  }
  const tempats = await Tempat.find({});
  res.render("inspeksi/inspeksi", { tempats, menu });
});

router.post(
  "/",
  isLoggedIn,
  upload.array("dokumentasiPengukuran"),
  async (req, res) => {
    const {
      jumlahTitikIklimKerja,
      jumlahTitikGetaran,
      jumlahTitikKebisingan,
      jumlahTitikPencahayaan,
      jumlahTitikVentilasi,
      namaPengukur,
      lokasiPengukuran,
      rekomendasiPengukuran,
      ventilasiRuangan,
      ventilasiPanjang,
      ventilasiLebar,
      ventilasiTinggi,
      pencahayaanPanjang,
      pencahayaanLebar,
      pencahayaanTinggi,
      pencahayaanJenisPencahayaan,
      pencahayaanJumlahPencahayaan,
      pencahayaanJumlahPencahayaanRusak,
      totalratarata,
    } = req.body;
    const arrayOfImage = req.files;
    const submittedData = req.body;
    const dokumentasiPengukuran = [];
    const kebisingan = [];
    const getaran = [];
    const iklimKerja = [];
    const pencahayaan = [];
    const ventilasi = [];
    if (arrayOfImage) {
      for (const img of arrayOfImage) {
        dokumentasiPengukuran.push(img.filename);
      }
    }
    if (parseInt(jumlahTitikKebisingan) > 0) {
      for (let i = 1; i < parseInt(jumlahTitikKebisingan) + 1; i++) {
        const obj = {
          lokasiPengukuran: submittedData[`lokasiKebisingan${i}`],
          intensitasBising1: parseFloat(
            submittedData[`kebisinganIntensitasKebisingan${i}-1`]
          ),
          intensitasBising2: parseFloat(
            submittedData[`kebisinganIntensitasKebisingan${i}-2`]
          ),
          intensitasBising3: parseFloat(
            submittedData[`kebisinganIntensitasKebisingan${i}-3`]
          ),
          ratarataBising: parseFloat(submittedData[`ratarata${i}`]).toFixed(2),
        };
        kebisingan.push(obj);
      }
    }
    if (parseInt(jumlahTitikGetaran) > 0) {
      for (let i = 1; i < parseInt(jumlahTitikGetaran) + 1; i++) {
        const obj = {
          lokasiPengukuran: submittedData[`lokasiGetaran${i}`],
          percepatan1: parseFloat(submittedData[`getaranPercepatan${i}-1`]),
          percepatan2: parseFloat(submittedData[`getaranPercepatan${i}-2`]),
          percepatan3: parseFloat(submittedData[`getaranPercepatan${i}-3`]),
          percepatanMax: parseFloat(submittedData[`getaranPercepatanMax${i}`]),
          kecepatan1: parseFloat(submittedData[`getaranKecepatan${i}-1`]),
          kecepatan2: parseFloat(submittedData[`getaranKecepatan${i}-2`]),
          kecepatan3: parseFloat(submittedData[`getaranKecepatan${i}-3`]),
          kecepatanMax: parseFloat(submittedData[`getaranKecepatanMax${i}`]),
          perpindahan1: parseFloat(submittedData[`getaranPerpindahan${i}-1`]),
          perpindahan2: parseFloat(submittedData[`getaranPerpindahan${i}-2`]),
          perpindahan3: parseFloat(submittedData[`getaranPerpindahan${i}-3`]),
          perpindahanMax: parseFloat(
            submittedData[`getaranPerpindahanMax${i}`]
          ),
          frekuensi: parseFloat(submittedData[`getaranFrekuensi${i}`]),
        };
        getaran.push(obj);
      }
    }
    if (parseInt(jumlahTitikIklimKerja) > 0) {
      for (let i = 1; i < parseInt(jumlahTitikIklimKerja) + 1; i++) {
        const obj = {
          usia: parseInt(submittedData[`iklimKerjaUsia${i}`]),
          bb: parseFloat(submittedData[`iklimKerjaBB${i}`]),
          lokasiPengukuran: submittedData[`lokasiIklimKerja${i}`],
          suhuBasah: parseFloat(submittedData[`iklimKerjaSuhuBasah${i}`]),
          suhuKering: parseFloat(submittedData[`iklimKerjaSuhuKering${i}`]),
          suhuBola: parseFloat(submittedData[`iklimKerjaSuhuBola${i}`]),
          isbb: parseFloat(submittedData[`iklimKerjaISBB${i}`]),
          rh: parseFloat(submittedData[`iklimKerjaRH${i}`]),
          bebankerja: submittedData[`iklimKerjaBebanKerja${i}`],
        };
        iklimKerja.push(obj);
      }
    }
    if (parseInt(jumlahTitikPencahayaan) > 0) {
      for (let i = 1; i < parseInt(jumlahTitikPencahayaan); i++) {
        const obj = {
          lokasiPengukuran: submittedData[`lokasiPencahayaan${i}`],
          pengukuran1: parseFloat(submittedData[`pencahayaanPengukuran${i}-1`]),
          pengukuran2: parseFloat(submittedData[`pencahayaanPengukuran${i}-2`]),
          pengukuran3: parseFloat(submittedData[`pencahayaanPengukuran${i}-3`]),
          ratarata: parseFloat(submittedData[`ratarataPencahayaan${i}`]),
        };
        pencahayaan.push(obj);
      }
    }
    if (parseInt(jumlahTitikVentilasi) > 0) {
      for (let i = 1; i < parseInt(jumlahTitikVentilasi) + 1; i++) {
        const obj = {
          jenis: submittedData[`ventilasiJenisVentilasi${i}`],
          panjang: parseFloat(submittedData[`ventilasiPanjang${i}`]),
          lebar: parseFloat(submittedData[`ventilasiLebar${i}`]),
          velocity: parseFloat(submittedData[`ventilasiVelocity${i}`]),
          jumlahPekerja: parseInt(submittedData[`ventilasiJumlahPekerja${i}`]),
        };
        ventilasi.push(obj);
      }
    }
    const riwayatObj = {
      namaPengukur,
      lokasiPengukuran,
      dokumentasi: dokumentasiPengukuran,
      bagianKebisingan: kebisingan,
      bagianGetaran: getaran,
      bagianIklimKerja: iklimKerja,
      bagianPencahayaan: {
        pencahayaanPanjang,
        pencahayaanLebar,
        pencahayaanTinggi,
        pencahayaanJenisPencahayaan,
        pencahayaanJumlahPencahayaan,
        pencahayaanJumlahPencahayaanRusak,
        totalRatarata: totalratarata,
        data: pencahayaan,
      },
      bagianVentilasi: {
        ventilasiRuangan,
        ventilasiPanjang,
        ventilasiLebar,
        ventilasiTinggi,
        data: ventilasi,
      },
      rekomendasi: rekomendasiPengukuran,
    };
    const newRiwayat = new Riwayat(riwayatObj);
    const simpanRiwayat = await newRiwayat
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
        req.flash("error", e._message);
        return res.redirect("/inspeksi");
      });
    req.flash("success", `Pengukuran Berhasil Disimpan`);
    res.redirect("/inspeksi");
  }
);

router.get("/kelola-tempat", isLoggedIn, isAdmin, async (req, res) => {
  const menu = "kelola-tempat";
  const tempats = await Tempat.find({});
  res.render("inspeksi/kelolaTempat", { menu, tempats });
});

router.post(
  "/kelola-tempat",
  isLoggedIn,
  isAdmin,
  upload.single("denah"),
  async (req, res) => {
    const namaTempat = req.body.namaTempat;
    const dataTempat = {
      nama: namaTempat,
      alamat: req.body.namaTempat.toLowerCase().replace(/\s/g, "-"),
      jenis: req.body.jenisTempat,
      jumlahTitikPengukuran: {
        ventilasi: req.body.titikVentilasi,
        getaran: req.body.titikGetaran,
        penerangan: req.body.titikPenerangan,
        kebisingan: req.body.titikKebisingan,
        iklimKerja: req.body.titikIklimKerja,
      },
    };
    const newTempat = new Tempat(dataTempat);
    const simpanTempat = newTempat
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
        req.flash("error", e._message);
        return res.redirect("/inspeksi/kelola-tempat");
      });
    req.flash("success", `Tempat Berhasil Disimpan`);
    res.redirect("/inspeksi/kelola-tempat");
  }
);

router.put(
  "/kelola-tempat",
  isLoggedIn,
  isAdmin,
  upload.single("denah"),
  async (req, res) => {
    const foundTempat = await Tempat.findById(req.body.idTempat);
    if (!req.files) {
      fs.rename(
        path.join(__dirname, `../public/img/denah/${foundTempat.nama}.jpg`),
        path.join(__dirname, `../public/img/denah/${req.body.namaTempat}.jpg`),
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("renamed");
          }
        }
      );
    }
    const alamat = req.body.namaTempat.toLowerCase().replace(/\s/g, "-");
    const titikPengukuran = {
      ventilasi: req.body.titikVentilasi,
      getaran: req.body.titikGetaran,
      penerangan: req.body.titikPenerangan,
      kebisingan: req.body.titikKebisingan,
      iklimKerja: req.body.titikIklimKerja,
    };
    foundTempat.nama = req.body.namaTempat;
    foundTempat.alamat = alamat;
    foundTempat.jenis = req.body.jenisTempat;
    foundTempat.jumlahTitikPengukuran = titikPengukuran;
    foundTempat.save();
    req.flash("success", `Data ${req.body.namaTempat} Berhasil diubah`);
    res.redirect("/inspeksi/kelola-tempat");
  }
);

router.get("/riwayat", isLoggedIn, async (req, res) => {
  const menu = "riwayat";
  const riwayats = await Riwayat.find({});
  res.render("inspeksi/riwayat", { tempats: {}, menu, riwayats, converDate });
});

router.put("/riwayat", isLoggedIn, async (req, res) => {
  if (req.user.status !== "kabeng") {
    const { idData } = req.body;
    const riwayat = await Riwayat.findById(idData);
    if (riwayat) {
      const updated = await Riwayat.findByIdAndUpdate(
        idData,
        {
          approve: true,
        },
        { new: true }
      );
      req.flash("success", `Riwayat Berhasil disetuji`);
      return res.redirect("/inspeksi/riwayat");
    }
    req.flash("error", `Gagal menemukan riwayat`);
    return res.redirect("/inspeksi/riwayat");
  }
  req.flash("error", `Anda tidak memiliki izin!`);
  res.redirect("/inspeksi/riwayat");
});

router.get("/riwayat/edit", isLoggedIn, async (req, res) => {
  const menu = "riwayat";
  const { id } = req.query;
  const tempats = await Tempat.find({});
  const riwayat = await Riwayat.findById(id);
  res.render("inspeksi/editRiwayat", { tempats, menu, riwayat });
});

router.put("/riwayat/edit", isLoggedIn, async (req, res) => {
  const { targetId } = req.body;
  const submittedData = req.body;
  const riwayatTarget = await Riwayat.findById(targetId);

  const kebisingan = [];
  const getaran = [];
  const iklimKerja = [];
  const pencahayaan = [];
  const ventilasi = [];

  if (parseInt(riwayatTarget.bagianKebisingan.length) > 0) {
    for (let i = 0; i < parseInt(riwayatTarget.bagianKebisingan.length); i++) {
      const obj = {
        lokasiPengukuran: submittedData[`lokasiPengukuranKebisingan${i}`],
        intensitasBising1: parseFloat(submittedData[`intensitasBising1-${i}`]),
        intensitasBising2: parseFloat(submittedData[`intensitasBising2-${i}`]),
        intensitasBising3: parseFloat(submittedData[`intensitasBising3-${i}`]),
        ratarataBising: parseFloat(
          submittedData[`ratarataBising-${i}`]
        ).toFixed(2),
      };
      kebisingan.push(obj);
    }
  }

  if (parseInt(riwayatTarget.bagianGetaran.length) > 0) {
    for (let i = 0; i < parseInt(riwayatTarget.bagianGetaran.length); i++) {
      const obj = {
        lokasiPengukuran: submittedData[`lokasiPengukuranGetaran${i}`],
        percepatan1: parseFloat(submittedData[`percepatan1-${i}`]),
        percepatan2: parseFloat(submittedData[`percepatan2-${i}`]),
        percepatan3: parseFloat(submittedData[`percepatan3-${i}`]),
        percepatanMax: parseFloat(submittedData[`percepatanMax${i}`]),
        kecepatan1: parseFloat(submittedData[`kecepatan1-${i}`]),
        kecepatan2: parseFloat(submittedData[`kecepatan2-${i}`]),
        kecepatan3: parseFloat(submittedData[`kecepatan3-${i}`]),
        kecepatanMax: parseFloat(submittedData[`kecepatanMax${i}`]),
        perpindahan1: parseFloat(submittedData[`perpindahan1-${i}`]),
        perpindahan2: parseFloat(submittedData[`perpindahan2-${i}`]),
        perpindahan3: parseFloat(submittedData[`perpindahan3-${i}`]),
        perpindahanMax: parseFloat(submittedData[`perpindahanMax${i}`]),
        frekuensi: parseFloat(submittedData[`frekuensi${i}`]),
      };
      getaran.push(obj);
    }
  }

  if (parseInt(riwayatTarget.bagianIklimKerja.length) > 0) {
    for (let i = 0; i < parseInt(riwayatTarget.bagianIklimKerja.length); i++) {
      const obj = {
        lokasiPengukuran: submittedData[`lokasiPengukuranIklimKerja${i}`],
        usia: parseInt(submittedData[`usia${i}`]),
        bb: parseFloat(submittedData[`bb${i}`]),
        suhuBasah: parseFloat(submittedData[`suhuBasah${i}`]),
        suhuKering: parseFloat(submittedData[`suhuKering${i}`]),
        suhuBola: parseFloat(submittedData[`suhuBola${i}`]),
        isbb: parseFloat(submittedData[`isbb${i}`]),
        rh: parseFloat(submittedData[`rh${i}`]),
        bebankerja: parseFloat(submittedData[`bebanKerja${i}`]),
      };
      iklimKerja.push(obj);
    }
  }

  if (parseInt(riwayatTarget.bagianPencahayaan.data.length) > 0) {
    for (
      let i = 0;
      i < parseInt(riwayatTarget.bagianPencahayaan.data.length);
      i++
    ) {
      const obj = {
        lokasiPengukuran: submittedData[`lokasiPengukuranPencahayaan${i}`],
        pengukuran1: parseFloat(submittedData[`pengukuranPencahayaan1-${i}`]),
        pengukuran2: parseFloat(submittedData[`pengukuranPencahayaan2-${i}`]),
        pengukuran3: parseFloat(submittedData[`pengukuranPencahayaan3-${i}`]),
        ratarata: parseFloat(submittedData[`ratarataPencahayaan${i}`]),
      };
      pencahayaan.push(obj);
    }
  }

  if (parseInt(riwayatTarget.bagianVentilasi.data.length) > 0) {
    for (
      let i = 0;
      i < parseInt(riwayatTarget.bagianVentilasi.data.length);
      i++
    ) {
      const obj = {
        jenis: submittedData[`ventilasiJenis${i}`],
        panjang: parseFloat(submittedData[`ventilasiPanjang${i}`]),
        lebar: parseFloat(submittedData[`ventilasiLebar${i}`]),
        velocity: parseFloat(submittedData[`ventilasiVelocity${i}`]),
        jumlahPekerja: parseInt(submittedData[`jumlahPekerja${i}`]),
      };
      ventilasi.push(obj);
    }
  }

  const objUpdated = {
    namaPengukur: submittedData.namaPengukur,
    lokasiPengukuran: submittedData.lokasiPengukuran,
    bagianKebisingan: kebisingan,
    bagianGetaran: getaran,
    bagianIklimKerja: iklimKerja,
    bagianPencahayaan: {
      pencahayaanPanjang: submittedData.pencahayaanPanjang,
      pencahayaanLebar: submittedData.pencahayaanLebar,
      pencahayaanTinggi: submittedData.pencahayaanTinggi,
      pencahayaanJenisPencahayaan: submittedData.pencahayaanJenisPencahayaan,
      pencahayaanJumlahPencahayaan: submittedData.pencahayaanJumlahPencahayaan,
      pencahayaanJumlahPencahayaanRusak:
        submittedData.pencahayaanJumlahPencahayaanRusak,
      data: pencahayaan,
      totalRatarata: submittedData.totalRatarataPencahayaan,
    },
    bagianVentilasi: {
      ventilasiRuangan: submittedData.ventilasiRuangan,
      ventilasiPanjang: submittedData.ventilasiPanjang,
      ventilasiLebar: submittedData.ventilasiLebar,
      ventilasiTinggi: submittedData.ventilasiTinggi,
      data: ventilasi,
    },
  };
  const updated = await Riwayat.findByIdAndUpdate(
    riwayatTarget._id,
    objUpdated,
    { new: true }
  );
  req.flash("success", `Riwayat Berhasil diubah`);
  res.redirect("/inspeksi/riwayat");
});

module.exports = router;
