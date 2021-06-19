const resetButton = document.querySelector("#reset");
const tambahField = (label, total = 2) => {
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      total = 2;
    });
  }
  const plusButton = document.querySelector(`#tambah-${label}`);
  if (plusButton) {
    plusButton.addEventListener("click", () => {
      const wrapperKebisingan = document.querySelector(`#wrapper-${label}`);
      const newFieldButton = plusButton.parentNode.removeChild(plusButton);
      const newField = document.createElement("div");
      newField.classList.add("input-group", "mb-2", "newField");
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

resetButton.addEventListener("click", () => {
  const newField = document.querySelectorAll(".newField");
  for (let field of newField) {
    if (!field.querySelector("button")) {
      field.remove();
    } else {
      const fieldButton = field.querySelector("button");
      const wrapButton = fieldButton.parentNode;
      wrapButton.querySelector("span").innerText = "ke-1";
      wrapButton.querySelector("input").setAttribute("name", "ke-1");
    }
  }
});

tambahField("kebisingan");
tambahField("getaran");
tambahField("ventilasi");
tambahField("pencahayaan");
tambahField("iklimkerja");
tambahField("jamkerja");

$("#dokumentasi").fileinput({
  language: "id",
  theme: "fas"
});
