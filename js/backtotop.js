// Botão voltar ao topo
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
