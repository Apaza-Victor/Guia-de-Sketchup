/**
 * main.js — punto de entrada. Inicializa librerías externas.
 * Se carga con `defer` después de componentes.js / tema.js / navegacion.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  if (window.AOS) {
    window.AOS.init({
      duration: 600,
      easing: "ease-out-quad",
      once: true,
      offset: 40,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }

  // Atajo de teclado global para el buscador (Ctrl/Cmd + K) — funcionalidad
  // completa se implementa en busqueda.js (siguiente parte del proyecto)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const boton = document.getElementById("btn-buscar");
      if (boton) boton.click();
    }
  });
});
