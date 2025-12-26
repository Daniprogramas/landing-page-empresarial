// ==========================
// FAQ Accordion
// ==========================
export function initFAQ() {
  // Seleciona todas as perguntas
  const questions = document.querySelectorAll(".faq-question");
  if (!questions.length) return; // se não houver perguntas, sai

  // Adiciona evento de clique em cada pergunta
  questions.forEach(btn => {
    btn.addEventListener("click", () => {
      // Alterna a classe "active" no item pai
      btn.parentElement.classList.toggle("active");
    });
  });
}
