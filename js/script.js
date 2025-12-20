// ==========================
// Validação do Formulário
// ==========================
const form = document.querySelector("form");
const feedback = document.createElement("p");
feedback.style.marginTop = "10px";
form.appendChild(feedback);

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = form.querySelector("input[type='text']").value.trim();
  const email = form.querySelector("input[type='email']").value.trim();
  const mensagem = form.querySelector("textarea").value.trim();

  if (!nome || !email || !mensagem) {
    feedback.textContent = "Por favor, preencha todos os campos.";
    feedback.style.color = "red";
    return;
  }

  feedback.textContent = "Mensagem enviada com sucesso!";
  feedback.style.color = "green";

  // Aqui você pode integrar com backend, API ou serviço de e-mail
  // Exemplo: enviar dados via fetch() para um servidor

  form.reset();
});

// ==========================
// Dark Mode Toggle
// ==========================
const toggle = document.getElementById("darkModeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Atualiza o texto do botão conforme o modo ativo
  toggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
