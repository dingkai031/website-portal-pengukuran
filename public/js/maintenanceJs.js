$(document).ready(function () {
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
});
