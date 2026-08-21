(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var header = document.querySelector(".site-header");

  function setOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    var label = toggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "Close menu" : "Open menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880 && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });
  }

  if (header) {
    window.addEventListener("scroll", function () {
      if (document.body.classList.contains("nav-open")) return;
      header.classList.toggle("is-compact", window.scrollY > 8);
    }, { passive: true });
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
