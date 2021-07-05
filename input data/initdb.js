const mongoose = require("mongoose");
const User = require("../models/users");
const Alat = require("../models/alat");
const Tempat = require("../models/tempat");

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

const tempTempat = [
  {
    nama: "Bengkel Reparasi Mesin",
    alamat: "Bengkel-Reparasi-Mesin",
    jenis: "maintenanceBengkel"
  },
  {
    nama: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
    alamat: "Bengkel-Permesinan-dan-Sheet-Metal",
    jenis: "maintenanceBengkel"
  },
  {
    nama: "Bengkel Las",
    alamat: "Bengkel-Las",
    jenis: "maintenanceBengkel"
  },
  {
    nama: "Bengkel Konstruksi",
    alamat: "Bengkel-konstruksi",
    jenis: "maintenanceBengkel"
  },
  {
    nama: "Bengkel Non Metal",
    alamat: "Bengkel-Non-Metal",
    jenis: "maintenanceBengkel"
  },
  {
    nama: "Lab Elektronika Daya",
    alamat: "Lab-Elektronika-Daya",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Bahasa",
    alamat: "Lab-Bahasa",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Komputer",
    alamat: "Lab-Komputer",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Elektronika dan Sistem-Kontrol",
    alamat: "Lab-Elektronika-dan-Sistem-Kontrol",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Kimia",
    alamat: "Lab-Kimia",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Fisika",
    alamat: "Lab-Fisika",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Instrumentasi",
    alamat: "Lab-Instrumentasi",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Pengembangan Bisnis Maritim dan Galeri Investasi",
    alamat: "Lab-Pengembangan-Bisnis-Maritim-dan-Galeri-Investasi",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Navigasi dan Komunikasi",
    alamat: "Lab-Navigasi-dan-Komunikasi",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Logistik Maritim",
    alamat: "Lab-Logistik-Maritim",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Reparasi Listrik",
    alamat: "Lab-Reparasi-Listrik",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Mesin Listrik",
    alamat: "Lab-Mesin-Listrik",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Otomasi dan Robotik",
    alamat: "Lab-Otomasi-dan-Robotik",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Plumbing dan Pemodelan Sistem Perpipaan",
    alamat: "Lab Plumbing dan Pemodelan Sistem Perpipaan",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab CNC",
    alamat: "Lab CNC",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Pemadam Kebakaran",
    alamat: "Lab-Pemadam-Kebakaran",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Pneumatik dan Hidrolik",
    alamat: "Lab-Pneumatik-dan-Hidrolik",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Motor Bakar",
    alamat: "Lab-Motor-Bakar",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab CADD",
    alamat: "Lab-CADD",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Uji Bahan",
    alamat: "Lab-Uji-Bahan",
    jenis: "maintenanceLab"
  },
  {
    nama: "Lab Pengolahan Limbah",
    alamat: "Lab-Pengolahan-Limbah",
    jenis: "maintenanceLab"
  }
];

const tempUsers = [
  {
    nomorInduk: 222222222222,
    nama: "dummy 2",
    status: "kabeng"
  },
  {
    nomorInduk: 333333333333,
    nama: "dummy 3",
    status: "Teknisi"
  },
  {
    nomorInduk: 444444444444,
    nama: "dummy 4",
    status: "Mahasiswa"
  }
];

const tempAlat = [
  {
    nama: "Tang Ampere",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Fluke 355 AC DC 2000A",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Reparasi Mesin",
      jumlah: 6
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "Mesin Las LORCH",
    tanggalPeroleh: new Date("2021-01-05"),
    spesifikasi: "Basic Plus",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Reparasi Mesin",
      jumlah: 10
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "CNC Gas & Plasma",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Carbirex CXA 15/20/Th. 1986",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Reparasi Mesin",
      jumlah: 6
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "Tang Ampere 2",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Fluke 355 AC DC 2000A",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
      jumlah: 6
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "Mesin Las LORCH 2",
    tanggalPeroleh: new Date("2021-01-05"),
    spesifikasi: "Basic Plus",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
      jumlah: 10
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "CNC Gas & Plasma 2",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Carbirex CXA 15/20/Th. 1986",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Bengkel Permesinan dan Sheet Metal (Perkakas)",
      jumlah: 6
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "Tang Ampere 3",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Fluke 355 AC DC 2000A",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Lab Elektronika Daya",
      jumlah: 6
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "Mesin Las LORCH 3",
    tanggalPeroleh: new Date("2021-01-05"),
    spesifikasi: "Basic Plus",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Lab Elektronika Daya",
      jumlah: 10
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  },
  {
    nama: "CNC Gas & Plasma 3",
    tanggalPeroleh: new Date("2018-08-10"),
    spesifikasi: "Carbirex CXA 15/20/Th. 1986",
    satuan: "unit",
    lokasi: {
      namaLokasi: "Lab Elektronika Daya",
      jumlah: 6
    },
    kategori: "Alat",
    konsumsiTenaga: {
      minimal: 3,
      maksimal: 8
    },
    kemampuanAlat: {
      minimal: 3,
      maksimal: 8
    }
  }
];

const seedDb = async (model, arrOfObj) => {
  await model.deleteMany({});
  await model
    .insertMany(arrOfObj)
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.log(`ERROR : ${e}`);
    });
};

seedDb(Alat, tempAlat).then(() => {
  mongoose.connection.close();
});
