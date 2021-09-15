const mongoose = require("mongoose");
const User = require("../models/user");
const Alat = require("../models/alat");
const Tempat = require("../models/tempat");

mongoose
  .connect("mongodb://localhost:27017/pendidikan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("koneksi sukses ke Database port 27017 Sukses");
  })
  .catch((e) => {
    console.log(`koneksi ke data base tidak berhasil : ${e}`);
  });

const tempTempat = [
  {
    nama: "Bengkel Reparasi Mesin",
    alamat: "Bengkel-Reparasi-Mesin",
    jenis: "maintenanceBengkel",
    jumlahTitikPengukuran: {
      ventilasi: 4,
      getaran: 0,
      penerangan: 17,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
    alamat: "Bengkel-Permesinan-dan-Sheet-Metal",
    jenis: "maintenanceBengkel",
    jumlahTitikPengukuran: {
      ventilasi: 8,
      getaran: 12,
      penerangan: 10,
      kebisingan: 6,
      iklimKerja: 4,
    },
  },
  {
    nama: "Bengkel Las",
    alamat: "Bengkel-Las",
    jenis: "maintenanceBengkel",
    jumlahTitikPengukuran: {
      ventilasi: 5,
      getaran: 2,
      penerangan: 12,
      kebisingan: 5,
      iklimKerja: 3,
    },
  },
  {
    nama: "Bengkel Konstruksi",
    alamat: "Bengkel-konstruksi",
    jenis: "maintenanceBengkel",
    jumlahTitikPengukuran: {
      ventilasi: 8,
      getaran: 4,
      penerangan: 9,
      kebisingan: 4,
      iklimKerja: 2,
    },
  },
  {
    nama: "Bengkel Non Metal",
    alamat: "Bengkel-Non-Metal",
    jenis: "maintenanceBengkel",
    jumlahTitikPengukuran: {
      ventilasi: 7,
      getaran: 3,
      penerangan: 9,
      kebisingan: 3,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Elektronika Daya",
    alamat: "Lab-Elektronika-Daya",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 5,
      getaran: 0,
      penerangan: 12,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Bahasa",
    alamat: "Lab-Bahasa",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 6,
      getaran: 0,
      penerangan: 15,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Komputer",
    alamat: "Lab-Komputer",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 3,
      getaran: 0,
      penerangan: 12,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Elektronika dan Sistem Kontrol",
    alamat: "Lab-Elektronika-dan-Sistem-Kontrol",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 7,
      getaran: 0,
      penerangan: 18,
      kebisingan: 0,
      iklimKerja: 2,
    },
  },
  {
    nama: "Lab Kimia",
    alamat: "Lab-Kimia",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 2,
      getaran: 0,
      penerangan: 12,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Fisika",
    alamat: "Lab-Fisika",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab Instrumentasi",
    alamat: "Lab-Instrumentasi",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab Pengembangan Bisnis Maritim dan Galeri Investasi",
    alamat: "Lab-Pengembangan-Bisnis-Maritim-dan-Galeri-Investasi",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab Navigasi dan Komunikasi",
    alamat: "Lab-Navigasi-dan-Komunikasi",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab Logistik Maritim",
    alamat: "Lab-Logistik-Maritim",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab Reparasi Listrik",
    alamat: "Lab-Reparasi-Listrik",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab Mesin Listrik",
    alamat: "Lab-Mesin-Listrik",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 3,
      getaran: 0,
      penerangan: 20,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Otomasi dan Robotik",
    alamat: "Lab-Otomasi-dan-Robotik",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 4,
      getaran: 0,
      penerangan: 17,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Plumbing dan Pemodelan Sistem Perpipaan",
    alamat: "Lab Plumbing dan Pemodelan Sistem Perpipaan",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 9,
      getaran: 0,
      penerangan: 18,
      kebisingan: 0,
      iklimKerja: 3,
    },
  },
  {
    nama: "Lab CNC",
    alamat: "Lab CNC",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 7,
      getaran: 0,
      penerangan: 21,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Pemadam Kebakaran",
    alamat: "Lab-Pemadam-Kebakaran",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab Pneumatik dan Hidrolik",
    alamat: "Lab-Pneumatik-dan-Hidrolik",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 2,
      getaran: 0,
      penerangan: 12,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Motor Bakar",
    alamat: "Lab-Motor-Bakar",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 0,
      getaran: 0,
      penerangan: 0,
      kebisingan: 0,
      iklimKerja: 0,
    },
  },
  {
    nama: "Lab CADD",
    alamat: "Lab-CADD",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 2,
      getaran: 0,
      penerangan: 14,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Uji Bahan",
    alamat: "Lab-Uji-Bahan",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 2,
      getaran: 0,
      penerangan: 13,
      kebisingan: 0,
      iklimKerja: 2,
    },
  },
  {
    nama: "Lab Pengolahan Limbah",
    alamat: "Lab-Pengolahan-Limbah",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 5,
      getaran: 0,
      penerangan: 21,
      kebisingan: 0,
      iklimKerja: 2,
    },
  },
  {
    nama: "Lab Ergonomi",
    alamat: "Lab-Ergonomi",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 3,
      getaran: 0,
      penerangan: 12,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Fluida",
    alamat: "Lab-Fluida",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 5,
      getaran: 0,
      penerangan: 18,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab PLK",
    alamat: "Lab-PLK",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 3,
      getaran: 0,
      penerangan: 18,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab SPPK",
    alamat: "Lab-SPPK",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 3,
      getaran: 0,
      penerangan: 12,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Lab Boiler",
    alamat: "Lab-Boiler",
    jenis: "maintenanceLab",
    jumlahTitikPengukuran: {
      ventilasi: 7,
      getaran: 0,
      penerangan: 12,
      kebisingan: 0,
      iklimKerja: 1,
    },
  },
  {
    nama: "Studio Gambar",
    alamat: "Studio-Gambar",
    jenis: "maintenanceStudio",
    jumlahTitikPengukuran: {
      ventilasi: 12,
      getaran: 0,
      penerangan: 33,
      kebisingan: 0,
      iklimKerja: 4,
    },
  },
];

const tempUser = [
  {
    nama: "dummy kabeng",
    nip: "1111111111111",
    email: "dummyKabeng@ppns.ac.id",
    username: "dummyKabeng@ppns.ac.id",
    status: "kabeng",
    lokasi: "Bengkel Reparasi Mesin",
  },
  {
    nama: "dummy kabeng2",
    nip: "1111111111112",
    email: "dummyKaben2@ppns.ac.id",
    username: "dummyKaben2@ppns.ac.id",
    status: "kabeng",
    lokasi: "Bengkel Las",
  },
  {
    nama: "dummy kalab",
    nip: "1111111111114",
    email: "dummyKalab@ppns.ac.id",
    username: "dummyKalab@ppns.ac.id",
    status: "kalab",
    lokasi: "Lab Bahasa",
  },
  {
    nama: "dummy kalab2",
    nip: "1111111111115",
    email: "dummyKalab2@ppns.ac.id",
    username: "dummyKalab2@ppns.ac.id",
    status: "kalab",
    lokasi: "Lab Komputer",
  },
  {
    nama: "dummy admin",
    nip: "0000000000000",
    email: "dummyAdmin@ppns.ac.id",
    username: "dummyAdmin@ppns.ac.id",
    status: "admin",
    lokasi: "semua",
  },
  {
    nama: "dummy teknisi",
    nip: "0000000000001",
    email: "dummyTeknisi@ppns.ac.id",
    username: "dummyTeknisi@ppns.ac.id",
    status: "teknisi",
    lokasi: "Bengkel Reparasi Mesin",
  },
  {
    nama: "dummy2 teknisi",
    nip: "0000000000002",
    email: "dummyTeknisi2@ppns.ac.id",
    username: "dummyTeknisi2@ppns.ac.id",
    status: "teknisi",
    lokasi: "Bengkel Reparasi Mesin",
  },
  {
    nama: "dummy3 teknisi",
    nip: "0000000000003",
    email: "dummyTeknisi3@ppns.ac.id",
    username: "dummyTeknisi3@ppns.ac.id",
    status: "teknisi",
    lokasi: "Bengkel Reparasi Mesin",
  },
  {
    nama: "dummy4 teknisi",
    nip: "0000000000004",
    email: "dummyTeknisi4@ppns.ac.id",
    username: "dummyTeknisi4@ppns.ac.id",
    status: "teknisi",
    lokasi: "Bengkel Reparasi Mesin",
  },
  {
    nama: "dummy5 teknisi",
    nip: "0000000000005",
    email: "dummyTeknisi5@ppns.ac.id",
    username: "dummyTeknisi5@ppns.ac.id",
    status: "teknisi",
    lokasi: "Bengkel Las",
  },
  {
    nama: "dummy6 teknisi",
    nip: "0000000000006",
    email: "dummyTeknisi6@ppns.ac.id",
    username: "dummyTeknisi6@ppns.ac.id",
    status: "teknisi",
    lokasi: "Bengkel Las",
  },
  {
    nama: "dummy upik3",
    nip: "0000000000007",
    email: "dummyUpik3@ppns.ac.id",
    username: "dummyUpik3@ppns.ac.id",
    status: "upik3",
    lokasi: "semua",
  },
  {
    nama: "dummy bauk",
    nip: "0000000000007",
    email: "dummyBauk@ppns.ac.id",
    username: "dummyBauk@ppns.ac.id",
    status: "bauk",
    lokasi: "semua",
  },
  {
    nama: "dummy dosen",
    nip: "8888888888881",
    email: "dummyDosen@ppns.ac.id",
    username: "dummyDosen@ppns.ac.id",
    status: "dosen",
    lokasi: "semua",
  },
  {
    nama: "dummy mahasiswa",
    nip: "77777777771",
    email: "dummyMahasiswa@ppns.ac.id",
    username: "dummyMahasiswa@ppns.ac.id",
    status: "mahasiswa",
    lokasi: "semua",
  },
];
const tempAlat = [
  {
    nama: "Tang Ampere",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Fluke 355 AC DC 2000A",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Reparasi Mesin",
      jumlah: 6,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "Mesin Las LORCH",
    tanggalPeroleh: new Date("2021-01-05"),
    spesifikasi: "Basic Plus",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Reparasi Mesin",
      jumlah: 10,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "CNC Gas & Plasma",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Carbirex CXA 15/20/Th. 1986",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Reparasi Mesin",
      jumlah: 6,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "Tang Ampere 2",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Fluke 355 AC DC 2000A",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
      jumlah: 6,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "Mesin Las LORCH 2",
    tanggalPeroleh: new Date("2021-01-05"),
    spesifikasi: "Basic Plus",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
      jumlah: 10,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "CNC Gas & Plasma 2",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Carbirex CXA 15/20/Th. 1986",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
      jumlah: 6,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "Tang Ampere 3",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Fluke 355 AC DC 2000A",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Lab Elektronika Daya",
      jumlah: 6,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "Mesin Las LORCH 3",
    tanggalPeroleh: new Date("2021-01-05"),
    spesifikasi: "Basic Plus",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Lab Elektronika Daya",
      jumlah: 10,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
  {
    nama: "CNC Gas & Plasma 3",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Carbirex CXA 15/20/Th. 1986",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Lab Elektronika Daya",
      jumlah: 6,
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8,
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8,
    },
  },
];

const seedDb = async (model, arrOfObj) => {
  await model.deleteMany({});
  await model
    .insertMany(arrOfObj)
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log(`ERROR : ${e}`);
    });
};

const newUserOne = async function (obj, pass) {
  registeredUser = await User.register(obj, pass);
  console.log(registeredUser);
};

const newUser = async function (model, arrObj, pass) {
  const terhapus = await model.deleteMany({});
  for (obj of arrObj) {
    const registeredUser = await User.register(obj, pass);
    console.log(registeredUser);
  }
};

// seedDb(Tempat, tempTempat).then(() => {
//   mongoose.connection.close();
// });

// newUser(User, tempUser, "111111111111").then(() => {
//   mongoose.connection.close();
// });

newUserOne(
  {
    nama: "dummy bauk",
    nip: "867213868273",
    email: "dummyBauk@ppns.ac.id",
    username: "dummyBauk@ppns.ac.id",
    status: "bauk",
    lokasi: "semua",
  },
  "111111111111"
)
  .then(() => {
    mongoose.connection.close();
  })
  .catch((e) => {
    console.log(`errror : ${e}`);
  });
