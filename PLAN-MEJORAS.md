# Plan de mejoras de LibraEditor — comparativa con el mercado y roadmap

> Documento de trabajo (aprobado 2026-07-08). Deriva de comparar LibraEditor con los editores WYSIWYG
> del mercado. Se desarrolla **sprint a sprint / feature a feature**; antes de implementar cada
> feature se presenta el detalle y se espera aprobación. Marca cada casilla al completarla.
>
> **Invariantes**: núcleo ES5 sin dependencias (deps solo OPCIONALES y lazy si el consumidor
> activa la feature); el modelo `this.blocks` es un **array PLANO**; el **sanitizer** `_sanitizeBlock`
> ([libraeditor.js:15992](libraeditor.js:15992)) es allow-list destructivo → **toda propiedad/tipo nuevo debe
> registrarse ahí o se pierde en silencio**. Checklist por bloque nuevo: `VALID_BLOCK_TYPES` →
> `createBlockElement` → `render` (si agrupa) → **`_sanitizeBlock`** → `getHTML`/`getHTMLSource`/
> `getMarkdown` → slash menu + i18n.

---

## Comparativa (resumen)

LibraEditor ya cubre (paridad o mejor): bloques + JSON limpio (14 tipos), slash/@/#/emoji, formato
inline completo (incl. quitar enlace), tablas avanzadas, media (vídeo/audio/imagen), import/export
HTML·MD·JSON·texto + pegado Word, find&replace, fullscreen, show blocks, contador, RTL, outline,
temas dark/compact/custom, i18n es/en, styleFormats, listas anidadas, undo/redo, cross-block,
read-only, drag&drop, XSS.

Huecos priorizados (detalle y decisiones en el plan aprobado
`~/.claude/plans/analiza-los-editores-wysiwyg-composed-hickey.md`): autoformato Markdown en vivo,
sub/superíndice, callout, toggle, columnas, syntax highlight, fuente/tamaño/interlineado, caracteres
especiales, merge tags, imprimir/PDF/Word, autosave, TOC como bloque, salto de página.

---

## Sprint 1 — Mejoras limpias de alto ROI (bajo esfuerzo, bajo riesgo) ✅ COMPLETADO
- [x] **1.1 ✅ Subíndice / superíndice**: botones en toolbar y format menu (rama `wrapTag` →
  `_wrapSelectionInTag('sub'/'sup')` + `_persistActiveBlockContent`); cross-block vía
  `applyCrossBlockFormat('subscript'/'superscript')`; atajos `Ctrl+.`/`Ctrl+,`. Iconos + i18n.
  VERIFICADO: aplica/toggle y round-trip HTML/Markdown conservan `<sub>/<sup>`.
- [x] **1.2 ✅ Autosave / borrador**: opciones `autosave`+`autosaveKey`; debounce (~800ms) en
  `triggerChange` → `getJSON()` a localStorage (try/catch); timer cancelado en `destroy()`. API
  `hasDraft()`/`restoreDraft()` (vía sanitizer)/`clearDraft()`. NO auto-restaura.
  VERIFICADO: guarda tras el debounce, restaura vía loadFromJSON, no pisa `options.blocks`.
- [x] **1.3 ✅ Salto de página**: tipo `pageBreak` (VALID_BLOCK_TYPES + createBlockElement +
  _sanitizeBlock + getHTML/getHTMLSource/getMarkdown + slash menu + i18n + sets no-editable). Render
  `div.libraeditor-page-break` con marcador visual; CSS `@media print { break-after: page }`; export HTML
  = `<div class="libraeditor-page-break">`, MD = `<!-- pagebreak -->`. VERIFICADO: sobrevive al sanitizer en round-trip JSON.
- [x] **1.4 ✅ Fuente / tamaño / interlineado + caracteres especiales**: `line-height` añadido a
  `ALLOWED_CSS_PROPS` y `font-family`/`font-size`/`line-height` a `CONTENT_STYLE_PROPS` (sobreviven al
  export). Opción opt-in `fontControls` → `showFontMenu` (familia sin comillas, tamaños en lista
  cerrada, interlineado a todo el bloque) vía `_applyFontStyle`. Picker `showSpecialCharsMenu` inserta
  símbolos con `execCommand('insertText')`. VERIFICADO: los 3 estilos persisten y se exportan; el picker inserta.

## Sprint 2 — UX moderna y documentos (medio, riesgo bajo-medio) ✅ COMPLETADO
- [x] **2.1 ✅ Autoformato Markdown en vivo (reglas de bloque)**: en el handler de espacio de
  `handleKeyDown`, si el párrafo solo contiene un marcador → `changeBlockType`. `# ## ###`→heading,
  `- * +`→bullet, `1.`→number, `>`→quote, ` ``` `→code, `[] [x]`→checklist. Usa `_editableTextContent`
  (ignora cápsulas). VERIFICADO: todos convierten; texto normal no dispara. (commit `d5eaea3`)
- [x] **2.2 ✅ Callout / aviso**: tipo `callout` + `calloutVariant` (CALLOUT_VARIANTS, default info).
  Render `div.libraeditor-callout` (icono no editable que abre `showCalloutVariantMenu` + div editable);
  `_sanitizeBlock` (content + variante validada); export HTML = clase, MD = `> [!NOTE/TIP/WARNING/CAUTION]`;
  slash menu + i18n + CSS (4 variantes, texto con color explícito). VERIFICADO: round-trip sobrevive al
  sanitizer; variante inválida → info; cambio de variante y edición OK. (commit `9e695e6`)
- [x] **2.3 ✅ Imprimir + Word .doc**: `print()` abre ventana con `getSafeHTML()` + hoja de estilos de
  documento (`_documentStyles`) y lanza `print()`; `exportWord(name)` envuelve `getSafeHTML()` en header
  MHTML y descarga `.doc` vía Blob (sin librería). Opción opt-in `exportTools` (botones en toolbar) +
  `@media print` que oculta el chrome. VERIFICADO: Blob `application/msword` con cabecera+estilos+contenido.

## Sprint 3 — ERP y autoformato inline (medio, riesgo bajo-medio) ✅ COMPLETADO
- [x] **3.1 ✅ Merge tags / variables `{{campo}}`**: opción `mergeTags: [{id,name,label?}]`; inserción
  por trigger `{{` (menú filtrable) y botón de toolbar. Cápsula `span.libraeditor-mergetag[data-merge-name]`
  no editable. Sanitizer: clase en `ALLOWED_SPAN_CLASSES` + `data-merge-name` (regex `^[\w.]+$`) en
  `ATTR_WHITELIST.SPAN` + `_editableTextContent` + paste. Export: `getMarkdown`/`htmlToMarkdownInline`
  → `{{name}}`; `getResolvedHTML(valuesMap)` sustituye por el valor escapado (sin mutar el modelo).
  VERIFICADO: round-trip sobrevive al sanitizer, resolución escapa (sin XSS), name malicioso descartado. (commit `9cf58d2`)
- [x] **3.2 ✅ Autoformato inline**: `**x**`/`*x*`/`` `x` ``/`~~x~~` al cerrar + espacio → tag. Nuevo
  `_tryInlineAutoformat` (muta el DOM in situ, `pushHistory(true)`, `updateBlockContent`+`triggerChange`,
  sin re-render; no actúa en `code`). Reglas anti-falsos-positivos (contenido sin espacios en los bordes).
  VERIFICADO: los 4 patrones convierten; `2 * 3 * 4` y `**hola` no disparan. (commit `6207b09`)
- [x] **3.3 ✅ Export PDF**: helper `_loadScriptOnce` (deps lazy). Opción `pdfLib` (URL) + botón PDF en
  `exportTools`. `exportPdf(name)`: si hay `pdfLib` → carga lazy y genera desde `getSafeHTML()`; si no
  hay lib o falla → fallback a `print()`. VERIFICADO: fallback a print sin lib, botón presente, script inyectado.

## Sprint 4 — Mayor riesgo (medio, riesgo medio-alto) ✅ COMPLETADO
- [x] **4.1 ✅ Syntax highlight en código** (dep opcional lazy): opciones `codeHighlight`+`codeHighlightUrl`
  (highlight.js). Bloque code con `language` (set cerrado `CODE_LANGUAGES` + selector por bloque). **Modelo
  siempre texto plano**: el input lee `textContent` (marcador `data-libraeditor-code`), resalta al render y
  re-pinta al blur (`_highlightCode`/`_rehighlightCodeElement`); `_initCodeHighlight` carga la lib lazy.
  Export `class="language-xxx"` (HTML) y ` ```lang ` (MD); fallback a texto escapado. Tokens `.hljs-*`
  mapeados a variables de tema (self-contained). VERIFICADO: modelo plano tras editar, round-trip preserva
  language válido y descarta inválido, blur re-resalta, fallback sin lib. (commit `4419ba5`)
- [x] **4.2 ✅ Toggle / desplegable ligero**: tipo `toggle` (`content`+`toggleTitle`+`collapsed`). Render
  div propio con caret (no `<details>` nativo, que peleaba con la edición); editables dedicados
  (`_attachToggleEditable`) donde Enter no parte en bloques (cuerpo = salto nativo; título salta al cuerpo).
  `updateBlockField`/`toggleCollapse` sin re-render; `_persistActiveBlockContent` enruta al editable con la
  selección. Export a `<details>/<summary>`; MD degrada a `**título**` + cuerpo. VERIFICADO: colapso, edición
  por campo, round-trip sanea XSS, Enter contenido. (commit `c0130a7`)
- [x] **4.3 ✅ Tabla de contenidos como bloque**: tipo `toc` (content derivado, no editable). Render nav con
  enlaces por nivel (`_buildTocElement`/`_fillTocContent`, reusa `getHeadingsIndex`), clic → `navigateToHeading`;
  refresco en vivo desde `triggerChange` (`_refreshTocBlocks`). Export: títulos con id de ancla + `<nav>` con
  enlaces (`_buildTocHTML`); MD lista anidada `[texto](#slug)` (`_slugify`). VERIFICADO: refresco en vivo,
  navegación, round-trip content vacío, ids solo si hay TOC. (commit `88e266a`)

## No-objetivos (justificados)
- [ ] **Columnas / layout multi-columna**: choca con el array de bloques plano; desaconsejado sin
  refactor. Alternativas: tabla sin bordes o CSS `column-count` en el export.
- **Colaboración tiempo real / comentarios / historial de versiones**: requieren backend + CRDT; fuera de alcance.
- **Corrector ortográfico**: el del navegador ya lo cubre.

---

## Verificación (por feature)
- Preview (`.claude/serve.js` :8765): sin errores de consola, correcto en claro/oscuro.
- Serialización: **round-trip** `getJSON/getHTML/getMarkdown` → `loadFrom*`; el bloque/atributo debe
  **sobrevivir al sanitizer** (fallo silencioso más probable si se omite `_sanitizeBlock`).
- Deps lazy: sin activar la opción el núcleo funciona igual (fallback); la lib se carga una sola vez.

## Ficheros
`libraeditor.js` (sanitizer/whitelists, `createBlockElement`, `render`, `changeBlockType`, handlers,
export, tags, opciones; nuevo helper `_loadScriptOnce`), `libraeditor.css` (callout/toggle/page-break/
merge-tag, `@media print`, tokens highlight, `.libraeditor-lh-*`), `index.html` (demos), `README.md`/`CLAUDE.md`.
