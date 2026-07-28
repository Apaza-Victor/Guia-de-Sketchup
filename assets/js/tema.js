/**
 * tema.js — modo claro/oscuro persistente (localStorage), sin backend.
 * El atributo data-tema en <html> controla las variables CSS (ver variables.css).
 */

const CLAVE_TEMA = "sketchup-cde-tema";

function temaGuardado() {
  return localStorage.getItem(CLAVE_TEMA);
}

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-tema", tema);
  localStorage.setItem(CLAVE_TEMA, tema);
  actualizarIconoTema(tema);
}

function actualizarIconoTema(tema) {
  const boton = document.getElementById("btn-tema");
  if (!boton) return;
  boton.innerHTML = `<i data-lucide="${tema === "oscuro" ? "sun" : "moon"}"></i>`;
  if (window.lucide) window.lucide.createIcons();
}

function inicializarTema() {
  const preferido = temaGuardado() || "oscuro";
  aplicarTema(preferido);
}

// El botón de tema se inyecta dinámicamente desde componentes.js,
// así que escuchamos clics por delegación en document.
document.addEventListener("click", (evento) => {
  const boton = evento.target.closest("#btn-tema");
  if (!boton) return;
  const actual = document.documentElement.getAttribute("data-tema");
  aplicarTema(actual === "oscuro" ? "claro" : "oscuro");
});

inicializarTema();

// Re-sincroniza el ícono cada vez que el navbar se vuelve a inyectar
document.addEventListener("DOMContentLoaded", () => {
  const actual = document.documentElement.getAttribute("data-tema");
  actualizarIconoTema(actual);
});
