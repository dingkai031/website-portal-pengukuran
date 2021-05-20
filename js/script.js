const akun = document.querySelector("#jenisAkun");
const formId = document.querySelector("#formId");
const formNama = document.querySelector("#formNama");

const labelId = document.querySelector("#formId label");

const submitButton = document.querySelector("#submitButton");

const form = document.querySelector("form");

const feedBack = {
  nomorInduk: {
    isInvalidNomor: function () {
      const elementFeedBack = document.createElement("div");
      elementFeedBack.classList.add("invalid-feedback");
      elementFeedBack.innerText = "Silahkan diperiksa lagi";
      formId.appendChild(elementFeedBack);
    }
  },
  nama: {
    isInvalidNama: function () {
      const elementFeedBack = document.createElement("div");
      elementFeedBack.classList.add("invalid-feedback");
      elementFeedBack.innerText = "Silahkan diperiksa lagi";
      formNama.appendChild(elementFeedBack);
    }
  }
};

akun.addEventListener("change", e => {
  const pilihan = e.target.value;

  switch (pilihan) {
    case "pertama":
      formId.classList.remove("d-none");
      formNama.classList.remove("d-none");
      submitButton.classList.remove("d-none");
      labelId.innerText = "NIP";
      break;
    case "kedua":
      formId.classList.remove("d-none");
      formNama.classList.remove("d-none");
      submitButton.classList.remove("d-none");
      labelId.innerText = "NIP";
      break;

    case "ketiga":
      formId.classList.remove("d-none");
      formNama.classList.remove("d-none");
      submitButton.classList.remove("d-none");
      labelId.innerText = "NRP";
      break;

    case "keempat":
      if (!formId.classList.contains("d-none")) {
        formId.classList.add("d-none");
      }
      formNama.classList.remove("d-none");
      submitButton.classList.remove("d-none");
    default:
      location.reload;
      break;
  }
});

form.addEventListener(
  "submit",
  e => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add("was-validated");
    feedBack.nomorInduk.isInvalidNomor();
    feedBack.nama.isInvalidNama();
  },
  false
);
