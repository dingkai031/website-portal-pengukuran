const express = require("express");
const router = express.Router({ mergeParams: true });

const Alat = require("../models/alat");
const Tempat = require("../models/tempat");
const User = require("../models/user");

const { isLoggedIn } = require("../middleware");

router.get("/", (req, res) => {
  const jenisTempatQuery = false;
  res.render("maintenance/maintenance", { jenisTempatQuery });
});

function convertDate(tanggal) {
  const newDate = tanggal.split("-");
  const isoDate = new Date(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);
  return isoDate;
}

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

router.get("/:jenisTempatQuery", async (req, res) => {
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

router.get("/:jenisTempatQuery/:namaTempat", async (req, res) => {
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

router.get("/:jenisTempatQuery/:namaTempat/data-alat", async (req, res) => {
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
});
router.post("/:jenisTempatQuery/:namaTempat/data-alat", async (req, res) => {
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
  const isoDate = convertDate(tanggal);
  // const newDate = tanggal.split("-");
  // const isoDate = new Date(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);
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
});
router.delete("/:jenisTempatQuery/:namaTempat/data-alat", async (req, res) => {
  const { idAlat, namaAlat } = req.body;
  const { jenisTempatQuery, namaTempat } = req.params;
  const terhapus = await Alat.findByIdAndDelete(idAlat);
  req.flash("delete", `Alat ${namaAlat} berhasil dihapus`);
  res.redirect(`/maintenance/${jenisTempatQuery}/${namaTempat}/data-alat`);
});

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
    res.render("maintenance/maintenanceFormMaintenance", {
      jenisTempatQuery,
      foundedAlat,
      foundedTempat,
      foundTeknisi,
    });
  }
);

router.post(
  "/:jenisTempatQuery/:alamatTempat/data-alat/:idAlat",
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

module.exports = router;
