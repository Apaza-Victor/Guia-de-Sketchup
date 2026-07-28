/**
 * componentes.js
 * Genera el navbar y el footer como plantillas JS e las inyecta en los
 * placeholders (#navbar-placeholder / #footer-placeholder) de cada página.
 * Se hace por JS (no por <link>/fetch de un .html separado) para que el
 * sitio funcione igual abierto directamente desde el sistema de archivos,
 * sin necesitar un servidor local.
 *
 * Para añadir una página nueva: crear el archivo en /paginas, incluir los
 * dos placeholders vacíos, y agregar su ruta al array ENLACES_NAV.
 */

const ENLACES_NAV = [
  { href: "modulos.html", texto: "Módulos" },
  { href: "01-interfaz.html", texto: "1. Interfaz" },
  { href: "02-herramientas-basicas.html", texto: "2. Herramientas" },
  { href: "07-layout-documentacion.html", texto: "7. LayOut" },
  { href: "funcionalidades.html", texto: "Funcionalidades" },
  { href: "glosario.html", texto: "Glosario" },
  { href: "recursos.html", texto: "Recursos" },
];

function rutaBase() {
  return location.pathname.includes("/paginas/") ? "../" : "";
}

function rutaPaginas() {
  return location.pathname.includes("/paginas/") ? "" : "paginas/";
}

function gizmoEjesSVG(tam = 22) {
  return `
  <svg class="gizmo-ejes" viewBox="0 0 40 40" width="${tam}" height="${tam}" fill="none" aria-hidden="true">
    <circle cx="20" cy="20" r="3" fill="var(--tinta)"/>
    <line x1="20" y1="20" x2="34" y2="20" stroke="var(--eje-x)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="20" y1="20" x2="10" y2="30" stroke="var(--eje-y)" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="20" y1="20" x2="20" y2="6"  stroke="var(--eje-z)" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}

function renderNavbar() {
  const contenedor = document.getElementById("navbar-placeholder");
  if (!contenedor) return;

  const base = rutaBase();
  const basePaginas = rutaPaginas();
  const rutaActual = location.pathname.split("/").pop();

  const enlaces = ENLACES_NAV.map((e) => {
    const activo = e.href === rutaActual ? " activo" : "";
    return `<li><a href="${basePaginas}${e.href}" class="${activo.trim()}">${e.texto}</a></li>`;
  }).join("");

  contenedor.innerHTML = `
    <nav class="navbar-app" aria-label="Navegación principal">
      <div class="navbar-app__interior">
        <a href="${base}index.html" class="navbar-app__marca">
          ${gizmoEjesSVG()}
          SketchUp <span style="color:var(--texto-suave); font-weight:400;">de Cero a Experto</span>
        </a>

        <ul class="navbar-app__enlaces">
          ${enlaces}
        </ul>

        <div class="navbar-app__acciones">
          <button class="btn-icono" id="btn-buscar" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">
            <i data-lucide="search"></i>
          </button>
          <button class="btn-icono" id="btn-tema" aria-label="Cambiar tema claro/oscuro" title="Cambiar tema">
            <i data-lucide="moon"></i>
          </button>
          <button class="navbar-app__toggle-movil btn-icono" id="btn-menu-movil" aria-label="Abrir menú" aria-expanded="false">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
    </nav>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function renderFooter() {
  const contenedor = document.getElementById("footer-placeholder");
  if (!contenedor) return;

  const basePaginas = rutaPaginas();
  const anio = new Date().getFullYear();

  contenedor.innerHTML = `
    <footer class="footer-app">
      <div class="contenedor">
        <div class="footer-app__grid">
          <div>
            <div class="footer-app__marca">SketchUp de Cero a Experto</div>
            <p style="max-width:32ch;">Guía teórica y visual para dominar SketchUp, desde los primeros trazos hasta flujos de render profesionales.</p>
          </div>
          <div>
            <h4>Módulos</h4>
            <ul>
              <li><a href="${basePaginas}01-interfaz.html">Fundamentos</a></li>
              <li><a href="${basePaginas}04-materiales-texturas.html">Materiales</a></li>
              <li><a href="${basePaginas}08-render-vray-enscape.html">Render</a></li>
            </ul>
          </div>
          <div>
            <h4>Secciones</h4>
            <ul>
              <li><a href="${basePaginas}modulos.html">Todos los módulos</a></li>
              <li><a href="${basePaginas}funcionalidades.html">Funcionalidades</a></li>
              <li><a href="${basePaginas}glosario.html">Glosario</a></li>
              <li><a href="${basePaginas}recursos.html">Recursos gratuitos</a></li>
            </ul>
          </div>
          <div>
            <h4>Recursos</h4>
            <ul>
              <li><a href="https://help.sketchup.com" target="_blank" rel="noopener">Documentación oficial</a></li>
              <li><a href="https://extensions.sketchup.com" target="_blank" rel="noopener">Extension Warehouse</a></li>
              <li><a href="https://sketchucation.com" target="_blank" rel="noopener">Comunidad SketchUcation</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-app__base">
          <span>&copy; ${anio} SketchUp de Cero a Experto — proyecto educativo independiente.</span>
          <span class="etiqueta-eje eje-z">Sitio en construcción</span>
        </div>
      </div>
    </footer>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
});
