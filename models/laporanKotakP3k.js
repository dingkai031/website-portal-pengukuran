const mongoose = require("mongoose");
const { Schema } = mongoose;

const laporanKotaP3kSchema = new Schema(
  {
    validasi: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      status: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    dokumentasi: [
      {
        type: String,
        required: true,
      },
    ],
    jenisTurunan: {
      type: String,
      required: true,
    },
    tanggalInspeksi: {
      type: Date,
      required: true,
    },
    inspektor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    nipInspektor: {
      type: String,
      required: true,
    },
    lokasiP3k: {
      type: String,
      required: true,
    },
    kasaSteril: {
      type: Number,
      required: true,
    },
    perban5Cm: {
      type: Number,
      required: true,
    },
    perban10Cm: {
      type: Number,
      required: true,
    },
    plesterBiasa: {
      type: Number,
      required: true,
    },
    plesterCepat: {
      type: Number,
      required: true,
    },
    kapas: {
      type: Number,
      required: true,
    },
    kainSegitiga: {
      type: Number,
      required: true,
    },
    gunting: {
      type: Number,
      required: true,
    },
    peniti: {
      type: Number,
      required: true,
    },
    sarungTangan: {
      type: Number,
      required: true,
    },
    masker: {
      type: Number,
      required: true,
    },
    pinset: {
      type: Number,
      required: true,
    },
    lampuSenter: {
      type: Number,
      required: true,
    },
    gelasCuciMata: {
      type: Number,
      required: true,
    },
    kantongPlastik: {
      type: Number,
      required: true,
    },
    aquades: {
      type: Number,
      required: true,
    },
    povidone: {
      type: Number,
      required: true,
    },
    alkohol: {
      type: Number,
      required: true,
    },
    bukuPanduan: {
      type: Number,
      required: true,
    },
    pertanyaan1: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan2: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan3: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan4: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan5: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan6: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan7: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan8: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan9: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan10: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan11: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan12: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan13: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan14: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan15: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan16: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan17: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan18: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan19: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
    pertanyaan20: {
      type: String,
      required: true,
      enum: ["ss", "s", "rg", "ts", "sts"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LaporanKotakP3k", laporanKotaP3kSchema);
