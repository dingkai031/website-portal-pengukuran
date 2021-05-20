const toTop = document.querySelector("#keatas");

toTop.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});

document.addEventListener("scroll", () => {
  if (window.scrollY > 240) {
    toTop.style.opacity = 1;
  } else {
    toTop.style.opacity = 0;
  }
});
