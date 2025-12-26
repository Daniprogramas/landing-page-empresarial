// ==========================
// Função para carregar parciais
// ==========================
async function loadPartial(id, file) {
  try {
    const response = await fetch(`partials/${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    // Se carregou o header, inicializa o dark mode
    if (id === "header") {
      initDarkMode();
    }

    // Se carregou o hero, inicializa o banner dinâmico
    if (id === "hero") {
      initHero();
    }

    // Se carregou o FAQ, inicializa o accordion
    if (id === "faq") {
      initFAQ();
    }

    // Se carregou o contato, inicializa o formulário
    if (id === "contact") {
      initForm();
    }
  } catch (error) {
    console.error(`Erro ao carregar ${file}:`, error);
  }
}

// ==========================
// Carregamento dos parciais
// ==========================
loadPartial("header", "header.html");
loadPartial("hero", "hero.html");
loadPartial("about", "about.html");
loadPartial("features", "features.html");
loadPartial("pricing", "pricing.html");
loadPartial("testimonials", "testimonials.html");
loadPartial("faq", "faq.html");
loadPartial("contact", "contact.html");
loadPartial("footer", "footer.html");

// ==========================
// Dark Mode (função chamada após header)
// ==========================
function initDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  if (!toggle) return;

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
}

// ==========================
// Hero dinâmico (rotativo)
// ==========================
function initHero() {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;

  const images = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/office-973134_1280.jpg"
  ];

  let index = 0;
  setInterval(() => {
    hero.style.backgroundImage = `url(${images[index]})`;
    index = (index + 1) % images.length;
  }, 5000); // troca a cada 5 segundos
}

// ==========================
// FAQ Accordion
// ==========================
function initFAQ() {
  const questions = document.querySelectorAll(".faq-question");
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.classList.toggle("active");
    });
  });
}

// ==========================
// Formulário de Contato
// ==========================
function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

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
}
