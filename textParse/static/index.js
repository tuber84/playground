document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".patients__link");

  links.forEach(function (link) {
    if (link.textContent.includes("golova")) {
      // let styles = window.getComputedStyle(link, "::before");
      //
      link.style.setProperty("--icon-path", "url('/brain.svg')");
    } else if (link.textContent.includes("heart")) {
      link.style.setProperty("--icon-path", "url('/heart.png')");
    } else if (link.textContent.includes("matka")) {
      link.style.setProperty("--icon-path", "url('/matka.ico')");
    } else if (link.textContent.includes("podvzdoshka")) {
      link.style.setProperty("--icon-path", "url('/podvzd.ico')");
    } else if (link.textContent.includes("matka")) {
      link.style.setProperty("--icon-path", "url('/matka.ico')");
    } else if (link.textContent.includes("liver")) {
      link.style.setProperty("--icon-path", "url('/liver.ico')");
    }
  });
});
