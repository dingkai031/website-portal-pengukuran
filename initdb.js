const mongoose = require("mongoose");
const User = require("./models/users");
const Alat = require("./models/alat");

mongoose
  .connect("mongodb://localhost:27017/pendidikan", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("koneksi sukses ke Database port 27017 Sukses");
  })
  .catch(e => {
    console.log(`koneksike data base tidak berhasil : ${e}`);
  });

// const tempUsers = [
//   {
//     nomorInduk: 222222222222,
//     nama: "dummy 2",
//     status: "kabeng"
//   },
//   {
//     nomorInduk: 333333333333,
//     nama: "dummy 3",
//     status: "Teknisi"
//   },
//   {
//     nomorInduk: 444444444444,
//     nama: "dummy 4",
//     status: "Mahasiswa"
//   }
// ];

// User.insertMany(tempUsers);

// const tempAlat = [
//   {
//     nama: "dummy",
//     tanggalPeroleh: new Date("2018-08-10"),
//     spesifikasi: "dummy",
//     jumlah: 3,
//     satuan: "unit",
//     lokasi: "ya",
//     kategori: "Alat"
//   },
//   {
//     nama: "dummy2",
//     tanggalPeroleh: new Date("1929-08-25"),
//     spesifikasi: "ACI 45",
//     jumlah: 4,
//     satuan: "unit",
//     lokasi: "hmmm",
//     kategori: "Alat"
//   }
// ];

// Alat.insertMany(tempAlat)
//   .then(p => console.log(p))
//   .catch(e => console.log(`Error ${e}`));
