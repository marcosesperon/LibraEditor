# Plan de implementación — Revisión completa de LibraEditor

> Documento de trabajo derivado de la revisión completa del componente (JS/CSS/demo/docs).
> Se desarrolla **fase a fase**, solo cuando se indique. Marca cada tarea al completarla.
> Leyenda de verificación: ✅ = reproducido en vivo en navegador durante la revisión.
>
> **Restricción transversal**: todo el código es **ES5** (`var`, `function`, sin
> `const`/`let`/arrow/template literals/`Promise`). Ninguna corrección debe modernizar la sintaxis.

---

## Fase 0 — Cambio pendiente en el working tree

Antes de empezar, hay un cambio sin commitear en `libraeditor.css` (márgenes de títulos).
Es cosmético y coherente; decidir si se commitea aparte o se integra en la Fase 5 (CSS).

- [ ] Revisar/commitear el ajuste de márgenes de `h1`/`h2`/`h3` en [libraeditor.css:436](libraeditor.css:436).

---

## Fase 1 — Seguridad y datos (CRÍTICO) 🔴

Máxima prioridad: afectan a la integridad de datos y a la seguridad de cualquier consumidor real.
Los tres primeros están **reproducidos en vivo**.

- [x] **1.1 ✅ `getSafeHTML()` devuelve cadena vacía.** RESUELTO. Se separó el flag `tableInnards`
  (controla el wrapper `<table>`) de `allowTable` (permite tags de tabla). `getSafeHTML` ya no envuelve
  en `<table>` → sin foster parenting. → [libraeditor.js:15812](libraeditor.js:15812) (`_sanitizeBlockContent`), call sites en [libraeditor.js:16114](libraeditor.js:16114) y [libraeditor.js:16228](libraeditor.js:16228).
  - VERIFICADO en vivo: devuelve `<h1>...<p>...<ul>...<table>...` completo.

- [x] **1.2 ✅ XSS en pegado. RESUELTO.**
  - `href`: valida con `_isSafeUrl`; si no es seguro emite `href="#"`. → [libraeditor.js:5774](libraeditor.js:5774).
  - `data-tag-color`: el style construido pasa por `_sanitizeStyle` (elimina `position`/`inset`, etc.). → [libraeditor.js:5746](libraeditor.js:5746).
  - VERIFICADO: `javascript:`→`#`, https legítimo intacto, inyección CSS eliminada.

- [x] **1.3 ✅ Desincronización modelo↔DOM. RESUELTO.** Nuevo helper `_persistActiveBlockContent()`
  ([libraeditor.js:10537](libraeditor.js:10537)) llamado desde `applyTextColor`, `applyBackgroundColor`,
  `removeTextColor`, `removeBackgroundColor`, `createLink` y las dos ramas de `applyCaseTransform`.
  Maneja bloque tabla (persiste la tabla, no la celda).
  - VERIFICADO: color y mayúsculas persisten al modelo y sobreviven a `changeBlockType`.
  - ⚠️ **Hallazgo relacionado (fuera de Fase 1)**: `getHTML()`/`getSafeHTML()` hacen strip del `style`
    en spans genéricos, así que el color de texto/fondo se pierde en esos dos exports (sí se conserva en
    `getJSON` y en el modelo). Es preexistente. Candidato a nueva tarea (ver "Pendientes descubiertos").

- [x] **1.4 ✅ Paste en celdas de tabla se saltaba la sanitización. RESUELTO.** Listener `paste` en la
  celda que sanea a inline seguro (`sanitizeHTML`) o texto plano escapado antes de insertar. → [libraeditor.js:6558](libraeditor.js:6558).
  - VERIFICADO: pegar `javascript:`/estilos Word en celda queda saneado en el modelo.

- [x] **1.5 ✅ `loadFromJSON([])` dejaba el editor sin bloques. RESUELTO.** Garantía de párrafo mínimo
  igual que `loadFromHTML`. → [libraeditor.js:11621](libraeditor.js:11621).
  - VERIFICADO: `loadFromJSON([])` deja 1 párrafo.

### Pendientes descubiertos durante la Fase 1
- [x] **`getHTML`/`getSafeHTML` hacían strip del color de texto/fondo** (spans genéricos). RESUELTO.
  Nuevo whitelist `CONTENT_STYLE_PROPS` (color/background-color) + helper `_filterContentStyle`;
  `_stripNonNativeStyles` ahora filtra el style en vez de borrarlo entero. → [libraeditor.js:17394](libraeditor.js:17394).
  - VERIFICADO: color/fondo se conservan, `margin`/`font-family` (junk Word) se descartan, inyección
    `position:fixed;inset:0` bloqueada.

---

## Fase 2 — Bugs funcionales visibles (CRÍTICO/ALTO) 🔴🟠

- [x] **2.1 ✅ Click en menús con filtro insertaba el ítem equivocado. RESUELTO.** Nuevo helper
  `_resolveMenuFullIndex(menu, selector, visualIndex)` que traduce el índice visual (teclado) al real
  (`data-index`). `selectSlashMenuItem`/`selectMentionItem`/`selectEmojiItem`/`selectTagItem` ahora
  reciben SIEMPRE el índice real e indexan el array completo (`slashMenuTypes`/`mentions`/
  `LIBRAEDITOR_EMOJIS`/`tags`); los 4 handlers Enter convierten con el helper. → [libraeditor.js:14690](libraeditor.js:14690).
  - VERIFICADO: filtrar menciones por "car" y clicar inserta "Carlos Ruiz"; resolver mapea visual→real correctamente.

- [x] **2.2 ✅ Resize de imagen en celda roto al 2º uso + fuga. RESUELTO.** Portado el patrón de
  `createImageElement`: los listeners `mousemove`/`mouseup` se registran dentro de `onmousedown` y se
  quitan en `mouseup` (antes se registraban al insertar y se quitaban tras el 1er resize). → [libraeditor.js:2629](libraeditor.js:2629).
  - `editImageInTableCell` es un modal, no tenía el bug.

- [x] **2.3 ✅ Soltar archivo no-imagen navegaba fuera. RESUELTO.** `_imageDropHandler` ahora hace
  `preventDefault()`/`stopPropagation()` SIEMPRE que el drop es de ficheros, aunque ninguno sea imagen. → [libraeditor.js:1648](libraeditor.js:1648).

- [x] **2.4 ✅ Contador "1 min min". RESUELTO.** `updateCharCounter`: `timeEl.textContent = readingTime`
  (sin añadir `' min'`). → [libraeditor.js:14843](libraeditor.js:14843).
  - VERIFICADO: barra muestra "1 min".

- [x] **2.5 ✅ Find & Replace persistía resaltados. RESUELTO.** `_replaceCurrent` llama
  `_clearSearchHighlights()` antes de leer `innerHTML` (y luego `_searchInEditor` los reconstruye);
  quitado el `triggerChange` redundante. `_replaceAll` ya quedaba limpio. → [libraeditor.js:15105](libraeditor.js:15105).
  - VERIFICADO: reemplazar 1 de 3 → `getHTML` sin `libraeditor-search-highlight`.

- [x] **2.6 ✅ Detección inicial de dark mode rompía el listener. RESUELTO.** Flag `v_theme_explicito`
  capturada antes de la autodetección; el listener `matchMedia` se instala si no hubo theme explícito
  (ya no depende del valor mutado). → [libraeditor.js:910](libraeditor.js:910).
  - VERIFICADO: con `prefers-color-scheme: dark` al cargar, `themeApplied='dark'` Y listener instalado.

---

## Fase 3 — Tablas matrix-aware y Markdown (ALTO) 🟠

- [x] **3.1 ✅ `findInsertPosition` ignoraba rowspans de filas superiores. RESUELTO.** Reescrita como
  matrix-aware `findInsertPosition(matrix, rowIdx, rowEl, targetCol)` (calcula la columna de inicio real
  de cada celda vía matriz). Actualizados los 3 usos: `_insertTableColumnAt`, `_deleteTableRowAt` y
  `unmergeCell` (reescrito para usar la matriz + `_createEmptyTableCell`). → [libraeditor.js:7340](libraeditor.js:7340).
  - VERIFICADO: insertar columna en tabla con rowspan coloca la celda en la posición lógica correcta en todas las filas; borrar fila reubica el rowspan; unmerge mantiene la integridad.

- [x] **3.2 ✅ `mergeSelectedCells` no expandía el rectángulo. RESUELTO.** Bucle de expansión iterativa
  hasta contener por completo cualquier celda con span que solape el borde; guard `if (!firstCell) return`
  para tablas irregulares; quitado el `triggerChange` redundante (también en `unmergeCell`). → [libraeditor.js:7160](libraeditor.js:7160).
  - VERIFICADO: merge con solape parcial de un rowspan expande el rango y no corrompe la tabla.

- [x] **3.3 ✅ Round-trip Markdown (formato inline + saltos). RESUELTO (parcial).** `markdownInlineToHtml`
  protege con placeholders las etiquetas inline que emite `htmlToMarkdownInline` (`<u>`,`<sub>`,`<sup>`,
  `<mark>`,`<span style>`,`<br>`) antes de `escapeHtml` y las restaura después; `<br>` se emite literal
  (no `\n`) para no partir el bloque. → [libraeditor.js:11266](libraeditor.js:11266), [libraeditor.js:11464](libraeditor.js:11464).
  - VERIFICADO: subrayado/mark/sub/sup/color y saltos `<br>` sobreviven al round-trip (sin partir bloques);
    markdown estándar hace round-trip exacto; el saneo final (`_sanitizeBlocks`) sigue limpiando estilos peligrosos.

### Pendientes de Fase 3 (requieren capa de escape de Markdown, mayor riesgo)
- [ ] **Metacaracteres sin escapar**: un párrafo cuyo texto empieza por `- `, `# `, `> `, `N. `, o que
  contiene `*`/`_`/`~~`, se reinterpreta como bloque/formato al recargar. Requiere un escaper de Markdown
  (backslash) coordinado entre `getMarkdown` (escapar) y `loadFromMarkdown`/`markdownInlineToHtml`
  (desescapar). Se pospone por el riesgo de regresión en contenido con backslashes.
- [ ] **Dimensiones de imagen a 300×200**: `getMarkdown` emite `![alt](url)` (Markdown estándar no tiene
  sintaxis de tamaño) y al recargar `width/height:'auto'` → `parseInt` NaN → defaults 300×200. Requeriría
  emitir `<img>` HTML con dimensiones (se aparta del Markdown puro) o un formato propio.

---

## Fase 4 — Ciclo de vida, fugas y rendimiento (MEDIO) 🟡

- [x] **4.1 ✅ `triggerChange` serializaba todo aunque no hubiera `onChange`. RESUELTO.** Guarda
  `if (typeof this.onChange !== 'function') return` movida ANTES de construir el payload; `getPlainText()`
  cacheado en `v_plain` (se llamaba hasta 3×). → [libraeditor.js:11775](libraeditor.js:11775).
  - VERIFICADO: `triggerChange` no lanza y sigue sincronizando el textarea.
- [x] **4.2 ✅ `removeInlineStyle` limpiaba todos los spans del bloque. RESUELTO.** Ahora solo limpia los
  spans que INTERSECTAN la selección (nuevo helper `_rangeIntersectsNode` con `compareBoundaryPoints`).
  → [libraeditor.js:12488](libraeditor.js:12488).
  - VERIFICADO: quitar color al span "rojo" seleccionado deja intacto el span "azul".
- [x] **4.3 ✅ `deleteBlock` sobre el último bloque no limpiaba props. RESUELTO.** Se reemplaza por un
  objeto limpio `{id, type:'paragraph', content:''}` preservando el id. → [libraeditor.js:10513](libraeditor.js:10513).
  - VERIFICADO: tras borrar, el bloque solo tiene keys [id, type, content]. (Los otros dos sitios ya creaban objeto fresco.)
- [x] **4.4 ✅ Fugas de listeners y limpieza en `destroy()`. RESUELTO.**
  - `destroy()` invoca los `closeFn` de todos los modales del backdrop (color picker, case/tag menu...)
    antes de limpiar, para que retiren sus propios listeners. → [libraeditor.js:11990](libraeditor.js:11990).
  - `showUnifiedColorPicker` expone `_closeColorPicker` y usa `_add_doc_click`/`_remove_doc_click`;
    `closeFormatMenu` lo invoca (antes hacía `picker.remove()` directo). → [libraeditor.js:12746](libraeditor.js:12746).
  - `showCaseMenu` registra su click con `_add_doc_click` y lo retira en su cierre. → [libraeditor.js:13216](libraeditor.js:13216).
  - `destroy()` usa `classList.contains('libraeditor-editor-wrapper')` (no `===`), que dejaba el wrapper huérfano.
  - VERIFICADO: destroy con picker abierto elimina picker, backdrop y wrapper; `_closeColorPicker` a null.
  - Nota: los modales standalone (summary/tabla/media/link) con overlay propio no se barren en destroy
    (edge case: destruir con un modal-diálogo abierto). No se toca por el riesgo cross-editor de un sweep global.
- [x] **4.5 ✅ `anchorMenu` reescribía estilos cada frame. RESUELTO (conservador).** Se cachean los
  últimos top/left/transform y solo se escribe `style` cuando cambian (rompe el thrash de layout sin
  alterar el posicionamiento). → [libraeditor.js:960](libraeditor.js:960).
- [x] **4.6 ✅ Reconstrucción cara. RESUELTO.** `_buildTableToolbar` solo reconstruye si cambia la firma
  (bloque + índices lógicos + estado merge/unmerge + identidad de celda). `expandTableCellSelection`
  construye la matriz UNA vez y la reutiliza (`getTableCellCoords`/`getCellsInRange` aceptan matriz
  opcional). → [libraeditor.js:7580](libraeditor.js:7580), [libraeditor.js:6790](libraeditor.js:6790).
  - VERIFICADO: toolbar con 20 botones estable; misma firma no reconstruye.
- [x] **4.7 ✅ `_isSafeUrl` permitía `data:` peligrosos en href. RESUELTO.** Bloquea TODO `data:` en
  enlaces. → [libraeditor.js:15411](libraeditor.js:15411).
  - VERIFICADO: `data:image/svg+xml`/`data:text/xml` → false; https/relativo/mailto → true.
- [x] **4.8 ✅ `_sanitizeStyle` bypass de `url(` con escapes CSS. RESUELTO.** Rechaza cualquier valor con
  backslash (ninguna prop permitida lo necesita). → [libraeditor.js:15461](libraeditor.js:15461).
  - VERIFICADO: `u\72 l(...)` y `url(x)` → ''; `color: red` conservado.

---

## Fase 5 — CSS (MEDIO/limpieza) 🟡🔵

- [x] **5.1 ✅ Dark mode roto en modales. RESUELTO.** Los contenedores de modal (imagen, enlace, media,
  propiedades de tabla, summary) llaman a `_applyMenuTheme` (añade `libraeditor-dark` si el editor está en
  oscuro) y se añadieron `.libraeditor-modal-overlay/.libraeditor-modal-container/.libraeditor-summary-modal.libraeditor-dark`
  al grupo de variables dark. Sustituido el `libraeditor-editor-'+theme` (incorrecto) de media/tabla.
  - VERIFICADO: modal de propiedades en editor dark → fondo `#1a1a1a`, texto claro.
- [x] **5.2 ✅ Keyframes duplicados. RESUELTO.** Eliminados los duplicados tardíos de `fadeIn`
  (opacity-only, anulaba el slide) y `slideUp`; quedan las versiones con deslizamiento.
  - VERIFICADO: `@keyframes fadeIn` vuelve a incluir `translateY`.
- [x] **5.3 ✅ Hardcodes de color migrados a variables.** `#e8f0fe`→`--libraeditor-bg-hover`; `#fee`/`#d33`→
  `--libraeditor-danger-bg`/`--libraeditor-danger`; familia `#4a9eff`/`#3a8eef`/`#5568d3`→`--libraeditor-accent`/`-hover`;
  `#ddd`/`#e0e0e0`/`#aaa`/`#999` de contenido y estados activos/separadores→variables de borde/texto/bg.
  - Se conservan a propósito: `#000` del contenedor de vídeo (letterbox) y el botón claro sobre imagen (`#fff`/`#333`/`#999`).
- [x] **5.4 ✅ Selector dark de cita corregido** a `.libraeditor-editor-dark blockquote.libraeditor-block`.
- [x] **5.5 ✅ Find/replace dark unificado** con la paleta neutra común (añadido al grupo `.libraeditor-dark`,
  eliminada la paleta violeta propia).
- [x] **5.6 ✅ Readonly ya no lo pisan los estilos de contenido**: la regla pasa a
  `.libraeditor-editor.libraeditor-editor-styled.libraeditor-readonly` (cubre minimal y con toolbar, mayor especificidad).
- [x] **5.7 ✅ Declaraciones `color` duplicadas eliminadas** (`.libraeditor-toolbar-button`,
  `.libraeditor-modal-button-cancel`, `.libraeditor-summary-button`, `.libraeditor-color-remove`) y bloque redundante
  `.libraeditor-color-grid .libraeditor-color-*` eliminado.
- [x] **5.8 ✅ Reglas muertas eliminadas**: `.libraeditor-full`, `.libraeditor-block-content`, `::-webkit-scrollbar`
  vacías, spacer RTL vacío; `.libraeditor-summary-heading1/2/3` del tooltip reescaladas a tamaños razonables.
- [x] **5.9 ✅ `:focus-visible` añadido** a los ~12 elementos interactivos que faltaban (bloque agrupado al
  final del CSS, misma convención `outline` con el acento del tema).

---

## Fase 6 — Código muerto y deduplicación (limpieza) 🔵

> Pase aparte, sin mezclar con los fixes de comportamiento.

- [x] **6.1 ✅ Código muerto eliminado (parcial).** `createContentElement` (~295 líneas, `@deprecated`,
  sin callers, contenía `document.onmousemove=`); `showColorPicker` (~84 líneas, sin callers);
  `scrollHandlers` (array sin uso) + `clearScrollHandlers` (no-op) + su llamada en `destroy`; emojis
  alias duplicados (`blush`=😊, `cool`=😎).
  - VERIFICADO: las funciones ya no existen en el prototipo; sintaxis OK; editor funciona.
  - PENDIENTE: `updateConsecutiveNumberLists` (no-op) — tiene 7 call sites entrelazados con lógica de
    foco/rAF/minIndex; quitarlo bien exige tocar addBlock/changeBlockType/delete*, con riesgo de
    regresión. Se deja como no-op inofensivo. Ver "Pendientes".
- [x] **6.4 ✅ `_searchInEditor` reutiliza la instancia de regex** (reseteando `lastIndex`) en vez de
  compilar una por nodo de texto. → [libraeditor.js:14769](libraeditor.js:14769).
  - VERIFICADO: find & replace sigue encontrando todos los matches.

### Pendientes de Fase 6 (refactors DRY pospuestos por relación riesgo/beneficio)
> Son extracciones/optimizaciones **sin ganancia funcional** sobre código que ya funciona. En un fichero
> único ES5 sin tests, el riesgo de regresión no compensa hacerlos "a presión"; conviene abordarlos por
> separado, uno a uno y con verificación dedicada.
- [ ] **6.2 Extraer helpers**: `_buildImageDimensionsModal` (unifica los 4 modales de imagen ~150 líneas
  c/u), dedup `getHTML`/`getHTMLSource`, `_positionMenuAtCaret`/`_updateMenuSelection` (mention/emoji),
  `_findCursorPosition` (duplicada verbatim en changeBlockTypeFromToolbar y changeTableCellBlockType;
  ojo: la 2ª no tiene `self` en scope), helper de snapshot compartido `pushHistory`/`undo`.
- [ ] **6.3 Render incremental** en `duplicateBlock`/`moveBlock`/`deleteBlock` (cambia foco/scroll — probar bien).
- [ ] **6.1b `updateConsecutiveNumberLists`** (no-op) y el trabajo muerto asociado en sus 7 call sites.

---

## Fase 7 — Compatibilidad IE11 (decisión de alcance) ✅

El proyecto declaraba IE11+ pero usa APIs no soportadas **sin polyfill** (`Element.closest` ×60,
`ChildNode.remove` ×39, `String.prototype.normalize`, selector `:scope`, `NodeList.forEach`), por lo que
**no funcionaba en IE11**. Auditoría: el código es ES5 puro a nivel de sintaxis (sin const/let/arrow/
template literals reales; los backticks encontrados están en comentarios) — el problema era solo de APIs.

- [x] **7.1 ✅ DECISIÓN DEL USUARIO: actualizar la afirmación de compatibilidad** (opción b), sin tocar
  código. IE11 está EOL desde junio 2022.
- [x] **7.2 ✅ Documentación actualizada**:
  - `README.md`: sección "Compatibilidad" y lista de características → navegadores modernos, con nota
    explícita de por qué NO es compatible con IE11.
  - `CLAUDE.md` (gitignored): Project Overview corregido — mantiene la regla ES5 como constraint, pero
    aclara que el target son navegadores modernos y que IE11 no está soportado.
  - El badge "ES5 Compatible" del demo se conserva (es correcto: la sintaxis ES5 es real; no afirma IE11).

---

## Fase 8 — i18n y accesibilidad 🟡

- [x] **8.1 ✅ i18n. RESUELTO.** Nuevas claves `placeholders.heading1/2/3/listItem/task/slashCommand`,
  `misc.videoUnavailable/audioUnavailable/markdownVideo/markdownAudio` y grupo `aria.mentions/emoji/tags`
  (en `es` y `en`). Aplicadas en `createBlockElement` (placeholders), media placeholders, aria-labels de los
  menús mención/emoji/tag y etiquetas `[Vídeo]`/`[Audio]` del export Markdown.
  - VERIFICADO: editor `lang:'en'` → placeholder "Heading 1"/"List item", Markdown `[Video]`.
- [x] **8.2 ✅ Triggers con acentos/ñ. RESUELTO.** Las regex de slash/mención/tag amplían `\w` a
  `[\wÀ-ſ]` (rango U+00C0–U+017F: español, francés, portugués). Emoji queda ASCII (shortcodes).
  - VERIFICADO: `/título`, `@josé`, `@niño`, `#acción` matchean y capturan el query con tilde.
- [x] **8.3 ✅ Accesibilidad. RESUELTO.** Barrido al final de `createToolbar` que copia `title`→`aria-label`
  en todos los botones icon-only; `role="listbox"`/`role="option"` en el menú de tipos; `aria-selected="false"`
  en los ítems ocultos del emoji menu.
  - VERIFICADO: 26/26 botones de la toolbar con `aria-label`.

---

## Fase 9 — Documentación y demo ✅

- [x] **9.1 README. RESUELTO.** Default de `summary` corregido a `true`; documentadas las 7 opciones
  faltantes (`readOnly`, `toolbarOverflow`, `wordWrap`, `wordWrapToggle`, `escapeHtmlEntities`,
  `htmlNumericEntities`, `tags`) y añadida sección de etiquetas `#` + trigger en la tabla de atajos;
  secciones obsoletas actualizadas (handle por foco, propiedades de tabla en toolbar contextual, summary =
  panel de esquema lateral, estilos vía `libraeditor-editor-styled` en vez de inyección con ID único);
  documentados los métodos faltantes (`loadFromText`, `getHTMLSource`, `removeFormat`,
  `applyCaseTransform`, `indentBlock`, fullscreen, `toggleWordWrap`/`toggleShowBlocks`/`toggleOutlinePanel`,
  `showFindReplace`, stats); tabla i18n y sección de seguridad puestas al día (incl. `data:` en href).
- [x] **9.2 CLAUDE.md (gitignored). RESUELTO.** Tamaños de fichero actualizados (~17.450 / ~2.890);
  instrucción "añade métodos antes de `escapeHtml()`" corregida a ~línea 17425 + nota para usar búsqueda
  por símbolo; aviso de desfase añadido a la tabla de File Organization (el orden sigue válido, los números
  no). Las features recientes quedan documentadas en el README (committeado).
- [x] **9.3 Demo `index.html`. RESUELTO.**
  - GoatCounter: host `gc.zaraz.io` → `gc.zgo.at` (VERIFICADO: `count.js → 200`).
  - Clase huérfana `.gh-link` → `.github-link` en la media query.
  - Footer: colores fijados para el fondo claro (borde y hover eran invisibles); eliminadas las reglas
    muertas `body.light-mode`.
  - "12 tipos de bloques" → "14" (incluye vídeo/audio); mención de etiquetas `#` añadida.
  - Textareas con `aria-label`; contenedor RTL con `lang="ar"`.

---

## Notas

- Sin dependencias ni build: probar abriendo `index.html` (o `.claude/serve.js` en :8765).
- Verificación en vivo posible con las herramientas de preview del editor.

## Estado

Fases 1–9 **completadas y verificadas** (commits `620daff`, `2e7e202`, `4d79187`, `05c5211`, `feb5d38`,
`3fcf5d6`, `59902e9` + Fase 9). Quedan pendientes explícitos, de bajo riesgo/valor, para abordar por
separado con verificación dedicada:

- **6.2** Extracciones DRY (modales de imagen, `getHTML`/`getHTMLSource`, `_positionMenuAtCaret`,
  `_findCursorPosition`, snapshot).
- **6.3** Render incremental en `duplicateBlock`/`moveBlock`/`deleteBlock`.
- **6.1b** Retirar el no-op `updateConsecutiveNumberLists` y su trabajo asociado (7 call sites).
- **3.3 (parcial)** Escape de metacaracteres Markdown y dimensiones de imagen en el round-trip.
- **1.3 (nota)** — resuelto; sin pendientes.
