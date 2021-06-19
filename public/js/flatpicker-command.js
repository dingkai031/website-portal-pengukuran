document.addEventListener("DOMContentLoaded", () => {
  const datePicker = document.querySelectorAll(".datepicker");
  const datePickerTime = document.querySelectorAll(".datepicker-time");

  flatpickr.localize(flatpickr.l10ns.id);

  if (datePicker) {
    for (let dp of datePicker) {
      flatpickr(dp, {
        dateFormat: "Y-m-d",
        static: true,
        wrap: true
      });
    }
  }

  if (datePickerTime) {
    for (let dp of datePickerTime) {
      flatpickr(dp, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        static: true,
        wrap: true
      });
    }
  }
});
