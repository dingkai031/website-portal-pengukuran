$("#dokumentasi").fileinput({
  language: "id",
  theme: "fas"
});

$(document).ready(function () {
  $(".select2").select2({
    placeholder: "Silahkan pilih",
    theme: "bootstrap4",
    width: "100%"
  });
});

$("#lokasiPengukuran").on("select2:select", function (e) {
  const targetValue = e.target.value;
  $(".denah").attr("src", `/img/denah/${targetValue}.jpg`);
  $(".keterangan").attr("src", "/img/denah/keterangan.jpg");
  const indexTerpilih = parsed.findIndex(x => x.nama === targetValue);
  const jumlahTitikIklimKerja =
    parsed[indexTerpilih].jumlahTitikPengukuran.iklimKerja;
  const wadahIklimKerja = document.querySelector("#wadahFormIklimKerja");
  wadahIklimKerja.innerHTML = "";
  for (let i = 1; i < jumlahTitikIklimKerja + 1; i++) {
    const tr = document.createElement("tr");
    tr.classList.add("text-center");
    //======================usia=========================
    const tdUsai = document.createElement("td");
    const inputUsia = document.createElement("input");
    inputUsia.setAttribute("type", "text");
    inputUsia.setAttribute("name", `IklimKerjaUsia${i}`);
    inputUsia.setAttribute("required", "");
    inputUsia.classList.add("form-control");
    tdUsai.appendChild(inputUsia);
    tr.appendChild(tdUsai);
    //------------------------------------------------
    //======================BB=========================
    const tdBB = document.createElement("td");
    const inputBB = document.createElement("input");
    inputBB.setAttribute("type", "text");
    inputBB.setAttribute("name", `IklimKerjaBB${i}`);
    inputBB.setAttribute("required", "");
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
    inputTitik.setAttribute("required", "");
    inputTitik.classList.add("form-control");
    tdLokasiTitik.appendChild(inputTitik);
    tr.appendChild(tdLokasiTitik);
    //--------------------------------------------------
    //=================iklim kerja suhu basah======================
    const tdSuhuBasah = document.createElement("td");
    const inputSuhuBasah = document.createElement("input");
    inputSuhuBasah.setAttribute("type", "number");
    inputSuhuBasah.setAttribute("value", 0);
    inputSuhuBasah.setAttribute("name", `lIklimKerjaSuhuBasah${i}`);
    inputSuhuBasah.setAttribute("id", `lIklimKerjaSuhuBasah${i}`);
    inputSuhuBasah.setAttribute("required", "");
    inputSuhuBasah.classList.add("form-control", "suhu-basah");
    tdSuhuBasah.appendChild(inputSuhuBasah);
    tr.appendChild(tdSuhuBasah);
    //-------------------------------------------------------------
    //==========================iklik kerja suhu kering=====================
    const tdSuhuKering = document.createElement("td");
    const inputSuhuKering = document.createElement("input");
    inputSuhuKering.setAttribute("type", "number");
    inputSuhuKering.setAttribute("value", 0);
    inputSuhuKering.setAttribute("name", `lIklimKerjaSuhuKering${i}`);
    inputSuhuKering.setAttribute("id", `lIklimKerjaSuhuKering${i}`);
    inputSuhuKering.setAttribute("required", "");
    inputSuhuKering.classList.add("form-control", "suhu-kering");
    tdSuhuKering.appendChild(inputSuhuKering);
    tr.appendChild(tdSuhuKering);
    //-------------------------------------------------------------
    //=============================suhu bola======================
    const tdSuhuBola = document.createElement("td");
    const inputSuhuBola = document.createElement("input");
    inputSuhuBola.setAttribute("type", "number");
    inputSuhuBola.setAttribute("value", 0);
    inputSuhuBola.setAttribute("name", `lIklimKerjaSuhuBola${i}`);
    inputSuhuBola.setAttribute("id", `lIklimKerjaSuhuBola${i}`);
    inputSuhuBola.setAttribute("required", "");
    inputSuhuBola.classList.add("form-control", "suhu-bola");
    tdSuhuBola.appendChild(inputSuhuBola);
    tr.appendChild(tdSuhuBola);
    //----------------------------------------------------------
    //===================ISBB====================================
    const tdISBB = document.createElement("td");
    const inputISBB = document.createElement("input");
    inputISBB.setAttribute("type", "number");
    inputISBB.setAttribute("value", 0);
    inputISBB.setAttribute("name", `lIklimKerjaISBB${i}`);
    inputISBB.setAttribute("id", `lIklimKerjaISBB${i}`);
    inputISBB.setAttribute("required", "");
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
    inputRH.setAttribute("name", `lIklimKerjaRH${i}`);
    inputRH.setAttribute("id", `lIklimKerjaRH${i}`);
    inputRH.setAttribute("required", "");
    inputRH.setAttribute("readonly", "");
    inputRH.classList.add("form-control", "rh");
    tdRH.appendChild(inputRH);
    tr.appendChild(tdRH);
    //------------------------------------------------------------
    //======================BB=========================
    const tdBebanKerja = document.createElement("td");
    const inputBebanKerja = document.createElement("input");
    inputBebanKerja.setAttribute("type", "text");
    inputBebanKerja.setAttribute("name", `IklimKerjaBebanKerja${i}`);
    inputBebanKerja.setAttribute("required", "");
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
});
