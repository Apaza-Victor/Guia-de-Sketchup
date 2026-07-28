/**
 * navegacion.js — menú móvil (offcanvas simple) para la navbar inyectada.
 */

function crearMenuMovil() {
  if (document.getElementById("menu-movil")) return;

  const menu = document.createElement("div");
  menu.id = "menu-movil";
  menu.setAttribute("role", "dialog");
  menu.setAttribute("aria-hidden", "true");
  menu.style.cssText = `
    position: fixed; inset: 0; z-index: 1500;
    background: var(--bg);
    display: none; flex-direction: column;
    padding: var(--sp-6);
  `;

  const enlaces = Array.from(document.querySelectorAll(".navbar-app__enlaces a"))
    .map((a) => `<a href="${a.getAttribute("href")}" style="font-family:var(--fuente-display); font-size:1.4rem; padding:var(--sp-3) 0; border-bottom:1px dashed var(--borde); color:var(--texto);">${a.textContent}</a>`)
    .join("");

  menu.innerHTML = `
    <div style="display:flex; justify-content:flex-end;">
      <button class="btn-icono" id="btn-cerrar-menu" aria-label="Cerrar menú"><i data-lucide="x"></i></button>
    </div>
    <nav style="display:flex; flex-direction:column; margin-top:var(--sp-8);">${enlaces}</nav>
  `;

  document.body.appendChild(menu);
  if (window.lucide) window.lucide.createIcons();
}

document.addEventListener("click", (evento) => {
  if (evento.target.closest("#btn-menu-movil")) {
    crearMenuMovil();
    const menu = document.getElementById("menu-movil");
    menu.style.display = "flex";
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  if (evento.target.closest("#btn-cerrar-menu") || evento.target.matches("#menu-movil a")) {
    const menu = document.getElementById("menu-movil");
    if (menu) {
      menu.style.display = "none";
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    const menu = document.getElementById("menu-movil");
    if (menu && menu.style.display === "flex") {
      menu.style.display = "none";
      document.body.style.overflow = "";
    }
  }
});
