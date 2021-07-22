const Tempat = require("../models/tempat");
const Riwayat = require("../models/riwayat");

const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware");

router.get("/", async (req, res) => {
  let { menu } = req.params;
  if (menu === undefined) {
    menu = "inspeksi";
  }
  const tempats = await Tempat.find({});
  res.render("inspeksi/inspeksi", { tempats, menu });
});

router.get("/:menu", async (req, res) => {
  const { menu } = req.params;
  const tempats = await Tempat.find({});
  const riwayats = await Riwayat.find({});
  res.render("inspeksi/riwayat", { tempats, menu, riwayats });
});

router.post("/tambah", async (req, res) => {
  const {
    jumlahTitikIklimKerja,
    jumlahTitikGetaran,
    jumlahTitikKebisingan,
    jumlahTitikPencahayaan,
    jumlahTitikVentilasi,
    namaPengukur,
    lokasiPengukuran,
    dokumentasiPengukuran,
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
  } = req.body;
  const submittedData = req.body;
  const kebisingan = [];
  const getaran = [];
  const iklimKerja = [];
  const pencahayaan = [];
  const ventilasi = [];
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
  if (parseInt(jumlahTitikGetaran) > 1) {
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
  if (parseInt(jumlahTitikIklimKerja) > 1) {
    for (let i = 1; i < parseInt(jumlahTitikIklimKerja) + 1; i++) {
      const obj = {
        usia: parseInt(submittedData[`iklimKerjaUsia${i}`]),
        bb: submittedData[`iklimKerjaBB${i}`],
        lokasiPengukuran: submittedData[`lokasiIklimKerja${i}`],
        suhuBasah: parseInt(submittedData[`iklimKerjaSuhuBasah${i}`]),
        suhuKering: parseInt(submittedData[`iklimKerjaSuhuKering${i}`]),
        suhuBola: submittedData[`iklimKerjaSuhuBola${i}`],
        isbb: submittedData[`iklimKerjaSuhuISBB${i}`],
        rh: submittedData[`iklimKerjaSuhuRH${i}`],
        bebankerja: submittedData[`iklimKerjaBebanKerja${i}`],
      };
      iklimKerja.push(obj);
    }
  }
  if (parseInt(jumlahTitikPencahayaan) > 1) {
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
  if (parseInt(jumlahTitikVentilasi) > 1) {
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
  res.send(simpanRiwayat);
});

module.exports = router;
