const mongoose = require("mongoose");

const alatSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    lowercase: true
  },
  tanggalPeroleh: {
    type: Date,
    required: true
  },
  spesifikasi: {
    type: String,
    required: true
  },
  jumlah: {
    type: Number,
    required: true,
    min: 0
  },
  satuan: {
    type: String,
    required: true,
    default: "unit"
  },
  lokasi: {
    type: String,
    required: true
  },
  kategori: {
    type: String,
    required: true,
    default: ""
  }
});

const Alat = mongoose.model("Alat", alatSchema);

module.exports = Alat;
