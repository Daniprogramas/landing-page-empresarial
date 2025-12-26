// Importa todos os módulos
import "./darkmode.js";
import "./form.js";
import "./faq.js";
import "./backtotop.js";
// Se usar parciais: import "./loadPartials.js";

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
