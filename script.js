const whatsappPhoneNumber = "62XXXXXXXXXXX";
const whatsappMessage = "Halo Kopi Senja, saya ingin bertanya tentang menu.";

document.documentElement.classList.add("has-js");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka navigasi");
  primaryNav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Buka navigasi" : "Tutup navigasi");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

const statusMessage = document.querySelector(".status-message");
let statusTimeout;

function announce(message) {
  statusMessage.textContent = message;
  statusMessage.classList.add("is-visible");
  window.clearTimeout(statusTimeout);
  statusTimeout = window.setTimeout(() => statusMessage.classList.remove("is-visible"), 5000);
}

document.querySelectorAll(".whatsapp-trigger").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (/^\d{8,15}$/.test(whatsappPhoneNumber)) {
      link.href = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      link.target = "_blank";
      link.rel = "noreferrer";
      return;
    }

    event.preventDefault();
    announce("Nomor WhatsApp belum diatur. Ganti placeholder di script.js dengan nomor bisnis yang benar.");
  });
});

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-unavailable");
    image.setAttribute("aria-hidden", "true");
  }, { once: true });
});

const year = document.querySelector("#current-year");
year.textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}