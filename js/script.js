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
feedback.style.marginTop = "10px";
form.appendChild(feedback);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const telefone = form.telefone.value.trim();
  const empresa = form.empresa.value.trim();
  const cargo = form.cargo.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    feedback.textContent = "Por favor, preencha os campos obrigatórios.";
    feedback.style.color = "#ef4444";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = "E-mail inválido.";
    feedback.style.color = "#ef4444";
    return;
  }

  try {
    const res = await fetch("https://formspree.io/f/mjkvwqgv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone, empresa, cargo, mensagem })
    });

    if (res.ok) {
      feedback.textContent = "Mensagem enviada com sucesso!";
      feedback.style.color = "#10b981";
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

// ==========================
// FAQ Accordion
// ==========================
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("active");
  });
});

// ==========================
// Botão voltar ao topo
// ==========================
const backToTop = document.createElement("button");
backToTop.textContent = "⬆️ Topo";
backToTop.className = "btn btn-outline";
backToTop.style.position = "fixed";
backToTop.style.bottom = "20px";
backToTop.style.right = "20px";
backToTop.style.zIndex = "99";
document.body.appendChild(backToTop);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
