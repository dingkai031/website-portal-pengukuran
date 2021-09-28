function unique(arr) {
  const newArr = [];
  for (let year of arr) {
    year = parseInt(year);
    if (newArr.indexOf(year) === -1) {
      newArr.push(year);
    }
  }
  return newArr;
}

module.exports.dashboard = async (req, res) => {
  const tempats = await Tempat.find({});
  const laporans = await LaporanKecelakaan.find({});
  const findYears = () => {
    const arrayOfYear = [];
    for (const laporan of laporans) {
      arrayOfYear.push(parseInt(laporan.tanggalKejadian.getFullYear()));
    }
    return unique(arrayOfYear);
  };
  const arrayOfYears = findYears();
  const maxYear = arrayOfYears.reduce((prev, current) =>
    Math.max(prev, current)
  );
  res.render("p2k3/p3k", { laporans, tempats, arrayOfYears, maxYear });
};

module.exports.halamanKuesioner = (req, res) => {
  let foto = [];
  const dataFoto = req.files;
  for (const obj of dataFoto) {
    foto.push(obj.filename);
  }
  const obj = req.body;
  obj.dokumentasi = foto;
  const jenis = obj.jenis;
  const dataForm = JSON.stringify(obj);
  res.render("p2k3/p3kKuesioner", { dataForm, jenis });
};

module.exports.halamanLaporanPendidikan = async (req, res) => {
  const foundTempat = await Tempat.find({});
  res.render("p2k3/p3kLaporKependidikan", { foundTempat });
};

module.exports.submitLaporanPendidikan = async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalKejadian = convertDate(data.tanggalKejadian);
  const { alatEvakuasi1, alatEvakuasi2 } = data;
  delete data.jenis;
  data.alatEvakuasi1 = alatEvakuasi1 || "-";
  data.alatEvakuasi2 = alatEvakuasi2 || "-";
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.saksi = foundUser;
  const laporanKecelakaan = new LaporanKecelakaan(dataMerged);
  await laporanKecelakaan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/pelaporan-kependidikan");
};

module.exports.halamanLaporanMahasiswa = async (req, res) => {
  const foundTempat = await Tempat.find({});
  res.render("p2k3/p3kLaporMahasiswa", { foundTempat });
};

module.exports.submitLaporanMahasiswa = async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalKejadian = convertDate(data.tanggalKejadian);
  const { alatEvakuasi1, alatEvakuasi2 } = data;
  delete data.jenis;
  data.alatEvakuasi1 = alatEvakuasi1 || "-";
  data.alatEvakuasi2 = alatEvakuasi2 || "-";
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.saksi = foundUser;
  const laporanKecelakaan = new LaporanKecelakaan(dataMerged);
  await laporanKecelakaan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/pelaporan-mahasiswa");
};

module.exports.halamanKotakP3kB = (req, res) => {
  res.render("p2k3/p3kKotakP3kB");
};

module.exports.submitKotakP3kB = async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
  delete data.jenis;
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.inspektor = foundUser;
  const laporan = new LaporanKotakP3k(dataMerged);
  await laporan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/kotak-p3k-b");
};

module.exports.halamanKotakP3kC = (req, res) => {
  res.render("p2k3/p3kKotakP3kC");
};

module.exports.submitKotakP3kC = async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
  delete data.jenis;
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.inspektor = foundUser;
  const laporan = new LaporanKotakP3k(dataMerged);
  await laporan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/kotak-p3k-c");
};

module.exports.submitKetersediaanAlatEvakuasi = async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
  delete data.jenis;
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.inspektor = foundUser;
  const laporan = new LaporanAlatEvakuasi(dataMerged);
  await laporan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/kotak-p3k-c");
};

module.exports.submitPemulihan = async (req, res) => {
  const { dataInspeksi } = req.body;
  delete req.body.dataInspeksi;
  const data = JSON.parse(dataInspeksi);
  data.tanggalInspeksi = convertDate(data.tanggalInspeksi);
  delete data.jenis;
  const dataMerged = { ...data, ...req.body };
  const foundUser = await User.findById(req.user._id);
  dataMerged.inspektor = foundUser;
  const laporanPemulihan = new LaporanPemulihanAlat(dataMerged);
  await laporanPemulihan
    .save()
    .then(() => {
      return req.flash("success", `Inspeksi berhasil ditambahkan`);
    })
    .catch((e) => {
      return req.flash("error", `error ${e}`);
    });
  res.redirect("/upik3/formulir-pemulihan");
};
