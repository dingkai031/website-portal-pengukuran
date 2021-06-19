const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nomorInduk: {
    type: Number,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["dosen", "kabeng", "teknisi", "mahasiswa", "tamu"],
    lowercase: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
