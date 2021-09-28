const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer");

const maintenance = require("../controllers/maintenance");

const storage = maintenance.multerStorage;

const { isLoggedIn } = require("../middleware");
const upload = multer({ storage });

//=========================================================================================================================
router
  .route("/")
  .get(isLoggedIn, maintenance.dashboard)
  .put(
    upload.array("dokumentasiMaintenance"),
    isLoggedIn,
    maintenance.updateRequestMaintenance
  );

router.get(
  "/:jenisTempatQuery",
  isLoggedIn,
  maintenance.tampilanKumpulanTempat
);

router.get(
  "/:jenisTempatQuery/:namaTempat",
  isLoggedIn,
  maintenance.tampilanTempat
);

router
  .route("/:jenisTempatQuery/:namaTempat/data-alat")
  .get(isLoggedIn, maintenance.tampilanDataAlat)
  .post(isLoggedIn, upload.single("fotoAlat"), maintenance.tambahAlat)
  .put(isLoggedIn, maintenance.editAlat)
  .delete(isLoggedIn, maintenance.hapusAlat);

router
  .route("/:jenisTempatQuery/:alamatTempat/data-alat/:idAlat")
  .get(isLoggedIn, maintenance.daftarMaintenanceAlat)
  .post(isLoggedIn, maintenance.tambahDaftarMaintenanceAlat)
  .delete(isLoggedIn, maintenance.hapusDaftarMaintenanceAlat)
  .put(isLoggedIn, maintenance.ubahDaftarMaintenanceAlat);

router.get(
  "/:jenisTempatQuery/:alamatTempat/data-alat/riwayat/:idAlat",
  isLoggedIn,
  maintenance.daftarRiwayatAlat
);

router.put(
  "/:jenisTempatQuery/:alamatTempat/data-alat/riwayat/:idAlat/kepalaTempat/:idPermintaanMaintenance",
  isLoggedIn,
  maintenance.ubahDaftarRiwayatAlat
);

router.get(
  "/:jenisTempatQuery/:alamatTempat/inspeksi",
  isLoggedIn,
  maintenance.halamanInspeksi
);

router.get(
  "/:jenisTempatQuery/:alamatTempat/inspeksi/:jenisInspeksi",
  isLoggedIn,
  maintenance.halamanInspeksiTerpilih
);

router.post(
  "/:jenisTempatQuery/:alamatTempat/inspeksi/:jenisInspeksi",
  isLoggedIn,
  maintenance.tambahInspeksi
);

router.put(
  "/:jenisTempatQuery/:alamatTempat/inspeksi/:jenisInspeksi/:idInspeksi",
  isLoggedIn,
  maintenance.ubahInspeksi
);

module.exports = router;
