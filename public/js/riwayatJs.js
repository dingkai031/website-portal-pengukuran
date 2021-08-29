const arrOfTombolDownload = document.querySelectorAll(".tombolDownload");
for (const tombolDownload of arrOfTombolDownload) {
  tombolDownload.addEventListener("click", () => {
    const nama = tombolDownload.getAttribute("name");
    const target = tombolDownload.getAttribute("dataTarget");
    const tanggal = tombolDownload.getAttribute("dataTanggal");
    const tempat = tombolDownload.getAttribute("dataTempat");

    const panjang = tombolDownload.getAttribute("dataPanjang");
    const lebar = tombolDownload.getAttribute("dataLebar");
    const tinggi = tombolDownload.getAttribute("dataTinggi");
    const jenis = tombolDownload.getAttribute("dataJenis");
    const jumlah = tombolDownload.getAttribute("dataJumlah");
    const rusak = tombolDownload.getAttribute("dataRusak");

    const ruangan = tombolDownload.getAttribute("dataRuangan");

    const doc = new jspdf.jsPDF();
    if (panjang && lebar && tinggi) {
      if (jenis && jumlah && rusak) {
        doc.autoTable({
          head: [
            [
              "Panjang",
              "Lebar",
              "Tinggi",
              "Jenis Pencahayaan",
              "Jumlah Pencahayaan",
              "Jumlah Pencahayaan Rusak",
            ],
          ],
          body: [[panjang, lebar, tinggi, jenis, jumlah, rusak]],
          theme: "grid",
          styles: {
            halign: "center",
            valign: "middle",
            fontStyle: "bold",
          },
        });
      } else if (ruangan) {
        doc.autoTable({
          head: [["Ruangan", "Panjang", "Lebar", "Tinggi"]],
          body: [[ruangan, panjang, lebar, tinggi]],
          theme: "grid",
          styles: {
            halign: "center",
            valign: "middle",
            fontStyle: "bold",
          },
        });
      }
    }

    doc.autoTable({
      html: target,
      theme: "grid",
      styles: {
        halign: "center",
        valign: "middle",
        fontStyle: "bold",
      },
    });
    doc.save(`${nama}-(${tanggal})-${tempat}.pdf`);
  });
}
