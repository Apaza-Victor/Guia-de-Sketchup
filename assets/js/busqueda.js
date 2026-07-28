/**
 * busqueda.js — Buscador global (Ctrl+K / Cmd+K).
 * Inyecta un modal de búsqueda que indexa módulos, glosario y atajos.
 * Funciona sin servidor (file://) porque los datos están embebidos.
 */

const DATOS_BUSQUEDA = [
  // ── Módulos ──
  { titulo: "Interfaz y navegación", desc: "Anatomía de la pantalla, ejes X/Y/Z, orbitar, paneo, zoom", url: "paginas/01-interfaz.html", tipo: "módulo", modulo: "01" },
  { titulo: "Herramientas básicas", desc: "Línea, Rectángulo, Círculo, Empujar/Tirar, Seguir, Desplazar", url: "paginas/02-herramientas-basicas.html", tipo: "módulo", modulo: "02" },
  { titulo: "Modelado sólido", desc: "Operaciones booleanas, intersección, recorte, sustracción", url: "paginas/03-modelado-solidos.html", tipo: "módulo", modulo: "03" },
  { titulo: "Materiales y texturas", desc: "Aplicación, mapeo UV, edición de materiales, opacidad", url: "paginas/04-materiales-texturas.html", tipo: "módulo", modulo: "04" },
  { titulo: "Capas y etiquetas (Tags)", desc: "Organización por etiquetas, escenas, visibilidad", url: "paginas/05-capas-etiquetas.html", tipo: "módulo", modulo: "05" },
  { titulo: "Grupos y componentes", desc: "Aislamiento de geometría, instancias vinculadas, Outliner", url: "paginas/06-componentes-grupos.html", tipo: "módulo", modulo: "06" },
  { titulo: "LayOut — documentación técnica", desc: "Planos a escala, vistas, anotaciones, exportación PDF", url: "paginas/07-layout-documentacion.html", tipo: "módulo", modulo: "07" },
  { titulo: "Render: V-Ray y Enscape", desc: "Iluminación, materiales PBR, configuración de cámara", url: "paginas/08-render-vray-enscape.html", tipo: "módulo", modulo: "08" },
  { titulo: "Extensiones y Ruby API", desc: "Extension Warehouse, instalar .rbz, consola Ruby", url: "paginas/09-extensiones-ruby-api.html", tipo: "módulo", modulo: "09" },
  { titulo: "Flujos profesionales", desc: "Arquitectura, interiorismo, impresión 3D, proyecto guiado", url: "paginas/10-flujos-profesionales.html", tipo: "módulo", modulo: "10" },

  // ── Glosario ──
  { titulo: "Push/Pull (Empujar/Tirar)", desc: "Extruye una cara plana para crear volumen", url: "paginas/02-herramientas-basicas.html", tipo: "herramienta" },
  { titulo: "Follow Me (Seguir)", desc: "Extruye una cara a lo largo de una trayectoria", url: "paginas/02-herramientas-basicas.html", tipo: "herramienta" },
  { titulo: "Offset (Desplazar)", desc: "Crea una copia paralela de un contorno", url: "paginas/02-herramientas-basicas.html", tipo: "herramienta" },
  { titulo: "Orbit", desc: "Gira la cámara alrededor del modelo", url: "paginas/01-interfaz.html", tipo: "herramienta" },
  { titulo: "Pan (Paneo)", desc: "Desplaza la cámara sin rotarla", url: "paginas/01-interfaz.html", tipo: "herramienta" },
  { titulo: "Zoom Extents", desc: "Encuadra todo el modelo en la vista", url: "paginas/01-interfaz.html", tipo: "herramienta" },
  { titulo: "Group (Grupo)", desc: "Contenedor que aísla geometría para evitar pegado", url: "paginas/06-componentes-grupos.html", tipo: "concepto" },
  { titulo: "Component", desc: "Grupo con instancias vinculadas: editar una edita todas", url: "paginas/06-componentes-grupos.html", tipo: "concepto" },
  { titulo: "Tag (Etiqueta)", desc: "Capa para organizar y controlar visibilidad de elementos", url: "paginas/05-capas-etiquetas.html", tipo: "concepto" },
  { titulo: "Scene (Escena)", desc: "Guarda un estado del modelo: cámara, visibilidad, estilo", url: "paginas/05-capas-etiquetas.html", tipo: "concepto" },
  { titulo: "Outliner", desc: "Panel que muestra la jerarquía de grupos y componentes", url: "paginas/01-interfaz.html", tipo: "panel" },
  { titulo: "Entity Info", desc: "Propiedades del elemento seleccionado", url: "paginas/01-interfaz.html", tipo: "panel" },
  { titulo: "Solid Inspector", desc: "Extensión que detecta y corrige errores de geometría sólida", url: "paginas/10-flujos-profesionales.html", tipo: "extensión" },
  { titulo: "V-Ray", desc: "Motor de render offline con control total de iluminación y materiales", url: "paginas/08-render-vray-enscape.html", tipo: "herramienta" },
  { titulo: "Enscape", desc: "Render en tiempo real integrado en SketchUp", url: "paginas/08-render-vray-enscape.html", tipo: "herramienta" },
  { titulo: "LayOut", desc: "Programa para crear planos técnicos y documentación desde SketchUp", url: "paginas/07-layout-documentacion.html", tipo: "herramienta" },
  { titulo: "Inferencing", desc: "Sistema de colores de SketchUp que indica alineación con ejes", url: "paginas/01-interfaz.html", tipo: "concepto" },
  { titulo: "Extrusión", desc: "Proceso de dar volumen a una cara plana con Push/Pull", url: "paginas/02-herramientas-basicas.html", tipo: "concepto" },
  { titulo: "Operaciones booleanas", desc: "Unión, intersección, recorte y sustracción entre sólidos", url: "paginas/03-modelado-solidos.html", tipo: "concepto" },
  { titulo: "Mapeo UV", desc: "Control de cómo se proyecta una textura sobre una superficie", url: "paginas/04-materiales-texturas.html", tipo: "concepto" },
  { titulo: "PBR", desc: "Physically Based Rendering — modelo de materiales fotorrealistas", url: "paginas/08-render-vray-enscape.html", tipo: "concepto" },
  { titulo: "Ruby API", desc: "API de programación para crear extensiones en SketchUp", url: "paginas/09-extensiones-ruby-api.html", tipo: "concepto" },
  { titulo: "Extension Warehouse", desc: "Tienda oficial de extensiones para SketchUp", url: "paginas/09-extensiones-ruby-api.html", tipo: "concepto" },

  // ── Atajos de teclado ──
  { titulo: "L — Línea", desc: "Activa la herramienta Línea", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "R — Rectángulo", desc: "Activa la herramienta Rectángulo", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "C — Círculo", desc: "Activa la herramienta Círculo", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "P — Empujar/Tirar", desc: "Activa la herramienta Empujar/Tirar", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "F — Desplazar (Offset)", desc: "Activa la herramienta Desplazar", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "M — Mover", desc: "Activa la herramienta Mover", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "Q — Rotar", desc: "Activa la herramienta Rotar", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "S — Escalar", desc: "Activa la herramienta Escalar", url: "paginas/02-herramientas-basicas.html", tipo: "atajo" },
  { titulo: "O — Órbita", desc: "Activa la herramienta Órbita", url: "paginas/01-interfaz.html", tipo: "atajo" },
  { titulo: "H — Panear", desc: "Activa la herramienta Paneo", url: "paginas/01-interfaz.html", tipo: "atajo" },
  { titulo: "Ctrl+Z — Deshacer", desc: "Deshace la última acción", url: "paginas/01-interfaz.html", tipo: "atajo" },
  { titulo: "Ctrl+G — Crear grupo", desc: "Agrupa la geometría seleccionada", url: "paginas/06-componentes-grupos.html", tipo: "atajo" },
  { titulo: "G — Crear componente", desc: "Crea un componente de la selección", url: "paginas/06-componentes-grupos.html", tipo: "atajo" },
  { titulo: "Mayús+Z — Zoom extents", desc: "Encuadra todo el modelo en la vista", url: "paginas/01-interfaz.html", tipo: "atajo" },
];

let modalBusqueda = null;

function rutaBaseBusqueda() {
  return location.pathname.includes("/paginas/") ? "../" : "";
}

function crearModalBusqueda() {
  if (modalBusqueda) return;

  const modal = document.createElement("div");
  modal.id = "modal-busqueda";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Buscar en la guía");
  modal.style.cssText = `
    position:fixed; inset:0; z-index:2000;
    display:none; align-items:flex-start; justify-content:center;
    padding-top:12vh;
  `;

  modal.innerHTML = `
    <div class="busqueda-backdrop" style="
      position:absolute; inset:0;
      background:rgba(0,0,0,0.5); backdrop-filter:blur(4px);
    "></div>
    <div class="busqueda-modal" style="
      position:relative; width:100%; max-width:580px;
      background:var(--bg); border:1px solid var(--borde);
      border-radius:var(--radio-lg); box-shadow:var(--sombra-media);
      overflow:hidden; margin:0 var(--sp-4);
    ">
      <div style="display:flex; align-items:center; padding:var(--sp-3) var(--sp-4); border-bottom:1px solid var(--borde); gap:var(--sp-3);">
        <i data-lucide="search" style="width:18px;height:18px;color:var(--texto-suave);flex-shrink:0;"></i>
        <input id="busqueda-input" type="text" placeholder="Buscar módulos, herramientas, atajos..."
          style="flex:1; border:none; outline:none; background:transparent; font:inherit; font-size:var(--tam-md); color:var(--texto);"
          autocomplete="off" aria-label="Escriba para buscar">
        <kbd style="font-size:var(--tam-xs);">Esc</kbd>
      </div>
      <div id="busqueda-resultados" style="max-height:360px; overflow-y:auto; padding:var(--sp-2);"></div>
      <div id="busqueda-vacio" style="padding:var(--sp-8); text-align:center; color:var(--texto-suave); font-size:var(--tam-sm); display:none;">
        Escribe al menos 2 caracteres para buscar.
      </div>
      <div id="busqueda-sin-resultados" style="padding:var(--sp-8); text-align:center; color:var(--texto-suave); font-size:var(--tam-sm); display:none;">
        No se encontraron resultados.
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  modalBusqueda = modal;

  if (window.lucide) window.lucide.createIcons();

  const input = modal.querySelector("#busqueda-input");
  const resultados = modal.querySelector("#busqueda-resultados");
  const vacio = modal.querySelector("#busqueda-vacio");
  const sinResultados = modal.querySelector("#busqueda-sin-resultados");
  const backdrop = modal.querySelector(".busqueda-backdrop");

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      resultados.innerHTML = "";
      vacio.style.display = "block";
      sinResultados.style.display = "none";
      return;
    }
    vacio.style.display = "none";

    const base = rutaBaseBusqueda();
    const filtrados = DATOS_BUSQUEDA.filter((item) => {
      const texto = `${item.titulo} ${item.desc} ${item.tipo}`.toLowerCase();
      return texto.includes(q);
    });

    if (filtrados.length === 0) {
      resultados.innerHTML = "";
      sinResultados.style.display = "block";
      return;
    }
    sinResultados.style.display = "none";

    resultados.innerHTML = filtrados.map((item) => {
      const iconos = { módulo: "book-open", herramienta: "wrench", herramienta: "wrench", concepto: "lightbulb", panel: "sidebar", atajo: "keyboard", extensión: "puzzle" };
      const icono = iconos[item.tipo] || "file-text";
      return `
        <a href="${base}${item.url}" class="busqueda-item" style="
          display:flex; align-items:center; gap:var(--sp-3);
          padding:var(--sp-3) var(--sp-4); border-radius:var(--radio-md);
          color:var(--texto); text-decoration:none;
          transition: background 0.1s ease;
        " onmouseover="this.style.background='var(--bg-alt)'" onmouseout="this.style.background='transparent'">
          <i data-lucide="${icono}" style="width:16px;height:16px;color:var(--texto-suave);flex-shrink:0;"></i>
          <div style="min-width:0;">
            <div style="font-weight:600; font-size:var(--tam-sm); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.titulo}</div>
            <div style="font-size:var(--tam-xs); color:var(--texto-suave); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.desc}</div>
          </div>
          <span style="margin-left:auto; font-family:var(--fuente-mono); font-size:var(--tam-xs); color:var(--texto-suave); flex-shrink:0;">${item.tipo}</span>
        </a>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  });

  function abrirBusqueda() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    input.value = "";
    input.focus();
    vacio.style.display = "block";
    sinResultados.style.display = "none";
    resultados.innerHTML = "";
  }

  function cerrarBusqueda() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  backdrop.addEventListener("click", cerrarBusqueda);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      cerrarBusqueda();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("#btn-buscar")) {
      e.preventDefault();
      e.stopPropagation();
      abrirBusqueda();
    }
  });

  window._abrirBusqueda = abrirBusqueda;
}

document.addEventListener("DOMContentLoaded", crearModalBusqueda);
