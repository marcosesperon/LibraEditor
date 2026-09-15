# meWYSE — Block Editor

Editor WYSIWYG basado en bloques al estilo Notion, desarrollado en JavaScript ECMAScript 5 puro. Sin dependencias, sin build system, un solo archivo.

Autor
------

**Marcos Esperon** - [github.com/marcosesperon](https://github.com/marcosesperon)

Si este proyecto te resulta util, puedes apoyar su desarrollo:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/marcosesperon)

## Características

- **Funciona con cualquier elemento**: `textarea`, `div`, `span`, o cualquier otro elemento HTML
- **Sistema de bloques**: Cada línea es un bloque independiente que puede ser de diferentes tipos
- **18 tipos de bloques**: Párrafo, H1, H2, H3, Cita, Código, Lista con viñetas, Lista numerada, Checklist, Tabla, Imagen, Separador, **Vídeo** (YouTube/Vimeo/archivo), **Audio**, Salto de página, Aviso (callout), **Desplegable** (toggle), **Índice** (TOC)
- **Tablas avanzadas**: Selección de celdas, merge/unmerge, añadir/eliminar filas y columnas, redimensionar columnas, color de fondo, modal de propiedades (ancho/alto, borde, padding, spacing, alineación)
- **Imágenes**: Inserción desde archivo, drag & drop, paste desde clipboard, redimensionado con drag, edición de dimensiones, validación de tamaño (`imageMaxSize`), hook custom de upload (`onImageUpload`)
- **Formato de texto enriquecido**: Menú flotante con negrita, cursiva, subrayado, tachado, enlaces, colores, alineación y **limpiar formato** (removeFormat)
- **Transformación de caso**: Dropdown con 5 opciones (UPPERCASE, lowercase, Title Case, Sentence case, tOGGLE cASE)
- **Listas anidadas**: `Tab`/`Shift+Tab` para indentar/desindentar ítems hasta 5 niveles
- **Estilos custom**: Opción `styleFormats` para definir estilos con clase CSS propia (ej. "Destacado", "Aviso")
- **Imágenes con estilos avanzados**: Modal con border, margin y alineación (left/center/right)
- **Vídeo embed**: YouTube/Vimeo (auto-detección por URL) + archivos locales .mp4/.webm vía `<video>` nativo
- **Audio embed**: archivos .mp3/.ogg/.wav vía `<audio>` nativo
- **Resaltado de sintaxis**: coloreado de código por lenguaje con dependencia opcional lazy (`codeHighlight`); el modelo se mantiene en texto plano y hay fallback sin librería
- **Bloques desplegables (toggle)**: título + cuerpo plegable (`/desplegable`), exporta a `<details>`
- **Índice de contenidos (TOC)**: `/indice` genera un índice navegable de los títulos que se actualiza solo
- **Migración desde TinyMCE/CKEditor**: método `loadFromHTML()` que importa HTML legacy y convierte iframes/tablas/imágenes a bloques nativos
- **Sistema de menciones (@)**: Escribe `@` para mencionar usuarios con autocompletado y avatares
- **Emoji picker**: Escribe `:` para insertar emojis con autocompletado
- **Menú slash (/)**: Menú contextual al estilo Notion para insertar cualquier tipo de bloque
- **Resumen y estadísticas**: Índice de navegación, conteo de palabras, caracteres, párrafos y tiempo de lectura
- **Drag & drop**: Reordena bloques arrastrando el handle flotante
- **Selección multi-bloque**: Ctrl+click y Shift+click para seleccionar, formatear o eliminar múltiples bloques
- **Undo/Redo**: Historial de hasta 50 estados con debounce (limpio tras la carga inicial: "deshacer" arranca deshabilitado)
- **Render incremental**: las operaciones de bloque (insertar, borrar, convertir, mover, duplicar, alinear, indentar, editar imagen…) actualizan **solo el DOM del bloque afectado** en vez de reconstruir el documento — conservan el foco/caret del resto, sin flicker, y escalan en documentos grandes (con fallback automático a re-render cuando cambia la agrupación de listas)
- **Detección de cambios (dirty tracking)**: `isDirty()`/`hasChanges()` para saber si el contenido cambió respecto a la última base "limpia"; `markPristine()`/`resetDirty()` para resetear tras guardar
- **`onChange` eficiente**: payload **perezoso** (solo serializa `html`/`json`/`markdown` si el callback los lee) y `onChangeDebounce` opcional para agrupar los cambios al teclear
- **Exportación múltiple**: JSON, HTML, Markdown y texto plano
- **Importación Markdown**: Carga contenido desde cadenas Markdown
- **Buscar y reemplazar**: Panel flotante (`Ctrl/Cmd+F`) con navegación prev/next, case-sensitive, palabra completa y reemplazo masivo
- **Pantalla completa**: Botón en toolbar para expandir el editor a toda la ventana (Escape para salir)
- **Mostrar bloques**: Modo debug que muestra los límites y tipo de cada bloque
- **Contador persistente**: Barra inferior con palabras, caracteres y tiempo de lectura en tiempo real
- **Soporte RTL**: Direccionalidad derecha-a-izquierda para árabe, hebreo, etc.
- **Paste inteligente**: Limpieza automática de markup de Microsoft Word/Excel/Google Docs; convierte listas simuladas con viñetas a `<ul>`/`<ol>` reales; preserva bold/italic/underline inferidos de estilos inline. Opción `pasteAsText: true` para forzar todo paste como texto plano
- **Seguridad XSS**: Sanitización automática contra inyección en todos los puntos de entrada (constructor, `loadFromJSON`, `loadFromMarkdown`, paste). Whitelist estricto de tags/atributos/URLs. Método `getSafeHTML()` para exportación segura
- **Robustez de datos**: los bloques de **tipo desconocido** (p. ej. de una versión más nueva o de un plugin no instalado) se **preservan íntegros** al cargar/exportar JSON en vez de perderse — se muestran como placeholder de solo lectura y se re-emiten tal cual en `getJSON()`
- **Internacionalización (i18n)**: Español, inglés y traducciones personalizadas
- **Temas**: Dark mode con auto-detección del sistema, tema compact, temas custom
- **Content Styles**: Opción para heredar estilos CSS de la página
- **Accesibilidad**: ARIA attributes, focus-visible, navegación por teclado
- **Código ES5 sin dependencias**: Funciona en todos los navegadores modernos (Chrome, Firefox, Safari, Edge) sin build tools
- **Componente React opcional**: wrapper `mewyse/react` (`<MeWyse>`), no controlado, SSR-safe, con types — ver [react/README.md](react/README.md)

## Inicio Rápido

### Como componente React

```bash
npm install mewyse react react-dom
```

```jsx
import { MeWyse } from 'mewyse/react';
import 'mewyse/style.css';

<MeWyse toolbar theme="dark" defaultValue={blocks} onChange={d => console.log(d.json)} />
```

`target` acepta un selector CSS **o** un elemento del DOM (el wrapper usa el
segundo). El núcleo se exporta como CommonJS (`require('mewyse')`) y como global
(`window.meWYSE`) para `<script>`. Detalles en [react/README.md](react/README.md).

## Uso con `<script>` (sin build)

### 1. Incluir archivos

```html
<link rel="stylesheet" href="mewyse.css">
<script src="mewyse.js"></script>
```

### 2. Crear contenedor

```html
<!-- Con textarea (ideal para formularios) -->
<textarea id="miEditor"></textarea>

<!-- Con div -->
<div id="miEditor">Contenido inicial...</div>

<!-- Con cualquier elemento -->
<span id="miEditor">Texto editable</span>
```

### 3. Inicializar

```javascript
var editor = new meWYSE({
  target: '#miEditor',
  toolbar: true,
  onChange: function(data) {
    console.log(data.html);      // HTML
    console.log(data.markdown);  // Markdown
    console.log(data.plainText); // Texto plano
    console.log(data.json);      // JSON
    console.log(data.blocks);    // Array de bloques
  },
  onFocus: function(data) {
    // Se dispara solo al entrar al editor desde fuera (no entre bloques)
    console.log('editor enfocado, bloque actual:', data.focusedBlockId);
  },
  onBlur: function(data) {
    // Se dispara solo al salir del editor (no al usar toolbar/menús/modales)
    console.log('editor perdió foco. Contenido final:', data.html);
  }
});
```

### Payload de los callbacks

`onChange`, `onFocus` y `onBlur` reciben un objeto con la misma estructura:

```javascript
{
  editor: meWYSE,         // referencia al propio editor (API sin variable externa)
  blocks: Array,          // array de bloques internos
  plainText: String,      // texto plano de bloques
  html: String,           // getHTML()
  json: String,           // getJSON()
  markdown: String,       // getMarkdown()
  hasChanges: Boolean,    // ¿cambió respecto a la línea base? (ver isDirty()/hasChanges())
  focusedBlockId: Number, // id del bloque enfocado/que perdió foco (solo onFocus/onBlur)
  focusedBlockType: String // tipo del bloque (paragraph/heading1/...)
}
```

> **Payload perezoso**: `plainText`/`html`/`json`/`markdown`/`hasChanges` se serializan **solo al leerlos** (getters memoizados). Si tu callback solo usa `data.html`, no se calculan Markdown/JSON — importante en documentos grandes. Por eso **no** hagas `JSON.stringify(data)` (además `editor` es circular): usa `data.json`.
>
> **Debounce de `onChange`**: con la opción `onChangeDebounce: <ms>` (default `0` = síncrono), `onChange` se agrupa en una sola llamada tras ese tiempo de inactividad al teclear. No afecta al textarea, autosave ni al historial (siguen inmediatos); `onFocus`/`onBlur` tampoco se debouncean.

### Comportamiento de onFocus / onBlur

- **`onFocus`** se dispara **solo cuando el editor gana foco desde el exterior**. No se dispara cuando el caret se mueve entre bloques del editor.
- **`onBlur`** se dispara **solo cuando el editor pierde foco a un elemento externo**. NO se dispara cuando el foco va a:
  - La toolbar del editor o sus botones
  - Menús flotantes (slash, mention, emoji, format, color picker, etc.)
  - Modales del editor (link, imagen, propiedades de tabla, etc.)
  - Find & Replace
  - El handle flotante de bloque
  - Cualquier otra UI propia del editor

Útil para validaciones al salir o tracking de uso.

## API

### Constructor

```javascript
new meWYSE(options)
```

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `target` | string | *requerido* | Selector CSS del elemento (`'#miEditor'`, `'.editor'`) |
| `toolbar` | boolean \| string \| string[] | `false` | Barra de herramientas **declarativa** (estilo TinyMCE). Ver ["Toolbar configurable"](#toolbar-configurable). `true` = todos los ítems; `false`/ausente = sin toolbar; string = ítems por espacios con `\|` para grupos; array = una fila por string |
| `summary` | boolean | `true` | Mostrar botón de resumen con estadísticas e índice (abre el panel de esquema lateral) |
| `readOnly` | boolean | `false` | Modo solo lectura: sin toolbar ni handle, `contenteditable="false"`, callbacks inertes |
| `charCounter` | boolean | `false` | Mostrar barra inferior con contador de palabras, caracteres y tiempo de lectura |
| `wordWrap` | boolean | `true` | Ajuste de texto: el contenido largo salta de línea dentro del bloque |
| `toolbarOverflow` | string | `'scroll'` | Comportamiento de la toolbar sin espacio: `'scroll'` (scroll horizontal con flechas, por defecto) o `'wrap'` (salto de línea) |
| `selectionTools` | string | `'floating'` | Dónde se ofrecen las herramientas que dependen de una selección (sub/superíndice, mayúsculas, quitar formato, enlace, color, fuente y tamaño). `'floating'`: no se pintan en la toolbar, aparecen en el **menú flotante** al seleccionar texto (aunque la toolbar esté activa). `'toolbar'`: se pintan en la toolbar pero **deshabilitadas** hasta que hay selección de texto. **Nota:** negrita, cursiva, subrayado y tachado quedan SIEMPRE en la toolbar y habilitados (funcionan con solo el caret, activando el formato para lo siguiente que escribas) |
| `rtl` | boolean | `false` | Activar dirección derecha-a-izquierda (árabe, hebreo) |
| `pasteAsText` | boolean | `false` | Forzar que todo paste entre como texto plano (sin preservar formato) |
| `escapeHtmlEntities` | boolean | `true` | Escapar entidades HTML en el HTML exportado por `getHTML()` |
| `htmlNumericEntities` | boolean | `true` | Compat TinyMCE (`entity_encoding: 'numeric'`): escapar no-ASCII como referencias numéricas |
| `tags` | Array | `[]` | Lista de etiquetas para el trigger `#`. Cada item: `{ id, name, color? }` |
| `mergeTags` | Array | `[]` | Lista de variables `{{campo}}` (trigger `{{` y botón de toolbar). Cada item: `{ id, name, label? }` |
| `autosave` | boolean | `false` | Guarda el contenido (JSON) en `localStorage` con debounce en cada cambio. No auto-restaura (usa `restoreDraft()`) |
| `autosaveKey` | string | `'mewyse-draft'` | Clave de `localStorage` para el borrador de autosave |
| `pdfLib` | string | `''` | URL (lazy) de una librería tipo html2pdf.js para `exportPdf()` con fidelidad. Sin ella, `exportPdf()` cae a `print()` |
| `codeHighlight` | boolean | `false` | Resaltado de sintaxis en los bloques de código (dep opcional lazy). El modelo se mantiene en texto plano; añade un selector de lenguaje por bloque |
| `codeHighlightUrl` | string | `''` | URL (lazy) de highlight.js. Si no se define o falla la carga, el código cae a texto plano escapado (fallback) |
| `disabledBlocks` | string[] | `[]` | Tipos de bloque que NO se pueden insertar desde la UI (ocultan su botón de toolbar, se filtran del menú slash y no se crean al pegar HTML). Ej: `['video', 'audio']`. No afecta a `blocks`/`loadFromJSON` ni a las APIs `insertVideoBlock()`/`insertAudioBlock()` |
| `imageMaxSize` | number | `0` | Tamaño máximo permitido al insertar imagen, en bytes. `0` = sin límite |
| `imageMaxSizeError` | string | auto | Mensaje de alerta cuando la imagen excede `imageMaxSize` |
| `onImageUpload` | Function | — | Hook para subir imágenes al servidor. Recibe `(file, callback)`. El callback espera `{ url, fileName?, width?, height? }` |
| `styleFormats` | Array | `[]` | Estilos custom para el dropdown de tipos de bloque. Cada item: `{ title, block, className }` |
| `theme` | string | claro | Tema: `'dark'` (oscuro), `'auto'` (sigue `prefers-color-scheme` del OS en vivo), `'compact'`, o cualquier nombre custom. Sin tema → **claro** (no auto-detecta) |
| `contentStyles` | boolean | `true` | Inyectar estilos de contenido. Con `false`, la página define sus propios estilos |
| `minHeight` | number/string | — | Alto mínimo del área de edición. Número = px; string = valor CSS (`'200px'`, `'30vh'`, `'10em'`). Sin definir, usa el default del CSS |
| `maxHeight` | number/string | — | Alto máximo antes de scroll interno. Número = px o string CSS. Sin definir, usa el default del CSS |
| `autoExpand` | boolean | `false` | El editor crece con el contenido. Sin `maxHeight`, sin tope (scrollea la página); con `maxHeight`, crece hasta ese límite y luego hace scroll interno |
| `lang` | string/object | `'es'` | Idioma (`'es'`, `'en'`) o objeto de traducciones personalizadas |
| `mentions` | Array | `[]` | Lista de usuarios para menciones `@` |
| `autoFocus` | boolean | `false` | Enfocar automáticamente el primer bloque al inicializar |
| `blocks` | Array | `[]` | Contenido inicial como array de bloques |
| `onChange` | Function | `function(){}` | Callback cuando cambia el contenido (payload perezoso; ver arriba) |
| `onChangeDebounce` | number | `0` | ms para agrupar (debounce) `onChange` al teclear. `0` = síncrono. No afecta a autosave/textarea/historial |
| `onFocus` | Function | `function(){}` | Callback cuando el editor gana foco (entrar al editor desde fuera). No se dispara al moverse entre bloques internamente |
| `onBlur` | Function | `function(){}` | Callback cuando el editor pierde foco. No se dispara al hacer click en toolbar/menús/modales/pickers del editor |

### Toolbar configurable

La opción `toolbar` es **declarativa** (estilo TinyMCE). Por defecto (`toolbar: true`) se muestran **todas** las opciones, pero puedes elegir cuáles y en qué orden/grupos:

```javascript
// Todas las opciones (default)
new meWYSE({ target: '#ed', toolbar: true });

// Personalizada: los ítems se separan por espacios; `|` crea grupos (separadores)
new meWYSE({ target: '#ed', toolbar: 'undo redo | blocktype | bold italic underline | link forecolor | align' });

// Varias filas (con toolbarOverflow: 'wrap')
new meWYSE({ target: '#ed', toolbarOverflow: 'wrap', toolbar: [
  'undo redo | blocktype fontsize',
  'bold italic underline strikethrough | link forecolor | align'
] });

// Sin toolbar (menú flotante al seleccionar texto)
new meWYSE({ target: '#ed', toolbar: false });
```

**Ítems disponibles** (los nombres desconocidos se ignoran; los grupos que queden vacíos se omiten):

| Grupo | Ítems |
|---|---|
| Historial | `undo` `redo` |
| Bloque / fuente | `blocktype` (selector de tipo) · `fontsize` (stepper `−`/`+`) · `font` (familia/interlineado) |
| Formato | `bold` `italic` `underline` `strikethrough` `subscript` `superscript` `case` `removeformat` |
| Inserción inline | `link` `forecolor` (color) `specialchars` `mergetags` |
| Alineación / sangría | `align` `outdent` `indent` |
| Bloques | `table` `image` `video` `audio` `pagebreak` |
| Vistas / herramientas | `find` `wordwrap` `summary` `showblocks` `sourcecode` (ver/editar HTML) `markdown` (ver/editar Markdown) `fullscreen` `print` |
| Exportar | `exportword` `exportpdf` |
| Mover bloque | `moveup` `movedown` |

> `mergetags` solo aparece si pasas `mergeTags`; `table`/`image`/`video`/`audio` respetan `disabledBlocks`. `print` está en el default (imprime solo el contenido del editor); `exportword`/`exportpdf` no están en el default: añádelos a la spec si los quieres.

### Métodos

#### Exportar contenido

```javascript
editor.getHTML();       // HTML semántico
editor.getSafeHTML();   // HTML semántico + re-sanitizado (extra seguro para inserción externa)
editor.getHTMLSource(); // HTML sin escape de entidades (útil para reinyectar en el editor)
editor.getMarkdown();   // Markdown
editor.getPlainText();  // Texto plano
editor.getJSON();       // JSON string
```

#### Cargar contenido

```javascript
// Desde JSON
editor.loadFromJSON([
  { id: 1, type: 'heading1', content: 'Mi título' },
  { id: 2, type: 'paragraph', content: 'Mi párrafo con <b>negrita</b>' }
]);

// Desde Markdown
editor.loadFromMarkdown('# Título\n\nTexto con **negrita** y *cursiva*.');

// Desde texto plano (cada línea → un párrafo)
editor.loadFromText('Línea 1\nLínea 2');

// Desde HTML (útil para migrar contenido de TinyMCE/CKEditor)
editor.loadFromHTML(
  '<h1>Doc</h1>' +
  '<p>Texto con <strong>negrita</strong>.</p>' +
  '<ul><li>Item 1</li><li>Item 2</li></ul>' +
  '<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>'
);
// Detecta iframes YouTube/Vimeo, <video>, <audio>, <img>, tablas y listas
// automáticamente y los convierte al modelo de bloques.
```

> **Bloques de tipo desconocido**: si el JSON incluye un bloque cuyo `type` esta
> versión no reconoce (p. ej. de una versión más nueva o de un plugin), **no se
> pierde**: se conserva íntegro (con todas sus propiedades), se muestra como un
> placeholder de solo lectura y `getJSON()` lo re-emite tal cual. Así puedes cargar
> y volver a guardar documentos sin destruir contenido que no entiendes.

#### Detección de cambios (dirty tracking)

```javascript
editor.isDirty();      // ¿Ha cambiado el contenido respecto a la línea base "limpia"?
editor.hasChanges();   // Alias de isDirty()
editor.markPristine(); // Marca el estado actual como "limpio" (llámalo tras guardar)
editor.resetDirty();   // Restablece isDirty()/hasChanges() a false (alias de markPristine)
```

La **línea base** se captura tras la carga inicial —incluida la normalización
HTML→bloques cuando montas sobre un `<textarea>` con HTML— y tras cada
`loadFromHTML/JSON/Markdown` y `markPristine()`. Por eso, si cargas contenido,
entras con el foco y **sales sin editar nada**, `isDirty()` devuelve `false`
(la conversión a bloques no cuenta como cambio). Compara **contenido**, no
pulsaciones: si editas y luego deshaces hasta el estado original, vuelve a
`false`. El payload de `onChange`/`onFocus`/`onBlur` también incluye `isDirty`.

```javascript
var editor = new meWYSE({
  target: '#mi-textarea',      // textarea ya con HTML
  onBlur: function (data) {
    if (data.hasChanges) {       // o data.editor.hasChanges() / data.editor.isDirty()
      guardar(data.html);        // solo si realmente cambió algo
      data.editor.resetDirty();  // restablecer isDirty (referencia al editor en el payload)
    }
  }
});
```

#### Manipular bloques

```javascript
editor.addBlock('paragraph');        // Añadir al final
editor.addBlock('heading1', 0);      // Añadir en posición específica
editor.duplicateBlock(blockId);      // Duplicar bloque
editor.deleteBlock(blockId);         // Eliminar bloque
editor.moveBlock(fromId, toId);      // Mover bloque a posición de otro
```

#### Formato programático

```javascript
editor.removeFormat();              // Limpiar el formato inline de la selección
editor.applyCaseTransform('upper'); // 'upper'|'lower'|'title'|'sentence'|'toggle'|'smart'
editor.indentBlock(blockId, 1);     // Indentar (+1) / desindentar (-1) un item de lista
```

#### Vistas y herramientas

```javascript
editor.showFindReplace();    // Abrir el diálogo de buscar y reemplazar
editor.toggleFullscreen();   // Alternar pantalla completa (o enterFullscreen/exitFullscreen)
editor.toggleWordWrap();     // Alternar el ajuste de texto
editor.toggleShowBlocks();   // Alternar la vista de bloques (debug)
editor.toggleOutlinePanel(); // Alternar el panel de esquema lateral (índice de títulos)
```

#### Estadísticas

```javascript
editor.getWordCount();       // Número de palabras
editor.getCharacterCount();  // Número de caracteres
editor.getParagraphCount();  // Número de párrafos
editor.getReadingTime();     // Tiempo estimado de lectura (string, p.ej. "3 min")
editor.getHeadingsIndex();   // Array de títulos { level, text, id } para navegación
editor.navigateToHeading(id);// Desplazar hasta un título del índice
```

#### Imprimir / exportar a Word

```javascript
editor.print();            // Abre una ventana con solo el documento y lanza la impresión
editor.exportWord('doc');  // Descarga el documento como .doc (Word abre el HTML). Sin librerías
editor.exportPdf('doc');   // PDF con la lib de `pdfLib` (lazy); si no hay lib, cae a print()
```

Todos parten de `getSafeHTML()` (contenido saneado). Con `exportTools: true` aparecen además los
botones correspondientes en la toolbar. Para un PDF con fidelidad, define `pdfLib` con la URL de
una librería tipo html2pdf.js (se carga solo la primera vez que se usa).

#### Borrador / autosave

Con `autosave: true`, el editor guarda el contenido (JSON) en `localStorage` con debounce. No se
restaura automáticamente para no pisar `options.blocks`; el consumidor decide:

```javascript
var editor = new meWYSE({ target: '#editor', autosave: true, autosaveKey: 'doc-42' });

editor.hasDraft();     // ¿hay un borrador guardado?
editor.restoreDraft(); // Cargar el borrador (pasa por el sanitizer). Devuelve true si había
editor.clearDraft();   // Borrar el borrador (p.ej. tras guardar de verdad en el servidor)
```

#### Otros

```javascript
editor.focus();          // Enfocar el primer bloque
editor.focus(blockId);   // Enfocar un bloque específico por ID
editor.undo();           // Deshacer
editor.redo();           // Rehacer
editor.destroy();        // Destruir editor y limpiar eventos
```

### Callback onChange

El callback recibe un objeto con todas las exportaciones del contenido:

```javascript
var editor = new meWYSE({
  target: '#editor',
  onChange: function(data) {
    data.blocks;     // Array de objetos bloque
    data.html;       // '<h1>Título</h1><p>Texto...</p>'
    data.markdown;   // '# Título\n\nTexto...'
    data.plainText;  // 'Título\nTexto...'
    data.json;       // '[{"id":1,"type":"heading1",...}]'
  }
});
```

## Tipos de Bloques

| Tipo | Descripción | Trigger (menú slash) |
|------|-------------|----------------------|
| `paragraph` | Párrafo normal | `/texto` |
| `heading1` | Título nivel 1 | `/h1` |
| `heading2` | Título nivel 2 | `/h2` |
| `heading3` | Título nivel 3 | `/h3` |
| `quote` | Cita (blockquote) | `/cita` |
| `code` | Bloque de código | `/codigo` |
| `bulletList` | Lista con viñetas | `/lista` |
| `numberList` | Lista numerada | `/numerada` |
| `checklist` | Lista de tareas | `/checklist` |
| `table` | Tabla (3x3 inicial) | `/tabla` |
| `image` | Imagen desde archivo | `/imagen` |
| `video` | Vídeo (YouTube/Vimeo/.mp4). Content = **solo la URL**; previsualización con play (el iframe se carga al pulsar); seleccionable y redimensionable como una imagen | `/video` |
| `audio` | Audio (.mp3/.ogg/.wav) | `/audio` |
| `divider` | Separador horizontal | `/separador` |
| `pageBreak` | Salto de página (impresión/export) | `/salto` |
| `callout` | Aviso destacado (info/warning/success/danger) | `/aviso` |
| `toggle` | Desplegable con título + cuerpo plegable (`<details>`) | `/desplegable` |
| `toc` | Índice navegable de los títulos (se actualiza solo) | `/indice` |

**Autoformato Markdown en vivo**: en un párrafo, al teclear un marcador seguido de espacio se
convierte el bloque automáticamente: `# `/`## `/`### ` → título; `- `/`* `/`+ ` → lista; `1. ` →
lista numerada; `> ` → cita; `` ``` `` → código; `[] `/`[x] ` → checklist (des/marcada).
También **formato inline** al cerrar el patrón y pulsar espacio: `**texto**` → negrita, `*texto*` →
cursiva, `` `texto` `` → código, `~~texto~~` → tachado.

### Estructura de un bloque

```javascript
{
  id: 1,                    // ID único (auto-incrementado)
  type: 'paragraph',        // Tipo de bloque
  content: 'Texto <b>HTML</b>', // Contenido (HTML para texto, objeto para imágenes)
  checked: false,           // Solo checklist: estado del checkbox
  alignment: 'left'         // Opcional: 'left', 'center', 'right', 'justify'
}
```

Para bloques de imagen, `content` es un objeto:

```javascript
{
  id: 5,
  type: 'image',
  content: {
    blob: 'data:image/png;base64,...',  // Data URL de la imagen
    fileName: 'foto.png',
    width: 800,
    height: 600
  }
}
```

## Resaltado de sintaxis en código

Los bloques de código pueden colorearse por lenguaje mediante una dependencia **opcional y
perezosa** (highlight.js). El núcleo sigue sin dependencias: la librería solo se carga si activas
la opción, y si no carga (o no se activa) el bloque cae a texto plano escapado sin romperse.

```javascript
var editor = new meWYSE({
  target: '#editor',
  codeHighlight: true,   // activa el resaltado
  // La librería se descarga una sola vez, solo si codeHighlight es true
  codeHighlightUrl: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js'
});
```

- El **modelo se mantiene siempre en texto plano**: al editar se persiste el texto (no el HTML del
  resaltado), así los `<span>` de los tokens nunca entran al contenido ni al sanitizador.
- Cada bloque de código muestra un **selector de lenguaje** en la esquina (SQL, JavaScript,
  Python, Java, JSON, HTML, CSS…). Sin lenguaje seleccionado se auto-detecta.
- El resaltado se aplica al renderizar y se **re-pinta al perder el foco** (sin saltos de caret).
- No necesita la hoja de estilos externa de la librería: los colores de los tokens se mapean a
  las **variables del tema** de meWYSE (claro/oscuro).
- Export: `<pre><code class="language-xxx">` en HTML y ` ```lenguaje ` en Markdown.

```javascript
// El lenguaje se guarda en block.language
{ id: 3, type: 'code', language: 'sql', content: 'SELECT id FROM clientes' }
```

## Bloques desplegables (toggle)

Bloque plegable con **título** y **cuerpo**, ideal para FAQs o secciones opcionales. El cuerpo es
texto enriquecido inline/multilínea (no admite sub-bloques como tablas o imágenes).

```javascript
{
  id: 4,
  type: 'toggle',
  toggleTitle: 'Ver detalles',   // título (HTML inline)
  content: 'Cuerpo del <strong>desplegable</strong>.', // cuerpo (HTML inline)
  collapsed: false               // true = plegado por defecto
}
```

- Pulsa el **triángulo** para plegar/desplegar (o `/desplegable` para crear uno).
- En el título, `Enter` salta al cuerpo (expandiéndolo si estaba plegado); en el cuerpo, `Enter`
  inserta un salto de línea **dentro** del bloque (no lo parte).
- Export: `<details><summary>título</summary>cuerpo</details>` (con `open` si no está plegado);
  Markdown lo degrada a `**título**` + cuerpo.

## Índice de contenidos (TOC)

Bloque `toc` que genera un **índice navegable de los títulos** del documento. El contenido es
derivado (no se almacena) y se **actualiza solo** a medida que editas los títulos.

```javascript
{ id: 1, type: 'toc', content: '' }   // o crea uno con /indice
```

- Cada entrada enlaza a su título (clic → scroll + foco), con indentación por nivel (h1/h2/h3).
- Si aún no hay títulos, muestra un texto de "sin títulos".
- Export: cuando existe un TOC, los títulos se emiten con un id de ancla
  (`id="mewyse-h-{id}"`) y el índice como `<nav class="mewyse-toc">` con enlaces; Markdown lo
  degrada a una lista anidada `- [texto](#ancla)`.

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd+B` | Negrita |
| `Ctrl/Cmd+I` | Cursiva |
| `Ctrl/Cmd+U` | Subrayado |
| `Ctrl/Cmd+K` | Insertar enlace |
| `Ctrl/Cmd+Shift+K` | Limpiar formato |
| `Ctrl/Cmd+E` | Código inline (`<code>`) |
| `Ctrl/Cmd+.` | Superíndice (`<sup>`) |
| `Ctrl/Cmd+,` | Subíndice (`<sub>`) |
| `Ctrl/Cmd+Shift+X` | Tachado |
| `Ctrl/Cmd+F` | Buscar y reemplazar |
| `Ctrl/Cmd+Z` | Deshacer |
| `Ctrl/Cmd+Y` o `Ctrl/Cmd+Shift+Z` | Rehacer |
| `Ctrl/Cmd+Alt+1/2/3` | Cambiar a Heading 1/2/3 |
| `Ctrl/Cmd+Alt+0` | Cambiar a Párrafo |
| `Ctrl/Cmd+Shift+7` | Lista numerada |
| `Ctrl/Cmd+Shift+8` | Lista con viñetas |
| `Tab` (en lista) | Indentar item |
| `Shift+Tab` (en lista) | Desindentar item |
| `Enter` | Nuevo bloque (o nueva línea en listas) |
| `Backspace` en bloque vacío | Eliminar bloque |
| `↑` al inicio del bloque | Ir al bloque anterior |
| `↓` al final del bloque | Ir al bloque siguiente |
| `/` | Abrir menú de tipos de bloque |
| `@` | Abrir menú de menciones |
| `#` | Abrir menú de etiquetas (si hay `tags`) |
| `:` | Abrir selector de emojis |
| `Escape` | Cerrar menú abierto |

La toolbar incluye además **botones de sangría** (indentar/desindentar) que se habilitan/
deshabilitan según el ítem de lista con foco (mismo efecto que `Tab`/`Shift+Tab`).

## Formato de Texto

Al seleccionar texto aparece un menú flotante con:

- **Negrita** / **Cursiva** / **Subrayado** / **Tachado**
- **Subíndice** / **Superíndice** (`<sub>` / `<sup>`)
- **Enlace**: Crear hipervínculo con modal (y quitarlo)
- **Color de texto**: Selector de colores
- **Color de fondo**: Selector de colores para highlight
- **Alineación**: Izquierda, centro, derecha, justificado
- **Cambiar mayúsculas/minúsculas**: Toggle de capitalización
- **Limpiar formato**: Eliminar todo el formato inline

Con la toolbar, además: **fuente / tamaño / interlineado** (opción `fontControls`) y un picker de
**caracteres especiales** (©, →, €, ½…).

### Editor sin toolbar (menú flotante)

`toolbar: false` es el **modo por defecto**: un editor minimalista sin barra superior. Todo el
formato se aplica desde el **menú flotante** que aparece al seleccionar texto, y los bloques se
insertan escribiendo `/` (menú slash). Ideal para formularios, comentarios o campos embebidos
donde una toolbar fija ocuparía demasiado.

```javascript
var editor = new meWYSE({
  target: '#miEditor',
  toolbar: false
});
```

El botón de resumen/esquema aparece como un icono discreto en la esquina superior derecha (en vez
de en la toolbar). Los botones del menú flotante muestran su descripción en un tooltip al pasar el
cursor.

## Tablas

Las tablas se crean desde el menú slash (`/tabla`) o el botón de la toolbar. Al situar el cursor en una celda aparece una **toolbar contextual flotante** encima de la tabla, con todas las operaciones (los índices de fila/columna se refieren a la celda con foco). Características:

### Operaciones con celdas
- **Selección por rango**: Click y arrastrar para seleccionar múltiples celdas
- **Merge**: Combinar celdas seleccionadas (soporta colspan y rowspan)
- **Unmerge**: Separar una celda combinada en celdas individuales
- **Color de fondo**: Selector de color para las celdas seleccionadas

### Operaciones con filas
- Insertar fila arriba / abajo
- Duplicar fila
- Limpiar contenido de fila
- Eliminar fila

### Operaciones con columnas
- Insertar columna a la izquierda / derecha
- Duplicar columna
- Limpiar contenido de columna
- Eliminar columna

### Redimensionar columnas
- Arrastrar los bordes entre columnas para ajustar el ancho
- Botón "Resetear ancho" para volver al ancho uniforme

## Imágenes

Las imágenes se insertan desde el menú slash (`/imagen`) o el botón de la toolbar:

1. Se abre un selector de archivo
2. Modal para configurar dimensiones (ancho/alto en píxeles)
3. La imagen se inserta como bloque con redimensionado por drag
4. Click en la imagen para seleccionarla y ver el botón de edición
5. El botón de edición permite cambiar las dimensiones

Las imágenes también se pueden insertar dentro de celdas de tabla.

## Vídeo (previsualización + carga perezosa)

Se insertan desde `/video` o el botón de la toolbar (URL de YouTube/Vimeo/`.mp4`).
El bloque **guarda solo la URL** en `content`; las dimensiones van en `width`/`height`:

```javascript
{ id: 2, type: 'video', content: 'https://www.youtube.com/watch?v=...', width: 640, height: 360 }
```

- El `provider`/`videoId` se **derivan** de la URL (nunca se almacenan). Se reconocen
  YouTube (`watch`, `youtu.be`, `embed`, `shorts`, `live`, `m.`…), Vimeo (incl. URLs de
  canal/hash) y archivos (`.mp4/.webm/.ogg`).
- **Previsualización**: se muestra una miniatura (YouTube) o una caja con botón de play.
  El **iframe/`<video>` solo se carga al pulsar play** (mejor rendimiento y privacidad);
  un botón permite volver a la previsualización.
- Es un **bloque como una imagen**: selecciónalo (click) para ver el handle flotante,
  el borde de selección, **redimensionar por drag** (mantiene el ratio) y el botón de
  editar dimensiones. Teclado con el vídeo seleccionado: `Delete` borra, `Escape`
  deselecciona, `Enter` crea un párrafo debajo.
- Compat: el formato antiguo (`content` como objeto `{provider,videoId,url,width,height}`)
  se **migra** automáticamente a `content` = URL + `width`/`height` al sanitizar.

`getHTML()`/`getHTMLSource()` emiten el `<iframe>`/`<video>` con las dimensiones;
`getMarkdown()` degrada a `[Vídeo](url)`.

## Altura del editor

Por defecto el editor crece con el contenido entre un mínimo y un máximo (con scroll
interno). Se puede configurar con opciones (número = px, o string CSS como `'30vh'`):

```javascript
new meWYSE({ target: '#ed', autoExpand: true, minHeight: 100, maxHeight: 320 });
```

- `minHeight` / `maxHeight`: suelo / techo del área de edición.
- `autoExpand: true` **sin** `maxHeight` → crece sin tope (scrollea la página); **con**
  `maxHeight` → crece hasta el límite y luego scroll interno.

## Drag & Drop

Cada bloque tiene un handle flotante (icono de arrastre) que aparece junto al bloque **con foco** (no por hover; los separadores, que no reciben foco, sí usan hover):

- **Arrastrar**: Click en el handle y arrastrar a otra posición
- **Click**: Abre el menú contextual del bloque (cambiar tipo, insertar, duplicar, eliminar)

La toolbar también incluye botones de **mover arriba/abajo** para reordenar el bloque con foco sin usar drag.

## Selección Multi-Bloque

Permite seleccionar y operar sobre múltiples bloques simultáneamente:

- **Arrastrar** entre bloques: Selecciona el rango de bloques
- Las operaciones disponibles sobre la selección son:
  - **Copiar** (`Ctrl/Cmd+C`)
  - **Formatear** (negrita, cursiva, etc. desde el menú flotante)
  - **Cambiar mayúsculas/minúsculas**
  - **Eliminar** (`Delete` o `Backspace`)
- **Escape**: Limpiar selección

## Undo / Redo

- Historial de hasta **50 estados** con snapshots del array de bloques
- **Debounce de 300ms** para agrupar ediciones rápidas en un solo estado
- Accesible desde toolbar (botones ⟲/⟳) o atajos de teclado
- Tras la **carga inicial** el historial arranca limpio (una sola entrada): "deshacer" queda deshabilitado hasta el primer cambio real

## Render incremental

Las operaciones de bloque no reconstruyen el documento entero: actualizan **solo el DOM del bloque afectado** y dejan el resto intacto.

- **Cubre**: insertar, borrar, convertir tipo, mover/reordenar, duplicar, alinear, indentar/desindentar, insertar/editar/redimensionar imagen, y las de multi-selección (alinear/tipo/borrar).
- **Ventajas**: se conserva el **foco y el caret** del resto de bloques, no hay parpadeo (flicker), y escala en documentos grandes.
- **Fallback automático**: cuando la operación reestructura la **agrupación de listas** (fusionar o partir un `<ul>/<ol>`), se hace un re-render completo — siempre correcto.

Es transparente: no requiere configuración ni cambios en tu código.

## Temas

### Dark Mode

```javascript
// Por defecto: tema CLARO (sin especificar theme)
var editor = new meWYSE({ target: '#editor' });

// Forzar dark mode
var editor = new meWYSE({ target: '#editor', theme: 'dark' });

// Seguir al sistema
var editor = new meWYSE({ target: '#editor', theme: 'auto' });
// → Detecta prefers-color-scheme del OS
// → Escucha cambios en tiempo real
```

El dark mode aplica la clase `mewyse-editor-dark` al contenedor y sobreescribe las CSS variables (colores de texto, fondos, bordes, etc.).

Los menús flotantes (slash, menciones, formato, opciones) reciben la clase `mewyse-dark` automáticamente.

### Tema Compact

```javascript
var editor = new meWYSE({ target: '#editor', theme: 'compact' });
```

Reduce padding, fuentes y espaciado. Ideal para sidebars y formularios con espacio limitado.

### Temas Custom

Cualquier valor de `theme` añade la clase `mewyse-editor-{theme}` al contenedor. Define tus propios estilos sobreescribiendo las CSS variables:

```css
.mewyse-editor-miTema {
  --mewyse-bg-primary: #fff8e1;
  --mewyse-text-primary: #3e2723;
  --mewyse-accent: #ff6f00;
}
```

## Estilos de Contenido

Todo el CSS vive en `mewyse.css` (cargado vía `<link>`). Por defecto, el editor activa los estilos de contenido añadiendo la clase `mewyse-editor-styled` al wrapper y al container (las reglas visuales de `mewyse.css` cuelgan de esa clase).

Con `contentStyles: false`, el editor **no añade** `mewyse-editor-styled`, por lo que no se aplica ningún estilo visual de contenido ni del contenedor (solo unas reglas estructurales mínimas). La página es responsable de estilizar todo:

```javascript
var editor = new meWYSE({
  target: '#miEditor',
  toolbar: true,
  contentStyles: false
});
```

```css
/* La página define sus propios estilos para el contenido del editor */
#miEditor .mewyse-editor {
  padding: 16px;
  min-height: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
#miEditor h1 { font-size: 2em; color: navy; }
#miEditor h2 { font-size: 1.5em; }
#miEditor blockquote { border-left: 4px solid blue; padding: 12px; }
#miEditor pre { background: #1e293b; color: #e2e8f0; padding: 16px; }
#miEditor table { border-collapse: collapse; width: 100%; }
#miEditor td, #miEditor th { border: 1px solid #ddd; padding: 8px; }
```

Se pueden mezclar editores con y sin estilos inyectados en la misma página:

```javascript
var ed1 = new meWYSE({ target: '#a' });                        // estilos propios
var ed2 = new meWYSE({ target: '#b', contentStyles: false });   // hereda de la página
```

## Menciones (@mentions)

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  mentions: [
    { id: '1', name: 'Juan García', avatar: 'https://ejemplo.com/avatar1.jpg' },
    { id: '2', name: 'María López' },  // avatar es opcional
    { id: '3', name: 'Carlos Ruiz', avatar: 'https://ejemplo.com/avatar3.jpg' }
  ]
});
```

| Propiedad | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `id` | string | Identificador único | Sí |
| `name` | string | Nombre a mostrar | Sí |
| `avatar` | string | URL de la imagen de avatar | No |

**Uso:**
1. Escribe `@` para abrir el menú
2. Continúa escribiendo para filtrar (ej: `@ju` → "Juan García")
3. Navega con `↑` `↓` y selecciona con `Enter`
4. `Escape` para cerrar

**HTML generado:**

```html
<span class="mewyse-mention"
      data-mention-id="1"
      data-mention-name="Juan García"
      contenteditable="false">@Juan García</span>
```

## Emoji Picker

Escribe `:` seguido del nombre del emoji para abrir el selector:

1. Escribe `:` para abrir el menú
2. Continúa escribiendo para filtrar (ej: `:son` → "sonrisa")
3. Navega con `↑` `↓` y selecciona con `Enter`
4. `Escape` para cerrar

## Variables / Merge tags (`{{campo}}`)

Para plantillas de documento (facturas, cartas, informes del ERP). Se insertan como cápsulas no
editables y se resuelven al generar el documento:

```javascript
var editor = new meWYSE({
  target: '#editor', toolbar: true,
  mergeTags: [
    { id: 'cli', name: 'cliente', label: 'Nombre del cliente' },
    { id: 'imp', name: 'importe', label: 'Importe total' }
  ]
});
```

- **Insertar**: escribe `{{` (abre el menú filtrable) o usa el botón de la toolbar. Se inserta una
  cápsula `<span class="mewyse-mergetag" data-merge-name="cliente">{{cliente}}</span>`.
- **Exportar como plantilla**: `getHTML()`/`getMarkdown()` emiten el literal `{{cliente}}`.
- **Resolver** (generar el documento final): `editor.getResolvedHTML({ cliente: 'ACME S.L.', importe: '1.250,00' })`
  sustituye cada variable por su valor **escapado** (sin mutar el editor). Las variables sin valor
  quedan como `{{campo}}`.

## Etiquetas (#tags)

Similar a las menciones, pero con el trigger `#` y una lista de etiquetas configurable:

```javascript
var editor = new meWYSE({
  target: '#editor',
  tags: [
    { id: 'urgente', name: 'Urgente', color: '#e53935' },
    { id: 'idea',    name: 'Idea',    color: '#43a047' },
    { id: 'revisar', name: 'Revisar' }  // color es opcional
  ]
});
```

| Propiedad | Tipo | Descripción | Requerido |
|-----------|------|-------------|-----------|
| `id` | string | Identificador único | Sí |
| `name` | string | Nombre a mostrar | Sí |
| `color` | string | Color de fondo de la cápsula (hex) | No |

**Uso:** escribe `#`, filtra escribiendo, navega con `↑`/`↓` y selecciona con `Enter`. Se inserta una cápsula `<span class="mewyse-tag" ...>` con el color de contraste calculado automáticamente.

## Soporte Markdown

### Exportar

```javascript
var md = editor.getMarkdown();
// # Mi Documento
//
// Un párrafo con **negrita** y *cursiva*.
//
// > Una cita inspiradora
//
// - Item 1
// - Item 2
//
// | Nombre | Rol |
// | --- | --- |
// | Juan | Dev |
//
// ```
// var x = 1;
// ```
//
// ---
```

### Importar

```javascript
editor.loadFromMarkdown('# Título\n\nTexto con **negrita**.\n\n- Item 1\n- Item 2');
```

### Conversión de formatos inline

| Markdown | HTML generado |
|----------|---------------|
| `**texto**` | `<b>texto</b>` |
| `*texto*` | `<i>texto</i>` |
| `~~texto~~` | `<s>texto</s>` |
| `` `código` `` | `<code>código</code>` |
| `[enlace](url)` | `<a href="url">enlace</a>` |
| `- [x] tarea` | Checklist marcado |
| `- [ ] tarea` | Checklist sin marcar |
| `![alt](url)` | Bloque imagen |
| `\| a \| b \|` | Tabla |

Los estilos inline (color, background), `<u>`, `<sub>`, `<sup>` y `<mark>` se conservan como HTML crudo en el Markdown exportado.

### Round-trip

```javascript
var md = editor.getMarkdown();
editor.loadFromMarkdown(md);  // El contenido se preserva
```

## Resumen y Estadísticas

Con `summary: true` (activo por defecto), aparece un botón (☰) en la toolbar:

- **Hover**: Tooltip con índice rápido de encabezados (H1, H2, H3)
- **Click**: Abre un **panel de esquema lateral** (vista tipo Word) anclado a la derecha del editor, que empuja el contenido y muestra:
  - **Estadísticas**: Palabras, caracteres, párrafos, tiempo de lectura (~200 palabras/min)
  - **Índice de navegación**: Click en cualquier heading para ir directamente
  - Se refresca en vivo mientras editas. Sin toolbar/wrapper, cae a un modal clásico.

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  summary: true
});
```

## Internacionalización (i18n)

```javascript
// Español (por defecto)
var editor = new meWYSE({ target: '#editor' });

// Inglés
var editor = new meWYSE({ target: '#editor', lang: 'en' });

// Traducciones personalizadas (parcial o completo)
var editor = new meWYSE({
  target: '#editor',
  lang: {
    blockTypes: {
      paragraph: 'Paragraphe',
      heading1: 'Titre 1'
    },
    tooltips: {
      bold: 'Gras',
      italic: 'Italique'
    },
    modals: {
      cancel: 'Annuler',
      save: 'Enregistrer'
    }
  }
});
```

**Idiomas incluidos:** `'es'` (español, por defecto), `'en'` (inglés)

**Categorías de traducción:**

| Categoría | Descripción |
|-----------|-------------|
| `blockTypes` | Nombres de tipos de bloque |
| `blockTypeDescriptions` | Descripciones en el menú slash |
| `tooltips` | Tooltips de botones y controles |
| `blockMenu` | Opciones del menú contextual de bloque |
| `tableMenu` | Opciones del menú de tabla |
| `modals` | Textos de modales (imagen, enlace, resumen) |
| `summary` | Modal de resumen del documento |
| `colors` | Selector de colores |
| `placeholders` | Placeholders de campos y bloques |
| `alerts` | Mensajes de alerta |
| `misc` | Textos varios (media, etiquetas de export) |
| `aria` | Etiquetas ARIA de los menús (menciones, emoji, etiquetas) |
| `findReplace` | Diálogo de buscar y reemplazar |
| `counter` | Barra del contador de palabras/caracteres |
| `tableProperties` | Modal de propiedades de la tabla |

## Herramientas Avanzadas

### Buscar y Reemplazar

Atajo `Ctrl/Cmd+F` (o botón de la lupa en la toolbar) abre un panel flotante con:

- Campo de búsqueda con resaltado en tiempo real
- Campo de reemplazo
- Opciones: distinguir mayúsculas, palabra completa
- Navegación **↑/↓** entre coincidencias (también Shift+Enter para anterior, Enter para siguiente)
- Botones de reemplazar uno / reemplazar todos
- Contador `actual de total` o `sin resultados`

```javascript
// Habilitado por defecto. Para desactivar:
var editor = new meWYSE({
  target: '#editor',
  findReplace: false
});
```

### Pantalla Completa

Expande el editor a toda la ventana del navegador. Pulsa **Escape** para salir.

```javascript
// Habilitado por defecto. Para desactivar el botón:
var editor = new meWYSE({
  target: '#editor',
  fullscreen: false
});
```

### Mostrar Bloques (debug view)

Modo que dibuja bordes punteados alrededor de cada bloque y muestra su tipo. Útil para diseñadores, QA, o al entender la estructura de un documento.

```javascript
var editor = new meWYSE({
  target: '#editor',
  showBlocksToggle: true  // default true
});
```

### Contador de Palabras / Caracteres

Barra inferior que muestra palabras, caracteres y tiempo estimado de lectura en tiempo real.

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  charCounter: true  // default false
});
```

### Soporte RTL (derecha-a-izquierda)

Para idiomas como árabe, hebreo o urdu:

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  rtl: true,
  lang: 'ar'  // si tienes traducción al árabe
});
```

### Pegado desde Word / Excel / Google Docs

meWYSE limpia automáticamente el HTML pegado desde aplicaciones Office:

- Elimina namespaces `mso-*`, `v:*`, `w:*`, `m:*`, comentarios XML y metadatos
- Convierte párrafos simulando listas (con viñetas `·`, `•`, `o` o numeración) en `<ul>`/`<ol>` reales
- Preserva bold/italic/underline inferidos de estilos inline antes de limpiar
- Desenvuelve `<span>` y `<font>` sin atributos útiles
- Elimina párrafos vacíos y zero-width chars

### Propiedades de la tabla

Cuando el cursor está dentro de una tabla aparece una **toolbar contextual flotante** encima de ella (con las operaciones de fila/columna, combinar/descombinar, color de celda, etc.). Su botón **"Propiedades de la tabla"** abre un modal con los siguientes ajustes:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| **Ancho** | `number` (px) | Ancho fijo de la tabla |
| **Alto** | `number` (px) | Alto fijo de la tabla |
| **Espacio entre celdas** | `number` (px) | `border-spacing` (activa `border-collapse: separate`) |
| **Relleno de celda** | `number` (px) | `padding` aplicado a cada `<td>`/`<th>` |
| **Grosor del borde** | `number` (px) | Ancho del borde de cada celda |
| **Estilo de borde** | `solid`, `dashed`, `dotted`, `double`, `none` | Estilo CSS del borde |
| **Color del borde** | color picker | Color hex del borde |
| **Alineación** | `left`, `center`, `right` | Posición de la tabla en el bloque |
| **Color de fondo** | color picker | Fondo de la tabla (botón "Restablecer" para quitar) |

El modal lee los valores actuales de la tabla al abrirse. Los cambios se guardan en una propiedad `tableStyle` del bloque (para el `<table>`) y como estilos inline en cada `<td>/<th>` para borde y padding.

```javascript
// Estructura resultante en el modelo
{
  id: 1,
  type: 'table',
  tableStyle: 'width: 500px; height: 300px; border-collapse: separate; ...',
  content: '<tr><td style="border: 2px dashed #ff0000; padding: 10px"><p>...</p></td>...'
}
```

### Exportación limpia de tablas

El editor añade controles internos a las celdas (botones de opciones de fila/columna, handles de redimensionado, `contenteditable="true"` en los `<p>` de celdas, `position: relative` en `<td>`, etc.) que son necesarios para la UI de edición pero no deben aparecer en el export.

Al llamar `editor.getHTML()` o `editor.getJSON()`, el contenido de las tablas se **limpia automáticamente** eliminando:

- `<button class="mewyse-table-row-control">` / `col-control`
- `<div class="mewyse-table-resize-handle">`
- `<button class="mewyse-table-add-row">` / `add-col`
- Atributo `contenteditable` y `data-placeholder` en `<p>` internos
- `position: relative` en `<td>`/`<th>`
- Estilos internos del editor (`padding: 8px; margin: 0; min-height: 1em`) en los `<p>` de celdas

**Antes del fix**:
```html
<tbody><tr><td style="border: 1px solid #ddd; padding: 0; position: relative;">
  <p contenteditable="true" data-placeholder="" style="padding: 8px; margin: 0; min-height: 1em;">Cell</p>
  <button class="mewyse-table-row-control" tabindex="-1" contenteditable="false">
    <svg>...</svg>
  </button>
</td>...
```

**Después del fix**:
```html
<tr><td style="border: 1px solid rgb(221, 221, 221); padding: 0px">
  <p>Cell</p>
</td>...
```

La limpieza se aplica automáticamente en `updateBlockContent()` (cuando el editor guarda cambios internos) y como red de seguridad en `getFilteredBlocks()` (cuando se exporta).

## Estilos custom (styleFormats)

Definir estilos personalizados que aparecen en el dropdown de tipos de bloque:

```javascript
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  styleFormats: [
    { title: 'Destacado',        block: 'p',          className: 'destacado' },
    { title: 'Aviso importante', block: 'blockquote', className: 'aviso' },
    { title: 'Nota al margen',   block: 'p',          className: 'nota-margen' }
  ]
});
```

En tu CSS defines las apariencias:
```css
.destacado { background: yellow; padding: 8px; }
.aviso { border-left: 4px solid red; padding-left: 12px; }
.nota-margen { font-size: 0.9em; color: #666; }
```

Al abrir el dropdown de tipos aparecerán tras los tipos estándar con un preview del estilo aplicado.

- **Validación**: los `className` deben ser identificadores CSS válidos (`^[a-zA-Z_][\w-]*$`). Inválidos se descartan.
- **Seguridad**: solo las clases declaradas en `styleFormats` pasan el sanitizer. Si alguien intenta inyectar `customClass: "hacker"`, se elimina.
- **Block type**: cada estilo se aplica sobre un tipo base (`paragraph`, `quote`, `heading1-3`, `bulletList`, etc.). `blockquote` es alias de `quote`.

## Migración desde TinyMCE / CKEditor

El método `loadFromHTML(html)` permite migrar contenido HTML generado por otros editores al modelo de bloques de meWYSE sin pérdida de datos.

### Elementos soportados en la migración

| Elemento HTML | Se convierte a |
|---------------|----------------|
| `<p>`, `<h1>-<h3>`, `<blockquote>`, `<pre>` | Bloques correspondientes |
| `<ul>`, `<ol>`, `<li>` | bulletList / numberList |
| `<table>` con `style` inline | Bloque `table` preservando `tableStyle` (ancho/alto/borde) |
| `<img src="..."` | Bloque `image` |
| `<iframe src="youtube.com/...">` | Bloque `video` (provider=youtube) |
| `<iframe src="vimeo.com/...">` | Bloque `video` (provider=vimeo) |
| `<video src="...">` | Bloque `video` (provider=file) |
| `<audio src="...">` | Bloque `audio` |
| `<hr>` | divider |

### Equivalencia de configuración TinyMCE → meWYSE

| Config TinyMCE | meWYSE |
|----------------|--------|
| `plugins: 'paste ... table textcolor visualblocks wordcount casechange'` | Incluido nativo |
| `plugins: 'fullscreen code'` | `fullscreen` ✅ / `code` (vista HTML) no aplica — modelo block-based |
| `plugins: 'media'` | Bloques `video` + `audio` |
| `plugins: 'imagetools'` | ❌ (Sprint 3 — rotar/cropear no implementado) |
| `toolbar: 'undo redo styleselect ...'` | `toolbar: true` |
| `toolbar: '... removeformat ...'` | Botón incluido en grupo de formato |
| `toolbar: '... outdent indent ...'` | Botones de sangría en la toolbar + `Tab`/`Shift+Tab` (listas anidadas) |
| `paste_as_text: true` | `pasteAsText: true` |
| `paste_data_images: true` | Drag & drop + paste clipboard de imagen funcionan por defecto |
| `file_picker_callback` con validación 1MB | `imageMaxSize: 1024000` + opcional `onImageUpload` |
| `content_css: '...'` | `contentStyles: false` + CSS propio de la página |
| `language: 'es'` | `lang: 'es'` |
| `setup: ed.on('Change', ...)` | `onChange(data)` en constructor |

### Ejemplo completo de migración

```javascript
// Antes (TinyMCE)
tinymce.init({
  selector: '#editor',
  plugins: 'paste lists image link media code fullscreen table textcolor visualblocks wordcount casechange',
  paste_as_text: true,
  paste_data_images: true,
  language: 'es',
  setup: function(ed) {
    ed.on('Change', function() { /* ... */ });
  }
});

// Después (meWYSE)
var editor = new meWYSE({
  target: '#editor',
  toolbar: true,
  lang: 'es',
  pasteAsText: true,
  imageMaxSize: 1024000,
  imageMaxSizeError: 'La imagen no puede superar 1MB de peso.',
  onChange: function(data) { /* ... */ }
});

// Migrar contenido existente de la BD
editor.loadFromHTML(contenidoLegacyDeTinyMCE);
```

## Seguridad (XSS Protection)

meWYSE sanitiza **automáticamente** todo el contenido que entra al modelo de bloques contra inyección de código (XSS). No hace falta configurar nada — el whitelist estricto se aplica en todos los puntos de entrada.

### Puntos de entrada protegidos

| Entry point | Protección |
|-------------|------------|
| Constructor (`options.blocks`) | `_sanitizeBlocks()` |
| `loadFromJSON(data)` | `_sanitizeBlocks()` |
| `loadFromMarkdown(md)` | Escape previo del texto + `_sanitizeBlocks()` |
| Paste (HTML/Word/Excel/Docs) | `sanitizeHTML()` + `cleanPastedDocument()` |
| Tipeo en contenteditable | Escape nativo del navegador |

### Whitelist de tags permitidos

**Inline**: `b, strong, i, em, u, s, strike, del, code, mark, sub, sup, br, a, span, font`
**Dentro de tablas**: `table, tbody, thead, tfoot, tr, td, th, p, h1-h3, blockquote, pre, ul, ol, li`
**Imágenes** (solo en `getSafeHTML()`): `img` con `src` validado

### Qué se bloquea automáticamente

- Tags peligrosos: `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, `<input>`, `<button>`, `<style>`, `<link>`, `<meta>`, `<base>`, `<svg>`, `<math>`, `<video>`, `<audio>`
- Event handlers: `onclick`, `onerror`, `onload`, `onmouseover`, etc. — **cualquier atributo `on*`**
- URLs peligrosas en `href`: `javascript:`, `vbscript:`, `livescript:`, cualquier `data:` y `file:` (incluye ataques con tabs, newlines o mayúsculas). En `src` de imagen solo se permiten `http(s)`, rutas relativas y `data:image/*` (excepto SVG)
- CSS peligroso: `expression()`, `url(...)`, `@import`, `javascript:`, comillas, comentarios y escapes con backslash en style
- `<a target="_blank">` se fuerza a tener `rel="noopener noreferrer"`
- Clases CSS en `<span>`: solo se permiten `mewyse-mention`, `mewyse-emoji`, `mewyse-search-highlight`

### Qué se preserva

- Menciones: `<span class="mewyse-mention" data-mention-id data-mention-name contenteditable="false">`
- Emojis: `<span class="mewyse-emoji" data-name data-type="emoji" contenteditable="false">`
- Colores inline: `<span style="color: red; background-color: yellow">`
- Enlaces seguros: `<a href="https://..." title target rel>`
- Formato de texto: `<b>`, `<i>`, `<u>`, `<s>`, `<code>`, `<mark>`, `<sub>`, `<sup>`
- Tablas con `colspan`, `rowspan`, background-color por celda

### Mostrar HTML como texto literal (documentación)

Si necesitas mostrar `<div>`, `<script>` o cualquier etiqueta como **texto literal** (por ejemplo, en un tutorial de programación):

| Caso de uso | Cómo |
|-------------|------|
| Snippet multilínea | **Bloque de código** (escribe `/code` o pulsa `/` y elige "Código") — escape automático |
| Snippet inline (`<span>`) | Usa `<code>` inline escribiendo <code>`&lt;span&gt;`</code> con backticks en Markdown |
| Texto plano con `<` y `>` | Al tipear, el navegador escapa automáticamente |

### Exportación segura

```javascript
var html = editor.getHTML();        // HTML normal (ya viene sanitizado desde el modelo)
var safeHtml = editor.getSafeHTML(); // Extra seguro: re-sanitiza antes de devolver
```

`getSafeHTML()` es útil cuando el consumidor va a insertar el HTML en otra parte de la aplicación sin otra capa de sanitización.

### Defensa en profundidad

Aunque meWYSE sanitiza proactivamente, para aplicaciones críticas se recomienda añadir **Content Security Policy (CSP)** en la aplicación:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```

Esto bloquea cualquier script inline aunque se escapara alguna vulnerabilidad.

### Ejemplos

```javascript
// Estos intentos de inyección son neutralizados automáticamente:

// 1. Script en bloque inicial
new meWYSE({
  target: '#editor',
  blocks: [{ id: 1, type: 'paragraph',
             content: '<script>alert(1)</script>Hola' }]
});
// Resultado: contenido = "Hola" (script eliminado)

// 2. Event handler
editor.loadFromJSON([{ id: 1, type: 'paragraph',
  content: '<img src=x onerror="alert(1)">' }]);
// Resultado: contenido = "" (img no está en whitelist)

// 3. URL javascript:
editor.loadFromMarkdown('[click](javascript:alert(1))');
// Resultado: <a href="#">click</a>

// 4. Ataques con encoding (tabs, case mixing, etc.)
editor.loadFromJSON([{ id: 1, type: 'paragraph',
  content: '<a href="JaVa\tScRiPt:alert(1)">x</a>' }]);
// Resultado: <a href="#">x</a>
```

## Personalización CSS

El editor usa clases CSS con prefijo `mewyse-` y CSS custom properties con prefijo `--mewyse-`.

### Clases principales

| Clase | Elemento |
|-------|----------|
| `.mewyse-editor-wrapper` | Wrapper (contiene toolbar + editor) |
| `.mewyse-editor` | Contenedor del editor |
| `.mewyse-toolbar` | Barra de herramientas |
| `.mewyse-block` | Cada bloque de contenido |
| `.mewyse-floating-handle` | Handle de arrastre flotante |
| `.mewyse-format-menu` | Menú flotante de formato |
| `.mewyse-slash-menu` | Menú slash (/) |
| `.mewyse-mention-menu` | Menú de menciones (@) |
| `.mewyse-emoji-menu` | Menú de emojis (:) |
| `.mewyse-options-menu` | Menú contextual de bloque |
| `.mewyse-table-wrapper` | Wrapper de tablas |
| `.mewyse-image-wrapper` | Wrapper de imágenes |
| `.mewyse-find-replace` | Diálogo flotante de buscar/reemplazar |
| `.mewyse-search-highlight` | Marca una coincidencia de búsqueda |
| `.mewyse-search-highlight.current` | Coincidencia actualmente seleccionada |
| `.mewyse-fullscreen` | Editor en modo pantalla completa |
| `.mewyse-show-blocks` | Modo debug con bordes visibles |
| `.mewyse-char-counter` | Barra inferior con contador |
| `.mewyse-rtl` | Editor en modo RTL |

### CSS Variables

Las variables se definen en `:root` y pueden sobreescribirse por tema:

```css
/* Principales variables disponibles */
--mewyse-text-primary      /* Color de texto principal */
--mewyse-text-secondary    /* Color de texto secundario */
--mewyse-text-muted        /* Color de texto atenuado */
--mewyse-bg-primary        /* Fondo principal */
--mewyse-bg-secondary      /* Fondo secundario (toolbar) */
--mewyse-bg-hover          /* Fondo en hover */
--mewyse-border-light      /* Color de bordes */
--mewyse-accent            /* Color de acento */
--mewyse-shadow-sm         /* Sombra pequeña */
--mewyse-shadow-md         /* Sombra mediana */
--mewyse-radius-md         /* Border radius mediano */
--mewyse-radius-xl         /* Border radius grande */
```

## Compatibilidad

- ECMAScript 5 (no requiere transpilación)
- Todos los navegadores modernos: Chrome, Firefox, Safari y Edge (versiones actuales)
- No requiere build tools, bundler ni package manager

> **Nota sobre IE11**: aunque el código fuente es ES5 (sin `const`/`let`/arrow/etc.),
> el editor usa APIs del DOM no disponibles en Internet Explorer 11 (`Element.closest`,
> `ChildNode.remove`, `String.prototype.normalize`, selector `:scope`, `NodeList.forEach`)
> sin polyfills, por lo que **no es compatible con IE11**. IE11 está fuera de soporte
> desde junio de 2022.

## Licencia

MIT
