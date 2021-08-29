document.addEventListener("DOMContentLoaded", () => {
  $(".datepicker").flatpickr({
    dateFormat: "d-m-Y",
    locale: "id",
    static: true,
    wrap: true,
  });

  $(".datepicker-time").flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    static: true,
    wrap: true,
    locale: "id",
  });
});
