const showNavbar = (toggleId, navId, bodyId, headerId) => {
  const toggle = document.getElementById(toggleId),
    toggle2s = document.querySelectorAll(".toggle2"),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId),
    chevron = document.querySelector("#chevron");

  // Validasi apakah semua variable ada datanya
  if (toggle && nav && bodypd && headerpd) {
    toggle.addEventListener("click", () => {
      for (const toggle2 of toggle2s) {
        if (!toggle2.classList.contains("collapsed")) {
          toggle.setAttribute("data-bs-toggle", "collapse");
          toggle.setAttribute("data-bs-target", "#submenu");
        } else {
          toggle.setAttribute("data-bs-target", " ");
          toggle.setAttribute("data-bs-toggle", " ");
        }
      }
      // show navbar
      nav.classList.toggle("show-sidebar");
      // change icon
      toggle.classList.toggle("bx-x");
      // add padding to body
      bodypd.classList.toggle("body-pd");
      // add padding to header
      headerpd.classList.toggle("body-pd");
    });
    for (const toggle2 of toggle2s) {
      toggle2.addEventListener("click", () => {
        if (!toggle2.classList.contains("collapsed")) {
          toggle.setAttribute("data-bs-toggle", "collapse");
          toggle.setAttribute("data-bs-target", "#submenu");
        } else {
          toggle.setAttribute("data-bs-target", " ");
          toggle.setAttribute("data-bs-toggle", " ");
        }
        if (chevron) {
          chevron.classList.toggle("bxs-chevron-up");
        }
        if (!nav.classList.contains("show-sidebar")) {
          // show navbar
          nav.classList.toggle("show-sidebar");
          // change icon
          toggle.classList.toggle("bx-x");
          // add padding to body
          bodypd.classList.toggle("body-pd");
          // add padding to header
          headerpd.classList.toggle("body-pd");
        }
      });
    }
  }
};

showNavbar("header-toggle", "nav-bar", "body-pd", "header");
