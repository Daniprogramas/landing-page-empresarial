// ==========================
// Inicialização do Formulário de Contato
// ==========================
function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return; // garante que só roda se o form existir

  // Mensagem de feedback
  const feedback = document.createElement("p");
  feedback.style.marginTop = "10px";
  form.appendChild(feedback);

  // Evento de envio
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { nome, email, telefone, empresa, cargo, mensagem } = form;

    // Validação básica
    if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
      feedback.textContent = "Por favor, preencha os campos obrigatórios.";
      feedback.style.color = "#ef4444";
      return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      feedback.textContent = "E-mail inválido.";
      feedback.style.color = "#ef4444";
      return;
    }

    // Envio para Formspree
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
        feedback.textContent = "Sua mensagem foi enviada com sucesso para a Danisoft Web. Em breve nossa equipe entrará em contato, basta aguardar.";
        feedback.style.color = "#10b981"; // verde elegante
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
}
