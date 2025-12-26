// Validação + Envio Formspree
const form = document.getElementById("contactForm");
const feedback = document.createElement("p");
feedback.style.marginTop = "10px";
form.appendChild(feedback);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { nome, email, telefone, empresa, cargo, mensagem } = form;

  if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
    feedback.textContent = "Por favor, preencha os campos obrigatórios.";
    feedback.style.color = "#ef4444";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    feedback.textContent = "E-mail inválido.";
    feedback.style.color = "#ef4444";
    return;
  }

  try {
    const res = await fetch("https://formspree.io/f/mjkvwqgv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome.value.trim(),
        email: email.value.trim(),
        telefone: telefone.value.trim(),
        empresa: empresa.value.trim(),
        cargo: cargo.value.trim(),
        mensagem: mensagem.value.trim()
      })
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
