const mongoose = require("mongoose");
const { Schema } = mongoose;

const laporanKecelakaanSchema = new Schema(
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
    tanggalKejadian: {
      type: Date,
      required: true,
    },
    jenisTurunan: {
      type: String,
      required: true,
    },
    alatEvakuasi1: {
      type: String,
      required: true,
      default: "-",
    },
    alatEvakuasi2: {
      type: String,
      required: true,
      default: "-",
    },
    namaKorban: {
      type: String,
      required: true,
    },
    alamatKorban: {
      type: String,
      required: true,
    },
    noTelp: {
      type: String,
      required: true,
    },
    jabatanKorban: {
      type: String,
      required: true,
    },
    nipKorban: {
      type: String,
      required: true,
    },
    tempatKecelakaan: {
      type: String,
      required: true,
    },
    bagaimanaKecelakaanTerjadi: {
      type: String,
      required: true,
    },
    jenisPekerjaanWaktuKecelakaan: {
      type: String,
      required: true,
    },
    saksiYangMelihatKecelakaan: {
      type: String,
      required: true,
    },
    berobatJalan: {
      type: String,
      required: true,
    },
    penyebabKecelakaan: {
      type: String,
      required: true,
    },
    penyakitAkibatKerja: {
      type: String,
      required: true,
    },
    kerugianWaktu: {
      type: String,
      required: true,
    },
    kerugianMaterial: {
      type: String,
      required: true,
    },
    jenisLokasiRawat: {
      type: String,
      required: true,
    },
    namaLokasiRawat: {
      type: String,
      required: true,
    },
    alamatLokasiRawat: {
      type: String,
      required: true,
    },
    namaDokter: {
      type: String,
      required: true,
    },
    alamatDokter: {
      type: String,
      required: true,
    },
    jenisObat: {
      type: String,
      required: true,
    },
    saksi: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

module.exports = mongoose.model("LaporanKecelakaan", laporanKecelakaanSchema);
