const form = document.querySelector("form");

form.addEventListener(
  "submit",
  (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add("was-validated");
  },
  false
);
