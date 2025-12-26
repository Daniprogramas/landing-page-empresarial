async function loadPartial(id, file) {
  const response = await fetch(`partials/${file}`);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

loadPartial("header", "header.html");
loadPartial("hero", "hero.html");
loadPartial("about", "about.html");
loadPartial("features", "features.html");
loadPartial("pricing", "pricing.html");
loadPartial("testimonials", "testimonials.html");
loadPartial("faq", "faq.html");
loadPartial("contact", "contact.html");
loadPartial("footer", "footer.html");
