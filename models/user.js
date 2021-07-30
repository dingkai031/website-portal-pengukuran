const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nip: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["admin", "upik3", "dosen", "kabeng", "teknisi", "mahasiswa", "tamu"],
    lowercase: true,
  },
  lokasi: {
    type: String,
    required: true,
    enum: [
      "semua",
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
    ],
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
