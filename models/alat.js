const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alatSchema = new Schema({
  nama: {
    type: String,
    required: true,
    lowercase: true,
  },
  tanggalPeroleh: {
    type: Date,
    required: true,
  },
  spesifikasi: {
    type: String,
    required: true,
  },
  satuan: {
    type: String,
    required: true,
    default: "unit",
  },
  lokasi: {
    namaLokasi: {
      type: String,
      required: true,
      enum: [
        "Bengkel Reparasi Mesin",
        "Bengkel Permesinan dan Sheet Metal (Perkakas)",
        "Bengkel Las",
        "Bengkel Konstruksi",
        "Bengkel Non Metal",
        "Lab Elektronika Daya",
        "Lab Bahasa",
        "Lab Komputer",
        "Lab Elektronika dan Sistem-Kontrol",
        "Lab Kimia",
        "Lab Fisika",
        "Lab Instrumentasi",
        "Lab Pengembangan Bisnis Maritim dan Galeri Investasi",
        "Lab Navigasi dan-Komunikasi",
        "Lab Logistik Maritim",
        "Lab Reparasi Listrik",
        "Lab Mesin Listrik",
        "Lab Otomasi dan Robotik",
        "Lab-Plumbing dan Pemodelan Sistem Perpipaan",
        "Lab CNC",
        "Lab Pemadam Kebakaran",
        "Lab Pneumatik dan Hidrolik",
        "Lab Motor Bakar",
        "Lab CADD",
        "Lab Uji Bahan",
        "Lab Pengolahan Limbah",
        "Lab Ergonomi",
        "Lab Fluida",
        "Lab PLK",
        "Lab SPPK",
        "Lab Boiler",
        "Studio Gambar",
      ],
    },
    jumlah: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  kategori: {
    type: String,
    required: true,
    enum: ["Alat", "Bahan Habis", "Sarana", "Meubelair", "Lain-lain"],
  },
  konsumsiTenaga: {
    minimal: {
      type: Number,
      required: true,
      min: 0,
    },
    maksimal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  kemampuanAlat: {
    minimal: {
      type: Number,
      required: true,
      min: 0,
    },
    maksimal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
});

module.exports = mongoose.model("Alat", alatSchema);
