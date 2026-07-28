/**
 * glosario.js — Glosario filtrable de términos y herramientas de SketchUp.
 * Datos embebidos para funcionar sin servidor (file://).
 */

const GLOSARIO = [
  { term: "Push/Pull", termEn: "Push/Pull", def: "Extruye una cara plana para crear volumen. La herramienta más característica de SketchUp.", mod: "02" },
  { term: "Follow Me", termEn: "Follow Me", def: "Extruye una cara a lo largo de una trayectoria de aristas. Ideal para molduras y tuberías.", mod: "02" },
  { term: "Offset", termEn: "Offset", def: "Crea una copia paralela de un contorno hacia adentro o afuera.", mod: "02" },
  { term: "Orbitar", termEn: "Orbit", def: "Girar la cámara alrededor del modelo. Botón central del ratón.", mod: "01" },
  { term: "Paneo", termEn: "Pan", def: "Desplazar la cámara sin rotarla. Mayús + botón central.", mod: "01" },
  { term: "Zoom Extents", termEn: "Zoom Extents", def: "Encuadra todo el modelo visible en la ventana. Atajo: Mayús+Z.", mod: "01" },
  { term: "Inferencing", termEn: "Inference", def: "Sistema de SketchUp que muestra colores (rojo/verde/azul) para indicar alineación con ejes.", mod: "01" },
  { term: "Grupo", termEn: "Group", def: "Contenedor que aísla geometría para que no se pegue con otra. Ctrl+G.", mod: "06" },
  { term: "Componente", termEn: "Component", def: "Grupo con instancias vinculadas. Editar una actualiza todas las copias.", mod: "06" },
  { term: "Instancia", termEn: "Instance", def: "Copia de un componente vinculada al original. Comparten la misma definición.", mod: "06" },
  { term: "Explode", termEn: "Explode", def: "Convierte un grupo/componente de vuelta en geometría suelta.", mod: "06" },
  { term: "Tag (Etiqueta)", termEn: "Tag", def: "Sistema de capas para organizar y controlar visibilidad de elementos. Antes se llamaba 'Layer'.", mod: "05" },
  { term: "Escena", termEn: "Scene", def: "Guarda un estado del modelo: posición de cámara, visibilidad de tags, estilo de vista.", mod: "05" },
  { term: "Outliner", termEn: "Outliner", def: "Panel que muestra la jerarquía de grupos y componentes del modelo.", mod: "01" },
  { term: "Entity Info", termEn: "Entity Info", def: "Panel que muestra propiedades del elemento seleccionado: tipo, capa, material.", mod: "01" },
  { term: "Plano de sección", termEn: "Section Plane", def: "Herramienta que corta el modelo para mostrar el interior. Usado en planos de planta.", mod: "05" },
  { term: "Solid", termEn: "Solid", def: "Geometría completamente cerrada sin caras invertidas ni bordes sueltos. Requerido para booleanas.", mod: "03" },
  { term: "Booleana", termEn: "Boolean", def: "Operación entre sólidos: unión, intersección, recorte o sustracción.", mod: "03" },
  { term: "Mapeo UV", termEn: "UV Mapping", def: "Control de cómo se proyecta una textura sobre una superficie 3D.", mod: "04" },
  { term: "PBR", termEn: "Physically Based Rendering", def: "Modelo de materiales que simula interacción luz-materia de forma físicamente precisa.", mod: "08" },
  { term: "Roughness", termEn: "Roughness", def: "Parámetro PBR que controla cuán mate o brillante es una superficie.", mod: "08" },
  { term: "Metalness", termEn: "Metalness", def: "Parámetro PBR que indica si un material es metálico o dieléctrico.", mod: "08" },
  { term: "LayOut", termEn: "LayOut", def: "Programa incluido con SketchUp Pro para crear planos técnicos y documentación.", mod: "07" },
  { term: "V-Ray", termEn: "V-Ray", def: "Motor de render offline de alta calidad para SketchUp.", mod: "08" },
  { term: "Enscape", termEn: "Enscape", def: "Plugin de render en tiempo real integrado en SketchUp.", mod: "08" },
  { term: "Extension Warehouse", termEn: "Extension Warehouse", def: "Tienda oficial de extensiones para SketchUp.", mod: "09" },
  { term: "Ruby API", termEn: "Ruby API", def: "API de programación para automatizar SketchUp y crear extensiones.", mod: "09" },
  { term: "Solid Inspector", termEn: "Solid Inspector", def: "Extensión gratuita que detecta y corrige errores en geometría sólida.", mod: "10" },
  { term: "FOV", termEn: "Field of View", def: "Ángulo de visión de la cámara. 60°-80° recomendado para interiores.", mod: "08" },
  { term: "Exposure", termEn: "Exposure", def: "Control de brillo del render. Ajusta según la iluminación de la escena.", mod: "08" },
];

function renderGlosarioFiltrable(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="glosario-filtro" style="margin-bottom:var(--sp-4);">
      <input type="text" id="glosario-input" placeholder="Filtrar términos..."
        style="width:100%; padding:var(--sp-3) var(--sp-4); border:1px solid var(--borde);
        border-radius:var(--radio-md); background:var(--bg); color:var(--texto);
        font:inherit; font-size:var(--tam-sm); outline:none;"
        aria-label="Filtrar glosario">
    </div>
    <div id="glosario-lista" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:var(--sp-4);"></div>
  `;

  const lista = contenedor.querySelector("#glosario-lista");
  const input = contenedor.querySelector("#glosario-input");

  function renderLista(filtro) {
    const f = (filtro || "").toLowerCase();
    const filtrados = GLOSARIO.filter((item) => {
      const texto = `${item.term} ${item.termEn} ${item.def}`.toLowerCase();
      return !f || texto.includes(f);
    });

    lista.innerHTML = filtrados.map((item) => `
      <div class="panel-item" style="padding:var(--sp-4);">
        <h4 style="font-size:var(--tam-sm); margin-bottom:var(--sp-1); display:flex; align-items:center; gap:var(--sp-2);">
          <span style="color:var(--eje-z);">${item.term}</span>
          <span style="font-family:var(--fuente-mono); font-size:var(--tam-xs); color:var(--texto-suave); font-weight:400;">${item.termEn}</span>
        </h4>
        <p style="font-size:var(--tam-xs); margin:0;">${item.def}</p>
        <span style="font-family:var(--fuente-mono); font-size:0.7rem; color:var(--texto-suave);">Mód. ${item.mod}</span>
      </div>
    `).join("");
  }

  renderLista("");
  input.addEventListener("input", () => renderLista(input.value));
}
