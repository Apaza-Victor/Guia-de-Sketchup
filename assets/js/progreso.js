/**
 * progreso.js — progreso de módulos completados, persistido en localStorage
 * (sin backend). Pinta el sidebar de navegación en cada página de módulo
 * y controla el botón "Marcar módulo como completado".
 */

const CLAVE_PROGRESO = "sketchup-cde-progreso";

function progresoGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PROGRESO)) || [];
  } catch {
    return [];
  }
}

function moduloCompletado(id) {
  return progresoGuardado().includes(id);
}

function alternarModuloCompletado(id) {
  const actual = progresoGuardado();
  const nuevo = actual.includes(id)
    ? actual.filter((m) => m !== id)
    : [...actual, id];
  localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(nuevo));
  return nuevo;
}

function renderSidebarModulos(idActual) {
  const contenedor = document.getElementById("sidebar-modulos-placeholder");
  if (!contenedor || typeof MODULOS === "undefined") return;

  const completados = progresoGuardado();

  const items = MODULOS.map((m) => {
    const activo = m.id === idActual ? " activo" : "";
    const completo = completados.includes(m.id);
    return `
      <li>
        <a href="${m.href}" class="${activo.trim()}">
          <span class="marca-check${completo ? " completo" : ""}">
            ${completo ? '<i data-lucide="check"></i>' : ""}
          </span>
          ${m.id}. ${m.titulo}
        </a>
      </li>`;
  }).join("");

  contenedor.innerHTML = `
    <nav class="sidebar-modulos" aria-label="Módulos del curso">
      <div class="sidebar-modulos__cabecera">
        <span>Módulos</span>
        <span>${completados.length}/${MODULOS.length}</span>
      </div>
      <ul>${items}</ul>
    </nav>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function inicializarBotonCompletado(idActual) {
  const boton = document.getElementById("btn-marcar-completo");
  if (!boton) return;

  const actualizarBoton = () => {
    const completo = moduloCompletado(idActual);
    boton.innerHTML = completo
      ? '<i data-lucide="check-circle-2"></i> Módulo completado'
      : '<i data-lucide="circle"></i> Marcar módulo como completado';
    boton.classList.toggle("btn-plano--primario", completo);
    boton.classList.toggle("btn-plano--secundario", !completo);
    if (window.lucide) window.lucide.createIcons();
  };

  boton.addEventListener("click", () => {
    alternarModuloCompletado(idActual);
    actualizarBoton();
    renderSidebarModulos(idActual);
  });

  actualizarBoton();
}
