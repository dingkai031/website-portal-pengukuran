const express = require("express");
const router = express.Router({ mergeParams: true });

const Alat = require("../models/alat");
const Tempat = require("../models/tempat");

const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, (req, res) => {
  const jenisTempatQuery = false;
  res.render("maintenance/maintenance", { jenisTempatQuery });
});

// app.put("/maintenance/data-alat", async (req, res) => {
//   const {
//     name: nameBaru,
//     tanggal: tanggalBaru,
//     spesifikasi: spesifikasiBaru,
//     jumlah: jumlahBaru,
//     lokasi: lokasiBaru,
//     kategori: kategoriBaru,
//     idAlat: idBaru
//   } = req.body;
//   const newDate = tanggalBaru.split("-");
//   const validDate = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
//   const isoDate = new Date(validDate);
//   const newAlatObject = {
//     nama: nameBaru,
//     tanggalPeroleh: isoDate,
//     spesifikasi: spesifikasiBaru,
//     jumlah: jumlahBaru,
//     lokasi: lokasiBaru,
//     kategori: kategoriBaru
//   };
//   const alatUpdated = await Alat.findByIdAndUpdate(idBaru, newAlatObject, {
//     runValidators: true,
//     new: true
//   });
//   res.redirect("/maintenance/data-alat");
// });

router.get("/:jenisTempatQuery", isLoggedIn, async (req, res) => {
  const { jenisTempatQuery } = req.params;
  const kumpulanTempat = await Tempat.find({ jenis: jenisTempatQuery });

  if (kumpulanTempat.length !== 0) {
    res.render("maintenance/maintenanceTempat", {
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
    res.render("maintenance/maintenanceTempatPilihan", {
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
    res.render("maintenance/maintenanceDataAlat", {
      jenisTempatQuery,
      tempatTerpilih,
      kumpulanAlat,
    });
  }
);
router.post(
  "/:jenisTempatQuery/:namaTempat/data-alat",
  isLoggedIn,
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
    const newDate = tanggal.split("-");
    const validDate = `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    const isoDate = new Date(validDate);
    const newAlatObject = {
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

module.exports = router;
