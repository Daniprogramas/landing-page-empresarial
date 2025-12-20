// Seleciona o formulário
const form = document.querySelector("form");

// Cria elemento de feedback
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

  // Integração com Google Analytics (exemplo)
  if (typeof gtag === "function") {
    gtag("event", "conversion", {
      "send_to": "AW-CONVERSION_ID",
      "event_category": "Formulário",
      "event_label": "Contato Landing Page"
    });
  }

  // Integração com Facebook Pixel (exemplo)
  if (typeof fbq === "function") {
    fbq("track", "Lead");
  }

  form.reset();
});
