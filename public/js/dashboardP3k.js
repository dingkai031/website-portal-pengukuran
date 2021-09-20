document.addEventListener("DOMContentLoaded", function () {
  const chart = Highcharts.chart("container", {
    chart: {
      type: "column",
    },
    title: {
      text: "Laporan Kecelakaan",
      align: "left",
    },
    xAxis: {
      categories: arrayOfNamaTempat,
      min: 0,
      max: arrayOfNamaTempat.length - 1,
    },
    yAxis: {
      title: {
        text: "Jumlah",
      },
    },
    series: [
      {
        name: "John",
        data: [5, 7, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      },
    ],
  });
});
