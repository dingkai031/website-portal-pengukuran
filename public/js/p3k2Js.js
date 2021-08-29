$(document).ready(function () {
  const dataTable = $("#tableLaporanKecelakaan").DataTable({
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
        render: $.fn.dataTable.render.moment(
          "DD-MM-YYYY",
          "DD MMMM YYYY",
          "id"
        ),
        targets: 1,
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
    order: [[1, "des"]],
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

  const dataTableTwo = $("#tableLaporanAlatEvakuasi").DataTable({
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
        render: $.fn.dataTable.render.moment(
          "DD-MM-YYYY",
          "DD MMMM YYYY",
          "id"
        ),
        targets: 1,
      },
      {
        searchable: false,
        orderable: false,
        targets: 2,
      },
      {
        searchable: false,
        orderable: false,
        targets: 4,
      },
    ],
    order: [[1, "asc"]],
  });
  dataTableTwo
    .on("order.dt search.dt", function () {
      dataTableTwo
        .column(0, { search: "applied", order: "applied" })
        .nodes()
        .each(function (cell, i) {
          cell.innerHTML = i + 1;
        });
    })
    .draw();

  $(".dokumentasi").fileinput({
    language: "id",
    theme: "fas",
    maxFileCount: 3,
    required: true,
    showUpload: false,
    allowedFileTypes: ["image"],
    allowedFileExtensions: ["jpg", "jpeg", "png"],
  });
});
