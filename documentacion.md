# Documentación Técnica — "SketchUp de Cero a Experto"

Guía de arquitectura, stack y estructura de contenidos para una web educativa moderna, escalable y mantenible sobre SketchUp.

---

## 1. Visión general

| | |
|---|---|
| **Nombre del proyecto** | SketchUp de Cero a Experto |
| **Tipo** | Web estática de guía/teoría (sin backend) |
| **Público** | Principiantes absolutos → usuarios avanzados (arquitectura, diseño de interiores, modelado 3D) |
| **Idioma** | Español |
| **Objetivo** | Enseñar SketchUp de forma progresiva, visual e interactiva, replicando el nivel de acabado de tus proyectos anteriores (HTML de Cero a Experto, Python de Cero a Experto) |

---

## 2. Diferencia clave frente a tus proyectos anteriores

Tus guías previas de HTML y Python fueron **archivo único** (todo el CSS/JS embebido). Para SketchUp recomiendo pasar a una **arquitectura multi-archivo modular**, porque:

- El contenido de SketchUp es mucho más visual (capturas, diagramas de herramientas, atajos de teclado, viewports 3D) → necesitas organizar assets.
- "Escalable" en tu pedido implica poder añadir capítulos, quizzes o un módulo de renderizado (V-Ray, Enscape) sin que un solo archivo se vuelva inmanejable.
- Sigue siendo 100% estática: sin build tools, sin Node, todo servible abriendo `index.html` o subiendo a cualquier hosting.

---

## 3. Stack tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| Estructura | HTML5 semántico | Accesibilidad y SEO base |
| Layout / Grid | **Bootstrap 5.3** (CDN) | Sistema de grid responsivo, componentes base (navbar, offcanvas, cards, modales) sin reinventar la rueda |
| Estilos propios | CSS3 + variables (`:root`) | Theming (modo claro/oscuro), tipografía y paleta propias por encima de Bootstrap |
| Interactividad | JavaScript (Vanilla ES6+, modular) | Sin dependencia de frameworks pesados; módulos por función |
| Iconos | **Lucide Icons** (ya usado en HTML de Cero a Experto — consistencia entre tus proyectos) o alternativamente **Bootstrap Icons** si quieres 100% integración con Bootstrap | Iconografía limpia y ligera, SVG escalable |
| Animaciones | **AOS (Animate on Scroll)** para entradas de sección + transiciones CSS propias (`prefers-reduced-motion` respetado) | Movimiento sutil sin sobrecargar rendimiento |
| Código/atajos | **Prism.js** (opcional) para bloques de atajos de teclado o scripts de Ruby API de SketchUp | Resaltado de sintaxis si incluyes la sección de Ruby API/extensiones |
| Diagramas | SVG inline a medida (como en Python de Cero a Experto) | Explicar herramientas (Push/Pull, Follow Me, ejes) sin depender de imágenes pesadas |
| Fuentes | Google Fonts (ej. **Inter** o **Sora** para UI + **Poppins** para títulos) | Tipografía moderna, buena legibilidad en pantalla |

Todas las librerías vía CDN → cero instalación, cero build step.

---

## 4. Estructura de carpetas

```
sketchup-de-cero-a-experto/
│
├── index.html                  # Landing + hub de navegación general
├── /paginas/
│   ├── 01-interfaz.html        # Módulo 1: Interfaz y navegación
│   ├── 02-herramientas-basicas.html
│   ├── 03-modelado-solidos.html
│   ├── 04-materiales-texturas.html
│   ├── 05-capas-etiquetas.html
│   ├── 06-componentes-grupos.html
│   ├── 07-layout-documentacion.html
│   ├── 08-render-vray-enscape.html
│   ├── 09-extensiones-ruby-api.html
│   └── 10-flujos-profesionales.html
│
├── /assets/
│   ├── /css/
│   │   ├── variables.css       # Paleta, tipografía, espaciados
│   │   ├── base.css            # Reset + estilos globales
│   │   ├── componentes.css     # Cards, tabs, acordeones, badges de atajos
│   │   └── temas.css           # Modo claro/oscuro
│   │
│   ├── /js/
│   │   ├── main.js             # Punto de entrada, inicializa módulos
│   │   ├── navegacion.js       # Sidebar, menú responsive, progreso de módulos
│   │   ├── busqueda.js         # Buscador global (Ctrl+K)
│   │   ├── glosario.js         # Glosario filtrable de comandos/herramientas
│   │   ├── tema.js             # Toggle claro/oscuro con localStorage
│   │   └── quizzes.js          # Autoevaluaciones por módulo
│   │
│   ├── /img/                   # Capturas de pantalla, íconos de herramientas
│   ├── /svg/                   # Diagramas SVG propios (ejes, gizmos, viewport)
│   └── /data/
│       ├── glosario.json       # Términos y comandos de SketchUp
│       ├── atajos.json         # Atajos de teclado (Win/Mac)
│       └── indice-busqueda.json
│
└── /componentes/                # Fragmentos HTML reutilizables (navbar, footer)
    ├── navbar.html
    └── footer.html
```

> Si prefieres mantener el estilo "un solo archivo" de tus proyectos anteriores por simplicidad de despliegue, esta misma estructura de secciones puede colapsarse en un único `index.html` con anclas (`#modulo-1`, `#modulo-2`...) — la organización de contenidos abajo aplica igual.

---

## 5. Sistema de diseño

### 5.1 Paleta de colores sugerida
Inspirada en la identidad de SketchUp (evita clonar su marca, pero mantiene el espíritu de modelado 3D):

```css
:root {
  --color-primario: #1e6fd9;      /* azul técnico */
  --color-secundario: #ff8a3d;    /* naranja acento (herramientas activas) */
  --color-exito: #2ecc71;
  --color-fondo: #f7f9fc;
  --color-fondo-dark: #10131a;
  --color-texto: #1a1d24;
  --color-texto-dark: #e8eaf0;
  --radio-borde: 12px;
  --sombra-suave: 0 4px 16px rgba(0,0,0,0.06);
}
```

### 5.2 Tipografía
- Títulos: **Poppins** (600–700)
- Cuerpo: **Inter** (400–500)
- Atajos de teclado / código: **JetBrains Mono**

### 5.3 Componentes reutilizables (con Bootstrap como base)
- **Sidebar de navegación** por módulos con indicador de progreso (checkbox visual por sección completada, guardado en `localStorage`)
- **Tarjetas de herramienta** (ícono + nombre + atajo + descripción corta) para la barra de herramientas de SketchUp
- **Tabs** (Bootstrap `nav-tabs`) para comparar flujos: ej. "Modelado desde cero" vs "Modelado desde CAD importado"
- **Acordeones** para FAQs y detalles avanzados sin saturar la página
- **Badges de atajos de teclado** (`<kbd>`) estilizados
- **Callouts** tipo "Tip", "Advertencia", "Atajo pro" con color e ícono distintivo
- **Comparador antes/después** (slider de imagen) para mostrar resultados de render

---

## 6. Estructura pedagógica del contenido (de cero a experto)

1. **Fundamentos**: interfaz, ejes, navegación de cámara (orbitar, paneo, zoom)
2. **Herramientas básicas**: línea, rectángulo, círculo, Push/Pull, Follow Me, Offset
3. **Modelado sólido**: operaciones booleanas, sólidos, edición de geometría compleja
4. **Organización**: grupos, componentes, capas/etiquetas (tags), escenas
5. **Materiales y texturas**: aplicación, mapeo UV básico, edición de materiales
6. **Documentación técnica**: LayOut (planos, vistas, anotaciones, escalas)
7. **Renderizado**: integración con V-Ray, Enscape o Twinmotion; iluminación, materiales PBR
8. **Extensiones y automatización**: Extension Warehouse, introducción a Ruby API
9. **Flujos profesionales**: arquitectura, interiorismo, mobiliario, impresión 3D
10. **Casos prácticos guiados**: proyecto completo paso a paso (de boceto a render final)

Cada módulo debería incluir: teoría breve → diagrama/GIF o captura → mini-ejercicio → quiz de repaso → atajos relacionados.

---

## 7. Funcionalidades interactivas recomendadas

- 🔍 **Búsqueda global** (Ctrl+K) sobre glosario, herramientas y atajos
- 🌗 **Modo claro/oscuro** persistente
- 📊 **Barra de progreso** por módulo (guardada en `localStorage`, sin backend)
- 📖 **Glosario filtrable** de comandos y términos técnicos
- ⌨️ **Tabla de atajos de teclado** filtrable por Windows/Mac
- ✅ **Quizzes cortos** al final de cada módulo (JS puro, sin backend)
- 🖼️ **Comparador de renders** (slider antes/después)
- 📱 **Responsive completo**: mínimo 5 breakpoints (igual que Python de Cero a Experto)

---

## 8. Accesibilidad y SEO (mismo estándar que tus proyectos previos)

- Atributos ARIA en navegación, tabs y acordeones
- Skip-to-content link
- Contraste AA mínimo en ambos temas
- `prefers-reduced-motion` respetado en todas las animaciones de AOS
- Schema.org JSON-LD tipo `Course` / `LearningResource`
- Meta tags Open Graph para compartir cada módulo
- Texto alternativo descriptivo en todas las capturas de pantalla

---

## 9. Rendimiento

- Bootstrap y librerías vía CDN con `defer`/`async`
- Imágenes en formato **WebP** con `loading="lazy"`
- SVG en línea para diagramas (evita peticiones HTTP extra)
- JS dividido en módulos ES6 (`type="module"`) para carga bajo demanda por página
- Evitar animaciones pesadas en scroll (usar `IntersectionObserver` en vez de librerías pesadas si el proyecto crece)

---

## 10. Roadmap de desarrollo sugerido

| Fase | Entregable |
|---|---|
| 1 | Estructura base + sistema de diseño (variables CSS, tipografía, navbar/footer) |
| 2 | Módulos 1–3 (fundamentos y herramientas básicas) con diagramas SVG |
| 3 | Buscador global + glosario + modo oscuro |
| 4 | Módulos 4–7 (organización, materiales, LayOut, render) |
| 5 | Quizzes + barra de progreso |
| 6 | Módulos 8–10 (extensiones, Ruby API, flujos profesionales) |
| 7 | Pulido de accesibilidad, SEO y rendimiento final |

---

## 11. Recursos externos a enlazar

- Documentación oficial de SketchUp (help.sketchup.com)
- SketchUp Extension Warehouse
- Comunidad SketchUcation
- Canales de YouTube de referencia en modelado y render
- Ruby API Reference oficial (para el módulo de extensiones)

---

**Siguiente paso sugerido**: definir si el proyecto será multi-archivo (recomendado, arriba) o archivo único como tus guías anteriores, y empezar por la Fase 1 del roadmap.
