/*===== SHOW NAVBAR  =====*/
const showNavbar = (toggleId, navId, bodyId, headerId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId);

  // Validate that all variables exist
  if (toggle && nav && bodypd && headerpd) {
    toggle.addEventListener("click", () => {
      // show navbar
      nav.classList.toggle("show");
      // change icon
      toggle.classList.toggle("bx-x");
      // add padding to body
      bodypd.classList.toggle("body-pd");
      // add padding to header
      headerpd.classList.toggle("body-pd");
    });
  }
};
const tambahField = (label, total = 2) => {
  const plusButton = document.querySelector(`#tambah-${label}`);
  if (plusButton) {
    plusButton.addEventListener("click", () => {
      const wrapperKebisingan = document.querySelector(`#wrapper-${label}`);
      const newFieldButton = plusButton.parentNode.removeChild(plusButton);
      const newField = document.createElement("div");
      newField.classList.add("input-group", "mb-2");
      const newFieldSpan = document.createElement("span");
      newFieldSpan.classList.add("input-group-text");
      newFieldSpan.innerText = `ke-${total++}`;
      const newFieldInput = document.createElement("input");
      newFieldInput.setAttribute("type", "number");
      newFieldInput.setAttribute("min", 0);
      newFieldInput.setAttribute("name", `ke-${total - 1}`);
      newFieldInput.classList.add("form-control");

      newField.appendChild(newFieldSpan);
      newField.appendChild(newFieldInput);
      newField.appendChild(newFieldButton);
      wrapperKebisingan.append(newField);
    });
  }
};

tambahField("kebisingan");
tambahField("getaran");
tambahField("ventilasi");
tambahField("pencahayaan");
tambahField("iklimkerja");
tambahField("jamkerja");

showNavbar("header-toggle", "nav-bar", "body-pd", "header");

/*===== LINK ACTIVE  =====*/
// const linkColor = document.querySelectorAll('.nav__link')

// function colorLink(){
//     if(linkColor){
//         linkColor.forEach(l=> l.classList.remove('active'))
//         this.classList.add('active')
//     }
// }
// linkColor.forEach(l=> l.addEventListener('click', colorLink))
