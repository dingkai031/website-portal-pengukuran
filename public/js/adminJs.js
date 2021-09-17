$(document).ready(function () {
  $(".select2").select2({
    placeholder: "Silahkan pilih",
    width: "100%",
  });
  const dataTable = $(".data-table").DataTable({
    responsive: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Indonesian.json",
    },
    columnDefs: [
      {
        searchable: false,
        orderable: false,
        targets: 0,
      },
      {
        searchable: false,
        orderable: false,
        targets: 2,
      },
      {
        searchable: false,
        orderable: false,
        targets: 6,
      },
    ],
    order: [[1, "asc"]],
  });
  dataTable
    .on("order.dt search.dt", function () {
      dataTable
        .column(0, { search: "applied", order: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
    })
    .draw();
});
