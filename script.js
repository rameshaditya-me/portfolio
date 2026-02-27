(function () {
  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });

    // Close menu when clicking a nav link (for mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
      });
    });
  }
})();
