document.addEventListener("DOMContentLoaded", function () {
  const jumlahDataLaporan = [];
  for (let i = 0; i < arrayOfNamaTempat.length; i++) {
    jumlahDataLaporan.push(0);
  }
  for (let i = 0; i < arrayOfNamaTempat.length; i++) {
    for (let j = 0; j < filteredLaporan.length; j++) {
      if (arrayOfNamaTempat[i] === filteredLaporan[j].tempatKecelakaan) {
        jumlahDataLaporan[i] += 1;
      } else {
        continue;
      }
    }
  }
  const chart = Highcharts.chart("container", {
    chart: {
      type: "column",
    },
    title: {
      text: "Laporan Kecelakaan",
    },
    xAxis: {
      categories: arrayOfNamaTempat,
      min: 0,
      max: arrayOfNamaTempat.length - 1,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Jumlah",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Laporan</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: maxYear,
        data: jumlahDataLaporan,
      },
    ],
  });

  document.querySelector("#tahun").addEventListener("change", (e) => {
    if (e.target.value === "semua") {
      const arrayOfData = [];
      for (const year of arrayOfYears) {
        let filteredLaporan = laporans.filter(
          (laporan) =>
            parseInt(new Date(laporan.tanggalKejadian).getFullYear()) ===
            parseInt(year)
        );
        const jumlahDataLaporan = [];
        for (let i = 0; i < arrayOfNamaTempat.length; i++) {
          jumlahDataLaporan.push(0);
        }
        for (let i = 0; i < arrayOfNamaTempat.length; i++) {
          for (let j = 0; j < filteredLaporan.length; j++) {
            if (arrayOfNamaTempat[i] === filteredLaporan[j].tempatKecelakaan) {
              jumlahDataLaporan[i] += 1;
            } else {
              continue;
            }
          }
        }
        arrayOfData.push({
          name: year,
          data: jumlahDataLaporan,
        });
      }

      const chart = Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Laporan Kecelakaan",
        },
        xAxis: {
          categories: arrayOfNamaTempat,
          min: 0,
          max: arrayOfNamaTempat.length - 1,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Jumlah",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} Laporan</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: arrayOfData,
      });
    } else {
      let filteredLaporan = laporans.filter(
        (laporan) =>
          parseInt(new Date(laporan.tanggalKejadian).getFullYear()) ===
          parseInt(e.target.value)
      );
      const jumlahDataLaporan = [];
      for (let i = 0; i < arrayOfNamaTempat.length; i++) {
        jumlahDataLaporan.push(0);
      }
      for (let i = 0; i < arrayOfNamaTempat.length; i++) {
        for (let j = 0; j < filteredLaporan.length; j++) {
          if (arrayOfNamaTempat[i] === filteredLaporan[j].tempatKecelakaan) {
            jumlahDataLaporan[i] += 1;
          } else {
            continue;
          }
        }
      }

      const chart = Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Laporan Kecelakaan",
        },
        xAxis: {
          categories: arrayOfNamaTempat,
          min: 0,
          max: arrayOfNamaTempat.length - 1,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Jumlah",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} Laporan</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [
          {
            name: e.target.value,
            data: jumlahDataLaporan,
          },
        ],
      });
    }
  });
});
