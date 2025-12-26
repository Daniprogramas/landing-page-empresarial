// Importa todos os módulos
import "./darkmode.js";
import "./form.js";
import "./faq.js";
import "./backtotop.js";
// Se usar parciais: import "./loadPartials.js";

// ==========================
// Dark Mode (já existente)
// ==========================
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

  // ==========================
  // Hero dinâmico
  // ==========================
  initHero();
});

// ==========================
// Função Hero (rotativo)
// ==========================
function initHero() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;

const images = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/office-973134_1280.jpg"
];


  let index = 0;
  setInterval(() => {
    hero.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
  }, 5000); // troca a cada 5 segundos
}
