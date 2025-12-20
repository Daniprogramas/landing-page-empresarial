// ==========================
// Validação + Envio do Formulário
// ==========================
const form = document.querySelector("form");
const feedback = document.createElement("p");
feedback.style.marginTop = "10px";
form.appendChild(feedback);

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const nome = form.querySelector("input[type='text']").value.trim();
  const email = form.querySelector("input[type='email']").value.trim();
  const mensagem = form.querySelector("textarea").value.trim();

  if (!nome || !email || !mensagem) {
    feedback.textContent = "Por favor, preencha todos os campos.";
    feedback.style.color = "red";
    return;
  }

  // Envio via Formspree
  try {
    const response = await fetch("https://formspree.io/f/mjkvwqgv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, mensagem })
    });

    if (response.ok) {
      feedback.textContent = "Mensagem enviada com sucesso!";
      feedback.style.color = "green";
      form.reset();
    } else {
      feedback.textContent = "Erro ao enviar. Tente novamente.";
      feedback.style.color = "red";
    }
  } catch (error) {
    feedback.textContent = "Falha na conexão. Tente mais tarde.";
    feedback.style.color = "red";
  }
});

// ==========================
// Dark Mode Toggle
// ==========================
const toggle = document.getElementById("darkModeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Atualiza o ícone do botão conforme o modo ativo
  toggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});
