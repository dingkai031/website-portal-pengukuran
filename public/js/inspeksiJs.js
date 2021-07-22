$("#dokumentasiPengukuran").fileinput({
  language: "id",
  theme: "fas",
});

$(document).ready(function () {
  $(".select2").select2({
    placeholder: "Silahkan pilih",
    theme: "bootstrap4",
    width: "100%",
  });
  $("#table_id").DataTable({
    responsive: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Indonesian.json",
    },
  });
});

$("#lokasiPengukuran").on("select2:select", function (e) {
  const targetValue = e.target.value;
  $(".denah").attr("src", `/img/denah/${targetValue}.jpg`);
  $(".keterangan").attr("src", "/img/denah/keterangan.jpg");
  const indexTerpilih = parsed.findIndex((x) => x.nama === targetValue);
  const jumlahTitikIklimKerja =
    parsed[indexTerpilih].jumlahTitikPengukuran.iklimKerja;

  const jumlahTitikGetaran =
    parsed[indexTerpilih].jumlahTitikPengukuran.getaran;

  const jumlahTitikKebisingan =
    parsed[indexTerpilih].jumlahTitikPengukuran.kebisingan;

  const jumlahTitikPencahayaan =
    parsed[indexTerpilih].jumlahTitikPengukuran.penerangan;

  const jumlahTitikVentilasi =
    parsed[indexTerpilih].jumlahTitikPengukuran.ventilasi;

  const wadahIklimKerja = document.querySelector("#wadahFormIklimKerja");
  const wadahGetaran = document.querySelector("#wadahFormGetaran");
  const wadahKebisingan = document.querySelector("#wadahFormKebisingan");
  const wadahPencahayaan = document.querySelector("#wadahFormPencahayaan");
  const wadahVentilasi = document.querySelector("#wadahFormVentilasi");
  wadahIklimKerja.innerHTML = "";
  wadahGetaran.innerHTML = "";
  wadahKebisingan.innerHTML = "";
  wadahVentilasi.innerHTML = "";

  const wadahJumlahTitikGetaran = document.querySelector("#jumlahTitikGetaran");
  wadahJumlahTitikGetaran.value = 0;
  wadahJumlahTitikGetaran.value = jumlahTitikGetaran;

  const wadahJumlahTitikIklimKerja = document.querySelector(
    "#jumlahTitikIklimKerja"
  );
  wadahJumlahTitikIklimKerja.value = 0;
  wadahJumlahTitikIklimKerja.value = jumlahTitikIklimKerja;

  const wadahJumlahTitikKebisingan = document.querySelector(
    "#jumlahTitikKebisingan"
  );
  wadahJumlahTitikKebisingan.value = 0;
  wadahJumlahTitikKebisingan.value = jumlahTitikKebisingan;

  const wadahJumlahTitikPencahayaan = document.querySelector(
    "#jumlahTitikPencahayaan"
  );
  wadahJumlahTitikPencahayaan.value = 0;
  wadahJumlahTitikPencahayaan.value = jumlahTitikPencahayaan;

  const wadahJumlahTitikVentilasi = document.querySelector(
    "#jumlahTitikVentilasi"
  );
  wadahJumlahTitikVentilasi.value = 0;
  wadahJumlahTitikVentilasi.value = jumlahTitikVentilasi;

  const arrayOfElemenYangBukanRatarata = document.querySelectorAll(
    "#wadahFormPencahayaan>:not(#tableRowRatarata)"
  );
  if (arrayOfElemenYangBukanRatarata.length != 0) {
    for (const elemenYangBukanRatarata of arrayOfElemenYangBukanRatarata) {
      elemenYangBukanRatarata.remove();
    }
    const wadahTotalRatarata = document.querySelector("#totalratarata");
    wadahTotalRatarata.value = 0;
  }
  //==================bagian Iklim kerja=======================
  for (let i = 1; i < jumlahTitikIklimKerja + 1; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("text-center");
    //======================usia=========================
    const tdUsai = document.createElement("td");
    const inputUsia = document.createElement("input");
    inputUsia.setAttribute("type", "number");
    inputUsia.setAttribute("name", `iklimKerjaUsia${i}`);
    inputUsia.setAttribute("value", 0);
    inputUsia.classList.add("form-control");
    tdUsai.appendChild(inputUsia);
    tr.appendChild(tdUsai);
    //------------------------------------------------
    //======================BB=========================
    const tdBB = document.createElement("td");
    const inputBB = document.createElement("input");
    inputBB.setAttribute("type", "number");
    inputBB.setAttribute("name", `iklimKerjaBB${i}`);
    inputBB.setAttribute("value", 0);
    inputBB.classList.add("form-control");
    tdBB.appendChild(inputBB);
    tr.appendChild(tdBB);
    //------------------------------------------------
    //===================Titik ke======================
    const tdLokasiTitik = document.createElement("td");
    const inputTitik = document.createElement("input");
    inputTitik.setAttribute("type", "text");
    inputTitik.setAttribute("value", `titik ke-${i}`);
    inputTitik.setAttribute("name", `lokasiIklimKerja${i}`);
    inputTitik.setAttribute("readonly", "");

    inputTitik.classList.add("form-control");
    tdLokasiTitik.appendChild(inputTitik);
    tr.appendChild(tdLokasiTitik);
    //--------------------------------------------------
    //=================iklim kerja suhu basah======================
    const tdSuhuBasah = document.createElement("td");
    const inputSuhuBasah = document.createElement("input");
    inputSuhuBasah.setAttribute("type", "number");
    inputSuhuBasah.setAttribute("value", 0);
    inputSuhuBasah.setAttribute("name", `iklimKerjaSuhuBasah${i}`);
    inputSuhuBasah.setAttribute("id", `iklimKerjaSuhuBasah${i}`);

    inputSuhuBasah.classList.add("form-control", "suhu-basah");
    tdSuhuBasah.appendChild(inputSuhuBasah);
    tr.appendChild(tdSuhuBasah);
    //-------------------------------------------------------------
    //==========================iklik kerja suhu kering=====================
    const tdSuhuKering = document.createElement("td");
    const inputSuhuKering = document.createElement("input");
    inputSuhuKering.setAttribute("type", "number");
    inputSuhuKering.setAttribute("value", 0);
    inputSuhuKering.setAttribute("name", `iklimKerjaSuhuKering${i}`);
    inputSuhuKering.setAttribute("id", `iklimKerjaSuhuKering${i}`);

    inputSuhuKering.classList.add("form-control", "suhu-kering");
    tdSuhuKering.appendChild(inputSuhuKering);
    tr.appendChild(tdSuhuKering);
    //-------------------------------------------------------------
    //=============================suhu bola======================
    const tdSuhuBola = document.createElement("td");
    const inputSuhuBola = document.createElement("input");
    inputSuhuBola.setAttribute("type", "number");
    inputSuhuBola.setAttribute("value", 0);
    inputSuhuBola.setAttribute("name", `iklimKerjaSuhuBola${i}`);
    inputSuhuBola.setAttribute("id", `iklimKerjaSuhuBola${i}`);

    inputSuhuBola.classList.add("form-control", "suhu-bola");
    tdSuhuBola.appendChild(inputSuhuBola);
    tr.appendChild(tdSuhuBola);
    //----------------------------------------------------------
    //===================ISBB====================================
    const tdISBB = document.createElement("td");
    const inputISBB = document.createElement("input");
    inputISBB.setAttribute("type", "number");
    inputISBB.setAttribute("value", 0);
    inputISBB.setAttribute("name", `iklimKerjaISBB${i}`);
    inputISBB.setAttribute("id", `iklimKerjaISBB${i}`);

    inputISBB.setAttribute("readonly", "");
    inputISBB.classList.add("form-control", "isbb");
    tdISBB.appendChild(inputISBB);
    tr.appendChild(tdISBB);
    //----------------------------------------------------------
    //========================RH====================================
    const tdRH = document.createElement("td");
    const inputRH = document.createElement("input");
    inputRH.setAttribute("type", "number");
    inputRH.setAttribute("value", 0);
    inputRH.setAttribute("name", `iklimKerjaRH${i}`);
    inputRH.setAttribute("id", `iklimKerjaRH${i}`);

    inputRH.setAttribute("readonly", "");
    inputRH.classList.add("form-control", "rh");
    tdRH.appendChild(inputRH);
    tr.appendChild(tdRH);
    //------------------------------------------------------------
    //======================Beban Kerja=========================
    const tdBebanKerja = document.createElement("td");
    const inputBebanKerja = document.createElement("input");
    inputBebanKerja.setAttribute("type", "number");
    inputBebanKerja.setAttribute("name", `iklimKerjaBebanKerja${i}`);
    inputBebanKerja.setAttribute("value", 0);
    inputBebanKerja.classList.add("form-control");
    tdBebanKerja.appendChild(inputBebanKerja);
    tr.appendChild(tdBebanKerja);
    //------------------------------------------------
    //====================masukkan seluruh elemen yang dibuat ke tr===========
    wadahIklimKerja.appendChild(tr);
    //----------------------------------------------------------------------
  }
  const wadahInputSuhuBasah = document.querySelectorAll(".suhu-basah");
  const wadahInputSuhuKering = document.querySelectorAll(".suhu-kering");
  const wadahInputSuhuBola = document.querySelectorAll(".suhu-bola");
  const wadahInputISBB = document.querySelectorAll(".isbb");
  const wadahInputRH = document.querySelectorAll(".rh");

  for (let i = 0; i < wadahInputSuhuBasah.length; i++) {
    wadahInputSuhuBasah[i].addEventListener("change", () => {
      wadahInputISBB[i].value = (
        wadahInputSuhuBasah[i].value * 0.7 +
        wadahInputSuhuBola[i].value * 0.3
      ).toFixed(2);
      wadahInputRH[i].value =
        wadahInputSuhuKering[i].value - wadahInputSuhuBasah[i].value;
    });
    wadahInputSuhuBola[i].addEventListener("change", () => {
      wadahInputISBB[i].value = (
        wadahInputSuhuBasah[i].value * 0.7 +
        wadahInputSuhuBola[i].value * 0.3
      ).toFixed(2);
    });
    wadahInputSuhuKering[i].addEventListener("change", () => {
      wadahInputRH[i].value =
        wadahInputSuhuKering[i].value - wadahInputSuhuBasah[i].value;
    });
  }
  //==================End Iklim kerja=======================
  //==================bagian Getaran=======================
  for (let i = 1; i < jumlahTitikGetaran + 1; i++) {
    const tr1 = document.createElement("tr");
    const tr2 = document.createElement("tr");
    const tr3 = document.createElement("tr");
    const tr4 = document.createElement("tr");
    tr1.classList.add("text-center");
    tr2.classList.add("text-center");
    tr3.classList.add("text-center");
    tr4.classList.add("text-center");
    //===================TR 1======================
    const no = document.createElement("td");
    no.setAttribute("rowspan", "4");
    no.classList.add("align-middle");
    no.innerText = i;
    tr1.appendChild(no);

    const tdLokasiTitik = document.createElement("td");
    const inputTitik = document.createElement("input");
    inputTitik.setAttribute("type", "text");
    inputTitik.setAttribute("value", `titik ke-${i}`);
    inputTitik.setAttribute("name", `lokasiGetaran${i}`);
    inputTitik.setAttribute("readonly", "");

    inputTitik.classList.add("form-control");
    tdLokasiTitik.setAttribute("rowspan", "3");
    tdLokasiTitik.classList.add("align-middle");
    tdLokasiTitik.appendChild(inputTitik);
    tr1.appendChild(tdLokasiTitik);

    const tdPercepatan1 = document.createElement("td");
    const inputPercepatan1 = document.createElement("input");
    inputPercepatan1.setAttribute("type", "number");
    inputPercepatan1.setAttribute("value", 0);
    inputPercepatan1.setAttribute("name", `getaranPercepatan${i}-1`);
    inputPercepatan1.setAttribute("id", `getaranPercepatan${i}-1`);

    inputPercepatan1.classList.add("form-control", `percepatan${i}`);
    tdPercepatan1.appendChild(inputPercepatan1);
    tr1.appendChild(tdPercepatan1);

    const tdKecepatan1 = document.createElement("td");
    const inputKecepatan1 = document.createElement("input");
    inputKecepatan1.setAttribute("type", "number");
    inputKecepatan1.setAttribute("value", 0);
    inputKecepatan1.setAttribute("name", `getaranKecepatan${i}-1`);
    inputKecepatan1.setAttribute("id", `getaranKecepatan${i}-1`);

    inputKecepatan1.classList.add("form-control", `kecepatan${i}`);
    tdKecepatan1.appendChild(inputKecepatan1);
    tr1.appendChild(tdKecepatan1);

    const tdPerpindahan1 = document.createElement("td");
    const inputPerpinhadan1 = document.createElement("input");
    inputPerpinhadan1.setAttribute("type", "number");
    inputPerpinhadan1.setAttribute("value", 0);
    inputPerpinhadan1.setAttribute("name", `getaranPerpindahan${i}-1`);
    inputPerpinhadan1.setAttribute("id", `getaranPerpindahan${i}-1`);

    inputPerpinhadan1.classList.add("form-control", `perpindahan${i}`);
    tdPerpindahan1.appendChild(inputPerpinhadan1);
    tr1.appendChild(tdPerpindahan1);

    const tdFrekuensi = document.createElement("td");
    const inputFrekuensi = document.createElement("input");
    inputFrekuensi.setAttribute("type", "number");
    inputFrekuensi.setAttribute("value", 0);
    inputFrekuensi.setAttribute("name", `getaranFrekuensi${i}`);
    inputFrekuensi.setAttribute("id", `getaranFrekuensi${i}`);

    inputFrekuensi.classList.add("form-control");
    tdFrekuensi.appendChild(inputFrekuensi);
    tdFrekuensi.classList.add("align-middle");
    tdFrekuensi.setAttribute("rowspan", "4");
    tr1.appendChild(tdFrekuensi);

    const tdPercepatan2 = document.createElement("td");
    const inputPercepatan2 = document.createElement("input");
    inputPercepatan2.setAttribute("type", "number");
    inputPercepatan2.setAttribute("value", 0);
    inputPercepatan2.setAttribute("name", `getaranPercepatan${i}-2`);
    inputPercepatan2.setAttribute("id", `getaranPercepatan${i}-2`);
    inputPercepatan2.classList.add("form-control", `percepatan${i}`);
    tdPercepatan2.appendChild(inputPercepatan2);
    tr2.appendChild(tdPercepatan2);

    const tdKecepatan2 = document.createElement("td");
    const inputKecepatan2 = document.createElement("input");
    inputKecepatan2.setAttribute("type", "number");
    inputKecepatan2.setAttribute("value", 0);
    inputKecepatan2.setAttribute("name", `getaranKecepatan${i}-2`);
    inputKecepatan2.setAttribute("id", `getaranKecepatan${i}-2`);
    inputKecepatan2.classList.add("form-control", `kecepatan${i}`);
    tdKecepatan2.appendChild(inputKecepatan2);
    tr2.appendChild(tdKecepatan2);

    const tdPerpindahan2 = document.createElement("td");
    const inputPerpinhadan2 = document.createElement("input");
    inputPerpinhadan2.setAttribute("type", "number");
    inputPerpinhadan2.setAttribute("value", 0);
    inputPerpinhadan2.setAttribute("name", `getaranPerpindahan${i}-2`);
    inputPerpinhadan2.setAttribute("id", `getaranPerpindahan${i}-2`);
    inputPerpinhadan2.classList.add("form-control", `perpindahan${i}`);
    tdPerpindahan2.appendChild(inputPerpinhadan2);
    tr2.appendChild(tdPerpindahan2);

    const tdPercepatan3 = document.createElement("td");
    const inputPercepatan3 = document.createElement("input");
    inputPercepatan3.setAttribute("type", "number");
    inputPercepatan3.setAttribute("value", 0);
    inputPercepatan3.setAttribute("name", `getaranPercepatan${i}-3`);
    inputPercepatan3.setAttribute("id", `getaranPercepatan${i}-3`);
    inputPercepatan3.classList.add("form-control", `percepatan${i}`);
    tdPercepatan3.appendChild(inputPercepatan3);
    tr3.appendChild(tdPercepatan3);

    const tdKecepatan3 = document.createElement("td");
    const inputKecepatan3 = document.createElement("input");
    inputKecepatan3.setAttribute("type", "number");
    inputKecepatan3.setAttribute("value", 0);
    inputKecepatan3.setAttribute("name", `getaranKecepatan${i}-3`);
    inputKecepatan3.setAttribute("id", `getaranKecepatan${i}-3`);
    inputKecepatan3.classList.add("form-control", `kecepatan${i}`);
    tdKecepatan3.appendChild(inputKecepatan3);
    tr3.appendChild(tdKecepatan3);

    const tdPerpindahan3 = document.createElement("td");
    const inputPerpinhadan3 = document.createElement("input");
    inputPerpinhadan3.setAttribute("type", "number");
    inputPerpinhadan3.setAttribute("value", 0);
    inputPerpinhadan3.setAttribute("name", `getaranPerpindahan${i}-3`);
    inputPerpinhadan3.setAttribute("id", `getaranPerpindahan${i}-3`);
    inputPerpinhadan3.classList.add("form-control", `perpindahan${i}`);
    tdPerpindahan3.appendChild(inputPerpinhadan3);
    tr3.appendChild(tdPerpindahan3);

    const maxTd = document.createElement("td");
    const maxP = document.createElement("p");
    maxP.classList.add("form-control");
    maxP.innerText = "MAX";
    maxTd.appendChild(maxP);
    tr4.appendChild(maxTd);

    const tdPercepatanMax = document.createElement("td");
    const inputPercepatanMax = document.createElement("input");
    inputPercepatanMax.setAttribute("type", "number");
    inputPercepatanMax.setAttribute("value", 0);
    inputPercepatanMax.setAttribute("name", `getaranPercepatanMax${i}`);
    inputPercepatanMax.setAttribute("id", `getaranPercepatanMax${i}`);
    inputPercepatanMax.setAttribute("readonly", "");
    inputPercepatanMax.classList.add("form-control");
    tdPercepatanMax.appendChild(inputPercepatanMax);
    tr4.appendChild(tdPercepatanMax);

    const tdKecepatanMax = document.createElement("td");
    const inputKecepatanMax = document.createElement("input");
    inputKecepatanMax.setAttribute("type", "number");
    inputKecepatanMax.setAttribute("value", 0);
    inputKecepatanMax.setAttribute("name", `getaranKecepatanMax${i}`);
    inputKecepatanMax.setAttribute("id", `getaranKecepatanMax${i}`);
    inputKecepatanMax.setAttribute("readonly", "");
    inputKecepatanMax.classList.add("form-control");
    tdKecepatanMax.appendChild(inputKecepatanMax);
    tr4.appendChild(tdKecepatanMax);

    const tdPerpindahanMax = document.createElement("td");
    const inputPerpinhadanMax = document.createElement("input");
    inputPerpinhadanMax.setAttribute("type", "number");
    inputPerpinhadanMax.setAttribute("value", 0);
    inputPerpinhadanMax.setAttribute("name", `getaranPerpindahanMax${i}`);
    inputPerpinhadanMax.setAttribute("id", `getaranPerpindahanMax${i}`);
    inputPerpinhadanMax.setAttribute("readonly", "");
    inputPerpinhadanMax.classList.add("form-control");
    tdPerpindahanMax.appendChild(inputPerpinhadanMax);
    tr4.appendChild(tdPerpindahanMax);
    //--------------------------------------------------
    wadahGetaran.appendChild(tr1);
    wadahGetaran.appendChild(tr2);
    wadahGetaran.appendChild(tr3);
    wadahGetaran.appendChild(tr4);
    // ========================logikaGetaran======================

    for (let j = 1; j < 4; j++) {
      // =========================LogikaPercepatan========================
      const percepatan = document.querySelector(`#getaranPercepatan${i}-${j}`);
      percepatan.addEventListener("change", () => {
        const arrOfPercepatans = document.querySelectorAll(`.percepatan${i}`);
        const arrOfPercepatanValue = [];
        for (const arrOfPercepatan of arrOfPercepatans) {
          arrOfPercepatanValue.push(arrOfPercepatan.value);
        }
        const maksimalPercepatan = Math.max(...arrOfPercepatanValue);
        const wadahPercepatanMax = document.querySelector(
          `#getaranPercepatanMax${i}`
        );
        wadahPercepatanMax.value = maksimalPercepatan;
      });
      // =========================LogikaKecepatann========================
      const kecepatan = document.querySelector(`#getaranKecepatan${i}-${j}`);
      kecepatan.addEventListener("change", () => {
        const arrOfKecepatans = document.querySelectorAll(`.kecepatan${i}`);
        const arrOfKecepatanValue = [];
        for (const arrOfKecepatan of arrOfKecepatans) {
          arrOfKecepatanValue.push(arrOfKecepatan.value);
        }
        const maksimalKecepatan = Math.max(...arrOfKecepatanValue);
        const wadahKecepatanMax = document.querySelector(
          `#getaranKecepatanMax${i}`
        );
        wadahKecepatanMax.value = maksimalKecepatan;
      });
      // =========================LogikaPerpindahan========================
      const perpindahan = document.querySelector(
        `#getaranPerpindahan${i}-${j}`
      );
      perpindahan.addEventListener("change", () => {
        const arrOfPerpindahans = document.querySelectorAll(`.perpindahan${i}`);
        const arrOfPerpindahanValue = [];
        for (const arrOfPerpindahan of arrOfPerpindahans) {
          arrOfPerpindahanValue.push(arrOfPerpindahan.value);
        }
        const maksimalPerpindahan = Math.max(...arrOfPerpindahanValue);
        const wadahPerpindahanMax = document.querySelector(
          `#getaranPerpindahanMax${i}`
        );
        wadahPerpindahanMax.value = maksimalPerpindahan;
      });
    }
  }
  //==================End Getaran=======================
  //==================bagian kebisingan=======================
  for (let i = 1; i < jumlahTitikKebisingan + 1; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("text-center");
    // --------------------------------------------------------
    const tdLokasiTitik = document.createElement("td");
    const inputTitik = document.createElement("input");
    inputTitik.setAttribute("type", "text");
    inputTitik.setAttribute("value", `titik ke-${i}`);
    inputTitik.setAttribute("name", `lokasiKebisingan${i}`);
    inputTitik.setAttribute("readonly", "");
    inputTitik.classList.add("form-control");
    tdLokasiTitik.classList.add("align-middle");
    tdLokasiTitik.appendChild(inputTitik);
    tr.appendChild(tdLokasiTitik);
    // -----------------------------------------------------
    for (let j = 1; j < 4; j++) {
      const tdIntensitasBising = document.createElement("td");
      const inputIntensitasBising = document.createElement("input");
      inputIntensitasBising.setAttribute("type", "number");
      inputIntensitasBising.setAttribute("value", 0);
      inputIntensitasBising.setAttribute(
        "name",
        `kebisinganIntensitasKebisingan${i}-${j}`
      );
      inputIntensitasBising.setAttribute(
        "id",
        `kebisinganIntensitasKebisingan${i}-${j}`
      );
      inputIntensitasBising.classList.add(
        "form-control",
        `kebisinganIntensitasKebisingan${i}`
      );
      tdIntensitasBising.appendChild(inputIntensitasBising);
      tr.appendChild(tdIntensitasBising);
    }
    //-------------------------------------------------------
    const tdRata = document.createElement("td");
    const inputRata = document.createElement("input");
    inputRata.setAttribute("type", "text");
    inputRata.setAttribute("value", 0);
    inputRata.setAttribute("name", `ratarata${i}`);
    inputRata.setAttribute("id", `ratarata${i}`);
    inputRata.setAttribute("readonly", "");
    inputRata.classList.add("form-control");
    tdRata.appendChild(inputRata);
    tr.appendChild(tdRata);
    // ----------------------------------------------------
    wadahKebisingan.appendChild(tr);
    //-----------------------------------------------------
    //================Logika Kebisingan======================
    const arrayOfIntensitasKebisingan = document.querySelectorAll(
      `.kebisinganIntensitasKebisingan${i}`
    );
    for (const intensitasKebisingan of arrayOfIntensitasKebisingan) {
      intensitasKebisingan.addEventListener("change", () => {
        const arrayOfIntensitasKebisinganValue = [];
        for (let j = 0; j < 3; j++) {
          arrayOfIntensitasKebisinganValue.push(
            parseInt(arrayOfIntensitasKebisingan[j].value)
          );
        }
        const sumDariValueKebisingan = arrayOfIntensitasKebisinganValue.reduce(
          (total, num) => {
            return total + num;
          }
        );
        const wadahRata = document.querySelector(`#ratarata${i}`);
        wadahRata.value = (sumDariValueKebisingan / 3).toFixed(2);
      });
    }
  }
  //==================End kebisingan=======================
  //==================bagian Pencahayaan=======================
  for (let i = 1; i < jumlahTitikPencahayaan + 1; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("text-center");
    // --------------------------------------------------------
    const tdLokasiTitik = document.createElement("td");
    const inputTitik = document.createElement("input");
    inputTitik.setAttribute("type", "text");
    inputTitik.setAttribute("value", `titik ke-${i}`);
    inputTitik.setAttribute("name", `lokasiPencahayaan${i}`);
    inputTitik.setAttribute("readonly", "");
    inputTitik.classList.add("form-control");
    tdLokasiTitik.classList.add("align-middle");
    tdLokasiTitik.appendChild(inputTitik);
    tr.appendChild(tdLokasiTitik);
    // -----------------------------------------------------
    for (let j = 1; j < 4; j++) {
      const tdpengukuran = document.createElement("td");
      const inputpengukuran = document.createElement("input");
      inputpengukuran.setAttribute("type", "number");
      inputpengukuran.setAttribute("value", 0);
      inputpengukuran.setAttribute("name", `pencahayaanPengukuran${i}-${j}`);
      inputpengukuran.setAttribute("id", `pencahayaanPengukuran${i}-${j}`);
      inputpengukuran.classList.add(
        "form-control",
        `pencahayaanPengukuran${i}`
      );
      tdpengukuran.appendChild(inputpengukuran);
      tr.appendChild(tdpengukuran);
    }
    //-------------------------------------------------------
    const tdRata = document.createElement("td");
    const inputRata = document.createElement("input");
    inputRata.setAttribute("type", "text");
    inputRata.setAttribute("value", 0);
    inputRata.setAttribute("name", `ratarataPencahayaan${i}`);
    inputRata.setAttribute("id", `ratarataPencahayaan${i}`);
    inputRata.setAttribute("readonly", "");
    inputRata.classList.add("form-control", "ratarataPencahayaan");
    tdRata.appendChild(inputRata);
    tr.appendChild(tdRata);
    // ----------------------------------------------------
    const tableRowRatarata = document.querySelector("#tableRowRatarata");
    wadahPencahayaan.insertBefore(tr, tableRowRatarata);
    //================Logika Penerangan======================
    const arrayOfPenerangan = document.querySelectorAll(
      `.pencahayaanPengukuran${i}`
    );
    for (const penerangan of arrayOfPenerangan) {
      penerangan.addEventListener("change", () => {
        const arrayOfPeneranganValue = [];
        for (let j = 0; j < 3; j++) {
          arrayOfPeneranganValue.push(parseInt(arrayOfPenerangan[j].value));
        }
        const sumDariValuePenerangan = arrayOfPeneranganValue.reduce(
          (total, num) => {
            return total + num;
          }
        );
        const wadahRata = document.querySelector(`#ratarataPencahayaan${i}`);
        wadahRata.value = (sumDariValuePenerangan / 3).toFixed(2);

        const arrayOfRatarataPencahayaan = document.querySelectorAll(
          ".ratarataPencahayaan"
        );
        const arrayOfRatarataPencahayaanValue = [];
        for (RatarataPencahayaan of arrayOfRatarataPencahayaan) {
          arrayOfRatarataPencahayaanValue.push(
            parseFloat(RatarataPencahayaan.value)
          );
        }
        const sumRatarataPencahayaan = arrayOfRatarataPencahayaanValue
          .reduce((total, num) => {
            return total + num;
          })
          .toFixed(2);
        const wadahTotalRatarata = document.querySelector("#totalratarata");
        wadahTotalRatarata.value = sumRatarataPencahayaan;
      });
    }
  }
  //==================End Pencahayaan=======================
  //==================bagian Ventilasi=======================
  for (let i = 1; i < jumlahTitikVentilasi + 1; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("text-center");
    //===============================================
    const tdJenisVentilasi = document.createElement("td");
    const inputJenisVentilasi = document.createElement("input");
    inputJenisVentilasi.setAttribute("type", "text");
    inputJenisVentilasi.setAttribute("name", `ventilasiJenisVentilasi${i}`);
    inputJenisVentilasi.classList.add("form-control");
    tdJenisVentilasi.appendChild(inputJenisVentilasi);
    tr.appendChild(tdJenisVentilasi);
    //===============================================
    const tdPanjang = document.createElement("td");
    const inputPanjang = document.createElement("input");
    inputPanjang.setAttribute("type", "number");
    inputPanjang.setAttribute("name", `ventilasiPanjang${i}`);
    inputPanjang.setAttribute("value", 0);
    inputPanjang.classList.add("form-control");
    tdPanjang.appendChild(inputPanjang);
    tr.appendChild(tdPanjang);
    //===============================================
    const tdLebar = document.createElement("td");
    const inputLebar = document.createElement("input");
    inputLebar.setAttribute("type", "number");
    inputLebar.setAttribute("name", `ventilasiLebar${i}`);
    inputLebar.setAttribute("value", 0);
    inputLebar.classList.add("form-control");
    tdLebar.appendChild(inputLebar);
    tr.appendChild(tdLebar);
    //===============================================
    const tdVelocity = document.createElement("td");
    const inputVelocity = document.createElement("input");
    inputVelocity.setAttribute("type", "number");
    inputVelocity.setAttribute("name", `ventilasiVelocity${i}`);
    inputVelocity.setAttribute("value", 0);
    inputVelocity.classList.add("form-control");
    tdVelocity.appendChild(inputVelocity);
    tr.appendChild(tdVelocity);
    //===============================================
    const tdJumlahPekerja = document.createElement("td");
    const inputJumlahPekerja = document.createElement("input");
    inputJumlahPekerja.setAttribute("type", "number");
    inputJumlahPekerja.setAttribute("name", `ventilasiJumlahPekerja${i}`);
    inputJumlahPekerja.setAttribute("value", 0);
    inputJumlahPekerja.classList.add("form-control");
    tdJumlahPekerja.appendChild(inputJumlahPekerja);
    tr.appendChild(tdJumlahPekerja);
    //=================================================
    wadahVentilasi.appendChild(tr);
  }
});
