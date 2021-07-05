const mongoose = require("mongoose");
const { Schema } = mongoose;

const tempatSchema = new Schema({
  nama: {
    type: String,
    required: true
  },
  alamat: {
    type: String,
    required: true,
    lowercase: true
  },
  jenis: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["maintenancebengkel", "maintenancelab"]
  },
  jumlahTitikPengukuran: {
    ventilasi: {
      type: Number,
      required: true,
      min: 0
    },
    getaran: {
      type: Number,
      required: true,
      min: 0
    },
    penerangan: {
      type: Number,
      required: true,
      min: 0
    },
    kebisingan: {
      type: Number,
      required: true,
      min: 0
    },
    iklimKerja: {
      type: Number,
      required: true,
      min: 0
    }
  }
});

module.exports = mongoose.model("Tempat", tempatSchema);
