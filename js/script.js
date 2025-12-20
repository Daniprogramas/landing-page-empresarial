// ==========================
// Dark Mode com persistência
// ==========================
const toggle = document.getElementById("darkModeToggle");

// Aplica tema salvo ou do sistema na primeira carga
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = saved ? saved === "dark" : prefersDark;
  document.body.classList.toggle("dark-mode", useDark);
  toggle.textContent = useDark ? "☀️" : "🌙";
})();

// Alterna tema e salva
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
feedback.style.marginTop = "10px";
form.appendChild(feedback);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    feedback.textContent = "Por favor, preencha todos os campos.";
    feedback.style.color = "#ef4444"; // vermelho
    return;
  }

  // Envio via Formspree — substitua pelo seu endpoint caso queira
  try {
    const res = await fetch("https://formspree.io/f/mjkvwqgv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, mensagem })
    });

    if (res.ok) {
      feedback.textContent = "Mensagem enviada com sucesso!";
      feedback.style.color = "#10b981"; // verde
      form.reset();
    } else {
      feedback.textContent = "Erro ao enviar. Tente novamente.";
      feedback.style.color = "#ef4444";
    }
  } catch {
    feedback.textContent = "Falha na conexão. Tente mais tarde.";
    feedback.style.color = "#ef4444";
  }
});
