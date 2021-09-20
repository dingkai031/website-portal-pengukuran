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
    enum: [
      "admin",
      "upik3",
      "kabeng",
      "kalab",
      "teknisi",
      "bauk",
      "dosen",
      "mahasiswa",
    ],
    lowercase: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
