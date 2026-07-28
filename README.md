# SketchUp de Cero a Experto

Guía teórica y visual completa en español para dominar SketchUp, desde los primeros trazos hasta flujos de render profesionales. 10 módulos progresivos con diagramas SVG interactivos, quizzes de repaso, barra de progreso y modo claro/oscuro.

**[Ver la guía en línea](https://apaza-victor.github.io/Guia-de-Sketchup/)**

---

## Contenido

### Módulos del curso

| # | Módulo | Nivel | Tiempo |
|---|--------|-------|--------|
| 01 | [Interfaz y navegación](paginas/01-interfaz.html) | Principiante | 12 min |
| 02 | [Herramientas básicas](paginas/02-herramientas-basicas.html) | Principiante | 18 min |
| 03 | [Modelado sólido](paginas/03-modelado-solidos.html) | Principiante | 22 min |
| 04 | [Materiales y texturas](paginas/04-materiales-texturas.html) | Intermedio | 16 min |
| 05 | [Capas y etiquetas](paginas/05-capas-etiquetas.html) | Intermedio | 10 min |
| 06 | [Grupos y componentes](paginas/06-componentes-grupos.html) | Intermedio | 15 min |
| 07 | [LayOut — documentación técnica](paginas/07-layout-documentacion.html) | Intermedio | 25 min |
| 08 | [Render: V-Ray y Enscape](paginas/08-render-vray-enscape.html) | Avanzado | 30 min |
| 09 | [Extensiones y Ruby API](paginas/09-extensiones-ruby-api.html) | Avanzado | 28 min |
| 10 | [Flujos profesionales](paginas/10-flujos-profesionales.html) | Avanzado | 35 min |

---

## Características

- **10 módulos progresivos** — de principiante a experto, con teoría breve + ejercicios + quiz
- **Modo claro/oscuro** — persistente con localStorage, respeta prefers-color-scheme
- **Progreso guardado** — marca módulos completados sin crear cuenta (localStorage)
- **Sidebar de navegación** — panel de capas con indicador de progreso por módulo
- **Diagramas SVG** — ilustraciones interactivas de la interfaz, ejes, herramientas y flujos
- **Atajos de teclado** — tabla filtrable por Windows y Mac en cada módulo
- **Quizzes de repaso** — evaluaciones interactivas al final de cada módulo
- **Responsive completo** — funciona en móvil, tablet y escritorio
- **Accesibilidad** — skip-to-content, ARIA, contraste AA, prefers-reduced-motion
- **Sin dependencias de servidor** — funciona abriendo index.html directamente

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Estructura | HTML5 semántico |
| Grid/Layout | Bootstrap 5.3 (CDN) |
| Estilos | CSS3 + custom properties |
| Interactividad | JavaScript vanilla ES6+ |
| Iconos | Lucide Icons (CDN) |
| Animaciones | AOS — Animate on Scroll (CDN) |
| Fuentes | Space Grotesk + IBM Plex Sans + IBM Plex Mono (Google Fonts) |

---

## Estructura del proyecto

```
Guia-de-Sketchup/
├── index.html                     # Landing + hub de navegación
├── paginas/
│   ├── 01-interfaz.html
│   ├── 02-herramientas-basicas.html
│   ├── 03-modelado-solidos.html
│   ├── 04-materiales-texturas.html
│   ├── 05-capas-etiquetas.html
│   ├── 06-componentes-grupos.html
│   ├── 07-layout-documentacion.html
│   ├── 08-render-vray-enscape.html
│   ├── 09-extensiones-ruby-api.html
│   └── 10-flujos-profesionales.html
├── assets/
│   ├── css/
│   │   ├── variables.css          # Design tokens, paleta, tipografía
│   │   ├── base.css               # Reset, tipografía global, fondo papel
│   │   ├── componentes.css        # Navbar, footer, botones, tarjetas
│   │   └── paginas.css            # Layout módulos, sidebar, callouts, quiz
│   └── js/
│       ├── main.js                # Inicialización (Lucide, AOS, atajos)
│       ├── componentes.js         # Navbar + footer inyectados por JS
│       ├── tema.js                # Modo claro/oscuro con localStorage
│       ├── navegacion.js          # Menú móvil (offcanvas)
│       ├── progreso.js            # Sidebar + progreso de módulos
│       ├── quizzes.js             # Motor de quizzes interactivo
│       └── datos-modulos.js       # Datos de los 10 módulos (fuente única)
└── documentacion.md               # Documentación técnica completa
```

---

## Uso local

No se necesita servidor ni build. Solo abre `index.html` en tu navegador:

```bash
# Opcional: con Python
python -m http.server 8000
# Luego abre http://localhost:8000

# O con Node (si tienes npx)
npx serve .
```

---

## Despliegue en GitHub Pages

1. Sube los archivos al repositorio
2. Ve a **Settings → Pages**
3. Selecciona la rama `main` y carpeta raíz `/`
4. La guía estará disponible en: `https://apaza-victor.github.io/Guia-de-Sketchup/`

---

## Licencia

Proyecto educativo independiente. El contenido y código están disponibles para uso educativo.

---

## Créditos

- Diseño visual inspirado en la identidad de SketchUp (ejes rojo/verde/azul)
- Iconografía: [Lucide Icons](https://lucide.dev/)
- Animaciones: [AOS](https://michalsnik.github.io/aos/)
- Framework: [Bootstrap 5.3](https://getbootstrap.com/)
