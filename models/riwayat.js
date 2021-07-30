const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const riwayatSchema = new Schema(
  {
    namaPengukur: {
      type: String,
      required: true,
    },
    lokasiPengukuran: {
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
    dokumentasi: [String],
    bagianKebisingan: [
      {
        lokasiPengukuran: String,
        intensitasBising1: Number,
        intensitasBising2: Number,
        intensitasBising3: Number,
        ratarataBising: Number,
      },
    ],
    bagianGetaran: [
      {
        lokasiPengukuran: String,
        percepatan1: Number,
        percepatan2: Number,
        percepatan3: Number,
        percepatanMax: Number,
        kecepatan1: Number,
        kecepatan2: Number,
        kecepatan3: Number,
        kecepatanMax: Number,
        perpindahan1: Number,
        perpindahan2: Number,
        perpindahan3: Number,
        perpindahanMax: Number,
        frekuensi: Number,
      },
    ],
    bagianIklimKerja: [
      {
        usia: Number,
        bb: Number,
        lokasiPengukuran: String,
        suhuBasah: Number,
        suhuKering: Number,
        suhuBola: Number,
        isbb: Number,
        rh: Number,
        bebankerja: {
          type: String,
          enum: ["ringan", "sedang", "berat"],
        },
      },
    ],
    bagianPencahayaan: {
      pencahayaanPanjang: Number,
      pencahayaanLebar: Number,
      pencahayaanTinggi: Number,
      pencahayaanJenisPencahayaan: String,
      pencahayaanJumlahPencahayaan: Number,
      pencahayaanJumlahPencahayaanRusak: Number,
      totalRatarata: Number,
      data: [
        {
          lokasiPengukuran: String,
          pengukuran1: Number,
          pengukuran2: Number,
          pengukuran3: Number,
          ratarata: Number,
        },
      ],
    },
    bagianVentilasi: {
      ventilasiRuangan: String,
      ventilasiPanjang: Number,
      ventilasiLebar: Number,
      ventilasiTinggi: Number,
      data: [
        {
          jenis: String,
          panjang: Number,
          lebar: Number,
          velocity: Number,
          jumlahPekerja: Number,
        },
      ],
    },
    rekomendasi: String,
    approve: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Riwayat", riwayatSchema);
