// Tipos de meWYSE (núcleo). El editor es un constructor ES5 sin dependencias.

export interface MeWyseBlock {
  id: number;
  /** 'paragraph' | 'heading1'..'heading3' | 'quote' | 'code' | 'bulletList' |
   *  'numberList' | 'checklist' | 'table' | 'image' | 'video' | 'audio' |
   *  'divider' | 'pageBreak' | 'callout' | 'toggle' | 'toc' */
  type: string;
  content?: any;
  checked?: boolean;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  /** Nivel de anidado en listas (bulletList/numberList/checklist), 0-5. */
  indentLevel?: number;
  /** Sangría de párrafo (paragraph/heading1-3/quote), 1-10. Se renderiza y
   *  exporta como margin-inline-start (40px por nivel). Independiente de
   *  indentLevel (que es el anidado de listas). */
  indent?: number;
  customClass?: string;
  tableStyle?: string;
  language?: string;
  toggleTitle?: string;
  collapsed?: boolean;
  calloutVariant?: 'info' | 'warning' | 'success' | 'danger';
  width?: number;
  height?: number;
  /** Un bloque de tipo DESCONOCIDO (no soportado por esta versión) se preserva
   *  íntegro con todas sus propiedades originales (no se pierde el dato). El
   *  editor lo muestra como placeholder de solo lectura y lo re-emite tal cual
   *  en getJSON. Por eso se admiten propiedades arbitrarias. */
  [key: string]: any;
}

export interface MeWyseChangePayload {
  /** Referencia al propio editor: permite usar su API pública (isDirty,
   *  resetDirty, getHTML…) desde el callback sin capturar la instancia en una
   *  variable externa. */
  editor: meWYSE;
  blocks: MeWyseBlock[];
  html: string;
  markdown: string;
  plainText: string;
  json: string;
  /** true si el contenido difiere de la última línea base "limpia"
   *  (carga inicial, último loadFrom*, o última llamada a markPristine).
   *  Equivale a editor.hasChanges()/isDirty(). */
  hasChanges: boolean;
  focusedBlockId?: number;
  focusedBlockType?: string;
}

/** Contexto que reciben los callbacks de una acción (onClick/isEnabled/isActive).
 *  Extiende el payload de onChange (perezoso: html/json/markdown/plainText solo
 *  se serializan al leerse). NO hacer JSON.stringify del ctx: `editor` es circular. */
export interface MeWyseActionContext extends MeWyseChangePayload {
  /** Nombre de la acción que se está ejecutando. */
  action: string;
  /** Desde dónde se disparó. 'state' al evaluar isEnabled/isActive. */
  source: 'toolbar' | 'floating' | 'shortcut' | 'api' | 'state';
  /** Evento original (null si se invocó por API o al evaluar estado). */
  event: Event | null;
  /** Botón que la disparó — útil para anclar un menú propio. */
  button: HTMLElement | null;
  selection: {
    /** Hay selección de texto NO colapsada dentro del editor. */
    has: boolean;
    isCollapsed: boolean;
    text: string;
    range: Range | null;
  };
  /** Bloque con el caret, o null si el foco no está en un bloque. */
  block: { id: number; type: string; content: any } | null;
  /** Solo en un OVERRIDE de acción estándar: ejecuta el comportamiento original
   *  (permite envolverlo en vez de reemplazarlo). No-op en acciones custom. */
  callDefault(): void;
}

/** Definición de una acción de la opción `actions` (o de registerAction).
 *  - `name` ESTÁNDAR (bold, link, print… ver STANDARD_ACTION_NAMES) → sobrescribe
 *    esa acción en toolbar, menú flotante Y atajo de teclado.
 *  - `name` NUEVO → acción custom (requiere `onClick`). */
export interface MeWyseActionDef {
  /** Identificador. Estándar = override; nuevo = acción custom. */
  name: string;
  /** SVG en crudo (empieza por '<'), clave de WYSIWYG_ICONS, o texto (etiqueta). */
  icon?: string;
  /** Texto del tooltip / aria-label. Por defecto, el `name`. */
  tooltip?: string;
  /** Dónde se muestra una acción custom. Default 'toolbar'. */
  placement?: 'toolbar' | 'floating' | 'both';
  /** Posición relativa a una acción ESTÁNDAR. `{after|before}` la coloca dentro
   *  de ese grupo; con `group:'new'` crea un grupo propio (con separadores).
   *  'start'/'end' (o sin position) = grupo propio al inicio/final. Si el nombre
   *  ya aparece en el string `toolbar`, manda el string. */
  position?: 'start' | 'end' | { after?: string; before?: string; group?: 'new' };
  /** Acción a ejecutar. Obligatorio en custom; en un override, omitirlo deja el
   *  comportamiento estándar (útil para solo cambiar icon/tooltip). */
  onClick?: (ctx: MeWyseActionContext) => void;
  /** Deshabilita el botón si no hay selección de texto no colapsada. */
  requiresSelection?: boolean;
  /** Habilitado dinámicamente (se reevalúa al cambiar foco/selección). */
  isEnabled?: (ctx: MeWyseActionContext) => boolean;
  /** Estado "activo" (fondo resaltado), como negrita sobre texto en negrita. */
  isActive?: (ctx: MeWyseActionContext) => boolean;
}

export interface MeWyseMention {
  id: string | number;
  name: string;
  avatar?: string;
  [key: string]: any;
}

export interface MeWyseOptions {
  /** Selector CSS o elemento del DOM donde montar el editor. */
  target: string | HTMLElement;
  blocks?: MeWyseBlock[];
  /** Toolbar declarativa (estilo TinyMCE):
   *  - `true` → todos los ítems por defecto
   *  - string → ítems separados por espacios, `|` crea grupos (ej. 'undo redo | bold italic | link')
   *  - string[] → una fila por string (con toolbarOverflow:'wrap')
   *  - `false`/ausente → sin toolbar
   *  Ítems: undo redo blocktype fontsize bold italic underline strikethrough
   *  subscript superscript case removeformat link forecolor font specialchars
   *  mergetags align outdent indent table image video audio pagebreak find wordwrap summary
   *  showblocks sourcecode markdown fullscreen print exportword exportpdf moveup movedown.
   *  (print entra en el default; exportword/exportpdf no). */
  toolbar?: boolean | string | string[];
  /** Dónde se ofrecen las herramientas dependientes de selección (subscript,
   *  superscript, case, removeformat, link, forecolor, font, fontsize) cuando hay
   *  toolbar:
   *  - 'floating' (default): NO se pintan en la toolbar; aparecen en el menú
   *    flotante de formato al seleccionar texto (aunque la toolbar esté activa).
   *  - 'toolbar': se pintan en la toolbar pero deshabilitadas hasta que hay una
   *    selección de texto no colapsada.
   *  Nota: bold/italic/underline/strikethrough quedan SIEMPRE en la toolbar y
   *  habilitados (toggles de escritura: funcionan con solo el caret). */
  selectionTools?: 'floating' | 'toolbar';
  /** Acciones personalizadas y/o overrides de acciones estándar. Un `name`
   *  estándar sobrescribe esa acción (con `ctx.callDefault()` disponible); un
   *  `name` nuevo añade un botón propio. El orden del array decide el orden
   *  entre acciones custom con la misma ancla. */
  actions?: MeWyseActionDef[];
  /** Acciones estándar a desactivar por nombre, sin tener que redeclarar la
   *  toolbar: desaparecen del botón, del menú flotante y de su atajo de teclado. */
  disabledActions?: string[];
  summary?: boolean;
  /** Tema: 'dark' (oscuro), 'auto' (sigue prefers-color-scheme del OS en vivo),
   *  'compact', o custom. Sin especificar → claro (no auto-detecta). */
  theme?: 'dark' | 'auto' | 'compact' | string;
  readOnly?: boolean;
  rtl?: boolean;
  wordWrap?: boolean;
  contentStyles?: boolean;
  lang?: 'es' | 'en' | Record<string, any>;
  autoFocus?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
  autoExpand?: boolean;
  /** Tipos de bloque que NO se pueden insertar desde la UI (toolbar, slash, paste
   *  HTML). No afecta a contenido programático (blocks/loadFromJSON). */
  disabledBlocks?: string[];
  charCounter?: boolean;
  mentions?: MeWyseMention[];
  tags?: any[];
  mergeTags?: Array<{ id: string; name: string; label?: string }>;
  styleFormats?: Array<{ title: string; block: string; className: string }>;
  pdfLib?: string;
  autosave?: boolean;
  autosaveKey?: string;
  codeHighlight?: boolean;
  codeHighlightUrl?: string;
  pasteAsText?: boolean;
  imageMaxSize?: number;
  onImageUpload?: (
    file: File,
    cb: (data: { url: string; fileName?: string; width?: number; height?: number }) => void
  ) => void;
  /** ms para agrupar (debounce) las llamadas a onChange mientras se teclea.
   *  0 (default) = onChange síncrono en cada cambio. >0 = una sola llamada tras
   *  ese tiempo de inactividad. No afecta a los efectos internos (textarea,
   *  autosave, historial), que siguen siendo inmediatos. */
  onChangeDebounce?: number;
  onChange?: (data: MeWyseChangePayload) => void;
  onFocus?: (data: MeWyseChangePayload) => void;
  onBlur?: (data: MeWyseChangePayload) => void;
  [key: string]: any;
}

export default class meWYSE {
  constructor(options: MeWyseOptions);
  blocks: MeWyseBlock[];
  getHTML(): string;
  getSafeHTML(): string;
  getHTMLSource(): string;
  getJSON(): string;
  getMarkdown(): string;
  getPlainText(): string;
  loadFromJSON(json: string | MeWyseBlock[]): void;
  loadFromHTML(html: string): void;
  loadFromMarkdown(md: string): void;
  /** ¿El contenido ha cambiado respecto a la última línea base "limpia"?
   *  La base se captura tras la carga inicial (incluida la normalización
   *  HTML→bloques de un textarea) y tras cada loadFrom*/markPristine, así que
   *  entrar y salir sin editar devuelve false. */
  isDirty(): boolean;
  /** Alias semántico de isDirty(). */
  hasChanges(): boolean;
  /** Marca el estado actual como "limpio" (nueva línea base). Úsalo tras
   *  guardar. Encadenable. */
  markPristine(): this;
  /** Restablece la detección de cambios: deja isDirty()/hasChanges() en false
   *  fijando el contenido actual como base. Alias de markPristine(); pensado
   *  para llamarse dentro de onBlur. Encadenable. */
  resetDirty(): this;
  getResolvedHTML?(values: Record<string, string>): string;
  /** Registra (o sustituye) una acción en runtime y repinta la toolbar.
   *  Nombre estándar = override; nombre nuevo = acción custom. */
  registerAction(def: MeWyseActionDef): boolean;
  /** Elimina una acción registrada: una custom desaparece; un override se retira
   *  y la acción estándar vuelve a su comportamiento por defecto. */
  unregisterAction(name: string): boolean;
  /** Activa/desactiva una acción en runtime (equivale a `disabledActions`). */
  setActionDisabled(name: string, disabled: boolean): boolean;
  hasDraft(): boolean;
  restoreDraft(): boolean;
  clearDraft(): void;
  destroy(): void;
  [key: string]: any;
}
