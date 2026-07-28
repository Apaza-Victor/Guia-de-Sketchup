/**
 * main.js — punto de entrada. Inicializa librerías externas.
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

  // Atajo de teclado global para el buscador (Ctrl/Cmd + K)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const boton = document.getElementById("btn-buscar");
      if (boton) boton.click();
    }
  });

  // Sombra en navbar al hacer scroll
  const navbar = document.querySelector(".navbar-app");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
  }
});
