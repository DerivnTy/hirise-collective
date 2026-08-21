(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      var label = toggle.querySelector(".sr-only");
      if (label) label.textContent = open ? "Open menu" : "Close menu";
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  var form = document.getElementById("project-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var order = [
        ["name", "Name"],
        ["company", "Company"],
        ["email", "Email"],
        ["phone", "Phone"],
        ["website", "Website"],
        ["service", "Service needed"],
        ["description", "Brief description"],
        ["budget", "Approximate budget"],
        ["timeline", "Desired timeline"]
      ];
      var lines = ["New project inquiry from the HiRise site", ""];
      order.forEach(function (pair) {
        var val = (data.get(pair[0]) || "").toString().trim();
        lines.push(pair[1] + ": " + (val || "Not provided"));
      });
      var name = (data.get("name") || "website").toString().trim();
      var subject = encodeURIComponent("Project inquiry from " + name);
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:hello@hirisecollective.com?subject=" + subject + "&body=" + body;
    });
  }
})();
