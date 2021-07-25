const Tempat = require("../models/tempat");
const Riwayat = require("../models/riwayat");

const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img/dokumentasi"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage });
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
  upload.array("dokumentasiPengukuran"),
  isLoggedIn,
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
          intensitasBising1: parseInt(
            submittedData[`kebisinganIntensitasKebisingan${i}-1`]
          ),
          intensitasBising2: parseInt(
            submittedData[`kebisinganIntensitasKebisingan${i}-2`]
          ),
          intensitasBising3: parseInt(
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
          percepatan1: parseInt(submittedData[`getaranPercepatan${i}-1`]),
          percepatan2: parseInt(submittedData[`getaranPercepatan${i}-2`]),
          percepatan3: parseInt(submittedData[`getaranPercepatan${i}-3`]),
          percepatanMax: parseInt(submittedData[`getaranPercepatanMax${i}`]),
          kecepatan1: parseInt(submittedData[`getaranKecepatan${i}-1`]),
          kecepatan2: parseInt(submittedData[`getaranKecepatan${i}-2`]),
          kecepatan3: parseInt(submittedData[`getaranKecepatan${i}-3`]),
          kecepatanMax: parseInt(submittedData[`getaranKecepatanMax${i}`]),
          perpindahan1: parseInt(submittedData[`getaranPerpindahan${i}-1`]),
          perpindahan2: parseInt(submittedData[`getaranPerpindahan${i}-2`]),
          perpindahan3: parseInt(submittedData[`getaranPerpindahan${i}-3`]),
          perpindahanMax: parseInt(submittedData[`getaranPerpindahanMax${i}`]),
          frekuensi: parseInt(submittedData[`getaranFrekuensi${i}`]),
        };
        getaran.push(obj);
      }
    }
    if (parseInt(jumlahTitikIklimKerja) > 0) {
      for (let i = 1; i < parseInt(jumlahTitikIklimKerja) + 1; i++) {
        const obj = {
          usia: parseInt(submittedData[`iklimKerjaUsia${i}`]),
          bb: submittedData[`iklimKerjaBB${i}`],
          lokasiPengukuran: submittedData[`lokasiIklimKerja${i}`],
          suhuBasah: parseInt(submittedData[`iklimKerjaSuhuBasah${i}`]),
          suhuKering: parseInt(submittedData[`iklimKerjaSuhuKering${i}`]),
          suhuBola: submittedData[`iklimKerjaSuhuBola${i}`],
          isbb: submittedData[`iklimKerjaISBB${i}`],
          rh: submittedData[`iklimKerjaRH${i}`],
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
          panjang: submittedData[`ventilasiPanjang${i}`],
          lebar: submittedData[`ventilasiLebar${i}`],
          velocity: submittedData[`ventilasiVelocity${i}`],
          jumlahPekerja: submittedData[`ventilasiJumlahPekerja${i}`],
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
        console.log(`error : ${e}`);
      });
    req.flash("success", `Pengukuran Berhasil Disimpan`);
    res.redirect("/inspeksi");
  }
);

router.get("/riwayat", isLoggedIn, async (req, res) => {
  const menu = "riwayat";
  const tempats = await Tempat.find({});
  const riwayats = await Riwayat.find({});
  res.render("inspeksi/riwayat", { tempats, menu, riwayats });
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
    res.redirect("/inspeksi/riwayat");
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
        intensitasBising1: parseInt(submittedData[`intensitasBising1-${i}`]),
        intensitasBising2: parseInt(submittedData[`intensitasBising2-${i}`]),
        intensitasBising3: parseInt(submittedData[`intensitasBising3-${i}`]),
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
        percepatan1: parseInt(submittedData[`percepatan1-${i}`]),
        percepatan2: parseInt(submittedData[`percepatan2-${i}`]),
        percepatan3: parseInt(submittedData[`percepatan3-${i}`]),
        percepatanMax: parseInt(submittedData[`percepatanMax${i}`]),
        kecepatan1: parseInt(submittedData[`kecepatan1-${i}`]),
        kecepatan2: parseInt(submittedData[`kecepatan2-${i}`]),
        kecepatan3: parseInt(submittedData[`kecepatan3-${i}`]),
        kecepatanMax: parseInt(submittedData[`kecepatanMax${i}`]),
        perpindahan1: parseInt(submittedData[`perpindahan1-${i}`]),
        perpindahan2: parseInt(submittedData[`perpindahan2-${i}`]),
        perpindahan3: parseInt(submittedData[`perpindahan3-${i}`]),
        perpindahanMax: parseInt(submittedData[`perpindahanMax${i}`]),
        frekuensi: parseInt(submittedData[`frekuensi${i}`]),
      };
      getaran.push(obj);
    }
  }

  if (parseInt(riwayatTarget.bagianIklimKerja.length) > 0) {
    for (let i = 0; i < parseInt(riwayatTarget.bagianIklimKerja.length); i++) {
      const obj = {
        lokasiPengukuran: submittedData[`lokasiPengukuranIklimKerja${i}`],
        usia: submittedData[`usia${i}`],
        bb: submittedData[`bb${i}`],
        suhuBasah: submittedData[`suhuBasah${i}`],
        suhuKering: submittedData[`suhuKering${i}`],
        suhuBola: submittedData[`suhuBola${i}`],
        isbb: submittedData[`isbb${i}`],
        rh: submittedData[`rh${i}`],
        bebankerja: submittedData[`bebanKerja${i}`],
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
        pengukuran1: parseInt(submittedData[`pengukuranPencahayaan1-${i}`]),
        pengukuran2: parseInt(submittedData[`pengukuranPencahayaan2-${i}`]),
        pengukuran3: parseInt(submittedData[`pengukuranPencahayaan3-${i}`]),
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
