// ==========================
// Dark Mode com persistência
// ==========================
const toggle = document.getElementById("darkModeToggle");

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
// Validação + Envio Formspree
// ==========================
const form = document.getElementById("contactForm");
const feedback = document.createElement("p");
form.appendChild(feedback);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { nome, email, telefone, empresa, cargo, mensagem } = form;

  if (!nome.value || !email.value || !mensagem.value) {
    feedback.textContent = "Preencha os campos obrigatórios.";
    feedback.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[
