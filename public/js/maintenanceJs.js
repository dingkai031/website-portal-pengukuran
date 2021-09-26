$(document).ready(function () {
  //inisialisasi library select2 beserta konfigurasinya
  $(".select2").select2({
    placeholder: "Silahkan pilih",
    theme: "bootstrap4",
    width: "100%",
    dropdownParent: $("#newAlat"),
    minimumResultsForSearch: -1,
  });
  $(".select2FormMaintenance").select2({
    placeholder: "Silahkan pilih",
    theme: "bootstrap4",
    width: "100%",
    dropdownParent: $("#newFormMaintenance"),
    minimumResultsForSearch: -1,
  });
  //inisialisasi library fileinput beserta konfigurasinya
  $("#dokumentasiMaintenance").fileinput({
    language: "id",
    theme: "fas",
  });
});

//fungsi dibawah ini untuk bagian notifikasi, pada notifikasi tersebut terdapat element select dengan id...
//#opsiCek. Jika opsiCek valuenya selain "selesai" maka akan muncul element select baru, jika user memilih...
//value selesai maka element tersebut tidak muncul

const opsiCek = document.querySelector("#opsiCek");
if (opsiCek) {
  opsiCek.addEventListener("change", (e) => {
    const value = e.target.value;
    const divNode = document.createElement("div");
    divNode.classList.add("col-sm-6", "mb-3", "d-flex", "flex-column");
    divNode.setAttribute("id", "tanggalBerikutnyaWrapper");
    const labelDate = document.createElement("label");
    labelDate.classList.add("form-label");
    labelDate.setAttribute("for", "tanggalMaintenanceBerikutnya");
    labelDate.innerText = "Tanggal Maintenance Berikutnya";
    const divInputGroup = document.createElement("div");
    divInputGroup.classList.add("input-group", "border-0");
    divInputGroup.classList.add("datepicker");
    divInputGroup.setAttribute("id", "inputGroupTanggalBerikutnya");
    const inputTanggalBerikutnya = document.createElement("input");
    inputTanggalBerikutnya.setAttribute("type", "text");
    inputTanggalBerikutnya.setAttribute("id", "tanggalMaintenanceBerikutnya");
    inputTanggalBerikutnya.setAttribute("name", "tanggalMaintenanceBerikutnya");
    inputTanggalBerikutnya.setAttribute("required", "");
    inputTanggalBerikutnya.setAttribute("data-input", "");
    inputTanggalBerikutnya.setAttribute("title", "Harap isi form ini");
    inputTanggalBerikutnya.classList.add("form-control", "border-0");
    const spanTanggalBerikutnya = document.createElement("span");
    spanTanggalBerikutnya.classList.add("input-group-text", "border-0");
    spanTanggalBerikutnya.setAttribute("data-toggle", "");
    const iTanggalBerikutnya = document.createElement("i");
    iTanggalBerikutnya.classList.add("bx", "bx-calendar");

    spanTanggalBerikutnya.appendChild(iTanggalBerikutnya);
    divInputGroup.appendChild(inputTanggalBerikutnya);
    divInputGroup.appendChild(spanTanggalBerikutnya);

    divNode.appendChild(labelDate);
    divNode.appendChild(divInputGroup);

    if (value !== "selesai") {
      const tanggalBerikutanyaWrapper = document.querySelector(
        "#tanggalBerikutnyaWrapper"
      );
      if (!tanggalBerikutanyaWrapper) {
        opsiCek.parentNode.insertAdjacentElement("afterend", divNode);
        const datePickerTanggalBerikutnya = document.querySelector(
          "#inputGroupTanggalBerikutnya"
        );
        flatpickr(datePickerTanggalBerikutnya, {
          dateFormat: "d-m-Y",
          static: true,
          wrap: true,
        });
      }
    } else {
      const tanggalBerikutanyaWrapper = document.querySelector(
        "#tanggalBerikutnyaWrapper"
      );
      tanggalBerikutanyaWrapper.remove();
    }
  });
}
