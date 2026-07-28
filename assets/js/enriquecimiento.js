/**
 * enriquecimiento.js — Features SEO + UX para todas las páginas:
 * - JSON-LD schema (Course, BreadcrumbList, FAQPage)
 * - Breadcrumbs visuales
 * - Tabla de contenidos (TOC) en módulos
 * - Tiempo estimado de lectura + fecha última actualización
 * - Navegación anterior/siguiente entre módulos
 * - Botones de compartir (WhatsApp, X, LinkedIn)
 * - Barra de progreso en navbar
 */

(function () {
  "use strict";

  const BASE = "https://apaza-victor.github.io/Guia-de-Sketchup";
  const esPaginaModulo = /\/paginas\/\d{2}-/.test(location.pathname);
  const esPaginas = location.pathname.includes("/paginas/");
  const esIndex = location.pathname.endsWith("/index.html") || location.pathname.endsWith("/") || location.pathname.endsWith("\\Guia de Sketchup");

  function detectarModuloActual() {
    const m = location.pathname.match(/(\d{2})-/);
    if (!m) return null;
    return MODULOS.find((mod) => mod.id === m[1]) || null;
  }

  function indiceModuloActual() {
    const mod = detectarModuloActual();
    if (!mod) return -1;
    return MODULOS.findIndex((m) => m.id === mod.id);
  }

  /* ───────── JSON-LD ───────── */
  function inyectarJSONLD() {
    const head = document.head;

    if (esPaginaModulo) {
      const mod = detectarModuloActual();
      const idx = indiceModuloActual();
      if (!mod) return;

      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Course",
            "name": "SketchUp de Cero a Experto — " + mod.titulo,
            "description": document.querySelector('meta[name="description"]')?.content || "",
            "provider": { "@type": "Organization", "name": "SketchUp de Cero a Experto", "url": BASE },
            "educationalLevel": idx < 3 ? "Principiante" : idx < 7 ? "Intermedio" : "Avanzado",
            "inLanguage": "es",
            "isAccessibleForFree": true,
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "courseWorkload": "PT" + Math.round(document.body.innerText.split(/\s+/).length / 200) + "M"
            }
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE + "/" },
              { "@type": "ListItem", "position": 2, "name": "Módulos", "item": BASE + "/paginas/modulos.html" },
              { "@type": "ListItem", "position": 3, "name": mod.titulo }
            ]
          }
        ]
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      head.appendChild(script);
    } else if (esIndex) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "SketchUp de Cero a Experto",
        "description": document.querySelector('meta[name="description"]')?.content || "",
        "url": BASE,
        "inLanguage": "es",
        "potentialAction": {
          "@type": "SearchAction",
          "target": BASE + "/paginas/modulos.html?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      head.appendChild(script);
    }
  }

  /* ───────── Breadcrumbs ───────── */
  function renderBreadcrumbs() {
    const main = document.querySelector("main#contenido");
    if (!main) return;

    let items;
    if (esPaginaModulo) {
      const mod = detectarModuloActual();
      if (!mod) return;
      items = [
        { texto: "Inicio", href: esPaginas ? "../index.html" : "index.html" },
        { texto: "Módulos", href: esPaginas ? "modulos.html" : "paginas/modulos.html" },
        { texto: mod.titulo }
      ];
    } else if (esPaginas && location.pathname.includes("modulos.html")) {
      items = [
        { texto: "Inicio", href: "../index.html" },
        { texto: "Módulos" }
      ];
    } else if (esPaginas) {
      const titulo = document.title.split("—")[0]?.trim() || document.title.split("|")[0]?.trim();
      items = [
        { texto: "Inicio", href: "../index.html" },
        { texto: titulo }
      ];
    } else {
      return;
    }

    const nav = document.createElement("nav");
    nav.className = "breadcrumbs";
    nav.setAttribute("aria-label", "Breadcrumb");
    nav.innerHTML = items.map((item, i) => {
      const esUltimo = i === items.length - 1;
      if (esUltimo) {
        return `<span aria-current="page">${item.texto}</span>`;
      }
      const icono = (i === 0) ? `<i data-lucide="home" style="width:14px;height:14px"></i> ` : "";
      return `<a href="${item.href}">${icono}${item.texto}</a><span aria-hidden="true">›</span>`;
    }).join("");

    main.prepend(nav);
  }

  /* ───────── Tabla de contenidos (TOC) ───────── */
  function renderTOC() {
    if (!esPaginaModulo) return;
    const article = document.querySelector("article") || document.querySelector("main#contenido");
    if (!article) return;

    const headings = article.querySelectorAll("h2[id]");
    if (headings.length < 2) return;

    const toc = document.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "Tabla de contenidos");
    toc.innerHTML = `<h3 class="toc__titulo">En esta lección</h3><ul>${Array.from(headings).map(h =>
      `<li><a href="#${h.id}">${h.textContent.trim()}</a></li>`
    ).join("")}</ul>`;

    const firstH2 = article.querySelector("h2[id]");
    if (firstH2) {
      firstH2.parentNode.insertBefore(toc, firstH2);
    }
  }

  /* ───────── Tiempo de lectura + fecha ───────── */
  function renderMetaLectura() {
    if (!esPaginaModulo) return;
    const mod = detectarModuloActual();
    if (!mod) return;

    const main = document.querySelector("main#contenido");
    const texto = main?.innerText || "";
    const palabras = texto.split(/\s+/).length;
    const minutos = Math.max(1, Math.round(palabras / 200));

    const meta = document.createElement("div");
    meta.className = "meta-lectura";
    meta.innerHTML = `
      <span class="meta-lectura__item"><i data-lucide="clock" style="width:14px;height:14px"></i> ~${minutos} min de lectura</span>
      <span class="meta-lectura__item"><i data-lucide="calendar" style="width:14px;height:14px"></i> Última actualización: 28 jul 2026</span>
    `;

    const breadcrumbs = main.querySelector(".breadcrumbs");
    if (breadcrumbs) {
      breadcrumbs.after(meta);
    } else {
      main?.prepend(meta);
    }
  }

  /* ───────── Navegación anterior/siguiente ───────── */
  function renderNavModules() {
    if (!esPaginaModulo) return;
    const idx = indiceModuloActual();
    if (idx < 0) return;

    const article = document.querySelector("article") || document.querySelector("main#contenido");
    if (!article) return;

    const prev = idx > 0 ? MODULOS[idx - 1] : null;
    const next = idx < MODULOS.length - 1 ? MODULOS[idx + 1] : null;

    const nav = document.createElement("nav");
    nav.className = "nav-modulos";
    nav.setAttribute("aria-label", "Navegación entre módulos");
    nav.innerHTML = `
      <div class="nav-modulos__prev">
        ${prev ? `<a href="${esPaginas ? '' : 'paginas/'}${prev.href}"><i data-lucide="arrow-left" style="width:18px;height:18px"></i><span><small>Anterior</small>${prev.titulo}</span></a>` : ""}
      </div>
      <div class="nav-modulos__next">
        ${next ? `<a href="${esPaginas ? '' : 'paginas/'}${next.href}"><span><small>Siguiente</small>${next.titulo}</span><i data-lucide="arrow-right" style="width:18px;height:18px"></i></a>` : ""}
      </div>
    `;

    const quiz = article.querySelector(".quiz-box") || article.querySelector("[class*='quiz']");
    const footer = document.querySelector("#footer-placeholder") || document.querySelector("footer");
    if (quiz) {
      quiz.parentNode.insertBefore(nav, quiz.nextSibling);
    } else if (footer) {
      footer.parentNode.insertBefore(nav, footer);
    } else {
      article.appendChild(nav);
    }
  }

  /* ───────── Compartir ───────── */
  function renderShareButtons() {
    if (!esPaginaModulo) return;
    const mod = detectarModuloActual();
    if (!mod) return;

    const url = encodeURIComponent(BASE + "/paginas/" + mod.href);
    const texto = encodeURIComponent("Estoy aprendiendo SketchUp con esta guía: " + mod.titulo);

    const div = document.createElement("div");
    div.className = "share-buttons";
    div.innerHTML = `
      <span class="share-buttons__label">Compartir:</span>
      <a href="https://wa.me/?text=${texto}%20${url}" target="_blank" rel="noopener" aria-label="Compartir en WhatsApp" class="share-btn share-btn--wa"><i data-lucide="message-circle" style="width:16px;height:16px"></i></a>
      <a href="https://twitter.com/intent/tweet?url=${url}&text=${texto}" target="_blank" rel="noopener" aria-label="Compartir en X" class="share-btn share-btn--x"><i data-lucide="twitter" style="width:16px;height:16px"></i></a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" aria-label="Compartir en LinkedIn" class="share-btn share-btn--li"><i data-lucide="linkedin" style="width:16px;height:16px"></i></a>
    `;

    const navModules = document.querySelector(".nav-modulos");
    if (navModules) {
      navModules.parentNode.insertBefore(div, navModules);
    }
  }

  /* ───────── Barra de progreso en navbar ───────── */
  function renderProgressBar() {
    const navbar = document.querySelector(".navbar-app");
    if (!navbar || typeof progresoGuardado === "undefined") return;

    const completados = progresoGuardado().length;
    const total = MODULOS.length;
    const pct = Math.round((completados / total) * 100);

    const bar = document.createElement("div");
    bar.className = "progress-bar-nav";
    bar.innerHTML = `
      <div class="progress-bar-nav__fill" style="width:${pct}%"></div>
      <span class="progress-bar-nav__label">${completados}/${total} módulos</span>
    `;
    navbar.after(bar);
  }

  /* ───────── Init ───────── */
  function init() {
    inyectarJSONLD();
    renderBreadcrumbs();
    renderTOC();
    renderMetaLectura();
    renderNavModules();
    renderShareButtons();
    renderProgressBar();

    if (window.lucide) lucide.createIcons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
