async function loadPartial(id, file) {
  const response = await fetch(`partials/${file}`);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

loadPartial("header", "header.html");
loadPartial("hero", "hero.html");
loadPartial("about", "about.html");
loadPartial("features", "features.html");
loadPartial("pricing", "pricing.html");
loadPartial("testimonials", "testimonials.html");
loadPartial("faq", "faq.html");
loadPartial("contact", "contact.html");
loadPartial("footer", "footer.html");

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  if (!toggle) return;

  (function initTheme() {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = saved ? saved === "dark" : prefersDark;
    document.body.classList.toggle("dark-mode", useDark);
    toggle.textContent = useDark ? "☀️" : "🌙";
  })();

  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "☀️" : "🌙";
  });
});
