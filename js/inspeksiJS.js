const toggle = document.querySelector("#toggleButton");
const sidemenu = document.querySelector("#sidemenu");

const arrow = document.querySelector(".arrow");

const menuItem = document.querySelectorAll(".title-menu");
const formInspeksiTitle = menuItem[0];
const riwayatPengukuranTitle = menuItem[1];

const judul = document.querySelector("#titleInspeksiPlk");

const labelMenu = document.querySelector(".text-muted");
const wrapperJudul = judul.parentElement.parentElement;
const mediaQuery = window.matchMedia("(max-width: 767px)");

function whenSideMenuOpen() {
  sidemenu.classList.remove("show-sidemenu");
  sidemenu.style.width = "95px";
  toggle.style.transform = "rotate(180deg)";
  judul.classList.toggle("d-none");
  if (!wrapperJudul.classList.contains("d-flex")) {
    wrapperJudul.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    labelMenu.style.opacity = 0;
    labelMenu.style.cursor = "default";
  }
  formInspeksiTitle.innerHTML = "<i class='bi bi-ui-checks me-3'></i>";
  formInspeksiTitle.parentElement.removeChild(arrow);
  riwayatPengukuranTitle.innerHTML = "<i class='bi bi-calendar3-range'></i>";
}

function whenSideMenuClose() {
  sidemenu.classList.add("show-sidemenu");
  sidemenu.style.width = "280px";
  toggle.style.transform = "rotate(0deg)";
  judul.classList.toggle("d-none");
  if (wrapperJudul.classList.contains("d-flex")) {
    wrapperJudul.classList.remove(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
  }
  labelMenu.style.opacity = 1;
  labelMenu.style.cursor = "text";
  formInspeksiTitle.innerHTML =
    "<i class='bi bi-ui-checks me-3 arrow'></i>Form Inspeksi";
  formInspeksiTitle.parentElement.appendChild(arrow);
  riwayatPengukuranTitle.innerHTML =
    "<i class='bi bi-calendar3-range me-3'></i>Riwayat Pengukuran";
}

toggle.addEventListener("click", function () {
  const wrapperJudul = judul.parentElement.parentElement;
  if (sidemenu.classList.contains("show-sidemenu")) {
    whenSideMenuOpen();
  } else {
    whenSideMenuClose();
  }
});

if (!mediaQuery.matches) {
  mediaQuery.addEventListener("change", e => {
    if (e.matches) {
      whenSideMenuOpen();
    } else {
      whenSideMenuClose();
    }
  });
} else {
  whenSideMenuOpen();
  mediaQuery.addEventListener("change", e => {
    if (!e.matches) {
      whenSideMenuClose();
    } else {
      whenSideMenuOpen();
    }
  });
}
