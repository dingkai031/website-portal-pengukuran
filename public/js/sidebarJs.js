const showNavbar = (toggleId, navId, bodyId, headerId) => {
  const toggle = document.getElementById(toggleId),
    toggle2 = document.querySelector("#toggle2"),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId),
    chevron = document.querySelector("#chevron");

  // Validate that all variables exist
  if (toggle && nav && bodypd && headerpd) {
    toggle.addEventListener("click", () => {
      if (!toggle2.classList.contains("collapsed")) {
        console.log("MASUK IF");
        toggle.setAttribute("data-bs-toggle", "collapse");
        toggle.setAttribute("data-bs-target", "#submenu");
      } else {
        console.log("Masuk else");
        toggle.setAttribute("data-bs-target", " ");
        toggle.setAttribute("data-bs-toggle", " ");
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
    toggle2.addEventListener("click", () => {
      if (!toggle2.classList.contains("collapsed")) {
        console.log("MASUK IF");
        toggle.setAttribute("data-bs-toggle", "collapse");
        toggle.setAttribute("data-bs-target", "#submenu");
      } else {
        console.log("Masuk else");
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
};

showNavbar("header-toggle", "nav-bar", "body-pd", "header");
