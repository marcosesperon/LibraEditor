/**
 * WYSIWYG Block Editor
 * Editor basado en bloques al estilo Notion
 * Compatible con ECMAScript 5
 */

(function(window) {
  'use strict';

  /**
   * Traducciones del editor
   */
  var WYSIWYG_TRANSLATIONS = {
    es: {
      blockTypes: {
        paragraph: 'Párrafo',
        heading1: 'Título 1',
        heading2: 'Título 2',
        heading3: 'Título 3',
        quote: 'Cita',
        code: 'Código',
        bulletList: 'Lista con viñetas',
        numberList: 'Lista numerada',
        checklist: 'Lista de tareas',
        table: 'Tabla',
        image: 'Imagen',
        divider: 'Separador',
        pageBreak: 'Salto de página',
        callout: 'Aviso',
        toggle: 'Desplegable',
        toc: 'Índice',
        video: 'Vídeo',
        audio: 'Audio'
      },
      callout: {
        variant: 'Estilo del aviso',
        info: 'Información',
        warning: 'Advertencia',
        success: 'Éxito',
        danger: 'Peligro'
      },
      toggle: {
        toggle: 'Expandir/contraer'
      },
      toc: {
        title: 'Índice',
        empty: 'Sin títulos todavía',
        untitled: '(sin título)'
      },
      blockTypeDescriptions: {
        paragraph: 'Texto normal',
        heading1: 'Título principal',
        heading2: 'Título secundario',
        heading3: 'Título terciario',
        quote: 'Cita o nota',
        code: 'Bloque de código',
        bulletList: 'Lista simple',
        numberList: 'Lista ordenada',
        checklist: 'Tareas con checkbox',
        table: 'Tabla de datos',
        image: 'Insertar imagen',
        divider: 'Línea divisoria',
        pageBreak: 'Corte de página al imprimir/exportar',
        callout: 'Bloque destacado (info, aviso...)',
        toggle: 'Contenido plegable (título + cuerpo)',
        toc: 'Índice navegable de los títulos',
        video: 'YouTube, Vimeo o archivo .mp4',
        audio: 'Archivo de audio (mp3, ogg...)'
      },
      tooltips: {
        dragToReorder: 'Arrastrar para reordenar o hacer clic para opciones',
        changeBlockType: 'Cambiar tipo de bloque',
        insertLink: 'Insertar enlace',
        insertTable: 'Insertar tabla',
        insertImage: 'Insertar imagen',
        color: 'Color',
        bold: 'Negrita',
        italic: 'Cursiva',
        underline: 'Subrayado',
        strikethrough: 'Tachado',
        subscript: 'Subíndice',
        superscript: 'Superíndice',
        toggleCase: 'Alternar mayúsculas/minúsculas',
        alignLeft: 'Alinear izquierda',
        alignCenter: 'Alinear centro',
        alignRight: 'Alinear derecha',
        justify: 'Justificar',
        indent: 'Aumentar sangría (Tab)',
        outdent: 'Reducir sangría (Mayús+Tab)',
        editDimensions: 'Editar dimensiones',
        dragToResize: 'Arrastrar para redimensionar',
        summary: 'Resumen',
        link: 'Enlace',
        undo: 'Deshacer',
        redo: 'Rehacer',
        moveBlockUp: 'Mover bloque arriba',
        moveBlockDown: 'Mover bloque abajo',
        scrollPrev: 'Desplazar barra a la izquierda',
        scrollNext: 'Desplazar barra a la derecha',
        findReplace: 'Buscar y reemplazar',
        fullscreen: 'Pantalla completa',
        fullscreenExit: 'Salir de pantalla completa',
        showBlocks: 'Mostrar bloques',
        sourceCode: 'Código fuente (HTML)',
        markdown: 'Markdown',
        codeTheme: 'Modo claro/oscuro',
        codeFontInc: 'Aumentar fuente',
        codeFontDec: 'Reducir fuente',
        codeWrap: 'Ajuste de línea',
        wordWrap: 'Ajuste de texto',
        removeFormat: 'Limpiar formato',
        codeLanguage: 'Lenguaje del código',
        insertVideo: 'Insertar vídeo',
        insertAudio: 'Insertar audio',
        pageBreak: 'Salto de página',
        caseUpper: 'MAYÚSCULAS',
        caseLower: 'minúsculas',
        caseTitle: 'Tipo Título',
        caseSentence: 'Tipo oración',
        caseToggle: 'Invertir tipo',
        font: 'Familia de fuente',
        lineHeight: 'Interlineado',
        fontSizeDecrease: 'Reducir tamaño de fuente',
        fontSizeIncrease: 'Aumentar tamaño de fuente',
        specialChars: 'Caracteres especiales',
        print: 'Imprimir',
        exportWord: 'Exportar a Word',
        exportPdf: 'Exportar a PDF',
        mergeTag: 'Insertar variable'
      },
      font: {
        family: 'Familia',
        size: 'Tamaño',
        lineHeight: 'Interlineado',
        default: 'Predeterminada',
        lhTight: 'Compacto',
        lhNormal: 'Normal',
        lhLoose: 'Amplio'
      },
      blockMenu: {
        insertAbove: 'Insertar bloque arriba',
        insertBelow: 'Insertar bloque abajo',
        duplicate: 'Duplicar bloque',
        delete: 'Eliminar bloque',
        deleteMultiple: 'Eliminar {count} bloques',
        changeType: 'Cambiar tipo de bloque',
        changeTypeMultiple: 'Cambiar tipo de {count} bloques'
      },
      tableMenu: {
        backgroundColor: 'Color de fondo',
        insertRowAbove: 'Insertar fila arriba',
        insertRowBelow: 'Insertar fila abajo',
        duplicateRow: 'Duplicar fila',
        clearRowContent: 'Limpiar contenido',
        deleteRow: 'Eliminar fila',
        insertColumnLeft: 'Insertar columna izquierda',
        insertColumnRight: 'Insertar columna derecha',
        duplicateColumn: 'Duplicar columna',
        clearColumnContent: 'Limpiar contenido',
        deleteColumn: 'Eliminar columna',
        mergeCells: 'Combinar celdas',
        unmergeCells: 'Descombinar celda',
        deleteTable: 'Eliminar tabla',
        tableProperties: 'Propiedades de la tabla',
        resetTableWidth: 'Restablecer anchos de columna',
        toolbarLabel: 'Herramientas de tabla'
      },
      modals: {
        sourceCodeTitle: 'Código fuente (HTML)',
        markdownTitle: 'Markdown',
        markdownNote: 'El Markdown no conserva colores, tamaños de fuente ni algunas tablas.',
        configureImageDimensions: 'Configurar dimensiones de imagen',
        editImageDimensions: 'Editar dimensiones de imagen',
        originalDimensions: 'Dimensiones originales: {width}x{height}px',
        width: 'Ancho (px):',
        height: 'Alto (px):',
        keepProportions: 'Mantener proporciones',
        insertLink: 'Insertar enlace',
        editLink: 'Editar enlace',
        removeLink: 'Quitar enlace',
        url: 'URL',
        linkText: 'Texto del enlace (opcional)',
        openInNewTab: 'Abrir en nueva pestaña',
        cancel: 'Cancelar',
        insert: 'Insertar',
        save: 'Guardar',
        update: 'Actualizar',
        videoUrl: 'URL del vídeo (YouTube, Vimeo, .mp4, .webm)',
        audioUrl: 'URL del audio (mp3, ogg...)',
        insertVideoTitle: 'Insertar vídeo',
        insertAudioTitle: 'Insertar audio',
        advancedOptions: 'Opciones avanzadas',
        imageBorder: 'Borde',
        imageMarginVertical: 'Espacio vertical',
        imageMarginHorizontal: 'Espacio horizontal',
        imageAlignment: 'Alineación'
      },
      summary: {
        title: 'Resumen del documento',
        words: 'Palabras:',
        characters: 'Caracteres:',
        paragraphs: 'Párrafos:',
        readingTime: 'Tiempo de lectura:',
        index: 'Índice',
        noHeadings: 'No hay encabezados en el documento',
        close: 'Cerrar'
      },
      colors: {
        textColor: 'Color de texto',
        backgroundColor: 'Color de fondo',
        removeColor: 'Remover color',
        removeTextColor: 'Remover color de texto',
        removeBackgroundColor: 'Remover color de fondo'
      },
      placeholders: {
        quote: 'Cita...',
        urlExample: 'https://ejemplo.com',
        linkTextPlaceholder: 'Texto a mostrar',
        heading1: 'Encabezado 1',
        heading2: 'Encabezado 2',
        heading3: 'Encabezado 3',
        listItem: 'Elemento de lista',
        task: 'Tarea...',
        toggleTitle: 'Título del desplegable',
        toggleBody: 'Contenido del desplegable...',
        slashCommand: 'Escribe "/" para ver los comandos...'
      },
      alerts: {
        cannotDeleteLastRow: 'No se puede eliminar la única fila de la tabla',
        cannotDeleteLastColumn: 'No se puede eliminar la única columna de la tabla',
        imageTooLarge: 'La imagen no puede superar {size} de peso.',
        invalidVideoUrl: 'URL de vídeo no válida. Usa YouTube, Vimeo o un archivo .mp4/.webm/.ogg.',
        invalidAudioUrl: 'URL de audio no válida. Usa un archivo .mp3/.ogg/.wav.'
      },
      misc: {
        text: 'Texto',
        addBlock: '+ Añadir bloque',
        image: 'Imagen',
        videoUnavailable: '(vídeo no disponible)',
        audioUnavailable: '(audio no disponible)',
        markdownVideo: 'Vídeo',
        markdownAudio: 'Audio',
        playVideo: 'Reproducir vídeo',
        closeVideo: 'Volver a la previsualización',
        unknownBlock: 'Bloque no reconocido'
      },
      aria: {
        mentions: 'Menciones',
        emoji: 'Emojis',
        tags: 'Etiquetas',
        mergeTags: 'Variables'
      },
      findReplace: {
        title: 'Buscar y reemplazar',
        findPlaceholder: 'Buscar...',
        replacePlaceholder: 'Reemplazar con...',
        caseSensitive: 'Distinguir mayúsculas',
        wholeWord: 'Palabra completa',
        findNext: 'Siguiente',
        findPrev: 'Anterior',
        replace: 'Reemplazar',
        replaceAll: 'Reemplazar todo',
        close: 'Cerrar',
        noMatches: 'Sin resultados',
        matchesCount: '{current} de {total}',
        replacedCount: '{count} coincidencias reemplazadas'
      },
      counter: {
        words: 'Palabras',
        characters: 'Caracteres',
        readingTime: 'Lectura'
      },
      tableProperties: {
        title: 'Propiedades de la tabla',
        width: 'Ancho',
        height: 'Alto',
        cellSpacing: 'Espacio entre celdas',
        cellPadding: 'Relleno de celda',
        border: 'Borde',
        borderWidth: 'Grosor del borde',
        borderStyle: 'Estilo de borde',
        borderColor: 'Color del borde',
        alignment: 'Alineación',
        backgroundColor: 'Color de fondo',
        alignLeft: 'Izquierda',
        alignCenter: 'Centrado',
        alignRight: 'Derecha',
        styleSolid: 'Sólido',
        styleDashed: 'Discontinuo',
        styleDotted: 'Punteado',
        styleDouble: 'Doble',
        styleNone: 'Sin borde',
        unitPx: 'px',
        unitPct: '%',
        unitAuto: 'Auto',
        apply: 'Aplicar',
        cancel: 'Cancelar',
        reset: 'Restablecer'
      }
    },
    en: {
      blockTypes: {
        paragraph: 'Paragraph',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        quote: 'Quote',
        code: 'Code',
        bulletList: 'Bullet list',
        numberList: 'Numbered list',
        checklist: 'Checklist',
        table: 'Table',
        image: 'Image',
        divider: 'Divider',
        pageBreak: 'Page break',
        callout: 'Callout',
        toggle: 'Toggle',
        toc: 'Table of contents',
        video: 'Video',
        audio: 'Audio'
      },
      callout: {
        variant: 'Callout style',
        info: 'Information',
        warning: 'Warning',
        success: 'Success',
        danger: 'Danger'
      },
      toggle: {
        toggle: 'Expand/collapse'
      },
      toc: {
        title: 'Table of contents',
        empty: 'No headings yet',
        untitled: '(untitled)'
      },
      blockTypeDescriptions: {
        paragraph: 'Normal text',
        heading1: 'Main heading',
        heading2: 'Secondary heading',
        heading3: 'Tertiary heading',
        quote: 'Quote or note',
        code: 'Code block',
        bulletList: 'Simple list',
        numberList: 'Ordered list',
        checklist: 'Tasks with checkbox',
        table: 'Data table',
        image: 'Insert image',
        divider: 'Dividing line',
        pageBreak: 'Page break for print/export',
        callout: 'Highlighted block (info, warning...)',
        toggle: 'Collapsible content (title + body)',
        toc: 'Navigable index of headings',
        video: 'YouTube, Vimeo or .mp4 file',
        audio: 'Audio file (mp3, ogg...)'
      },
      tooltips: {
        dragToReorder: 'Drag to reorder or click for options',
        changeBlockType: 'Change block type',
        insertLink: 'Insert link',
        insertTable: 'Insert table',
        insertImage: 'Insert image',
        color: 'Color',
        bold: 'Bold',
        italic: 'Italic',
        underline: 'Underline',
        strikethrough: 'Strikethrough',
        subscript: 'Subscript',
        superscript: 'Superscript',
        toggleCase: 'Toggle uppercase/lowercase',
        alignLeft: 'Align left',
        alignCenter: 'Align center',
        alignRight: 'Align right',
        justify: 'Justify',
        indent: 'Increase indent (Tab)',
        outdent: 'Decrease indent (Shift+Tab)',
        editDimensions: 'Edit dimensions',
        dragToResize: 'Drag to resize',
        summary: 'Summary',
        link: 'Link',
        undo: 'Undo',
        redo: 'Redo',
        moveBlockUp: 'Move block up',
        moveBlockDown: 'Move block down',
        scrollPrev: 'Scroll toolbar left',
        scrollNext: 'Scroll toolbar right',
        findReplace: 'Find and replace',
        fullscreen: 'Fullscreen',
        fullscreenExit: 'Exit fullscreen',
        showBlocks: 'Show blocks',
        sourceCode: 'Source code (HTML)',
        markdown: 'Markdown',
        codeTheme: 'Light/dark mode',
        codeFontInc: 'Increase font',
        codeFontDec: 'Decrease font',
        codeWrap: 'Word wrap',
        wordWrap: 'Word wrap',
        removeFormat: 'Clear formatting',
        codeLanguage: 'Code language',
        insertVideo: 'Insert video',
        insertAudio: 'Insert audio',
        pageBreak: 'Page break',
        caseUpper: 'UPPERCASE',
        caseLower: 'lowercase',
        caseTitle: 'Title Case',
        caseSentence: 'Sentence case',
        caseToggle: 'tOGGLE cASE',
        font: 'Font family',
        lineHeight: 'Line height',
        fontSizeDecrease: 'Decrease font size',
        fontSizeIncrease: 'Increase font size',
        specialChars: 'Special characters',
        print: 'Print',
        exportWord: 'Export to Word',
        exportPdf: 'Export to PDF',
        mergeTag: 'Insert variable'
      },
      font: {
        family: 'Family',
        size: 'Size',
        lineHeight: 'Line height',
        default: 'Default',
        lhTight: 'Tight',
        lhNormal: 'Normal',
        lhLoose: 'Loose'
      },
      blockMenu: {
        insertAbove: 'Insert block above',
        insertBelow: 'Insert block below',
        duplicate: 'Duplicate block',
        delete: 'Delete block',
        deleteMultiple: 'Delete {count} blocks',
        changeType: 'Change block type',
        changeTypeMultiple: 'Change type of {count} blocks'
      },
      tableMenu: {
        backgroundColor: 'Background color',
        insertRowAbove: 'Insert row above',
        insertRowBelow: 'Insert row below',
        duplicateRow: 'Duplicate row',
        clearRowContent: 'Clear content',
        deleteRow: 'Delete row',
        insertColumnLeft: 'Insert column left',
        insertColumnRight: 'Insert column right',
        duplicateColumn: 'Duplicate column',
        clearColumnContent: 'Clear content',
        deleteColumn: 'Delete column',
        mergeCells: 'Merge cells',
        unmergeCells: 'Unmerge cell',
        deleteTable: 'Delete table',
        tableProperties: 'Table properties',
        resetTableWidth: 'Reset column widths',
        toolbarLabel: 'Table tools'
      },
      modals: {
        sourceCodeTitle: 'Source code (HTML)',
        markdownTitle: 'Markdown',
        markdownNote: 'Markdown does not preserve colors, font sizes or some tables.',
        configureImageDimensions: 'Configure image dimensions',
        editImageDimensions: 'Edit image dimensions',
        originalDimensions: 'Original dimensions: {width}x{height}px',
        width: 'Width (px):',
        height: 'Height (px):',
        keepProportions: 'Keep proportions',
        insertLink: 'Insert link',
        editLink: 'Edit link',
        removeLink: 'Remove link',
        url: 'URL',
        linkText: 'Link text (optional)',
        openInNewTab: 'Open in new tab',
        cancel: 'Cancel',
        insert: 'Insert',
        save: 'Save',
        update: 'Update',
        videoUrl: 'Video URL (YouTube, Vimeo, .mp4, .webm)',
        audioUrl: 'Audio URL (mp3, ogg...)',
        insertVideoTitle: 'Insert video',
        insertAudioTitle: 'Insert audio',
        advancedOptions: 'Advanced options',
        imageBorder: 'Border',
        imageMarginVertical: 'Vertical space',
        imageMarginHorizontal: 'Horizontal space',
        imageAlignment: 'Alignment'
      },
      summary: {
        title: 'Document summary',
        words: 'Words:',
        characters: 'Characters:',
        paragraphs: 'Paragraphs:',
        readingTime: 'Reading time:',
        index: 'Index',
        noHeadings: 'No headings in the document',
        close: 'Close'
      },
      colors: {
        textColor: 'Text color',
        backgroundColor: 'Background color',
        removeColor: 'Remove color',
        removeTextColor: 'Remove text color',
        removeBackgroundColor: 'Remove background color'
      },
      placeholders: {
        quote: 'Quote...',
        urlExample: 'https://example.com',
        linkTextPlaceholder: 'Display text',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        listItem: 'List item',
        task: 'Task...',
        toggleTitle: 'Toggle title',
        toggleBody: 'Toggle content...',
        slashCommand: 'Type "/" for commands...'
      },
      alerts: {
        cannotDeleteLastRow: 'Cannot delete the only row in the table',
        cannotDeleteLastColumn: 'Cannot delete the only column in the table',
        imageTooLarge: 'Image size must not exceed {size}.',
        invalidVideoUrl: 'Invalid video URL. Use YouTube, Vimeo or a .mp4/.webm/.ogg file.',
        invalidAudioUrl: 'Invalid audio URL. Use a .mp3/.ogg/.wav file.'
      },
      misc: {
        text: 'Text',
        addBlock: '+ Add block',
        image: 'Image',
        videoUnavailable: '(video not available)',
        audioUnavailable: '(audio not available)',
        markdownVideo: 'Video',
        markdownAudio: 'Audio',
        playVideo: 'Play video',
        closeVideo: 'Back to preview',
        unknownBlock: 'Unrecognized block'
      },
      aria: {
        mentions: 'Mentions',
        emoji: 'Emojis',
        tags: 'Tags',
        mergeTags: 'Variables'
      },
      findReplace: {
        title: 'Find and replace',
        findPlaceholder: 'Find...',
        replacePlaceholder: 'Replace with...',
        caseSensitive: 'Match case',
        wholeWord: 'Whole word',
        findNext: 'Next',
        findPrev: 'Previous',
        replace: 'Replace',
        replaceAll: 'Replace all',
        close: 'Close',
        noMatches: 'No results',
        matchesCount: '{current} of {total}',
        replacedCount: '{count} matches replaced'
      },
      counter: {
        words: 'Words',
        characters: 'Characters',
        readingTime: 'Reading'
      },
      tableProperties: {
        title: 'Table properties',
        width: 'Width',
        height: 'Height',
        cellSpacing: 'Cell spacing',
        cellPadding: 'Cell padding',
        border: 'Border',
        borderWidth: 'Border width',
        borderStyle: 'Border style',
        borderColor: 'Border color',
        alignment: 'Alignment',
        backgroundColor: 'Background color',
        alignLeft: 'Left',
        alignCenter: 'Center',
        alignRight: 'Right',
        styleSolid: 'Solid',
        styleDashed: 'Dashed',
        styleDotted: 'Dotted',
        styleDouble: 'Double',
        styleNone: 'None',
        unitPx: 'px',
        unitPct: '%',
        unitAuto: 'Auto',
        apply: 'Apply',
        cancel: 'Cancel',
        reset: 'Reset'
      }
    }
  };

  /**
   * Lista de emojis para el emoji picker
   */
  var WYSIWYG_EMOJIS = [
    // Caras y emociones
    { name: 'smile', emoji: '😊', category: 'faces' },
    { name: 'smiley', emoji: '😃', category: 'faces' },
    { name: 'grin', emoji: '😁', category: 'faces' },
    { name: 'joy', emoji: '😂', category: 'faces' },
    { name: 'rofl', emoji: '🤣', category: 'faces' },
    { name: 'wink', emoji: '😉', category: 'faces' },
    { name: 'heart_eyes', emoji: '😍', category: 'faces' },
    { name: 'kissing', emoji: '😘', category: 'faces' },
    { name: 'thinking', emoji: '🤔', category: 'faces' },
    { name: 'neutral', emoji: '😐', category: 'faces' },
    { name: 'expressionless', emoji: '😑', category: 'faces' },
    { name: 'unamused', emoji: '😒', category: 'faces' },
    { name: 'sweat', emoji: '😅', category: 'faces' },
    { name: 'cry', emoji: '😢', category: 'faces' },
    { name: 'sob', emoji: '😭', category: 'faces' },
    { name: 'angry', emoji: '😠', category: 'faces' },
    { name: 'rage', emoji: '😡', category: 'faces' },
    { name: 'scream', emoji: '😱', category: 'faces' },
    { name: 'fearful', emoji: '😨', category: 'faces' },
    { name: 'cold_sweat', emoji: '😰', category: 'faces' },
    { name: 'disappointed', emoji: '😞', category: 'faces' },
    { name: 'relieved', emoji: '😌', category: 'faces' },
    { name: 'sunglasses', emoji: '😎', category: 'faces' },
    { name: 'nerd', emoji: '🤓', category: 'faces' },
    { name: 'confused', emoji: '😕', category: 'faces' },
    { name: 'worried', emoji: '😟', category: 'faces' },
    { name: 'hushed', emoji: '😯', category: 'faces' },
    { name: 'astonished', emoji: '😲', category: 'faces' },
    { name: 'sleeping', emoji: '😴', category: 'faces' },
    { name: 'drool', emoji: '🤤', category: 'faces' },
    { name: 'yum', emoji: '😋', category: 'faces' },
    { name: 'stuck_out_tongue', emoji: '😛', category: 'faces' },
    { name: 'crazy', emoji: '🤪', category: 'faces' },
    { name: 'money_mouth', emoji: '🤑', category: 'faces' },
    { name: 'shushing', emoji: '🤫', category: 'faces' },
    { name: 'zipper_mouth', emoji: '🤐', category: 'faces' },
    { name: 'mask', emoji: '😷', category: 'faces' },
    { name: 'sick', emoji: '🤒', category: 'faces' },
    { name: 'injured', emoji: '🤕', category: 'faces' },
    { name: 'vomit', emoji: '🤮', category: 'faces' },
    { name: 'hot', emoji: '🥵', category: 'faces' },
    { name: 'cold', emoji: '🥶', category: 'faces' },
    { name: 'dizzy', emoji: '😵', category: 'faces' },
    { name: 'exploding_head', emoji: '🤯', category: 'faces' },
    { name: 'cowboy', emoji: '🤠', category: 'faces' },
    { name: 'party', emoji: '🥳', category: 'faces' },
    { name: 'angel', emoji: '😇', category: 'faces' },
    { name: 'devil', emoji: '😈', category: 'faces' },
    { name: 'clown', emoji: '🤡', category: 'faces' },
    { name: 'ghost', emoji: '👻', category: 'faces' },
    { name: 'skull', emoji: '💀', category: 'faces' },
    { name: 'alien', emoji: '👽', category: 'faces' },
    { name: 'robot', emoji: '🤖', category: 'faces' },
    { name: 'poop', emoji: '💩', category: 'faces' },

    // Gestos y manos
    { name: 'thumbsup', emoji: '👍', category: 'gestures' },
    { name: 'thumbsdown', emoji: '👎', category: 'gestures' },
    { name: 'ok_hand', emoji: '👌', category: 'gestures' },
    { name: 'pinch', emoji: '🤏', category: 'gestures' },
    { name: 'victory', emoji: '✌️', category: 'gestures' },
    { name: 'crossed_fingers', emoji: '🤞', category: 'gestures' },
    { name: 'rock', emoji: '🤘', category: 'gestures' },
    { name: 'call_me', emoji: '🤙', category: 'gestures' },
    { name: 'point_left', emoji: '👈', category: 'gestures' },
    { name: 'point_right', emoji: '👉', category: 'gestures' },
    { name: 'point_up', emoji: '👆', category: 'gestures' },
    { name: 'point_down', emoji: '👇', category: 'gestures' },
    { name: 'raised_hand', emoji: '✋', category: 'gestures' },
    { name: 'wave', emoji: '👋', category: 'gestures' },
    { name: 'clap', emoji: '👏', category: 'gestures' },
    { name: 'handshake', emoji: '🤝', category: 'gestures' },
    { name: 'pray', emoji: '🙏', category: 'gestures' },
    { name: 'writing_hand', emoji: '✍️', category: 'gestures' },
    { name: 'muscle', emoji: '💪', category: 'gestures' },
    { name: 'fist', emoji: '✊', category: 'gestures' },
    { name: 'punch', emoji: '👊', category: 'gestures' },

    // Corazones y amor
    { name: 'heart', emoji: '❤️', category: 'hearts' },
    { name: 'orange_heart', emoji: '🧡', category: 'hearts' },
    { name: 'yellow_heart', emoji: '💛', category: 'hearts' },
    { name: 'green_heart', emoji: '💚', category: 'hearts' },
    { name: 'blue_heart', emoji: '💙', category: 'hearts' },
    { name: 'purple_heart', emoji: '💜', category: 'hearts' },
    { name: 'black_heart', emoji: '🖤', category: 'hearts' },
    { name: 'white_heart', emoji: '🤍', category: 'hearts' },
    { name: 'broken_heart', emoji: '💔', category: 'hearts' },
    { name: 'sparkling_heart', emoji: '💖', category: 'hearts' },
    { name: 'growing_heart', emoji: '💗', category: 'hearts' },
    { name: 'beating_heart', emoji: '💓', category: 'hearts' },
    { name: 'two_hearts', emoji: '💕', category: 'hearts' },
    { name: 'kiss', emoji: '💋', category: 'hearts' },
    { name: 'fire', emoji: '🔥', category: 'hearts' },
    { name: 'sparkles', emoji: '✨', category: 'hearts' },
    { name: 'star', emoji: '⭐', category: 'hearts' },
    { name: 'boom', emoji: '💥', category: 'hearts' },

    // Símbolos comunes
    { name: 'check', emoji: '✅', category: 'symbols' },
    { name: 'x', emoji: '❌', category: 'symbols' },
    { name: 'warning', emoji: '⚠️', category: 'symbols' },
    { name: 'no_entry', emoji: '⛔', category: 'symbols' },
    { name: 'question', emoji: '❓', category: 'symbols' },
    { name: 'exclamation', emoji: '❗', category: 'symbols' },
    { name: 'info', emoji: 'ℹ️', category: 'symbols' },
    { name: 'plus', emoji: '➕', category: 'symbols' },
    { name: 'minus', emoji: '➖', category: 'symbols' },
    { name: 'arrow_right', emoji: '➡️', category: 'symbols' },
    { name: 'arrow_left', emoji: '⬅️', category: 'symbols' },
    { name: 'arrow_up', emoji: '⬆️', category: 'symbols' },
    { name: 'arrow_down', emoji: '⬇️', category: 'symbols' },
    { name: 'refresh', emoji: '🔄', category: 'symbols' },
    { name: 'infinity', emoji: '♾️', category: 'symbols' },

    // Objetos y tecnología
    { name: 'computer', emoji: '💻', category: 'objects' },
    { name: 'phone', emoji: '📱', category: 'objects' },
    { name: 'camera', emoji: '📷', category: 'objects' },
    { name: 'bell', emoji: '🔔', category: 'objects' },
    { name: 'bulb', emoji: '💡', category: 'objects' },
    { name: 'book', emoji: '📕', category: 'objects' },
    { name: 'books', emoji: '📚', category: 'objects' },
    { name: 'memo', emoji: '📝', category: 'objects' },
    { name: 'pencil', emoji: '✏️', category: 'objects' },
    { name: 'folder', emoji: '📁', category: 'objects' },
    { name: 'calendar', emoji: '📅', category: 'objects' },
    { name: 'chart', emoji: '📊', category: 'objects' },
    { name: 'paperclip', emoji: '📎', category: 'objects' },
    { name: 'lock', emoji: '🔒', category: 'objects' },
    { name: 'unlock', emoji: '🔓', category: 'objects' },
    { name: 'key', emoji: '🔑', category: 'objects' },
    { name: 'gear', emoji: '⚙️', category: 'objects' },
    { name: 'link', emoji: '🔗', category: 'objects' },
    { name: 'alarm', emoji: '⏰', category: 'objects' },
    { name: 'hourglass', emoji: '⏳', category: 'objects' },

    // Comida y bebida
    { name: 'coffee', emoji: '☕', category: 'food' },
    { name: 'tea', emoji: '🍵', category: 'food' },
    { name: 'beer', emoji: '🍺', category: 'food' },
    { name: 'wine', emoji: '🍷', category: 'food' },
    { name: 'pizza', emoji: '🍕', category: 'food' },
    { name: 'hamburger', emoji: '🍔', category: 'food' },
    { name: 'cake', emoji: '🎂', category: 'food' },
    { name: 'cookie', emoji: '🍪', category: 'food' },
    { name: 'apple', emoji: '🍎', category: 'food' },
    { name: 'banana', emoji: '🍌', category: 'food' },

    // Naturaleza y clima
    { name: 'sun', emoji: '☀️', category: 'nature' },
    { name: 'moon', emoji: '🌙', category: 'nature' },
    { name: 'cloud', emoji: '☁️', category: 'nature' },
    { name: 'rain', emoji: '🌧️', category: 'nature' },
    { name: 'snow', emoji: '❄️', category: 'nature' },
    { name: 'rainbow', emoji: '🌈', category: 'nature' },
    { name: 'ocean', emoji: '🌊', category: 'nature' },
    { name: 'tree', emoji: '🌳', category: 'nature' },
    { name: 'flower', emoji: '🌸', category: 'nature' },
    { name: 'rose', emoji: '🌹', category: 'nature' },
    { name: 'earth', emoji: '🌍', category: 'nature' },

    // Animales
    { name: 'dog', emoji: '🐕', category: 'animals' },
    { name: 'cat', emoji: '🐈', category: 'animals' },
    { name: 'rabbit', emoji: '🐰', category: 'animals' },
    { name: 'fox', emoji: '🦊', category: 'animals' },
    { name: 'bear', emoji: '🐻', category: 'animals' },
    { name: 'panda', emoji: '🐼', category: 'animals' },
    { name: 'lion', emoji: '🦁', category: 'animals' },
    { name: 'monkey', emoji: '🐵', category: 'animals' },
    { name: 'penguin', emoji: '🐧', category: 'animals' },
    { name: 'bird', emoji: '🐦', category: 'animals' },
    { name: 'butterfly', emoji: '🦋', category: 'animals' },
    { name: 'unicorn', emoji: '🦄', category: 'animals' },

    // Transporte y viajes
    { name: 'car', emoji: '🚗', category: 'travel' },
    { name: 'airplane', emoji: '✈️', category: 'travel' },
    { name: 'rocket', emoji: '🚀', category: 'travel' },
    { name: 'ship', emoji: '🚢', category: 'travel' },
    { name: 'bike', emoji: '🚲', category: 'travel' },
    { name: 'house', emoji: '🏠', category: 'travel' },
    { name: 'office', emoji: '🏢', category: 'travel' },
    { name: 'mountain', emoji: '⛰️', category: 'travel' },
    { name: 'beach', emoji: '🏖️', category: 'travel' },

    // Actividades y deportes
    { name: 'soccer', emoji: '⚽', category: 'activities' },
    { name: 'basketball', emoji: '🏀', category: 'activities' },
    { name: 'tennis', emoji: '🎾', category: 'activities' },
    { name: 'trophy', emoji: '🏆', category: 'activities' },
    { name: 'medal', emoji: '🏅', category: 'activities' },
    { name: 'video_game', emoji: '🎮', category: 'activities' },
    { name: 'guitar', emoji: '🎸', category: 'activities' },
    { name: 'microphone', emoji: '🎤', category: 'activities' },
    { name: 'art', emoji: '🎨', category: 'activities' },
    { name: 'tada', emoji: '🎉', category: 'activities' },
    { name: 'confetti', emoji: '🎊', category: 'activities' },
    { name: 'gift', emoji: '🎁', category: 'activities' },
    { name: 'balloon', emoji: '🎈', category: 'activities' },

    // Banderas comunes
    { name: 'flag_white', emoji: '🏳️', category: 'flags' },
    { name: 'flag_checkered', emoji: '🏁', category: 'flags' },
    { name: 'es', emoji: '🇪🇸', category: 'flags' },
    { name: 'us', emoji: '🇺🇸', category: 'flags' },
    { name: 'gb', emoji: '🇬🇧', category: 'flags' },
    { name: 'fr', emoji: '🇫🇷', category: 'flags' },
    { name: 'de', emoji: '🇩🇪', category: 'flags' },
    { name: 'it', emoji: '🇮🇹', category: 'flags' },
    { name: 'jp', emoji: '🇯🇵', category: 'flags' },
    { name: 'br', emoji: '🇧🇷', category: 'flags' },
    { name: 'mx', emoji: '🇲🇽', category: 'flags' }
  ];

  /**
   * Iconos SVG del editor
   */
  var WYSIWYG_ICONS = {
    dragHandle: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>',
    chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    link: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    alignLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H3"/><path d="M15 12H3"/><path d="M17 19H3"/></svg>',
    alignCenter: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H3"/><path d="M17 12H7"/><path d="M19 19H5"/></svg>',
    alignRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H3"/><path d="M21 12H9"/><path d="M21 19H7"/></svg>',
    alignJustify: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18"/><path d="M3 12h18"/><path d="M3 19h18"/></svg>',
    indent: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m3 8 4 4-4 4"/></svg>',
    outdent: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m7 8-4 4 4 4"/></svg>',
    table: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>',
    image: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    quote: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>',
    bulletList: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg>',
    numberList: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5h10"/><path d="M11 12h10"/><path d="M11 19h10"/><path d="M4 4h1v5"/><path d="M4 9h2"/><path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"/></svg>',
    checklist: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/></svg>',
    divider: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16-4 4-4-4"/><path d="M3 12h18"/><path d="m8 8 4-4 4 4"/></svg>',
    pageBreak: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.42 9.42 8 12"/><circle cx="4" cy="8" r="2"/><path d="m14 6-8.58 8.58"/><circle cx="4" cy="16" r="2"/><path d="M10.8 14.8 14 18"/><path d="M16 12h-2"/><path d="M22 12h-2"/></svg>',
    callout: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="7" x2="8" y2="11.5"/><circle cx="8" cy="4.7" r="0.6" fill="currentColor"/></svg>',
    toggle: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    toggleCaret: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    toc: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5h13"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="M3 10a2 2 0 0 0 2 2h3"/><path d="M3 5v12a2 2 0 0 0 2 2h3"/></svg>',
    print: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>',
    exportWord: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.5H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.5z"/><path d="M9 1.5V5.5h4"/><path d="M5.5 8l1 3 1-2.2 1 2.2 1-3"/></svg>',
    mergeTag: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M6 2.5C4.5 2.5 4 3.5 4 5v1.5c0 1-.5 1.5-1.5 1.5C3.5 8 4 8.5 4 9.5V11c0 1.5.5 2.5 2 2.5"/><path d="M10 2.5c1.5 0 2 1 2 2.5v1.5c0 1 .5 1.5 1.5 1.5-1 0-1.5.5-1.5 1.5V11c0 1.5-.5 2.5-2 2.5"/></svg>',
    exportPdf: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.5H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.5z"/><path d="M9 1.5V5.5h4"/><text x="8" y="12" font-size="4.5" text-anchor="middle" fill="currentColor" stroke="none" font-family="sans-serif" font-weight="700">PDF</text></svg>',
    paragraph: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16"/><path d="M17 4v16"/><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"/></svg>',
    heading1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/></svg>',
    heading2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/></svg>',
    heading3: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"/><path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"/></svg>',
    code: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>',
    gear: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>',
    arrowUp: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>',
    arrowDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    duplicate: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    trash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    palette: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    play: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>',
    hamburger: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>',
    // Icono del botón de resumen/esquema: panel lateral (marco + columna derecha)
    // con líneas de índice a la izquierda. Distintivo del icono de alineación.
    summaryPanel: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/></svg>',
    mergeCells: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-6"/><path d="M12 9V3"/><path d="M3 15h18"/><path d="M3 9h18"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>',
    unmergeCells: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V9"/><path d="M3 15h18"/><path d="M3 9h18"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>',
    plus: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    minus: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
    resetWidth: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="8" x2="13" y2="8"/><polyline points="5,5.5 2,8 5,10.5"/><polyline points="11,5.5 14,8 11,10.5"/></svg>',
    eraser: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/><path d="m5.082 11.09 8.828 8.828"/></svg>',
    // Iconos específicos de tabla. Convención: píldora horizontal = FILA,
    // píldora vertical = COLUMNA; modificador = + (insertar), x (borrar),
    // doble píldora (duplicar), trazo discontinuo (vaciar contenido).
    tableRowAbove: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="13" width="16" height="6" rx="1.5"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="9" y1="6" x2="15" y2="6"/></svg>',
    tableRowBelow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="5" width="16" height="6" rx="1.5"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/></svg>',
    tableRowDuplicate: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/></svg>',
    tableRowClear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="9" width="16" height="6" rx="1.5" stroke-dasharray="3 2.5"/></svg>',
    tableRowDelete: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="9" width="11" height="6" rx="1.5"/><line x1="16.5" y1="9.5" x2="21" y2="14"/><line x1="21" y1="9.5" x2="16.5" y2="14"/></svg>',
    tableColLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="13" y="4" width="6" height="16" rx="1.5"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="3" y1="12" x2="9" y2="12"/></svg>',
    tableColRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4" width="6" height="16" rx="1.5"/><line x1="18" y1="9" x2="18" y2="15"/><line x1="15" y1="12" x2="21" y2="12"/></svg>',
    tableColDuplicate: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="6" height="16" rx="1.5"/><rect x="14" y="4" width="6" height="16" rx="1.5"/></svg>',
    tableColClear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="6" height="16" rx="1.5" stroke-dasharray="3 2.5"/></svg>',
    tableColDelete: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="3" width="6" height="11" rx="1.5"/><line x1="9.5" y1="16.5" x2="14" y2="21"/><line x1="14" y1="16.5" x2="9.5" y2="21"/></svg>',
    undo: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>',
    redo: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/></svg>',
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',
    fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
    fullscreenExit: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>',
    showBlocks: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/></svg>',
    sourceCode: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
    markdown: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3.5" width="14" height="9" rx="1.5"/><path d="M3.5 10.5V6l2 2 2-2v4.5"/><path d="M10.5 6v3.2M9.2 8.2l1.3 1.3 1.3-1.3"/></svg>',
    contrast: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/></svg>',
    wordWrap: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16-3 3 3 3"/><path d="M3 12h14.5a1 1 0 0 1 0 7H13"/><path d="M3 19h6"/><path d="M3 5h18"/></svg>',
    removeFormat: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M5 20h6"/><path d="M13 4 8 20"/><path d="m15 15 5 5"/><path d="m20 15-5 5"/></svg>',
    font: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/></svg>',
    lineHeight: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="7" y1="3.5" x2="14" y2="3.5"/><line x1="7" y1="8" x2="14" y2="8"/><line x1="7" y1="12.5" x2="14" y2="12.5"/><path d="M3 2.5v11"/><polyline points="1.3,4.3 3,2.5 4.7,4.3"/><polyline points="1.3,11.7 3,13.5 4.7,11.7"/></svg>',
    specialChars: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.5a3.5 3.5 0 0 0-2.6 5.8c.6.7 1.1 1.3 1.1 2.2H4v1.5h3v-1c0-.9.4-1.5 1-2.2A3.5 3.5 0 0 0 8 2.5z"/><line x1="9" y1="12" x2="12" y2="12"/></svg>',
    subscript: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 5 8 8"/><path d="m12 5-8 8"/><path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/></svg>',
    superscript: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 19 8-8"/><path d="m12 19-8-8"/><path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/></svg>',
    video: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
    audio: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'
  };

  /**
   * Constructor del Editor WYSIWYG
   * @param {Object} options - Configuración del editor
   * @param {string} options.target - Selector del elemento objetivo
   * @param {boolean} options.toolbar - (Opcional) Mostrar toolbar en modo minimal
   * @param {Array} options.blocks - Contenido inicial de bloques
   * @param {Function} options.onChange - Callback cuando cambia el contenido
   */
  function meWYSE(options) {
    this.options = options || {};
    // Toolbar: true (todos los ítems), string/array (config declarativa estilo
    // TinyMCE) o false/ausente (sin toolbar). Ver DEFAULT_TOOLBAR / _buildToolbarItem.
    var v_tb = this.options.toolbar;
    this.showToolbar = v_tb === true ||
      (typeof v_tb === 'string' && v_tb.trim() !== '') ||
      (Array.isArray(v_tb) && v_tb.length > 0);
    this.showSummary = this.options.summary !== false; // Resumen/esquema activo por defecto (desactivar con summary:false)
    this.showCharCounter = this.options.charCounter === true; // Barra inferior con contador de palabras/caracteres
    this.rtl = this.options.rtl === true; // Dirección derecha-a-izquierda
    this.wordWrap = this.options.wordWrap !== false; // Ajuste de texto: envolver dentro del bloque (default: true)

    // Control de la altura del área de edición (opcional). Sobrescriben los
    // valores por defecto del CSS (min 200 / max 500) mediante estilos inline en
    // el container. Aceptan número (se interpreta como px) o string CSS
    // ('200px', '30vh', '10em', 'none'). `autoExpand` hace que el editor crezca
    // con el contenido: sin `maxHeight` no tiene tope (scrollea la página); con
    // `maxHeight` crece hasta ese límite y luego hace scroll interno.
    this.minHeight = this._normalizeCssSize(this.options.minHeight);
    this.maxHeight = this._normalizeCssSize(this.options.maxHeight);
    this.autoExpand = this.options.autoExpand === true;

    // disabledBlocks: lista de tipos de bloque que NO se pueden INSERTAR desde la
    // UI (se ocultan sus botones de toolbar, se filtran del menú slash y no se
    // crean al pegar HTML). No afecta a contenido programático (blocks/loadFromJSON)
    // ni a las APIs públicas insertVideoBlock/insertAudioBlock. Se guarda como
    // mapa para lookup O(1).
    this._disabledBlocks = {};
    if (Array.isArray(this.options.disabledBlocks)) {
      for (var vdb = 0; vdb < this.options.disabledBlocks.length; vdb++) {
        var vdbType = this.options.disabledBlocks[vdb];
        if (typeof vdbType === 'string' && vdbType) this._disabledBlocks[vdbType] = true;
      }
    }
    // readOnly: el editor se monta para visualización. Ningún bloque es
    // editable, no se generan toolbar, floating handle, drag&drop de imágenes
    // ni format menu. Selección nativa funciona — el usuario puede copiar
    // texto al portapapeles igual que en cualquier elemento estático.
    this.readOnly = this.options.readOnly === true;
    // Comportamiento de la toolbar cuando los botones no caben en una fila.
    // 'scroll' (default) = todos en una sola fila con scroll horizontal, gradientes
    // en los bordes, flechas de navegación, y los botones de mover bloque anclados
    // a la derecha.
    // 'wrap' = saltan a la siguiente fila.
    this.toolbarOverflow = (this.options.toolbarOverflow === 'wrap') ? 'wrap' : 'scroll';
    // Herramientas dependientes de SELECCIÓN (ver SELECTION_TOOL_NAMES): dónde se
    // ofrecen cuando hay toolbar.
    //  'floating' (default): NO se pintan en la toolbar; aparecen en el menú
    //    flotante de formato al seleccionar texto (aunque la toolbar esté activa).
    //  'toolbar': se pintan en la toolbar pero DESHABILITADAS hasta que hay una
    //    selección de texto no colapsada; el menú flotante se suprime con toolbar.
    this._selectionToolsMode = (this.options.selectionTools === 'toolbar') ? 'toolbar' : 'floating';
    // Registro central de acciones (toolbar · menú flotante · atajos): acciones
    // custom (`actions` con nombre nuevo), overrides de estándar (`actions` con
    // nombre estándar) y desactivadas (`disabledActions`). Ver _runAction.
    this._initActionRegistry();
    this.pasteAsText = this.options.pasteAsText === true; // Forzar paste solo como texto plano
    // Por defecto, getHTML() escapa los 5 caracteres de entidad HTML (& < > " ')
    // en los nodos de TEXTO del contenido inline (heading, quote, paragraph,
    // ítems de lista). Es la convención de Quill: garantiza HTML siempre
    // válido aunque el contenido tuviera comillas o ampersands sin escapar.
    // `escapeHtmlEntities: false` desactiva el escape y emite el contenido tal
    // cual (comportamiento legacy).
    this.escapeHtmlEntities = this.options.escapeHtmlEntities !== false;
    // Cuando `escapeHtmlEntities` está activo, este flag adicional escapa
    // también `\` (→ `&#92;`) y todo carácter no-ASCII (charCode >= 128) como
    // referencia numérica HTML. Replica la salida de TinyMCE con
    // `entity_encoding: 'numeric'`. Útil como capa de compat para flujos que
    // venían de TinyMCE y esperaban HTML ASCII-safe. Default: true.
    this.htmlNumericEntities = this.options.htmlNumericEntities !== false;
    this.imageMaxSize = (typeof this.options.imageMaxSize === 'number' && this.options.imageMaxSize > 0)
      ? this.options.imageMaxSize : 0; // Tamaño máx. de imagen en bytes (0 = sin límite)

    // Los botones de fuente (fontsize/font), export (print/exportword/exportpdf),
    // fullscreen, showblocks, wordwrap, find, etc. ya no son booleanos: se declaran
    // como ítems en la opción `toolbar`. Ver DEFAULT_TOOLBAR / _buildToolbarItem.
    // pdfLib: URL (lazy) de una librería tipo html2pdf.js para exportar a PDF con
    // fidelidad. Si no se define, exportPdf() cae a print() ("Guardar como PDF").
    this.pdfLib = (typeof this.options.pdfLib === 'string') ? this.options.pdfLib : '';

    // codeHighlight: resaltado de sintaxis en los bloques de código. Opt-in
    // (default false). El modelo se mantiene SIEMPRE en texto plano (el input lee
    // textContent); el coloreado solo afecta al DOM y se re-pinta al perder el foco.
    // codeHighlightUrl: URL (lazy) de highlight.js. Si no se define o falla la
    // carga, el bloque cae a texto plano escapado (fallback intacto).
    this.codeHighlight = this.options.codeHighlight === true;
    this.codeHighlightUrl = (typeof this.options.codeHighlightUrl === 'string')
      ? this.options.codeHighlightUrl : '';

    // Autosave: si está activo, guarda el contenido (JSON) en localStorage con
    // debounce en cada cambio. NO auto-restaura (el consumidor decide vía
    // hasDraft()/restoreDraft()) para no pisar options.blocks.
    this.autosave = this.options.autosave === true;
    this.autosaveKey = (typeof this.options.autosaveKey === 'string' && this.options.autosaveKey)
      ? this.options.autosaveKey : 'mewyse-draft';

    // onChangeDebounce (ms): agrupa las llamadas a onChange mientras se teclea.
    // 0 (default) = comportamiento clásico (onChange síncrono en cada cambio).
    // >0 = onChange se dispara una sola vez tras `ms` de inactividad. NO afecta a
    // los efectos internos de triggerChange (textarea, autosave, historial, TOC),
    // que siguen siendo inmediatos. El payload es PEREZOSO en cualquier caso.
    var v_ocd = parseInt(this.options.onChangeDebounce, 10);
    this.onChangeDebounce = (!isNaN(v_ocd) && v_ocd > 0) ? v_ocd : 0;
    this._onChangeTimer = null;

    // styleFormats: lista de estilos custom definidos por el consumidor.
    // Cada uno: { title, block, className }
    this.styleFormats = [];
    this._customClassWhitelist = {};
    if (Array.isArray(this.options.styleFormats)) {
      for (var sfi = 0; sfi < this.options.styleFormats.length; sfi++) {
        var sf = this.options.styleFormats[sfi];
        if (!sf || typeof sf !== 'object') continue;
        // Validar: title, block (tipo válido), className (string alfanumérico)
        if (typeof sf.title !== 'string' || !sf.title) continue;
        var validTypes = {
          paragraph: 1, heading1: 1, heading2: 1, heading3: 1,
          quote: 1, bulletList: 1, numberList: 1, checklist: 1
        };
        // Aceptar 'blockquote' como alias de 'quote' (compatibilidad TinyMCE)
        var blockType = sf.block === 'blockquote' ? 'quote' :
                        (validTypes[sf.block] ? sf.block : 'paragraph');
        if (typeof sf.className !== 'string' || !/^[a-zA-Z_][\w-]*$/.test(sf.className)) continue;
        this.styleFormats.push({
          title: sf.title,
          block: blockType,
          className: sf.className
        });
        this._customClassWhitelist[sf.className] = 1;
      }
    }

    // Estado para nuevas features
    this.isFullscreen = false;
    this.showingBlocks = false;
    this.findReplaceDialog = null;
    this.findReplaceState = null;
    this.charCounterBar = null;
    // `target` admite un SELECTOR CSS (string) o directamente un ELEMENTO del DOM
    // (útil para integraciones como React, donde se pasa un ref.current).
    var v_target = this.options.target;
    this.target = (v_target && v_target.nodeType === 1)
      ? v_target
      : document.querySelector(v_target);
    this.onChange = this.options.onChange || function() {};
    this.onFocus = this.options.onFocus || function() {};
    this.onBlur = this.options.onBlur || function() {};
    this._hasFocus = false; // estado actual de foco (para evitar disparar onFocus/onBlur duplicado)
    this.currentBlockId = 0;
    this.container = null;
    // NOTA: this.blocks se asigna más abajo tras sanitizar (necesita this.currentBlockId inicializado)

    // ID único de instancia (útil para identificar elementos del editor en el DOM)
    this.instanceId = 'mewyse-' + Math.random().toString(36).substr(2, 9);
    this.toolbar = null;
    this.draggedBlockId = null; // ID del bloque siendo arrastrado (reorder)
    this._draggedImage = null;  // estado del drag de imagen interna
    this._destroyed = false;   // marca de ciclo de vida (idempotencia de destroy)
    this._pristine_signature = null; // firma del contenido "limpio" (dirty tracking)
    this._doc_click_handlers = null; // registro de listeners click en document
    this.slashMenu = null;
    this.formatMenu = null;
    this.formatMenuTimeout = null;
    this.lastFocusedElement = null;
    this.summaryButton = null;
    this.toolbarSummaryButton = null; // Botón de resumen en la toolbar (modo con toolbar)
    this.selectedBlocks = []; // Array de IDs de bloques seleccionados
    this.lastClickedBlockId = null; // Último bloque clickeado (para Shift+Click)
    this.selectedTableCells = []; // Array de celdas de tabla seleccionadas
    this.tableCellSelectionStart = null; // Celda inicial de selección de tabla
    this.isSelectingTableCells = false; // Flag de selección de celdas en curso
    this.currentSelectionTable = null; // Tabla actual donde se está seleccionando
    this.tableCellMouseDownCell = null; // Celda donde se hizo mousedown
    this.tableCellMouseDownBlockId = null; // BlockId de la celda mousedown
    this._mouseSelecting = false; // true mientras se arrastra con el ratón pulsado
                                  // dentro del editor (selección en curso). Suprime
                                  // el menú flotante hasta soltar (evita que el
                                  // backdrop tape el editor y desajuste la selección).

    // Estado del backdrop / overlay invisible que se activa mientras hay un menú o
    // modal flotante abierto. Stack LIFO: el último abierto es el primero en cerrarse
    // al hacer click en el overlay o pulsar Escape.
    this._activeBackdropModals = [];
    this._backdropEl = null;
    this._backdropEscHandler = null;
    this._backdropMouseDownHandler = null;

    // Timestamp hasta el cual el listener de focusout NO debe disparar onBlur,
    // aunque el activeElement quede momentáneamente fuera del editor. Lo usan
    // las operaciones internas (Enter split, Backspace merge) durante las que
    // el foco transiciona entre dos contenteditable y, especialmente en móvil,
    // pasa por `body` un tick. Sin este margen, esa transición se interpreta
    // como un blur real y dispara el callback indebidamente.
    this._suppressBlurUntil = 0;

    // Variables para selección cross-block
    this.crossBlockSelection = null;       // Estado de la selección cross-block
    this.isCrossBlockSelecting = false;     // Flag: arrastrando entre bloques
    this.crossBlockSelectOrigin = null;     // { blockId, node, offset } — punto de mousedown
    this.crossBlockOverlay = null;          // Overlay de selección visual

    // Variables para el sistema de menciones (@mentions)
    this.mentions = this.options.mentions || []; // Lista de elementos mencionables
    this.mentionMenu = null; // Elemento del menu de menciones
    this.mentionMenuElement = null; // Elemento donde se abrio el menu
    this.mentionMenuBlockId = null; // ID del bloque donde se abrio el menu
    this.mentionMenuSelectedIndex = 0; // Indice seleccionado en el menu
    this.mentionMenuItems = []; // Items filtrados del menu
    this.mentionMenuRange = null; // Rango guardado para insercion con click

    // Variables para el sistema de etiquetas (#tags)
    // Cada tag: { id, name, color }. `color` es opcional — si se omite se
    // aplica el color genérico del tema (ver CSS de .mewyse-tag).
    this.tags = this.options.tags || [];
    this.tagMenu = null;
    // Merge tags / variables ({{campo}}). Cada uno: { id, name, label? }.
    // name es el identificador que se emite en export ({{name}}); label es un
    // texto amigable opcional solo para el menú de inserción.
    this.mergeTags = this.options.mergeTags || [];
    this.mergeTagMenu = null;
    this.tagMenuElement = null;
    this.tagMenuBlockId = null;
    this.tagMenuSelectedIndex = 0;
    this.tagMenuItems = [];
    this.tagMenuRange = null;

    // Variables para el sistema de emoji picker
    this.emojiMenu = null; // Elemento del menu de emojis
    this.emojiMenuElement = null; // Elemento donde se abrio el menu
    this.emojiMenuBlockId = null; // ID del bloque donde se abrio el menu
    this.emojiMenuSelectedIndex = 0; // Indice seleccionado en el menu
    this.emojiMenuItems = []; // Items filtrados del menu
    this.emojiMenuRange = null; // Rango guardado para insercion

    // Inicializar traducciones
    if (typeof this.options.lang === 'string') {
      this.translations = WYSIWYG_TRANSLATIONS[this.options.lang] || WYSIWYG_TRANSLATIONS.es;
    } else if (this.options.lang && typeof this.options.lang === 'object') {
      this.translations = this.mergeDeep(WYSIWYG_TRANSLATIONS.es, this.options.lang);
    } else {
      this.translations = WYSIWYG_TRANSLATIONS.es;
    }

    if (!this.target) {
      throw new Error('Target element not found');
    }

    // Sanitizar bloques iniciales contra XSS (maneja currentBlockId internamente)
    this.blocks = this._sanitizeBlocks(this.options.blocks || []);

    // Historial undo/redo
    this.history = [];
    this.historyIndex = -1;
    this.maxHistorySize = 50;
    this.isUndoRedo = false;
    this.historyDebounceTimer = null;
    this.undoButton = null;
    this.redoButton = null;
    this.moveUpButton = null;
    this.moveDownButton = null;
    this.indentButton = null;
    this.outdentButton = null;

    // Handlers almacenados para cleanup en destroy()
    this._handleDocMouseUp = null;
    this._handleDocMouseDown = null;

    // Tema por defecto: CLARO. Solo se aplica oscuro si se pide explícitamente
    // (`theme: 'dark'`) o si se pide seguir al sistema (`theme: 'auto'`). Sin
    // `theme`, el editor NO auto-detecta el `prefers-color-scheme`: se queda claro.
    var v_auto_theme = this.options.theme === 'auto';
    if (v_auto_theme) {
      // Resolver 'auto' a un valor real de clase (nunca dejar 'auto', que
      // generaría una clase inexistente `mewyse-editor-auto`). Si el sistema está
      // en oscuro → 'dark'; si no → null (claro).
      var v_sys_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.options.theme = v_sys_dark ? 'dark' : null;
    }

    // Escuchar cambios en la preferencia del sistema SOLO en modo 'auto'.
    this._darkModeMediaQuery = null;
    if (v_auto_theme && window.matchMedia) {
      this._darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var self = this;
      this._handleDarkModeChange = function(e) {
        if (e.matches) {
          self._applyTheme('dark');
        } else {
          self._removeTheme('dark');
        }
      };
      if (this._darkModeMediaQuery.addEventListener) {
        this._darkModeMediaQuery.addEventListener('change', this._handleDarkModeChange);
      }
    }

    this.init();
    // En readOnly no necesitamos el listener de selectionchange que abre el
    // format menu — el menú no se mostraría igualmente, pero ahorramos coste
    // y evitamos efectos colaterales.
    if (!this.readOnly) {
      this.initFormatMenu();
    }
  }

  /**
   * Posiciona un menú anclado a un elemento de referencia
   * @param {HTMLElement} menu - Menú a posicionar
   * @param {HTMLElement} reference - Elemento de referencia
   * @param {Object} options - Opciones de posicionamiento
   */
  meWYSE.prototype.anchorMenu = function(menu, reference, options) {
    options = options || {};
    var offsetY = options.offsetY || 5;
    var offsetX = options.offsetX || 0;
    var centerX = options.centerX || false;
    var placeAbove = options.placement === 'above'; // preferir colocar encima

    var animationFrameId = null;
    var isActive = true;
    // Últimos valores escritos: solo reescribimos style cuando cambian. Escribir
    // en cada frame invalidaba el layout y forzaba un reflow continuo (thrash)
    // aunque nada se moviera; el posicionamiento calculado es idéntico.
    var v_last_top = null, v_last_left = null, v_last_transform = null;

    function updatePosition() {
      if (!isActive || !menu.parentNode) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        return;
      }

      var rect = reference.getBoundingClientRect();
      var menuRect = menu.getBoundingClientRect();
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (menu.style.position !== 'fixed') menu.style.position = 'fixed';

      // Calcular posición vertical inicial
      var top;
      if (placeAbove) {
        // Preferir colocar el menú ENCIMA del elemento de referencia
        top = rect.top - menuRect.height - offsetY;
        // Si no cabe arriba, colocarlo debajo
        if (top < 0) {
          top = rect.bottom + offsetY;
        }
      } else {
        top = rect.bottom + offsetY;
        // Si el menú se sale por abajo del viewport, mostrarlo arriba del elemento
        if (top + menuRect.height > viewportHeight) {
          top = rect.top - menuRect.height - offsetY;
          // Si tampoco cabe arriba, posicionarlo lo más cerca posible del borde superior
          if (top < 0) {
            top = 10; // Margen de 10px desde arriba
          }
        }
      }

      if (top !== v_last_top) {
        menu.style.top = top + 'px';
        v_last_top = top;
      }

      // Calcular posición horizontal inicial
      var left;
      var transform = '';

      if (centerX) {
        left = rect.left + (rect.width / 2);
        transform = 'translateX(-50%)';

        // Verificar si se sale por la derecha
        if (left + (menuRect.width / 2) > viewportWidth) {
          left = viewportWidth - menuRect.width - 10; // 10px de margen
          transform = '';
        }
        // Verificar si se sale por la izquierda
        else if (left - (menuRect.width / 2) < 0) {
          left = 10; // 10px de margen
          transform = '';
        }
      } else {
        left = rect.left + offsetX;

        // Verificar si se sale por la derecha
        if (left + menuRect.width > viewportWidth) {
          left = viewportWidth - menuRect.width - 10; // 10px de margen
        }
        // Verificar si se sale por la izquierda
        if (left < 0) {
          left = 10; // 10px de margen
        }
      }

      if (left !== v_last_left) {
        menu.style.left = left + 'px';
        v_last_left = left;
      }
      if (transform !== v_last_transform) {
        menu.style.transform = transform;
        v_last_transform = transform;
      }

      // Continuar actualizando mientras el menú esté activo
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    // Posicionar inicialmente y comenzar el loop de actualización
    updatePosition();

    // Guardar la función de cancelación en el propio menú para que se pueda limpiar individualmente
    menu._cancelAnchor = function() {
      isActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  /**
   * Merge profundo de dos objetos (para traducciones personalizadas)
   * @param {Object} target - Objeto base
   * @param {Object} source - Objeto a mezclar
   * @returns {Object} - Objeto combinado
   */
  meWYSE.prototype.mergeDeep = function(target, source) {
    var output = {};
    var key;
    for (key in target) {
      if (target.hasOwnProperty(key)) {
        output[key] = target[key];
      }
    }
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          output[key] = this.mergeDeep(target[key] || {}, source[key]);
        } else {
          output[key] = source[key];
        }
      }
    }
    return output;
  };

  /**
   * Obtiene una traduccion por su clave
   * @param {string} key - Clave de traduccion (ej: 'blockTypes.paragraph')
   * @param {Object} replacements - Valores a reemplazar (ej: {count: 5})
   * @returns {string} - Texto traducido
   */
  meWYSE.prototype.t = function(key, replacements) {
    var keys = key.split('.');
    var value = this.translations;
    var i, j, r;

    for (i = 0; i < keys.length; i++) {
      value = value[keys[i]];
      if (value === undefined) {
        // Fallback a espanol si no existe la clave
        value = WYSIWYG_TRANSLATIONS.es;
        for (j = 0; j < keys.length; j++) {
          value = value[keys[j]];
          if (value === undefined) return key;
        }
        break;
      }
    }

    // Reemplazar placeholders {key}
    if (replacements && typeof value === 'string') {
      for (r in replacements) {
        if (replacements.hasOwnProperty(r)) {
          value = value.replace('{' + r + '}', replacements[r]);
        }
      }
    }

    return value;
  };

  /**
   * Inicializa el editor según el modo
   */
  meWYSE.prototype.init = function() {
    // Idempotencia: no reinicializar (duplicaría listeners globales)
    if (this._initialized) return;
    this._initialized = true;

    this.initDomEditor();

    // Crear el handle flotante (no aplica en readOnly — la UI de drag/menú
    // del bloque no tiene sentido en modo solo-visualización).
    if (!this.readOnly) {
      this.createFloatingHandle();
    }

    // Si no hay bloques, crear uno vacío
    if (this.blocks.length === 0) {
      // Crear bloque sin enfocar (addBlock enfoca por defecto via render(blockId))
      var block = { id: ++this.currentBlockId, type: 'paragraph', content: '' };
      this.blocks.push(block);
      this.render(this.options.autoFocus ? block.id : undefined);
    } else {
      this.render();
    }

    // Con el contenido inicial ya asentado (incluido el párrafo por defecto si el
    // textarea venía vacío), fijar la línea base:
    //  - dirty tracking: estado "limpio" para isDirty()/hasChanges().
    //  - historial: una sola entrada (undo deshabilitado hasta el primer cambio),
    //    sin el estado vacío intermedio que rompía el foco al deshacer.
    // Se hace AQUÍ (no en initDomEditor) para que la base sea SIEMPRE ≥1 bloque.
    // Solo la carga INICIAL; un loadFrom* manual a mitad de sesión conserva su
    // historial y recaptura su propia base de dirty.
    this._capture_pristine();
    this._reset_history();

    // Cargar (lazy) la librería de resaltado de sintaxis si la feature está activa.
    // Tras cargar re-pinta los bloques de código ya renderizados.
    this._initCodeHighlight();

    // Crear botón de resumen flotante solo si está habilitado y NO hay toolbar
    // (con toolbar se usa this.toolbarSummaryButton en su lugar).
    if (this.showSummary && !this.showToolbar) {
      this.createSummaryButton();
    }

    // Inicializar valores del contador de palabras/caracteres
    if (this.showCharCounter) {
      this.updateCharCounter();
    }

    // Enfocar el primer bloque automáticamente solo si autoFocus está habilitado
    var self = this;
    if (this.options.autoFocus) {
      setTimeout(function() {
        if (self._destroyed) return;  // no enfocar si ya se destruyó
        self.focusFirstBlock();
      }, 100);
    }

    // Añadir listener para rastrear el último elemento enfocado
    this.container.addEventListener('focusin', function(e) {
      var target = e.target;
      // Guardar solo si es un elemento contenteditable o dentro de una celda de tabla
      if (target.getAttribute('contenteditable') === 'true' ||
          target.tagName === 'TD' ||
          target.tagName === 'TH') {
        self.lastFocusedElement = target;
        self._updateMoveButtons();
        self._updateCustomActionStates();

        // Si había una imagen seleccionada y el foco entra en un editable de
        // texto distinto, deseleccionarla. La selección de imagen enfoca la
        // propia <img> (no un editable), así que seleccionar una imagen no se
        // auto-deselecciona; pero al pasar a editar texto (p. ej. tras
        // "insertar bloque arriba", cuyo foco es asíncrono) hay que limpiarla:
        // si no, el handler global de teclado de imagen seguiría vivo y
        // secuestraría Enter (crear bloque bajo la imagen) o Backspace (borrarla),
        // y _getFocusedBlockId() devolvería el id de la imagen, no el del texto.
        if (self.selectedImage && self.selectedImage.element !== target) {
          self.deselectImage();
        }
      }

      // Disparar onFocus solo cuando el foco entra al editor desde fuera
      // (no cuando se mueve entre bloques internamente)
      if (!self._hasFocus) {
        self._hasFocus = true;
        self._fireFocusCallback(target);
      }

      // Reevaluar la toolbar de tabla (aparece si el foco entró en una celda)
      self._updateTableToolbar();

      // Mostrar el handle flotante para el bloque que recibe el foco. Se hace
      // aquí (focusin burbujea) en vez de con un listener por bloque, para que
      // funcione en todas las rutas de render y tipos de bloque enfocables.
      if (!self.readOnly && self.floatingHandle && target.closest) {
        var v_blkEl = target.closest('.mewyse-block');
        if (v_blkEl) {
          // Cancelar cualquier ocultado diferido pendiente: el foco se asentó
          // en un bloque, así que el handle debe permanecer visible.
          if (self._handleHideTimer) { clearTimeout(self._handleHideTimer); self._handleHideTimer = null; }
          var v_bid = parseInt(v_blkEl.getAttribute('data-block-id'), 10);
          if (!isNaN(v_bid)) self.positionFloatingHandle(v_blkEl, v_bid);
        }
      }

      // Reflejar el tipo del bloque enfocado en el dropdown de la toolbar
      if (self._blockTypeButton && target.closest) {
        var v_typeBlkEl = target.closest('.mewyse-block');
        if (v_typeBlkEl) {
          var v_typeId = parseInt(v_typeBlkEl.getAttribute('data-block-id'), 10);
          var v_typeBlock = !isNaN(v_typeId) ? self.getBlock(v_typeId) : null;
          if (v_typeBlock) self._updateBlockTypeDropdown(v_typeBlock.type);
        }
      }
    });

    // focusout: detectar cuando el foco sale del editor a algún elemento externo.
    // Si tras el evento el nuevo activeElement está dentro del container o de
    // cualquier UI del editor (toolbar, menús flotantes, modales), el foco solo
    // se movió internamente y no hay que disparar onBlur.
    //
    // Las operaciones internas que mueven el foco entre contenteditables
    // (Enter, Backspace merge) levantan `_suppressBlurUntil`: durante esa
    // ventana, si activeElement quedó momentáneamente en body (típico en móvil
    // entre un focusout y el focusin del nuevo elemento), reintentamos hasta
    // que la ventana se cierra antes de decidir si fue un blur real.
    this.container.addEventListener('focusout', function(e) {
      function check() {
        if (!self.container) return;

        // Si seguimos dentro de la ventana de supresión, reprogramar para
        // re-chequear cuando termine. El foco interno suele asentarse antes.
        var now = Date.now();
        if (now < self._suppressBlurUntil) {
          setTimeout(check, self._suppressBlurUntil - now + 10);
          return;
        }

        var active = document.activeElement;
        if (!active || active === document.body) {
          if (self._hasFocus) {
            self._hasFocus = false;
            self._fireBlurCallback(e.target);
          }
          self.hideTableToolbar();  // el foco salió de la tabla
          // Ocultar el handle de forma diferida (evita parpadeo por blur
          // transitorio al reposicionar el caret / cambiar de bloque)
          self._scheduleHandleHideCheck();
          return;
        }

        // Si el foco se movió a la propia UI del editor (toolbar de tabla,
        // picker, menús, handle), no tocar toolbar ni handle: se sigue
        // interactuando con ellos.
        if (self._isPartOfEditorUI(active)) return;

        if (self._hasFocus) {
          self._hasFocus = false;
          self._fireBlurCallback(e.target);
        }
        self.hideTableToolbar();  // el foco salió a un elemento externo
        self._scheduleHandleHideCheck();
      }
      setTimeout(check, 0);
    });

    // Reposicionar el handle flotante al hacer scroll interno del editor, para
    // que siga alineado con el bloque enfocado/seleccionado.
    this._handleScrollReposition = function() {
      if (self.floatingHandle && self.currentFloatingBlockId != null) {
        var el = self.getBlockElementById(self.currentFloatingBlockId);
        if (el) self.positionFloatingHandle(el, self.currentFloatingBlockId);
      }
    };
    this.container.addEventListener('scroll', this._handleScrollReposition);

    // Añadir listener para deseleccionar imagen/vídeo al hacer clic fuera
    this.container.addEventListener('click', function(e) {
      // Si se hace clic fuera de una imagen seleccionada, deseleccionarla
      if (self.selectedImage && !e.target.classList.contains('mewyse-image')) {
        self.deselectImage();
      }
      // Igual para el vídeo: deseleccionar si el clic no fue dentro de su wrapper
      if (self.selectedVideo && (!e.target.closest || !e.target.closest('.mewyse-video-wrapper'))) {
        self.deselectVideo();
      }
    });

    // Añadir listener global para finalizar selección de celdas de tabla
    this._handleDocMouseUp = function(e) {
      // Limpiar estado de mousedown
      self.tableCellMouseDownCell = null;
      self.tableCellMouseDownBlockId = null;

      if (self.isSelectingTableCells) {
        self.endTableCellSelection(self.currentSelectionBlockId);
      }

      // Fin del arrastre de selección: durante el arrastre se suprimió el menú
      // flotante (ver onSelectionChange). Ahora que el ratón se soltó, reevaluar
      // la selección para mostrar el menú anclado a la selección ya finalizada.
      if (self._mouseSelecting) {
        self._mouseSelecting = false;
        self.onSelectionChange();
      }
    };
    document.addEventListener('mouseup', this._handleDocMouseUp);

    // Limpiar selección de celdas al hacer clic fuera de la tabla
    this._handleDocMouseDown = function(e) {
      // Inicio de un posible arrastre de selección dentro del editor: marcar el
      // estado para suprimir el menú flotante mientras dure el arrastre.
      if (self.container && self.container.contains(e.target)) {
        self._mouseSelecting = true;
      }
      if (self.selectedTableCells.length > 0) {
        var clickedCell = e.target.closest('td, th');
        // No limpiar si el clic fue en la toolbar de tabla (p.ej. botón combinar)
        var clickedToolbar = e.target.closest('.mewyse-table-toolbar');
        if (!clickedCell && !clickedToolbar) {
          self.clearTableCellSelection();
        }
      }
    };
    document.addEventListener('mousedown', this._handleDocMouseDown);

    // Snapshot inicial del historial
    this.pushHistory(true);
  };

  /**
   * Enfoca el primer bloque del editor
   */
  meWYSE.prototype.focusFirstBlock = function() {
    // Solo enfocar el primer bloque si el documento no tiene ningún elemento enfocado
    if (document.activeElement === document.body || document.activeElement === null) {
      if (this.blocks.length > 0) {
        var firstBlockElement = this.container.querySelector('[data-block-id="' + this.blocks[0].id + '"]');
        if (firstBlockElement) {
          var contentEditable = firstBlockElement.querySelector('[contenteditable="true"]');
          if (!contentEditable && firstBlockElement.contentEditable === 'true') {
            contentEditable = firstBlockElement;
          }
          if (contentEditable) {
            contentEditable.focus();
          }
        }
      }
    }
  };

  /**
   * Obtiene el elemento DOM de un bloque por su ID
   * @param {number} blockId - ID del bloque
   * @returns {HTMLElement|null}
   */
  meWYSE.prototype.getBlockElementById = function(blockId) {
    return this.container.querySelector('[data-block-id="' + blockId + '"]');
  };

  /**
   * Render INCREMENTAL (Fase 1): recrea el elemento DOM de UN solo bloque
   * (`createBlockElement`) y lo sustituye EN SU SITIO, sin tocar el resto del
   * documento. Así el foco/caret de los demás bloques se conserva de forma
   * nativa (a diferencia de `render()`, que hace `innerHTML=''` y reconstruye
   * todo, obligando a recapturar/reponer el foco).
   *
   * NO aplicable a bloques de LISTA: el DOM de las listas agrupa ítems
   * consecutivos en `<ul>/<ol>` anidados (no es 1:1 con el modelo), así que
   * recrear un `<li>` aislado rompería la agrupación → devuelve `false` para que
   * el llamador caiga a `render()` completo. También devuelve `false` si el
   * bloque no existe o no tiene elemento en el DOM.
   *
   * @param {number} blockId
   * @returns {boolean} true si se parcheó; false si hay que hacer render() completo
   */
  meWYSE.prototype._patch_block = function(blockId) {
    var v_block = this.getBlock(blockId);
    if (!v_block) return false;
    // Bloques de lista → fuera (agrupación no 1:1). Ver doc arriba.
    if (v_block.type === 'bulletList' || v_block.type === 'numberList' ||
        v_block.type === 'checklist') {
      return false;
    }
    var v_old = this.getBlockElementById(blockId);
    if (!v_old || !v_old.parentNode) return false;
    // Salvaguarda: si por lo que sea el elemento cuelga de un grupo de lista,
    // no parchear (dejar el reagrupado al render completo).
    if (v_old.closest && v_old.closest('.mewyse-list-group')) return false;
    var v_new = this.createBlockElement(v_block);
    v_old.parentNode.replaceChild(v_new, v_old);
    return true;
  };

  /**
   * Devuelve el nodo DOM de PRIMER NIVEL (hijo directo del container) que
   * contiene a `el`: para un bloque suelto es su propio elemento; para un ítem
   * de lista es el `.mewyse-list-group` (`<ul>/<ol>`) que lo envuelve. Sirve al
   * render incremental para insertar/quitar al nivel correcto del container.
   * @param {HTMLElement} el
   * @returns {HTMLElement|null} hijo directo del container, o null
   */
  meWYSE.prototype._top_level_block_node = function(el) {
    if (!el || !this.container) return null;
    var v_node = el;
    while (v_node.parentNode && v_node.parentNode !== this.container) {
      v_node = v_node.parentNode;
    }
    return (v_node.parentNode === this.container) ? v_node : null;
  };

  /**
   * Render INCREMENTAL de UN grupo de lista: reconstruye SOLO el `.mewyse-list-group`
   * (con su anidación) que contiene a `blockId`, sin tocar el resto del documento.
   * Útil cuando cambia la anidación de un ítem (indentar/desindentar), donde el DOM
   * del grupo se reestructura pero los demás bloques quedan intactos.
   * Devuelve false (→ el llamador hace `render()` completo) si el bloque no es de
   * lista o no se encuentra el wrapper del grupo.
   * @param {number} blockId
   * @returns {boolean}
   */
  meWYSE.prototype._patch_list_group = function(blockId) {
    var v_block = this.getBlock(blockId);
    if (!v_block || !this._isListBlockType(v_block.type)) return false;
    var v_index = this.getBlockIndex(blockId);
    if (v_index === -1) return false;
    // Inicio del grupo contiguo del MISMO tipo de lista (lo que agrupa el builder).
    var v_start = v_index;
    while (v_start > 0 && this.blocks[v_start - 1].type === v_block.type) v_start--;
    // Wrapper DOM antiguo: el nodo de primer nivel que contiene al ítem.
    var v_old = this._top_level_block_node(this.getBlockElementById(blockId));
    if (!v_old || !v_old.parentNode || !v_old.classList ||
        !v_old.classList.contains('mewyse-list-group')) {
      return false;
    }
    var v_built = this._buildNestedListWrapper(this.blocks, v_start);
    v_old.parentNode.replaceChild(v_built.wrapper, v_old);
    return true;
  };

  /**
   * Obtiene el elemento editable de un bloque
   * @param {HTMLElement} blockElement - Elemento del bloque
   * @returns {HTMLElement|null}
   */
  meWYSE.prototype.getEditableElement = function(blockElement) {
    if (!blockElement) return null;

    // Si el bloque mismo es editable, devolverlo
    if (blockElement.contentEditable === 'true') {
      return blockElement;
    }

    // Buscar elemento editable dentro (para code, table, checklist, etc.)
    var editable = blockElement.querySelector('[contenteditable="true"]');
    return editable;
  };

  /**
   * Enfoca un nuevo bloque recien creado
   * @param {HTMLElement} blockElement - Elemento del bloque
   */
  meWYSE.prototype.focusNewBlock = function(blockElement) {
    if (!blockElement) return;
    // El handler de Enter hace su propio focus síncrono (necesario para no
    // perder el teclado virtual en móvil) y nos pide saltarnos esta versión
    // asíncrona, que dispararía un re-focus fuera del gesto del usuario.
    if (this._skipAutoFocus) return;

    // Buscar el elemento editable dentro del bloque o el bloque mismo si es editable
    var contentEditable = blockElement.querySelector('[contenteditable="true"]');
    if (!contentEditable && blockElement.contentEditable === 'true') {
      contentEditable = blockElement;
    }

    if (contentEditable) {
      setTimeout(function() {
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              var sel = window.getSelection();
              sel.removeAllRanges();

              contentEditable.focus();

              if (document.activeElement !== contentEditable) {
                contentEditable.focus();
              }

              try {
                var range = document.createRange();
                if (contentEditable.childNodes.length === 0) {
                  range.setStart(contentEditable, 0);
                } else if (contentEditable.firstChild.nodeType === 3) {
                  range.setStart(contentEditable.firstChild, 0);
                } else {
                  range.setStart(contentEditable, 0);
                }
                range.collapse(true);
                sel.addRange(range);
              } catch(e) {}
            });
          });
        });
      }, 10);
    }
  };

  /**
   * Normaliza un valor de tamaño CSS para las opciones de altura.
   *   - número finito  → 'Npx'
   *   - string no vacío → tal cual (permite '30vh', '10em', 'none', '400px'...)
   *   - cualquier otra cosa → null (no aplicar)
   * La asignación posterior via element.style es segura: un valor inválido lo
   * ignora el navegador (no hay riesgo de inyección, no es innerHTML).
   * @param {*} v
   * @returns {string|null}
   */
  meWYSE.prototype._normalizeCssSize = function(v) {
    if (typeof v === 'number' && isFinite(v)) return v + 'px';
    if (typeof v === 'string' && v.trim() !== '') return v.trim();
    return null;
  };

  /**
   * ¿El tipo de bloque está desactivado para la INSERCIÓN desde la UI?
   * (opción `disabledBlocks`). No afecta a contenido programático.
   * @param {string} type
   * @returns {boolean}
   */
  meWYSE.prototype._isBlockDisabled = function(type) {
    return !!(this._disabledBlocks && this._disabledBlocks[type]);
  };

  /**
   * Aplica las opciones de altura (minHeight/maxHeight/autoExpand) como estilos
   * inline en el container. Los estilos inline ganan a los defaults del CSS.
   * Solo escribe las propiedades cuyas opciones se hayan definido, para no pisar
   * el comportamiento por defecto cuando el consumidor no configura nada.
   */
  meWYSE.prototype._applyHeightStyles = function() {
    if (!this.container) return;
    var s = this.container.style;

    if (this.minHeight) s.minHeight = this.minHeight;

    if (this.autoExpand) {
      // Crecer con el contenido: sin maxHeight no hay tope (scrollea la página);
      // con maxHeight, crece hasta ese límite y luego scroll interno.
      s.maxHeight = this.maxHeight || 'none';
      s.overflowY = this.maxHeight ? 'auto' : 'visible';
    } else if (this.maxHeight) {
      // Techo personalizado con scroll interno (sin autoExpand).
      s.maxHeight = this.maxHeight;
      s.overflowY = 'auto';
    }
  };

  /**
   * Inicializa el DOM para el editor
   */
  meWYSE.prototype.initDomEditor = function() {
    // Idempotencia: evita duplicar los listeners globales de document
    if (this._dom_initialized) return;
    this._dom_initialized = true;

    // Si el target no es un textarea, crear uno interno
    if (this.target.tagName !== 'TEXTAREA') {
      this.originalTarget = this.target;

      // Conservar el HTML original COMPLETO. Antes leíamos solo textContent,
      // lo cual aplastaba múltiples <p>/<h*>/<ul> a un único string de texto
      // y el `loadFromText` posterior creaba un único bloque. Guardando el
      // innerHTML, podemos parsearlo con `loadFromHTML` y respetar la
      // estructura original (párrafos, listas, tags/menciones, etc.).
      this._initialHTML = (this.originalTarget.innerHTML || '').trim();

      // Guarda anti auto-ingesta: si el host ya contiene el DOM renderizado por
      // una instancia previa de meWYSE (p. ej. doble montaje de React StrictMode
      // que re-ejecuta el constructor sobre el mismo nodo), su innerHTML serían
      // nuestros propios bloques (div[contenteditable][data-block-id], sin tags de
      // bloque reconocibles). Reingerirlos los aplanaría a un único párrafo y
      // dispararía un onChange espurio. Detectamos marcadores EXCLUSIVOS del chrome
      // del editor (nunca presentes en HTML de usuario ni en la salida de getHTML)
      // y lo ignoramos.
      if (this._initialHTML && this.originalTarget.querySelector(
            '[data-block-id], .mewyse-editor, .mewyse-editor-wrapper')) {
        this._initialHTML = '';
      }

      // Crear textarea interno oculto
      var internalTextarea = document.createElement('textarea');
      internalTextarea.style.display = 'none';

      // El textarea interno se mantiene vacío en este punto. La fuente de
      // verdad es `_initialHTML` (parseado más abajo) o `target.value` si el
      // target ORIGINAL ya era un textarea (en cuyo caso esta rama no entra).
      internalTextarea.value = '';

      // Insertar el textarea justo después del elemento original
      this.originalTarget.parentNode.insertBefore(internalTextarea, this.originalTarget.nextSibling);

      // Ocultar el elemento original
      this.originalTarget.style.display = 'none';

      // Usar el textarea interno como target
      this.target = internalTextarea;
    }

    // Ocultar textarea (original o interno)
    this.target.style.display = 'none';

    // Si se solicita toolbar, crear un wrapper.
    // En modo readOnly el toolbar no aplica (sus acciones no harían nada);
    // se omite aunque se haya pasado `toolbar: true`.
    if (this.showToolbar && !this.readOnly) {
      var editorWrapper = document.createElement('div');
      editorWrapper.className = 'mewyse-editor-wrapper';
      if (this.options.theme) {
        editorWrapper.classList.add('mewyse-editor-' + this.options.theme);
      }
      if (this.rtl) {
        editorWrapper.classList.add('mewyse-rtl');
        editorWrapper.setAttribute('dir', 'rtl');
      }
      this.editorWrapper = editorWrapper;

      // Crear y añadir toolbar
      this.toolbar = this.createToolbar();
      editorWrapper.appendChild(this.toolbar);

      // Crear contenedor del editor
      this.container = document.createElement('div');
      this.container.className = 'mewyse-editor mewyse-minimal ' + this.instanceId;
      this.container.setAttribute('role', 'textbox');
      this.container.setAttribute('aria-multiline', 'true');
      if (this.options.theme) {
        this.container.classList.add('mewyse-editor-' + this.options.theme);
      }
      if (this.rtl) {
        this.container.classList.add('mewyse-rtl');
        this.container.setAttribute('dir', 'rtl');
      }
      editorWrapper.appendChild(this.container);

      // Barra de contador de palabras/caracteres (opcional)
      if (this.showCharCounter) {
        this.charCounterBar = this.createCharCounterBar();
        editorWrapper.appendChild(this.charCounterBar);
      }

      // Insertar el wrapper después del textarea
      this.target.parentNode.insertBefore(editorWrapper, this.target.nextSibling);
    } else {
      // Sin toolbar: comportamiento original
      this.container = document.createElement('div');
      this.container.className = 'mewyse-editor mewyse-minimal ' + this.instanceId;
      this.container.setAttribute('role', 'textbox');
      this.container.setAttribute('aria-multiline', 'true');
      if (this.options.theme) {
        this.container.classList.add('mewyse-editor-' + this.options.theme);
      }
      if (this.rtl) {
        this.container.classList.add('mewyse-rtl');
        this.container.setAttribute('dir', 'rtl');
      }
      this.target.parentNode.insertBefore(this.container, this.target.nextSibling);

      // Barra de contador sin toolbar: se añade debajo del container
      if (this.showCharCounter) {
        this.charCounterBar = this.createCharCounterBar();
        this.container.parentNode.insertBefore(this.charCounterBar, this.container.nextSibling);
      }
    }

    // En modo readOnly añadir hook CSS y aria-readonly. Se aplica tanto al
    // container como al wrapper (si lo hay) para permitir reglas separadas
    // (ej. ocultar placeholders, atenuar cursor, etc.).
    if (this.readOnly) {
      if (this.container) {
        this.container.classList.add('mewyse-readonly');
        this.container.setAttribute('aria-readonly', 'true');
      }
      if (this.editorWrapper) {
        this.editorWrapper.classList.add('mewyse-readonly');
      }
    }

    // Activar los estilos de contenido por defecto (mewyse.css los define
    // bajo el marker `.mewyse-editor-styled`). Cuando `contentStyles: false`
    // no se aplica el marker — la página consumidora controla los estilos.
    if (this.options.contentStyles !== false) {
      if (this.container) this.container.classList.add('mewyse-editor-styled');
      if (this.editorWrapper) this.editorWrapper.classList.add('mewyse-editor-styled');
    }

    // Ajuste de texto: envolver contenido largo dentro del mismo bloque
    // (comportamiento, independiente de contentStyles). Activo salvo wordWrap:false.
    if (this.wordWrap && this.container) {
      this.container.classList.add('mewyse-word-wrap');
    }

    // Altura configurable (minHeight/maxHeight/autoExpand): estilos inline que
    // ganan a los defaults del CSS. Independiente de contentStyles.
    this._applyHeightStyles();

    // Cargar contenido inicial.
    //  - Prioridad 1: HTML original del target (cuando NO era textarea) →
    //    parsear con `loadFromHTML` para conservar estructura.
    //  - Prioridad 2: texto plano del textarea → `loadFromText`.
    if (this._initialHTML) {
      this.loadFromHTML(this._initialHTML);
      this._initialHTML = null; // libera referencia
    } else if (this.target.value) {
      // El target original ERA un textarea: su value suele traer HTML (uso como
      // reemplazo de TinyMCE). Si parece HTML, parsearlo con loadFromHTML para
      // trocearlo en bloques (párrafos, imágenes, listas, tablas…) — así el
      // editor trata cada elemento como su propio bloque. Si es texto plano,
      // se mantiene el comportamiento línea→párrafo de loadFromText.
      var v_initial_value = this.target.value;
      if (this._looks_like_html(v_initial_value)) {
        this.loadFromHTML(v_initial_value);
      } else {
        this.loadFromText(v_initial_value);
      }
    }

    // NOTA: la línea base de dirty tracking (_capture_pristine) y el reinicio de
    // historial (_reset_history) se hacen en init(), DESPUÉS de garantizar ≥1
    // bloque (párrafo por defecto si el textarea venía vacío). Si se hicieran
    // aquí con blocks=[] (textarea vacío), el historial quedaría [[], ['paragraph']]
    // y deshacer restauraría un estado SIN bloques (editor sin editable).

    // Habilitar drag & drop de imágenes sobre el editor.
    // No aplica en readOnly: no se puede insertar nada nuevo.
    if (!this.readOnly) {
      this._attachImageDropHandlers();
    }

    // Interceptar copy para limpiar styles no-nativos (mismo criterio que getHTML).
    this._attachCopyHandler();
  };

  /**
   * Listener de `copy` sobre el container: extrae el HTML de la selección,
   * pasa por `_stripNonNativeStyles` y reescribe el clipboard. El texto plano
   * (selection.toString()) se mantiene tal cual.
   */
  meWYSE.prototype._attachCopyHandler = function() {
    var self = this;
    if (!this.container) return;
    this.container.addEventListener('copy', function(e) {
      try {
        var sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
        // Solo intervenimos si la selección está realmente dentro del editor.
        var range = sel.getRangeAt(0);
        var anchor = range.commonAncestorContainer;
        if (anchor.nodeType === 3) anchor = anchor.parentNode;
        if (!anchor || !self.container.contains(anchor)) return;

        var fragment = range.cloneContents();
        var div = document.createElement('div');
        div.appendChild(fragment);
        var cleaned = self._stripNonNativeStyles(div.innerHTML);

        var data = e.clipboardData || window.clipboardData;
        if (data && data.setData) {
          data.setData('text/html', cleaned);
          data.setData('text/plain', sel.toString());
          e.preventDefault();
        }
      } catch (err) {
        // En caso de error, dejar que el browser maneje el copy de forma nativa.
      }
    });
  };

  /**
   * Habilita drag & drop de archivos de imagen sobre el container del editor.
   * No interfiere con el drag de bloques (distintos tipos en dataTransfer).
   */
  meWYSE.prototype._attachImageDropHandlers = function() {
    var self = this;
    if (!this.container) return;

    var hasImageFile = function(dt) {
      if (!dt) return false;
      // types puede ser un DOMStringList o array
      if (dt.types && dt.types.length) {
        for (var i = 0; i < dt.types.length; i++) {
          if (dt.types[i] === 'Files') return true;
        }
      }
      return false;
    };

    this._imageDragEnterHandler = function(e) {
      // Aceptar tanto archivos OS como imágenes internas arrastradas
      if (hasImageFile(e.dataTransfer) || self._draggedImage) {
        e.preventDefault();
        self.container.classList.add('mewyse-image-drop-target');
      }
    };
    this._imageDragOverHandler = function(e) {
      if (hasImageFile(e.dataTransfer)) {
        e.preventDefault();
        try { e.dataTransfer.dropEffect = 'copy'; } catch (err) {}
      } else if (self._draggedImage) {
        e.preventDefault();
        try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
      }
    };
    this._imageDragLeaveHandler = function(e) {
      // Solo quitar la clase si el leave es fuera del container (no a un hijo)
      if (e.target === self.container) {
        self.container.classList.remove('mewyse-image-drop-target');
      }
    };
    this._imageDropHandler = function(e) {
      // Caso 1: imagen interna arrastrada a un bloque (no celda)
      if (self._draggedImage) {
        // Si el drop ocurre dentro de una celda, dejarlo al handler de la celda
        var cellTarget = e.target && e.target.closest ? e.target.closest('td, th') : null;
        if (cellTarget) return; // el handler de la celda se encarga

        var targetBlockEl = e.target && e.target.closest ? e.target.closest('[data-block-id]') : null;
        if (!targetBlockEl) return;

        e.preventDefault();
        e.stopPropagation();
        self.container.classList.remove('mewyse-image-drop-target');
        self._dropImageIntoBlock(targetBlockEl);
        return;
      }

      // Caso 2: archivos OS (comportamiento existente)
      if (self._isBlockDisabled('image')) return; // inserción de imagen desactivada
      if (!hasImageFile(e.dataTransfer)) return;

      // Es un drop de ficheros: prevenir SIEMPRE la acción por defecto del
      // navegador (que abriría el fichero y navegaría fuera de la página,
      // perdiendo el contenido), aunque luego ninguno resulte ser imagen.
      e.preventDefault();
      e.stopPropagation();
      self.container.classList.remove('mewyse-image-drop-target');

      var files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      // Solo procesar si al menos un archivo es imagen
      var imageFile = null;
      for (var i = 0; i < files.length; i++) {
        if (files[i].type && files[i].type.indexOf('image/') === 0) {
          imageFile = files[i];
          break;
        }
      }
      if (!imageFile) return;

      // Calcular insertIndex: después del bloque sobre el que se soltó, o al final.
      // Si ese bloque está vacío, la imagen lo reemplaza en su sitio.
      var insertIndex = self.blocks.length;
      var v_replaceId = null;
      var targetBlock = e.target && e.target.closest ? e.target.closest('[data-block-id]') : null;
      if (targetBlock) {
        var blockId = parseInt(targetBlock.getAttribute('data-block-id'), 10);
        if (!isNaN(blockId)) {
          insertIndex = self.getBlockIndex(blockId) + 1;
          var v_tb = self.getBlock(blockId);
          if (v_tb && typeof v_tb.content === 'string' &&
              v_tb.content.trim() === '' && v_tb.type !== 'divider') {
            v_replaceId = blockId;
          }
        }
      }

      self._processImageFile(imageFile, function(imgData) {
        if (!imgData) return;
        self.createImageBlock(imageFile, imgData.blob, imgData.width, imgData.height, insertIndex, null, v_replaceId);
      });
    };

    this.container.addEventListener('dragenter', this._imageDragEnterHandler);
    this.container.addEventListener('dragover', this._imageDragOverHandler);
    this.container.addEventListener('dragleave', this._imageDragLeaveHandler);
    this.container.addEventListener('drop', this._imageDropHandler);
  };

  /**
   * Crea el handle flotante que se posiciona junto al bloque activo
   */
  meWYSE.prototype.createFloatingHandle = function() {
    var self = this;

    // Crear el contenedor del handle flotante
    this.floatingHandle = document.createElement('div');
    this.floatingHandle.className = 'mewyse-floating-handle';

    // Crear el boton handle
    var handle = document.createElement('button');
    handle.className = 'mewyse-handle';
    handle.innerHTML = WYSIWYG_ICONS.dragHandle;
    handle.title = this.t('tooltips.dragToReorder');
    handle.setAttribute('aria-label', this.t('tooltips.dragToReorder'));
    handle.draggable = true;

    // Click para mostrar menu
    handle.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (self.currentFloatingBlockId) {
        self.showBlockOptionsMenu(self.currentFloatingBlockId, handle);
      }
    };

    // Eventos de arrastre
    handle.ondragstart = function(e) {
      if (!self.currentFloatingBlockId) return;
      e.stopPropagation();
      var blockElement = self.getBlockElementById(self.currentFloatingBlockId);
      if (blockElement) {
        blockElement.classList.add('dragging');
      }
      self.draggedBlockId = self.currentFloatingBlockId;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', self.currentFloatingBlockId);
    };

    handle.ondragend = function(e) {
      e.stopPropagation();
      self.draggedBlockId = null;
      // Limpiar todos los indicadores de drag-over
      var allBlocks = self.container.querySelectorAll('.mewyse-block');
      for (var i = 0; i < allBlocks.length; i++) {
        allBlocks[i].classList.remove('dragging');
        allBlocks[i].classList.remove('drag-over');
      }
    };

    this.floatingHandle.appendChild(handle);

    // Mantener el handle visible al pasar el ratón por encima (cancela el
    // ocultado pendiente del hover de separador).
    this.floatingHandle.addEventListener('mouseenter', function() {
      if (self.floatingHandleHideTimeout) {
        clearTimeout(self.floatingHandleHideTimeout);
        self.floatingHandleHideTimeout = null;
      }
    });

    // Al salir del handle solo se oculta si el handle se mostró por HOVER (caso
    // separador). Con el modelo por foco/selección, la visibilidad la gobiernan
    // el foco y la selección, no el ratón, así que no se oculta aquí.
    this.floatingHandle.addEventListener('mouseleave', function(e) {
      var v_block = self.currentFloatingBlockId ? self.getBlock(self.currentFloatingBlockId) : null;
      if (!v_block || v_block.type !== 'divider') return;
      var relatedTarget = e.relatedTarget;
      var goingToBlock = relatedTarget && (
        relatedTarget.classList.contains('mewyse-block') ||
        (relatedTarget.closest && relatedTarget.closest('.mewyse-block'))
      );
      if (!goingToBlock) {
        self.floatingHandleHideTimeout = setTimeout(function() {
          self.hideFloatingHandle();
        }, 100);
      }
    });

    // Insertar el handle en el contenedor padre del editor
    var editorWrapper = this.container.parentNode;
    editorWrapper.style.position = 'relative';
    editorWrapper.appendChild(this.floatingHandle);

    // Variables para el posicionamiento
    this.currentFloatingBlockId = null;
    this.floatingHandleHideTimeout = null;
  };

  /**
   * Posiciona el handle flotante junto a un bloque
   * @param {HTMLElement} blockElement - Elemento del bloque
   * @param {number} blockId - ID del bloque
   */
  meWYSE.prototype.positionFloatingHandle = function(blockElement, blockId) {
    if (!this.floatingHandle || !blockElement) return;

    this.currentFloatingBlockId = blockId;

    // Obtener posicion del bloque relativa al contenedor padre
    var editorWrapper = this.container.parentNode;
    var wrapperRect = editorWrapper.getBoundingClientRect();
    var blockRect = blockElement.getBoundingClientRect();

    // Centrar el handle con el CENTRO de la primera línea de texto del bloque
    // (no con el borde superior). Así queda bien alineado tanto en párrafos como
    // en títulos grandes (line-height alto) o bloques con padding/borde.
    var v_cs = window.getComputedStyle(blockElement);
    var paddingTop = parseFloat(v_cs.paddingTop) || 0;
    var borderTop = parseFloat(v_cs.borderTopWidth) || 0;
    var v_line_height = parseFloat(v_cs.lineHeight);
    if (isNaN(v_line_height)) {
      // line-height: normal → aproximar con font-size * 1.2
      v_line_height = (parseFloat(v_cs.fontSize) || 16) * 1.2;
    }
    var v_handle_h = this.floatingHandle.offsetHeight || 24;

    // Calcular posicion del handle.
    //
    // El handle vive como hijo absolute-positioned del wrapper (con
    // position: relative). Lo colocamos en el padding-left ampliado del
    // editor (var --mewyse-padding-handle desde mewyse.css) — siempre DENTRO
    // del wrapper, para que un parent con `overflow: hidden` no lo recorte.
    //
    // Vertical: centro de la primera línea (paddingTop + borderTop + lineHeight/2)
    // menos la mitad de la altura del handle.
    var top = blockRect.top - wrapperRect.top + paddingTop + borderTop +
              (v_line_height / 2) - (v_handle_h / 2);
    var left = blockRect.left - wrapperRect.left - 20;

    this.floatingHandle.style.top = top + 'px';
    // Mínimo 4px desde el borde del wrapper para evitar el clip (también
    // útil cuando el padding inyectado está desactivado por contentStyles:false).
    this.floatingHandle.style.left = left + 'px';;//Math.max(4, left) + 'px';
    this.floatingHandle.classList.add('visible');
  };

  /**
   * Oculta el handle flotante
   */
  /**
   * Programa un ocultado diferido del handle: solo oculta si, tras un breve
   * retardo, el foco realmente quedó FUERA del editor (no en un bloque ni en la
   * UI del editor). Evita el parpadeo cuando el foco pasa fugazmente por `body`
   * al reposicionar el caret o cambiar de bloque con el ratón.
   */
  meWYSE.prototype._scheduleHandleHideCheck = function() {
    var self = this;
    if (this._handleHideTimer) clearTimeout(this._handleHideTimer);
    this._handleHideTimer = setTimeout(function() {
      self._handleHideTimer = null;
      if (self._destroyed) return;
      if (self.selectedImage) return; // su handle se gestiona por selección
      var active = document.activeElement;
      // Si el foco volvió al editor o a su UI flotante, no ocultar
      if (active && (
        (self.container && self.container.contains(active)) ||
        self._isPartOfEditorUI(active)
      )) return;
      self.hideFloatingHandle();
    }, 120);
  };

  meWYSE.prototype.hideFloatingHandle = function() {
    // Limpiar timeout pendiente
    if (this.floatingHandleHideTimeout) {
      clearTimeout(this.floatingHandleHideTimeout);
      this.floatingHandleHideTimeout = null;
    }
    if (this.floatingHandle) {
      this.floatingHandle.classList.remove('visible');
      this.currentFloatingBlockId = null;
    }
  };

  /**
   * Normaliza la opción `toolbar` a filas de grupos de nombres de ítem.
   * @param {boolean|string|Array} spec
   * @returns {Array<Array<Array<string>>>} filas → grupos → nombres
   */
  meWYSE.prototype._normalizeToolbarSpec = function(spec) {
    var v_src;
    if (spec === true || spec == null) v_src = [DEFAULT_TOOLBAR];
    else if (typeof spec === 'string') v_src = [spec];
    else if (Array.isArray(spec)) v_src = spec.slice();
    else v_src = [DEFAULT_TOOLBAR];

    var v_rows = [];
    for (var i = 0; i < v_src.length; i++) {
      var v_groups_str = String(v_src[i] || '').split('|');
      var v_groups = [];
      for (var g = 0; g < v_groups_str.length; g++) {
        var v_names = v_groups_str[g].trim().split(/\s+/).filter(function(n) { return n !== ''; });
        if (v_names.length) v_groups.push(v_names);
      }
      if (v_groups.length) v_rows.push(v_groups);
    }
    if (!v_rows.length) v_rows = [[['undo', 'redo']]];
    return v_rows;
  };

  /**
   * Crea un botón de toolbar con el patrón común.
   * @param {Object} o - { icon, title, className, dropdown, disabled, onmousedown, onclick }
   * @returns {HTMLButtonElement}
   */
  meWYSE.prototype._makeToolbarButton = function(o) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mewyse-toolbar-button' +
      (o.dropdown ? ' mewyse-toolbar-dropdown' : '') +
      (o.className ? ' ' + o.className : '');
    btn.innerHTML = o.icon;
    if (o.title) { btn.title = o.title; btn.setAttribute('aria-label', o.title); }
    if (o.disabled) btn.disabled = true;
    if (o.onmousedown) btn.onmousedown = o.onmousedown;
    if (o.onclick) btn.onclick = o.onclick;
    return btn;
  };

  /**
   * Construye un botón de formato inline (bold/italic/.../subscript/superscript)
   * a partir de TOOLBAR_FORMAT_TOOLS.
   */
  meWYSE.prototype._buildFormatButton = function(name) {
    var self = this;
    var cfg = TOOLBAR_FORMAT_TOOLS[name];
    if (!cfg) return null;
    var v_icon = cfg.icon || (cfg.iconName ? WYSIWYG_ICONS[cfg.iconName] : '');
    var v_btn = this._makeToolbarButton({
      icon: v_icon,
      title: self.t(cfg.labelKey),
      // preventDefault en mousedown: al pulsar, el foco NO sale del bloque
      // editable. Así, con el caret colapsado (sin selección), execCommand activa
      // el formato para lo que se escriba a continuación (toggle de escritura,
      // comportamiento WYSIWYG estándar); y con texto seleccionado, no se pierde
      // la selección.
      onmousedown: function(e) { e.preventDefault(); },
      onclick: function(e) {
        e.preventDefault();
        e.stopPropagation();
        // La lógica (cross-block/inline) vive en _runDefaultAction; pasar por
        // _runAction aplica overrides/desactivaciones del registro de acciones.
        self._runAction(name, { source: 'toolbar', event: e, button: e.currentTarget });
        // Refrescar el estado activo del botón tras alternar el formato.
        self._updateFormatButtonStates();
      }
    });
    // Botones con comando execCommand (bold/italic/underline/strikethrough):
    // se registran para reflejar su ESTADO ACTIVO (fondo resaltado) según el
    // formato del caret/selección (queryCommandState). Los de tipo wrapTag
    // (sub/superíndice) no usan execCommand, así que no se registran.
    if (cfg.command && this._formatStateButtons) {
      this._formatStateButtons.push({ el: v_btn, command: cfg.command });
    }
    return v_btn;
  };

  /**
   * Construye el ELEMENTO de un ítem de toolbar por nombre, o null si no aplica
   * (p. ej. `mergetags` sin datos, o un bloque de inserción desactivado).
   * @param {string} name
   * @returns {?HTMLElement}
   */
  meWYSE.prototype._buildToolbarItem = function(name) {
    var self = this;
    // Acción CUSTOM registrada (opción `actions` / registerAction): botón genérico
    // con su icono/tooltip que despacha por _runAction. Tiene prioridad sobre el
    // switch de estándar (un nombre custom nunca coincide con uno estándar: esos
    // se tratan como override en _registerActionDef).
    if (this._customActionsByName && this._customActionsByName[name]) {
      return this._buildCustomActionButton(this._customActionsByName[name], 'toolbar');
    }
    switch (name) {
      case 'undo':
        return (this.undoButton = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.undo, title: this.t('tooltips.undo'), disabled: true,
          onmousedown: function(e) { e.preventDefault(); },
          onclick: function(e) { e.preventDefault(); self._runAction('undo', { source: 'toolbar', event: e, button: e.currentTarget }); }
        }));
      case 'redo':
        return (this.redoButton = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.redo, title: this.t('tooltips.redo'), disabled: true,
          onmousedown: function(e) { e.preventDefault(); },
          onclick: function(e) { e.preventDefault(); self._runAction('redo', { source: 'toolbar', event: e, button: e.currentTarget }); }
        }));
      case 'blocktype':
        var v_bt = this._makeToolbarButton({
          icon: this.t('misc.text') + ' <span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span>',
          title: this.t('tooltips.changeBlockType'), dropdown: true, className: 'mewyse-toolbar-dropdown-wide',
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('blocktype', { source: 'toolbar', event: e, button: v_bt }); }
        });
        v_bt.setAttribute('aria-expanded', 'false');
        v_bt.setAttribute('aria-haspopup', 'listbox');
        this._blockTypeButton = v_bt;
        return v_bt;
      case 'fontsize':
        return this._buildFontSizeStepper();
      case 'bold': case 'italic': case 'underline': case 'strikethrough':
      case 'subscript': case 'superscript':
        return this._buildFormatButton(name);
      case 'case':
        var v_case = this._makeToolbarButton({
          icon: '<span style="font-size:13px;font-weight:600">Aa</span> <span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span>',
          title: this.t('tooltips.toggleCase'), dropdown: true,
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('case', { source: 'toolbar', event: e, button: v_case }); }
        });
        return v_case;
      case 'removeformat':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.removeFormat, title: this.t('tooltips.removeFormat'),
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('removeformat', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'link':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.link, title: this.t('tooltips.insertLink'),
          onclick: function(e) { e.preventDefault(); self._runAction('link', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'forecolor':
        var v_color = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.palette, title: this.t('tooltips.color'),
          onclick: function(e) { e.preventDefault(); self._runAction('forecolor', { source: 'toolbar', event: e, button: v_color }); }
        });
        return v_color;
      case 'font':
        var v_font = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.font + ' <span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span>',
          title: this.t('tooltips.font'), dropdown: true,
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('font', { source: 'toolbar', event: e, button: v_font }); }
        });
        return v_font;
      case 'lineheight':
        var v_lh = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.lineHeight + ' <span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span>',
          title: this.t('tooltips.lineHeight'), dropdown: true,
          onmousedown: function(e) { e.preventDefault(); },
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('lineheight', { source: 'toolbar', event: e, button: v_lh }); }
        });
        return v_lh;
      case 'specialchars':
        var v_chars = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.specialChars, title: this.t('tooltips.specialChars'),
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('specialchars', { source: 'toolbar', event: e, button: v_chars }); }
        });
        return v_chars;
      case 'mergetags':
        if (!this.mergeTags || this.mergeTags.length === 0) return null;
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.mergeTag, title: this.t('tooltips.mergeTag'),
          onmousedown: function(e) { e.preventDefault(); },
          onclick: function(e) { e.preventDefault(); self._runAction('mergetags', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'align':
        var v_align = this._makeToolbarButton({
          icon: this._alignButtonInnerHTML('left'), title: this.t('tooltips.alignLeft'),
          onmousedown: function(e) { e.preventDefault(); },
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('align', { source: 'toolbar', event: e, button: v_align }); }
        });
        v_align.setAttribute('aria-haspopup', 'true');
        this.alignButton = v_align;
        return v_align;
      case 'outdent':
        return (this.outdentButton = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.outdent, title: this.t('tooltips.outdent'), disabled: true,
          onmousedown: function(e) { e.preventDefault(); },
          onclick: function(e) { e.preventDefault(); self._runAction('outdent', { source: 'toolbar', event: e, button: e.currentTarget }); }
        }));
      case 'indent':
        return (this.indentButton = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.indent, title: this.t('tooltips.indent'), disabled: true,
          onmousedown: function(e) { e.preventDefault(); },
          onclick: function(e) { e.preventDefault(); self._runAction('indent', { source: 'toolbar', event: e, button: e.currentTarget }); }
        }));
      case 'table':
        if (this._isBlockDisabled('table')) return null;
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.table, title: this.t('tooltips.insertTable'),
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('table', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'image':
        if (this._isBlockDisabled('image')) return null;
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.image, title: this.t('tooltips.insertImage'),
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('image', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'video':
        if (this._isBlockDisabled('video')) return null;
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.video, title: this.t('tooltips.insertVideo'),
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('video', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'audio':
        if (this._isBlockDisabled('audio')) return null;
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.audio, title: this.t('tooltips.insertAudio'),
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('audio', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'pagebreak':
        if (this._isBlockDisabled('pageBreak')) return null;
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.pageBreak, title: this.t('tooltips.pageBreak'),
          onclick: function(e) { e.preventDefault(); e.stopPropagation(); self._runAction('pagebreak', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'find':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.search, title: this.t('tooltips.findReplace') + ' (Ctrl+F)',
          onclick: function(e) { e.preventDefault(); self._runAction('find', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'wordwrap':
        var v_ww = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.wordWrap, title: this.t('tooltips.wordWrap'),
          onclick: function(e) {
            e.preventDefault(); self._runAction('wordwrap', { source: 'toolbar', event: e, button: v_ww });
            v_ww.setAttribute('aria-pressed', self.wordWrap ? 'true' : 'false');
            v_ww.classList.toggle('active', self.wordWrap);
          }
        });
        v_ww.setAttribute('aria-pressed', this.wordWrap ? 'true' : 'false');
        if (this.wordWrap) v_ww.classList.add('active');
        this.wordWrapButton = v_ww;
        return v_ww;
      case 'summary':
        var v_sum = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.summaryPanel, title: this.t('tooltips.summary'),
          onclick: function(e) { e.preventDefault(); self._runAction('summary', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
        v_sum.setAttribute('aria-pressed', this.outlinePanel ? 'true' : 'false');
        if (this.outlinePanel) v_sum.classList.add('active');
        this.toolbarSummaryButton = v_sum;
        return v_sum;
      case 'showblocks':
        var v_sb = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.showBlocks, title: this.t('tooltips.showBlocks'),
          onclick: function(e) {
            e.preventDefault(); self._runAction('showblocks', { source: 'toolbar', event: e, button: v_sb });
            v_sb.setAttribute('aria-pressed', self.showingBlocks ? 'true' : 'false');
            v_sb.classList.toggle('active', self.showingBlocks);
          }
        });
        v_sb.setAttribute('aria-pressed', 'false');
        this.showBlocksButton = v_sb;
        return v_sb;
      case 'sourcecode':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.sourceCode, title: this.t('tooltips.sourceCode'),
          onclick: function(e) { e.preventDefault(); self._runAction('sourcecode', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'markdown':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.markdown, title: this.t('tooltips.markdown'),
          onclick: function(e) { e.preventDefault(); self._runAction('markdown', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'fullscreen':
        var v_fsn = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.fullscreen, title: this.t('tooltips.fullscreen'),
          onclick: function(e) { e.preventDefault(); self._runAction('fullscreen', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
        v_fsn.setAttribute('aria-pressed', 'false');
        this.fullscreenButton = v_fsn;
        return v_fsn;
      case 'print':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.print, title: this.t('tooltips.print'),
          onclick: function(e) { e.preventDefault(); self._runAction('print', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'exportword':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.exportWord, title: this.t('tooltips.exportWord'),
          onclick: function(e) { e.preventDefault(); self._runAction('exportword', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'exportpdf':
        return this._makeToolbarButton({
          icon: WYSIWYG_ICONS.exportPdf, title: this.t('tooltips.exportPdf'),
          onclick: function(e) { e.preventDefault(); self._runAction('exportpdf', { source: 'toolbar', event: e, button: e.currentTarget }); }
        });
      case 'moveup':
        return (this.moveUpButton = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.arrowUp, title: this.t('tooltips.moveBlockUp'), disabled: true,
          onclick: function(e) { e.preventDefault(); self._runAction('moveup', { source: 'toolbar', event: e, button: e.currentTarget }); }
        }));
      case 'movedown':
        return (this.moveDownButton = this._makeToolbarButton({
          icon: WYSIWYG_ICONS.arrowDown, title: this.t('tooltips.moveBlockDown'), disabled: true,
          onclick: function(e) { e.preventDefault(); self._runAction('movedown', { source: 'toolbar', event: e, button: e.currentTarget }); }
        }));
      default:
        return null; // nombre desconocido → se ignora
    }
  };

  /**
   * Construye el stepper de tamaño de fuente [−] [valor] [+] (ítem `fontsize`).
   * @returns {HTMLElement}
   */
  meWYSE.prototype._buildFontSizeStepper = function() {
    var self = this;
    var v_stepper = document.createElement('div');
    v_stepper.className = 'mewyse-font-size-stepper';

    var v_dec = this._makeToolbarButton({
      icon: WYSIWYG_ICONS.minus, title: this.t('tooltips.fontSizeDecrease'), className: 'mewyse-font-size-step',
      onmousedown: function(e) { e.preventDefault(); },
      onclick: function(e) { e.preventDefault(); self._stepFontSize(-1); }
    });
    var v_val = document.createElement('span');
    v_val.className = 'mewyse-font-size-value';
    v_val.textContent = '—';
    this._fontSizeDisplay = v_val;
    var v_inc = this._makeToolbarButton({
      icon: WYSIWYG_ICONS.plus, title: this.t('tooltips.fontSizeIncrease'), className: 'mewyse-font-size-step',
      onmousedown: function(e) { e.preventDefault(); },
      onclick: function(e) { e.preventDefault(); self._stepFontSize(1); }
    });

    v_stepper.appendChild(v_dec);
    v_stepper.appendChild(v_val);
    v_stepper.appendChild(v_inc);
    return v_stepper;
  };

  /**
   * Crea la barra de herramientas
   */
  meWYSE.prototype.createToolbar = function() {
    var self = this;
    var toolbar = document.createElement('div');
    toolbar.className = 'mewyse-toolbar';

    // En modo 'scroll' montamos una zona desplazable (track) + zona fija a la derecha
    // con los botones de mover bloque. Los grupos se añaden al `host`, que en modo
    // 'wrap' es la propia toolbar y en modo 'scroll' es el track.
    var scrollMode = this.toolbarOverflow === 'scroll';
    var host = toolbar;
    var scrollArea = null;
    var scrollTrack = null;
    var scrollPrev = null;
    var scrollNext = null;
    if (scrollMode) {
      toolbar.classList.add('mewyse-toolbar-mode-scroll');

      scrollArea = document.createElement('div');
      scrollArea.className = 'mewyse-toolbar-scroll-area';
      if (this.rtl) scrollArea.setAttribute('dir', 'rtl');

      var fadeStart = document.createElement('div');
      fadeStart.className = 'mewyse-toolbar-fade mewyse-toolbar-fade-start';
      fadeStart.setAttribute('aria-hidden', 'true');
      scrollArea.appendChild(fadeStart);

      var fadeEnd = document.createElement('div');
      fadeEnd.className = 'mewyse-toolbar-fade mewyse-toolbar-fade-end';
      fadeEnd.setAttribute('aria-hidden', 'true');
      scrollArea.appendChild(fadeEnd);

      scrollPrev = document.createElement('button');
      scrollPrev.type = 'button';
      scrollPrev.className = 'mewyse-toolbar-scroll-arrow mewyse-toolbar-scroll-arrow-prev';
      scrollPrev.innerHTML = WYSIWYG_ICONS.arrowLeft || WYSIWYG_ICONS.chevronDown;
      scrollPrev.title = this.t('tooltips.scrollPrev');
      scrollPrev.setAttribute('aria-label', this.t('tooltips.scrollPrev'));
      scrollPrev.tabIndex = -1;
      scrollArea.appendChild(scrollPrev);

      scrollNext = document.createElement('button');
      scrollNext.type = 'button';
      scrollNext.className = 'mewyse-toolbar-scroll-arrow mewyse-toolbar-scroll-arrow-next';
      scrollNext.innerHTML = WYSIWYG_ICONS.arrowRight || WYSIWYG_ICONS.chevronDown;
      scrollNext.title = this.t('tooltips.scrollNext');
      scrollNext.setAttribute('aria-label', this.t('tooltips.scrollNext'));
      scrollNext.tabIndex = -1;
      scrollArea.appendChild(scrollNext);

      scrollTrack = document.createElement('div');
      scrollTrack.className = 'mewyse-toolbar-scroll-track';
      scrollArea.appendChild(scrollTrack);

      toolbar.appendChild(scrollArea);
      host = scrollTrack;
    }

    // En modo scroll, estos ítems se anclan a una zona fija a la derecha (fuera
    // del área de scroll y de la flecha `→`) para que sigan SIEMPRE accesibles
    // aunque la toolbar desborde. Solo se anclan los que estén en el spec. En
    // modo wrap no se anclan (al envolver ya se ven todos).
    var v_pin_set = scrollMode ? { moveup: true, movedown: true, fullscreen: true } : {};
    var v_pinned_els = {}; // nombre → elemento anclado (pendiente de mover a la zona fija)

    // Herramientas dependientes de selección: en modo 'floating' NO se pintan en la
    // toolbar (van al menú flotante); en modo 'toolbar' se pintan y se recogen aquí
    // para habilitarlas/deshabilitarlas según la selección (_updateSelectionTools).
    var v_selection_mode = this._selectionToolsMode;
    this._selectionToolEls = [];
    // Botones de formato con estado activo (bold/italic/underline/strikethrough):
    // los rellena _buildFormatButton durante el bucle; _updateFormatButtonStates
    // les pone/quita la clase `active` según queryCommandState.
    this._formatStateButtons = [];
    // Botones de acciones CUSTOM con estado dinámico (requiresSelection /
    // isEnabled / isActive): los rellena _buildCustomActionButton;
    // _updateCustomActionStates los reevalúa en foco/selección.
    this._customStateButtons = [];

    // Construir la toolbar declarativamente desde la opción `toolbar`.
    // Filas → grupos (separados por `|`) → ítems. Cada nombre lo construye
    // _buildToolbarItem(); los grupos vacíos (p. ej. inserción desactivada) se omiten.
    var v_rows = this._normalizeToolbarSpec(this.options.toolbar);
    // Insertar las acciones CUSTOM (placement toolbar|both) según su `position`
    // (ancla relativa, grupo propio, start/end). Si el nombre ya viene en el
    // string `toolbar`, manda el string.
    this._insertCustomActionsIntoRows(v_rows, 'toolbar');
    for (var r = 0; r < v_rows.length; r++) {
      if (r > 0 && !scrollMode) {
        // Salto de fila (solo en modo wrap; en scroll todo va en una sola fila).
        var v_break = document.createElement('div');
        v_break.className = 'mewyse-toolbar-row-break';
        host.appendChild(v_break);
      }
      var v_groups = v_rows[r];
      var v_first_in_row = true;
      for (var gi = 0; gi < v_groups.length; gi++) {
        var v_group_el = document.createElement('div');
        v_group_el.className = 'mewyse-toolbar-group';
        var v_names = v_groups[gi];
        for (var ni = 0; ni < v_names.length; ni++) {
          var v_name = v_names[ni];
          // Acción desactivada por `disabledActions`: no se pinta.
          if (this._disabledActions[v_name]) continue;
          // Herramienta de selección en modo 'floating': se omite de la toolbar
          // (vive en el menú flotante de formato).
          if (SELECTION_TOOL_NAMES[v_name] && v_selection_mode === 'floating') continue;
          var v_item_el = this._buildToolbarItem(v_name);
          if (!v_item_el) continue;
          // Ítem anclado: se reserva para la zona fija en vez de ir al track.
          if (v_pin_set[v_name]) { v_pinned_els[v_name] = v_item_el; continue; }
          // Override de una acción estándar con `icon`/`tooltip` propios: se
          // repintan sobre el botón ya construido (su onclick ya pasa por
          // _runAction). No aplica a compuestos (stepper `fontsize`, `blocktype`).
          this._applyOverrideAppearance(v_name, v_item_el);
          // Herramienta de selección en modo 'toolbar': se recoge para gestionar
          // su estado disabled según la selección.
          if (SELECTION_TOOL_NAMES[v_name] && v_selection_mode === 'toolbar') {
            this._selectionToolEls.push(v_item_el);
          }
          v_group_el.appendChild(v_item_el);
        }
        if (v_group_el.children.length > 0) {
          if (!v_first_in_row) {
            var v_sep = document.createElement('div');
            v_sep.className = 'mewyse-toolbar-separator';
            host.appendChild(v_sep);
          }
          host.appendChild(v_group_el);
          v_first_in_row = false;
        }
      }
    }

    // Cablear el scroll/overflow (modo scroll): flechas prev/next y gradientes.
    // Los ítems normales van en el track scrollable; los anclados, en la zona fija.
    if (scrollMode) {
      // Zona fija a la derecha: clúster compacto con los ítems anclados presentes,
      // en orden canónico. Se añade DESPUÉS de scrollArea → queda a la derecha de
      // la flecha de scroll, siempre visible.
      var v_pin_order = ['moveup', 'movedown', 'fullscreen'];
      var v_fixed_end = null;
      for (var pk = 0; pk < v_pin_order.length; pk++) {
        var v_pin_el = v_pinned_els[v_pin_order[pk]];
        if (!v_pin_el) continue;
        if (!v_fixed_end) {
          v_fixed_end = document.createElement('div');
          v_fixed_end.className = 'mewyse-toolbar-fixed-end';
        }
        v_fixed_end.appendChild(v_pin_el);
      }
      if (v_fixed_end) toolbar.appendChild(v_fixed_end);

      this._toolbarScroll = { area: scrollArea, track: scrollTrack, prev: scrollPrev, next: scrollNext };
      this._setupToolbarScroll();
    }

    // Accesibilidad: los botones icon-only solo tienen `title`. Copiar el title
    // a `aria-label` (si no lo tienen ya) para los lectores de pantalla. Barrido
    // único en vez de repetirlo en cada botón.
    var v_btns = toolbar.querySelectorAll('button');
    for (var vb = 0; vb < v_btns.length; vb++) {
      var v_b = v_btns[vb];
      if (!v_b.getAttribute('aria-label') && v_b.getAttribute('title')) {
        v_b.setAttribute('aria-label', v_b.getAttribute('title'));
      }
    }

    // Tooltips propios (sustituyen al tooltip nativo del navegador) por
    // delegación sobre la toolbar.
    this._attachTooltips(toolbar);

    // Estado inicial de las herramientas de selección (modo 'toolbar'): sin
    // selección al cargar → deshabilitadas.
    this._updateSelectionTools();
    // Estado activo inicial de los botones de formato (sin foco → inactivos).
    this._updateFormatButtonStates();
    // Estado inicial de las acciones custom con estado dinámico.
    this._updateCustomActionStates();

    return toolbar;
  };

  /**
   * Refleja el ESTADO ACTIVO (clase `active` → fondo resaltado) de los botones de
   * formato de la toolbar (bold/italic/underline/strikethrough) según el formato
   * del caret/selección, vía `document.queryCommandState`. Se llama en cada cambio
   * de selección/caret y tras pulsar un botón. Si el foco no está dentro del
   * editor, todos quedan inactivos (queryCommandState se refiere al editable
   * enfocado).
   */
  meWYSE.prototype._updateFormatButtonStates = function() {
    if (!this._formatStateButtons || !this._formatStateButtons.length) return;
    var v_focused = this.container && this.container.contains(document.activeElement);
    for (var i = 0; i < this._formatStateButtons.length; i++) {
      var v_it = this._formatStateButtons[i];
      var v_on = false;
      if (v_focused) {
        try { v_on = document.queryCommandState(v_it.command); } catch (e) { v_on = false; }
      }
      v_it.el.classList.toggle('active', v_on);
    }
  };

  /**
   * Habilita/deshabilita las herramientas de selección de la toolbar según haya
   * o no una selección de texto NO colapsada dentro del editor. Solo aplica en
   * modo `selectionTools: 'toolbar'` (en 'floating' esos ítems no están en la
   * toolbar). Deshabilita tanto el propio botón como los `<button>` internos
   * (p. ej. los pasos [−]/[+] del stepper de tamaño de fuente).
   */
  meWYSE.prototype._updateSelectionTools = function() {
    if (this._selectionToolsMode !== 'toolbar') return;
    if (!this._selectionToolEls || !this._selectionToolEls.length) return;
    var v_enabled = this._hasUsableSelection();
    for (var i = 0; i < this._selectionToolEls.length; i++) {
      var v_el = this._selectionToolEls[i];
      if (!v_el) continue;
      if (v_el.tagName === 'BUTTON') v_el.disabled = !v_enabled;
      var v_inner = v_el.querySelectorAll ? v_el.querySelectorAll('button') : [];
      for (var j = 0; j < v_inner.length; j++) v_inner[j].disabled = !v_enabled;
      // Clase para atenuar contenedores que no son <button> (p. ej. el stepper).
      if (v_el.classList) v_el.classList.toggle('mewyse-tool-disabled', !v_enabled);
    }
  };

  /**
   * ¿Hay una selección de texto NO colapsada dentro del editor? Base para
   * habilitar las herramientas de selección (mismo criterio que el menú flotante).
   * @returns {boolean}
   */
  meWYSE.prototype._hasUsableSelection = function() {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed || sel.toString().trim() === '') return false;
    var range = sel.getRangeAt(0);
    var node = range.commonAncestorContainer;
    if (node && node.nodeType === 3) node = node.parentNode;
    while (node) {
      if (node === this.container) return true;
      node = node.parentNode;
    }
    return false;
  };

  /**
   * Cambia el tipo del bloque actual (donde está el cursor)
   */
  meWYSE.prototype.changeCurrentBlockType = function(type) {
    var activeElement = document.activeElement;
    var blockElement = activeElement;

    // Buscar el bloque que contiene el elemento activo
    while (blockElement && !blockElement.hasAttribute('data-block-id')) {
      blockElement = blockElement.parentElement;
    }

    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));
      this.changeBlockType(blockId, type);
    }
  };

  /**
   * Inserta un nuevo bloque de tipo tabla
   */
  meWYSE.prototype.insertTableBlock = function() {
    var activeElement = document.activeElement;
    var blockElement = activeElement;

    // Buscar el bloque que contiene el elemento activo
    while (blockElement && !blockElement.hasAttribute('data-block-id')) {
      blockElement = blockElement.parentElement;
    }

    var insertIndex = this.blocks.length; // Por defecto al final

    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));
      insertIndex = this.getBlockIndex(blockId) + 1;
    }

    // Añadir el nuevo bloque de tabla
    this.addBlock('table', insertIndex);
  };

  /**
   * Inserta un bloque de salto de página tras el bloque con foco (o al final).
   */
  meWYSE.prototype.insertPageBreak = function() {
    var v_active = this.lastFocusedElement || document.activeElement;
    var v_blockEl = v_active;
    while (v_blockEl && (!v_blockEl.hasAttribute || !v_blockEl.hasAttribute('data-block-id'))) {
      v_blockEl = v_blockEl.parentElement;
    }
    var v_index = this.blocks.length;
    if (v_blockEl && v_blockEl.hasAttribute && v_blockEl.hasAttribute('data-block-id')) {
      var v_id = parseInt(v_blockEl.getAttribute('data-block-id'), 10);
      if (!isNaN(v_id)) v_index = this.getBlockIndex(v_id) + 1;
    }
    this.addBlock('pageBreak', v_index);
  };

  /**
   * Inserta un nuevo bloque de tipo imagen
   */
  meWYSE.prototype.insertImageBlock = function() {
    var self = this;

    // Usar el último elemento enfocado que guardamos antes de hacer clic en el botón
    var activeElem = this.lastFocusedElement || document.activeElement;
    var tableCellElement = null;
    var lastFocusedBlock = null;

    // Primero, verificar si el elemento enfocado está dentro de una celda de tabla
    var parent = activeElem;
    while (parent && parent !== document.body) {
      if (parent.tagName === 'TD' || parent.tagName === 'TH') {
        tableCellElement = parent;
        break;
      }
      parent = parent.parentElement;
    }

    // Si no encontramos celda, verificar si el elemento enfocado es un bloque o está dentro de uno
    if (!tableCellElement && activeElem) {
      // Verificar si es un bloque
      if (activeElem.hasAttribute('data-block-id')) {
        lastFocusedBlock = activeElem;
      } else {
        // Buscar el bloque padre más cercano
        var blockParent = activeElem;
        while (blockParent && blockParent !== document.body) {
          if (blockParent.hasAttribute('data-block-id')) {
            lastFocusedBlock = blockParent;
            break;
          }
          blockParent = blockParent.parentElement;
        }
      }
    }

    // Si aún no encontramos ningún bloque, usar el último bloque del editor
    if (!tableCellElement && !lastFocusedBlock) {
      var allBlocks = this.container.querySelectorAll('[data-block-id]');
      if (allBlocks.length > 0) {
        lastFocusedBlock = allBlocks[allBlocks.length - 1];
      }
    }

    // Calcular insertIndex para el caso fuera de tabla. Si el bloque enfocado
    // está VACÍO, marcarlo para que la imagen lo reemplace (no dejar el vacío).
    var insertIndex;
    var replaceBlockId = null;
    if (lastFocusedBlock) {
      var blockId = parseInt(lastFocusedBlock.getAttribute('data-block-id'));
      insertIndex = this.getBlockIndex(blockId) + 1;
      var v_fb = this.getBlock(blockId);
      if (v_fb && typeof v_fb.content === 'string' && v_fb.content.trim() === '' && v_fb.type !== 'divider') {
        replaceBlockId = blockId;
      }
    } else {
      insertIndex = this.blocks.length;
    }

    // Usar el file input persistente (se crea lazy en _getFileInput).
    // Evita acumular inputs colgantes en el DOM y mejora fiabilidad del picker.
    var fileInput = this._getFileInput();

    // Asignar el handler al input antes de dispararlo
    fileInput.onchange = function() {
      var file = fileInput.files && fileInput.files[0];
      // Reset inmediato del valor para que el próximo click re-dispare change
      // aunque el usuario elija el mismo archivo
      fileInput.value = '';
      if (!file || !/^image\//.test(file.type)) return;
      if (!self._validateImageSize(file)) return;

      if (tableCellElement) {
        self.insertImageInTableCell(file, tableCellElement);
      } else {
        self.showImageDimensionsModal(file, insertIndex, replaceBlockId);
      }
    };

    // Disparar el file picker
    fileInput.click();
  };

  /**
   * Devuelve el input file persistente del editor (lazy). Se reusa entre clicks
   * para evitar acumulación en el DOM y problemas de compatibilidad con display:none.
   */
  meWYSE.prototype._getFileInput = function() {
    if (this._fileInput && this._fileInput.parentNode) return this._fileInput;
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    // Posicionar fuera de la pantalla (más robusto que display:none en algunos navegadores)
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    input.style.top = '-9999px';
    input.style.opacity = '0';
    input.setAttribute('aria-hidden', 'true');
    input.setAttribute('tabindex', '-1');
    document.body.appendChild(input);
    this._fileInput = input;
    return input;
  };

  /**
   * Inserta una imagen dentro de una celda de tabla
   */
  meWYSE.prototype.insertImageInTableCell = function(file, tableCell) {
    var self = this;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';
    self._applyMenuTheme(modalContainer); // dark mode si el editor está en oscuro

    // Modal title
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.configureImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Leer imagen para obtener dimensiones originales
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var originalWidth = img.width;
        var originalHeight = img.height;
        var aspectRatio = originalWidth / originalHeight;

        // Vista previa
        var previewContainer = document.createElement('div');
        previewContainer.className = 'mewyse-modal-preview';
        var previewImg = document.createElement('img');
        previewImg.src = e.target.result;
        previewImg.style.maxWidth = '100%';
        previewImg.style.maxHeight = '200px';
        previewContainer.appendChild(previewImg);
        modalContainer.appendChild(previewContainer);

        // Información del archivo
        var fileInfo = document.createElement('p');
        fileInfo.className = 'mewyse-modal-info';
        fileInfo.textContent = self.t('modals.originalDimensions', { width: originalWidth, height: originalHeight });
        modalContainer.appendChild(fileInfo);

        // Inputs de ancho/alto
        var inputsContainer = document.createElement('div');
        inputsContainer.className = 'mewyse-modal-inputs';

        var widthGroup = document.createElement('div');
        widthGroup.className = 'mewyse-modal-input-group';
        var widthLabel = document.createElement('label');
        widthLabel.textContent = self.t('modals.width');
        var widthInput = document.createElement('input');
        widthInput.type = 'number';
        widthInput.value = originalWidth;
        widthInput.min = '1';
        widthInput.className = 'mewyse-modal-input';
        widthGroup.appendChild(widthLabel);
        widthGroup.appendChild(widthInput);
        inputsContainer.appendChild(widthGroup);

        var heightGroup = document.createElement('div');
        heightGroup.className = 'mewyse-modal-input-group';
        var heightLabel = document.createElement('label');
        heightLabel.textContent = self.t('modals.height');
        var heightInput = document.createElement('input');
        heightInput.type = 'number';
        heightInput.value = originalHeight;
        heightInput.min = '1';
        heightInput.className = 'mewyse-modal-input';
        heightGroup.appendChild(heightLabel);
        heightGroup.appendChild(heightInput);
        inputsContainer.appendChild(heightGroup);

        modalContainer.appendChild(inputsContainer);

        // Checkbox mantener proporciones
        var proportionsContainer = document.createElement('div');
        proportionsContainer.className = 'mewyse-modal-checkbox-group';
        var proportionsCheckbox = document.createElement('input');
        proportionsCheckbox.type = 'checkbox';
        proportionsCheckbox.checked = true;
        proportionsCheckbox.id = 'mewyse-maintain-proportions-table';
        var proportionsLabel = document.createElement('label');
        proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions-table');
        proportionsLabel.textContent = self.t('modals.keepProportions');
        proportionsContainer.appendChild(proportionsCheckbox);
        proportionsContainer.appendChild(proportionsLabel);
        modalContainer.appendChild(proportionsContainer);

        // Event listeners para mantener proporciones
        widthInput.oninput = function() {
          if (proportionsCheckbox.checked) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
          }
        };

        heightInput.oninput = function() {
          if (proportionsCheckbox.checked) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
          }
        };

        // Botones
        var buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'mewyse-modal-buttons';

        var cancelButton = document.createElement('button');
        cancelButton.textContent = self.t('modals.cancel');
        cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
        cancelButton.onclick = function() {
          document.body.removeChild(modalOverlay);
        };

        var insertButton = document.createElement('button');
        insertButton.textContent = self.t('modals.insert');
        insertButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
        insertButton.onclick = function() {
          var width = parseInt(widthInput.value);
          var height = parseInt(heightInput.value);

          // Limpiar contenido previo de la celda
          tableCell.innerHTML = '';

          // Crear wrapper de imagen
          var imageWrapper = document.createElement('div');
          imageWrapper.className = 'mewyse-image-wrapper';

          // Crear contenedor de imagen (para controles)
          var imageContainer = document.createElement('div');
          imageContainer.className = 'mewyse-image-container';

          // Crear elemento de imagen
          var imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.alt = file.name;
          imgElement.className = 'mewyse-image';
          imgElement.style.width = width + 'px';
          imgElement.style.height = height + 'px';
          imgElement.setAttribute('data-original-width', originalWidth);
          imgElement.setAttribute('data-original-height', originalHeight);

          // Añadir imagen al contenedor
          imageContainer.appendChild(imgElement);

          // Crear botón de edición
          var editButton = document.createElement('button');
          editButton.className = 'mewyse-image-edit-btn';
          editButton.innerHTML = WYSIWYG_ICONS.gear;
          editButton.title = self.t('tooltips.editDimensions');
          editButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            self.editImageInTableCell(imgElement, tableCell);
          };
          imageContainer.appendChild(editButton);

          // Ratio fijo de la imagen de la celda (calculado al insertar).
          var cellAspectRatio = width / height;

          // Crea un handle de redimensionado para una esquina. v_sign invierte el
          // sentido: +1 en la esquina inferior-derecha, -1 en la superior-izquierda
          // (arrastrar hacia fuera agranda en ambas).
          var v_make_cell_resize_handle = function(v_corner_class, v_sign) {
            var handle = document.createElement('div');
            handle.className = 'mewyse-image-resize-handle ' + v_corner_class;
            handle.title = self.t('tooltips.dragToResize');

            var isResizing = false;
            var startX, startY, startWidth;

            var mouseMoveHandler = function(e) {
              if (!isResizing) return;

              var deltaX = e.clientX - startX;
              var deltaY = e.clientY - startY;
              var delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

              var newWidth = startWidth + v_sign * delta;
              var newHeight = Math.round(newWidth / cellAspectRatio);

              if (newWidth < 50) {
                newWidth = 50;
                newHeight = Math.round(newWidth / cellAspectRatio);
              }

              imgElement.style.width = newWidth + 'px';
              imgElement.style.height = newHeight + 'px';
            };

            var mouseUpHandler = function(e) {
              if (!isResizing) return;

              isResizing = false;
              document.body.style.cursor = '';
              imageContainer.classList.remove('mewyse-image-resizing');
              document.body.style.userSelect = '';

              // Remover event listeners
              document.removeEventListener('mousemove', mouseMoveHandler);
              document.removeEventListener('mouseup', mouseUpHandler);

              // Actualizar el contenido de la tabla
              var tableElement = tableCell.closest('table');
              if (tableElement) {
                var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
                if (tableWrapper) {
                  var blockElement = tableWrapper.closest('[data-block-id]');
                  if (blockElement) {
                    var blockId = parseInt(blockElement.getAttribute('data-block-id'));
                    self.updateBlockContent(blockId, tableElement.innerHTML);
                  }
                }
              }

              self.triggerChange();
              // Tras redimensionar, dejar la imagen de la celda seleccionada/enfocada
              self.selectImage(imgElement, null, true, tableCell);
            };

            handle.onmousedown = function(e) {
              e.preventDefault();
              e.stopPropagation();

              isResizing = true;
              startX = e.clientX;
              startY = e.clientY;
              startWidth = parseInt(imgElement.style.width);

              document.body.style.cursor = 'nwse-resize';
              imageContainer.classList.add('mewyse-image-resizing');
              document.body.style.userSelect = 'none';

              // Registrar los listeners SOLO durante el arrastre (se quitan en
              // mouseUpHandler): así el resize funciona en CADA uso, no solo el
              // primero, y no quedan listeners colgando en document tras insertar.
              document.addEventListener('mousemove', mouseMoveHandler);
              document.addEventListener('mouseup', mouseUpHandler);
            };

            return handle;
          };

          // Handle inferior-derecho (existente) + superior-izquierdo (nuevo).
          imageContainer.appendChild(v_make_cell_resize_handle('mewyse-image-resize-handle-se', 1));
          imageContainer.appendChild(v_make_cell_resize_handle('mewyse-image-resize-handle-nw', -1));

          // Añadir contenedor al wrapper
          imageWrapper.appendChild(imageContainer);

          // Hacer la imagen seleccionable y eliminable
          imgElement.onclick = function(e) {
            e.stopPropagation();
            self.selectImage(imgElement, null, true, tableCell);
          };

          // Marcar la imagen como dentro de tabla
          imgElement.setAttribute('data-in-table', 'true');
          imgElement.setAttribute('tabindex', '0'); // Permitir foco con teclado

          // Habilitar drag & drop para mover entre celdas/bloques
          self._attachImageDragHandlers(imgElement, { source: 'cell', tableCell: tableCell });

          // Insertar el wrapper en la celda
          tableCell.appendChild(imageWrapper);

          // Encontrar el elemento table y actualizar el bloque
          var tableElement = tableCell.closest('table');
          if (tableElement) {
            // Buscar el bloque de la tabla
            var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
            if (tableWrapper) {
              var blockElement = tableWrapper.closest('[data-block-id]');
              if (blockElement) {
                var blockId = parseInt(blockElement.getAttribute('data-block-id'));
                // Actualizar el contenido del bloque con el HTML de la tabla
                self.updateBlockContent(blockId, tableElement.innerHTML);
              }
            }
          }

          // Cerrar modal
          document.body.removeChild(modalOverlay);

          // Trigger change
          self.triggerChange();
        };

        buttonsContainer.appendChild(cancelButton);
        buttonsContainer.appendChild(insertButton);
        modalContainer.appendChild(buttonsContainer);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer clic en el overlay
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  /**
   * Editar dimensiones de una imagen existente en una celda de tabla
   */
  meWYSE.prototype.editImageInTableCell = function(imgElement, tableCell) {
    var self = this;

    // Obtener dimensiones actuales
    var currentWidth = parseInt(imgElement.style.width) || imgElement.width;
    var currentHeight = parseInt(imgElement.style.height) || imgElement.height;
    var originalWidth = parseInt(imgElement.getAttribute('data-original-width')) || currentWidth;
    var originalHeight = parseInt(imgElement.getAttribute('data-original-height')) || currentHeight;
    var aspectRatio = originalWidth / originalHeight;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';
    self._applyMenuTheme(modalContainer); // dark mode si el editor está en oscuro

    // Modal title
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.editImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Vista previa
    var previewContainer = document.createElement('div');
    previewContainer.className = 'mewyse-modal-preview';
    var previewImg = document.createElement('img');
    previewImg.src = imgElement.src;
    previewImg.style.maxWidth = '100%';
    previewImg.style.maxHeight = '200px';
    previewContainer.appendChild(previewImg);
    modalContainer.appendChild(previewContainer);

    // Información del archivo
    var fileInfo = document.createElement('p');
    fileInfo.className = 'mewyse-modal-info';
    fileInfo.textContent = self.t('modals.originalDimensions', { width: originalWidth, height: originalHeight });
    modalContainer.appendChild(fileInfo);

    // Inputs de ancho/alto
    var inputsContainer = document.createElement('div');
    inputsContainer.className = 'mewyse-modal-inputs';

    var widthGroup = document.createElement('div');
    widthGroup.className = 'mewyse-modal-input-group';
    var widthLabel = document.createElement('label');
    widthLabel.textContent = self.t('modals.width');
    var widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.value = currentWidth;
    widthInput.min = '1';
    widthInput.className = 'mewyse-modal-input';
    widthGroup.appendChild(widthLabel);
    widthGroup.appendChild(widthInput);
    inputsContainer.appendChild(widthGroup);

    var heightGroup = document.createElement('div');
    heightGroup.className = 'mewyse-modal-input-group';
    var heightLabel = document.createElement('label');
    heightLabel.textContent = self.t('modals.height');
    var heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.value = currentHeight;
    heightInput.min = '1';
    heightInput.className = 'mewyse-modal-input';
    heightGroup.appendChild(heightLabel);
    heightGroup.appendChild(heightInput);
    inputsContainer.appendChild(heightGroup);

    modalContainer.appendChild(inputsContainer);

    // Checkbox mantener proporciones
    var proportionsContainer = document.createElement('div');
    proportionsContainer.className = 'mewyse-modal-checkbox-group';
    var proportionsCheckbox = document.createElement('input');
    proportionsCheckbox.type = 'checkbox';
    proportionsCheckbox.checked = true;
    proportionsCheckbox.id = 'mewyse-maintain-proportions-edit-table';
    var proportionsLabel = document.createElement('label');
    proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions-edit-table');
    proportionsLabel.textContent = self.t('modals.keepProportions');
    proportionsContainer.appendChild(proportionsCheckbox);
    proportionsContainer.appendChild(proportionsLabel);
    modalContainer.appendChild(proportionsContainer);

    // Event listeners para mantener proporciones
    widthInput.oninput = function() {
      if (proportionsCheckbox.checked) {
        heightInput.value = Math.round(widthInput.value / aspectRatio);
      }
    };

    heightInput.oninput = function() {
      if (proportionsCheckbox.checked) {
        widthInput.value = Math.round(heightInput.value * aspectRatio);
      }
    };

    // Botones
    var buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'mewyse-modal-buttons';

    var cancelButton = document.createElement('button');
    cancelButton.textContent = self.t('modals.cancel');
    cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelButton.onclick = function() {
      document.body.removeChild(modalOverlay);
    };

    var saveButton = document.createElement('button');
    saveButton.textContent = self.t('modals.save');
    saveButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
    saveButton.onclick = function() {
      var width = parseInt(widthInput.value);
      var height = parseInt(heightInput.value);

      // Actualizar dimensiones de la imagen
      imgElement.style.width = width + 'px';
      imgElement.style.height = height + 'px';

      // Encontrar el elemento table y actualizar el bloque
      var tableElement = tableCell.closest('table');
      if (tableElement) {
        var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
        if (tableWrapper) {
          var blockElement = tableWrapper.closest('[data-block-id]');
          if (blockElement) {
            var blockId = parseInt(blockElement.getAttribute('data-block-id'));
            self.updateBlockContent(blockId, tableElement.innerHTML);
          }
        }
      }

      // Cerrar modal
      document.body.removeChild(modalOverlay);

      // Trigger change
      self.triggerChange();
    };

    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(saveButton);
    modalContainer.appendChild(buttonsContainer);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer clic en el overlay
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  /**
   * Selecciona una imagen y la marca visualmente como seleccionada
   */
  /**
   * Habilita drag & drop en una imagen del editor (celda o bloque independiente).
   * Permite mover la imagen a otra celda o entre celda y bloque.
   *
   * @param {HTMLImageElement} img
   * @param {Object} meta - { source: 'cell'|'block', blockId?, tableCell? }
   */
  meWYSE.prototype._attachImageDragHandlers = function(img, meta) {
    var self = this;
    img.setAttribute('draggable', 'true');

    img.addEventListener('dragstart', function(e) {
      // Capturar estado de la imagen al inicio del drag
      var imageSnapshot = {
        src: img.src,
        width: parseInt(img.style.width || img.getAttribute('width'), 10) || parseInt(img.getAttribute('data-original-width'), 10) || 300,
        height: parseInt(img.style.height || img.getAttribute('height'), 10) || parseInt(img.getAttribute('data-original-height'), 10) || 200,
        alt: img.getAttribute('alt') || 'image',
        inlineStyle: img.getAttribute('style') || ''
      };

      self._draggedImage = {
        img: img,
        source: meta.source,
        blockId: meta.blockId || null,
        tableCell: meta.tableCell || null,
        snapshot: imageSnapshot
      };

      // Marcar visualmente la imagen como siendo arrastrada
      img.classList.add('mewyse-image-dragging');

      // Usar un tipo custom para distinguir de files OS; el valor es irrelevante
      try {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/x-mewyse-image', '1');
        // Algunos navegadores (Firefox) requieren setData('text/plain') también
        e.dataTransfer.setData('text/plain', 'mewyse-image');
      } catch (err) {}
    });

    img.addEventListener('dragend', function() {
      img.classList.remove('mewyse-image-dragging');
      // Limpiar el estado tras un pequeño delay para que los drop handlers
      // puedan leerlo primero
      setTimeout(function() {
        self._draggedImage = null;
        // Quitar cualquier marcador visual de drop-target restante
        var targets = document.querySelectorAll('.mewyse-image-drop-target-cell');
        for (var i = 0; i < targets.length; i++) {
          targets[i].classList.remove('mewyse-image-drop-target-cell');
        }
      }, 50);
    });
  };

  /**
   * Procesa el drop de una imagen arrastrada en una celda de tabla.
   * Mueve la imagen: elimina del origen (celda o bloque) y la inserta en la celda destino.
   */
  meWYSE.prototype._dropImageIntoCell = function(destCell, destBlockId) {
    var drag = this._draggedImage;
    if (!drag) return;

    // No hacer nada si se suelta en la misma celda de origen
    if (drag.source === 'cell' && drag.tableCell === destCell) return;

    this.pushHistory(true);

    var snapshot = drag.snapshot;

    // 1. Eliminar del origen
    if (drag.source === 'cell' && drag.tableCell) {
      // Limpiar la celda origen (dejar <p contenteditable> vacío)
      drag.tableCell.innerHTML = '';
      var emptyP = document.createElement('p');
      emptyP.contentEditable = true;
      emptyP.setAttribute('data-placeholder', '');
      drag.tableCell.appendChild(emptyP);
      this.attachTableCellEvents(emptyP, this._getBlockIdForCell(drag.tableCell));

      // Update del bloque origen
      var srcTable = drag.tableCell.closest('table');
      if (srcTable) {
        var srcBlockId = this._getBlockIdForCell(drag.tableCell);
        if (srcBlockId != null) {
          this.updateBlockContent(srcBlockId, srcTable.innerHTML);
        }
      }
    } else if (drag.source === 'block' && drag.blockId != null) {
      // Eliminar el bloque imagen independiente del modelo
      var blockIdx = this.getBlockIndex(drag.blockId);
      if (blockIdx !== -1) {
        this.blocks.splice(blockIdx, 1);
      }
    }

    // 2. Insertar en la celda destino (reusando la estructura de imagen en celda)
    this._createImageInCellFromSnapshot(destCell, snapshot);

    // 3. Update del bloque destino
    var destTable = destCell.closest('table');
    if (destTable) {
      var destTableBlockId = this._getBlockIdForCell(destCell);
      if (destTableBlockId != null) {
        this.updateBlockContent(destTableBlockId, destTable.innerHTML);
      }
    }

    // 4. Re-render si eliminamos un bloque (para evitar DOM inconsistente)
    if (drag.source === 'block') {
      this.render();
    }

    this._draggedImage = null;
    this.triggerChange();
  };

  /**
   * Procesa el drop de una imagen arrastrada en un bloque (fuera de celda).
   * Crea un nuevo bloque imagen en la posición del bloque destino y elimina origen.
   */
  meWYSE.prototype._dropImageIntoBlock = function(destBlockElement) {
    var drag = this._draggedImage;
    if (!drag) return;

    // No hacer nada si se suelta en el mismo bloque de origen
    var destBlockId = parseInt(destBlockElement.getAttribute('data-block-id'), 10);
    if (isNaN(destBlockId)) return;
    if (drag.source === 'block' && drag.blockId === destBlockId) return;

    this.pushHistory(true);

    var snapshot = drag.snapshot;

    // 1. Crear nuevo bloque imagen con el snapshot
    var insertIndex = this.getBlockIndex(destBlockId) + 1;
    var newBlock = {
      id: ++this.currentBlockId,
      type: 'image',
      content: {
        blob: snapshot.src,
        fileName: snapshot.alt || 'image',
        width: snapshot.width,
        height: snapshot.height
      }
    };

    // 2. Eliminar del origen
    if (drag.source === 'cell' && drag.tableCell) {
      var sourceCell = drag.tableCell;
      sourceCell.innerHTML = '';
      var emptyP = document.createElement('p');
      emptyP.contentEditable = true;
      emptyP.setAttribute('data-placeholder', '');
      sourceCell.appendChild(emptyP);
      this.attachTableCellEvents(emptyP, this._getBlockIdForCell(sourceCell));

      var srcTable = sourceCell.closest('table');
      if (srcTable) {
        var srcBlockId = this._getBlockIdForCell(sourceCell);
        if (srcBlockId != null) {
          this.updateBlockContent(srcBlockId, srcTable.innerHTML);
        }
      }
    } else if (drag.source === 'block' && drag.blockId != null) {
      var blockIdx = this.getBlockIndex(drag.blockId);
      if (blockIdx !== -1) {
        this.blocks.splice(blockIdx, 1);
        // Ajustar insertIndex si el bloque origen era anterior al destino
        if (blockIdx < insertIndex) insertIndex--;
      }
    }

    // 3. Insertar en modelo
    this.blocks.splice(insertIndex, 0, newBlock);

    // 4. Re-render
    this.render();

    this._draggedImage = null;
    this.triggerChange();
  };

  /**
   * Helper: obtiene el blockId de la tabla que contiene una celda.
   */
  meWYSE.prototype._getBlockIdForCell = function(cell) {
    var tableEl = cell.closest('table');
    if (!tableEl) return null;
    var wrapper = tableEl.closest('.mewyse-table-wrapper');
    if (!wrapper) return null;
    var blockEl = wrapper.closest('[data-block-id]');
    if (!blockEl) return null;
    var id = parseInt(blockEl.getAttribute('data-block-id'), 10);
    return isNaN(id) ? null : id;
  };

  /**
   * Helper: crea la estructura de imagen en una celda a partir de un snapshot.
   * Reusa la lógica de insertImageInTableCell pero sin modal (para drop directo).
   */
  meWYSE.prototype._createImageInCellFromSnapshot = function(tableCell, snapshot) {
    var self = this;

    // Limpiar contenido previo de la celda
    tableCell.innerHTML = '';

    var imageWrapper = document.createElement('div');
    imageWrapper.className = 'mewyse-image-wrapper';
    var imageContainer = document.createElement('div');
    imageContainer.className = 'mewyse-image-container';

    var imgElement = document.createElement('img');
    imgElement.src = snapshot.src;
    imgElement.alt = snapshot.alt || 'image';
    imgElement.className = 'mewyse-image';
    imgElement.style.width = snapshot.width + 'px';
    imgElement.style.height = snapshot.height + 'px';
    imgElement.setAttribute('data-original-width', snapshot.width);
    imgElement.setAttribute('data-original-height', snapshot.height);
    imgElement.setAttribute('data-in-table', 'true');
    imgElement.setAttribute('tabindex', '0');

    imageContainer.appendChild(imgElement);

    // Botón edit
    var editButton = document.createElement('button');
    editButton.className = 'mewyse-image-edit-btn';
    editButton.innerHTML = WYSIWYG_ICONS.gear;
    editButton.title = self.t('tooltips.editDimensions');
    editButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.editImageInTableCell(imgElement, tableCell);
    };
    imageContainer.appendChild(editButton);

    // Click: seleccionar
    imgElement.onclick = function(e) {
      e.stopPropagation();
      self.selectImage(imgElement, null, true, tableCell);
    };

    // Drag handlers
    self._attachImageDragHandlers(imgElement, { source: 'cell', tableCell: tableCell });

    imageWrapper.appendChild(imageContainer);
    tableCell.appendChild(imageWrapper);
  };

  meWYSE.prototype.selectImage = function(imgElement, blockId, isInTable, tableCell) {
    var self = this;

    // Deseleccionar cualquier imagen previamente seleccionada
    var previousSelected = this.container.querySelector('.mewyse-image.selected');
    if (previousSelected) {
      previousSelected.classList.remove('selected');
      previousSelected.style.outline = '';
      previousSelected.style.outlineOffset = '';
    }

    // Seleccionar la nueva imagen. El indicador de selección usa `outline` (no
    // `border`): así NO pisa el borde avanzado del usuario (advanced.border) y
    // funciona igual con o sin contentStyles.
    imgElement.classList.add('selected');
    imgElement.style.outline = '2px solid #4a9eff';
    imgElement.style.outlineOffset = '2px';
    imgElement.focus();

    // Guardar referencia a la imagen seleccionada
    this.selectedImage = {
      element: imgElement,
      blockId: blockId,
      isInTable: isInTable,
      tableCell: tableCell
    };

    // Refrescar el botón de alineación: ahora refleja la alineación de la imagen
    // (la selección de imagen no dispara los eventos de foco de texto de forma
    // fiable, así que se actualiza explícitamente).
    this._updateAlignButton();

    // Mostrar el handle del bloque para imágenes sueltas (las de dentro de una
    // tabla no tienen handle de bloque propio).
    if (!isInTable && blockId != null && this.floatingHandle) {
      var v_imgBlockEl = this.getBlockElementById(blockId);
      if (v_imgBlockEl) this.positionFloatingHandle(v_imgBlockEl, blockId);
    }

    // Añadir event listener para tecla Delete/Backspace/Enter si no existe
    if (!this.imageKeydownHandler) {
      this.imageKeydownHandler = function(e) {
        if (!self.selectedImage) return;
        // Defensa: actuar SOLO si la imagen seleccionada es de verdad el
        // elemento con foco. Sin esto, un selectedImage "colgado" (p. ej.
        // durante la ventana asíncrona en que el foco pasa a un párrafo)
        // haría que este handler global secuestrara Enter/Backspace del texto.
        if (document.activeElement !== self.selectedImage.element) return;

        // Eliminar imagen con Delete o Backspace
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          self.deleteSelectedImage();
        }
        // Deseleccionar al presionar Escape
        else if (e.key === 'Escape') {
          self.deselectImage();
        }
        // Crear nuevo bloque al presionar Enter
        else if (e.key === 'Enter') {
          e.preventDefault();
          self.createBlockAfterImage();
        }
      };
      document.addEventListener('keydown', this.imageKeydownHandler);
    }
  };

  /**
   * Deselecciona la imagen actual
   */
  meWYSE.prototype.deselectImage = function() {
    if (this.selectedImage) {
      this.selectedImage.element.classList.remove('selected');
      this.selectedImage.element.style.outline = '';
      this.selectedImage.element.style.outlineOffset = '';
      var wasStandalone = (!this.selectedImage.isInTable && this.selectedImage.blockId != null);
      this.selectedImage = null;
      // Ocultar el handle si se mostró por la imagen suelta y no hay foco activo
      if (wasStandalone) this.hideFloatingHandle();
      // Reevaluar el botón de alineación (ya no hay imagen seleccionada).
      this._updateAlignButton();
    }
  };

  /**
   * Elimina la imagen seleccionada
   */
  meWYSE.prototype.deleteSelectedImage = function() {
    if (!this.selectedImage) return;

    var self = this;

    // Suprimir el onBlur transitorio: al quitar la imagen (que tenía el foco)
    // el DOM se reconstruye y el foco se reasienta en el bloque vacío.
    this._suppressBlurUntil = Date.now() + 300;

    if (this.selectedImage.isInTable) {
      // Imagen en tabla: eliminar imagen y crear párrafo vacío en la celda
      var tableCell = this.selectedImage.tableCell;

      // Limpiar contenido de la celda
      tableCell.innerHTML = '';

      // Crear párrafo vacío
      var paragraph = document.createElement('p');
      paragraph.contentEditable = true;
      paragraph.style.padding = '8px';
      paragraph.style.margin = '0';
      paragraph.style.minHeight = '1em';
      paragraph.setAttribute('data-placeholder', '');
      tableCell.appendChild(paragraph);

      // Actualizar el bloque de la tabla
      var tableElement = tableCell.closest('table');
      if (tableElement) {
        var tableWrapper = tableElement.closest('.mewyse-table-wrapper');
        if (tableWrapper) {
          var blockElement = tableWrapper.closest('[data-block-id]');
          if (blockElement) {
            var blockId = parseInt(blockElement.getAttribute('data-block-id'));
            this.updateBlockContent(blockId, tableElement.innerHTML);

            // Añadir eventos a la nueva celda
            this.attachTableCellEvents(paragraph, blockId);
          }
        }
      }

      // Enfocar el nuevo párrafo
      paragraph.focus();
    } else {
      // Imagen en bloque suelto: convertir el bloque en un párrafo vacío en su
      // sitio y dejar el foco dentro (en vez de eliminar el bloque), para que el
      // usuario pueda seguir escribiendo y no salte un onBlur.
      var v_blockId = this.selectedImage.blockId;
      var v_block = this.getBlock(v_blockId);
      if (v_block) {
        this.pushHistory(true);
        v_block.type = 'paragraph';
        v_block.content = '';
        if (v_block.checked != null) delete v_block.checked;
        if (v_block.alignment != null) delete v_block.alignment;
        this.render(v_blockId);
        var v_el = this.getBlockElementById(v_blockId);
        var v_editable = this.getEditableElement(v_el);
        if (v_editable) v_editable.focus();
      }
    }

    // Limpiar selección
    this.selectedImage = null;

    // Trigger change
    this.triggerChange();
  };

  /**
   * Crea un nuevo bloque después de la imagen seleccionada
   */
  meWYSE.prototype.createBlockAfterImage = function() {
    if (!this.selectedImage) return;

    if (this.selectedImage.isInTable) {
      // Si la imagen está en una tabla, no crear nuevo bloque
      // Solo deseleccionar la imagen
      this.deselectImage();
      return;
    }

    // Imagen en bloque: crear nuevo bloque después del bloque de la imagen
    var blockId = this.selectedImage.blockId;
    var blockIndex = this.getBlockIndex(blockId);

    if (blockIndex !== -1) {
      // Crear nuevo bloque de párrafo después de la imagen
      this.addBlock('paragraph', blockIndex + 1);

      // Deseleccionar la imagen
      this.deselectImage();

      // Enfocar el nuevo bloque
      var self = this;
      setTimeout(function() {
        var newBlock = self.blocks[blockIndex + 1];
        if (newBlock) {
          var blockElement = self.container.querySelector('[data-block-id="' + newBlock.id + '"]');
          if (blockElement) {
            var contentEditable = blockElement.querySelector('[contenteditable="true"]');
            if (contentEditable) {
              contentEditable.focus();
            }
          }
        }
      }, 50);
    }
  };

  /**
   * Calcula los niveles de indentación EFECTIVOS de un grupo de lista (bloques
   * consecutivos del mismo tipo desde startIndex). Normaliza para que:
   *   - el primer ítem del grupo sea siempre nivel 0 (no tiene padre), y
   *   - ningún ítem salte más de un nivel respecto al anterior
   *     (nivel efectivo = min(indentLevel, nivelAnterior + 1)).
   * Así el render y el export nunca ven saltos (que producen HTML inválido tipo
   * `<ul><ul>`) aunque el modelo los tenga (p. ej. tras borrar un ítem padre).
   *
   * @param {Array} blocks - array de bloques
   * @param {number} startIndex - índice del primer bloque de la lista
   * @returns {Array<number>} niveles efectivos (índice relativo a startIndex)
   */
  meWYSE.prototype._normalizeListLevels = function(blocks, startIndex) {
    var type = blocks[startIndex].type;
    var levels = [];
    var prevEff = -1; // -1 fuerza a 0 el primer ítem
    for (var i = startIndex; i < blocks.length && blocks[i].type === type; i++) {
      var raw = blocks[i].indentLevel || 0;
      if (raw < 0) raw = 0;
      var eff = (prevEff < 0) ? 0 : Math.min(raw, prevEff + 1);
      levels.push(eff);
      prevEff = eff;
    }
    return levels;
  };

  /**
   * Construye el HTML anidado de una lista consecutiva del mismo tipo.
   * Se usa desde getHTML y getHTMLSource.
   *
   * @param {Array} blocks - array de bloques filtrados
   * @param {number} startIndex - índice del primer bloque de la lista
   * @param {Function} classAttrFn - función que devuelve ' class="..."' por bloque
   * @returns {Object} { html, consumed }
   */
  meWYSE.prototype._buildNestedListHTML = function(blocks, startIndex, classAttrFn, inlineFn) {
    var startType = blocks[startIndex].type;
    var tag = startType === 'numberList' ? 'ol' : 'ul';
    var listClass = startType === 'checklist' ? ' class="checklist"' : '';
    // inlineFn es el transformer de contenido inline (ej. escape de entities).
    // Si no se pasa, identidad — preserva el comportamiento clásico.
    var inline = typeof inlineFn === 'function' ? inlineFn : function(c) { return c; };

    var renderLi = function(block) {
      var content = inline(block.content || '');
      var classStr = classAttrFn(block);
      if (startType === 'checklist') {
        var checked = block.checked ? ' checked' : '';
        return '<li' + classStr + '><input type="checkbox"' + checked + ' disabled> ' + content;
      }
      return '<li' + classStr + '>' + content;
    };

    // Niveles EFECTIVOS normalizados (sin saltos, primero = 0): garantiza HTML
    // válido y que coincida con el render del DOM.
    var effLevels = this._normalizeListLevels(blocks, startIndex);

    // Stack basado en niveles. Emite HTML progresivamente.
    var html = '<' + tag + listClass + '>';
    var stack = [{ level: effLevels[0] || 0, openLi: false }];
    var i = startIndex;

    while (i < blocks.length && blocks[i].type === startType) {
      var level = effLevels[i - startIndex];

      // Si subimos de nivel: abrir listas anidadas dentro del último <li>
      while (level > stack[stack.length - 1].level) {
        // Para que el nested <ul> esté DENTRO del <li>, el anterior <li> no debe tener </li> aún
        html += '<' + tag + listClass + '>';
        stack.push({ level: stack[stack.length - 1].level + 1, openLi: false });
      }

      // Si bajamos de nivel: cerrar listas
      while (level < stack[stack.length - 1].level) {
        if (stack[stack.length - 1].openLi) html += '</li>';
        html += '</' + tag + '>';
        stack.pop();
        // Cerrar el <li> del padre al que volvemos (había quedado abierto para el nested)
        if (stack.length > 0 && stack[stack.length - 1].openLi) {
          html += '</li>';
          stack[stack.length - 1].openLi = false;
        }
      }

      // Si hay un <li> abierto al mismo nivel, cerrarlo antes de abrir el nuevo
      if (stack[stack.length - 1].openLi) {
        html += '</li>';
      }

      html += renderLi(blocks[i]);
      stack[stack.length - 1].openLi = true;
      i++;
    }

    // Cerrar todos los <li> y <ul> restantes
    while (stack.length > 0) {
      if (stack[stack.length - 1].openLi) html += '</li>';
      html += '</' + tag + '>';
      stack.pop();
    }

    return { html: html, consumed: i - startIndex };
  };

  /**
   * Re-normaliza el indentLevel de TODOS los grupos de lista del modelo para que
   * no queden saltos de nivel (p. ej. tras borrar un ítem padre que dejaba un
   * huérfano en nivel N+2). Cada grupo empieza en 0 y ningún ítem supera al
   * anterior + 1. Mantiene el modelo coherente con lo que se renderiza/exporta.
   * Los niveles 0 se eliminan de la propiedad (para no ensuciar el JSON).
   */
  meWYSE.prototype._normalizeListModel = function() {
    var blocks = this.blocks;
    var i = 0;
    while (i < blocks.length) {
      var type = blocks[i].type;
      if (type === 'bulletList' || type === 'numberList' || type === 'checklist') {
        var effLevels = this._normalizeListLevels(blocks, i);
        for (var k = 0; k < effLevels.length; k++) {
          var block = blocks[i + k];
          if (effLevels[k] === 0) {
            if (block.indentLevel) delete block.indentLevel;
          } else {
            block.indentLevel = effLevels[k];
          }
        }
        i += effLevels.length;
      } else {
        i++;
      }
    }
  };

  /**
   * ¿El tipo de bloque admite indentación (es un ítem de lista)?
   * @param {string} type
   * @returns {boolean}
   */
  meWYSE.prototype._isListBlockType = function(type) {
    return type === 'bulletList' || type === 'numberList' || type === 'checklist';
  };

  /**
   * ¿El bloque puede AUMENTAR su indentación? Un ítem solo puede anidarse como
   * mucho un nivel más adentro que el ítem anterior del mismo grupo, no puede ser
   * el primero del grupo, ni pasar de 5.
   * @param {number} blockId
   * @returns {boolean}
   */
  meWYSE.prototype._canIndent = function(blockId) {
    var block = this.getBlock(blockId);
    if (!block) return false;
    // Bloque de texto: sangría de párrafo (margin-inline-start), tope INDENT_MAX.
    if (INDENTABLE_TEXT_BLOCK_TYPES[block.type]) {
      return (block.indent || 0) < INDENT_MAX;
    }
    // Bloque de lista: anidado real (indentLevel).
    if (!this._isListBlockType(block.type)) return false;
    var currentLevel = block.indentLevel || 0;
    if (currentLevel >= 5) return false;
    var index = this.getBlockIndex(blockId);
    if (index <= 0) return false; // primer bloque del editor
    var prevBlock = this.blocks[index - 1];
    if (prevBlock.type !== block.type) return false; // no hay padre del mismo tipo
    var prevLevel = prevBlock.indentLevel || 0;
    return (currentLevel + 1) <= (prevLevel + 1); // no saltar niveles
  };

  /**
   * ¿El bloque puede REDUCIR su indentación? Texto: block.indent > 0.
   * Lista: block.indentLevel > 0.
   * @param {number} blockId
   * @returns {boolean}
   */
  meWYSE.prototype._canOutdent = function(blockId) {
    var block = this.getBlock(blockId);
    if (!block) return false;
    if (INDENTABLE_TEXT_BLOCK_TYPES[block.type]) return (block.indent || 0) > 0;
    if (!this._isListBlockType(block.type)) return false;
    return (block.indentLevel || 0) > 0;
  };

  /**
   * ¿El caret está colapsado al INICIO del elemento editable? Se usa para que
   * Tab indente el párrafo solo al principio (en medio inserta tabulación / hace
   * lo habitual).
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  meWYSE.prototype._isCaretAtStart = function(element) {
    if (!element) return false;
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount || !sel.isCollapsed) return false;
    var range = sel.getRangeAt(0);
    // Rango desde el inicio del editable hasta el caret: si no contiene texto,
    // el caret está al principio.
    var probe = document.createRange();
    probe.selectNodeContents(element);
    probe.setEnd(range.startContainer, range.startOffset);
    return probe.toString().length === 0;
  };

  /**
   * Cambia el nivel de indentación de un bloque de lista.
   * @param {number} blockId
   * @param {number} delta - +1 para indent, -1 para outdent
   */
  meWYSE.prototype.indentBlock = function(blockId, delta) {
    var block = this.getBlock(blockId);
    if (!block) return;

    // Validar según la dirección usando los mismos criterios que la toolbar.
    if (delta > 0 && !this._canIndent(blockId)) return;
    if (delta < 0 && !this._canOutdent(blockId)) return;

    // Bloque de TEXTO: sangría de párrafo. Se aplica el margin DIRECTAMENTE al
    // elemento existente (sin re-render → caret intacto), como la alineación.
    if (INDENTABLE_TEXT_BLOCK_TYPES[block.type]) {
      var v_cur = block.indent || 0;
      var v_new = Math.max(0, Math.min(INDENT_MAX, v_cur + delta));
      if (v_new === v_cur) return;
      this.pushHistory(true);
      if (v_new > 0) block.indent = v_new; else delete block.indent;
      var v_el = this.getBlockElementById(blockId);
      if (v_el) {
        v_el.style.marginInlineStart = v_new > 0 ? (v_new * INDENT_STEP_PX) + 'px' : '';
      } else if (!this._patch_block(blockId)) {
        this.render();
      }
      this.triggerChange();
      this._updateIndentButtons();
      return;
    }

    if (!this._isListBlockType(block.type)) return;

    var currentLevel = block.indentLevel || 0;
    var newLevel = Math.max(0, Math.min(5, currentLevel + delta));
    if (newLevel === currentLevel) return;

    this.pushHistory(true);
    block.indentLevel = newLevel;

    // Render INCREMENTAL (Fase 5): reconstruir SOLO el grupo de lista afectado
    // (la anidación cambia dentro del grupo), conservando el resto del DOM.
    // Fallback a render() completo si no se pudo parchear el grupo.
    if (!this._patch_list_group(blockId)) {
      this.render();
    }
    this.triggerChange();

    // Restaurar foco al bloque. IMPORTANTE: enfocar el editable PROPIO del bloque
    // (para un <li> de lista es el propio <li>), no un descendiente — si el ítem
    // tiene hijos anidados, querySelector devolvería el editable de un hijo.
    var self = this;
    setTimeout(function() {
      var el = self.container.querySelector('[data-block-id="' + blockId + '"]');
      if (el) {
        var editable = (el.getAttribute('contenteditable') === 'true')
          ? el : el.querySelector('[contenteditable="true"]');
        if (editable) editable.focus();
      }
      self._updateIndentButtons();
    }, 0);
  };

  /**
   * Construye una estructura de lista anidada a partir de bloques consecutivos
   * tipo bulletList/numberList/checklist. Agrupa por tipo y anida según indentLevel.
   *
   * @param {Array} blocks - array completo de bloques del editor
   * @param {number} startIndex - índice desde donde empezar
   * @returns {Object} { wrapper: HTMLElement, consumed: number }
   */
  meWYSE.prototype._buildNestedListWrapper = function(blocks, startIndex) {
    var self = this;
    var startType = blocks[startIndex].type;

    var createListEl = function(type) {
      var el;
      if (type === 'bulletList') {
        el = document.createElement('ul');
        el.className = 'mewyse-list-group';
      } else if (type === 'numberList') {
        el = document.createElement('ol');
        el.className = 'mewyse-list-group';
      } else { // checklist
        el = document.createElement('ul');
        el.className = 'mewyse-list-group mewyse-checklist-group';
      }
      return el;
    };

    // Niveles EFECTIVOS normalizados (sin saltos, primero = 0): mismo criterio
    // que el export HTML, para que el DOM y getHTML coincidan siempre.
    var effLevels = this._normalizeListLevels(blocks, startIndex);

    // Crear root al nivel 0 del primer ítem
    var rootLevel = effLevels[0] || 0;
    var root = createListEl(startType);
    // Stack de { level, list, lastLi }
    var stack = [{ level: rootLevel, list: root, lastLi: null, type: startType }];

    var i = startIndex;
    while (i < blocks.length && blocks[i].type === startType) {
      var item = blocks[i];
      var level = effLevels[i - startIndex];

      // Pop stack hasta encontrar un nivel <= current
      while (stack.length > 1 && stack[stack.length - 1].level > level) {
        stack.pop();
      }

      var currentFrame = stack[stack.length - 1];

      // Si necesitamos subir un nivel (anidar)
      if (level > currentFrame.level && currentFrame.lastLi) {
        var nested = createListEl(startType);
        currentFrame.lastLi.appendChild(nested);
        currentFrame = { level: level, list: nested, lastLi: null, type: startType };
        stack.push(currentFrame);
      }

      // Crear el <li> y añadirlo a la lista actual
      var li = self.createBlockElement(item);
      currentFrame.list.appendChild(li);
      currentFrame.lastLi = li;
      i++;
    }

    return { wrapper: root, consumed: i - startIndex };
  };

  /**
   * Resuelve el objeto margin de imagen a píxeles verticales/horizontales.
   * Soporta el formato nuevo `{ vertical, horizontal }` y el legacy `{ all }`
   * (que aplica a ambos ejes). Devuelve null si no hay ningún valor.
   * @param {Object} margin
   * @returns {?{v:number, h:number}}
   */
  meWYSE.prototype._resolveImageMargin = function(margin) {
    if (!margin || typeof margin !== 'object') return null;
    var v_all = (typeof margin.all === 'number') ? margin.all : null;
    var v = (typeof margin.vertical === 'number') ? margin.vertical : v_all;
    var h = (typeof margin.horizontal === 'number') ? margin.horizontal : v_all;
    if (v == null && h == null) return null;
    return { v: v || 0, h: h || 0 };
  };

  /**
   * Extrae las opciones avanzadas (border/margin/alignment) del `style` inline y
   * atributos legacy de un `<img>` cargado desde HTML. Usa el CSSOM del nodo
   * (`node.style.*`, que ya expande los shorthands) para robustez. Devuelve un
   * objeto `advanced` o null. El sanitizer valida después los rangos/enums.
   * @param {HTMLImageElement} node
   * @returns {?Object}
   */
  meWYSE.prototype._imageAdvancedFromNode = function(node) {
    if (!node || !node.style) return null;
    var s = node.style;
    var adv = {};

    // --- Borde: longhand (el CSSOM expande `border: 2px solid red`) ---
    var v_bw = parseInt(s.borderTopWidth || s.borderWidth, 10);
    var v_bstyle = (s.borderTopStyle || s.borderStyle || '').toLowerCase();
    if (!isNaN(v_bw) && v_bw > 0 && v_bstyle && v_bstyle !== 'none') {
      adv.border = {
        width: v_bw,
        style: v_bstyle,
        color: this._colorToHex(s.borderTopColor || s.borderColor || '') || '#000000'
      };
    }

    // --- Margen: vertical = top, horizontal = right (modelo vspace/hspace) ---
    // 'auto' → parseInt NaN → se ignora (lo maneja la alineación). Fallback a los
    // atributos legacy vspace/hspace.
    var v_margin = {};
    var v_mt = parseInt(s.marginTop, 10);
    var v_mr = parseInt(s.marginRight, 10);
    var v_vspace = parseInt(node.getAttribute('vspace'), 10);
    var v_hspace = parseInt(node.getAttribute('hspace'), 10);
    if (!isNaN(v_mt)) v_margin.vertical = v_mt;
    else if (!isNaN(v_vspace)) v_margin.vertical = v_vspace;
    if (!isNaN(v_mr)) v_margin.horizontal = v_mr;
    else if (!isNaN(v_hspace)) v_margin.horizontal = v_hspace;

    // --- Alineación: float / margin auto (center) / atributo align legacy ---
    var v_float = (s.cssFloat || s.styleFloat || s.float || '').toLowerCase();
    var v_align_attr = (node.getAttribute('align') || '').toLowerCase();
    if (v_float === 'left' || v_align_attr === 'left') {
      adv.alignment = 'left';
    } else if (v_float === 'right' || v_align_attr === 'right') {
      adv.alignment = 'right';
    } else if ((s.marginLeft === 'auto' && s.marginRight === 'auto') ||
               v_align_attr === 'middle' || v_align_attr === 'center') {
      adv.alignment = 'center';
    }

    // Center usa margin:auto en horizontal → no tiene sentido un margen horizontal.
    if (adv.alignment === 'center') delete v_margin.horizontal;
    if (v_margin.vertical != null || v_margin.horizontal != null) adv.margin = v_margin;

    return (adv.border || adv.margin || adv.alignment) ? adv : null;
  };

  /**
   * Aplica estilos avanzados (border/margin/alignment) al <img> y wrapper.
   * @param {HTMLImageElement} img
   * @param {HTMLElement} wrapper - .mewyse-image-wrapper
   * @param {Object} advanced - { border, margin, alignment } o null/undefined
   */
  meWYSE.prototype._applyImageAdvancedStyles = function(img, wrapper, advanced) {
    if (!advanced) return;
    if (advanced.border && advanced.border.width) {
      var b = advanced.border;
      img.style.border = b.width + 'px ' + (b.style || 'solid') + ' ' + (b.color || '#000000');
    }
    var v_m = this._resolveImageMargin(advanced.margin);
    if (v_m) {
      // CSS shorthand: margin: <vertical> <horizontal>.
      img.style.margin = v_m.v + 'px ' + v_m.h + 'px';
    }
    if (advanced.alignment) {
      // Alineación: left/right usan float; center usa margin auto + display block
      if (advanced.alignment === 'left') {
        wrapper.style.float = 'left';
        wrapper.style.marginRight = '16px';
      } else if (advanced.alignment === 'right') {
        wrapper.style.float = 'right';
        wrapper.style.marginLeft = '16px';
      } else if (advanced.alignment === 'center') {
        wrapper.style.textAlign = 'center';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        img.style.display = 'block';
      }
    }
  };

  /**
   * Crea el panel de "Opciones avanzadas" para el modal de imagen.
   * Incluye: borde (width/style/color), margin, alineación.
   *
   * @param {Object} initial - valores iniciales { border, margin, alignment }
   * @returns {Object} { panel: HTMLElement, getValues: Function, toggle: Function }
   */
  meWYSE.prototype._createImageAdvancedPanel = function(initial) {
    var self = this;
    initial = initial || {};
    var iBorder = initial.border || {};
    var iMargin = initial.margin || {};
    var iAlignment = initial.alignment || '';

    // Toggle button (colapsable)
    var toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'mewyse-modal-advanced-toggle';
    toggleBtn.innerHTML = '<span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span> ' + self.t('modals.advancedOptions');

    var panel = document.createElement('div');
    panel.className = 'mewyse-modal-advanced-panel';
    panel.style.display = 'none';

    // --- Borde: width / style / color ---
    var borderGroup = document.createElement('div');
    borderGroup.className = 'mewyse-modal-advanced-row';
    var borderLabel = document.createElement('label');
    borderLabel.textContent = self.t('modals.imageBorder');
    var borderWidthInput = document.createElement('input');
    borderWidthInput.type = 'number';
    borderWidthInput.min = '0';
    borderWidthInput.className = 'mewyse-modal-input';
    borderWidthInput.placeholder = '0';
    borderWidthInput.value = iBorder.width || '';
    borderWidthInput.style.width = '70px';
    var borderStyleSelect = document.createElement('select');
    borderStyleSelect.className = 'mewyse-modal-input';
    ['solid', 'dashed', 'dotted', 'double'].forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      if (iBorder.style === s) opt.selected = true;
      borderStyleSelect.appendChild(opt);
    });
    var borderColorInput = document.createElement('input');
    borderColorInput.type = 'color';
    borderColorInput.className = 'mewyse-modal-input mewyse-modal-color';
    borderColorInput.value = iBorder.color || '#000000';
    borderColorInput.dataset.userSet = iBorder.color ? 'true' : 'false';
    borderColorInput.oninput = function() { borderColorInput.dataset.userSet = 'true'; };
    var borderRow = document.createElement('div');
    borderRow.className = 'mewyse-modal-advanced-inline';
    borderRow.appendChild(borderWidthInput);
    borderRow.appendChild(borderStyleSelect);
    borderRow.appendChild(borderColorInput);
    borderGroup.appendChild(borderLabel);
    borderGroup.appendChild(borderRow);
    panel.appendChild(borderGroup);

    // --- Espaciado: vertical (top/bottom) y horizontal (left/right) separados ---
    // Prefill retrocompatible: si el dato antiguo trae `all`, se usa para ambos.
    var v_margin_v = (typeof iMargin.vertical === 'number') ? iMargin.vertical
      : (typeof iMargin.all === 'number' ? iMargin.all : '');
    var v_margin_h = (typeof iMargin.horizontal === 'number') ? iMargin.horizontal
      : (typeof iMargin.all === 'number' ? iMargin.all : '');

    var marginGroup = document.createElement('div');
    marginGroup.className = 'mewyse-modal-advanced-row';
    var marginLabel = document.createElement('label');
    marginLabel.textContent = self.t('modals.imageMarginVertical');
    var marginVInput = document.createElement('input');
    marginVInput.type = 'number';
    marginVInput.min = '0';
    marginVInput.className = 'mewyse-modal-input';
    marginVInput.placeholder = '0';
    marginVInput.value = v_margin_v;
    marginVInput.style.width = '70px';
    var marginHLabel = document.createElement('label');
    marginHLabel.textContent = self.t('modals.imageMarginHorizontal');
    marginHLabel.style.marginLeft = '8px';
    var marginHInput = document.createElement('input');
    marginHInput.type = 'number';
    marginHInput.min = '0';
    marginHInput.className = 'mewyse-modal-input';
    marginHInput.placeholder = '0';
    marginHInput.value = v_margin_h;
    marginHInput.style.width = '70px';
    var marginRow = document.createElement('div');
    marginRow.className = 'mewyse-modal-advanced-inline';
    marginRow.appendChild(marginVInput);
    marginRow.appendChild(marginHLabel);
    marginRow.appendChild(marginHInput);
    marginGroup.appendChild(marginLabel);
    marginGroup.appendChild(marginRow);
    panel.appendChild(marginGroup);

    // --- Alineación ---
    var alignGroup = document.createElement('div');
    alignGroup.className = 'mewyse-modal-advanced-row';
    var alignLabel = document.createElement('label');
    alignLabel.textContent = self.t('modals.imageAlignment');
    var alignSelect = document.createElement('select');
    alignSelect.className = 'mewyse-modal-input';
    ['', 'left', 'center', 'right'].forEach(function(a) {
      var opt = document.createElement('option');
      opt.value = a;
      opt.textContent = a || '—';
      if (iAlignment === a) opt.selected = true;
      alignSelect.appendChild(opt);
    });
    alignGroup.appendChild(alignLabel);
    alignGroup.appendChild(alignSelect);
    panel.appendChild(alignGroup);

    // Toggle open/close
    toggleBtn.onclick = function(e) {
      e.preventDefault();
      var isOpen = panel.style.display !== 'none';
      panel.style.display = isOpen ? 'none' : 'block';
      toggleBtn.classList.toggle('expanded', !isOpen);
    };

    return {
      toggle: toggleBtn,
      panel: panel,
      getValues: function() {
        var result = {};
        var bw = parseInt(borderWidthInput.value, 10);
        if (!isNaN(bw) && bw > 0) {
          result.border = {
            width: bw,
            style: borderStyleSelect.value,
            color: borderColorInput.dataset.userSet === 'true' ? borderColorInput.value : '#000000'
          };
        }
        var mv = parseInt(marginVInput.value, 10);
        var mh = parseInt(marginHInput.value, 10);
        var v_margin_out = {};
        if (!isNaN(mv) && mv >= 0 && marginVInput.value !== '') v_margin_out.vertical = mv;
        if (!isNaN(mh) && mh >= 0 && marginHInput.value !== '') v_margin_out.horizontal = mh;
        if (v_margin_out.vertical != null || v_margin_out.horizontal != null) {
          result.margin = v_margin_out;
        }
        if (alignSelect.value) {
          result.alignment = alignSelect.value;
        }
        return result;
      }
    };
  };

  /**
   * Muestra el modal para editar las dimensiones de la imagen
   */
  meWYSE.prototype.showImageDimensionsModal = function(file, insertIndex, replaceBlockId) {
    var self = this;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    // Crear el contenedor del modal
    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';
    self._applyMenuTheme(modalContainer); // dark mode si el editor está en oscuro

    // Título
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.configureImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Leer la imagen para obtener sus dimensiones originales
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        var originalWidth = img.width;
        var originalHeight = img.height;
        var aspectRatio = originalWidth / originalHeight;

        // Crear preview de la imagen
        var previewContainer = document.createElement('div');
        previewContainer.className = 'mewyse-modal-preview';
        var previewImg = document.createElement('img');
        previewImg.src = e.target.result;
        previewImg.style.maxWidth = '100%';
        previewImg.style.maxHeight = '200px';
        previewContainer.appendChild(previewImg);
        modalContainer.appendChild(previewContainer);

        // Información del archivo
        var fileInfo = document.createElement('p');
        fileInfo.className = 'mewyse-modal-info';
        fileInfo.textContent = self.t('modals.originalDimensions', { width: originalWidth, height: originalHeight });
        modalContainer.appendChild(fileInfo);

        // Contenedor de inputs
        var inputsContainer = document.createElement('div');
        inputsContainer.className = 'mewyse-modal-inputs';

        // Input ancho
        var widthGroup = document.createElement('div');
        widthGroup.className = 'mewyse-modal-input-group';
        var widthLabel = document.createElement('label');
        widthLabel.textContent = self.t('modals.width');
        var widthInput = document.createElement('input');
        widthInput.type = 'number';
        widthInput.value = originalWidth;
        widthInput.min = '1';
        widthInput.className = 'mewyse-modal-input';
        widthGroup.appendChild(widthLabel);
        widthGroup.appendChild(widthInput);
        inputsContainer.appendChild(widthGroup);

        // Input alto
        var heightGroup = document.createElement('div');
        heightGroup.className = 'mewyse-modal-input-group';
        var heightLabel = document.createElement('label');
        heightLabel.textContent = self.t('modals.height');
        var heightInput = document.createElement('input');
        heightInput.type = 'number';
        heightInput.value = originalHeight;
        heightInput.min = '1';
        heightInput.className = 'mewyse-modal-input';
        heightGroup.appendChild(heightLabel);
        heightGroup.appendChild(heightInput);
        inputsContainer.appendChild(heightGroup);

        modalContainer.appendChild(inputsContainer);

        // Checkbox para mantener proporciones
        var proportionsContainer = document.createElement('div');
        proportionsContainer.className = 'mewyse-modal-checkbox-group';
        var proportionsCheckbox = document.createElement('input');
        proportionsCheckbox.type = 'checkbox';
        proportionsCheckbox.checked = true;
        proportionsCheckbox.id = 'mewyse-maintain-proportions';
        var proportionsLabel = document.createElement('label');
        proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions');
        proportionsLabel.textContent = self.t('modals.keepProportions');
        proportionsContainer.appendChild(proportionsCheckbox);
        proportionsContainer.appendChild(proportionsLabel);
        modalContainer.appendChild(proportionsContainer);

        // ¿El usuario tocó los campos de ancho/alto? Si NO los modifica, no se
        // aplican dimensiones al bloque (la imagen queda a su tamaño natural).
        var v_dims_touched = false;

        // Event listeners para mantener proporciones
        widthInput.oninput = function() {
          v_dims_touched = true;
          if (proportionsCheckbox.checked) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
          }
        };

        heightInput.oninput = function() {
          v_dims_touched = true;
          if (proportionsCheckbox.checked) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
          }
        };

        // Opciones avanzadas (colapsables)
        var advanced = self._createImageAdvancedPanel({});
        modalContainer.appendChild(advanced.toggle);
        modalContainer.appendChild(advanced.panel);

        // Botones
        var buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'mewyse-modal-buttons';

        var cancelButton = document.createElement('button');
        cancelButton.textContent = self.t('modals.cancel');
        cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
        cancelButton.onclick = function() {
          document.body.removeChild(modalOverlay);
        };

        var insertButton = document.createElement('button');
        insertButton.textContent = self.t('modals.insert');
        insertButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
        insertButton.onclick = function() {
          // Solo se pasan dimensiones si el usuario tocó los campos; si no, null
          // → createImageBlock NO las guarda y la imagen queda a tamaño natural.
          var width = v_dims_touched ? parseInt(widthInput.value) : null;
          var height = v_dims_touched ? parseInt(heightInput.value) : null;

          // Crear el bloque de imagen con el blob + opciones avanzadas
          self.createImageBlock(file, e.target.result, width, height, insertIndex, advanced.getValues(), replaceBlockId);

          document.body.removeChild(modalOverlay);
        };

        buttonsContainer.appendChild(cancelButton);
        buttonsContainer.appendChild(insertButton);
        modalContainer.appendChild(buttonsContainer);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer click fuera del modal
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    };
  };

  /**
   * Crea un bloque de imagen con el archivo seleccionado.
   * Si options.onImageUpload está definido, delega el upload al consumidor
   * y usa la URL devuelta como blob. Si no, usa el dataURL base64 local.
   *
   * @param {Object} advanced - Opciones avanzadas opcionales: { border, margin, alignment }
   */
  meWYSE.prototype.createImageBlock = function(file, dataUrl, width, height, insertIndex, advanced, replaceBlockId) {
    var self = this;

    var doCreate = function(finalBlob, finalWidth, finalHeight) {
      var content = {
        blob: finalBlob,
        fileName: file.name,
        fileType: file.type
      };
      // Dimensiones OPCIONALES: las del hook onImageUpload (finalWidth/Height) o,
      // si no, las recibidas por parámetro (del modal). Solo se guardan si son
      // números válidos; si llegan null (el usuario no tocó los campos) la
      // imagen queda a su tamaño natural, sin width/height en el modelo.
      var v_w = (typeof finalWidth === 'number') ? finalWidth : width;
      var v_h = (typeof finalHeight === 'number') ? finalHeight : height;
      if (typeof v_w === 'number' && v_w > 0) content.width = v_w;
      if (typeof v_h === 'number' && v_h > 0) content.height = v_h;
      // Adjuntar opciones avanzadas si hay
      if (advanced && (advanced.border || advanced.margin || advanced.alignment)) {
        content.advanced = advanced;
      }

      // Si el bloque donde estaba el foco está VACÍO, convertirlo en la imagen
      // (reutiliza id y posición) en vez de insertar debajo dejando el vacío.
      var v_replaceBlock = (replaceBlockId != null) ? self.getBlock(replaceBlockId) : null;
      var v_canReplace = v_replaceBlock &&
        typeof v_replaceBlock.content === 'string' &&
        v_replaceBlock.content.trim() === '' &&
        v_replaceBlock.type !== 'divider';

      var v_targetId;
      if (v_canReplace) {
        v_replaceBlock.type = 'image';
        v_replaceBlock.content = content;
        if (v_replaceBlock.checked != null) delete v_replaceBlock.checked;
        if (v_replaceBlock.alignment != null) delete v_replaceBlock.alignment;
        if (v_replaceBlock.customClass != null) delete v_replaceBlock.customClass;
        if (v_replaceBlock.indentLevel != null) delete v_replaceBlock.indentLevel;
        v_targetId = v_replaceBlock.id;
      } else {
        var newBlock = {
          id: ++self.currentBlockId,
          type: 'image',
          content: content
        };
        self.blocks.splice(insertIndex, 0, newBlock);
        v_targetId = newBlock.id;
      }

      // El render recrea el DOM (blur transitorio del bloque que tenía el foco):
      // suprimir onBlur durante la transición.
      self._suppressBlurUntil = Date.now() + 300;

      // Render INCREMENTAL (Fase 5):
      //  - reemplazo (bloque vacío → imagen): `_patch_block` recrea SOLO ese bloque.
      //  - inserción (bloque nuevo): fast-path `render(v_targetId)` inserta solo la
      //    imagen (no roba foco de texto: el bloque imagen no es contenteditable).
      //  - fallback: render() completo.
      var v_img_ok;
      if (v_canReplace) {
        v_img_ok = self._patch_block(v_targetId);
      } else {
        self.render(v_targetId);
        v_img_ok = !!self.getBlockElementById(v_targetId);
      }
      if (!v_img_ok) self.render();

      self.triggerChange();
      // Mantener el foco DENTRO del editor: seleccionar la imagen recién
      // insertada (la selección la enfoca y muestra el handle).
      var v_newEl = self.getBlockElementById(v_targetId);
      var v_newImg = v_newEl ? v_newEl.querySelector('img.mewyse-image') : null;
      if (v_newImg) self.selectImage(v_newImg, v_targetId, false);
    };

    if (typeof this.options.onImageUpload === 'function') {
      // Protegido: si el hook del consumidor lanza, caer al comportamiento
      // por defecto (insertar la imagen inline) en vez de abortar.
      try {
        this.options.onImageUpload(file, function(result) {
          if (!result || !result.url) return; // hook rechazó → abortar
          doCreate(result.url, result.width, result.height);
        });
      } catch (e) {
        doCreate(dataUrl);
      }
    } else {
      doCreate(dataUrl);
    }
  };

  /**
   * Edita las dimensiones de una imagen existente
   */
  meWYSE.prototype.editImageDimensions = function(blockId, imgElement) {
    var self = this;
    var block = this.getBlock(blockId);

    if (!block || block.type !== 'image') return;

    // ¿El bloque tiene dimensiones fijadas? Si NO (imagen a tamaño natural), el
    // modal se precarga con las dimensiones REALES renderizadas/naturales para
    // que se vean números y el ratio funcione, pero al Guardar NO se aplican
    // salvo que el usuario toque los campos (v_dims_touched).
    var v_had_dims = (typeof block.content.width === 'number' && block.content.width > 0) &&
                     (typeof block.content.height === 'number' && block.content.height > 0);
    var currentWidth = parseInt(imgElement.style.width) || block.content.width ||
                       imgElement.naturalWidth || imgElement.offsetWidth || 0;
    var currentHeight = parseInt(imgElement.style.height) || block.content.height ||
                        imgElement.naturalHeight || imgElement.offsetHeight || 0;
    var aspectRatio = (currentWidth && currentHeight) ? (currentWidth / currentHeight) : 1;
    var v_dims_touched = false;

    // Crear el overlay del modal
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'mewyse-modal-overlay';

    // Crear el contenedor del modal
    var modalContainer = document.createElement('div');
    modalContainer.className = 'mewyse-modal-container';
    self._applyMenuTheme(modalContainer); // dark mode si el editor está en oscuro

    // Título
    var modalTitle = document.createElement('h3');
    modalTitle.textContent = self.t('modals.editImageDimensions');
    modalTitle.className = 'mewyse-modal-title';
    modalContainer.appendChild(modalTitle);

    // Preview de la imagen
    var previewContainer = document.createElement('div');
    previewContainer.className = 'mewyse-modal-preview';
    var previewImg = document.createElement('img');
    previewImg.src = block.content.blob;
    previewImg.style.maxWidth = '100%';
    previewImg.style.maxHeight = '200px';
    previewContainer.appendChild(previewImg);
    modalContainer.appendChild(previewContainer);

    // Contenedor de inputs
    var inputsContainer = document.createElement('div');
    inputsContainer.className = 'mewyse-modal-inputs';

    // Input ancho
    var widthGroup = document.createElement('div');
    widthGroup.className = 'mewyse-modal-input-group';
    var widthLabel = document.createElement('label');
    widthLabel.textContent = self.t('modals.width');
    var widthInput = document.createElement('input');
    widthInput.type = 'number';
    widthInput.value = currentWidth;
    widthInput.min = '1';
    widthInput.className = 'mewyse-modal-input';
    widthGroup.appendChild(widthLabel);
    widthGroup.appendChild(widthInput);
    inputsContainer.appendChild(widthGroup);

    // Input alto
    var heightGroup = document.createElement('div');
    heightGroup.className = 'mewyse-modal-input-group';
    var heightLabel = document.createElement('label');
    heightLabel.textContent = self.t('modals.height');
    var heightInput = document.createElement('input');
    heightInput.type = 'number';
    heightInput.value = currentHeight;
    heightInput.min = '1';
    heightInput.className = 'mewyse-modal-input';
    heightGroup.appendChild(heightLabel);
    heightGroup.appendChild(heightInput);
    inputsContainer.appendChild(heightGroup);

    modalContainer.appendChild(inputsContainer);

    // Checkbox para mantener proporciones
    var proportionsContainer = document.createElement('div');
    proportionsContainer.className = 'mewyse-modal-checkbox-group';
    var proportionsCheckbox = document.createElement('input');
    proportionsCheckbox.type = 'checkbox';
    proportionsCheckbox.checked = true;
    proportionsCheckbox.id = 'mewyse-maintain-proportions-edit';
    var proportionsLabel = document.createElement('label');
    proportionsLabel.setAttribute('for', 'mewyse-maintain-proportions-edit');
    proportionsLabel.textContent = self.t('modals.keepProportions');
    proportionsContainer.appendChild(proportionsCheckbox);
    proportionsContainer.appendChild(proportionsLabel);
    modalContainer.appendChild(proportionsContainer);

    // Panel de opciones avanzadas (borde / espaciado / alineación), precargado
    // con los valores actuales de la imagen.
    var advancedPanel = self._createImageAdvancedPanel(block.content.advanced || {});
    modalContainer.appendChild(advancedPanel.toggle);
    modalContainer.appendChild(advancedPanel.panel);

    // Event listeners para mantener proporciones
    widthInput.oninput = function() {
      v_dims_touched = true;
      if (proportionsCheckbox.checked) {
        heightInput.value = Math.round(widthInput.value / aspectRatio);
      }
    };

    heightInput.oninput = function() {
      v_dims_touched = true;
      if (proportionsCheckbox.checked) {
        widthInput.value = Math.round(heightInput.value * aspectRatio);
      }
    };

    // Botones
    var buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'mewyse-modal-buttons';

    // Al cerrar el modal, devolver el foco a la imagen dejándola seleccionada
    // (para que el estado de foco sea coherente y el onBlur salte cuando toque).
    var v_cell = imgElement.closest ? imgElement.closest('td, th') : null;
    var closeAndReselect = function() {
      if (modalOverlay.parentNode) document.body.removeChild(modalOverlay);
      self._suppressBlurUntil = Date.now() + 300;
      self.selectImage(imgElement, v_cell ? null : blockId, !!v_cell, v_cell || null);
    };

    var cancelButton = document.createElement('button');
    cancelButton.textContent = self.t('modals.cancel');
    cancelButton.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelButton.onclick = function() {
      closeAndReselect();
    };

    var saveButton = document.createElement('button');
    saveButton.textContent = self.t('modals.save');
    saveButton.className = 'mewyse-modal-button mewyse-modal-button-primary';
    saveButton.onclick = function() {
      // Solo se aplican dimensiones si el usuario tocó los campos. Si no y el
      // bloque no tenía (imagen a tamaño natural), se mantiene sin dimensiones.
      if (v_dims_touched) {
        var width = parseInt(widthInput.value);
        var height = parseInt(heightInput.value);
        if (!isNaN(width) && width > 0) block.content.width = width;
        else delete block.content.width;
        if (!isNaN(height) && height > 0) block.content.height = height;
        else delete block.content.height;
      } else if (!v_had_dims) {
        // No tocó nada y no había dims: asegurar que siguen sin fijarse.
        delete block.content.width;
        delete block.content.height;
      }

      // Persistir las opciones avanzadas (borde/espaciado/alineación) en el modelo.
      var v_adv = advancedPanel.getValues();
      if (v_adv.border || v_adv.margin || v_adv.alignment) {
        block.content.advanced = v_adv;
      } else if (block.content.advanced) {
        delete block.content.advanced;
      }

      self.triggerChange();

      // Aplicar los estilos (dims/advanced) recreando el elemento de la imagen y
      // re-seleccionarla (conserva selección + handle).
      if (modalOverlay.parentNode) document.body.removeChild(modalOverlay);
      self._suppressBlurUntil = Date.now() + 300;

      // Render INCREMENTAL (Fase 4) para una imagen SUELTA: `_patch_block` recrea
      // SOLO su bloque, sin tocar el resto del documento; la re-selección es
      // síncrona (el elemento ya existe tras el patch). Para imágenes DENTRO de
      // una celda de tabla (v_cell), el bloque es la tabla → render() completo.
      var v_img_patched = !v_cell && self._patch_block(blockId);
      if (v_img_patched) {
        var v_img_now = self.container.querySelector('[data-block-id="' + blockId + '"] .mewyse-image');
        if (v_img_now) self.selectImage(v_img_now, blockId, false, null);
      } else {
        self.render();
        setTimeout(function() {
          var v_new_img = self.container.querySelector('[data-block-id="' + blockId + '"] .mewyse-image');
          if (v_new_img) self.selectImage(v_new_img, v_cell ? null : blockId, !!v_cell, v_cell || null);
        }, 0);
      }
    };

    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(saveButton);
    modalContainer.appendChild(buttonsContainer);

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Cerrar al hacer click fuera del modal
    modalOverlay.onclick = function(e) {
      if (e.target === modalOverlay) {
        closeAndReselect();
      }
    };
  };

  /**
   * Muestra el menú desplegable de tipos de bloque en la toolbar
   */
  /**
   * Actualiza la etiqueta del dropdown "Cambiar tipo de bloque" de la toolbar
   * para reflejar el tipo del bloque enfocado. No hace nada si no hay toolbar.
   * @param {string} blockType - tipo del bloque (paragraph/heading1/...)
   */
  meWYSE.prototype._updateBlockTypeDropdown = function(blockType) {
    if (!this._blockTypeButton) return;
    // Para 'paragraph' se usa la etiqueta genérica "Texto" (coherente con el
    // estado inicial del dropdown); el resto usan su nombre de tipo.
    var label = (blockType && blockType !== 'paragraph')
      ? this.t('blockTypes.' + blockType)
      : this.t('misc.text');
    this._blockTypeButton.innerHTML = escape_attr(label) +
      ' <span class="dropdown-arrow">' + WYSIWYG_ICONS.chevronDown + '</span>';
  };

  meWYSE.prototype.showToolbarBlockTypeMenu = function(buttonElement) {
    var self = this;

    // Cerrar menú existente si está abierto
    if (this.activeToolbarMenu) {
      this.closeToolbarMenu();
      return;
    }

    buttonElement.setAttribute('aria-expanded', 'true');

    // Guardar el bloque actual y la posición del cursor
    // Primero intentar usar el último bloque enfocado guardado
    var blockElement = null;
    var contentEditable = null;

    // Buscar cualquier contentEditable que tenga el foco actualmente
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      var range = selection.getRangeAt(0);
      var node = range.startContainer;

      // Si es un nodo de texto, obtener su padre
      if (node.nodeType === 3) {
        node = node.parentElement;
      }

      // Buscar el contentEditable
      while (node && node !== this.container) {
        if (node.contentEditable === 'true') {
          contentEditable = node;
          break;
        }
        node = node.parentElement;
      }

      // Buscar el bloque que contiene el contentEditable
      if (contentEditable) {
        node = contentEditable;
        while (node && !node.hasAttribute('data-block-id')) {
          node = node.parentElement;
        }
        blockElement = node;
      }
    }

    // Si no encontramos un bloque con el método anterior, buscar el primer bloque
    if (!blockElement) {
      var allBlocks = this.container.querySelectorAll('[data-block-id]');
      if (allBlocks.length > 0) {
        blockElement = allBlocks[0];
        contentEditable = blockElement.querySelector('[contenteditable="true"]');
      }
    }

    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));

      // Guardar la selección actual
      var savedRange = null;
      if (selection.rangeCount > 0) {
        savedRange = selection.getRangeAt(0).cloneRange();
      }

      this.toolbarMenuContext = {
        blockId: blockId,
        contentEditable: contentEditable,
        savedRange: savedRange
      };
    } else {
      // Si no hay bloque activo, no guardar contexto
      this.toolbarMenuContext = null;
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-type-menu mewyse-toolbar-menu';
    menu.setAttribute('role', 'listbox');

    // Solo tipos de TEXTO convertibles entre sí. Tabla/imagen/separador (y demás
    // bloques no-texto) NO son destinos de conversión válidos —perderían el
    // contenido o crearían un bloque roto— y se insertan con su propio flujo
    // (botones de la toolbar / menú slash).
    var blockTypes = [
      { type: 'paragraph', icon: WYSIWYG_ICONS.paragraph },
      { type: 'heading1', icon: WYSIWYG_ICONS.heading1 },
      { type: 'heading2', icon: WYSIWYG_ICONS.heading2 },
      { type: 'heading3', icon: WYSIWYG_ICONS.heading3 },
      { type: 'quote', icon: WYSIWYG_ICONS.quote },
      { type: 'code', icon: WYSIWYG_ICONS.code },
      { type: 'bulletList', icon: WYSIWYG_ICONS.bulletList },
      { type: 'numberList', icon: WYSIWYG_ICONS.numberList },
      { type: 'checklist', icon: WYSIWYG_ICONS.checklist }
    ];

    blockTypes.forEach(function(blockType) {
      var item = document.createElement('div');
      item.className = 'mewyse-type-menu-item';
      item.setAttribute('role', 'option');
      item.innerHTML = '<span class="icon">' + blockType.icon + '</span>' + self.t('blockTypes.' + blockType.type);
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.changeBlockTypeFromToolbar(blockType.type);
        self.closeToolbarMenu();
      };
      menu.appendChild(item);
    });

    // Estilos custom (styleFormats) — se añaden después de los types estándar
    if (this.styleFormats && this.styleFormats.length > 0) {
      var sep = document.createElement('div');
      sep.className = 'mewyse-type-menu-separator';
      menu.appendChild(sep);

      this.styleFormats.forEach(function(sf) {
        var item = document.createElement('div');
        item.className = 'mewyse-type-menu-item';
        item.setAttribute('role', 'option');
        // Preview: aplicar la clase al span del label para que el usuario vea el estilo
        item.innerHTML = '<span class="icon">' + (WYSIWYG_ICONS[sf.block] || WYSIWYG_ICONS.paragraph) +
                        '</span><span class="mewyse-style-preview ' + sf.className + '">' + sf.title + '</span>';
        item.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.changeBlockTypeFromToolbar(sf.block, sf.className);
          self.closeToolbarMenu();
        };
        menu.appendChild(item);
      });
    }

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this.activeToolbarMenu = menu;

    // Posicionar el menú debajo del botón
    this.anchorMenu(menu, buttonElement, { offsetY: 5, offsetX: 0 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      document.addEventListener('click', self.closeToolbarMenuHandler = function() {
        self.closeToolbarMenu();
      });
    }, 0);

    this._showBackdrop('toolbarMenu', function() { self.closeToolbarMenu(); });
  };

  /**
   * Cambia el tipo de bloque desde la toolbar y restaura el foco
   */
  meWYSE.prototype.changeBlockTypeFromToolbar = function(type, customClass) {
    var self = this;

    // El cambio de tipo re-renderiza el bloque (blur transitorio del editable):
    // suprimir onBlur durante la transición.
    this._suppressBlurUntil = Date.now() + 300;

    // Si hay varios bloques seleccionados, aplicar el tipo a todos.
    if (this.applyBlockTypeToSelection(type, customClass)) return;

    // Si hay contexto guardado, usarlo
    if (this.toolbarMenuContext && this.toolbarMenuContext.blockId) {
      var blockId = this.toolbarMenuContext.blockId;
      var savedRange = this.toolbarMenuContext.savedRange;

      // Guardar la posición del cursor antes del cambio como offset de texto plano
      var cursorOffset = 0;
      var contentEditable = this.toolbarMenuContext.contentEditable;

      if (savedRange && contentEditable) {
        try {
          // Crear un rango temporal desde el inicio del contentEditable hasta el cursor
          var tempRange = document.createRange();
          tempRange.setStart(contentEditable, 0);
          tempRange.setEnd(savedRange.startContainer, savedRange.startOffset);

          // El toString() del rango nos da el texto antes del cursor
          cursorOffset = tempRange.toString().length;
        } catch (e) {
          cursorOffset = 0;
        }
      }

      // Verificar si el contentEditable está dentro de una celda de tabla
      var tableCell = contentEditable ? contentEditable.closest('td, th') : null;

      if (tableCell) {
        // Estamos dentro de una celda de tabla - cambiar solo el elemento interno
        this.changeTableCellBlockType(tableCell, contentEditable, type, blockId, cursorOffset);
        return;
      }

      // Aplicar customClass (styleFormats) ANTES del cambio de tipo, para que el
      // render incremental de changeBlockType (createBlockElement) ya la aplique
      // al nuevo elemento (antes se asignaba después y forzaba un render() extra).
      var targetBlock = this.getBlock(blockId);
      if (targetBlock) {
        if (customClass && this._customClassWhitelist && this._customClassWhitelist[customClass]) {
          targetBlock.customClass = customClass;
        } else {
          delete targetBlock.customClass;
        }
      }

      // Cambiar el tipo de bloque (parchea in situ si es texto↔texto; el foco/caret
      // real lo repone el setTimeout de abajo con el offset guardado del menú).
      this.changeBlockType(blockId, type);

      // Restaurar el foco y la selección después del render
      setTimeout(function() {
        var blockElement = self.container.querySelector('[data-block-id="' + blockId + '"]');
        if (blockElement) {
          var contentEditable = blockElement.querySelector('[contenteditable="true"]');
          if (contentEditable) {
            contentEditable.focus();

            // Intentar restaurar la posición del cursor
            try {
              var selection = window.getSelection();
              selection.removeAllRanges();
              var range = document.createRange();

              // Función para recorrer el árbol de nodos y encontrar la posición del cursor
              function findCursorPosition(node, targetOffset) {
                var currentOffset = 0;

                function traverse(n) {
                  if (n.nodeType === 3) {
                    // Nodo de texto
                    if (currentOffset + n.length >= targetOffset) {
                      // El cursor está en este nodo
                      return { node: n, offset: targetOffset - currentOffset };
                    }
                    currentOffset += n.length;
                  } else if (n.nodeType === 1) {
                    // Nodo elemento
                    for (var i = 0; i < n.childNodes.length; i++) {
                      var result = traverse(n.childNodes[i]);
                      if (result) return result;
                    }
                  }
                  return null;
                }

                return traverse(node);
              }

              var position = findCursorPosition(contentEditable, cursorOffset);
              if (position) {
                range.setStart(position.node, position.offset);
                range.collapse(true);
              } else {
                // Si no se encuentra la posición, colocar al final
                var lastChild = contentEditable;
                while (lastChild.lastChild) {
                  lastChild = lastChild.lastChild;
                }
                if (lastChild.nodeType === 3) {
                  range.setStart(lastChild, lastChild.length);
                } else {
                  range.setStart(lastChild, 0);
                }
                range.collapse(true);
              }

              selection.addRange(range);
            } catch (e) {
              // Si falla la restauración, simplemente enfocar sin posicionar cursor
            }
          }
        }
      }, 10);
    } else {
      // Si no hay contexto, usar el método estándar
      this.changeCurrentBlockType(type);
    }

    // Limpiar el contexto
    this.toolbarMenuContext = null;
  };

  /**
   * Cambia el tipo de elemento dentro de una celda de tabla
   * @param {HTMLElement} tableCell - La celda (td o th)
   * @param {HTMLElement} currentElement - El elemento actual editable
   * @param {string} newType - El nuevo tipo de bloque
   * @param {number} blockId - ID del bloque de tabla
   * @param {number} cursorOffset - Posición del cursor
   */
  meWYSE.prototype.changeTableCellBlockType = function(tableCell, currentElement, newType, blockId, cursorOffset) {
    // Mapeo de tipos de bloque a elementos HTML
    var typeToElement = {
      'paragraph': 'p',
      'heading1': 'h1',
      'heading2': 'h2',
      'heading3': 'h3',
      'quote': 'blockquote',
      'code': 'pre',
      'bulletList': 'ul',
      'numberList': 'ol'
    };

    var newElementTag = typeToElement[newType] || 'p';

    // Si es el mismo tipo, no hacer nada
    if (currentElement.tagName.toLowerCase() === newElementTag.toLowerCase()) {
      // Limpiar el contexto
      this.toolbarMenuContext = null;
      return;
    }

    // Guardar el contenido actual
    var content = currentElement.innerHTML;

    // Crear el nuevo elemento
    var newElement = document.createElement(newElementTag);
    newElement.innerHTML = content;
    newElement.contentEditable = true;
    newElement.style.padding = '8px';
    newElement.style.margin = '0';
    newElement.style.minHeight = '1em';

    // Reemplazar solo el elemento editable, no toda la celda
    tableCell.replaceChild(newElement, currentElement);

    // Volver a adjuntar eventos al nuevo elemento
    this.attachTableCellEvents(newElement, blockId);

    // Actualizar el contenido del bloque tabla
    var blockElement = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (blockElement) {
      var tableElement = blockElement.querySelector('table');
      if (tableElement) {
        this.updateBlockContent(blockId, tableElement.innerHTML);
      }
    }

    // Restaurar el foco y la posición del cursor
    setTimeout(function() {
      newElement.focus();

      // Intentar restaurar la posición del cursor
      try {
        var selection = window.getSelection();
        selection.removeAllRanges();
        var range = document.createRange();

        // Función para recorrer el árbol de nodos y encontrar la posición del cursor
        function findCursorPosition(node, targetOffset) {
          var currentOffset = 0;

          function traverse(n) {
            if (n.nodeType === 3) {
              // Nodo de texto
              if (currentOffset + n.length >= targetOffset) {
                // El cursor está en este nodo
                return { node: n, offset: targetOffset - currentOffset };
              }
              currentOffset += n.length;
            } else if (n.nodeType === 1) {
              // Nodo elemento
              for (var i = 0; i < n.childNodes.length; i++) {
                var result = traverse(n.childNodes[i]);
                if (result) return result;
              }
            }
            return null;
          }

          return traverse(node);
        }

        var position = findCursorPosition(newElement, cursorOffset);
        if (position) {
          range.setStart(position.node, position.offset);
          range.collapse(true);
        } else {
          // Si no se encuentra la posición, colocar al final
          var lastChild = newElement;
          while (lastChild.lastChild) {
            lastChild = lastChild.lastChild;
          }
          if (lastChild.nodeType === 3) {
            range.setStart(lastChild, lastChild.length);
          } else {
            range.setStart(lastChild, 0);
          }
          range.collapse(true);
        }

        selection.addRange(range);
      } catch (e) {
        // Si falla la restauración, simplemente enfocar sin posicionar cursor
      }
    }, 10);

    // Limpiar el contexto
    this.toolbarMenuContext = null;
  };

  /**
   * Cierra el menú desplegable de la toolbar
   */
  meWYSE.prototype.closeToolbarMenu = function() {
    if (this.activeToolbarMenu) {
      document.body.removeChild(this.activeToolbarMenu);
      this.activeToolbarMenu = null;
    }
    if (this.closeToolbarMenuHandler) {
      document.removeEventListener('click', this.closeToolbarMenuHandler);
      this.closeToolbarMenuHandler = null;
    }
    // Actualizar aria-expanded en botones del toolbar
    if (this.toolbar) {
      var expandedButtons = this.toolbar.querySelectorAll('[aria-expanded="true"]');
      for (var i = 0; i < expandedButtons.length; i++) {
        expandedButtons[i].setAttribute('aria-expanded', 'false');
      }
    }
    // Limpiar el contexto guardado si el menú se cierra sin seleccionar
    this.toolbarMenuContext = null;
    this._hideBackdrop('toolbarMenu');
  };

  /**
   * Renderiza todos los bloques
   * @param {number} focusBlockId - ID del bloque que debe recibir el foco (opcional)
   */
  meWYSE.prototype.render = function(focusBlockId) {
    var self = this;

    // Ocultar la toolbar de tabla: tras un render las referencias DOM (tabla)
    // pueden quedar obsoletas; reaparecerá con el siguiente foco/selección.
    this.hideTableToolbar();

    // Si estamos añadiendo un nuevo bloque (focusBlockId existe), verificar si ya existe en el DOM
    // Solo añadir el nuevo bloque si NO existe en el DOM aún
    if (focusBlockId) {
      // Verificar si el bloque ya tiene un elemento DOM
      var existingElement = this.container.querySelector('[data-block-id="' + focusBlockId + '"]');

      if (!existingElement) {
        // El bloque NO existe en el DOM, es un bloque nuevo - insertarlo
        var newBlock = null;
        var newBlockIndex = -1;

        for (var i = 0; i < this.blocks.length; i++) {
          if (this.blocks[i].id === focusBlockId) {
            newBlock = this.blocks[i];
            newBlockIndex = i;
            break;
          }
        }

        // Guard del fast-path incremental: si el bloque nuevo es NO-lista y se
        // inserta ENTRE dos ítems de lista, PARTIRÍA el grupo (el <ul>/<ol> se
        // dividiría en dos). El fast-path no sabe re-partir el wrapper → forzar
        // el render() completo (fallback correcto) anulando newBlock aquí.
        if (newBlock && !this._isListBlockType(newBlock.type)) {
          var v_ib_prev = newBlockIndex > 0 ? this.blocks[newBlockIndex - 1] : null;
          var v_ib_next = newBlockIndex < this.blocks.length - 1 ? this.blocks[newBlockIndex + 1] : null;
          if (v_ib_prev && v_ib_next &&
              this._isListBlockType(v_ib_prev.type) && this._isListBlockType(v_ib_next.type)) {
            newBlock = null;
          }
        }

        if (newBlock) {
          // Para listas, necesitamos manejar la agrupacion
          var isListType = newBlock.type === 'bulletList' || newBlock.type === 'numberList' || newBlock.type === 'checklist';

          if (isListType) {
            // Verificar si el bloque anterior es del mismo tipo de lista
            var prevBlock = newBlockIndex > 0 ? this.blocks[newBlockIndex - 1] : null;
            var nextBlock = newBlockIndex < this.blocks.length - 1 ? this.blocks[newBlockIndex + 1] : null;

            if (prevBlock && prevBlock.type === newBlock.type) {
              // El bloque anterior es del mismo tipo, buscar su wrapper y añadir ahi
              var prevBlockElement = this.container.querySelector('[data-block-id="' + prevBlock.id + '"]');
              if (prevBlockElement && prevBlockElement.parentNode &&
                  (prevBlockElement.parentNode.tagName === 'UL' || prevBlockElement.parentNode.tagName === 'OL')) {
                var listWrapper = prevBlockElement.parentNode;
                var newBlockElement = this.createBlockElement(newBlock);

                // Insertar despues del bloque anterior
                if (prevBlockElement.nextSibling) {
                  listWrapper.insertBefore(newBlockElement, prevBlockElement.nextSibling);
                } else {
                  listWrapper.appendChild(newBlockElement);
                }

                // Enfocar el nuevo elemento
                this.focusNewBlock(newBlockElement);
                return;
              }
            } else if (nextBlock && nextBlock.type === newBlock.type) {
              // El bloque siguiente es del mismo tipo, buscar su wrapper y añadir al inicio
              var nextBlockElement = this.container.querySelector('[data-block-id="' + nextBlock.id + '"]');
              if (nextBlockElement && nextBlockElement.parentNode &&
                  (nextBlockElement.parentNode.tagName === 'UL' || nextBlockElement.parentNode.tagName === 'OL')) {
                var listWrapper = nextBlockElement.parentNode;
                var newBlockElement = this.createBlockElement(newBlock);
                listWrapper.insertBefore(newBlockElement, nextBlockElement);

                this.focusNewBlock(newBlockElement);
                return;
              }
            }

            // Crear nuevo wrapper de lista
            var newBlockElement = this.createBlockElement(newBlock);
            var listWrapper;
            if (newBlock.type === 'bulletList') {
              listWrapper = document.createElement('ul');
              listWrapper.className = 'mewyse-list-group';
            } else if (newBlock.type === 'numberList') {
              listWrapper = document.createElement('ol');
              listWrapper.className = 'mewyse-list-group';
            } else {
              listWrapper = document.createElement('ul');
              listWrapper.className = 'mewyse-list-group mewyse-checklist-group';
            }
            listWrapper.appendChild(newBlockElement);

            // Insertar el wrapper en la posicion correcta
            if (newBlockIndex === this.blocks.length - 1) {
              this.container.appendChild(listWrapper);
            } else {
              var nextBlockEl = this.container.querySelector('[data-block-id="' + this.blocks[newBlockIndex + 1].id + '"]');
              if (nextBlockEl) {
                // Si el siguiente es una lista, insertar antes de su wrapper
                var insertBefore = nextBlockEl.parentNode.tagName === 'UL' || nextBlockEl.parentNode.tagName === 'OL'
                  ? nextBlockEl.parentNode
                  : nextBlockEl;
                this.container.insertBefore(listWrapper, insertBefore);
              } else {
                this.container.appendChild(listWrapper);
              }
            }

            this.focusNewBlock(newBlockElement);
            return;
          }

          // Bloque no es lista - insertar normalmente
          var newBlockElement = this.createBlockElement(newBlock);

          // Insertar el bloque en la posición correcta
          if (newBlockIndex === this.blocks.length - 1) {
            // Es el último bloque, simplemente añadir al final
            this.container.appendChild(newBlockElement);
          } else {
            // Insertar antes del bloque siguiente
            var nextBlock = this.blocks[newBlockIndex + 1];
            var nextBlockElement = this.container.querySelector('[data-block-id="' + nextBlock.id + '"]');
            if (nextBlockElement) {
              // Si el siguiente es una lista, insertar antes de su wrapper
              var insertBefore = nextBlockElement.parentNode &&
                (nextBlockElement.parentNode.tagName === 'UL' || nextBlockElement.parentNode.tagName === 'OL')
                ? nextBlockElement.parentNode
                : nextBlockElement;
              this.container.insertBefore(newBlockElement, insertBefore);
            } else {
              // Si no encontramos el siguiente, añadir al final
              this.container.appendChild(newBlockElement);
            }
          }

          // Enfocar el nuevo bloque
          this.focusNewBlock(newBlockElement);

          return; // Salir temprano, no hacer render completo
        }
      }
      // Si existingElement existe, significa que el bloque ya está en el DOM
      // No hacer nada aquí, seguir con el render completo más abajo
    }

    // Render completo: solo cuando NO estamos añadiendo un nuevo bloque
    // Guardar el foco actual antes de renderizar
    var focusedBlockId = focusBlockId || null; // Usar el focusBlockId si se proporciona
    var selection = null;
    var activeElement = document.activeElement;

    // Si no se proporciona focusBlockId, intentar capturar del elemento activo
    // Solo si el elemento activo está DENTRO de este editor: con varios editores en
    // la página (cuyos bloques pueden compartir id, p. ej. ambos `1`), el foco de
    // OTRO editor haría que este "heredase" su blockId y se auto-enfocara tras el
    // render (setTimeout de abajo), colapsando cualquier selección hecha aquí.
    if (!focusedBlockId && activeElement && activeElement.isContentEditable &&
        this.container && this.container.contains(activeElement)) {
      var blockElement = activeElement.closest('[data-block-id]');
      if (blockElement) {
        focusedBlockId = parseInt(blockElement.getAttribute('data-block-id'));
        // Guardar posición del cursor
        try {
          var sel = window.getSelection();
          if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            selection = {
              startOffset: range.startOffset,
              endOffset: range.endOffset
            };
          }
        } catch(e) {}
      }
    }

    this.container.innerHTML = '';
    // El innerHTML='' acaba de desconectar el overlay de selección cross-block
    // del DOM; soltar la referencia para que createSelectionOverlay() lo recree
    // dentro del nuevo container (si no, los rects se pintan en un nodo huérfano
    // y la selección deja de verse tras el primer render).
    this.crossBlockOverlay = null;

    // Renderizar bloques con agrupacion de listas (incluyendo anidación por indentLevel)
    var i = 0;
    while (i < this.blocks.length) {
      var block = this.blocks[i];

      // Verificar si es un tipo de lista que necesita agrupacion
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var result = this._buildNestedListWrapper(this.blocks, i);
        self.container.appendChild(result.wrapper);
        i += result.consumed;
      } else {
        // Bloque normal (no es lista)
        var blockElement = self.createBlockElement(block);
        self.container.appendChild(blockElement);
        i++;
      }
    }

    // Recrear botón de resumen flotante solo si está habilitado y NO hay toolbar
    // (con toolbar se usa this.toolbarSummaryButton en su lugar).
    if (this.showSummary && !this.showToolbar) {
      this.createSummaryButton();
    }

    // Modo readOnly: desactivar la edición de cualquier descendiente que
    // haya sido marcado contenteditable=true (bloques, celdas de tabla,
    // inner spans de checklist, etc.) en una sola pasada. Los listeners
    // de mutación ya se omiten en `attachBlockEvents`; este paso garantiza
    // además que el navegador no permita edición nativa.
    if (this.readOnly && this.container) {
      var editables = this.container.querySelectorAll('[contenteditable="true"]');
      for (var ri = 0; ri < editables.length; ri++) {
        editables[ri].setAttribute('contenteditable', 'false');
      }
    }

    // Restaurar el foco si había uno.
    // Si el caller activó `_skipAutoFocus` es porque va a colocar el foco
    // síncronamente — saltarse este setTimeout evita un re-focus async que
    // rompería el gesto del usuario en móvil (oculta el teclado virtual).
    if (focusedBlockId !== null && !this._skipAutoFocus) {
      setTimeout(function() {
        var blockElement = self.container.querySelector('[data-block-id="' + focusedBlockId + '"]');
        if (blockElement) {
          var contentEditable = blockElement.querySelector('[contenteditable="true"]');
          // Si el bloque es directamente contenteditable (no tiene un hijo contenteditable)
          if (!contentEditable && blockElement.getAttribute('contenteditable') === 'true') {
            contentEditable = blockElement;
          }
          if (contentEditable) {
            contentEditable.focus();
            try {
              var range = document.createRange();
              var sel = window.getSelection();

              // Si hay una selección guardada, restaurarla
              if (selection && selection.startOffset !== undefined) {
                if (contentEditable.firstChild && contentEditable.firstChild.nodeType === 3) {
                  var offset = Math.min(selection.startOffset, contentEditable.firstChild.length);
                  range.setStart(contentEditable.firstChild, offset);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                } else if (contentEditable.childNodes.length > 0) {
                  range.setStart(contentEditable.childNodes[0], 0);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                } else {
                  range.setStart(contentEditable, 0);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                }
              } else {
                // Si no hay selección guardada, colocar el cursor al final
                range.selectNodeContents(contentEditable);
                range.collapse(false); // false = colapsar al final
                sel.removeAllRanges();
                sel.addRange(range);
              }
            } catch(e) {}
          }
        }
      }, 10);
    }
  };

  /**
   * Crea el elemento DOM de un bloque (elemento semantico directo)
   * @param {Object} block - Datos del bloque
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createBlockElement = function(block) {
    var self = this;
    var element;

    // Crear el elemento semantico segun el tipo
    switch (block.type) {
      case 'heading1':
        element = document.createElement('h1');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', self.t('placeholders.heading1'));
        this.attachBlockEvents(element, block.id);
        break;

      case 'heading2':
        element = document.createElement('h2');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', self.t('placeholders.heading2'));
        this.attachBlockEvents(element, block.id);
        break;

      case 'heading3':
        element = document.createElement('h3');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', self.t('placeholders.heading3'));
        this.attachBlockEvents(element, block.id);
        break;

      case 'quote':
        element = document.createElement('blockquote');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', self.t('placeholders.quote'));
        this.attachBlockEvents(element, block.id);
        break;

      case 'code':
        element = document.createElement('pre');

        // Selector de lenguaje (solo si el resaltado está activo). No editable,
        // ancla arriba a la derecha del bloque; al cambiar, fija block.language y
        // re-pinta. Usamos mousedown+preventDefault para no perder el foco/caret.
        if (self.codeHighlight) {
          var v_lang_select = document.createElement('select');
          v_lang_select.className = 'mewyse-code-lang';
          v_lang_select.setAttribute('contenteditable', 'false');
          v_lang_select.setAttribute('aria-label', self.t('tooltips.codeLanguage'));
          for (var v_lang_key in CODE_LANGUAGES) {
            if (!CODE_LANGUAGES.hasOwnProperty(v_lang_key)) continue;
            var v_lang_opt = document.createElement('option');
            v_lang_opt.value = v_lang_key;
            v_lang_opt.textContent = CODE_LANGUAGES[v_lang_key];
            v_lang_select.appendChild(v_lang_opt);
          }
          v_lang_select.value = (block.language && CODE_LANGUAGES.hasOwnProperty(block.language))
            ? block.language : '';
          v_lang_select.onchange = function() {
            var v_blk = self.getBlock(block.id);
            if (v_blk) {
              v_blk.language = v_lang_select.value || null;
              self._rehighlightCodeElement(code, block.id);
              self.triggerChange();
            }
          };
          element.appendChild(v_lang_select);
        }

        var code = document.createElement('code');
        code.contentEditable = true;
        // Marca para que el listener de input lea textContent (no innerHTML) y así
        // los <span> del resaltado nunca entren al modelo (que queda en texto plano).
        code.setAttribute('data-mewyse-code', '1');
        var v_code_text = block.content || '';
        if (self.codeHighlight && window.hljs) {
          // Resaltado inicial (el markup queda "congelado" mientras se edita y se
          // re-pinta al perder el foco).
          code.innerHTML = self._highlightCode(v_code_text, block.language);
        } else {
          // Sin resaltado: textContent evita interpretar el texto como HTML.
          code.textContent = v_code_text;
        }
        element.appendChild(code);
        this.attachBlockEvents(code, block.id);

        // Re-pintar el resaltado al perder el foco (sin gimnasia de caret).
        if (self.codeHighlight) {
          code.addEventListener('blur', function() {
            self._rehighlightCodeElement(code, block.id);
          });
        }
        break;

      case 'bulletList':
        // Para listas, el bloque es el <li> directamente
        // El <ul> wrapper se crea en render()
        element = document.createElement('li');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', self.t('placeholders.listItem'));
        this.attachBlockEvents(element, block.id);
        break;

      case 'numberList':
        // Para listas ordenadas, el bloque es el <li> directamente
        // El <ol> wrapper se crea en render()
        element = document.createElement('li');
        element.contentEditable = true;
        element.innerHTML = block.content || '';
        element.setAttribute('data-placeholder', self.t('placeholders.listItem'));
        this.attachBlockEvents(element, block.id);
        break;

      case 'checklist':
        // Para checklist, creamos un <li> con checkbox
        element = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = block.checked || false;
        checkbox.onchange = function() {
          block.checked = checkbox.checked;
          if (checkbox.checked) {
            element.classList.add('checked');
          } else {
            element.classList.remove('checked');
          }
          self.triggerChange();
        };
        var contentSpan = document.createElement('span');
        contentSpan.className = 'mewyse-checklist-content';
        contentSpan.contentEditable = true;
        contentSpan.innerHTML = block.content || '';
        contentSpan.setAttribute('data-placeholder', self.t('placeholders.task'));
        element.appendChild(checkbox);
        element.appendChild(contentSpan);
        if (block.checked) {
          element.classList.add('checked');
        }
        this.attachBlockEvents(contentSpan, block.id);
        break;

      case 'table':
        // Las tablas mantienen su wrapper
        element = this.createTableElement(block);
        break;

      case 'image':
        // Las imagenes mantienen su wrapper
        element = this.createImageElement(block);
        break;

      case 'video':
        element = this.createVideoElement(block);
        break;

      case 'audio':
        element = this.createAudioElement(block);
        break;

      case 'divider':
        element = document.createElement('hr');
        break;

      case 'pageBreak':
        // Bloque estructural no editable (como divider). El marcador visual solo
        // se ve en el editor; el export emite un <div class="mewyse-page-break">.
        element = document.createElement('div');
        element.className = 'mewyse-page-break';
        element.contentEditable = false;
        var v_pbLabel = document.createElement('span');
        v_pbLabel.className = 'mewyse-page-break-label';
        v_pbLabel.textContent = self.t('blockTypes.pageBreak');
        element.appendChild(v_pbLabel);
        break;

      case 'callout':
        // Aviso: contenedor con variante de color + icono no editable (que abre
        // el selector de variante) + contenido editable.
        var v_variant = CALLOUT_VARIANTS[block.calloutVariant] ? block.calloutVariant : 'info';
        element = document.createElement('div');
        element.className = 'mewyse-callout mewyse-callout-' + v_variant;
        var v_coBtn = document.createElement('button');
        v_coBtn.className = 'mewyse-callout-variant';
        v_coBtn.setAttribute('contenteditable', 'false');
        v_coBtn.setAttribute('type', 'button');
        v_coBtn.title = self.t('callout.variant');
        v_coBtn.innerHTML = WYSIWYG_ICONS.callout;
        v_coBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.showCalloutVariantMenu(block.id, v_coBtn);
        };
        var v_coContent = document.createElement('div');
        v_coContent.className = 'mewyse-callout-content';
        v_coContent.contentEditable = true;
        v_coContent.innerHTML = block.content || '';
        v_coContent.setAttribute('data-placeholder', self.t('placeholders.slashCommand'));
        element.appendChild(v_coBtn);
        element.appendChild(v_coContent);
        this.attachBlockEvents(v_coContent, block.id);
        break;

      case 'toggle':
        // Desplegable ligero: cabecera con triángulo (no editable) + título
        // editable, y cuerpo editable (inline/multilínea, sin sub-bloques). El
        // colapso lo controla la clase mewyse-toggle-collapsed. En vez de
        // <details> nativo (cuyo click de summary pelea con la edición) usamos un
        // div con caret propio; el export sí emite <details>/<summary>.
        var v_tg_collapsed = block.collapsed === true;
        element = document.createElement('div');
        element.className = 'mewyse-toggle' + (v_tg_collapsed ? ' mewyse-toggle-collapsed' : '');

        var v_tg_head = document.createElement('div');
        v_tg_head.className = 'mewyse-toggle-head';

        var v_tg_caret = document.createElement('button');
        v_tg_caret.className = 'mewyse-toggle-caret';
        v_tg_caret.setAttribute('contenteditable', 'false');
        v_tg_caret.setAttribute('type', 'button');
        v_tg_caret.setAttribute('aria-label', self.t('toggle.toggle'));
        v_tg_caret.innerHTML = WYSIWYG_ICONS.toggleCaret;
        v_tg_caret.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggleCollapse(block.id);
        };

        var v_tg_title = document.createElement('div');
        v_tg_title.className = 'mewyse-toggle-title';
        v_tg_title.contentEditable = true;
        v_tg_title.setAttribute('data-mewyse-field', 'toggleTitle');
        v_tg_title.innerHTML = block.toggleTitle || '';
        v_tg_title.setAttribute('data-placeholder', self.t('placeholders.toggleTitle'));

        v_tg_head.appendChild(v_tg_caret);
        v_tg_head.appendChild(v_tg_title);

        var v_tg_body = document.createElement('div');
        v_tg_body.className = 'mewyse-toggle-body';
        v_tg_body.contentEditable = true;
        v_tg_body.innerHTML = block.content || '';
        v_tg_body.setAttribute('data-placeholder', self.t('placeholders.toggleBody'));

        element.appendChild(v_tg_head);
        element.appendChild(v_tg_body);

        // Editables dedicados (no attachBlockEvents): el cuerpo es texto rico
        // "contenido" (Enter = salto nativo dentro del div, sin partir en bloques);
        // el título persiste en toggleTitle y salta al cuerpo con Enter.
        this._attachToggleEditable(v_tg_title, block.id, true);
        this._attachToggleEditable(v_tg_body, block.id, false);
        break;

      case 'toc':
        // Tabla de contenidos: bloque no editable cuyo contenido se DERIVA de los
        // títulos del documento (no se almacena). Se reconstruye en cada render y
        // en triggerChange (_refreshTocBlocks) para reflejar los títulos en vivo.
        element = this._buildTocElement(block.id);
        break;

      default:
        if (!VALID_BLOCK_TYPES[block.type]) {
          // Tipo DESCONOCIDO (preservado por _sanitizeBlock para no perder datos):
          // placeholder de SOLO LECTURA. NUNCA se hace innerHTML del contenido
          // crudo (no ha pasado por el sanitizer de contenido) — solo se muestra,
          // escapado, el tipo del bloque. El dato íntegro sigue en getJSON.
          element = document.createElement('div');
          element.className = 'mewyse-unknown-block';
          element.setAttribute('contenteditable', 'false');
          element.setAttribute('title', self.t('misc.unknownBlock'));
          var v_unknown_label = document.createElement('span');
          v_unknown_label.className = 'mewyse-unknown-block-label';
          v_unknown_label.textContent = self.t('misc.unknownBlock') + ' (' + String(block.type) + ')';
          element.appendChild(v_unknown_label);
        } else {
          // paragraph
          element = document.createElement('p');
          element.contentEditable = true;
          element.innerHTML = block.content || '';
          element.setAttribute('data-placeholder', self.t('placeholders.slashCommand'));
          this.attachBlockEvents(element, block.id);
        }
    }

    // Añadir clase y atributos comunes
    element.classList.add('mewyse-block');
    element.setAttribute('data-block-id', block.id);
    element.setAttribute('data-block-type', block.type);

    // Aplicar customClass (styleFormats) si existe
    if (block.customClass && typeof block.customClass === 'string') {
      element.classList.add(block.customClass);
    }

    // Alineación a nivel de bloque (texto). Las imágenes/tablas usan su propio
    // mecanismo (advanced.alignment / tableStyle), por eso se excluyen aquí.
    if (block.alignment && TEXT_ALIGN_BLOCK_TYPES[block.type]) {
      element.style.textAlign = block.alignment;
    }

    // Sangría de párrafo (margin-inline-start). Solo bloques de texto indentables;
    // las listas usan su anidado (indentLevel), no esto.
    if (block.indent && INDENTABLE_TEXT_BLOCK_TYPES[block.type]) {
      element.style.marginInlineStart = (block.indent * INDENT_STEP_PX) + 'px';
    }

    // Eventos para drag & drop
    this.attachDragDropEvents(element, block.id);

    // Eventos para mostrar el handle flotante
    this.attachFloatingHandleEvents(element, block.id);

    return element;
  };

  /**
   * Adjunta eventos de drag & drop a un elemento de bloque
   * @param {HTMLElement} element
   * @param {number} blockId
   */
  meWYSE.prototype.attachDragDropEvents = function(element, blockId) {
    var self = this;

    // Helper para comprobar si hay un bloque siendo arrastrado (compatible con null/undefined)
    var hasActiveBlockDrag = function() {
      return self.draggedBlockId != null && self.draggedBlockId !== blockId;
    };

    element.ondragover = function(e) {
      // Drag de bloque (reordenar)
      if (hasActiveBlockDrag()) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        element.classList.add('drag-over');
        return;
      }
      // Drag de imagen interna (mover entre bloques)
      if (self._draggedImage) {
        e.preventDefault();
        try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
      }
      // Para drag de archivos externos, NO hacer preventDefault aquí — el handler
      // del container se encarga (evita que el block intercepte el drop).
    };

    element.ondragleave = function(e) {
      element.classList.remove('drag-over');
    };

    element.ondrop = function(e) {
      // Si es drag de imagen interna, delegar al manejo específico
      if (self._draggedImage) {
        // Si el target está dentro de una celda, el handler de la celda se encargará
        var cellTarget = e.target && e.target.closest ? e.target.closest('td, th') : null;
        if (cellTarget) return; // dejar propagar al handler de la celda
        e.preventDefault();
        e.stopPropagation();
        self._dropImageIntoBlock(element);
        return;
      }

      // Si es reordenamiento de bloque, manejar aquí
      if (hasActiveBlockDrag()) {
        e.preventDefault();
        e.stopPropagation();
        element.classList.remove('drag-over');
        self.moveBlock(self.draggedBlockId, blockId);
        return;
      }

      // Caso: drag de archivos externos (imágenes del OS).
      // NO hacer preventDefault ni stopPropagation — dejar que burbujee al
      // handler del container (_imageDropHandler) para procesar el archivo.
      element.classList.remove('drag-over');
    };
  };

  /**
   * Adjunta eventos para mostrar/ocultar el handle flotante
   * @param {HTMLElement} element
   * @param {number} blockId
   */
  meWYSE.prototype.attachFloatingHandleEvents = function(element, blockId) {
    var self = this;

    // En modo readOnly el floating handle no se crea (ver `init`). Sin handle
    // no tiene sentido enganchar mouseenter/mouseleave/focus que lo posicionan
    // u oculten — además `self.floatingHandle` sería null y los handlers
    // explotarían al referenciarlo.
    if (this.readOnly) return;

    // El handle se muestra cuando el bloque RECIBE EL FOCO. Eso se gestiona de
    // forma centralizada en el listener `focusin` del container (focusin
    // burbujea y cubre todas las rutas de render). Aquí solo queda el caso
    // especial de los separadores, que no reciben foco ni selección y siguen
    // usando hover como única vía de acceso al handle.
    var block = this.getBlock(blockId);
    if (block && (block.type === 'divider' || block.type === 'pageBreak')) {
      element.addEventListener('mouseenter', function() {
        if (self.floatingHandleHideTimeout) {
          clearTimeout(self.floatingHandleHideTimeout);
          self.floatingHandleHideTimeout = null;
        }
        self.positionFloatingHandle(element, blockId);
      });
      element.addEventListener('mouseleave', function(e) {
        var relatedTarget = e.relatedTarget;
        if (!relatedTarget || !self.floatingHandle.contains(relatedTarget)) {
          self.floatingHandleHideTimeout = setTimeout(function() {
            self.hideFloatingHandle();
          }, 100);
        }
      });
    }
  };

  /**
   * Crea el elemento de tabla (con wrapper)
   * @param {Object} block - Datos del bloque
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createTableElement = function(block) {
    var self = this;

    // Crear wrapper para la tabla
    var tableWrapper = document.createElement('div');
    tableWrapper.className = 'mewyse-table-wrapper';

    var table = document.createElement('table');
    // Solo aplicar inline el tableStyle personalizado (desde "Propiedades de la tabla").
    // Sin tableStyle: sin style inline — los defaults visuales vienen del CSS inyectado
    // (.mewyse-block-content table { width:100%; border-collapse:collapse }).
    if (typeof block.tableStyle === 'string' && block.tableStyle) {
      table.setAttribute('style', block.tableStyle);
    }

    // Si ya hay contenido (tabla cargada), parsearlo
    if (block.content && block.content !== '') {
      table.innerHTML = block.content;

      // Hacer todas las celdas editables y añadir controles
      // NO aplicamos border/padding default inline: los cubre el CSS inyectado
      // durante la edición, pero el export queda limpio si el user no configuró nada.
      var cells = table.querySelectorAll('td, th');
      for (var c = 0; c < cells.length; c++) {
        var cell = cells[c];

        // Verificar si la celda contiene una imagen (con o sin la clase mewyse-image)
        var imgInCell = cell.querySelector('img');
        if (imgInCell) {
          // Asegurar que tenga la clase para que los selectores funcionen
          if (!imgInCell.classList.contains('mewyse-image')) {
            imgInCell.classList.add('mewyse-image');
          }
          // Si la imagen está dentro de un <p> (HTML legacy), envolverla en el wrapper estándar
          if (!imgInCell.closest('.mewyse-image-wrapper')) {
            var wrapper = document.createElement('div');
            wrapper.className = 'mewyse-image-wrapper';
            var container = document.createElement('div');
            container.className = 'mewyse-image-container';
            imgInCell.parentNode.replaceChild(wrapper, imgInCell);
            container.appendChild(imgInCell);
            wrapper.appendChild(container);
            // Limpiar el <p> o texto vacío que quedó alrededor
            var pParent = wrapper.parentNode;
            if (pParent && pParent.tagName === 'P') {
              // Sacar el wrapper fuera del <p>
              var cellEl = pParent.parentNode;
              cellEl.insertBefore(wrapper, pParent);
              if (!pParent.textContent.trim() && pParent.children.length === 0) {
                cellEl.removeChild(pParent);
              }
            }
          }
          imgInCell.onclick = function(e) {
            e.stopPropagation();
            var cellElement = this.closest('td, th');
            self.selectImage(this, null, true, cellElement);
          };
          imgInCell.setAttribute('data-in-table', 'true');
          imgInCell.setAttribute('tabindex', '0');
          // Habilitar drag & drop
          self._attachImageDragHandlers(imgInCell, { source: 'cell', tableCell: cell });
          continue;
        }

        var existingContent = cell.innerHTML.trim();
        var cellContent;

        if (cell.firstElementChild && ['P', 'H1', 'H2', 'H3', 'BLOCKQUOTE', 'PRE', 'UL', 'OL'].indexOf(cell.firstElementChild.tagName) !== -1) {
          cellContent = cell.firstElementChild;
        } else {
          cellContent = document.createElement('p');
          cellContent.innerHTML = existingContent || '';
          cell.innerHTML = '';
          cell.appendChild(cellContent);
        }

        cellContent.contentEditable = true;
        // Estilos del <p> interno cubiertos por CSS inyectado (table td > p)

        this.attachTableCellEvents(cellContent, block.id);
      }
    } else {
      // Crear tabla 3x3 por defecto (sin border/padding inline — los cubre el CSS inyectado)
      var tbody = document.createElement('tbody');
      for (var r = 0; r < 3; r++) {
        var row = document.createElement('tr');
        for (var col = 0; col < 3; col++) {
          var cell = document.createElement('td');

          var cellContent = document.createElement('p');
          cellContent.contentEditable = true;
          cellContent.setAttribute('data-placeholder', '');

          cell.appendChild(cellContent);
          this.attachTableCellEvents(cellContent, block.id);
          row.appendChild(cell);
        }
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
    }

    // Añadir controles de fila/columna
    this.addTableControls(table, block.id);
    this.addTableSelectionEvents(table, block.id);
    this.enableColumnResizing(table, block.id);

    tableWrapper.appendChild(table);

    // Los botones +fila/+columna se eliminaron: ahora se insertan filas y
    // columnas desde la toolbar contextual de tabla.

    return tableWrapper;
  };

  /**
   * Crea el elemento de imagen (con wrapper)
   * @param {Object} block - Datos del bloque
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createImageElement = function(block) {
    var self = this;

    var imageWrapper = document.createElement('div');
    imageWrapper.className = 'mewyse-image-wrapper';

    var imageContainer = document.createElement('div');
    imageContainer.className = 'mewyse-image-container';

    var img = document.createElement('img');
    img.className = 'mewyse-image';

    if (typeof block.content === 'object' && block.content.blob) {
      img.src = block.content.blob;
      img.alt = block.content.fileName || 'Imagen';
      // Dimensiones OPCIONALES: solo se aplican al style/atributos si el bloque
      // las tiene. Sin ellas, la imagen se muestra a su tamaño natural (el CSS
      // .mewyse-image ya la limita con max-width:100%).
      if (typeof block.content.width === 'number' && block.content.width > 0) {
        img.style.width = block.content.width + 'px';
        img.setAttribute('data-original-width', block.content.width);
      }
      if (typeof block.content.height === 'number' && block.content.height > 0) {
        img.style.height = block.content.height + 'px';
        img.setAttribute('data-original-height', block.content.height);
      }

      // Aplicar opciones avanzadas (border/margin/alignment)
      this._applyImageAdvancedStyles(img, imageWrapper, block.content.advanced);
    }

    imageContainer.appendChild(img);

    // Botón para editar dimensiones
    var editImageBtn = document.createElement('button');
    editImageBtn.className = 'mewyse-image-edit-btn';
    editImageBtn.innerHTML = WYSIWYG_ICONS.gear;
    editImageBtn.title = self.t('tooltips.editDimensions');
    editImageBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.editImageDimensions(block.id, img);
    };
    imageContainer.appendChild(editImageBtn);

    // Ratio: de las dimensiones del bloque si existen; si no (imagen a tamaño
    // natural, sin dims), de las dimensiones naturales del <img>. Se recalcula
    // al iniciar el arrastre por si la imagen aún no había cargado al renderizar.
    var v_get_aspect_ratio = function() {
      if (block.content && block.content.width && block.content.height) {
        return block.content.width / block.content.height;
      }
      if (img.naturalWidth && img.naturalHeight) {
        return img.naturalWidth / img.naturalHeight;
      }
      return 1;
    };
    var aspectRatio = v_get_aspect_ratio();

    // Crea un handle de redimensionado para una esquina. v_sign invierte el
    // sentido del arrastre: +1 en la esquina inferior-derecha (arrastrar hacia
    // fuera = abajo/derecha agranda) y -1 en la superior-izquierda (arrastrar
    // hacia fuera = arriba/izquierda agranda). La imagen está en flujo, así que
    // su esquina superior-izquierda queda anclada; solo cambia el tamaño.
    var v_make_resize_handle = function(v_corner_class, v_sign) {
      var handle = document.createElement('div');
      handle.className = 'mewyse-image-resize-handle ' + v_corner_class;
      handle.title = self.t('tooltips.dragToResize');

      var isResizing = false;
      var startX, startY, startWidth;

      var mousemoveHandler = function(e) {
        if (!isResizing) return;
        var deltaX = e.clientX - startX;
        var deltaY = e.clientY - startY;
        var delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        var newWidth = startWidth + v_sign * delta;
        var newHeight = Math.round(newWidth / aspectRatio);
        if (newWidth < 50) {
          newWidth = 50;
          newHeight = Math.round(newWidth / aspectRatio);
        }
        img.style.width = newWidth + 'px';
        img.style.height = newHeight + 'px';
      };

      var mouseupHandler = function(e) {
        if (!isResizing) return;
        isResizing = false;
        document.body.style.cursor = '';
        imageContainer.classList.remove('mewyse-image-resizing');
        document.body.style.userSelect = '';

        // Remover los listeners de este arrastre (se re-añaden en el próximo mousedown)
        document.removeEventListener('mousemove', mousemoveHandler);
        document.removeEventListener('mouseup', mouseupHandler);

        var finalWidth = parseInt(img.style.width);
        var finalHeight = parseInt(img.style.height);
        if (block.content) {
          block.content.width = finalWidth;
          block.content.height = finalHeight;
        }
        self.triggerChange();
        // Tras redimensionar, dejar la imagen seleccionada/enfocada
        self.selectImage(img, block.id, false);
      };

      handle.onmousedown = function(e) {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        // Recalcular ratio ahora (la imagen ya está cargada) y partir del ancho
        // real renderizado si el bloque no tenía dimensiones fijadas.
        aspectRatio = v_get_aspect_ratio();
        startWidth = parseInt(img.style.width) || img.offsetWidth || 200;
        document.body.style.cursor = 'nwse-resize';
        imageContainer.classList.add('mewyse-image-resizing');
        document.body.style.userSelect = 'none';
        // Registrar los listeners SOLO durante el arrastre: así funciona en cada
        // uso (no solo el primero) y no quedan listeners colgando en document.
        document.addEventListener('mousemove', mousemoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
      };

      return handle;
    };

    // Handle inferior-derecho (existente) + superior-izquierdo (nuevo).
    imageContainer.appendChild(v_make_resize_handle('mewyse-image-resize-handle-se', 1));
    imageContainer.appendChild(v_make_resize_handle('mewyse-image-resize-handle-nw', -1));
    imageWrapper.appendChild(imageContainer);

    img.onclick = function(e) {
      e.stopPropagation();
      self.selectImage(img, block.id, false);
    };

    img.setAttribute('data-block-id', block.id);
    img.setAttribute('tabindex', '0');

    // Habilitar drag & drop para mover entre bloques/celdas
    self._attachImageDragHandlers(img, { source: 'block', blockId: block.id });

    return imageWrapper;
  };

  /**
   * Adjunta eventos a un elemento de bloque
   * @param {HTMLElement} element
   * @param {number} blockId
   */
  meWYSE.prototype.attachBlockEvents = function(element, blockId) {
    var self = this;

    // En modo readOnly, el editor solo visualiza: no registramos listeners
    // de input/keydown/keyup/paste/click ni hacemos editable el bloque.
    // La selección nativa del navegador para copiar/pegar fuera sigue
    // funcionando porque solo depende del contenido del DOM.
    if (this.readOnly) return;

    // Event listener para input
    element.addEventListener('input', function(e) {
      // En bloques de código el modelo se mantiene en TEXTO PLANO: leemos
      // textContent para que los <span> del resaltado de sintaxis no se persistan.
      if (element.getAttribute('data-mewyse-code') === '1') {
        self.updateBlockContent(blockId, element.textContent || '');
      } else {
        self.updateBlockContent(blockId, element.innerHTML);
      }
    });

    // Event listener para keydown
    element.addEventListener('keydown', function(e) {
      self.handleKeyDown(e, blockId, element);
    });

    // Event listener para keyup (para detectar "/")
    element.addEventListener('keyup', function(e) {
      self.handleKeyUp(e, blockId, element);
    });

    // Event listener para paste (pegado)
    element.addEventListener('paste', function(e) {
      self.handlePaste(e, blockId, element);
    });

    // Event listener para mousedown (selección múltiple)
    element.addEventListener('mousedown', function(e) {
      self.handleBlockClick(e, blockId);
    });
  };

  /**
   * Engancha los listeners de un editable del bloque toggle (título o cuerpo).
   * No usa attachBlockEvents porque el toggle NO parte en bloques con Enter: el
   * cuerpo se comporta como texto rico contenido (Enter = salto nativo dentro del
   * div) y el título salta al cuerpo con Enter. El formato inline sigue disponible
   * vía la barra flotante de selección y los atajos Ctrl+B/I/U.
   * @param {HTMLElement} v_editable
   * @param {number} v_block_id
   * @param {boolean} v_is_title - true = campo título; false = cuerpo (content)
   */
  meWYSE.prototype._attachToggleEditable = function(v_editable, v_block_id, v_is_title) {
    if (this.readOnly) return;
    var self = this;

    // input: persistir al campo correspondiente del modelo
    v_editable.addEventListener('input', function() {
      if (v_is_title) {
        self.updateBlockField(v_block_id, 'toggleTitle', v_editable.innerHTML);
      } else {
        self.updateBlockContent(v_block_id, v_editable.innerHTML);
      }
    });

    // keydown: atajos de formato + navegación título→cuerpo con Enter
    v_editable.addEventListener('keydown', function(e) {
      var v_mod = e.ctrlKey || e.metaKey;
      if (v_mod && !e.shiftKey && !e.altKey) {
        var v_key = e.key ? e.key.toLowerCase() : '';
        if (v_key === 'b' || v_key === 'i' || v_key === 'u') {
          e.preventDefault();
          document.execCommand(v_key === 'b' ? 'bold' : (v_key === 'i' ? 'italic' : 'underline'));
          self._persistActiveBlockContent();
          return;
        }
      }
      // En el título, Enter (sin shift) salta al cuerpo en vez de insertar salto.
      // Si el toggle está colapsado, se expande primero (el cuerpo oculto no puede
      // recibir foco).
      if (v_is_title && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        var v_block = self.getBlock(v_block_id);
        if (v_block && v_block.collapsed) self.toggleCollapse(v_block_id);
        var v_block_el = self.getBlockElementById(v_block_id);
        var v_body = v_block_el ? v_block_el.querySelector('.mewyse-toggle-body') : null;
        if (v_body) v_body.focus();
      }
      // En el cuerpo, Enter usa el comportamiento nativo del contenteditable
      // (salto DENTRO del div), por eso NO se intercepta aquí.
    });

    // paste: insertar como texto plano (evita meter HTML externo sin sanear)
    v_editable.addEventListener('paste', function(e) {
      e.preventDefault();
      var v_cd = e.clipboardData || window.clipboardData;
      var v_text = '';
      try { v_text = v_cd ? v_cd.getData('text/plain') : ''; } catch (err) {}
      if (v_text) document.execCommand('insertText', false, v_text);
    });

    // mousedown: mantener la coherencia de selección múltiple entre bloques
    v_editable.addEventListener('mousedown', function(e) {
      self.handleBlockClick(e, v_block_id);
    });
  };

  /**
   * Actualiza una propiedad arbitraria de un bloque y notifica el cambio.
   * Usado por el toggle para persistir el título (toggleTitle) sin tocar content.
   * @param {number} blockId
   * @param {string} field
   * @param {*} value
   */
  meWYSE.prototype.updateBlockField = function(blockId, field, value) {
    var block = this.getBlock(blockId);
    if (!block) return;
    block[field] = value;
    this.triggerChange();
  };

  /**
   * Colapsa/expande un bloque toggle. Solo alterna la clase (sin re-render) para
   * no perder el foco/caret del usuario.
   * @param {number} blockId
   */
  meWYSE.prototype.toggleCollapse = function(blockId) {
    var block = this.getBlock(blockId);
    if (!block || block.type !== 'toggle') return;
    block.collapsed = !block.collapsed;
    var v_el = this.getBlockElementById(blockId);
    if (v_el) {
      if (block.collapsed) v_el.classList.add('mewyse-toggle-collapsed');
      else v_el.classList.remove('mewyse-toggle-collapsed');
    }
    this.triggerChange();
  };

  /**
   * Maneja el evento de pegado (paste)
   * @param {ClipboardEvent} e
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.handlePaste = function(e, blockId, element) {
    e.preventDefault();
    var self = this;

    // Obtener el contenido del portapapeles
    var clipboardData = e.clipboardData || (window.clipboardData ? window.clipboardData : null);
    if (!clipboardData) return;

    // Detectar imagen en el clipboard (Ctrl+V tras copiar imagen)
    // Iterar items y si hay un image/*, procesarlo e insertar un bloque imagen.
    // (omitido si la imagen está desactivada por disabledBlocks)
    if (!this._isBlockDisabled('image') && clipboardData.items && clipboardData.items.length > 0) {
      for (var i = 0; i < clipboardData.items.length; i++) {
        var item = clipboardData.items[i];
        if (item.kind === 'file' && item.type && item.type.indexOf('image/') === 0) {
          var file = item.getAsFile();
          if (!file) continue;
          var insertIndex = this.getBlockIndex(blockId);
          if (insertIndex < 0) insertIndex = this.blocks.length - 1;
          insertIndex++;
          // Si el bloque actual está vacío, la imagen lo reemplaza en su sitio
          var v_curBlock = this.getBlock(blockId);
          var v_replaceId = (v_curBlock && typeof v_curBlock.content === 'string' &&
                             v_curBlock.content.trim() === '' && v_curBlock.type !== 'divider') ? blockId : null;
          self._processImageFile(file, function(imgData) {
            if (!imgData) return;
            // Pegado desde el portapapeles: NO fijar width/height (se pasan null)
            // para que la imagen quede a su tamaño natural, sin dimensiones en el
            // style del <img>. createImageBlock omite las claves cuando son null.
            self.createImageBlock(file, imgData.blob, null, null, insertIndex, null, v_replaceId);
          });
          return;
        }
      }
    }

    // getData puede lanzar en navegadores antiguos/IE: proteger con fallback
    var htmlData = '';
    var plainText = '';
    try { htmlData = clipboardData.getData('text/html'); } catch (e) {}
    try { plainText = clipboardData.getData('text/plain'); } catch (e) {}

    // Si pasteAsText está habilitado, forzar siempre plaintext
    if (this.pasteAsText) {
      // Si solo hay HTML, extraer el texto visible
      if (!plainText && htmlData) {
        var tmp = document.createElement('div');
        tmp.innerHTML = htmlData;
        plainText = tmp.textContent || tmp.innerText || '';
      }
      if (plainText && plainText.trim()) {
        this.processPastedPlainText(plainText, blockId, element);
      }
      return;
    }

    // Si hay HTML del portapapeles, procesarlo
    if (htmlData && htmlData.trim()) {
      this.processPastedHTML(htmlData, blockId, element);
    } else if (plainText && plainText.trim()) {
      // Verificar si el texto plano contiene etiquetas HTML
      if (this.containsHTMLTags(plainText)) {
        // Procesar como HTML
        this.processPastedHTML(plainText, blockId, element);
      } else {
        // Procesar como texto plano
        this.processPastedPlainText(plainText, blockId, element);
      }
    }
  };

  /**
   * Verifica si un texto contiene etiquetas HTML
   * @param {string} text
   * @returns {boolean}
   */
  meWYSE.prototype.containsHTMLTags = function(text) {
    // Detectar etiquetas HTML comunes
    var htmlPattern = /<\s*(p|div|span|h[1-6]|ul|ol|li|table|tr|td|th|br|hr|blockquote|pre|code|a|strong|b|em|i|u|s|img)[\s>\/]/i;
    return htmlPattern.test(text);
  };

  /**
   * Sanea HTML eliminando estilos, clases, data attributes y otros atributos innecesarios
   * @param {HTMLElement} element
   * @returns {string}
   */
  meWYSE.prototype.sanitizeHTML = function(element) {
    var self = this;

    // Lista de etiquetas permitidas para formato inline
    var allowedInlineTags = ['B', 'STRONG', 'I', 'EM', 'U', 'S', 'STRIKE', 'DEL', 'A', 'CODE', 'SUB', 'SUP', 'MARK', 'BR'];

    // Lista de atributos permitidos por etiqueta
    var allowedAttributes = {
      'A': ['href', 'title', 'target', 'rel']
    };

    // Atributos data-* específicos de cada átomo meWYSE
    var ATOMIC_DATA_ATTRS = {
      'mewyse-tag':      ['data-tag-id', 'data-tag-name', 'data-tag-color'],
      'mewyse-mention':  ['data-mention-id', 'data-mention-name'],
      'mewyse-emoji':    ['data-emoji'],
      'mewyse-mergetag': ['data-merge-name']
    };

    function escAttr(v) {
      return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    }

    function cleanNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Escapar caracteres HTML especiales en texto
        var text = node.textContent;
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        var tagName = node.tagName;

        // BR se convierte en <br>
        if (tagName === 'BR') {
          return '<br>';
        }

        // SPAN atómico de meWYSE (mewyse-tag / mewyse-mention / mewyse-emoji):
        // se preserva con su clase, sus data-* y se re-aplican los atributos
        // estructurales (contenteditable=false, style del color del tag).
        if (tagName === 'SPAN' && node.classList) {
          var atomicClass = null;
          if (node.classList.contains('mewyse-tag')) atomicClass = 'mewyse-tag';
          else if (node.classList.contains('mewyse-mention')) atomicClass = 'mewyse-mention';
          else if (node.classList.contains('mewyse-emoji')) atomicClass = 'mewyse-emoji';
          else if (node.classList.contains('mewyse-mergetag')) atomicClass = 'mewyse-mergetag';
          if (atomicClass) {
            var atomAttrs = ' class="' + atomicClass + '"';
            var keepData = ATOMIC_DATA_ATTRS[atomicClass] || [];
            for (var ad = 0; ad < keepData.length; ad++) {
              var aVal = node.getAttribute(keepData[ad]);
              if (aVal) atomAttrs += ' ' + keepData[ad] + '="' + escAttr(aVal) + '"';
            }
            // Los átomos siempre son contenteditable=false en el editor
            atomAttrs += ' contenteditable="false"';
            // Para tag, derivar el style inline del color (con contraste).
            // El data-tag-color viene de HTML pegado: se pasa por _sanitizeStyle
            // para descartar inyecciones CSS (p.ej. "red;position:fixed;inset:0").
            if (atomicClass === 'mewyse-tag') {
              var tagColor = node.getAttribute('data-tag-color');
              if (tagColor && self._pickContrastColor) {
                var fg = self._pickContrastColor(tagColor);
                var v_tag_style = self._sanitizeStyle('background-color: ' + tagColor + '; color: ' + fg);
                if (v_tag_style) atomAttrs += ' style="' + escAttr(v_tag_style) + '"';
              }
            }
            var inner = '';
            for (var ai = 0; ai < node.childNodes.length; ai++) {
              inner += cleanNode(node.childNodes[ai]);
            }
            return '<span' + atomAttrs + '>' + inner + '</span>';
          }
        }

        // SPAN con estilo de contenido intencional (font-size / color /
        // background): preservarlo con su style saneado (permite importar el
        // tamaño y color del texto). El resto de spans se desenvuelven abajo.
        if (tagName === 'SPAN') {
          var v_span_style = node.getAttribute('style');
          if (v_span_style) {
            var v_clean_span = self._sanitizeStyle(v_span_style);
            if (v_clean_span &&
                (v_clean_span.indexOf('font-size') !== -1 || v_clean_span.indexOf('color') !== -1)) {
              var v_span_inner = '';
              for (var vsi = 0; vsi < node.childNodes.length; vsi++) {
                v_span_inner += cleanNode(node.childNodes[vsi]);
              }
              return '<span style="' + escAttr(v_clean_span) + '">' + v_span_inner + '</span>';
            }
          }
        }

        // Si no es una etiqueta permitida, extraer el contenido de sus hijos
        if (allowedInlineTags.indexOf(tagName) === -1) {
          var childContent = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            childContent += cleanNode(node.childNodes[i]);
          }
          return childContent;
        }

        // Construir la etiqueta limpia
        var html = '<' + tagName.toLowerCase();

        // Solo añadir atributos permitidos
        var allowed = allowedAttributes[tagName] || [];
        for (var j = 0; j < allowed.length; j++) {
          var attrName = allowed[j];
          var attrValue = node.getAttribute(attrName);
          if (attrValue) {
            // El href debe validarse contra esquemas peligrosos (javascript:,
            // vbscript:, data:text/html...). Si no es seguro, neutralizarlo a "#"
            // en vez de dejar que se persista y se ejecute al clicar el enlace.
            if (tagName === 'A' && attrName === 'href' && !self._isSafeUrl(attrValue)) {
              attrValue = '#';
            }
            // Sanitizar el valor del atributo
            var safeValue = attrValue
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');
            html += ' ' + attrName + '="' + safeValue + '"';
          }
        }

        html += '>';

        // Procesar hijos
        for (var k = 0; k < node.childNodes.length; k++) {
          html += cleanNode(node.childNodes[k]);
        }

        html += '</' + tagName.toLowerCase() + '>';
        return html;
      }

      return '';
    }

    return cleanNode(element);
  };

  /**
   * Convierte un string HTML en un array de bloques listos para insertar en el modelo.
   * Detecta automáticamente iframes de YouTube/Vimeo y tags <video>/<audio> y los
   * convierte a bloques 'video'/'audio' respectivamente.
   *
   * @param {string} html - HTML a convertir
   * @returns {Array} array de bloques sin ids (los asigna _sanitizeBlocks o el caller)
   */
  meWYSE.prototype._htmlToBlocks = function(html) {
    var self = this;
    var parser, doc;
    try {
      parser = new DOMParser();
      doc = parser.parseFromString(html, 'text/html');
    } catch (e) {
      // Fallback: texto plano
      var text = (html || '').replace(/<[^>]*>/g, '').trim();
      return text ? [{ type: 'paragraph', content: escapeHtml(text) }] : [];
    }

    // Extraer las opciones avanzadas (border/margin/alignment) y las dimensiones
    // definidas por `style` de las imágenes ANTES de limpiar: cleanPastedDocument
    // elimina el atributo `style` de las imágenes. Se guardan en el propio nodo
    // (propiedades JS, que sobreviven a la limpieza de atributos) para leerlas
    // después en la rama IMG.
    var v_pre_imgs = doc.querySelectorAll('img');
    for (var vpi = 0; vpi < v_pre_imgs.length; vpi++) {
      var v_pimg = v_pre_imgs[vpi];
      v_pimg.__mewyse_adv = this._imageAdvancedFromNode(v_pimg);
      var v_psw = parseInt(v_pimg.style.width, 10);
      var v_psh = parseInt(v_pimg.style.height, 10);
      if (!isNaN(v_psw) && v_psw > 0) v_pimg.__mewyse_sw = v_psw;
      if (!isNaN(v_psh) && v_psh > 0) v_pimg.__mewyse_sh = v_psh;
    }

    // Preprocesar: limpiar elementos de Word/Google Docs
    this.cleanPastedDocument(doc);

    var blocksToInsert = [];

    // Mapeo de etiquetas HTML a tipos de bloque
    var tagToBlockType = {
      'P': 'paragraph',
      'H1': 'heading1',
      'H2': 'heading2',
      'H3': 'heading3',
      'H4': 'heading3',
      'H5': 'heading3',
      'H6': 'heading3',
      'BLOCKQUOTE': 'quote',
      'PRE': 'code',
      'UL': 'bulletList',
      'OL': 'numberList',
      'HR': 'divider',
      'DIV': 'paragraph',
      'ARTICLE': 'paragraph',
      'SECTION': 'paragraph',
      'HEADER': 'paragraph',
      'FOOTER': 'paragraph'
    };

    /**
     * Procesa un nodo recursivamente y extrae bloques
     */
    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent.trim();
        if (text) {
          // El contenido del bloque es HTML (render vía innerHTML); el texto
          // plano del nodo se escapa para no reinterpretarse como markup.
          blocksToInsert.push({
            type: 'paragraph',
            content: escapeHtml(text)
          });
        }
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      var tagName = node.tagName;

      // Ignorar elementos ocultos y scripts
      if (tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'META' || tagName === 'LINK') {
        return;
      }

      // Manejar BR como separador de bloques
      if (tagName === 'BR') {
        return;
      }

      // Iframe: detectar YouTube/Vimeo → bloque video
      if (tagName === 'IFRAME') {
        if (self._isBlockDisabled('video')) return; // vídeo desactivado: descartar
        var src = node.getAttribute('src') || '';
        var info = self._detectVideoProvider(src);
        if (info && (info.provider === 'youtube' || info.provider === 'vimeo')) {
          var w = parseInt(node.getAttribute('width'), 10);
          var h = parseInt(node.getAttribute('height'), 10);
          blocksToInsert.push({
            type: 'video',
            content: info.url,   // modelo nuevo: solo la URL
            width: (isNaN(w) || w < 1) ? 640 : w,
            height: (isNaN(h) || h < 1) ? 360 : h
          });
        }
        // iframes de otros dominios se descartan (Sprint 2 para iframe genérico)
        return;
      }

      // Video nativo → bloque video (provider file)
      if (tagName === 'VIDEO') {
        if (self._isBlockDisabled('video')) return; // vídeo desactivado: descartar
        var vsrc = node.getAttribute('src');
        if (!vsrc) {
          var sourceEl = node.querySelector('source');
          if (sourceEl) vsrc = sourceEl.getAttribute('src');
        }
        if (vsrc && self._isSafeMediaUrl(vsrc)) {
          var vw = parseInt(node.getAttribute('width'), 10);
          var vh = parseInt(node.getAttribute('height'), 10);
          blocksToInsert.push({
            type: 'video',
            content: vsrc,   // modelo nuevo: solo la URL
            width: (isNaN(vw) || vw < 1) ? 640 : vw,
            height: (isNaN(vh) || vh < 1) ? 360 : vh
          });
        }
        return;
      }

      // Audio nativo → bloque audio
      if (tagName === 'AUDIO') {
        if (self._isBlockDisabled('audio')) return; // audio desactivado: descartar
        var asrc = node.getAttribute('src');
        if (!asrc) {
          var asource = node.querySelector('source');
          if (asource) asrc = asource.getAttribute('src');
        }
        if (asrc && self._isSafeMediaUrl(asrc)) {
          blocksToInsert.push({
            type: 'audio',
            content: { url: asrc, title: node.getAttribute('title') || '' }
          });
        }
        return;
      }

      // IMG suelto (no dentro de un bloque) → bloque image
      if (tagName === 'IMG') {
        if (self._isBlockDisabled('image')) return; // imagen desactivada: descartar
        var imgSrc = node.getAttribute('src');
        if (imgSrc && self._isSafeImageUrl(imgSrc)) {
          // Dimensiones: atributo width/height y, como fallback, del `style`
          // inline (leído antes de la limpieza, en node.__mewyse_sw/sh). TinyMCE y
          // otros suelen fijar el tamaño con style:width/height.
          var imgW = parseInt(node.getAttribute('width'), 10);
          var imgH = parseInt(node.getAttribute('height'), 10);
          if ((isNaN(imgW) || imgW < 1) && node.__mewyse_sw) imgW = node.__mewyse_sw;
          if ((isNaN(imgH) || imgH < 1) && node.__mewyse_sh) imgH = node.__mewyse_sh;
          var v_img_content = {
            blob: imgSrc,
            fileName: node.getAttribute('alt') || 'image'
          };
          // Dimensiones OPCIONALES: solo se fijan si venían en el HTML (atributo
          // width/height o style inline). Si el <img> no las trae, NO forzamos
          // 300x200: la imagen se mostrará a su tamaño natural.
          if (!isNaN(imgW) && imgW >= 1) v_img_content.width = imgW;
          if (!isNaN(imgH) && imgH >= 1) v_img_content.height = imgH;
          // Opciones avanzadas (border/margin/alignment) del style inline, leídas
          // antes de la limpieza (node.__mewyse_adv).
          if (node.__mewyse_adv) v_img_content.advanced = node.__mewyse_adv;
          blocksToInsert.push({ type: 'image', content: v_img_content });
        }
        return;
      }

      // Manejar listas
      if (tagName === 'UL' || tagName === 'OL') {
        var listType = tagName === 'UL' ? 'bulletList' : 'numberList';
        var listItems = node.querySelectorAll(':scope > li');
        for (var j = 0; j < listItems.length; j++) {
          var liContent = self.sanitizeHTML(listItems[j]).trim();
          if (liContent) {
            blocksToInsert.push({
              type: listType,
              content: liContent
            });
          }
        }
        return;
      }

      // Manejar tablas - convertir a bloque de tabla
      if (tagName === 'TABLE') {
        var tableContent = self.cleanTableHTML(node);
        var tableStyle = node.getAttribute('style') || '';
        var tableBlock = {
          type: 'table',
          content: tableContent
        };
        if (tableStyle) {
          var cleanStyle = self._sanitizeStyle(tableStyle);
          if (cleanStyle) tableBlock.tableStyle = cleanStyle;
        }
        if (tableContent) blocksToInsert.push(tableBlock);
        return;
      }

      // Bloques estructurales propios de meWYSE (los emite getHTML como
      // div/nav/details). Se detectan AQUI, antes del manejo genérico de DIV
      // (que los aplanaría a un párrafo vacío y perdería el bloque). Es lo que
      // permite el round-trip por el modal de Código fuente / loadFromHTML.
      if (tagName === 'DIV') {
        var v_div_cls = ' ' + (node.className || '') + ' ';
        // Salto de página → bloque pageBreak (contenido derivado, vacío)
        if (v_div_cls.indexOf(' mewyse-page-break ') !== -1) {
          blocksToInsert.push({ type: 'pageBreak', content: '' });
          return;
        }
        // Callout (aviso) → variante + contenido inline
        if (v_div_cls.indexOf(' mewyse-callout ') !== -1) {
          var v_variant = 'info';
          var v_variant_match = (node.className || '')
            .match(/mewyse-callout-(info|warning|success|danger)/);
          if (v_variant_match) v_variant = v_variant_match[1];
          // Contenido: el .mewyse-callout-content si viene del DOM del editor
          // (evita arrastrar el botón de variante); si no (export), el div.
          var v_callout_node = node.querySelector('.mewyse-callout-content') || node;
          blocksToInsert.push({
            type: 'callout',
            content: self.sanitizeHTML(v_callout_node).trim(),
            calloutVariant: v_variant
          });
          return;
        }
      }

      // Índice (tabla de contenidos) → bloque toc (contenido derivado, vacío)
      if (tagName === 'NAV' &&
          (' ' + (node.className || '') + ' ').indexOf(' mewyse-toc ') !== -1) {
        blocksToInsert.push({ type: 'toc', content: '' });
        return;
      }

      // Desplegable (details/summary) → bloque toggle
      if (tagName === 'DETAILS') {
        var v_summary_el = node.querySelector('summary');
        var v_toggle_title = v_summary_el ? self.sanitizeHTML(v_summary_el).trim() : '';
        // Cuerpo = todo el <details> menos el <summary>.
        var v_details_clone = node.cloneNode(true);
        var v_clone_summary = v_details_clone.querySelector('summary');
        if (v_clone_summary) v_clone_summary.parentNode.removeChild(v_clone_summary);
        blocksToInsert.push({
          type: 'toggle',
          content: self.sanitizeHTML(v_details_clone).trim(),
          toggleTitle: v_toggle_title,
          collapsed: !node.hasAttribute('open')
        });
        return;
      }

      // Manejar HR
      if (tagName === 'HR') {
        blocksToInsert.push({
          type: 'divider',
          content: ''
        });
        return;
      }

      // Manejar PRE/CODE
      if (tagName === 'PRE') {
        var codeContent = node.textContent || '';
        if (codeContent.trim()) {
          blocksToInsert.push({
            type: 'code',
            content: codeContent
          });
        }
        return;
      }

      // Verificar si es un elemento de bloque
      var isBlockElement = tagToBlockType[tagName] !== undefined;

      if (isBlockElement) {
        // Caso especial: bloque cuyo ÚNICO contenido es <br>/espacios (p. ej.
        // <p><br></p>, la "línea en blanco" típica de TinyMCE/editores). Sin
        // este atajo el <br> activa hasBlockChildren, se recurre y el <br> se
        // descarta → 0 bloques (se perdería la separación intencionada). Lo
        // tratamos como un bloque de texto VACÍO. El recorte de vacíos de los
        // extremos se aplica después, así que solo se conservan los intermedios.
        var v_text_only = (node.textContent || '').replace(/\s/g, '');
        if (v_text_only === '' &&
            node.querySelectorAll(
              'img, iframe, video, audio, table, ul, ol, p, h1, h2, h3, h4, h5, h6, blockquote, pre, hr'
            ).length === 0) {
          blocksToInsert.push({
            type: tagToBlockType[tagName] || 'paragraph',
            content: ''
          });
          return;
        }

        // Verificar si contiene otros elementos de bloque anidados
        var hasBlockChildren = false;
        var children = node.childNodes;

        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.nodeType === Node.ELEMENT_NODE) {
            var childTag = child.tagName;
            if (tagToBlockType[childTag] || childTag === 'UL' || childTag === 'OL' ||
                childTag === 'TABLE' || childTag === 'BR' || childTag === 'IFRAME' ||
                childTag === 'VIDEO' || childTag === 'AUDIO' || childTag === 'IMG') {
              hasBlockChildren = true;
              break;
            }
          }
        }

        if (hasBlockChildren) {
          // Procesar hijos recursivamente
          for (var k = 0; k < children.length; k++) {
            processNode(children[k]);
          }
        } else {
          // Es un bloque sin hijos de bloque, extraer contenido.
          // Se inserta AUNQUE el contenido esté vacío: un <p></p> en medio del
          // documento es separación intencionada y debe conservarse. El recorte
          // de vacíos al inicio/final se aplica después sobre la lista.
          var blockType = tagToBlockType[tagName] || 'paragraph';
          var content = self.sanitizeHTML(node).trim();
          blocksToInsert.push({
            type: blockType,
            content: content
          });
        }
      } else {
        // Elemento inline o desconocido - procesar hijos
        var nodeChildren = node.childNodes;
        for (var m = 0; m < nodeChildren.length; m++) {
          processNode(nodeChildren[m]);
        }
      }
    }

    // Procesar todos los nodos del body
    var bodyChildren = doc.body.childNodes;
    for (var i = 0; i < bodyChildren.length; i++) {
      processNode(bodyChildren[i]);
    }

    // Recortar bloques de texto vacíos SOLO al inicio y al final. Los vacíos
    // intermedios se conservan (separación visual intencionada del usuario).
    // Imágenes/tablas/divisores/medios nunca se consideran "vacíos".
    var isEmptyTextBlock = function(block) {
      if (block.type === 'divider' || block.type === 'pageBreak' || block.type === 'image' ||
          block.type === 'video' || block.type === 'audio' || block.type === 'table') {
        return false;
      }
      if (typeof block.content === 'string') return block.content.trim() === '';
      return !block.content;
    };
    while (blocksToInsert.length && isEmptyTextBlock(blocksToInsert[0])) {
      blocksToInsert.shift();
    }
    while (blocksToInsert.length && isEmptyTextBlock(blocksToInsert[blocksToInsert.length - 1])) {
      blocksToInsert.pop();
    }

    return blocksToInsert;
  };

  /**
   * Procesa HTML pegado y crea bloques apropiados (inserta en posición actual).
   * @param {string} html
   * @param {number} currentBlockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.processPastedHTML = function(html, currentBlockId, element) {
    this.pushHistory(true);

    var blocksToInsert = this._htmlToBlocks(html);

    // Si no hay bloques, intentar con el texto plano
    if (blocksToInsert.length === 0) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var plainText = doc.body.textContent || '';
      if (plainText.trim()) {
        this.processPastedPlainText(plainText, currentBlockId, element);
      }
      return;
    }

    // Insertar los bloques
    var currentIndex = this.getBlockIndex(currentBlockId);
    var currentContent = element.textContent || element.innerText || '';

    if (currentContent.trim() === '') {
      // Reemplazar el bloque actual con el primer bloque pegado
      var firstBlock = blocksToInsert[0];
      var block = this.getBlock(currentBlockId);
      if (block) {
        block.type = firstBlock.type;
        block.content = firstBlock.content;
        // Re-renderizar el bloque actual
        var blockElement = this.container.querySelector('[data-block-id="' + currentBlockId + '"]');
        if (blockElement) {
          var newBlockElement = this.createBlockElement(block);
          blockElement.parentNode.replaceChild(newBlockElement, blockElement);
        }
      }
      // Insertar los bloques restantes
      for (var n = 1; n < blocksToInsert.length; n++) {
        this.insertBlockAt(currentIndex + n, blocksToInsert[n].type, blocksToInsert[n].content);
      }
    } else {
      // Si el bloque actual tiene contenido, insertar todos los bloques después
      for (var o = 0; o < blocksToInsert.length; o++) {
        this.insertBlockAt(currentIndex + 1 + o, blocksToInsert[o].type, blocksToInsert[o].content);
      }
    }

    this.triggerChange();
  };

  /**
   * Limpia el documento de elementos específicos de Word/Google Docs
   * @param {Document} doc
   */
  meWYSE.prototype.cleanPastedDocument = function(doc) {
    // 1. Eliminar elementos de Word/Office completamente (+ XML, style, meta, script, link)
    var junkSelector = 'o\\:p, v\\:*, w\\:*, m\\:*, xml, style, meta, link, script, title, head > *';
    var junkNodes;
    try {
      junkNodes = doc.querySelectorAll(junkSelector);
    } catch (e) {
      junkNodes = doc.querySelectorAll('xml, style, meta, link, script');
    }
    for (var i = 0; i < junkNodes.length; i++) {
      if (junkNodes[i].parentNode) junkNodes[i].remove();
    }

    // 2. Eliminar comentarios condicionales de Word (aparecen como texto "[if gte mso ...]")
    var allNodes = doc.querySelectorAll('*');
    for (var ci = 0; ci < allNodes.length; ci++) {
      var cn = allNodes[ci];
      // Nodo de comentario IE/Word
      if (cn.nodeType === 8) cn.remove();
    }

    // 3. Convertir párrafos "ListParagraph" de Word (que simulan listas con texto) en items reales
    this._convertWordListsToReal(doc);

    // 4. Eliminar clases y estilos de Microsoft Office + atributos propietarios
    var allElements = doc.querySelectorAll('*');
    for (var j = 0; j < allElements.length; j++) {
      var el = allElements[j];

      // Si es un átomo meWYSE (mewyse-tag / mewyse-mention / mewyse-emoji) o un
      // bloque estructural propio (page-break / callout / toc / callout-content),
      // saltarse el cleanup completo. Es contenido legítimo del editor — quitarles
      // la class los rompería y perderían su semántica (además, la detección de
      // estos bloques en _htmlToBlocks se apoya justo en esa class).
      if (el.classList && (
          el.classList.contains('mewyse-tag') ||
          el.classList.contains('mewyse-mention') ||
          el.classList.contains('mewyse-emoji') ||
          el.classList.contains('mewyse-page-break') ||
          el.classList.contains('mewyse-callout') ||
          el.classList.contains('mewyse-callout-content') ||
          el.classList.contains('mewyse-toc'))) {
        continue;
      }

      // Detectar si tenía ciertos estilos útiles antes de limpiar (bold/italic implícitos de Word)
      var styleStr = el.getAttribute('style') || '';
      var inheritedBold = /font-weight\s*:\s*(bold|[6-9]00)/i.test(styleStr);
      var inheritedItalic = /font-style\s*:\s*italic/i.test(styleStr);
      var inheritedUnderline = /text-decoration[^;]*underline/i.test(styleStr);

      // Conservar en spans los estilos de contenido intencionales (font-size /
      // color / background) que el usuario querría mantener al importar. Se
      // capturan YA saneados y se reaplican tras el cleanup del atributo style.
      var v_keep_style = '';
      if (el.tagName === 'SPAN' && styleStr) {
        var v_cs = this._sanitizeStyle(styleStr);
        if (v_cs && (v_cs.indexOf('font-size') !== -1 || v_cs.indexOf('color') !== -1)) {
          v_keep_style = v_cs;
        }
      }

      el.removeAttribute('class');
      el.removeAttribute('style');
      el.removeAttribute('id');
      el.removeAttribute('lang');
      el.removeAttribute('align');
      // width/height: conservar si el editor los permite para este tag
      // (IMG/IFRAME/VIDEO), para no perder las dimensiones de una imagen al
      // cargar contenido externo. Para el resto de tags (p.ej. TD/P de Word)
      // se siguen eliminando.
      var v_tagAllowed = ATTR_WHITELIST[el.tagName] || {};
      if (!v_tagAllowed['width']) el.removeAttribute('width');
      if (!v_tagAllowed['height']) el.removeAttribute('height');

      // Eliminar atributos MS Office (mso-*), datos internos, xmlns, namespaces.
      // Preservar atributos meWYSE: data-mention-*, data-tag-*, data-block-*.
      var attrs = el.attributes;
      var attrsToRemove = [];
      for (var k = 0; k < attrs.length; k++) {
        var attrName = attrs[k].name;
        var isMewyseDataAttr = attrName.indexOf('data-mention-') === 0 ||
                               attrName.indexOf('data-tag-') === 0 ||
                               attrName.indexOf('data-block-') === 0 ||
                               attrName === 'data-name' ||
                               attrName === 'data-type';
        if (attrName.indexOf('mso-') === 0 ||
            (attrName.indexOf('data-') === 0 && !isMewyseDataAttr) ||
            attrName.indexOf('xmlns') === 0 || attrName.indexOf('o:') === 0 ||
            attrName.indexOf('v:') === 0 || attrName.indexOf('w:') === 0 ||
            attrName.indexOf('m:') === 0 || attrName === 'bgcolor' ||
            attrName === 'cellpadding' || attrName === 'cellspacing' || attrName === 'border') {
          attrsToRemove.push(attrName);
        }
      }
      for (var l = 0; l < attrsToRemove.length; l++) {
        el.removeAttribute(attrsToRemove[l]);
      }

      // Reaplicar el style de contenido conservado (font-size/color/background) al
      // span, para que el paso 6 no lo desenvuelva y se importe el formato.
      if (v_keep_style) el.setAttribute('style', v_keep_style);

      // Preservar formato inline inferido de estilos (bold/italic/underline) envolviendo el contenido
      if (inheritedBold && el.tagName !== 'B' && el.tagName !== 'STRONG' && el.tagName !== 'H1' &&
          el.tagName !== 'H2' && el.tagName !== 'H3' && el.tagName !== 'H4' && el.tagName !== 'H5' &&
          el.tagName !== 'H6' && el.tagName !== 'TH' && el.childNodes.length > 0) {
        var bWrap = doc.createElement('b');
        while (el.firstChild) bWrap.appendChild(el.firstChild);
        el.appendChild(bWrap);
      }
      if (inheritedItalic && el.tagName !== 'I' && el.tagName !== 'EM' && el.childNodes.length > 0) {
        var iWrap = doc.createElement('i');
        while (el.firstChild) iWrap.appendChild(el.firstChild);
        el.appendChild(iWrap);
      }
      if (inheritedUnderline && el.tagName !== 'U' && el.childNodes.length > 0) {
        var uWrap = doc.createElement('u');
        while (el.firstChild) uWrap.appendChild(el.firstChild);
        el.appendChild(uWrap);
      }
    }

    // 5. Reemplazar &nbsp; con espacios normales y normalizar saltos de línea
    var walker = document.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    var textNode;
    while (textNode = walker.nextNode()) {
      textNode.textContent = textNode.textContent
        .replace(/\u00A0/g, ' ')       // nbsp → espacio
        .replace(/\u2028|\u2029/g, '') // separadores de línea/párrafo Unicode
        .replace(/[\u200B-\u200D\uFEFF]/g, ''); // zero-width chars
    }

    // 6. Desenvolver SPANs/FONTs vacíos o que solo contienen formato (no aportan nada).
    // Excepción: spans atómicos de meWYSE (mewyse-tag / mewyse-mention /
    // mewyse-emoji) son contenido semántico — NO desenvolverlos.
    var unwrapTags = ['SPAN', 'FONT'];
    for (var ut = 0; ut < unwrapTags.length; ut++) {
      var toUnwrap = doc.querySelectorAll(unwrapTags[ut].toLowerCase());
      for (var m = toUnwrap.length - 1; m >= 0; m--) {
        var elUnwrap = toUnwrap[m];
        if (elUnwrap.classList && (
            elUnwrap.classList.contains('mewyse-tag') ||
            elUnwrap.classList.contains('mewyse-mention') ||
            elUnwrap.classList.contains('mewyse-emoji'))) {
          continue;
        }
        // NO desenvolver spans con estilos de formato intencionales que el usuario
        // querría conservar al importar (font-size / color / background-color).
        // Se reasigna el style YA saneado (quita mso-* y demás basura); el
        // sanitizer del contenido lo vuelve a validar después.
        var v_span_style = elUnwrap.getAttribute && elUnwrap.getAttribute('style');
        if (v_span_style) {
          var v_clean_style = this._sanitizeStyle(v_span_style);
          if (v_clean_style &&
              (v_clean_style.indexOf('font-size') !== -1 || v_clean_style.indexOf('color') !== -1)) {
            elUnwrap.setAttribute('style', v_clean_style);
            continue;
          }
        }
        if (!elUnwrap.getAttribute('href')) {
          while (elUnwrap.firstChild) {
            elUnwrap.parentNode.insertBefore(elUnwrap.firstChild, elUnwrap);
          }
          elUnwrap.remove();
        }
      }
    }

    // 7. Eliminar solo DIVs vacíos (envoltorios estructurales típicos de Word/HTML).
    // Los <p> vacíos se CONSERVAN: representan separación visual intencionada del
    // usuario y deben mantenerse como bloques (el recorte de vacíos al inicio/final
    // se hace luego sobre la lista de bloques en _htmlToBlocks).
    // Preservar los que contienen medios (img, iframe, video, audio, table, hr, br).
    var emptyCandidates = doc.querySelectorAll('div');
    for (var ec = emptyCandidates.length - 1; ec >= 0; ec--) {
      var candidate = emptyCandidates[ec];
      // No eliminar bloques estructurales propios de meWYSE aunque estén vacíos:
      // el salto de página es un <div class="mewyse-page-break"></div> vacío por
      // diseño; también protegemos callout/toc por robustez.
      if (candidate.classList && (
          candidate.classList.contains('mewyse-page-break') ||
          candidate.classList.contains('mewyse-callout') ||
          candidate.classList.contains('mewyse-toc'))) {
        continue;
      }
      var txt = (candidate.textContent || '').replace(/\s/g, '');
      if (txt === '' && candidate.querySelectorAll('img, br, hr, table, iframe, video, audio, p').length === 0) {
        candidate.remove();
      }
    }
  };

  /**
   * Convierte párrafos "ListParagraph" de Word (con viñetas visuales como texto) en
   * verdaderos <ul>/<ol>. Word suele exportar listas como <p class="MsoListParagraph">
   * con un bullet "·" o "o" al principio del texto.
   */
  meWYSE.prototype._convertWordListsToReal = function(doc) {
    var paragraphs = doc.querySelectorAll('p');
    // Patrones típicos de Word/Excel al inicio del texto de una "lista"
    var bulletPattern = /^[\s\u00A0]*[·•●○◦o\u25CF\u25E6\u2022\u2043\u2219\u25AA\u25AB]\s+/;
    var numberPattern = /^[\s\u00A0]*(\d+|[a-zA-Z])[.)\-]\s+/;

    var currentList = null;
    var currentType = null;

    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i];
      var text = p.textContent || '';
      var cls = p.getAttribute('class') || '';
      var isWordList = /MsoList|ListParagraph/i.test(cls);

      var matchBullet = bulletPattern.exec(text);
      var matchNumber = numberPattern.exec(text);

      if (isWordList || matchBullet || matchNumber) {
        var listType = matchNumber ? 'ol' : 'ul';

        // Crear o continuar lista
        if (!currentList || currentType !== listType) {
          currentList = doc.createElement(listType);
          currentType = listType;
          p.parentNode.insertBefore(currentList, p);
        }

        // Crear <li> y mover contenido (eliminando el bullet/numeración visual)
        var li = doc.createElement('li');
        // Remover el bullet/número del primer nodo de texto
        if (p.firstChild && p.firstChild.nodeType === 3) {
          var firstText = p.firstChild.textContent;
          if (matchBullet) {
            p.firstChild.textContent = firstText.replace(bulletPattern, '');
          } else if (matchNumber) {
            p.firstChild.textContent = firstText.replace(numberPattern, '');
          }
        }
        while (p.firstChild) li.appendChild(p.firstChild);
        currentList.appendChild(li);
        p.remove();
      } else {
        // Cualquier párrafo normal rompe la lista actual
        currentList = null;
        currentType = null;
      }
    }
  };

  /**
   * Limpia el HTML de una tabla para usar en el editor
   * @param {HTMLElement} table
   * @returns {string}
   */
  meWYSE.prototype.cleanTableHTML = function(table) {
    // Crear una copia limpia de la tabla
    var cleanTable = document.createElement('tbody');
    var rows = table.querySelectorAll('tr');

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cleanRow = document.createElement('tr');
      var cells = row.querySelectorAll('td, th');

      for (var j = 0; j < cells.length; j++) {
        var cell = cells[j];
        var cleanCell = document.createElement(cell.tagName.toLowerCase());

        // Preservar colspan y rowspan
        if (cell.getAttribute('colspan')) {
          cleanCell.setAttribute('colspan', cell.getAttribute('colspan'));
        }
        if (cell.getAttribute('rowspan')) {
          cleanCell.setAttribute('rowspan', cell.getAttribute('rowspan'));
        }

        // Limpiar el contenido de la celda. Si contiene una imagen con src
        // seguro, preservarla (createTableElement la envolverá y enganchará);
        // sanitizeHTML descartaría el <img>, perdiéndolo al cargar HTML.
        var imgInCell = cell.querySelector('img');
        if (imgInCell && this._isSafeImageUrl(imgInCell.getAttribute('src'))) {
          var v_src = imgInCell.getAttribute('src');
          var v_alt = imgInCell.getAttribute('alt') || '';
          var v_w = parseInt(imgInCell.getAttribute('width'), 10);
          var v_h = parseInt(imgInCell.getAttribute('height'), 10);
          var v_img = '<img class="mewyse-image" src="' + escape_attr(v_src) + '"';
          if (v_alt) v_img += ' alt="' + escape_attr(v_alt) + '"';
          if (!isNaN(v_w) && v_w > 0) v_img += ' width="' + v_w + '"';
          if (!isNaN(v_h) && v_h > 0) v_img += ' height="' + v_h + '"';
          v_img += '>';
          cleanCell.innerHTML = v_img;
        } else {
          var cellContent = this.sanitizeHTML(cell).trim() || '';
          cleanCell.innerHTML = '<p style="padding: 8px; margin: 0; min-height: 1em;">' + cellContent + '</p>';
        }

        cleanRow.appendChild(cleanCell);
      }

      cleanTable.appendChild(cleanRow);
    }

    return cleanTable.innerHTML;
  };

  /**
   * Procesa texto plano pegado y crea bloques por línea
   * @param {string} text
   * @param {number} currentBlockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.processPastedPlainText = function(text, currentBlockId, element) {
    this.pushHistory(true);
    var lines = text.split(/\r?\n/);

    // Filtrar líneas vacías al inicio y al final, pero mantener las del medio
    var startIndex = 0;
    var endIndex = lines.length - 1;

    while (startIndex < lines.length && lines[startIndex].trim() === '') {
      startIndex++;
    }
    while (endIndex >= 0 && lines[endIndex].trim() === '') {
      endIndex--;
    }

    if (startIndex > endIndex) {
      // Todo es vacío, pegar texto vacío en el bloque actual
      element.textContent = '';
      this.updateBlockContent(currentBlockId, '');
      return;
    }

    lines = lines.slice(startIndex, endIndex + 1);

    // Eliminar completamente las líneas vacías del contenido pegado
    var filteredLines = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      // Solo incluir líneas que tengan contenido
      if (line.trim() !== '') {
        filteredLines.push(line);
      }
    }

    lines = filteredLines;

    if (lines.length === 0) {
      return;
    }

    var currentIndex = this.getBlockIndex(currentBlockId);
    var currentContent = element.textContent || element.innerText || '';

    if (lines.length === 1) {
      // Una sola línea, insertar en el bloque actual
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(lines[0]));
        this.updateBlockContent(currentBlockId, element.innerHTML);
      } else {
        // El modelo almacena HTML (se renderiza vía innerHTML), así que la
        // línea de texto plano debe escaparse para no inyectar markup.
        element.textContent = lines[0];
        this.updateBlockContent(currentBlockId, escapeHtml(lines[0]));
      }
    } else {
      // Múltiples líneas
      if (currentContent.trim() === '') {
        // Si el bloque actual está vacío, reemplazarlo con la primera línea
        element.textContent = lines[0];
        this.updateBlockContent(currentBlockId, escapeHtml(lines[0]));

        // Insertar las líneas restantes como nuevos bloques (escapadas)
        for (var i = 1; i < lines.length; i++) {
          this.insertBlockAt(currentIndex + i, 'paragraph', escapeHtml(lines[i]));
        }
      } else {
        // Si tiene contenido, insertar todas las líneas después (escapadas)
        for (var j = 0; j < lines.length; j++) {
          this.insertBlockAt(currentIndex + 1 + j, 'paragraph', escapeHtml(lines[j]));
        }
      }

      this.triggerChange();
    }
  };

  /**
   * Inserta un bloque en una posición específica con contenido
   * @param {number} index
   * @param {string} type
   * @param {string} content
   */
  meWYSE.prototype.insertBlockAt = function(index, type, content) {
    // Normalizar el índice a un rango válido [0, length] para que un índice
    // negativo o fuera de rango no inserte en una posición inesperada.
    index = Math.max(0, Math.min(index, this.blocks.length));

    var block = {
      id: ++this.currentBlockId,
      type: type || 'paragraph',
      content: content || ''
    };

    this.blocks.splice(index, 0, block);

    // Renderizar el nuevo bloque
    this.render(block.id);

    // Actualizar listas numeradas si es necesario
    if (index < this.blocks.length) {
      var self = this;
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          self.updateConsecutiveNumberLists(index);
        });
      });
    }
  };

  /**
   * Adjunta eventos a una celda de tabla
   * @param {HTMLElement} cell
   * @param {number} blockId
   */
  meWYSE.prototype.attachTableCellEvents = function(cell, blockId) {
    var self = this;

    // Event listener para input - actualizar el contenido de toda la tabla
    cell.addEventListener('input', function(e) {
      var block = self.getBlock(blockId);
      if (block) {
        // Encontrar el elemento table
        var tableElement = cell.closest('table');
        if (tableElement) {
          // Guardar el HTML completo de la tabla (limpio, sin divs internos)
          self.updateBlockContent(blockId, tableElement.innerHTML);
        }
      }
    });

    // Evitar que Enter cree nuevos bloques en las celdas
    cell.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        // Permitir Enter en la celda pero prevenir la creación de bloque
        e.stopPropagation();
      }
      // Escape: limpiar selección de celdas
      if (e.key === 'Escape' && self.selectedTableCells.length > 0) {
        e.preventDefault();
        self.clearTableCellSelection();
      }
    });

    // Interceptar el pegado dentro de la celda. Sin esto, el paste nativo mete
    // HTML crudo (Word, estilos arbitrarios, enlaces javascript:) directo al DOM
    // de la celda y el listener `input` lo persiste sin sanear. Saneamos a HTML
    // inline seguro (mismo sanitizeHTML que el paste normal) antes de insertar.
    cell.addEventListener('paste', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var v_clipboard = e.clipboardData || window.clipboardData;
      if (!v_clipboard) return;

      var v_html = '';
      try { v_html = v_clipboard.getData('text/html'); } catch (err) { v_html = ''; }

      var v_insert;
      if (v_html) {
        // Parsear el HTML pegado y reducirlo a inline seguro.
        var v_tmp = document.createElement('div');
        v_tmp.innerHTML = v_html;
        v_insert = self.sanitizeHTML(v_tmp);
      } else {
        // Sin HTML: pegar texto plano escapado, respetando saltos de línea.
        var v_plain = '';
        try {
          v_plain = v_clipboard.getData('text/plain') || v_clipboard.getData('Text') || '';
        } catch (err2) { v_plain = ''; }
        v_insert = escapeHtml(v_plain).replace(/\r\n|\r|\n/g, '<br>');
      }

      // Insertar en el caret; execCommand dispara `input`, que persiste la tabla.
      document.execCommand('insertHTML', false, v_insert);
    });

    // Obtener la celda contenedora (td o th)
    var tdCell = cell.closest('td, th');
    if (tdCell && !tdCell._hasSelectionEvents) {
      tdCell._hasSelectionEvents = true;

      // Mousedown: preparar para posible selección
      tdCell.addEventListener('mousedown', function(e) {
        // Solo si no es click en controles y es botón izquierdo
        if (e.button !== 0) return;
        if (e.target.classList.contains('mewyse-table-row-control') ||
            e.target.classList.contains('mewyse-table-col-control')) {
          return;
        }
        // Guardar la celda donde se hizo clic para posible inicio de selección
        self.tableCellMouseDownCell = tdCell;
        self.tableCellMouseDownBlockId = blockId;
      });

      // Drag & drop de imágenes sobre la celda
      tdCell.addEventListener('dragover', function(e) {
        if (!self._draggedImage) return;
        // Detectar que es una imagen interna del editor
        e.preventDefault();
        e.stopPropagation();
        try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
        tdCell.classList.add('mewyse-image-drop-target-cell');
      });

      tdCell.addEventListener('dragleave', function(e) {
        // Solo quitar la clase si se sale de la celda (no de un hijo)
        if (e.target === tdCell || !tdCell.contains(e.relatedTarget)) {
          tdCell.classList.remove('mewyse-image-drop-target-cell');
        }
      });

      tdCell.addEventListener('drop', function(e) {
        if (!self._draggedImage) return;
        e.preventDefault();
        e.stopPropagation();
        tdCell.classList.remove('mewyse-image-drop-target-cell');
        self._dropImageIntoCell(tdCell, blockId);
      });
    }
  };

  /**
   * Añade eventos de selección a nivel de tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableSelectionEvents = function(table, blockId) {
    var self = this;

    if (table._hasSelectionEvents) return;
    table._hasSelectionEvents = true;

    // Mousemove a nivel de tabla para capturar movimiento entre celdas
    table.addEventListener('mousemove', function(e) {
      // Si hay una celda donde se hizo mousedown y el botón sigue presionado
      if (self.tableCellMouseDownCell && e.buttons === 1) {
        var currentCell = e.target.closest('td, th');

        // Si nos movimos a una celda diferente, iniciar selección
        if (currentCell && currentCell !== self.tableCellMouseDownCell) {
          if (!self.isSelectingTableCells) {
            // Iniciar selección con la celda original
            self.startTableCellSelection(self.tableCellMouseDownCell, self.tableCellMouseDownBlockId);
          }
          // Expandir a la celda actual
          self.expandTableCellSelection(currentCell);
        }
      }

      // Si ya estamos seleccionando, seguir expandiendo
      if (self.isSelectingTableCells) {
        var cell = e.target.closest('td, th');
        if (cell && cell.closest('table') === self.currentSelectionTable) {
          self.expandTableCellSelection(cell);
        }
      }
    });

    // Mouseup a nivel de tabla
    table.addEventListener('mouseup', function(e) {
      self.tableCellMouseDownCell = null;
      self.tableCellMouseDownBlockId = null;

      if (self.isSelectingTableCells) {
        self.endTableCellSelection(blockId);
      }
    });

    // Mouseleave de la tabla
    table.addEventListener('mouseleave', function(e) {
      // Si estamos arrastrando fuera de la tabla, mantener el estado
      // El mouseup global manejará la limpieza
    });
  };

  /**
   * Inicia la selección de celdas de tabla
   * @param {HTMLElement} cell - Celda td o th
   * @param {number} blockId
   */
  meWYSE.prototype.startTableCellSelection = function(cell, blockId) {
    // Evitar iniciar múltiples veces
    if (this.isSelectingTableCells) return;

    var table = cell.closest('table');
    if (!table) return;

    this.clearTableCellSelection();
    this.isSelectingTableCells = true;
    this.tableCellSelectionStart = cell;
    this.currentSelectionTable = table;
    this.currentSelectionBlockId = blockId;

    // Seleccionar la celda inicial inmediatamente
    cell.classList.add('mewyse-cell-selected');
    this.selectedTableCells.push(cell);

    // Prevenir selección de texto durante el arrastre
    table.classList.add('mewyse-table-selecting');
  };

  /**
   * Expande la selección de celdas mientras se arrastra
   * @param {HTMLElement} cell - Celda actual bajo el cursor
   */
  meWYSE.prototype.expandTableCellSelection = function(cell) {
    if (!this.isSelectingTableCells || !this.tableCellSelectionStart) return;

    var table = cell.closest('table');
    if (table !== this.currentSelectionTable) return;

    // Construir la matriz una sola vez y reutilizarla (antes se reconstruía 3
    // veces por cada mousemove: 2 getTableCellCoords + getCellsInRange).
    var matrix = this.buildTableMatrix(table);

    // Obtener las coordenadas de las celdas
    var startCoords = this.getTableCellCoords(this.tableCellSelectionStart, matrix);
    var endCoords = this.getTableCellCoords(cell, matrix);

    if (!startCoords || !endCoords) return;

    // Calcular el rectángulo de selección
    var minRow = Math.min(startCoords.row, endCoords.row);
    var maxRow = Math.max(startCoords.row, endCoords.row);
    var minCol = Math.min(startCoords.col, endCoords.col);
    var maxCol = Math.max(startCoords.col, endCoords.col);

    // Limpiar selección visual anterior
    this.selectedTableCells.forEach(function(c) {
      c.classList.remove('mewyse-cell-selected');
    });
    this.selectedTableCells = [];

    // Obtener todas las celdas en el rango usando la matriz lógica (reutilizada)
    var cellsInRange = this.getCellsInRange(table, minRow, maxRow, minCol, maxCol, matrix);

    // Seleccionar las celdas
    for (var i = 0; i < cellsInRange.length; i++) {
      cellsInRange[i].classList.add('mewyse-cell-selected');
      this.selectedTableCells.push(cellsInRange[i]);
    }
  };

  /**
   * Finaliza la selección de celdas
   * @param {number} blockId
   */
  meWYSE.prototype.endTableCellSelection = function(blockId) {
    this.isSelectingTableCells = false;

    // Quitar clase de selección de la tabla
    if (this.currentSelectionTable) {
      this.currentSelectionTable.classList.remove('mewyse-table-selecting');
    }

    // La selección de rango de celdas ya no abre un popup: se refleja en la
    // toolbar contextual (habilita "combinar" / "descombinar" según el estado).
    this._updateTableToolbar();
  };

  /**
   * Obtiene las coordenadas lógicas (fila, columna) de una celda
   * considerando colspan y rowspan de otras celdas
   * @param {HTMLElement} cell
   * @returns {Object|null}
   */
  meWYSE.prototype.getTableCellCoords = function(cell, matrix) {
    var row = cell.closest('tr');
    if (!row) return null;

    var table = row.closest('table');
    if (!table) return null;

    // Construir la matriz lógica solo si no la pasa el llamador (permite
    // reutilizar una misma matriz y evitar reconstruirla varias veces por gesto).
    if (!matrix) matrix = this.buildTableMatrix(table);

    // Buscar la celda en la matriz
    for (var r = 0; r < matrix.length; r++) {
      for (var c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c] === cell) {
          return { row: r, col: c };
        }
      }
    }

    return null;
  };

  /**
   * Construye una matriz lógica de la tabla considerando colspan/rowspan
   * @param {HTMLElement} table
   * @returns {Array}
   */
  meWYSE.prototype.buildTableMatrix = function(table) {
    var rows = table.querySelectorAll('tr');
    var matrix = [];
    var maxCols = 0;

    // Inicializar matriz vacía
    for (var i = 0; i < rows.length; i++) {
      matrix[i] = [];
    }

    // Llenar la matriz
    for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
      var cells = rows[rowIdx].querySelectorAll('td, th');
      var colIdx = 0;

      for (var cellIdx = 0; cellIdx < cells.length; cellIdx++) {
        var cell = cells[cellIdx];
        var colspan = parseInt(cell.getAttribute('colspan')) || 1;
        var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;

        // Encontrar la primera columna disponible
        while (matrix[rowIdx][colIdx]) {
          colIdx++;
        }

        // Llenar las celdas ocupadas por esta celda
        for (var r = 0; r < rowspan; r++) {
          for (var c = 0; c < colspan; c++) {
            if (matrix[rowIdx + r]) {
              matrix[rowIdx + r][colIdx + c] = cell;
            }
          }
        }

        colIdx += colspan;
        if (colIdx > maxCols) maxCols = colIdx;
      }
    }

    return matrix;
  };

  /**
   * Obtiene todas las celdas únicas en un rango de la matriz
   * @param {HTMLElement} table
   * @param {number} minRow
   * @param {number} maxRow
   * @param {number} minCol
   * @param {number} maxCol
   * @returns {Array}
   */
  meWYSE.prototype.getCellsInRange = function(table, minRow, maxRow, minCol, maxCol, matrix) {
    if (!matrix) matrix = this.buildTableMatrix(table);
    var cells = [];
    var seen = [];

    for (var r = minRow; r <= maxRow; r++) {
      if (!matrix[r]) continue;
      for (var c = minCol; c <= maxCol; c++) {
        var cell = matrix[r][c];
        if (cell && seen.indexOf(cell) === -1) {
          seen.push(cell);
          cells.push(cell);
        }
      }
    }

    return cells;
  };

  /**
   * Devuelve el número de columnas LÓGICAS de una matriz (máx. ancho de fila).
   * @param {Array} matrix
   * @returns {number}
   */
  meWYSE.prototype._logicalColCount = function(matrix) {
    var v_cols = 0;
    for (var r = 0; r < matrix.length; r++) {
      if (matrix[r] && matrix[r].length > v_cols) v_cols = matrix[r].length;
    }
    return v_cols;
  };

  /**
   * Crea una celda vacía con la estructura canónica (td/th > p[contenteditable])
   * y eventos enganchados. Clona border/padding de una celda plantilla para
   * mantener coherencia visual (incluido modo oscuro); si no hay plantilla usa
   * los valores por defecto.
   * @param {number} blockId
   * @param {string} tagName - 'td' o 'th'
   * @param {HTMLElement} templateCell - celda de referencia (opcional)
   * @returns {HTMLElement}
   */
  meWYSE.prototype._createEmptyTableCell = function(blockId, tagName, templateCell) {
    var v_cell = document.createElement(tagName || 'td');
    v_cell.style.border = (templateCell && templateCell.style.border) ? templateCell.style.border : '1px solid #ddd';
    v_cell.style.padding = '0';

    var v_content = document.createElement('p');
    v_content.contentEditable = true;
    v_content.style.padding = (templateCell && templateCell.querySelector('p') && templateCell.querySelector('p').style.padding) ? templateCell.querySelector('p').style.padding : '8px';
    v_content.style.margin = '0';
    v_content.style.minHeight = '1em';

    v_cell.appendChild(v_content);
    this.attachTableCellEvents(v_content, blockId);
    return v_cell;
  };

  /**
   * Inserta una columna lógica en la posición P (todo lo que esté en columna
   * >= P se desplaza a la derecha). Respeta colspan/rowspan: si una celda cruza
   * la frontera P-1|P se expande su colspan; en el resto de filas se inserta
   * una celda nueva en la posición DOM correcta.
   * @param {HTMLElement} table
   * @param {number} insertCol - posición lógica de inserción
   * @param {number} blockId
   */
  meWYSE.prototype._insertTableColumnAt = function(table, insertCol, blockId) {
    var matrix = this.buildTableMatrix(table);
    var rows = table.querySelectorAll('tr');
    var v_expanded = []; // celdas ya expandidas (evita doble incremento en rowspans)

    for (var r = 0; r < rows.length; r++) {
      var v_occ = matrix[r] ? matrix[r][insertCol] : null;
      var v_left = (insertCol > 0 && matrix[r]) ? matrix[r][insertCol - 1] : null;

      // La frontera cae DENTRO de una celda con colspan -> expandir esa celda
      if (v_occ && v_occ === v_left) {
        if (v_expanded.indexOf(v_occ) === -1) {
          var v_cs = parseInt(v_occ.getAttribute('colspan')) || 1;
          v_occ.setAttribute('colspan', v_cs + 1);
          v_expanded.push(v_occ);
        }
        continue;
      }

      // La frontera está entre celdas -> insertar una celda nueva en columna P.
      // findInsertPosition devuelve la celda DOM ante la que insertar (o null=fin).
      var v_template = v_occ || v_left || null;
      var v_new = this._createEmptyTableCell(blockId, 'td', v_template);
      var v_ref = this.findInsertPosition(matrix, r, rows[r], insertCol);
      if (v_ref) {
        rows[r].insertBefore(v_new, v_ref);
      } else {
        rows[r].appendChild(v_new);
      }
    }
  };

  /**
   * Elimina la columna lógica C. Si una celda tiene colspan>1 se reduce su
   * colspan; si ocupa solo esa columna se elimina. Las celdas con rowspan se
   * procesan una sola vez.
   * @param {HTMLElement} table
   * @param {number} delCol
   * @param {number} blockId
   */
  meWYSE.prototype._deleteTableColumnAt = function(table, delCol, blockId) {
    var matrix = this.buildTableMatrix(table);
    var v_processed = [];

    for (var r = 0; r < matrix.length; r++) {
      var v_cell = matrix[r] ? matrix[r][delCol] : null;
      if (!v_cell || v_processed.indexOf(v_cell) !== -1) continue;
      v_processed.push(v_cell);

      var v_cs = parseInt(v_cell.getAttribute('colspan')) || 1;
      if (v_cs > 1) {
        // La celda cubre más columnas: reducir el colspan
        if (v_cs - 1 === 1) {
          v_cell.removeAttribute('colspan');
        } else {
          v_cell.setAttribute('colspan', v_cs - 1);
        }
      } else {
        // Ocupa solo esta columna: eliminar el elemento (afecta a todas sus
        // filas si tenía rowspan, al ser un único nodo DOM)
        v_cell.remove();
      }
    }
  };

  /**
   * Inserta una fila lógica en la posición P. Si una celda con rowspan cruza la
   * frontera P-1|P se expande su rowspan; el resto de columnas reciben una celda
   * nueva. Devuelve la fila creada (o null si todo quedó cubierto por rowspans).
   * @param {HTMLElement} table
   * @param {number} insertRow
   * @param {number} blockId
   * @returns {HTMLElement|null}
   */
  meWYSE.prototype._insertTableRowAt = function(table, insertRow, blockId) {
    var matrix = this.buildTableMatrix(table);
    var rows = table.querySelectorAll('tr');
    var v_colCount = this._logicalColCount(matrix);
    var v_expanded = [];
    var v_newRow = document.createElement('tr');

    for (var c = 0; c < v_colCount; c++) {
      var v_above = (insertRow > 0 && matrix[insertRow - 1]) ? matrix[insertRow - 1][c] : null;
      var v_at = (matrix[insertRow]) ? matrix[insertRow][c] : null;

      // Una celda con rowspan cruza la frontera de filas -> expandir su rowspan
      if (v_above && v_above === v_at) {
        if (v_expanded.indexOf(v_above) === -1) {
          var v_rs = parseInt(v_above.getAttribute('rowspan')) || 1;
          v_above.setAttribute('rowspan', v_rs + 1);
          v_expanded.push(v_above);
        }
        continue;
      }

      // Columna no cubierta por un rowspan: añadir celda nueva a la fila
      var v_template = v_at || v_above || null;
      v_newRow.appendChild(this._createEmptyTableCell(blockId, 'td', v_template));
    }

    // Insertar la fila en el DOM en la posición P
    if (insertRow >= rows.length) {
      // Al final: usar el tbody si existe
      var v_tbody = table.querySelector('tbody') || table;
      v_tbody.appendChild(v_newRow);
    } else {
      var v_ref = rows[insertRow];
      v_ref.parentNode.insertBefore(v_newRow, v_ref);
    }

    return v_newRow.children.length ? v_newRow : (v_newRow.parentNode && v_newRow.parentNode.removeChild(v_newRow), null);
  };

  /**
   * Elimina la fila lógica R ajustando rowspans: las celdas que vienen de
   * filas superiores y cruzan R reducen su rowspan; las que se originan en R con
   * rowspan>1 se desplazan a la fila siguiente reduciendo su rowspan.
   * @param {HTMLElement} table
   * @param {number} delRow
   * @param {number} blockId
   */
  meWYSE.prototype._deleteTableRowAt = function(table, delRow, blockId) {
    var matrix = this.buildTableMatrix(table);
    var rows = table.querySelectorAll('tr');
    var row = rows[delRow];
    if (!row) return;

    var v_colCount = this._logicalColCount(matrix);
    var v_processed = [];
    var v_nextRow = rows[delRow + 1] || null;

    for (var c = 0; c < v_colCount; c++) {
      var v_cell = matrix[delRow] ? matrix[delRow][c] : null;
      if (!v_cell || v_processed.indexOf(v_cell) !== -1) continue;
      v_processed.push(v_cell);

      var v_above = (delRow > 0 && matrix[delRow - 1]) ? matrix[delRow - 1][c] : null;
      var v_rs = parseInt(v_cell.getAttribute('rowspan')) || 1;

      if (v_above === v_cell) {
        // La celda viene de arriba y cruza esta fila -> reducir rowspan
        if (v_rs - 1 === 1) {
          v_cell.removeAttribute('rowspan');
        } else {
          v_cell.setAttribute('rowspan', v_rs - 1);
        }
      } else if (v_rs > 1 && v_nextRow) {
        // Se origina en esta fila y abarca hacia abajo -> moverla a la fila
        // siguiente reduciendo su rowspan, para no perder su contenido
        if (v_rs - 1 === 1) {
          v_cell.removeAttribute('rowspan');
        } else {
          v_cell.setAttribute('rowspan', v_rs - 1);
        }
        var v_ref = this.findInsertPosition(matrix, delRow + 1, v_nextRow, c);
        if (v_ref) {
          v_nextRow.insertBefore(v_cell, v_ref);
        } else {
          v_nextRow.appendChild(v_cell);
        }
      }
      // else: se origina aquí con rowspan 1 -> se elimina con la fila
    }

    row.remove();
  };

  /**
   * Limpia la selección de celdas de tabla
   */
  meWYSE.prototype.clearTableCellSelection = function() {
    // Quitar clase de selección de la tabla
    if (this.currentSelectionTable) {
      this.currentSelectionTable.classList.remove('mewyse-table-selecting');
    }

    this.selectedTableCells.forEach(function(cell) {
      cell.classList.remove('mewyse-cell-selected');
    });
    this.selectedTableCells = [];
    this.tableCellSelectionStart = null;
    this.isSelectingTableCells = false;
    this.currentSelectionTable = null;

    // Refrescar el estado de la toolbar (deshabilita "combinar" al perder la
    // selección de rango). _updateTableToolbar es seguro y se autogestiona.
    if (this._updateTableToolbar) this._updateTableToolbar();
  };

  /**
   * Combina las celdas seleccionadas
   * @param {number} blockId
   */
  meWYSE.prototype.mergeSelectedCells = function(blockId) {
    if (this.selectedTableCells.length < 2) return;

    var table = this.currentSelectionTable;
    if (!table) return;

    // Construir matriz lógica
    var matrix = this.buildTableMatrix(table);

    // Obtener los límites de la selección usando coordenadas lógicas
    var minRow = Infinity, maxRow = -1, minCol = Infinity, maxCol = -1;
    var self = this;

    this.selectedTableCells.forEach(function(cell) {
      var coords = self.getTableCellCoords(cell);
      if (coords) {
        // También considerar el colspan/rowspan de la celda
        var colspan = parseInt(cell.getAttribute('colspan')) || 1;
        var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;

        minRow = Math.min(minRow, coords.row);
        maxRow = Math.max(maxRow, coords.row + rowspan - 1);
        minCol = Math.min(minCol, coords.col);
        maxCol = Math.max(maxCol, coords.col + colspan - 1);
      }
    });

    if (maxRow < 0 || maxCol < 0) return; // sin coordenadas válidas

    // Expandir el rectángulo hasta que contenga POR COMPLETO cualquier celda con
    // colspan/rowspan que lo solape parcialmente. Sin esto, una celda a caballo
    // del borde se eliminaría igualmente y dejaría filas con menos celdas (tabla
    // corrupta). El bucle repite hasta que el rectángulo se estabiliza.
    var v_changed = true;
    while (v_changed) {
      v_changed = false;
      var v_range = this.getCellsInRange(table, minRow, maxRow, minCol, maxCol);
      for (var vi = 0; vi < v_range.length; vi++) {
        var v_rc = v_range[vi];
        var v_co = this.getTableCellCoords(v_rc);
        if (!v_co) continue;
        var v_cs = parseInt(v_rc.getAttribute('colspan')) || 1;
        var v_rs = parseInt(v_rc.getAttribute('rowspan')) || 1;
        if (v_co.row < minRow) { minRow = v_co.row; v_changed = true; }
        if (v_co.row + v_rs - 1 > maxRow) { maxRow = v_co.row + v_rs - 1; v_changed = true; }
        if (v_co.col < minCol) { minCol = v_co.col; v_changed = true; }
        if (v_co.col + v_cs - 1 > maxCol) { maxCol = v_co.col + v_cs - 1; v_changed = true; }
      }
    }

    var rowSpan = maxRow - minRow + 1;
    var colSpan = maxCol - minCol + 1;

    // Obtener todas las celdas únicas en el rango (ya expandido)
    var cellsToMerge = this.getCellsInRange(table, minRow, maxRow, minCol, maxCol);

    // Obtener el contenido combinado de todas las celdas
    var combinedContent = '';
    cellsToMerge.forEach(function(cell) {
      var cellContent = cell.querySelector('p, h1, h2, h3, blockquote, pre');
      if (cellContent && cellContent.innerHTML.trim()) {
        if (combinedContent) combinedContent += '<br>';
        combinedContent += cellContent.innerHTML;
      }
    });

    // La primera celda en la matriz será la celda combinada
    var firstCell = matrix[minRow] ? matrix[minRow][minCol] : null;
    if (!firstCell) return; // tabla irregular: abortar sin romper nada

    // Eliminar atributos anteriores
    firstCell.removeAttribute('colspan');
    firstCell.removeAttribute('rowspan');

    // Establecer nuevos atributos
    if (rowSpan > 1) firstCell.setAttribute('rowspan', rowSpan);
    if (colSpan > 1) firstCell.setAttribute('colspan', colSpan);

    // Establecer el contenido combinado
    var contentElement = firstCell.querySelector('p, h1, h2, h3, blockquote, pre');
    if (contentElement) {
      contentElement.innerHTML = combinedContent;
    }

    // Eliminar las demás celdas (excepto la primera)
    cellsToMerge.forEach(function(cell) {
      if (cell !== firstCell) {
        cell.remove();
      }
    });

    // Limpiar selección
    this.clearTableCellSelection();

    // Refrescar controles de tabla
    this.refreshTableControls(table, blockId);

    // Guardar cambios (updateBlockContent ya dispara triggerChange)
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Descombina una celda combinada
   * @param {HTMLElement} cell - La celda combinada
   * @param {number} blockId
   */
  meWYSE.prototype.unmergeCell = function(cell, blockId) {
    var table = cell.closest('table');
    if (!table) return;

    var colspan = parseInt(cell.getAttribute('colspan')) || 1;
    var rowspan = parseInt(cell.getAttribute('rowspan')) || 1;

    if (colspan === 1 && rowspan === 1) return; // No está combinada

    var coords = this.getTableCellCoords(cell);
    if (!coords) return;

    var rows = table.querySelectorAll('tr');
    var startRow = coords.row;
    var startCol = coords.col;

    // Matriz lógica ANTES de quitar los spans: refleja la región combinada que
    // ocupa `cell`, para colocar las celdas nuevas respetando los rowspans de
    // otras celdas (el cálculo anterior por colspans se desalineaba con ellos).
    var v_matrix = this.buildTableMatrix(table);
    var v_tag = cell.tagName.toLowerCase();

    // Eliminar atributos de combinación de la celda original
    cell.removeAttribute('colspan');
    cell.removeAttribute('rowspan');

    // Crear las celdas faltantes fila por fila
    for (var r = 0; r < rowspan; r++) {
      var row = rows[startRow + r];
      if (!row) continue;

      if (r === 0) {
        // Primera fila: insertar las celdas nuevas justo tras la celda original.
        var v_after = cell;
        for (var c0 = 1; c0 < colspan; c0++) {
          var v_nc0 = this._createEmptyTableCell(blockId, v_tag, cell);
          if (v_after.nextSibling) {
            row.insertBefore(v_nc0, v_after.nextSibling);
          } else {
            row.appendChild(v_nc0);
          }
          v_after = v_nc0;
        }
      } else {
        // Filas siguientes: insertar antes de la referencia lógica (matrix-aware),
        // que respeta las columnas ocupadas por rowspans de otras celdas.
        var v_ref = this.findInsertPosition(v_matrix, startRow + r, row, startCol);
        for (var c1 = 0; c1 < colspan; c1++) {
          var v_nc1 = this._createEmptyTableCell(blockId, v_tag, cell);
          if (v_ref) {
            row.insertBefore(v_nc1, v_ref);
          } else {
            row.appendChild(v_nc1);
          }
        }
      }
    }

    // Limpiar selección
    this.clearTableCellSelection();

    // Refrescar controles de tabla
    this.refreshTableControls(table, blockId);

    // Guardar cambios (updateBlockContent ya dispara triggerChange)
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Encuentra la celda DOM ante la que insertar para colocar algo en la columna
   * lógica `targetCol` de una fila. Es MATRIX-AWARE: usa la matriz lógica para
   * calcular la columna de inicio real de cada celda de la fila, de modo que los
   * rowspans que "cuelgan" de filas superiores (y que no son celdas DOM de esta
   * fila) se tienen en cuenta. Devuelve la primera celda cuya columna de inicio
   * es >= targetCol, o null si hay que insertar al final.
   *
   * @param {Array} matrix - matriz lógica (buildTableMatrix)
   * @param {number} rowIdx - índice de la fila en la matriz
   * @param {HTMLElement} rowEl - elemento <tr> correspondiente
   * @param {number} targetCol - columna lógica objetivo
   * @returns {HTMLElement|null}
   */
  meWYSE.prototype.findInsertPosition = function(matrix, rowIdx, rowEl, targetCol) {
    var cells = rowEl.querySelectorAll('td, th');
    var matrixRow = matrix[rowIdx] || [];

    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      // Columna lógica de INICIO de esta celda: primera columna que ocupa en su
      // fila (respeta el desplazamiento causado por rowspans de filas de arriba).
      var startCol = -1;
      for (var c = 0; c < matrixRow.length; c++) {
        if (matrixRow[c] === cell) { startCol = c; break; }
      }
      if (startCol === -1) continue; // celda no localizada en la matriz: ignorar
      if (startCol >= targetCol) return cell;
    }

    return null;
  };

  /**
   * Añade controles de fila/columna a una tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableControls = function(table, blockId) {
    // No-op: los controles hamburguesa de fila/columna se sustituyeron por la
    // toolbar contextual flotante (showTableToolbar). Se conserva el método para
    // compatibilidad con las llamadas existentes.
  };

  /**
   * Añade una nueva fila a la tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableRow = function(table, blockId) {
    // Insertar una fila al final usando el número de columnas LÓGICO (la última
    // fila no puede tener rowspans entrantes, así que recibe celdas frescas).
    var v_rows = table.querySelectorAll('tr');
    this._insertTableRowAt(table, v_rows.length, blockId);

    // Actualizar controles
    this.refreshTableControls(table, blockId);

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Añade una nueva columna a la tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.addTableColumn = function(table, blockId) {
    // Insertar una columna al final (posición lógica = nº de columnas)
    var v_colCount = this._logicalColCount(this.buildTableMatrix(table));
    this._insertTableColumnAt(table, v_colCount, blockId);

    // Actualizar controles
    this.refreshTableControls(table, blockId);

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Refresca los controles de una tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.refreshTableControls = function(table, blockId) {
    // Limpiar restos de controles hamburguesa antiguos (por si vinieran de
    // contenido guardado previo a la migración a la toolbar)
    var existingControls = table.querySelectorAll('.mewyse-table-row-control, .mewyse-table-col-control');
    for (var i = 0; i < existingControls.length; i++) {
      existingControls[i].remove();
    }

    // Asegurar eventos de selección de celdas
    this.addTableSelectionEvents(table, blockId);

    // Reposicionar/refrescar la toolbar contextual tras cambios estructurales
    this._updateTableToolbar();
  };

  // =========================================================================
  // TOOLBAR CONTEXTUAL DE TABLA (estilo TinyMCE)
  // Aparece encima de la tabla cuando el caret está dentro de una celda y no
  // hay texto/imagen seleccionada. Centraliza todas las operaciones de tabla.
  // =========================================================================

  /**
   * Resuelve la celda de tabla "activa" (la del foco/caret, o la primera de una
   * selección de rango de celdas) junto con su tabla y blockId.
   * @returns {Object|null} { cell, table, blockId }
   */
  meWYSE.prototype._getActiveTableCell = function() {
    var cell = null;

    // 1. Selección de rango de celdas (drag): usar la primera
    if (this.selectedTableCells && this.selectedTableCells.length > 0) {
      cell = this.selectedTableCells[0];
    } else {
      // 2. Desde el elemento con foco
      var active = document.activeElement;
      if (active && this.container.contains(active) && active.closest) {
        cell = active.closest('td, th');
      }
      // 3. Desde la selección/caret actual
      if (!cell) {
        var sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          var node = sel.getRangeAt(0).startContainer;
          node = (node.nodeType === 3) ? node.parentNode : node;
          if (node && this.container.contains(node) && node.closest) {
            cell = node.closest('td, th');
          }
        }
      }
    }

    if (!cell || !this.container.contains(cell)) return null;
    var table = cell.closest('table');
    var blockEl = cell.closest('.mewyse-block');
    if (!table || !blockEl) return null;
    var blockId = parseInt(blockEl.getAttribute('data-block-id'), 10);
    if (isNaN(blockId)) return null;
    return { cell: cell, table: table, blockId: blockId };
  };

  /**
   * Decide si mostrar/ocultar la toolbar de tabla según el foco y la selección.
   * Se llama desde selectionchange, focusin/focusout y tras acciones de tabla.
   */
  meWYSE.prototype._updateTableToolbar = function() {
    if (this._destroyed || this.readOnly) { this.hideTableToolbar(); return; }
    // No competir con la selección de imagen
    if (this.selectedImage) { this.hideTableToolbar(); return; }

    var info = this._getActiveTableCell();
    if (!info) { this.hideTableToolbar(); return; }

    // Si hay selección de TEXTO (rango no colapsado) deja paso al format menu,
    // salvo que sea una selección de rango de CELDAS (para combinar).
    var sel = window.getSelection();
    var hasTextSelection = sel && sel.rangeCount > 0 && !sel.isCollapsed && sel.toString().trim() !== '';
    if (hasTextSelection && (!this.selectedTableCells || this.selectedTableCells.length === 0)) {
      this.hideTableToolbar();
      return;
    }

    this.showTableToolbar(info);
  };

  /**
   * Muestra (creando si hace falta) la toolbar y la reconstruye según el estado.
   * @param {Object} info - { cell, table, blockId }
   */
  meWYSE.prototype.showTableToolbar = function(info) {
    var needNew = !this._tableToolbar;
    if (needNew) {
      this._tableToolbar = document.createElement('div');
      this._tableToolbar.className = 'mewyse-table-toolbar';
      this._tableToolbar.setAttribute('role', 'toolbar');
      this._tableToolbar.setAttribute('aria-label', this.t('tableMenu.toolbarLabel'));
      document.body.appendChild(this._tableToolbar);
      this._applyMenuTheme(this._tableToolbar);
      // Tooltips propios (estilizados) también en la toolbar de tabla, como en la
      // toolbar principal y el menú flotante. La delegación vive en el contenedor,
      // así que sigue funcionando aunque _buildTableToolbar recree los botones.
      this._attachTooltips(this._tableToolbar);
    }

    this._buildTableToolbar(info);

    // (Re)anclar encima de la tabla, centrado. Solo reinicia el seguimiento si
    // es nueva o cambió la tabla de referencia (evita reiniciar el rAF en cada
    // pulsación de tecla).
    if (needNew || this._toolbarAnchoredTable !== info.table) {
      if (this._tableToolbar._cancelAnchor) this._tableToolbar._cancelAnchor();
      this.anchorMenu(this._tableToolbar, info.table, { offsetY: 8, centerX: true, placement: 'above' });
      this._toolbarAnchoredTable = info.table;
    }
    this._activeTableBlockId = info.blockId;
  };

  /**
   * Oculta y destruye la toolbar de tabla.
   */
  meWYSE.prototype.hideTableToolbar = function() {
    if (this._tableToolbar) {
      if (this._tableToolbar._cancelAnchor) this._tableToolbar._cancelAnchor();
      this._detachTooltips(this._tableToolbar);
      if (this._tableToolbar.parentNode) this._tableToolbar.parentNode.removeChild(this._tableToolbar);
      this._tableToolbar = null;
    }
    this._toolbarAnchoredTable = null;
    this._activeTableBlockId = null;
  };

  /**
   * Vuelve a poner el foco en una celda de la tabla (tras una acción) para que
   * la toolbar permanezca anclada y resoluble.
   * @param {HTMLElement} table
   */
  meWYSE.prototype._refocusTable = function(table) {
    if (!table) return;
    var ed = table.querySelector('[contenteditable="true"]');
    if (ed) { try { ed.focus(); } catch (e) {} }
  };

  /**
   * (Re)construye los botones de la toolbar según la celda activa y el estado de
   * combinación. rowIndex/colIndex son LÓGICOS (respetan colspan/rowspan).
   * @param {Object} info - { cell, table, blockId }
   */
  meWYSE.prototype._buildTableToolbar = function(info) {
    var self = this;
    var table = info.table;
    var blockId = info.blockId;
    var coords = this.getTableCellCoords(info.cell) || { row: 0, col: 0 };
    var rowIndex = coords.row;
    var colIndex = coords.col;

    // Estado combinar/descombinar
    var mergeEnabled = this.selectedTableCells && this.selectedTableCells.length >= 2;
    var unmergeTarget = null;
    var checkCell = (this.selectedTableCells && this.selectedTableCells.length === 1)
      ? this.selectedTableCells[0] : info.cell;
    if (checkCell) {
      var cs = parseInt(checkCell.getAttribute('colspan')) || 1;
      var rs = parseInt(checkCell.getAttribute('rowspan')) || 1;
      if (cs > 1 || rs > 1) unmergeTarget = checkCell;
    }

    // Evitar reconstruir los ~15 botones SVG en cada selectionchange (p.ej. al
    // teclear o mover el caret dentro de la MISMA celda). Solo se reconstruye si
    // cambia algo que afecte a los botones: bloque, índices lógicos, estado de
    // combinar/descombinar o la propia celda (identidad, cubre re-renders).
    var v_sig = blockId + '|' + rowIndex + '|' + colIndex + '|' +
                (mergeEnabled ? 1 : 0) + '|' + (unmergeTarget ? 1 : 0);
    if (this._tableToolbar._sig === v_sig &&
        this._tableToolbar._sigCell === info.cell &&
        this._tableToolbar.childNodes.length) {
      return;
    }
    this._tableToolbar._sig = v_sig;
    this._tableToolbar._sigCell = info.cell;

    // Limpiar contenido previo
    this._tableToolbar.innerHTML = '';

    var makeBtn = function(icon, titleKey, handler, opts) {
      opts = opts || {};
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mewyse-table-toolbar-btn' + (opts.danger ? ' danger' : '');
      b.innerHTML = icon;
      var label = self.t(titleKey);
      b.title = label;
      b.setAttribute('aria-label', label);
      if (opts.disabled) { b.disabled = true; b.classList.add('disabled'); }
      // mousedown con preventDefault: NO perder el foco/caret de la celda
      b.onmousedown = function(e) { e.preventDefault(); e.stopPropagation(); };
      b.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (b.disabled) return;
        handler(b);
      };
      return b;
    };
    var sep = function() {
      var s = document.createElement('span');
      s.className = 'mewyse-table-toolbar-sep';
      return s;
    };
    // Ejecuta una acción y vuelve a enfocar la tabla para mantener la toolbar
    var run = function(fn) {
      fn();
      self._refocusTable(table);
      self._updateTableToolbar();
    };

    var tb = this._tableToolbar;
    var I = WYSIWYG_ICONS;

    // --- Grupo FILA ---
    tb.appendChild(makeBtn(I.tableRowAbove, 'tableMenu.insertRowAbove', function(){ run(function(){ self.executeRowAction(table, rowIndex, 'insertBefore', blockId); }); }));
    tb.appendChild(makeBtn(I.tableRowBelow, 'tableMenu.insertRowBelow', function(){ run(function(){ self.executeRowAction(table, rowIndex, 'insertAfter', blockId); }); }));
    tb.appendChild(makeBtn(I.tableRowDuplicate, 'tableMenu.duplicateRow', function(){ run(function(){ self.executeRowAction(table, rowIndex, 'duplicate', blockId); }); }));
    tb.appendChild(makeBtn(I.tableRowClear, 'tableMenu.clearRowContent', function(){ run(function(){ self.executeRowAction(table, rowIndex, 'clear', blockId); }); }));
    tb.appendChild(makeBtn(I.tableRowDelete, 'tableMenu.deleteRow', function(){ run(function(){ self.executeRowAction(table, rowIndex, 'delete', blockId); }); }, { danger: true }));

    tb.appendChild(sep());

    // --- Grupo COLUMNA ---
    tb.appendChild(makeBtn(I.tableColLeft, 'tableMenu.insertColumnLeft', function(){ run(function(){ self.executeColAction(table, colIndex, 'insertBefore', blockId); }); }));
    tb.appendChild(makeBtn(I.tableColRight, 'tableMenu.insertColumnRight', function(){ run(function(){ self.executeColAction(table, colIndex, 'insertAfter', blockId); }); }));
    tb.appendChild(makeBtn(I.tableColDuplicate, 'tableMenu.duplicateColumn', function(){ run(function(){ self.executeColAction(table, colIndex, 'duplicate', blockId); }); }));
    tb.appendChild(makeBtn(I.tableColClear, 'tableMenu.clearColumnContent', function(){ run(function(){ self.executeColAction(table, colIndex, 'clear', blockId); }); }));
    tb.appendChild(makeBtn(I.tableColDelete, 'tableMenu.deleteColumn', function(){ run(function(){ self.executeColAction(table, colIndex, 'delete', blockId); }); }, { danger: true }));

    tb.appendChild(sep());

    // --- Grupo CELDA (combinar / descombinar) ---
    tb.appendChild(makeBtn(I.mergeCells, 'tableMenu.mergeCells', function(){
      run(function(){ self.mergeSelectedCells(blockId); });
    }, { disabled: !mergeEnabled }));
    tb.appendChild(makeBtn(I.unmergeCells, 'tableMenu.unmergeCells', function(){
      run(function(){ if (unmergeTarget) self.unmergeCell(unmergeTarget, blockId); });
    }, { disabled: !unmergeTarget }));

    tb.appendChild(sep());

    // --- Grupo ESTILO (color de fondo de celdas) ---
    tb.appendChild(makeBtn(I.palette, 'tableMenu.backgroundColor', function(btn){
      var cells = (self.selectedTableCells && self.selectedTableCells.length > 0)
        ? self.selectedTableCells.slice() : [info.cell];
      self.showCellColorPicker(cells, blockId, btn);
    }));

    tb.appendChild(sep());

    // --- Grupo TABLA ---
    tb.appendChild(makeBtn(I.gear, 'tableMenu.tableProperties', function(){
      self.showTablePropertiesModal(blockId);
    }));
    tb.appendChild(makeBtn(I.resetWidth, 'tableMenu.resetTableWidth', function(){
      run(function(){ self.resetTableColumnWidths(blockId); });
    }));
    tb.appendChild(makeBtn(I.trash, 'tableMenu.deleteTable', function(){
      self.hideTableToolbar();
      self.deleteBlock(blockId);
    }, { danger: true }));
  };

  /**
   * Muestra un selector de color que aplica el fondo a un conjunto de celdas.
   * Reemplaza al antiguo color por fila/columna (que usaba índice DOM).
   * @param {Array} cells - celdas destino
   * @param {number} blockId
   * @param {HTMLElement} anchorEl - botón de anclaje
   */
  meWYSE.prototype.showCellColorPicker = function(cells, blockId, anchorEl) {
    var self = this;
    if (!cells || !cells.length) return;
    var table = cells[0].closest('table');
    if (!table) return;

    // Cerrar picker existente
    var existing = document.querySelector('.mewyse-color-picker');
    if (existing) { if (existing._cancelAnchor) existing._cancelAnchor(); existing.remove(); }

    var picker = document.createElement('div');
    picker.className = 'mewyse-color-picker';

    var closePicker = function() {
      if (picker._cancelAnchor) picker._cancelAnchor();
      if (picker.parentNode) picker.remove();
    };

    var colors = [
      '#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#ffffff',
      '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
      '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc'
    ];

    var apply = function(color) {
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = color;
      }
      self.updateBlockContent(blockId, table.innerHTML);
      self.triggerChange();
      closePicker();
      self._refocusTable(table);
      self._updateTableToolbar();
    };

    colors.forEach(function(color) {
      var cb = document.createElement('button');
      cb.type = 'button';
      cb.className = 'mewyse-color-button';
      cb.style.backgroundColor = color;
      cb.title = color;
      cb.onmousedown = function(e) { e.preventDefault(); e.stopPropagation(); };
      cb.onclick = function(e) { e.preventDefault(); e.stopPropagation(); apply(color); };
      picker.appendChild(cb);
    });

    // Botón para quitar color
    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'mewyse-color-button mewyse-color-remove';
    removeBtn.innerHTML = WYSIWYG_ICONS.close;
    removeBtn.title = self.t('colors.removeColor');
    removeBtn.onmousedown = function(e) { e.preventDefault(); e.stopPropagation(); };
    removeBtn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); apply(''); };
    picker.appendChild(removeBtn);

    self._applyMenuTheme(picker);
    document.body.appendChild(picker);
    this.anchorMenu(picker, anchorEl, { offsetY: 5, centerX: true });

    // Cerrar al hacer clic fuera (registrado para limpieza en destroy)
    setTimeout(function() {
      self._add_doc_click(function closeColorMenu(e) {
        if (!picker.contains(e.target) && e.target !== anchorEl) {
          closePicker();
          self._remove_doc_click(closeColorMenu);
        }
      });
    }, 10);
  };

  /**
   * Ejecuta una acción sobre una fila
   * @param {HTMLElement} table
   * @param {number} rowIndex
   * @param {string} action
   * @param {number} blockId
   */
  meWYSE.prototype.executeRowAction = function(table, rowIndex, action, blockId) {
    var rows = table.querySelectorAll('tr');
    if (!rows[rowIndex]) return;

    switch (action) {
      case 'insertBefore':
        this._insertTableRowAt(table, rowIndex, blockId);
        break;

      case 'insertAfter':
        this._insertTableRowAt(table, rowIndex + 1, blockId);
        break;

      case 'duplicate':
        // Insertar una fila vacía debajo y copiar el contenido de las celdas
        // originales en las celdas nuevas que correspondan (por columna lógica).
        this._duplicateTableRow(table, rowIndex, blockId);
        break;

      case 'clear':
        // Limpiar el contenido de las celdas únicas de la fila (respeta spans)
        var v_matrix = this.buildTableMatrix(table);
        var v_cols = this._logicalColCount(v_matrix);
        var v_seen = [];
        for (var c = 0; c < v_cols; c++) {
          var v_cell = v_matrix[rowIndex] ? v_matrix[rowIndex][c] : null;
          if (!v_cell || v_seen.indexOf(v_cell) !== -1) continue;
          v_seen.push(v_cell);
          var v_inner = v_cell.querySelector('p, h1, h2, h3, blockquote, pre');
          if (v_inner) { v_inner.innerHTML = ''; } else { v_cell.innerHTML = ''; }
        }
        break;

      case 'delete':
        if (rows.length > 1) {
          this._deleteTableRowAt(table, rowIndex, blockId);
        } else {
          alert(this.t('alerts.cannotDeleteLastRow'));
          return;
        }
        break;
    }

    // Actualizar controles y guardar
    this.refreshTableControls(table, blockId);
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Duplica una fila lógica: inserta una fila vacía debajo y copia el contenido
   * de las celdas originales en las celdas nuevas según su columna lógica.
   * @param {HTMLElement} table
   * @param {number} rowIndex
   * @param {number} blockId
   */
  meWYSE.prototype._duplicateTableRow = function(table, rowIndex, blockId) {
    // Capturar el contenido de la fila original por columna lógica ANTES de
    // modificar la tabla
    var v_srcMatrix = this.buildTableMatrix(table);
    var v_cols = this._logicalColCount(v_srcMatrix);
    var v_srcHtml = {};
    for (var c = 0; c < v_cols; c++) {
      var v_src = v_srcMatrix[rowIndex] ? v_srcMatrix[rowIndex][c] : null;
      if (v_src) {
        var v_inner = v_src.querySelector('p, h1, h2, h3, blockquote, pre');
        v_srcHtml[c] = v_inner ? v_inner.innerHTML : '';
      }
    }

    // Insertar fila vacía debajo
    this._insertTableRowAt(table, rowIndex + 1, blockId);

    // Volcar el contenido en las celdas nuevas que se originan en la fila nueva
    var v_newMatrix = this.buildTableMatrix(table);
    var v_newRowIdx = rowIndex + 1;
    var v_done = [];
    for (var c2 = 0; c2 < v_cols; c2++) {
      var v_cell = v_newMatrix[v_newRowIdx] ? v_newMatrix[v_newRowIdx][c2] : null;
      if (!v_cell || v_done.indexOf(v_cell) !== -1) continue;
      // Solo las celdas que se ORIGINAN en la fila nueva (no rowspans de arriba)
      var v_aboveNew = v_newMatrix[v_newRowIdx - 1] ? v_newMatrix[v_newRowIdx - 1][c2] : null;
      if (v_aboveNew === v_cell) continue;
      v_done.push(v_cell);
      if (typeof v_srcHtml[c2] === 'string') {
        var v_innerNew = v_cell.querySelector('p, h1, h2, h3, blockquote, pre');
        if (v_innerNew) v_innerNew.innerHTML = v_srcHtml[c2];
      }
    }
  };

  /**
   * Ejecuta una acción sobre una columna
   * @param {HTMLElement} table
   * @param {number} colIndex
   * @param {string} action
   * @param {number} blockId
   */
  meWYSE.prototype.executeColAction = function(table, colIndex, action, blockId) {
    switch (action) {
      case 'insertBefore':
        this._insertTableColumnAt(table, colIndex, blockId);
        break;

      case 'insertAfter':
        this._insertTableColumnAt(table, colIndex + 1, blockId);
        break;

      case 'duplicate':
        // Insertar columna a la derecha y copiar el contenido de la original
        this._duplicateTableColumn(table, colIndex, blockId);
        break;

      case 'clear':
        // Limpiar el contenido de las celdas únicas de la columna (respeta spans)
        var v_matrix = this.buildTableMatrix(table);
        var v_seen = [];
        for (var r = 0; r < v_matrix.length; r++) {
          var v_cell = v_matrix[r] ? v_matrix[r][colIndex] : null;
          if (!v_cell || v_seen.indexOf(v_cell) !== -1) continue;
          v_seen.push(v_cell);
          var v_inner = v_cell.querySelector('p, h1, h2, h3, blockquote, pre');
          if (v_inner) { v_inner.innerHTML = ''; } else { v_cell.innerHTML = ''; }
        }
        break;

      case 'delete':
        var v_colCount = this._logicalColCount(this.buildTableMatrix(table));
        if (v_colCount > 1) {
          this._deleteTableColumnAt(table, colIndex, blockId);
        } else {
          alert(this.t('alerts.cannotDeleteLastColumn'));
          return;
        }
        break;
    }

    // Actualizar controles y guardar
    this.refreshTableControls(table, blockId);
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Duplica una columna lógica: inserta una columna a la derecha y copia el
   * contenido de las celdas originales en las nuevas según su fila lógica.
   * @param {HTMLElement} table
   * @param {number} colIndex
   * @param {number} blockId
   */
  meWYSE.prototype._duplicateTableColumn = function(table, colIndex, blockId) {
    // Capturar contenido de la columna original por fila ANTES de modificar
    var v_srcMatrix = this.buildTableMatrix(table);
    var v_srcHtml = {};
    for (var r = 0; r < v_srcMatrix.length; r++) {
      var v_src = v_srcMatrix[r] ? v_srcMatrix[r][colIndex] : null;
      if (v_src) {
        var v_inner = v_src.querySelector('p, h1, h2, h3, blockquote, pre');
        v_srcHtml[r] = v_inner ? v_inner.innerHTML : '';
      }
    }

    // Insertar columna a la derecha
    var v_newCol = colIndex + 1;
    this._insertTableColumnAt(table, v_newCol, blockId);

    // Volcar contenido en las celdas que se originan en la columna nueva
    var v_newMatrix = this.buildTableMatrix(table);
    var v_done = [];
    for (var r2 = 0; r2 < v_newMatrix.length; r2++) {
      var v_cell = v_newMatrix[r2] ? v_newMatrix[r2][v_newCol] : null;
      if (!v_cell || v_done.indexOf(v_cell) !== -1) continue;
      // Solo celdas que se originan en la columna nueva (no colspans desde la izquierda)
      var v_leftNew = v_newMatrix[r2] ? v_newMatrix[r2][v_newCol - 1] : null;
      if (v_leftNew === v_cell) continue;
      v_done.push(v_cell);
      if (typeof v_srcHtml[r2] === 'string') {
        var v_innerNew = v_cell.querySelector('p, h1, h2, h3, blockquote, pre');
        if (v_innerNew) v_innerNew.innerHTML = v_srcHtml[r2];
      }
    }
  };

  /**
   * Restablece los anchos de columna de una tabla al 100%
   * @param {number} blockId
   */
  meWYSE.prototype.resetTableColumnWidths = function(blockId) {
    var blockElement = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (!blockElement) return;

    var table = blockElement.querySelector('table');
    if (!table) return;

    // Eliminar los atributos de ancho de todas las celdas y la tabla
    table.style.width = '100%';
    table.style.tableLayout = '';

    var cells = table.querySelectorAll('td, th');
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.width = '';
      cells[i].removeAttribute('width');
    }

    // Guardar cambios
    this.updateBlockContent(blockId, table.innerHTML);
  };

  /**
   * Habilita el redimensionamiento de columnas en una tabla
   * @param {HTMLElement} table
   * @param {number} blockId
   */
  meWYSE.prototype.enableColumnResizing = function(table, blockId) {
    var self = this;

    // Establecer table-layout fixed para que funcione el redimensionamiento
    table.style.tableLayout = 'fixed';

    // Obtener todas las celdas de la primera fila para añadir los handles de redimensionamiento
    var firstRow = table.querySelector('tr');
    if (!firstRow) return;

    var cells = firstRow.querySelectorAll('td, th');

    for (var i = 0; i < cells.length; i++) {
      // No añadir handle a la última columna
      if (i === cells.length - 1) continue;

      var cell = cells[i];
      var nextCell = cells[i + 1];

      // Crear el handle de redimensionamiento
      var resizeHandle = document.createElement('div');
      resizeHandle.className = 'mewyse-table-resize-handle';
      resizeHandle.contentEditable = false;

      // Posicionar el handle
      cell.style.position = 'relative';
      cell.appendChild(resizeHandle);

      // Usar un closure para capturar las variables correctas
      (function(currentCell, currentNextCell) {
        // Variables para el arrastre
        var startX, startWidth, nextStartWidth;

        resizeHandle.addEventListener('mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();

          startX = e.pageX;
          startWidth = currentCell.offsetWidth;
          nextStartWidth = currentNextCell ? currentNextCell.offsetWidth : 0;

          // Añadir clase de redimensionamiento
          table.classList.add('mewyse-table-resizing');

          // Event listeners para el arrastre
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
          var diff = e.pageX - startX;

          // Calcular nuevos anchos
          var newWidth = startWidth + diff;
          var newNextWidth = nextStartWidth - diff;

          // Establecer anchos mínimos
          var minWidth = 50;
          if (newWidth >= minWidth && newNextWidth >= minWidth) {
            currentCell.style.width = newWidth + 'px';
            if (currentNextCell) {
              currentNextCell.style.width = newNextWidth + 'px';
            }
          }
        }

        function onMouseUp() {
          // Remover clase de redimensionamiento
          table.classList.remove('mewyse-table-resizing');

          // Remover event listeners
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          // Guardar cambios
          self.updateBlockContent(blockId, table.innerHTML);
        }
      })(cell, nextCell);
    }
  };

  /**
   * Maneja los eventos keyup para detectar "/"
   * @param {KeyboardEvent} e
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.handleKeyUp = function(e, blockId, element) {
    // Ignorar teclas de navegación para no interferir con los menús
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' || e.key === 'Enter' || e.key === 'Escape' ||
        e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
      return;
    }

    // El texto sobre el que detectamos triggers (`/` `@` `#` `:`) IGNORA el
    // contenido de spans atómicos contenteditable=false (mewyse-mention,
    // mewyse-tag, mewyse-emoji). Sin esto, al borrar el espacio que sigue a
    // un tag con texto `#xxx` el matcher dispararía el menú falsamente —
    // creyendo que el usuario tecleó `#xxx`. El texto del tag no es texto
    // editable por el usuario y debe excluirse del matcher.
    var text = this._editableTextContent(element);

    // ===== MENÚ SLASH =====
    // Buscar "/" al inicio o después de espacio
    var slashMatch = text.match(/(^|\s)\/([\wÀ-ſ]*)$/);

    if (slashMatch) {
      var searchText = slashMatch[2]; // Texto después del "/"

      if (!this.slashMenu) {
        // Abrir el menú si no está ya abierto
        this.showSlashMenu(blockId, element);
      }

      // Filtrar el menú con el texto de búsqueda
      if (this.slashMenu) {
        this.filterSlashMenu(searchText);
      }
      return; // No procesar menciones si estamos en slash menu
    } else if (this.slashMenu) {
      // Cerrar menú si el "/" ya no está
      this.closeSlashMenu();
    }

    // ===== MENÚ DE MENCIONES (@) =====
    if (this.mentions.length > 0) {
      // Buscar "@" al inicio o después de espacio
      var mentionMatch = text.match(/(^|\s)@([\wÀ-ſ]*)$/);

      if (mentionMatch) {
        var mentionSearchText = mentionMatch[2]; // Texto después del "@"

        if (!this.mentionMenu) {
          // Abrir el menú si no está ya abierto
          this.showMentionMenu(blockId, element);
        }

        // Filtrar el menú con el texto de búsqueda
        if (this.mentionMenu) {
          this.filterMentionMenu(mentionSearchText);
        }
        return; // No procesar emojis si estamos en menú de menciones
      } else if (this.mentionMenu) {
        // Cerrar menú si el "@" ya no está
        this.closeMentionMenu();
      }
    }

    // ===== MENÚ DE ETIQUETAS (#) =====
    // Mismo patrón que @mentions: trigger al inicio o tras espacio.
    if (this.tags.length > 0) {
      var tagMatch = text.match(/(^|\s)#([\wÀ-ſ-]*)$/);

      if (tagMatch) {
        var tagSearchText = tagMatch[2];

        if (!this.tagMenu) {
          this.showTagMenu(blockId, element);
        }

        if (this.tagMenu) {
          this.filterTagMenu(tagSearchText);
        }
        return;
      } else if (this.tagMenu) {
        this.closeTagMenu();
      }
    }

    // ===== MENÚ DE VARIABLES / MERGE TAGS ({{) =====
    // Puede aparecer en cualquier posición inline (no solo al inicio/tras espacio).
    if (this.mergeTags.length > 0) {
      var mergeMatch = text.match(/\{\{([\w.]*)$/);
      if (mergeMatch) {
        if (!this.mergeTagMenu) {
          this.showMergeTagMenu(blockId, element);
        }
        if (this.mergeTagMenu) {
          this.filterMergeTagMenu(mergeMatch[1]);
        }
        return;
      } else if (this.mergeTagMenu) {
        this.closeMergeTagMenu();
      }
    }

    // ===== MENÚ DE EMOJI PICKER (:) =====
    // Buscar ":" al inicio o después de espacio (no pegado a palabra)
    var emojiMatch = text.match(/(^|\s):([a-zA-Z0-9_]*)$/);

    if (emojiMatch) {
      var emojiSearchText = emojiMatch[2]; // Texto después del ":"

      if (!this.emojiMenu) {
        // Abrir el menú si no está ya abierto
        this.showEmojiMenu(blockId, element);
      }

      // Filtrar el menú con el texto de búsqueda
      if (this.emojiMenu) {
        this.filterEmojiMenu(emojiSearchText);
      }
    } else if (this.emojiMenu) {
      // Cerrar menú si el ":" ya no está
      this.closeEmojiMenu();
    }
  };

  /**
   * Muestra el menú de comandos con "/"
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.showSlashMenu = function(blockId, element) {
    var self = this;

    // Cerrar menú existente
    this.closeSlashMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-slash-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', this.t('blockMenu.changeType'));
    // Evitar que clicar el menú quite el foco del bloque (que dispararía un
    // onBlur espurio): preventDefault en mousedown mantiene el caret; el click
    // de los items sigue funcionando.
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });
    this.slashMenu = menu;
    this.slashMenuSelectedIndex = 0;
    this.slashMenuElement = element;
    this.slashMenuBlockId = blockId;

    var types = [
      { type: 'paragraph', icon: WYSIWYG_ICONS.paragraph },
      { type: 'heading1', icon: WYSIWYG_ICONS.heading1 },
      { type: 'heading2', icon: WYSIWYG_ICONS.heading2 },
      { type: 'heading3', icon: WYSIWYG_ICONS.heading3 },
      { type: 'quote', icon: WYSIWYG_ICONS.quote },
      { type: 'code', icon: WYSIWYG_ICONS.code },
      { type: 'bulletList', icon: WYSIWYG_ICONS.bulletList },
      { type: 'numberList', icon: WYSIWYG_ICONS.numberList },
      { type: 'checklist', icon: WYSIWYG_ICONS.checklist },
      { type: 'table', icon: WYSIWYG_ICONS.table },
      { type: 'image', icon: WYSIWYG_ICONS.image },
      { type: 'video', icon: WYSIWYG_ICONS.video },
      { type: 'audio', icon: WYSIWYG_ICONS.audio },
      { type: 'divider', icon: WYSIWYG_ICONS.divider },
      { type: 'pageBreak', icon: WYSIWYG_ICONS.pageBreak },
      { type: 'callout', icon: WYSIWYG_ICONS.callout },
      { type: 'toggle', icon: WYSIWYG_ICONS.toggle },
      { type: 'toc', icon: WYSIWYG_ICONS.toc }
    ];

    // Filtrar los tipos desactivados por opción (disabledBlocks)
    var self_sm = this;
    types = types.filter(function(t) { return !self_sm._isBlockDisabled(t.type); });

    this.slashMenuTypes = types;

    types.forEach(function(typeInfo, index) {
      var item = document.createElement('div');
      item.className = 'mewyse-slash-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);
      item.innerHTML = '<span class="icon">' + typeInfo.icon + '</span>' +
                       '<div class="info"><div class="label">' + self.t('blockTypes.' + typeInfo.type) + '</div>' +
                       '<div class="description">' + self.t('blockTypeDescriptions.' + typeInfo.type) + '</div></div>';
      item.onclick = function() {
        self.selectSlashMenuItem(index);
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Anclar el menú al elemento
    this.anchorMenu(menu, element, { offsetY: 5 });

    // Seleccionar el primer elemento por defecto
    this.updateSlashMenuSelection();

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      self._add_doc_click(function closeMenu(e) {
        if (self.slashMenu && !self.slashMenu.contains(e.target) && e.target !== element) {
          self.closeSlashMenu();
          self._remove_doc_click(closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('slashMenu', function() { self.closeSlashMenu(); });
  };

  /**
   * Actualiza la selección visual del menú slash
   */
  meWYSE.prototype.updateSlashMenuSelection = function() {
    if (!this.slashMenu) return;

    // Solo considerar elementos visibles
    var visibleItems = this.slashMenu.querySelectorAll('.mewyse-slash-menu-item:not([style*="display: none"])');

    for (var i = 0; i < visibleItems.length; i++) {
      if (i === this.slashMenuSelectedIndex) {
        visibleItems[i].classList.add('selected');
        visibleItems[i].setAttribute('aria-selected', 'true');
        visibleItems[i].scrollIntoView({ block: 'nearest', behavior: 'auto' });
      } else {
        visibleItems[i].classList.remove('selected');
        visibleItems[i].setAttribute('aria-selected', 'false');
      }
    }
  };

  /**
   * Normaliza un texto eliminando tildes y caracteres especiales
   * @param {string} text - Texto a normalizar
   * @returns {string}
   */
  meWYSE.prototype.normalizeText = function(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Eliminar diacríticos (tildes, acentos, etc.)
  };

  /**
   * Filtra el menú slash según el texto de búsqueda
   * @param {string} searchText - Texto a buscar
   */
  meWYSE.prototype.filterSlashMenu = function(searchText) {
    if (!this.slashMenu || !this.slashMenuTypes) return;

    var self = this;
    var items = this.slashMenu.querySelectorAll('.mewyse-slash-menu-item');
    var searchNormalized = this.normalizeText(searchText);
    var visibleCount = 0;

    // Filtrar elementos
    this.slashMenuTypes.forEach(function(typeInfo, index) {
      var item = items[index];
      if (!item) return;

      // Obtener el label traducido y normalizarlo
      var label = self.t('blockTypes.' + typeInfo.type);
      var labelNormalized = self.normalizeText(label);

      // Mostrar solo si el texto de búsqueda está en el label (normalizado)
      if (searchText === '' || labelNormalized.indexOf(searchNormalized) !== -1) {
        item.style.display = '';
        item.setAttribute('data-visible-index', visibleCount);
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.removeAttribute('data-visible-index');
      }
    });

    // Resetear índice de selección al primer elemento visible
    this.slashMenuSelectedIndex = 0;
    this.updateSlashMenuSelection();
  };

  /**
   * Navega hacia arriba en el menú slash
   */
  meWYSE.prototype.slashMenuNavigateUp = function() {
    this._navigateMenu('slashMenu', '.mewyse-slash-menu-item', 'slashMenuSelectedIndex', 'updateSlashMenuSelection', 'up');
  };

  /**
   * Navega hacia abajo en el menú slash
   */
  meWYSE.prototype.slashMenuNavigateDown = function() {
    this._navigateMenu('slashMenu', '.mewyse-slash-menu-item', 'slashMenuSelectedIndex', 'updateSlashMenuSelection', 'down');
  };

  /**
   * Selecciona un elemento del menú slash
   * @param {number} index
   */
  meWYSE.prototype.selectSlashMenuItem = function(index) {
    if (!this.slashMenu || !this.slashMenuElement) return;

    // `index` es SIEMPRE el índice real en slashMenuTypes (el data-index del item):
    // el clic lo pasa directamente y el teclado lo resuelve antes con
    // _resolveMenuFullIndex. Así no hay ambigüedad visual/real (que hacía que un
    // clic con filtro activo eligiera el item equivocado).
    var typeInfo = this.slashMenuTypes[index];
    if (!typeInfo) return;
    var element = this.slashMenuElement;
    var blockId = this.slashMenuBlockId;

    // Eliminar el "/" y el texto de búsqueda del contenido del bloque
    var block = this.getBlock(blockId);
    if (block) {
      var text = block.content;
      // Usar regex para encontrar y eliminar "/" seguido de texto de búsqueda
      var slashMatch = text.match(/(^|\s)\/[\wÀ-ſ]*$/);
      if (slashMatch) {
        block.content = text.substring(0, text.length - slashMatch[0].length + (slashMatch[1] ? 1 : 0));
      }
    }

    this.closeSlashMenu();

    // Manejo especial para imagen: abrir selector de archivos
    if (typeInfo.type === 'image') {
      var self = this;
      var blockIndex = this.getBlockIndex(blockId);

      // Si el bloque actual está vacío, lo eliminamos y usamos su posición
      if (block && (!block.content || block.content.trim() === '')) {
        this.deleteBlock(blockId);
      } else {
        // Si tiene contenido, insertamos después
        blockIndex++;
      }

      // Usar el file input persistente
      var fileInput = this._getFileInput();
      fileInput.onchange = function() {
        var file = fileInput.files && fileInput.files[0];
        fileInput.value = '';
        if (!file || !/^image\//.test(file.type)) return;
        if (!self._validateImageSize(file)) return;
        self.showImageDimensionsModal(file, blockIndex);
      };
      fileInput.click();
    } else if (typeInfo.type === 'video' || typeInfo.type === 'audio') {
      // video/audio: si el bloque actual está vacío, eliminarlo y abrir modal.
      // insertVideoBlock/insertAudioBlock calculan el insertIndex por su cuenta.
      if (block && (!block.content || (typeof block.content === 'string' && block.content.trim() === ''))) {
        this.deleteBlock(blockId);
      }
      if (typeInfo.type === 'video') this.insertVideoBlock();
      else this.insertAudioBlock();
    } else {
      // Para otros tipos, cambiar el tipo de bloque normalmente
      this.changeBlockType(blockId, typeInfo.type);
    }
  };

  /**
   * Cierra el menú de comandos "/"
   */
  meWYSE.prototype.closeSlashMenu = function() {
    this._closeMenu('slashMenu');
    this.slashMenuSelectedIndex = 0;
    this.slashMenuElement = null;
    this.slashMenuBlockId = null;
    this.slashMenuTypes = null;
    this._hideBackdrop('slashMenu');
  };

  // =========================================================================
  // SISTEMA DE MENCIONES (@mentions)
  // =========================================================================

  /**
   * Muestra el menú de menciones
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.showMentionMenu = function(blockId, element) {
    var self = this;

    // Cerrar menú existente
    this.closeMentionMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-mention-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', self.t('aria.mentions'));
    // Mantener el foco del bloque al clicar el menú (evita onBlur espurio)
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });
    this.mentionMenu = menu;
    this.mentionMenuSelectedIndex = 0;
    this.mentionMenuElement = element;
    this.mentionMenuBlockId = blockId;
    this.mentionMenuItems = this.mentions.slice(); // Copia del array

    // Guardar la selección actual para usarla al insertar con click
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.mentionMenuRange = selection.getRangeAt(0).cloneRange();
    }

    // Crear items del menú
    this.mentions.forEach(function(mention, index) {
      var item = document.createElement('div');
      item.className = 'mewyse-mention-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);

      // Avatar si existe
      if (mention.avatar) {
        var avatar = document.createElement('img');
        avatar.className = 'mewyse-mention-avatar';
        avatar.src = mention.avatar;
        avatar.alt = mention.name;
        item.appendChild(avatar);
      } else {
        // Avatar placeholder con inicial
        var avatarPlaceholder = document.createElement('span');
        avatarPlaceholder.className = 'mewyse-mention-avatar-placeholder';
        avatarPlaceholder.textContent = mention.name.charAt(0).toUpperCase();
        item.appendChild(avatarPlaceholder);
      }

      var nameSpan = document.createElement('span');
      nameSpan.className = 'mewyse-mention-name';
      nameSpan.textContent = mention.name;
      item.appendChild(nameSpan);

      // Usar mousedown para evitar pérdida de foco
      item.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Restaurar la selección guardada antes de insertar
        if (self.mentionMenuRange) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(self.mentionMenuRange);
        }
        self.selectMentionItem(index);
      });

      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Posicionar el menú cerca del cursor (donde se escribió @)
    this.positionMentionMenuAtCaret(menu);

    // Actualizar selección inicial
    this.updateMentionMenuSelection();

    this._showBackdrop('mentionMenu', function() { self.closeMentionMenu(); });
  };

  /**
   * Posiciona un menú flotante (menciones, tags, etc.) cerca del cursor/caret.
   * Se usa para todos los autocompletes anclados al cursor — la única condición
   * para seguir reposicionando es que el menú siga en el DOM (mientras esté
   * `parentNode` no es null), independientemente de qué propiedad del editor
   * lo referencie.
   * @param {HTMLElement} menu
   */
  meWYSE.prototype.positionMentionMenuAtCaret = function(menu) {
    var self = this;

    function updatePosition() {
      if (!menu.parentNode) {
        return;
      }

      var selection = window.getSelection();
      if (!selection.rangeCount) {
        return;
      }

      // Obtener la posición del cursor
      var range = selection.getRangeAt(0);
      var caretRect = range.getBoundingClientRect();

      // Si no hay rect válido (cursor al inicio), usar el elemento
      if (caretRect.width === 0 && caretRect.height === 0) {
        var tempRange = range.cloneRange();
        var tempSpan = document.createElement('span');
        tempSpan.textContent = '\u200B'; // Zero-width space
        tempRange.insertNode(tempSpan);
        caretRect = tempSpan.getBoundingClientRect();
        tempSpan.parentNode.removeChild(tempSpan);
        // Restaurar selección
        selection.removeAllRanges();
        selection.addRange(range);
      }

      var menuRect = menu.getBoundingClientRect();
      var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      menu.style.position = 'fixed';

      // Posición horizontal: alineado con el cursor
      var left = caretRect.left;

      // Si el menú se sale por la derecha, ajustar
      if (left + menuRect.width > viewportWidth - 10) {
        left = viewportWidth - menuRect.width - 10;
      }

      // Si se sale por la izquierda, ajustar
      if (left < 10) {
        left = 10;
      }

      // Posición vertical: debajo del cursor
      var top = caretRect.bottom + 5;

      // Si el menú se sale por abajo, mostrarlo arriba del cursor
      if (top + menuRect.height > viewportHeight - 10) {
        top = caretRect.top - menuRect.height - 5;
      }

      // Si tampoco cabe arriba, posicionarlo lo mejor posible
      if (top < 10) {
        top = 10;
      }

      menu.style.left = left + 'px';
      menu.style.top = top + 'px';

      // Continuar actualizando mientras el menú siga en el DOM. El cleanup
      // por `_cancelAnchor` (llamado desde _closeMenu) cancela este rAF al
      // cerrar, así que no hace falta acoplar a una propiedad concreta.
      if (menu.parentNode) {
        menu._animationFrameId = requestAnimationFrame(updatePosition);
      }
    }

    // Iniciar el bucle de posicionamiento
    updatePosition();

    // Guardar referencia para cancelar
    menu._cancelAnchor = function() {
      if (menu._animationFrameId) {
        cancelAnimationFrame(menu._animationFrameId);
      }
    };
  };

  /**
   * Filtra el menú de menciones según el texto de búsqueda
   * @param {string} searchText
   */
  meWYSE.prototype.filterMentionMenu = function(searchText) {
    if (!this.mentionMenu) return;

    var self = this;
    var searchLower = searchText.toLowerCase();
    var items = this.mentionMenu.querySelectorAll('.mewyse-mention-menu-item');
    var visibleCount = 0;

    this.mentionMenuItems = [];

    this.mentions.forEach(function(mention, index) {
      var item = items[index];
      var matches = mention.name.toLowerCase().indexOf(searchLower) !== -1;

      if (matches) {
        item.style.display = '';
        self.mentionMenuItems.push(mention);
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Resetear selección si está fuera de rango
    if (this.mentionMenuSelectedIndex >= visibleCount) {
      this.mentionMenuSelectedIndex = 0;
    }

    this.updateMentionMenuSelection();

    // Cerrar menú si no hay resultados
    if (visibleCount === 0) {
      this.closeMentionMenu();
    }
  };

  /**
   * Actualiza la selección visual del menú de menciones
   */
  meWYSE.prototype.updateMentionMenuSelection = function() {
    if (!this.mentionMenu) return;

    var items = this.mentionMenu.querySelectorAll('.mewyse-mention-menu-item');
    var visibleItems = this.mentionMenu.querySelectorAll('.mewyse-mention-menu-item:not([style*="display: none"])');

    items.forEach(function(item) {
      item.classList.remove('selected');
      item.setAttribute('aria-selected', 'false');
    });

    if (visibleItems[this.mentionMenuSelectedIndex]) {
      visibleItems[this.mentionMenuSelectedIndex].classList.add('selected');
      visibleItems[this.mentionMenuSelectedIndex].setAttribute('aria-selected', 'true');
    }
  };

  /**
   * Navega hacia arriba en el menú de menciones
   */
  meWYSE.prototype.mentionMenuNavigateUp = function() {
    this._navigateMenu('mentionMenu', '.mewyse-mention-menu-item', 'mentionMenuSelectedIndex', 'updateMentionMenuSelection', 'up');
  };

  /**
   * Navega hacia abajo en el menú de menciones
   */
  meWYSE.prototype.mentionMenuNavigateDown = function() {
    this._navigateMenu('mentionMenu', '.mewyse-mention-menu-item', 'mentionMenuSelectedIndex', 'updateMentionMenuSelection', 'down');
  };

  /**
   * Selecciona un item del menú de menciones e inserta la mención
   * @param {number} index - Índice en el array original de mentions
   */
  meWYSE.prototype.selectMentionItem = function(index) {
    if (!this.mentionMenu || !this.mentionMenuElement) return;

    // `index` es SIEMPRE el índice real en this.mentions (el data-index del item):
    // el clic lo pasa directamente y el teclado lo resuelve con _resolveMenuFullIndex.
    var mention = this.mentions[index];
    if (!mention) return;
    this.insertMention(mention);
  };

  /**
   * Inserta una mención en el contenido
   * @param {Object} mention - Objeto con id y name
   */
  meWYSE.prototype.insertMention = function(mention) {
    var element = this.mentionMenuElement;

    // Crear el span de mención
    var mentionSpan = document.createElement('span');
    mentionSpan.className = 'mewyse-mention';
    mentionSpan.setAttribute('data-mention-id', mention.id);
    mentionSpan.setAttribute('data-mention-name', mention.name);
    mentionSpan.setAttribute('contenteditable', 'false');
    mentionSpan.textContent = '@' + mention.name;

    // Obtener la selección actual
    var selection = window.getSelection();
    if (!selection.rangeCount) {
      this.closeMentionMenu();
      return;
    }

    // Buscar y eliminar el "@..." que activó el menú
    var textContent = element.textContent;
    var mentionMatch = textContent.match(/(^|\s)@([\wÀ-ſ]*)$/);

    if (mentionMatch) {
      // Encontrar la posición del @ en el texto
      var atPosition = textContent.lastIndexOf('@');

      // Crear un TreeWalker para encontrar el nodo de texto correcto
      var walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      var currentPos = 0;
      var targetNode = null;
      var nodeOffset = 0;

      while (walker.nextNode()) {
        var node = walker.currentNode;
        var nodeLength = node.textContent.length;

        if (currentPos + nodeLength > atPosition) {
          targetNode = node;
          nodeOffset = atPosition - currentPos;
          break;
        }
        currentPos += nodeLength;
      }

      if (targetNode) {
        // Crear rango para seleccionar desde @ hasta el final del texto filtrado
        var deleteRange = document.createRange();
        deleteRange.setStart(targetNode, nodeOffset);
        deleteRange.setEndAfter(element.lastChild || element);

        // Eliminar el texto @...
        deleteRange.deleteContents();

        // Insertar el span de mención
        deleteRange.insertNode(mentionSpan);

        // Insertar un espacio después de la mención para poder continuar escribiendo
        var spaceNode = document.createTextNode('\u00A0'); // Non-breaking space
        mentionSpan.parentNode.insertBefore(spaceNode, mentionSpan.nextSibling);

        // Mover el cursor después del espacio
        var newRange = document.createRange();
        newRange.setStartAfter(spaceNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }

    // Actualizar el contenido del bloque con el innerHTML (incluyendo la mención)
    this.updateBlockContent(this.mentionMenuBlockId, element.innerHTML);

    this.closeMentionMenu();
  };

  /**
   * Cierra el menú de menciones
   */
  meWYSE.prototype.closeMentionMenu = function() {
    this._closeMenu('mentionMenu');
    this.mentionMenuSelectedIndex = 0;
    this.mentionMenuElement = null;
    this.mentionMenuBlockId = null;
    this.mentionMenuItems = [];
    this.mentionMenuRange = null;
    this._hideBackdrop('mentionMenu');
  };

  // ============================================
  // SISTEMA DE EMOJI PICKER
  // ============================================

  /**
   * Muestra el menú de selección de emojis
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.showEmojiMenu = function(blockId, element) {
    var self = this;

    // Cerrar menú existente
    this.closeEmojiMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-emoji-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', self.t('aria.emoji'));
    // Mantener el foco del bloque al clicar el menú (evita onBlur espurio)
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });

    // Guardar la selección actual antes de crear el menú
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.emojiMenuRange = selection.getRangeAt(0).cloneRange();
    }

    // Crear items del menú
    this.emojiMenuItems = [];
    for (var i = 0; i < WYSIWYG_EMOJIS.length; i++) {
      var emojiData = WYSIWYG_EMOJIS[i];
      this.emojiMenuItems.push(emojiData);

      var item = document.createElement('div');
      item.className = 'mewyse-emoji-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', i);

      // Emoji
      var emojiSpan = document.createElement('span');
      emojiSpan.className = 'emoji';
      emojiSpan.textContent = emojiData.emoji;
      item.appendChild(emojiSpan);

      // Nombre
      var nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.textContent = ':' + emojiData.name + ':';
      item.appendChild(nameSpan);

      // Click handler
      (function(index) {
        item.addEventListener('mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();
          self.selectEmojiItem(index);
        });
      })(i);

      menu.appendChild(item);
    }

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this.emojiMenu = menu;
    this.emojiMenuSelectedIndex = 0;
    this.emojiMenuElement = element;
    this.emojiMenuBlockId = blockId;

    // Posicionar el menú
    this.positionEmojiMenuAtCaret(menu);

    // Actualizar selección visual
    this.updateEmojiMenuSelection();

    this._showBackdrop('emojiMenu', function() { self.closeEmojiMenu(); });
  };

  /**
   * Posiciona el menú de emojis en la posición del cursor
   * @param {HTMLElement} menu
   */
  meWYSE.prototype.positionEmojiMenuAtCaret = function(menu) {
    var self = this;
    var cancelled = false;

    function updatePosition() {
      if (cancelled || !self.emojiMenu) return;

      var selection = window.getSelection();
      if (!selection.rangeCount) {
        requestAnimationFrame(updatePosition);
        return;
      }

      var range = selection.getRangeAt(0);
      var caretRect = range.getBoundingClientRect();

      // Si el cursor está al inicio y no tiene bounding box visible
      if (caretRect.width === 0 && caretRect.height === 0 && caretRect.top === 0) {
        var tempSpan = document.createElement('span');
        tempSpan.textContent = '\u200B';
        range.insertNode(tempSpan);
        caretRect = tempSpan.getBoundingClientRect();
        tempSpan.parentNode.removeChild(tempSpan);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      var menuRect = menu.getBoundingClientRect();
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;

      // Posición horizontal
      var left = caretRect.left;
      if (left + menuRect.width > viewportWidth - 10) {
        left = viewportWidth - menuRect.width - 10;
      }
      if (left < 10) left = 10;

      // Posición vertical (debajo del cursor)
      var top = caretRect.bottom + 5;
      if (top + menuRect.height > viewportHeight - 10) {
        top = caretRect.top - menuRect.height - 5;
      }

      menu.style.left = left + 'px';
      menu.style.top = top + 'px';

      requestAnimationFrame(updatePosition);
    }

    updatePosition();

    // Guardar función de cancelación
    menu._cancelAnchor = function() {
      cancelled = true;
    };
  };

  /**
   * Filtra el menú de emojis según el texto de búsqueda
   * @param {string} searchText
   */
  meWYSE.prototype.filterEmojiMenu = function(searchText) {
    if (!this.emojiMenu) return;

    var searchLower = searchText.toLowerCase();
    var items = this.emojiMenu.querySelectorAll('.mewyse-emoji-menu-item');
    var visibleCount = 0;

    this.emojiMenuItems = [];

    for (var i = 0; i < WYSIWYG_EMOJIS.length; i++) {
      var emojiData = WYSIWYG_EMOJIS[i];
      var item = items[i];
      var matches = emojiData.name.toLowerCase().indexOf(searchLower) !== -1;

      if (matches) {
        item.style.display = '';
        this.emojiMenuItems.push(emojiData);
        item.setAttribute('data-visible-index', visibleCount);
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    }

    // Ajustar índice seleccionado si está fuera de rango
    if (this.emojiMenuSelectedIndex >= visibleCount) {
      this.emojiMenuSelectedIndex = 0;
    }

    this.updateEmojiMenuSelection();

    // Cerrar si no hay resultados
    if (visibleCount === 0) {
      this.closeEmojiMenu();
    }
  };

  /**
   * Actualiza la selección visual en el menú de emojis
   */
  meWYSE.prototype.updateEmojiMenuSelection = function() {
    if (!this.emojiMenu) return;

    var items = this.emojiMenu.querySelectorAll('.mewyse-emoji-menu-item');
    var visibleIndex = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.style.display !== 'none') {
        if (visibleIndex === this.emojiMenuSelectedIndex) {
          item.classList.add('selected');
          item.setAttribute('aria-selected', 'true');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('selected');
          item.setAttribute('aria-selected', 'false');
        }
        visibleIndex++;
      } else {
        item.classList.remove('selected');
        item.setAttribute('aria-selected', 'false');
      }
    }
  };

  /**
   * Navega hacia arriba en el menú de emojis
   */
  meWYSE.prototype.emojiMenuNavigateUp = function() {
    this._navigateMenu('emojiMenu', '.mewyse-emoji-menu-item', 'emojiMenuSelectedIndex', 'updateEmojiMenuSelection', 'up');
  };

  /**
   * Navega hacia abajo en el menú de emojis
   */
  meWYSE.prototype.emojiMenuNavigateDown = function() {
    this._navigateMenu('emojiMenu', '.mewyse-emoji-menu-item', 'emojiMenuSelectedIndex', 'updateEmojiMenuSelection', 'down');
  };

  /**
   * Selecciona un emoji del menú
   * @param {number} index
   */
  meWYSE.prototype.selectEmojiItem = function(index) {
    // `index` es SIEMPRE el índice real en WYSIWYG_EMOJIS (el data-index del item):
    // el clic lo pasa directamente y el teclado lo resuelve con _resolveMenuFullIndex.
    if (index >= 0 && index < WYSIWYG_EMOJIS.length) {
      this.insertEmoji(WYSIWYG_EMOJIS[index]);
    }
  };

  /**
   * Inserta un emoji en el contenido
   * @param {Object} emojiData - Objeto con name y emoji
   */
  meWYSE.prototype.insertEmoji = function(emojiData) {
    var element = this.emojiMenuElement;
    var blockId = this.emojiMenuBlockId;

    if (!element || !emojiData) {
      this.closeEmojiMenu();
      return;
    }

    // Obtener la selección actual
    var selection = window.getSelection();
    if (!selection.rangeCount) {
      this.closeEmojiMenu();
      return;
    }

    var range = selection.getRangeAt(0);

    // Buscar el patrón ":texto" antes del cursor
    var container = range.startContainer;
    var offset = range.startOffset;

    // Si es un nodo de texto
    if (container.nodeType === 3) {
      var text = container.textContent;
      var textBeforeCursor = text.substring(0, offset);

      // Buscar el patrón :palabra al final
      var match = textBeforeCursor.match(/(^|\s):([a-zA-Z0-9_]*)$/);

      if (match) {
        var colonIndex = textBeforeCursor.lastIndexOf(':');
        // Si hay espacio antes del ":", incluirlo en el cálculo
        var startIndex = colonIndex;
        if (colonIndex > 0 && textBeforeCursor[colonIndex - 1] === ' ') {
          startIndex = colonIndex; // Mantener el espacio
        }

        // Crear el rango para eliminar ":texto"
        var deleteRange = document.createRange();
        deleteRange.setStart(container, startIndex);
        deleteRange.setEnd(container, offset);

        // Eliminar el texto ":busqueda"
        deleteRange.deleteContents();

        // Crear el span del emoji
        var emojiSpan = document.createElement('span');
        emojiSpan.setAttribute('data-name', emojiData.name);
        emojiSpan.setAttribute('data-type', 'emoji');
        emojiSpan.setAttribute('contenteditable', 'false');
        emojiSpan.className = 'mewyse-emoji';
        emojiSpan.textContent = emojiData.emoji;

        // Insertar el emoji
        deleteRange.insertNode(emojiSpan);

        // Añadir un espacio después del emoji
        var spaceNode = document.createTextNode('\u00A0');
        emojiSpan.parentNode.insertBefore(spaceNode, emojiSpan.nextSibling);

        // Mover el cursor después del espacio
        var newRange = document.createRange();
        newRange.setStartAfter(spaceNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);

        // Actualizar el contenido del bloque
        this.updateBlockContent(blockId, element.innerHTML);
      }
    }

    this.closeEmojiMenu();
  };

  /**
   * Cierra el menú de emojis
   */
  meWYSE.prototype.closeEmojiMenu = function() {
    this._closeMenu('emojiMenu');
    this.emojiMenuSelectedIndex = 0;
    this.emojiMenuElement = null;
    this.emojiMenuBlockId = null;
    this.emojiMenuItems = [];
    this.emojiMenuRange = null;
    this._hideBackdrop('emojiMenu');
  };

  // =========================================================================
  // SISTEMA DE ETIQUETAS (#tags)
  // =========================================================================

  /**
   * Construye el HTML inline de un tag (cápsula). Reusable desde insertTag y
   * desde la preview en el menú. El color es opcional — si no se proporciona,
   * la cápsula hereda el color genérico definido por CSS (.mewyse-tag).
   */
  /**
   * Devuelve el textContent del elemento EXCLUYENDO el texto que vive dentro
   * de spans atómicos contenteditable=false (mention/tag/emoji). Lo usa el
   * detector de triggers (`/`, `@`, `#`, `:`) en `handleKeyUp` para que el
   * matcher no vea el texto de los átomos como si fuera texto del usuario.
   */
  meWYSE.prototype._editableTextContent = function(element) {
    var ATOMIC_CLASSES = { 'mewyse-mention': 1, 'mewyse-tag': 1, 'mewyse-emoji': 1, 'mewyse-mergetag': 1 };
    var out = '';
    function walk(node) {
      if (!node) return;
      if (node.nodeType === 3) {
        out += node.textContent;
        return;
      }
      if (node.nodeType !== 1) return;
      // Skip atomic span subtree — su texto no es del usuario
      if (node.classList) {
        for (var i = 0; i < node.classList.length; i++) {
          if (ATOMIC_CLASSES[node.classList[i]]) return;
        }
      }
      var c = node.firstChild;
      while (c) {
        walk(c);
        c = c.nextSibling;
      }
    }
    walk(element);
    return out;
  };

  meWYSE.prototype._renderTagCapsule = function(tag) {
    var span = document.createElement('span');
    span.className = 'mewyse-tag';
    span.setAttribute('data-tag-id', String(tag.id));
    span.setAttribute('data-tag-name', tag.name);
    span.setAttribute('contenteditable', 'false');
    if (typeof tag.color === 'string' && tag.color) {
      span.setAttribute('data-tag-color', tag.color);
      // El sanitizer permite background-color y color en el style. Aplicamos
      // texto blanco/negro según el brillo del fondo para legibilidad.
      var fg = this._pickContrastColor(tag.color);
      span.setAttribute('style', 'background-color: ' + tag.color + '; color: ' + fg);
    }
    span.textContent = '#' + tag.name;
    return span;
  };

  /**
   * Devuelve un color de texto legible (blanco u oscuro) sobre un fondo dado.
   * Soporta hex (#rgb, #rrggbb), rgb(...) y nombres CSS comunes. Para colores
   * que no parsea cae en blanco como default seguro.
   */
  meWYSE.prototype._pickContrastColor = function(bg) {
    var rgb = this._parseColorToRGB(bg);
    if (!rgb) return '#fff';
    // Luminancia relativa simplificada (W3C — versión rápida).
    var lum = (rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722) / 255;
    return lum > 0.6 ? '#1a1a1a' : '#fff';
  };

  meWYSE.prototype._parseColorToRGB = function(s) {
    if (typeof s !== 'string') return null;
    s = s.trim().toLowerCase();
    // Hex #rgb, #rrggbb
    var m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
    if (m) {
      var hex = m[1];
      if (hex.length === 3) hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
      return [parseInt(hex.substr(0, 2), 16), parseInt(hex.substr(2, 2), 16), parseInt(hex.substr(4, 2), 16)];
    }
    // rgb(r,g,b) / rgba(r,g,b,a)
    m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (m) return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
    return null;
  };

  meWYSE.prototype.showTagMenu = function(blockId, element) {
    var self = this;

    this.closeTagMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-tag-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', self.t('aria.tags'));
    this.tagMenu = menu;
    this.tagMenuSelectedIndex = 0;
    this.tagMenuElement = element;
    this.tagMenuBlockId = blockId;
    this.tagMenuItems = this.tags.slice();

    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.tagMenuRange = selection.getRangeAt(0).cloneRange();
    }

    this.tags.forEach(function(tag, index) {
      var item = document.createElement('div');
      item.className = 'mewyse-tag-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);

      // Swatch visual del color
      var swatch = document.createElement('span');
      swatch.className = 'mewyse-tag-menu-swatch';
      if (typeof tag.color === 'string' && tag.color) {
        swatch.style.backgroundColor = tag.color;
      }
      item.appendChild(swatch);

      var nameSpan = document.createElement('span');
      nameSpan.className = 'mewyse-tag-menu-name';
      nameSpan.textContent = tag.name;
      item.appendChild(nameSpan);

      item.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (self.tagMenuRange) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(self.tagMenuRange);
        }
        self.selectTagItem(index);
      });

      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Reusamos exactamente el posicionamiento del menú de menciones.
    this.positionMentionMenuAtCaret(menu);

    this.updateTagMenuSelection();

    this._showBackdrop('tagMenu', function() { self.closeTagMenu(); });
  };

  meWYSE.prototype.filterTagMenu = function(searchText) {
    if (!this.tagMenu) return;

    var self = this;
    var searchLower = searchText.toLowerCase();
    var items = this.tagMenu.querySelectorAll('.mewyse-tag-menu-item');
    var visibleCount = 0;

    this.tagMenuItems = [];

    this.tags.forEach(function(tag, index) {
      var item = items[index];
      var matches = tag.name.toLowerCase().indexOf(searchLower) !== -1;
      if (matches) {
        item.style.display = '';
        self.tagMenuItems.push(tag);
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (this.tagMenuSelectedIndex >= visibleCount) {
      this.tagMenuSelectedIndex = 0;
    }
    this.updateTagMenuSelection();

    if (visibleCount === 0) {
      this.closeTagMenu();
    }
  };

  meWYSE.prototype.updateTagMenuSelection = function() {
    if (!this.tagMenu) return;
    var items = this.tagMenu.querySelectorAll('.mewyse-tag-menu-item');
    var visibleItems = this.tagMenu.querySelectorAll('.mewyse-tag-menu-item:not([style*="display: none"])');
    items.forEach(function(item) {
      item.classList.remove('selected');
      item.setAttribute('aria-selected', 'false');
    });
    if (visibleItems[this.tagMenuSelectedIndex]) {
      visibleItems[this.tagMenuSelectedIndex].classList.add('selected');
      visibleItems[this.tagMenuSelectedIndex].setAttribute('aria-selected', 'true');
    }
  };

  meWYSE.prototype.tagMenuNavigateUp = function() {
    this._navigateMenu('tagMenu', '.mewyse-tag-menu-item', 'tagMenuSelectedIndex', 'updateTagMenuSelection', 'up');
  };
  meWYSE.prototype.tagMenuNavigateDown = function() {
    this._navigateMenu('tagMenu', '.mewyse-tag-menu-item', 'tagMenuSelectedIndex', 'updateTagMenuSelection', 'down');
  };

  meWYSE.prototype.selectTagItem = function(index) {
    if (!this.tagMenu || !this.tagMenuElement) return;
    // `index` es SIEMPRE el índice real en this.tags (el data-index del item):
    // el clic lo pasa directamente y el teclado lo resuelve con _resolveMenuFullIndex.
    var tag = this.tags[index];
    if (!tag) return;
    this.insertTag(tag);
  };

  meWYSE.prototype.insertTag = function(tag) {
    var element = this.tagMenuElement;
    var tagSpan = this._renderTagCapsule(tag);

    var selection = window.getSelection();
    if (!selection.rangeCount) {
      this.closeTagMenu();
      return;
    }

    // Buscar y eliminar el "#..." que activó el menú
    var textContent = element.textContent;
    var hashMatch = textContent.match(/(^|\s)#([\wÀ-ſ-]*)$/);
    if (hashMatch) {
      var hashPosition = textContent.lastIndexOf('#');
      var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      var currentPos = 0;
      var targetNode = null;
      var nodeOffset = 0;
      while (walker.nextNode()) {
        var node = walker.currentNode;
        var nodeLength = node.textContent.length;
        if (currentPos + nodeLength > hashPosition) {
          targetNode = node;
          nodeOffset = hashPosition - currentPos;
          break;
        }
        currentPos += nodeLength;
      }
      if (targetNode) {
        var deleteRange = document.createRange();
        deleteRange.setStart(targetNode, nodeOffset);
        deleteRange.setEndAfter(element.lastChild || element);
        deleteRange.deleteContents();
        deleteRange.insertNode(tagSpan);
        var spaceNode = document.createTextNode(' ');
        tagSpan.parentNode.insertBefore(spaceNode, tagSpan.nextSibling);
        var newRange = document.createRange();
        newRange.setStartAfter(spaceNode);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }

    this.updateBlockContent(this.tagMenuBlockId, element.innerHTML);
    this.closeTagMenu();
  };

  meWYSE.prototype.closeTagMenu = function() {
    this._closeMenu('tagMenu');
    this.tagMenuSelectedIndex = 0;
    this.tagMenuElement = null;
    this.tagMenuBlockId = null;
    this.tagMenuItems = [];
    this.tagMenuRange = null;
    this._hideBackdrop('tagMenu');
  };

  /* =========================================================================
   * MERGE TAGS / VARIABLES ({{campo}}) — clona el patrón de tags (cápsula no
   * editable + menú filtrable). Trigger `{{`.
   * ======================================================================= */

  meWYSE.prototype._renderMergeTagCapsule = function(mt) {
    var span = document.createElement('span');
    span.className = 'mewyse-mergetag';
    span.setAttribute('data-merge-name', String(mt.name));
    span.setAttribute('contenteditable', 'false');
    span.textContent = '{{' + mt.name + '}}';
    return span;
  };

  meWYSE.prototype.showMergeTagMenu = function(blockId, element) {
    var self = this;
    this.closeMergeTagMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-mergetag-menu';
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', self.t('aria.mergeTags'));
    this.mergeTagMenu = menu;
    this.mergeTagMenuSelectedIndex = 0;
    this.mergeTagMenuElement = element;
    this.mergeTagMenuBlockId = blockId;

    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      this.mergeTagMenuRange = selection.getRangeAt(0).cloneRange();
    }

    this.mergeTags.forEach(function(mt, index) {
      var item = document.createElement('div');
      item.className = 'mewyse-mergetag-menu-item';
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);

      var nameSpan = document.createElement('span');
      nameSpan.className = 'mewyse-mergetag-menu-name';
      nameSpan.textContent = '{{' + mt.name + '}}';
      item.appendChild(nameSpan);
      if (mt.label) {
        var lbl = document.createElement('span');
        lbl.className = 'mewyse-mergetag-menu-label';
        lbl.textContent = mt.label;
        item.appendChild(lbl);
      }

      item.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (self.mergeTagMenuRange) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(self.mergeTagMenuRange);
        }
        self.selectMergeTagItem(index);
      });

      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this.positionMentionMenuAtCaret(menu);
    this.updateMergeTagMenuSelection();
    this._showBackdrop('mergeTagMenu', function() { self.closeMergeTagMenu(); });
  };

  meWYSE.prototype.filterMergeTagMenu = function(searchText) {
    if (!this.mergeTagMenu) return;
    var searchLower = searchText.toLowerCase();
    var items = this.mergeTagMenu.querySelectorAll('.mewyse-mergetag-menu-item');
    var visibleCount = 0;
    this.mergeTags.forEach(function(mt, index) {
      var item = items[index];
      if (!item) return;
      var hay = (mt.name + ' ' + (mt.label || '')).toLowerCase();
      if (hay.indexOf(searchLower) !== -1) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });
    if (this.mergeTagMenuSelectedIndex >= visibleCount) this.mergeTagMenuSelectedIndex = 0;
    this.updateMergeTagMenuSelection();
    if (visibleCount === 0) this.closeMergeTagMenu();
  };

  meWYSE.prototype.updateMergeTagMenuSelection = function() {
    if (!this.mergeTagMenu) return;
    var items = this.mergeTagMenu.querySelectorAll('.mewyse-mergetag-menu-item');
    var visibleItems = this.mergeTagMenu.querySelectorAll('.mewyse-mergetag-menu-item:not([style*="display: none"])');
    items.forEach(function(item) {
      item.classList.remove('selected');
      item.setAttribute('aria-selected', 'false');
    });
    if (visibleItems[this.mergeTagMenuSelectedIndex]) {
      visibleItems[this.mergeTagMenuSelectedIndex].classList.add('selected');
      visibleItems[this.mergeTagMenuSelectedIndex].setAttribute('aria-selected', 'true');
    }
  };

  meWYSE.prototype.mergeTagMenuNavigateUp = function() {
    this._navigateMenu('mergeTagMenu', '.mewyse-mergetag-menu-item', 'mergeTagMenuSelectedIndex', 'updateMergeTagMenuSelection', 'up');
  };
  meWYSE.prototype.mergeTagMenuNavigateDown = function() {
    this._navigateMenu('mergeTagMenu', '.mewyse-mergetag-menu-item', 'mergeTagMenuSelectedIndex', 'updateMergeTagMenuSelection', 'down');
  };

  meWYSE.prototype.selectMergeTagItem = function(index) {
    if (!this.mergeTagMenu || !this.mergeTagMenuElement) return;
    var mt = this.mergeTags[index];
    if (!mt) return;
    this.insertMergeTag(mt);
  };

  meWYSE.prototype.insertMergeTag = function(mt) {
    var element = this.mergeTagMenuElement;
    var capsule = this._renderMergeTagCapsule(mt);

    var selection = window.getSelection();
    if (!selection.rangeCount) { this.closeMergeTagMenu(); return; }

    // Eliminar el "{{..." que activó el menú (si lo hubo) e insertar la cápsula.
    var textContent = element.textContent;
    var trigMatch = textContent.match(/\{\{[\w.]*$/);
    var range;
    if (trigMatch) {
      var trigPos = textContent.lastIndexOf('{{');
      var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      var currentPos = 0, targetNode = null, nodeOffset = 0;
      while (walker.nextNode()) {
        var node = walker.currentNode;
        var nodeLength = node.textContent.length;
        if (currentPos + nodeLength > trigPos) { targetNode = node; nodeOffset = trigPos - currentPos; break; }
        currentPos += nodeLength;
      }
      if (targetNode) {
        range = document.createRange();
        range.setStart(targetNode, nodeOffset);
        range.setEndAfter(element.lastChild || element);
        range.deleteContents();
      }
    }
    if (!range) {
      // Sin trigger (inserción desde botón): usar el caret actual.
      range = selection.getRangeAt(0);
      range.deleteContents();
    }
    range.insertNode(capsule);
    var spaceNode = document.createTextNode(' ');
    capsule.parentNode.insertBefore(spaceNode, capsule.nextSibling);
    var newRange = document.createRange();
    newRange.setStartAfter(spaceNode);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);

    this.updateBlockContent(this.mergeTagMenuBlockId, element.innerHTML);
    this.closeMergeTagMenu();
  };

  meWYSE.prototype.closeMergeTagMenu = function() {
    this._closeMenu('mergeTagMenu');
    this.mergeTagMenuSelectedIndex = 0;
    this.mergeTagMenuElement = null;
    this.mergeTagMenuBlockId = null;
    this.mergeTagMenuRange = null;
    this._hideBackdrop('mergeTagMenu');
  };

  /**
   * Devuelve el HTML del documento con las variables {{campo}} sustituidas por
   * su valor (escapado). NO muta el modelo — pensado para generar el documento
   * final. `valuesMap` es un objeto { nombreVariable: valor }.
   * @param {Object} valuesMap
   * @returns {string}
   */
  meWYSE.prototype.getResolvedHTML = function(valuesMap) {
    var map = valuesMap || {};
    var html = this.getSafeHTML();
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var caps = tmp.querySelectorAll('span.mewyse-mergetag');
    for (var i = 0; i < caps.length; i++) {
      var name = caps[i].getAttribute('data-merge-name');
      var val = (map.hasOwnProperty(name)) ? map[name] : ('{{' + name + '}}');
      // Sustituir la cápsula por el valor como TEXTO (escapado por textContent).
      caps[i].parentNode.replaceChild(document.createTextNode(val), caps[i]);
    }
    return tmp.innerHTML;
  };

  /**
   * Maneja los eventos de teclado en los bloques
   * @param {KeyboardEvent} e
   * @param {number} blockId
   * @param {HTMLElement} element
   */
  meWYSE.prototype.handleKeyDown = function(e, blockId, element) {
    // Si hay selección cross-block activa
    if (this.crossBlockSelection) {
      var isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        this.executeCrossBlockCopy();
        return;
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        this.deleteCrossBlockSelection();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.clearCrossBlockSelection();
        this.closeFormatMenu();
        return;
      }
    }

    // Si hay bloques seleccionados, manejar Delete/Backspace
    if (this.selectedBlocks.length > 0) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        this.deleteSelectedBlocks();
        return;
      }
      // Escape: limpiar selección
      if (e.key === 'Escape') {
        e.preventDefault();
        this.clearSelection();
        return;
      }
    }

    // Ctrl/Cmd+A: seleccionar TODO el contenido del editor (todos los bloques).
    // Con un solo bloque se deja el comportamiento nativo (selecciona su texto).
    if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A') && !e.shiftKey && !e.altKey) {
      if (this.blocks.length > 1) {
        e.preventDefault();
        this.selectAllBlocks();
      }
      return;
    }

    // Espacio dentro/al final de una cápsula `.mewyse-tag`: redirigir el espacio
    // a DESPUÉS del tag y llevar el cursor allí. Sin este guard, el cursor a
    // veces queda atrapado en la frontera del span contenteditable=false
    // (especialmente tras navegar con flechas o clicar al borde derecho del
    // tag) y el siguiente texto que escribes podría asociarse visualmente al
    // tag o no aparecer.
    if ((e.key === ' ' || e.code === 'Space') && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // --- Autoformato Markdown en vivo (reglas de BLOQUE) ---
      // Al teclear espacio en un párrafo cuyo único texto es un marcador
      // Markdown (#, -, 1., >, [], ```...), convertir el tipo de bloque.
      var v_afBlock = this.getBlock(blockId);
      var v_afSel = window.getSelection();
      if (v_afBlock && v_afBlock.type === 'paragraph' &&
          v_afSel && v_afSel.rangeCount > 0 && v_afSel.getRangeAt(0).collapsed) {
        var v_marker = this._editableTextContent(element);
        var v_afType = null;
        var v_afChecked = false;
        if (v_marker === '#') v_afType = 'heading1';
        else if (v_marker === '##') v_afType = 'heading2';
        else if (v_marker === '###') v_afType = 'heading3';
        else if (v_marker === '-' || v_marker === '*' || v_marker === '+') v_afType = 'bulletList';
        else if (v_marker === '1.') v_afType = 'numberList';
        else if (v_marker === '>') v_afType = 'quote';
        else if (v_marker === '```') v_afType = 'code';
        else if (v_marker === '[]' || v_marker === '[ ]') v_afType = 'checklist';
        else if (v_marker === '[x]' || v_marker === '[X]') { v_afType = 'checklist'; v_afChecked = true; }
        if (v_afType) {
          e.preventDefault();
          v_afBlock.content = '';
          if (v_afType === 'checklist') v_afBlock.checked = v_afChecked;
          // changeBlockType hace pushHistory + render (recoloca el caret) + triggerChange.
          this.changeBlockType(blockId, v_afType);
          return;
        }
      }

      // --- Autoformato inline (**x**, *x*, `x`, ~~x~~) al cerrar el patrón ---
      if (v_afBlock && v_afBlock.type !== 'code' && this._tryInlineAutoformat(element, blockId)) {
        e.preventDefault();
        return;
      }

      var spaceSel = window.getSelection();
      if (spaceSel && spaceSel.rangeCount > 0) {
        var spaceRange = spaceSel.getRangeAt(0);
        if (spaceRange.collapsed) {
          var probe = spaceRange.startContainer;
          if (probe && probe.nodeType === 3) probe = probe.parentNode;
          var tagAncestor = null;
          while (probe && probe !== element) {
            if (probe.classList && probe.classList.contains('mewyse-tag')) {
              tagAncestor = probe;
              break;
            }
            probe = probe.parentNode;
          }
          if (tagAncestor) {
            e.preventDefault();
            var spaceNode = document.createTextNode(' ');
            if (tagAncestor.nextSibling) {
              tagAncestor.parentNode.insertBefore(spaceNode, tagAncestor.nextSibling);
            } else {
              tagAncestor.parentNode.appendChild(spaceNode);
            }
            var newRange = document.createRange();
            newRange.setStartAfter(spaceNode);
            newRange.collapse(true);
            spaceSel.removeAllRanges();
            spaceSel.addRange(newRange);
            this.updateBlockContent(blockId, element.innerHTML);
            return;
          }
        }
      }
    }

    // Si el menú slash está abierto, manejar navegación
    if (this.slashMenu) {
      // Flecha arriba: navegar hacia arriba en el menú
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.slashMenuNavigateUp();
        return;
      }

      // Flecha abajo: navegar hacia abajo en el menú
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.slashMenuNavigateDown();
        return;
      }

      // Enter: seleccionar elemento del menú (convertir índice visual → real)
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectSlashMenuItem(this._resolveMenuFullIndex(this.slashMenu, '.mewyse-slash-menu-item', this.slashMenuSelectedIndex));
        return;
      }

      // Backspace cuando solo hay "/": cerrar menú y borrar "/"
      if (e.key === 'Backspace') {
        var content = element.textContent;
        if (content === '/' || content === ' /') {
          e.preventDefault();
          this.closeSlashMenu();
          element.textContent = content === '/' ? '' : ' ';
          // Mover cursor al final
          var range = document.createRange();
          var sel = window.getSelection();
          if (element.firstChild) {
            range.setStart(element.firstChild, element.textContent.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
          return;
        }
      }

      // Escape: cerrar menú
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeSlashMenu();
        return;
      }
    }

    // Si el menú de menciones está abierto, manejar navegación
    if (this.mentionMenu) {
      // Flecha arriba: navegar hacia arriba en el menú
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.mentionMenuNavigateUp();
        return;
      }

      // Flecha abajo: navegar hacia abajo en el menú
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.mentionMenuNavigateDown();
        return;
      }

      // Enter: seleccionar elemento del menú (convertir índice visual → real)
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectMentionItem(this._resolveMenuFullIndex(this.mentionMenu, '.mewyse-mention-menu-item', this.mentionMenuSelectedIndex));
        return;
      }

      // Escape: cerrar menú
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeMentionMenu();
        return;
      }
    }

    // Si el menú de etiquetas está abierto, manejar navegación
    if (this.tagMenu) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.tagMenuNavigateUp();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.tagMenuNavigateDown();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectTagItem(this._resolveMenuFullIndex(this.tagMenu, '.mewyse-tag-menu-item', this.tagMenuSelectedIndex));
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeTagMenu();
        return;
      }
    }

    // Si el menú de variables / merge tags está abierto, manejar navegación
    if (this.mergeTagMenu) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.mergeTagMenuNavigateUp();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.mergeTagMenuNavigateDown();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectMergeTagItem(this._resolveMenuFullIndex(this.mergeTagMenu, '.mewyse-mergetag-menu-item', this.mergeTagMenuSelectedIndex));
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeMergeTagMenu();
        return;
      }
    }

    // Si el menú de emojis está abierto, manejar navegación
    if (this.emojiMenu) {
      // Flecha arriba: navegar hacia arriba en el menú
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.emojiMenuNavigateUp();
        return;
      }

      // Flecha abajo: navegar hacia abajo en el menú
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.emojiMenuNavigateDown();
        return;
      }

      // Enter: seleccionar elemento del menú (convertir índice visual → real)
      if (e.key === 'Enter') {
        e.preventDefault();
        this.selectEmojiItem(this._resolveMenuFullIndex(this.emojiMenu, '.mewyse-emoji-menu-item', this.emojiMenuSelectedIndex));
        return;
      }

      // Escape: cerrar menú
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeEmojiMenu();
        return;
      }
    }

    // Atajos de teclado (Ctrl/Cmd + tecla)
    var isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Ctrl+Shift+Z: rehacer (debe ir antes de Ctrl+Z)
    if (isCtrlOrCmd && e.shiftKey && (e.key === 'z' || e.key === 'Z')) {
      e.preventDefault();
      this._runAction('redo', { source: 'shortcut', event: e });
      return;
    }

    // Ctrl+Shift+...: atajos con Shift
    if (isCtrlOrCmd && e.shiftKey) {
      // Ctrl+Shift+K → removeFormat
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        this._runAction('removeformat', { source: 'shortcut', event: e });
        return;
      }
      // Ctrl+Shift+X → strikethrough
      if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        this._runAction('strikethrough', { source: 'shortcut', event: e });
        return;
      }
      // Ctrl+Shift+7 → lista numerada
      if (e.key === '7' || e.key === '&' || e.key === '/') {
        e.preventDefault();
        this.changeBlockType(blockId, 'numberList');
        return;
      }
      // Ctrl+Shift+8 → lista con viñetas
      if (e.key === '8' || e.key === '*' || e.key === '(') {
        e.preventDefault();
        this.changeBlockType(blockId, 'bulletList');
        return;
      }
    }

    // Ctrl+Alt+...: cambio rápido a headings
    if (isCtrlOrCmd && e.altKey && !e.shiftKey) {
      if (e.key === '1' || e.code === 'Digit1') {
        e.preventDefault();
        this.changeBlockType(blockId, 'heading1');
        return;
      }
      if (e.key === '2' || e.code === 'Digit2') {
        e.preventDefault();
        this.changeBlockType(blockId, 'heading2');
        return;
      }
      if (e.key === '3' || e.code === 'Digit3') {
        e.preventDefault();
        this.changeBlockType(blockId, 'heading3');
        return;
      }
      if (e.key === '0' || e.code === 'Digit0') {
        e.preventDefault();
        this.changeBlockType(blockId, 'paragraph');
        return;
      }
    }

    if (isCtrlOrCmd && !e.shiftKey && !e.altKey) {
      // Ctrl+B / Ctrl+I / Ctrl+U → pasan por el registro de acciones (aplica
      // overrides/desactivaciones); la lógica vive en _runDefaultAction.
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        this._runAction('bold', { source: 'shortcut', event: e });
        return;
      }
      if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        this._runAction('italic', { source: 'shortcut', event: e });
        return;
      }
      if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        this._runAction('underline', { source: 'shortcut', event: e });
        return;
      }
      // Ctrl+E → code inline (envuelve selección en <code>)
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        this._wrapSelectionInTag('code');
        this.updateBlockContent(blockId, element.innerHTML);
        this.triggerChange();
        return;
      }
      // Ctrl+. → superíndice, Ctrl+, → subíndice (envuelven en <sup>/<sub>)
      if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        this._runAction(e.key === '.' ? 'superscript' : 'subscript', { source: 'shortcut', event: e });
        return;
      }
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        this._runAction('undo', { source: 'shortcut', event: e });
        return;
      }
      if (e.key === 'y' || e.key === 'Y') {
        e.preventDefault();
        this._runAction('redo', { source: 'shortcut', event: e });
        return;
      }
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        this._runAction('link', { source: 'shortcut', event: e });
        return;
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        this._runAction('find', { source: 'shortcut', event: e });
        return;
      }
    }

    // Tab / Shift+Tab: indentar/desindentar en listas
    if (e.key === 'Tab') {
      var currentBlock = this.getBlock(blockId);
      if (currentBlock && (currentBlock.type === 'bulletList' ||
                           currentBlock.type === 'numberList' ||
                           currentBlock.type === 'checklist')) {
        e.preventDefault();
        this.indentBlock(blockId, e.shiftKey ? -1 : 1);
        return;
      }
      // Bloques de texto: sangría de párrafo. Tab indenta SOLO si el caret está
      // al inicio del bloque (como Word/Docs: en medio del texto Tab hace su
      // comportamiento normal). Shift+Tab reduce la sangría (desde cualquier
      // posición, para poder deshacerla siempre).
      if (currentBlock && INDENTABLE_TEXT_BLOCK_TYPES[currentBlock.type]) {
        if (e.shiftKey) {
          if (this._canOutdent(blockId)) {
            e.preventDefault();
            this.indentBlock(blockId, -1);
            return;
          }
        } else if (this._isCaretAtStart(element) && this._canIndent(blockId)) {
          e.preventDefault();
          this.indentBlock(blockId, 1);
          return;
        }
      }
    }

    // Enter: dividir el bloque o crear uno nuevo según la posición del cursor.
    //  - Cursor al final  → comportamiento clásico: bloque nuevo vacío después.
    //  - Cursor en medio  → split: el bloque actual se queda con la parte previa,
    //    se crea un bloque nuevo del mismo tipo con la parte siguiente.
    //  - Cursor al inicio → split degenerado (parte previa vacía, parte siguiente
    //    con todo el contenido) — equivalente a "empujar" el contenido abajo.
    //
    // CRÍTICO MÓVIL: todo el flujo (crear bloque + foco) es síncrono dentro del
    // gesto del usuario. iOS/Android sólo muestran el teclado virtual cuando
    // focus() ocurre síncronamente desde un evento de usuario; cualquier
    // setTimeout/rAF intermedio rompe la cadena y oculta el teclado.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (this._isAddingBlock) return;
      this._isAddingBlock = true;

      var index = this.getBlockIndex(blockId);
      var self = this;
      var currentBlock = this.getBlock(blockId);

      // Bloques que NO se pueden dividir como texto (image, divider, video, audio,
      // table, code). Para estos mantenemos el comportamiento clásico (paragraph
      // nuevo a continuación).
      var nonSplittable = { image: 1, divider: 1, pageBreak: 1, video: 1, audio: 1, table: 1, code: 1, toc: 1 };
      var canSplit = currentBlock && !nonSplittable[currentBlock.type];

      // Tipo del nuevo bloque cuando NO se hace split (clásico).
      // Listas vacías → paragraph (salir de la lista). Listas con contenido → mismo
      // tipo. Heading/quote → paragraph (más natural tras cerrar el heading).
      // Resto → paragraph.
      function endTypeFor(block) {
        if (!block) return 'paragraph';
        var listTypes = { bulletList: 1, numberList: 1, checklist: 1 };
        if (listTypes[block.type]) {
          var isEmpty = (element.textContent || '').trim() === '';
          return isEmpty ? 'paragraph' : block.type;
        }
        return 'paragraph';
      }

      // Determinar si hay contenido después del cursor. compareBoundaryPoints
      // no es fiable comparando ranges en distinto container (text node vs
      // elemento padre), así que extraemos el "after" y miramos su texto.
      var sel = window.getSelection();
      var range = (sel && sel.rangeCount > 0) ? sel.getRangeAt(0) : null;
      var beforeHTML = '';
      var afterHTML = '';
      var atEnd = true;
      if (canSplit && range && range.collapsed) {
        // Si el cursor cayó DENTRO de un átomo inline (mention/tag/emoji,
        // todos `contenteditable="false"`), re-anclamos a DESPUÉS del átomo
        // antes de partir el contenido. Sin esto, el split chopearía el
        // átomo en dos mitades — la primera con el texto parcial y la
        // segunda como cápsula vacía visible (el "círculo gris" reportado).
        var ATOMIC = { 'mewyse-mention': 1, 'mewyse-tag': 1, 'mewyse-emoji': 1 };
        var probeNode = range.startContainer;
        if (probeNode && probeNode.nodeType === 3) probeNode = probeNode.parentNode;
        var atomicAncestor = null;
        while (probeNode && probeNode !== element) {
          if (probeNode.classList) {
            var cls = probeNode.classList;
            if (ATOMIC['mewyse-mention'] && cls.contains('mewyse-mention')) { atomicAncestor = probeNode; break; }
            if (ATOMIC['mewyse-tag'] && cls.contains('mewyse-tag')) { atomicAncestor = probeNode; break; }
            if (ATOMIC['mewyse-emoji'] && cls.contains('mewyse-emoji')) { atomicAncestor = probeNode; break; }
          }
          probeNode = probeNode.parentNode;
        }
        if (atomicAncestor) {
          var snapped = document.createRange();
          snapped.setStartAfter(atomicAncestor);
          snapped.collapse(true);
          sel.removeAllRanges();
          sel.addRange(snapped);
          range = snapped;
        }

        var beforeRange = document.createRange();
        beforeRange.selectNodeContents(element);
        beforeRange.setEnd(range.startContainer, range.startOffset);
        var afterRange = document.createRange();
        afterRange.selectNodeContents(element);
        afterRange.setStart(range.startContainer, range.startOffset);

        var tmp = document.createElement('div');
        tmp.appendChild(beforeRange.cloneContents());
        beforeHTML = tmp.innerHTML;
        tmp.innerHTML = '';
        tmp.appendChild(afterRange.cloneContents());
        afterHTML = tmp.innerHTML;

        // atEnd: no queda texto visible después del cursor.
        atEnd = afterRange.toString().length === 0;
      }

      // Ventana de supresión de blur: estos handlers mueven o reescriben el
      // foco entre contenteditables. En móvil, durante esa transición, el
      // navegador puede pasar momentáneamente por document.body y disparar el
      // focusout antes de que el nuevo elemento reciba focusin. Sin este
      // margen, el callback onBlur se dispararía indebidamente.
      this._suppressBlurUntil = Date.now() + 300;

      if (!canSplit || atEnd) {
        // Comportamiento clásico: bloque vacío después. Todo síncrono para
        // mantener vivo el gesto del usuario (teclado virtual en móvil).
        var newType = endTypeFor(currentBlock);
        this._skipAutoFocus = true;
        var newBlockId = this.addBlock(newType, index + 1);
        this._skipAutoFocus = false;
        this._focusBlockSync(newBlockId);
        this._isAddingBlock = false;
        return;
      }

      // Tipo del nuevo bloque al hacer split: SIEMPRE el mismo del actual. Esto
      // hace que Enter funcione como un "salto de línea" que respeta el formato.
      var splitType = currentBlock.type;

      // Split SIN cambiar el foco — clave para móvil: en lugar de crear el
      // nuevo bloque ABAJO con la mitad nueva y mover el cursor allí, creamos
      // el nuevo bloque ARRIBA con la mitad anterior y dejamos el bloque
      // actual con la mitad nueva. El elemento sigue enfocado (no se llama
      // a focus() en otro nodo) y el cursor queda al inicio de su contenido
      // — exactamente la posición lógica donde estaba el cursor tras el split.
      // Como bonus, el teclado virtual no se mueve y no se dispara onBlur.
      var safeBefore = this._sanitizeBlockContent(beforeHTML);
      var safeAfter = this._sanitizeBlockContent(afterHTML);

      var splitProps = {};
      if (currentBlock.alignment) splitProps.alignment = currentBlock.alignment;
      if (currentBlock.customClass) splitProps.customClass = currentBlock.customClass;
      if (typeof currentBlock.indentLevel === 'number') splitProps.indentLevel = currentBlock.indentLevel;
      // Checklist: la mitad anterior (que va al bloque nuevo arriba) hereda
      // el estado checked del original; el bloque actual (mitad nueva, que se
      // queda con el cursor) arranca sin marcar como suele hacer Notion.
      if (splitType === 'checklist' && currentBlock.checked) splitProps.checked = true;

      // Insertar nuevo bloque ARRIBA del actual con la mitad anterior.
      this._skipAutoFocus = true;
      this.addBlock(splitType, index, safeBefore, splitProps);
      this._skipAutoFocus = false;

      // El bloque actual conserva su id, su elemento DOM y el foco. Solo
      // actualizamos su contenido a la mitad posterior.
      currentBlock.content = safeAfter;
      if (splitType === 'checklist') currentBlock.checked = false;
      element.innerHTML = safeAfter;

      // Cursor al inicio del elemento (donde quedaba lógicamente el cursor
      // tras el split). El elemento no perdió focus en ningún momento.
      this._setCursorAtTextOffset(element, 0);

      this.triggerChange();
      this._isAddingBlock = false;
      return;
    }

    // Backspace:
    //  - Bloque vacío  → eliminar el bloque y enfocar el anterior (al final).
    //  - Cursor al inicio de un bloque CON contenido → fusionar con el anterior
    //    (inverso del split en Enter): el contenido del actual se concatena al
    //    final del anterior, y el cursor queda en la frontera.
    if (e.key === 'Backspace' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
      var content = element.textContent;
      if (content === '' || content === '\n') {
        e.preventDefault();

        if (this.blocks.length > 1) {
          var index = this.getBlockIndex(blockId);
          // Suprimir el onBlur transitorio entre borrar el bloque y reposicionar
          // el foco en el anterior.
          this._suppressBlurUntil = Date.now() + 300;
          this.deleteBlock(blockId);

          // Posicionar el foco en el bloque anterior para poder seguir borrando
          // (como en un editor de texto): texto → cursor al final; imagen → la
          // selecciona; otros → el editable interno si lo hay.
          if (index > 0) {
            var self = this;
            setTimeout(function() {
              var prevBlock = self.blocks[index - 1];
              if (!prevBlock) return;
              var prevBlockElement = self.container.querySelector('[data-block-id="' + prevBlock.id + '"]');
              if (!prevBlockElement) return;

              // Imagen: seleccionarla (permite borrarla con Backspace/Delete)
              if (prevBlock.type === 'image') {
                var img = prevBlockElement.querySelector('img.mewyse-image') ||
                          prevBlockElement.querySelector('img');
                if (img) { self.selectImage(img, prevBlock.id, false); return; }
              }

              // Texto (o celda de tabla): enfocar el contenteditable y poner el
              // cursor al final. getEditableElement devuelve el propio bloque si
              // este es editable (párrafos/títulos) o el editable interno.
              var contentEditable = self.getEditableElement(prevBlockElement);
              if (contentEditable) {
                contentEditable.focus();
                var range = document.createRange();
                var sel = window.getSelection();
                range.selectNodeContents(contentEditable);
                range.collapse(false); // colapsar al final
                sel.removeAllRanges();
                sel.addRange(range);
                return;
              }

              // Bloques sin editable ni imagen (divider/video/audio): enfocar el
              // propio elemento si es enfocable
              if (typeof prevBlockElement.focus === 'function') {
                try { prevBlockElement.focus(); } catch (err) {}
              }
            }, 10);
          }
        }
        return;
      }

      // Bloque con contenido: si el cursor está al inicio, intentar fusionar
      // con el anterior. Sólo aplica si la selección está colapsada (no hay
      // texto seleccionado a borrar) y el bloque anterior es de tipo texto.
      var sel = window.getSelection();
      var range = (sel && sel.rangeCount > 0) ? sel.getRangeAt(0) : null;
      if (range && range.collapsed) {
        var beforeRange = document.createRange();
        beforeRange.selectNodeContents(element);
        beforeRange.setEnd(range.startContainer, range.startOffset);
        var atStart = beforeRange.toString().length === 0;
        if (atStart) {
          var idx = this.getBlockIndex(blockId);
          if (idx > 0) {
            var prevBlock = this.blocks[idx - 1];
            var nonMergeable = { table: 1, image: 1, divider: 1, pageBreak: 1, video: 1, audio: 1, toc: 1 };
            if (prevBlock && !nonMergeable[prevBlock.type]) {
              e.preventDefault();
              this._mergeBlockIntoPrevious(blockId);
              return;
            }
          }
        }
      }
    }

    // Flechas arriba/abajo: navegar entre bloques preservando la columna (x)
    // del caret, como en un editor de texto. Solo se intercepta si el caret
    // está en la primera (ArrowUp) / última (ArrowDown) línea visual del bloque;
    // en líneas intermedias se deja el movimiento nativo dentro del bloque.
    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
        !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
      var navSel = window.getSelection();
      if (navSel && navSel.rangeCount > 0 && navSel.isCollapsed) {
        var caretRect = this._getCaretClientRect();
        var editableEl = this.getEditableElement(this.getBlockElementById(blockId)) || element;
        if (caretRect && editableEl) {
          var edgeInfo = this._caretLineEdge(editableEl, caretRect);
          var idxNav = this.getBlockIndex(blockId);

          if (e.key === 'ArrowUp' && edgeInfo.first && idxNav > 0) {
            e.preventDefault();
            this._moveCaretToAdjacentBlock(this.blocks[idxNav - 1].id, caretRect.left, 'bottom');
            return;
          }
          if (e.key === 'ArrowDown' && edgeInfo.last && idxNav < this.blocks.length - 1) {
            e.preventDefault();
            this._moveCaretToAdjacentBlock(this.blocks[idxNav + 1].id, caretRect.left, 'top');
            return;
          }
        }
      }
    }
  };

  /**
   * Devuelve el rect del caret (rango colapsado actual), o null.
   */
  meWYSE.prototype._getCaretClientRect = function() {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return null;
    var range = sel.getRangeAt(0).cloneRange();
    range.collapse(true);
    var rects = range.getClientRects();
    if (rects && rects.length) return rects[0];

    // Un rango colapsado al final de un nodo de texto suele no tener rects:
    // sondear el carácter adyacente y derivar la posición del caret.
    var node = range.startContainer;
    var off = range.startOffset;
    if (node && node.nodeType === 3 && node.length > 0) {
      var probe = document.createRange();
      if (off > 0) { probe.setStart(node, off - 1); probe.setEnd(node, off); }
      else { probe.setStart(node, 0); probe.setEnd(node, Math.min(1, node.length)); }
      var pr = probe.getClientRects();
      if (pr && pr.length) {
        var last = pr[pr.length - 1];
        var edgeX = (off > 0) ? last.right : last.left;
        return { top: last.top, bottom: last.bottom, left: edgeX, right: edgeX, height: last.height, width: 0 };
      }
    }

    var r = range.getBoundingClientRect();
    if (r && (r.height || r.top || r.left)) return r;
    // Fallback final: rect del elemento contenedor
    var host = (node && node.nodeType === 3) ? node.parentNode : node;
    if (host && host.getBoundingClientRect) {
      var hr = host.getBoundingClientRect();
      if (hr && (hr.height || hr.top)) return hr;
    }
    return null;
  };

  /**
   * Indica si el caret está en la primera/última línea visual de un editable,
   * usando line-height y padding como tolerancia.
   * @returns {{first:boolean, last:boolean}}
   */
  meWYSE.prototype._caretLineEdge = function(editableEl, caretRect) {
    var elRect = editableEl.getBoundingClientRect();
    var cs = window.getComputedStyle(editableEl);
    var padT = parseFloat(cs.paddingTop) || 0;
    var padB = parseFloat(cs.paddingBottom) || 0;
    var lineH = parseFloat(cs.lineHeight);
    if (isNaN(lineH)) lineH = (parseFloat(cs.fontSize) || 16) * 1.3;
    var tol = lineH * 0.6;
    return {
      first: (caretRect.top - (elRect.top + padT)) < tol,
      last: ((elRect.bottom - padB) - caretRect.bottom) < tol
    };
  };

  /**
   * Coloca el caret en el bloque adyacente, en su borde superior/inferior y a
   * la x indicada (preserva la columna). Maneja texto/tabla por coordenada e
   * imágenes por selección.
   * @param {number} targetBlockId
   * @param {number} x - coordenada horizontal a preservar
   * @param {string} edge - 'top' (primera línea) | 'bottom' (última línea)
   */
  meWYSE.prototype._moveCaretToAdjacentBlock = function(targetBlockId, x, edge) {
    var targetEl = this.getBlockElementById(targetBlockId);
    if (!targetEl) return;
    var block = this.getBlock(targetBlockId);

    // Imagen suelta: seleccionarla
    if (block && block.type === 'image') {
      var img = targetEl.querySelector('img.mewyse-image') || targetEl.querySelector('img');
      if (img) { this.selectImage(img, targetBlockId, false); return; }
    }

    var editableEl = this.getEditableElement(targetEl) || targetEl;
    var rect = editableEl.getBoundingClientRect();
    var cs = window.getComputedStyle(editableEl);
    var padT = parseFloat(cs.paddingTop) || 0;
    var padB = parseFloat(cs.paddingBottom) || 0;
    var lineH = parseFloat(cs.lineHeight);
    if (isNaN(lineH)) lineH = (parseFloat(cs.fontSize) || 16) * 1.3;

    // y de la primera/última línea del destino; x clamped al rect del destino
    var y = (edge === 'top')
      ? (rect.top + padT + lineH * 0.5)
      : (rect.bottom - padB - lineH * 0.5);
    y = Math.max(rect.top + 1, Math.min(y, rect.bottom - 1));
    var cx = Math.max(rect.left + 1, Math.min(x, rect.right - 1));

    // Colocar el caret por coordenada (preserva la columna). Si el rango cae
    // fuera del bloque destino o el navegador no lo soporta, foco + inicio/fin.
    var range = null;
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(cx, y);
    } else if (document.caretPositionFromPoint) {
      var pos = document.caretPositionFromPoint(cx, y);
      if (pos) { range = document.createRange(); range.setStart(pos.offsetNode, pos.offset); range.collapse(true); }
    }

    var placed = false;
    if (range) {
      var node = range.startContainer;
      var host = (node.nodeType === 3) ? node.parentNode : node;
      if (host && targetEl.contains(host)) {
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(range);
        // Asegurar foco del editable que contiene el caret
        var ce = host.closest ? host.closest('[contenteditable="true"]') : null;
        if (ce) { try { ce.focus(); } catch (e) {} }
        placed = true;
      }
    }

    if (!placed) {
      // Fallback: foco y cursor al inicio (top) o final (bottom) del editable
      try { editableEl.focus(); } catch (e2) {}
      var fb = document.createRange();
      fb.selectNodeContents(editableEl);
      fb.collapse(edge === 'top');
      var s2 = window.getSelection();
      s2.removeAllRanges();
      s2.addRange(fb);
    }
  };

  /**
   * Obtiene el icono del tipo de bloque
   * @param {string} type
   * @returns {string}
   */
  meWYSE.prototype.getBlockTypeIcon = function(type) {
    var icons = {
      'paragraph': WYSIWYG_ICONS.paragraph,
      'heading1': WYSIWYG_ICONS.heading1,
      'heading2': WYSIWYG_ICONS.heading2,
      'heading3': WYSIWYG_ICONS.heading3,
      'quote': WYSIWYG_ICONS.quote,
      'code': WYSIWYG_ICONS.code,
      'bulletList': WYSIWYG_ICONS.bulletList,
      'numberList': WYSIWYG_ICONS.numberList,
      'table': WYSIWYG_ICONS.table,
      'image': WYSIWYG_ICONS.image,
      'divider': WYSIWYG_ICONS.divider,
      'pageBreak': WYSIWYG_ICONS.pageBreak,
      'callout': WYSIWYG_ICONS.callout,
      'toggle': WYSIWYG_ICONS.toggle,
      'toc': WYSIWYG_ICONS.toc
    };
    return icons[type] || WYSIWYG_ICONS.paragraph;
  };

  /**
   * Muestra el menú de opciones del bloque (handle)
   * @param {number} blockId
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showBlockOptionsMenu = function(blockId, button) {
    var self = this;

    // Cerrar menú existente si hay alguno
    var existingMenu = document.querySelector('.mewyse-options-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    // Marcar el bloque como seleccionado visualmente
    var blockElement = this.getBlockElementById(blockId);
    if (blockElement) {
      blockElement.classList.add('mewyse-block-selected');
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu';

    // Función para limpiar la selección al cerrar el menú
    menu._cleanupSelection = function() {
      if (blockElement) {
        blockElement.classList.remove('mewyse-block-selected');
      }
    };

    var closeBlockOptionsMenu = function() {
      if (menu._cancelAnchor) menu._cancelAnchor();
      if (menu._cleanupSelection) menu._cleanupSelection();
      if (menu.parentNode) menu.remove();
      self._hideBackdrop('blockOptions');
    };

    // Verificar si hay múltiples bloques seleccionados
    var hasMultipleSelection = this.selectedBlocks.length > 1;
    var selectionCount = this.selectedBlocks.length;

    // Etiquetas dinámicas según la selección
    var deleteLabel = hasMultipleSelection ? this.t('blockMenu.deleteMultiple', { count: selectionCount }) : this.t('blockMenu.delete');
    var changeTypeLabel = hasMultipleSelection ? this.t('blockMenu.changeTypeMultiple', { count: selectionCount }) : this.t('blockMenu.changeType');

    var options = [
      {
        action: 'changeType',
        label: changeTypeLabel,
        icon: WYSIWYG_ICONS.gear,
        submenu: true
      },
      {
        action: 'insertAbove',
        label: this.t('blockMenu.insertAbove'),
        icon: WYSIWYG_ICONS.arrowUp
      },
      {
        action: 'insertBelow',
        label: this.t('blockMenu.insertBelow'),
        icon: WYSIWYG_ICONS.arrowDown
      },
      {
        action: 'duplicate',
        label: this.t('blockMenu.duplicate'),
        icon: WYSIWYG_ICONS.duplicate
      },
      {
        action: 'delete',
        label: deleteLabel,
        icon: WYSIWYG_ICONS.trash,
        danger: true
      }
    ];

    // Las acciones específicas de tabla (propiedades, restablecer anchos) viven
    // ahora en la toolbar contextual de tabla, no en el handle lateral.

    options.forEach(function(option) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item' + (option.danger ? ' danger' : '');
      item.innerHTML = '<span class="icon">' + option.icon + '</span> ' + option.label;

      item.onclick = function(e) {
        e.stopPropagation();

        if (option.action === 'changeType') {
          closeBlockOptionsMenu();
          self.showBlockTypeMenu(blockId, button);
        } else if (option.action === 'insertAbove') {
          var index = self.getBlockIndex(blockId);
          if (index !== -1) {
            self.addBlock('paragraph', index);
          }
          closeBlockOptionsMenu();
        } else if (option.action === 'insertBelow') {
          var index = self.getBlockIndex(blockId);
          if (index !== -1) {
            self.addBlock('paragraph', index + 1);
          }
          closeBlockOptionsMenu();
        } else if (option.action === 'duplicate') {
          self.duplicateBlock(blockId);
          closeBlockOptionsMenu();
        } else if (option.action === 'delete') {
          // Si hay selección múltiple, eliminar todos los seleccionados
          if (self.selectedBlocks.length > 1) {
            self.deleteSelectedBlocks();
          } else {
            self.deleteBlock(blockId);
          }
          closeBlockOptionsMenu();
        }
      };

      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Anclar el menú al botón
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      self._add_doc_click(function closeMenu(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
          closeBlockOptionsMenu();
          self._remove_doc_click(closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('blockOptions', closeBlockOptionsMenu);
  };

  /**
   * Muestra el menú de tipo de bloque
   * @param {number} blockId
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showBlockTypeMenu = function(blockId, button) {
    var self = this;

    // Cerrar menú existente si hay alguno
    var existingMenu = document.querySelector('.mewyse-type-menu');
    if (existingMenu) {
      existingMenu.remove();
    }

    // Marcar el bloque como seleccionado visualmente
    var blockElement = this.getBlockElementById(blockId);
    if (blockElement) {
      blockElement.classList.add('mewyse-block-selected');
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-type-menu';

    // Función para limpiar la selección al cerrar el menú
    menu._cleanupSelection = function() {
      if (blockElement) {
        blockElement.classList.remove('mewyse-block-selected');
      }
    };

    var closeBlockTypeMenu = function() {
      if (menu._cancelAnchor) menu._cancelAnchor();
      if (menu._cleanupSelection) menu._cleanupSelection();
      if (menu.parentNode) menu.remove();
      self._hideBackdrop('blockTypeMenu');
    };

    var types = [
      { type: 'paragraph', icon: WYSIWYG_ICONS.paragraph },
      { type: 'heading1', icon: WYSIWYG_ICONS.heading1 },
      { type: 'heading2', icon: WYSIWYG_ICONS.heading2 },
      { type: 'heading3', icon: WYSIWYG_ICONS.heading3 },
      { type: 'quote', icon: WYSIWYG_ICONS.quote },
      { type: 'code', icon: WYSIWYG_ICONS.code },
      { type: 'bulletList', icon: WYSIWYG_ICONS.bulletList },
      { type: 'numberList', icon: WYSIWYG_ICONS.numberList },
      { type: 'checklist', icon: WYSIWYG_ICONS.checklist },
      { type: 'divider', icon: WYSIWYG_ICONS.divider }
    ];

    types.forEach(function(typeInfo) {
      var item = document.createElement('div');
      item.className = 'mewyse-type-menu-item';
      item.innerHTML = '<span class="icon">' + typeInfo.icon + '</span> ' + self.t('blockTypes.' + typeInfo.type);
      item.onclick = function() {
        // Si hay selección múltiple, cambiar tipo de todos los seleccionados
        if (self.selectedBlocks.length > 1) {
          self.changeSelectedBlocksType(typeInfo.type);
        } else {
          self.changeBlockType(blockId, typeInfo.type);
        }
        closeBlockTypeMenu();
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Anclar el menú al botón
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer clic fuera
    setTimeout(function() {
      self._add_doc_click(function closeMenu(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
          closeBlockTypeMenu();
          self._remove_doc_click(closeMenu);
        }
      });
    }, 10);

    this._showBackdrop('blockTypeMenu', closeBlockTypeMenu);
  };

  /**
   * Cambia el tipo de un bloque
   * @param {number} blockId
   * @param {string} newType
   */
  meWYSE.prototype.changeBlockType = function(blockId, newType) {
    this.pushHistory(true);
    var block = this.getBlock(blockId);
    if (block) {
      var oldType = block.type;

      // ¿El foco/caret está DENTRO de este bloque? Se usa `document.activeElement`
      // como fuente de verdad (fiable, a diferencia del anchorNode de la selección
      // que puede quedar obsoleto). Si lo tiene, se captura el offset del caret
      // para reponerlo tras el patch; si NO (p. ej. changeBlockType por API con el
      // foco en otro bloque), NO se toca el foco → el otro bloque lo conserva.
      var v_old_el = this.getBlockElementById(blockId);
      var v_had_focus = !!(v_old_el && document.activeElement &&
                           v_old_el.contains(document.activeElement));
      var v_caret_offset = null;
      if (v_had_focus) {
        var v_ed_old = this.getEditableElement(v_old_el);
        var v_sel = window.getSelection ? window.getSelection() : null;
        if (v_ed_old && v_sel && v_sel.rangeCount && v_ed_old.contains(v_sel.anchorNode)) {
          try {
            var v_r = v_sel.getRangeAt(0);
            var v_pre = document.createRange();
            v_pre.selectNodeContents(v_ed_old);
            v_pre.setEnd(v_r.endContainer, v_r.endOffset);
            v_caret_offset = v_pre.toString().length;
          } catch (e) { v_caret_offset = null; }
        }
      }

      block.type = newType;

      // El cambio de tipo mueve el foco del editable viejo al nuevo: suprimir el
      // onBlur transitorio.
      this._suppressBlurUntil = Date.now() + 300;

      // Render INCREMENTAL (Fase 1): si NINGÚN tipo (viejo/nuevo) es lista, la
      // conversión es texto↔texto y no cambia la agrupación → basta recrear ESTE
      // bloque en su sitio (_patch_block), conservando el DOM/foco del resto (sin
      // flicker). Con listas de por medio, la agrupación cambia → render() completo.
      var v_is_list = function(t) {
        return t === 'bulletList' || t === 'numberList' || t === 'checklist';
      };
      var v_patched = false;
      if (!v_is_list(oldType) && !v_is_list(newType)) {
        v_patched = this._patch_block(blockId);
        // Reponer el caret en el nuevo editable SOLO si el foco estaba en ESTE
        // bloque (v_had_focus). Si se convierte un bloque NO enfocado (p. ej. por
        // API, o mientras otro bloque tiene el caret), NO se toca el foco → el
        // otro bloque lo conserva (la clave del render incremental).
        if (v_patched && v_had_focus) {
          var v_new_el = this.getBlockElementById(blockId);
          var v_editable = v_new_el ? this.getEditableElement(v_new_el) : null;
          if (v_editable) {
            v_editable.focus();
            this._setCaretAtOffset(v_editable, v_caret_offset);
          }
        }
      }
      if (!v_patched) {
        this.render(blockId);
      }

      // Si el cambio involucra listas numeradas, actualizar la numeración
      if (oldType === 'numberList' || newType === 'numberList') {
        var index = this.getBlockIndex(blockId);
        if (index !== -1) {
          this.updateConsecutiveNumberLists(index);
        }
      }

      this.triggerChange();
    }
  };

  /**
   * Crea el botón para añadir bloques
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createAddBlockButton = function() {
    var self = this;
    var button = document.createElement('button');
    button.className = 'mewyse-add-block';
    button.innerHTML = this.t('misc.addBlock');
    button.onclick = function(e) {
      e.preventDefault();
      self.addBlock('paragraph');
    };
    return button;
  };

  /**
   * Actualiza listas numeradas consecutivas (si es necesario)
   * Con la nueva arquitectura semantica, las listas consecutivas se agrupan
   * automaticamente en un solo <ol>, por lo que la numeracion es automatica.
   * Esta funcion se mantiene por compatibilidad pero puede no necesitar hacer nada.
   * @param {number} fromIndex - Índice desde donde empezar a actualizar
   */
  meWYSE.prototype.updateConsecutiveNumberLists = function(fromIndex) {
    // Con la nueva arquitectura, las listas consecutivas ya estan en un <ol> comun
    // La numeracion es automatica gracias al navegador
    // Solo re-renderizar si hay cambios que afecten la agrupacion
    // Por ahora, no hacer nada - la agrupacion se maneja en render()
  };

  /**
   * Añade un nuevo bloque
   * @param {string} type - Tipo de bloque
   * @param {number} index - Posición donde insertar (opcional)
   * @returns {number} - ID del bloque creado
   */
  meWYSE.prototype.addBlock = function(type, index, content, props) {
    this.pushHistory(true);
    var block = {
      id: ++this.currentBlockId,
      type: type || 'paragraph',
      content: ''
    };

    // content opcional: se usa al hacer split de un bloque (Enter en medio).
    // Pasa por el sanitizador igual que cualquier contenido externo.
    if (typeof content === 'string' && content.length > 0) {
      block.content = this._sanitizeBlockContent(content);
    }

    // props opcional: propiedades a heredar antes del render (alignment,
    // customClass, indentLevel, checked). Permite que el render inicial ya
    // emita las clases/estilos correctos sin tener que disparar un segundo
    // render — crítico para no romper el gesto del usuario en móvil.
    if (props && typeof props === 'object') {
      if (typeof props.alignment === 'string') block.alignment = props.alignment;
      if (typeof props.customClass === 'string' && this._customClassWhitelist[props.customClass]) {
        block.customClass = props.customClass;
      }
      if (typeof props.indentLevel === 'number' && props.indentLevel >= 0) {
        block.indentLevel = Math.min(5, Math.floor(props.indentLevel));
      }
      if (props.checked === true || props.checked === false) block.checked = props.checked;
    }

    if (typeof index === 'number') {
      // Normalizar a rango válido [0, length] (evita splice con índice negativo)
      index = Math.max(0, Math.min(index, this.blocks.length));
      this.blocks.splice(index, 0, block);
    } else {
      this.blocks.push(block);
    }

    // Renderizar y enfocar el nuevo bloque
    this.render(block.id);

    // Si se insertó una lista numerada o se insertó en medio de listas numeradas,
    // re-renderizar las listas consecutivas posteriores para actualizar los números
    if (typeof index === 'number') {
      var self = this;
      // Usar requestAnimationFrame doble para asegurar que el DOM esté completamente actualizado
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          self.updateConsecutiveNumberLists(index);
        });
      });
    }

    this.triggerChange();

    return block.id;
  };

  /**
   * Duplica un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.duplicateBlock = function(blockId) {
    this.pushHistory(true);
    var block = this.getBlock(blockId);
    if (block) {
      var index = this.getBlockIndex(blockId);
      var duplicatedBlock = {
        id: ++this.currentBlockId,
        type: block.type,
        content: block.content
      };
      // Preservar propiedades opcionales (tableStyle, checked, alignment,
      // indentLevel para listas anidadas, customClass de styleFormats)
      if (typeof block.tableStyle === 'string') duplicatedBlock.tableStyle = block.tableStyle;
      if (block.checked === true) duplicatedBlock.checked = true;
      if (typeof block.alignment === 'string') duplicatedBlock.alignment = block.alignment;
      if (typeof block.indentLevel === 'number') duplicatedBlock.indentLevel = block.indentLevel;
      if (typeof block.indent === 'number') duplicatedBlock.indent = block.indent;
      if (typeof block.customClass === 'string') duplicatedBlock.customClass = block.customClass;
      if (typeof block.language === 'string') duplicatedBlock.language = block.language;
      if (typeof block.toggleTitle === 'string') duplicatedBlock.toggleTitle = block.toggleTitle;
      if (block.collapsed === true) duplicatedBlock.collapsed = true;

      this.blocks.splice(index + 1, 0, duplicatedBlock);

      // Render INCREMENTAL (Fase 4): insertar SOLO el bloque duplicado usando el
      // fast-path de render(focusBlockId) (maneja agrupación de listas + guard de
      // split). Con `_skipAutoFocus` se evita que el fast-path enfoque el
      // duplicado: así el foco se queda donde estaba (el DOM del resto no se
      // toca), preservando el comportamiento previo (el render completo restauraba
      // el foco al bloque activo, no al nuevo).
      this._skipAutoFocus = true;
      this.render(duplicatedBlock.id);
      this._skipAutoFocus = false;

      this.triggerChange();
    }
  };

  /**
   * Elimina un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.deleteBlock = function(blockId) {
    this.pushHistory(true);
    var index = this.getBlockIndex(blockId);
    if (index !== -1) {
      // Si es el último bloque, vaciarlo en vez de eliminarlo. Se reemplaza por
      // un objeto limpio (preservando el id) para no arrastrar propiedades
      // opcionales del bloque anterior (alignment, checked, tableStyle,
      // indentLevel, customClass) al párrafo vacío resultante.
      if (this.blocks.length === 1) {
        var v_id = this.blocks[0].id;
        this.blocks[0] = { id: v_id, type: 'paragraph', content: '' };
        // Suprimir el blur durante el re-render y reenfocar el párrafo resultante
        // (evita el onBlur espurio al borrar el único bloque, p. ej. una tabla).
        this._suppressBlurUntil = Date.now() + 300;
        this.render(v_id);
        this._focusBlockNear(0);
        this.triggerChange();
        return;
      }

      // ¿Se puede borrar INCREMENTALMENTE (quitar solo el elemento del bloque del
      // DOM, sin reconstruir todo)? Condiciones SEGURAS (si no, render() completo):
      //  - el bloque NO es de lista (borrar un <li> puede tocar la agrupación),
      //  - sus vecinos NO son AMBOS de lista (borrar el bloque intermedio fusionaría
      //    dos grupos → cambio de agrupación),
      //  - su nodo de primer nivel es su PROPIO elemento (bloque suelto, no envuelto).
      var v_del_block = this.blocks[index];
      var v_del_prev = index > 0 ? this.blocks[index - 1] : null;
      var v_del_next = index < this.blocks.length - 1 ? this.blocks[index + 1] : null;
      var v_del_el = null;
      if (!this._isListBlockType(v_del_block.type) &&
          !(v_del_prev && this._isListBlockType(v_del_prev.type) &&
            v_del_next && this._isListBlockType(v_del_next.type))) {
        var v_tl = this._top_level_block_node(this.getBlockElementById(blockId));
        // El top-level debe ser el propio bloque (data-block-id) — no un grupo.
        if (v_tl && v_tl.getAttribute &&
            v_tl.getAttribute('data-block-id') === String(blockId)) {
          v_del_el = v_tl;
        }
      }

      // ¿El foco estaba DENTRO del bloque que se borra? Decide si hay que reponer
      // el foco tras quitarlo. En el camino incremental, si el foco estaba en OTRO
      // bloque, ese bloque conserva su foco (DOM intacto) y NO se toca.
      var v_focus_in_deleted = !!(v_del_el && document.activeElement &&
                                  v_del_el.contains(document.activeElement));

      this.blocks.splice(index, 1);

      // Re-normalizar los niveles de lista: borrar un ítem padre puede dejar un
      // hijo huérfano con un salto de nivel; lo corregimos en el modelo.
      this._normalizeListModel();

      // Suprimir el blur durante la transición y reenfocar un vecino después
      // (evita onBlur espurio al perder el editable borrado).
      this._suppressBlurUntil = Date.now() + 300;

      var v_incremental = !!(v_del_el && v_del_el.parentNode);
      if (v_incremental) {
        // Render INCREMENTAL (Fase 2): quitar solo el elemento del bloque; el
        // resto del DOM (y su foco) se conserva intacto.
        v_del_el.parentNode.removeChild(v_del_el);
      } else {
        // Fallback: casos con listas de por medio (agrupación) → render completo.
        this.render();
      }

      // Actualizar las listas numeradas si es necesario
      if (index < this.blocks.length) {
        this.updateConsecutiveNumberLists(index);
      }

      // Reponer el foco dentro del editor. En el camino de render() completo el
      // DOM se reconstruye → SIEMPRE hay que reenfocar (bloque que ocupa la
      // posición borrada, o el anterior si era el último). En el incremental,
      // solo si el foco estaba en el bloque borrado (o se perdió fuera del
      // editor); si estaba en otro bloque, ese lo conserva. Síncrono para que el
      // focusout ya encuentre el foco dentro del editor (sin onBlur espurio).
      if (!v_incremental || v_focus_in_deleted ||
          !this.container.contains(document.activeElement)) {
        this._focusBlockNear(Math.min(index, this.blocks.length - 1));
      }

      this.triggerChange();
    }
  };

  /**
   * Enfoca el editable más cercano a una posición del array de bloques. Busca
   * desde `index` hacia delante y, si no encuentra editable (p. ej. divider,
   * tabla, imagen), hacia atrás. Sirve para mantener el foco dentro del editor
   * tras borrar un bloque (evita el onBlur espurio del focusout a <body>).
   * @param {number} index
   * @returns {boolean} true si enfocó algún editable
   */
  meWYSE.prototype._focusBlockNear = function(index) {
    if (this._destroyed || !this.container || !this.blocks.length) return false;
    if (index < 0) index = 0;
    if (index > this.blocks.length - 1) index = this.blocks.length - 1;

    // Orden de búsqueda: desde index hacia delante, luego hacia atrás.
    var order = [];
    var i;
    for (i = index; i < this.blocks.length; i++) order.push(i);
    for (i = index - 1; i >= 0; i--) order.push(i);

    for (var k = 0; k < order.length; k++) {
      var block = this.blocks[order[k]];
      var el = this.container.querySelector('[data-block-id="' + block.id + '"]');
      if (!el) continue;
      var editable = (el.getAttribute('contenteditable') === 'true')
        ? el : el.querySelector('[contenteditable="true"]');
      if (editable) {
        editable.focus();
        return true;
      }
    }

    // No hay ningún bloque editable (p. ej. la tabla estaba entre separadores /
    // imágenes). Enfocar el propio container para que el foco permanezca dentro
    // del editor (`_isPartOfEditorUI` lo reconoce) y NO se dispare onBlur.
    if (this.container) {
      if (!this.container.hasAttribute('tabindex')) {
        this.container.setAttribute('tabindex', '-1');
      }
      try { this.container.focus(); } catch (e) {}
    }
    return false;
  };

  /**
   * Captura el contexto de foco actual (bloque + offset de caret en caracteres)
   * para poder restaurarlo tras un re-render (undo/redo). Devuelve null si no hay
   * caret dentro del editor.
   * @returns {?{blockId:number, offset:?number}}
   */
  meWYSE.prototype._captureCaretContext = function() {
    var v_id = this._getFocusedBlockId();
    if (v_id === null) return null;
    var v_ctx = { blockId: v_id, offset: null };
    var sel = window.getSelection ? window.getSelection() : null;
    if (sel && sel.rangeCount > 0 && this.container) {
      var v_el = this.container.querySelector('[data-block-id="' + v_id + '"]');
      var v_editable = v_el && (v_el.getAttribute('contenteditable') === 'true'
        ? v_el : v_el.querySelector('[contenteditable="true"]'));
      if (v_editable && v_editable.contains(sel.anchorNode)) {
        try {
          // Offset del caret medido en caracteres de texto desde el inicio del
          // editable (robusto frente a la reconstrucción del DOM en el render).
          var v_range = sel.getRangeAt(0);
          var v_pre = document.createRange();
          v_pre.selectNodeContents(v_editable);
          v_pre.setEnd(v_range.endContainer, v_range.endOffset);
          v_ctx.offset = v_pre.toString().length;
        } catch (e) { v_ctx.offset = null; }
      }
    }
    return v_ctx;
  };

  /**
   * Coloca el caret en un editable a `offset` caracteres del inicio. Si `offset`
   * es null o excede el texto, lo coloca al FINAL.
   * @param {HTMLElement} editable
   * @param {?number} offset
   */
  meWYSE.prototype._setCaretAtOffset = function(editable, offset) {
    var sel = window.getSelection ? window.getSelection() : null;
    if (!sel || !editable) return;
    var v_range = document.createRange();
    var v_placed = false;
    if (offset != null && offset >= 0) {
      var v_walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT, null, false);
      var v_remaining = offset;
      var v_node;
      while ((v_node = v_walker.nextNode())) {
        var v_len = v_node.textContent.length;
        if (v_remaining <= v_len) {
          v_range.setStart(v_node, v_remaining);
          v_range.collapse(true);
          v_placed = true;
          break;
        }
        v_remaining -= v_len;
      }
    }
    if (!v_placed) {
      // offset null o mayor que el texto disponible → al final.
      v_range.selectNodeContents(editable);
      v_range.collapse(false);
    }
    sel.removeAllRanges();
    sel.addRange(v_range);
  };

  /**
   * Devuelve el índice del primer bloque VISIBLE en el viewport del editor (o del
   * de la ventana si el editor no scrollea internamente). Fallback: 0.
   * @returns {number}
   */
  meWYSE.prototype._getVisibleBlockIndex = function() {
    if (!this.container || !this.blocks.length) return 0;
    var v_crect = this.container.getBoundingClientRect();
    var v_win_h = window.innerHeight || document.documentElement.clientHeight;
    var v_top = Math.max(v_crect.top, 0);
    var v_bottom = Math.min(v_crect.bottom, v_win_h);
    for (var i = 0; i < this.blocks.length; i++) {
      var el = this.container.querySelector('[data-block-id="' + this.blocks[i].id + '"]');
      if (!el) continue;
      var r = el.getBoundingClientRect();
      if (r.bottom > v_top && r.top < v_bottom) return i; // primero que intersecta
    }
    return 0;
  };

  /**
   * Restaura el foco tras un re-render (undo/redo): al mismo bloque en el offset
   * guardado si sigue existiendo; si no, al FINAL del bloque visible en ese
   * momento; último recurso, el primer bloque editable.
   * @param {?{blockId:number, offset:?number}} ctx
   */
  meWYSE.prototype._restoreCaretContext = function(ctx) {
    if (this._destroyed || !this.container) return;
    this._suppressBlurUntil = Date.now() + 300;

    // 1) Mismo bloque en el offset guardado (si sobrevivió al undo/redo).
    if (ctx && ctx.blockId != null) {
      var v_el = this.container.querySelector('[data-block-id="' + ctx.blockId + '"]');
      if (v_el) {
        var v_editable = (v_el.getAttribute('contenteditable') === 'true')
          ? v_el : v_el.querySelector('[contenteditable="true"]');
        if (v_editable) {
          try { v_editable.focus({ preventScroll: true }); } catch (e) { v_editable.focus(); }
          this._setCaretAtOffset(v_editable, ctx.offset);
          return;
        }
      }
    }

    // 2) Fallback: final del bloque visible. Buscar desde el visible hacia delante
    //    y luego hacia atrás el primer bloque editable.
    var v_start = this._getVisibleBlockIndex();
    var order = [];
    var i;
    for (i = v_start; i < this.blocks.length; i++) order.push(i);
    for (i = v_start - 1; i >= 0; i--) order.push(i);
    for (var k = 0; k < order.length; k++) {
      var el2 = this.container.querySelector('[data-block-id="' + this.blocks[order[k]].id + '"]');
      if (!el2) continue;
      var ed2 = (el2.getAttribute('contenteditable') === 'true')
        ? el2 : el2.querySelector('[contenteditable="true"]');
      if (ed2) {
        try { ed2.focus({ preventScroll: true }); } catch (e) { ed2.focus(); }
        this._setCaretAtOffset(ed2, null); // al final
        return;
      }
    }

    // 3) Último recurso (no hay editables): container, para no disparar onBlur.
    this._focusBlockNear(0);
  };

  /**
   * Mueve un bloque a la posición de otro bloque
   * @param {number} draggedBlockId - ID del bloque arrastrado
   * @param {number} targetBlockId - ID del bloque destino
   */
  meWYSE.prototype.moveBlock = function(draggedBlockId, targetBlockId) {
    this.pushHistory(true);
    var draggedIndex = this.getBlockIndex(draggedBlockId);
    var targetIndex = this.getBlockIndex(targetBlockId);

    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }

    // Obtener el bloque arrastrado
    var draggedBlock = this.blocks[draggedIndex];

    // ¿Hay LISTAS implicadas en el origen o el destino? Mover un bloque suelto de
    // entre dos ítems de lista los FUSIONA (origen), y meterlo entre ítems los
    // PARTE (destino) — cambios de agrupación que el movimiento incremental de un
    // solo elemento no sabe hacer → render() completo. Si NO hay listas cerca
    // (bloques sueltos), se mueve solo el elemento del DOM (incremental).
    var v_src_prev = draggedIndex > 0 ? this.blocks[draggedIndex - 1] : null;
    var v_src_next = draggedIndex < this.blocks.length - 1 ? this.blocks[draggedIndex + 1] : null;
    var v_tgt_blk = this.blocks[targetIndex];
    var v_tgt_prev = targetIndex > 0 ? this.blocks[targetIndex - 1] : null;
    var v_involves_list =
      this._isListBlockType(draggedBlock.type) ||
      (v_src_prev && this._isListBlockType(v_src_prev.type)) ||
      (v_src_next && this._isListBlockType(v_src_next.type)) ||
      (v_tgt_blk && this._isListBlockType(v_tgt_blk.type)) ||
      (v_tgt_prev && this._isListBlockType(v_tgt_prev.type));

    // Capturar el elemento del bloque arrastrado ANTES de mutar el modelo.
    var v_dragged_el = !v_involves_list
      ? this._top_level_block_node(this.getBlockElementById(draggedBlockId)) : null;
    if (v_dragged_el && v_dragged_el.getAttribute &&
        v_dragged_el.getAttribute('data-block-id') !== String(draggedBlockId)) {
      v_dragged_el = null; // envuelto (lista) → no incremental
    }

    // Eliminar el bloque de su posición actual
    this.blocks.splice(draggedIndex, 1);

    // Ajustar el índice destino si es necesario
    if (draggedIndex < targetIndex) {
      targetIndex--;
    }

    // Insertar el bloque en la nueva posición
    this.blocks.splice(targetIndex, 0, draggedBlock);

    if (v_dragged_el && v_dragged_el.parentNode) {
      // Render INCREMENTAL (Fase 3): mover el MISMO elemento del DOM a su nueva
      // posición (insertBefore lo saca de la vieja). El ancla es el elemento del
      // bloque que quedará DESPUÉS del arrastrado (targetIndex+1); si no hay,
      // se anexa al final. El foco (si estaba dentro) se conserva al ser el mismo
      // nodo; moveBlockUp/Down además reenfocan por rAF.
      var v_after_blk = (targetIndex + 1 < this.blocks.length) ? this.blocks[targetIndex + 1] : null;
      var v_after_el = v_after_blk
        ? this._top_level_block_node(this.getBlockElementById(v_after_blk.id)) : null;
      if (v_after_el && v_after_el.parentNode === this.container) {
        this.container.insertBefore(v_dragged_el, v_after_el);
      } else {
        this.container.appendChild(v_dragged_el);
      }
    } else {
      // Fallback: listas de por medio → render() completo (reagrupa).
      this.render();
    }
    this.triggerChange();
  };

  /**
   * Actualiza el contenido de un bloque
   * @param {number} blockId
   * @param {string} content
   */
  meWYSE.prototype.updateBlockContent = function(blockId, content) {
    var block = this.getBlock(blockId);
    if (block) {
      // Para bloques de tabla, limpiar controles del editor antes de guardar
      // en el modelo (botones row/col-control, resize-handle, etc.)
      if (block.type === 'table' && typeof content === 'string') {
        content = this._cleanTableContent(content);
      }
      block.content = content;
      this.triggerChange();
    }
  };

  /**
   * Sincroniza al modelo el HTML del bloque donde está la selección actual.
   *
   * Las operaciones de formato de un solo bloque (color, enlace, cambio de
   * mayúsculas...) mutan el DOM directamente (extractContents/insertNode/
   * setAttribute), pero eso NO dispara el listener `input`, único punto que
   * normalmente sincroniza DOM→modelo. Sin esta persistencia, el cambio se
   * pierde en el siguiente render y `onChange` emite HTML obsoleto.
   *
   * @returns {boolean} true si persistió algún bloque.
   */
  meWYSE.prototype._persistActiveBlockContent = function() {
    var v_selection = window.getSelection();
    if (!v_selection || !v_selection.rangeCount) return false;

    var v_node = v_selection.getRangeAt(0).commonAncestorContainer;
    var v_element = (v_node.nodeType === 1) ? v_node : v_node.parentElement;
    if (!v_element || !v_element.closest) return false;

    var v_block_element = v_element.closest('.mewyse-block[data-block-id]');
    if (!v_block_element) return false;

    var v_block_id = parseInt(v_block_element.getAttribute('data-block-id'), 10);
    var v_block = this.getBlock(v_block_id);
    if (!v_block) return false;

    // En un bloque tabla, la selección vive dentro de una celda; hay que
    // persistir el HTML de TODA la tabla, no el de la celda editable, para no
    // sobrescribir la tabla con el contenido de una sola celda.
    if (v_block.type === 'table') {
      var v_table = v_element.closest('table');
      if (v_table) this.updateBlockContent(v_block_id, v_table.innerHTML);
      return true;
    }

    // Un toggle tiene DOS editables (título y cuerpo); persistir el que contiene
    // la selección, no el primero, para no volcar el título sobre el cuerpo.
    if (v_block.type === 'toggle') {
      var v_tg_edit = v_element.closest('[contenteditable="true"]');
      if (v_tg_edit) {
        if (v_tg_edit.getAttribute('data-mewyse-field') === 'toggleTitle') {
          this.updateBlockField(v_block_id, 'toggleTitle', v_tg_edit.innerHTML);
        } else {
          this.updateBlockContent(v_block_id, v_tg_edit.innerHTML);
        }
        return true;
      }
    }

    var v_editable = this.getEditableElement(v_block_element);
    if (!v_editable) return false;
    this.updateBlockContent(v_block_id, v_editable.innerHTML);
    return true;
  };

  /**
   * Obtiene un bloque por su ID
   * @param {number} blockId
   * @returns {Object|null}
   */
  meWYSE.prototype.getBlock = function(blockId) {
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id === blockId) {
        return this.blocks[i];
      }
    }
    return null;
  };

  /**
   * Obtiene el índice de un bloque
   * @param {number} blockId
   * @returns {number}
   */
  meWYSE.prototype.getBlockIndex = function(blockId) {
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id === blockId) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Verifica si un bloque está seleccionado
   * @param {number} blockId
   * @returns {boolean}
   */
  meWYSE.prototype.isBlockSelected = function(blockId) {
    return this.selectedBlocks.indexOf(blockId) !== -1;
  };

  /**
   * Selecciona un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.selectBlock = function(blockId) {
    if (!this.isBlockSelected(blockId)) {
      this.selectedBlocks.push(blockId);
      this.updateBlockSelectionVisual(blockId, true);
    }
  };

  /**
   * Deselecciona un bloque
   * @param {number} blockId
   */
  meWYSE.prototype.deselectBlock = function(blockId) {
    var index = this.selectedBlocks.indexOf(blockId);
    if (index !== -1) {
      this.selectedBlocks.splice(index, 1);
      this.updateBlockSelectionVisual(blockId, false);
    }
  };

  /**
   * Limpia toda la selección
   */
  meWYSE.prototype.clearSelection = function() {
    var self = this;
    var blocksToDeselect = this.selectedBlocks.slice();
    blocksToDeselect.forEach(function(blockId) {
      self.updateBlockSelectionVisual(blockId, false);
    });
    this.selectedBlocks = [];
  };

  /**
   * Alterna la selección de un bloque (para Ctrl+Click)
   * @param {number} blockId
   */
  meWYSE.prototype.toggleBlockSelection = function(blockId) {
    if (this.isBlockSelected(blockId)) {
      this.deselectBlock(blockId);
    } else {
      this.selectBlock(blockId);
    }
  };

  /**
   * Selecciona un rango de bloques (para Shift+Click)
   * @param {number} fromBlockId
   * @param {number} toBlockId
   */
  meWYSE.prototype.selectBlockRange = function(fromBlockId, toBlockId) {
    var fromIndex = this.getBlockIndex(fromBlockId);
    var toIndex = this.getBlockIndex(toBlockId);

    if (fromIndex === -1 || toIndex === -1) {
      return;
    }

    // Asegurar que fromIndex sea menor que toIndex
    var startIndex = Math.min(fromIndex, toIndex);
    var endIndex = Math.max(fromIndex, toIndex);

    // Limpiar selección anterior
    this.clearSelection();

    // Seleccionar todos los bloques en el rango
    for (var i = startIndex; i <= endIndex; i++) {
      this.selectBlock(this.blocks[i].id);
    }
  };

  /**
   * Actualiza la visualización de selección de un bloque
   * @param {number} blockId
   * @param {boolean} selected
   */
  meWYSE.prototype.updateBlockSelectionVisual = function(blockId, selected) {
    var blockWrapper = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (blockWrapper) {
      if (selected) {
        blockWrapper.classList.add('mewyse-block-selected');
      } else {
        blockWrapper.classList.remove('mewyse-block-selected');
      }
    }
  };

  /**
   * Maneja el clic en un bloque para selección
   * @param {MouseEvent} e
   * @param {number} blockId
   */
  meWYSE.prototype.handleBlockClick = function(e, blockId) {
    var isCtrlOrCmd = e.ctrlKey || e.metaKey;
    var isShift = e.shiftKey;

    if (isShift && this.lastClickedBlockId !== null) {
      // Shift+Click: seleccionar rango
      e.preventDefault();
      this.clearCrossBlockSelection();
      this.selectBlockRange(this.lastClickedBlockId, blockId);
    } else if (isCtrlOrCmd) {
      // Ctrl/Cmd+Click: alternar selección
      e.preventDefault();
      this.clearCrossBlockSelection();
      this.toggleBlockSelection(blockId);
      this.lastClickedBlockId = blockId;
    } else {
      // Click normal: limpiar selección y establecer último clickeado
      if (this.crossBlockSelection) {
        this.clearCrossBlockSelection();
        this.closeFormatMenu();
      }
      if (this.selectedBlocks.length > 0) {
        this.clearSelection();
      }
      this.lastClickedBlockId = blockId;
      // Iniciar tracking para posible selección cross-block
      this.startCrossBlockTracking(e, blockId);
    }
  };

  /**
   * Elimina todos los bloques seleccionados
   */
  meWYSE.prototype.deleteSelectedBlocks = function() {
    if (this.selectedBlocks.length === 0) {
      return;
    }
    this.pushHistory(true);

    var self = this;
    // Índices ASCENDENTES (para detectar tramos contiguos) de los seleccionados.
    var v_asc = this.selectedBlocks.map(function(blockId) {
      return self.getBlockIndex(blockId);
    }).filter(function(index) {
      return index !== -1;
    }).sort(function(a, b) {
      return a - b;
    });
    if (v_asc.length === 0) { this.selectedBlocks = []; return; }

    // ¿Se puede borrar INCREMENTALMENTE (quitar solo los elementos del DOM)?
    // SEGURO si: no se vacía el documento, NINGÚN bloque borrado es de lista, y
    // ningún TRAMO contiguo de borrados tiene listas a AMBOS lados (fusionaría dos
    // grupos). Si no → render() completo (reagrupa/renumera).
    var v_safe = this.blocks.length > v_asc.length;
    if (v_safe) {
      for (var a = 0; a < v_asc.length; a++) {
        if (this._isListBlockType(this.blocks[v_asc[a]].type)) { v_safe = false; break; }
      }
    }
    if (v_safe) {
      var r = 0;
      while (r < v_asc.length) {
        var lo = v_asc[r], hi = lo;
        while (r + 1 < v_asc.length && v_asc[r + 1] === hi + 1) { r++; hi = v_asc[r]; }
        var v_pb = lo > 0 ? this.blocks[lo - 1] : null;
        var v_nb = hi < this.blocks.length - 1 ? this.blocks[hi + 1] : null;
        if (v_pb && v_nb && this._isListBlockType(v_pb.type) && this._isListBlockType(v_nb.type)) {
          v_safe = false; break;
        }
        r++;
      }
    }
    // Capturar los elementos DOM ANTES de mutar el modelo (el DOM aún está intacto).
    var v_els = null;
    if (v_safe) {
      v_els = [];
      for (var c = 0; c < v_asc.length; c++) {
        var v_bid = this.blocks[v_asc[c]].id;
        var v_tl = this._top_level_block_node(this.getBlockElementById(v_bid));
        if (v_tl && v_tl.getAttribute && v_tl.getAttribute('data-block-id') === String(v_bid)) {
          v_els.push(v_tl);
        } else { v_safe = false; break; }
      }
    }

    // Eliminar del modelo (DESCENDENTE, para no desplazar índices anteriores).
    var v_desc = v_asc.slice().sort(function(a, b) { return b - a; });
    v_desc.forEach(function(index) { self.blocks.splice(index, 1); });

    // Limpiar selección
    this.selectedBlocks = [];

    // Si no quedan bloques, crear un párrafo vacío (fuerza render completo).
    if (this.blocks.length === 0) {
      this.blocks.push({ id: ++this.currentBlockId, type: 'paragraph', content: '' });
      v_safe = false;
    }

    // Re-normalizar niveles de lista tras el borrado múltiple
    this._normalizeListModel();

    if (v_safe && v_els) {
      // Render INCREMENTAL: quitar solo los elementos de los bloques borrados.
      this._suppressBlurUntil = Date.now() + 300;
      for (var d = 0; d < v_els.length; d++) {
        if (v_els[d].parentNode) v_els[d].parentNode.removeChild(v_els[d]);
      }
    } else {
      this.render();
    }

    // Actualizar listas numeradas si es necesario
    var minIndex = v_asc[0];
    if (minIndex < this.blocks.length) {
      this.updateConsecutiveNumberLists(minIndex);
    }

    this.triggerChange();
  };

  /**
   * Cambia el tipo de todos los bloques seleccionados
   * @param {string} newType
   */
  meWYSE.prototype.changeSelectedBlocksType = function(newType) {
    if (this.selectedBlocks.length === 0) {
      return;
    }
    this.pushHistory(true);

    var self = this;
    var hasNumberListChange = false;
    var minIndex = this.blocks.length;

    this.selectedBlocks.forEach(function(blockId) {
      var block = self.getBlock(blockId);
      if (block) {
        var oldType = block.type;
        block.type = newType;

        // Verificar si involucra listas numeradas
        if (oldType === 'numberList' || newType === 'numberList') {
          hasNumberListChange = true;
          var index = self.getBlockIndex(blockId);
          if (index !== -1 && index < minIndex) {
            minIndex = index;
          }
        }
      }
    });

    // Re-renderizar
    this.render();

    // Actualizar listas numeradas si es necesario
    if (hasNumberListChange && minIndex < this.blocks.length) {
      this.updateConsecutiveNumberLists(minIndex);
    }

    // Limpiar selección después de cambiar tipo
    this.selectedBlocks = [];

    this.triggerChange();
  };

  /**
   * Carga contenido desde texto plano
   * @param {string} text
   */
  /**
   * Heurística: decide si un string "parece" HTML (contiene alguna etiqueta de
   * apertura, cierre o self-closing). Se usa para enrutar el contenido inicial
   * de un <textarea> a loadFromHTML (trocea en bloques) o a loadFromText (texto
   * plano línea→párrafo). No pretende validar HTML, solo detectar markup; un
   * "a < b" suelto (sin nombre de etiqueta) NO se considera HTML.
   * @param {string} v_text
   * @returns {boolean}
   */
  meWYSE.prototype._looks_like_html = function(v_text) {
    if (typeof v_text !== 'string' || v_text === '') return false;
    // <tag ...>  |  </tag>  |  <tag/>  → nombre de etiqueta que empieza por letra
    return /<([a-z][a-z0-9-]*)(\s[^>]*)?\/?>|<\/[a-z][a-z0-9-]*\s*>/i.test(v_text);
  };

  meWYSE.prototype.loadFromText = function(text) {
    var lines = text.split('\n');
    var self = this;

    lines.forEach(function(line) {
      self.blocks.push({
        id: ++self.currentBlockId,
        type: 'paragraph',
        content: line
      });
    });
  };

  /**
   * Filtra los bloques excluyendo el último si está vacío
   * @returns {Array}
   */
  meWYSE.prototype.getFilteredBlocks = function() {
    var blocks = this.blocks.slice();

    // Red de seguridad: limpiar controles de editor en tablas (por si algún
    // path no pasó por updateBlockContent o el contenido viene de un guardado
    // anterior al fix).
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].type === 'table' && typeof blocks[i].content === 'string') {
        var cleaned = this._cleanTableContent(blocks[i].content);
        if (cleaned !== blocks[i].content) {
          // No mutar el bloque original, devolver una copia preservando TODAS
          // las propiedades opcionales (tableStyle/indentLevel/customClass se
          // omitían antes, perdiéndose en el export de tablas limpiadas).
          blocks[i] = {
            id: blocks[i].id,
            type: blocks[i].type,
            content: cleaned,
            checked: blocks[i].checked,
            alignment: blocks[i].alignment,
            tableStyle: blocks[i].tableStyle,
            indentLevel: blocks[i].indentLevel,
            customClass: blocks[i].customClass
          };
        }
      }
    }

    // Si el último bloque está vacío, no incluirlo. SOLO se recorta un tipo
    // CONOCIDO (el párrafo vacío por defecto del editor). Un bloque de tipo
    // desconocido preservado no tiene `content` string y NO debe recortarse
    // (contiene datos íntegros que hay que conservar en el export).
    if (blocks.length > 0) {
      var lastBlock = blocks[blocks.length - 1];
      var isEmpty = !lastBlock.content ||
                    (typeof lastBlock.content === 'string' && lastBlock.content.trim() === '');

      if (isEmpty && VALID_BLOCK_TYPES[lastBlock.type] &&
          lastBlock.type !== 'divider' && lastBlock.type !== 'pageBreak' && lastBlock.type !== 'image') {
        blocks.pop();
      }
    }

    return blocks;
  };

  /**
   * Obtiene el contenido como texto plano
   * @returns {string}
   */
  meWYSE.prototype.getPlainText = function() {
    return this.getFilteredBlocks().map(function(block) {
      var c = block.content;

      // Bloques con content como objeto: extraer texto representativo
      // (evita que Object.toString() produzca "[object Object]")
      if (block.type === 'image') {
        return (c && typeof c === 'object') ? (c.fileName || c.alt || '') : '';
      }
      if (block.type === 'video') {
        return (typeof c === 'string') ? c : ((c && typeof c === 'object') ? (c.url || '') : '');
      }
      if (block.type === 'audio') {
        return (c && typeof c === 'object') ? (c.title || c.url || '') : '';
      }
      if (block.type === 'divider') {
        return '';
      }

      // Bloques con content HTML string — devolver tal cual para compat
      // (el consumidor puede hacer el strip si quiere solo texto)
      return (typeof c === 'string') ? c : '';
    }).join('\n');
  };

  /**
   * Obtiene el contenido como HTML
   * @returns {string}
   */
  meWYSE.prototype.getHTML = function() {
    var html = '';
    var blocks = this.getFilteredBlocks();
    var i = 0;
    var self = this;

    // Helper: devuelve ' class="custom"' si block.customClass existe, '' si no
    var classAttr = function(b) {
      return b.customClass ? ' class="' + b.customClass + '"' : '';
    };

    // Helper: devuelve ' style="margin-inline-start:Npx"' si el bloque de texto
    // tiene sangría de párrafo (block.indent), '' si no. Se aplica a párrafo,
    // títulos y cita para que print()/exportPdf() reflejen la sangría.
    var styleAttr = function(b) {
      if (b.indent && INDENTABLE_TEXT_BLOCK_TYPES[b.type]) {
        return ' style="margin-inline-start:' + (b.indent * INDENT_STEP_PX) + 'px"';
      }
      return '';
    };

    // Si el documento contiene un bloque TOC, los títulos se emiten con un id de
    // ancla (para que los enlaces del índice funcionen en el HTML exportado).
    var v_has_toc = false;
    for (var v_k = 0; v_k < blocks.length; v_k++) {
      if (blocks[v_k].type === 'toc') { v_has_toc = true; break; }
    }
    var idAttr = function(b) {
      return v_has_toc ? ' id="mewyse-h-' + b.id + '"' : '';
    };

    // Transformer del contenido inline. Pasos:
    //  1. Sanear: garantiza HTML válido inline (unwrap de bloques anidados
    //     a <br>, etc.).
    //  2. Strip de `style` en elementos NO nativos del editor — limpia spans
    //     de color picker, párrafos pegados con estilos heredados, etc. Solo
    //     conserva style en table/td/th/img/iframe/video/audio y span.mewyse-tag.
    //  3. Si `escapeHtmlEntities` está activo (default), aplica el escape de
    //     entidades sobre el resultado.
    var inline = function(c) {
      if (typeof c !== 'string' || c === '') return c;
      var clean = self._sanitizeBlockContent(c);
      clean = self._stripNonNativeStyles(clean);
      if (self.escapeHtmlEntities) return self._emitInlineHTMLWithEscape(clean);
      return clean;
    };

    while (i < blocks.length) {
      var block = blocks[i];
      var content = block.content || '';

      // Bloque de tipo DESCONOCIDO (preservado para no perder datos): NO se emite
      // como HTML (su contenido es dato crudo, no HTML del editor). Se degrada a
      // un comentario con el tipo saneado, dejando rastro sin romper el documento.
      // El dato íntegro sigue disponible en getJSON.
      if (!VALID_BLOCK_TYPES[block.type]) {
        html += '<!-- mewyse:unknown-block ' + String(block.type).replace(/[^a-zA-Z0-9_-]/g, '') + ' -->';
        i++;
        continue;
      }

      // Agrupar listas consecutivas del mismo tipo (con anidación por indentLevel)
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listRes = this._buildNestedListHTML(blocks, i, classAttr, inline);
        html += listRes.html;
        i += listRes.consumed;
        continue;
      } else {
        // Procesar bloques que no son listas
        switch (block.type) {
          case 'heading1':
            html += '<h1' + idAttr(block) + classAttr(block) + styleAttr(block) + '>' + inline(content) + '</h1>';
            break;
          case 'heading2':
            html += '<h2' + idAttr(block) + classAttr(block) + styleAttr(block) + '>' + inline(content) + '</h2>';
            break;
          case 'heading3':
            html += '<h3' + idAttr(block) + classAttr(block) + styleAttr(block) + '>' + inline(content) + '</h3>';
            break;
          case 'quote':
            html += '<blockquote' + classAttr(block) + styleAttr(block) + '>' + inline(content) + '</blockquote>';
            break;
          case 'code':
            // Solo escapar HTML en bloques de código. Si hay lenguaje válido, se
            // emite class="language-xxx" (convención de highlight.js/Prism).
            var v_code_lang = (block.language && CODE_LANGUAGES.hasOwnProperty(block.language) && block.language !== '')
              ? ' class="language-' + block.language + '"' : '';
            html += '<pre><code' + v_code_lang + '>' + escapeHtml(content) + '</code></pre>';
            break;
          case 'table':
            // Solo incluir style si el usuario configuró propiedades de tabla;
            // el style se sanea (whitelist CSS) y se escapa como atributo
            var v_table_style = self._sanitizeStyle(block.tableStyle || '');
            if (v_table_style) {
              html += '<table style="' + escape_attr(v_table_style) + '">';
            } else {
              html += '<table>';
            }
            // Strip de styles no-nativos también dentro de las celdas (td/th
            // conservan su style por estar en la whitelist; spans/p internos
            // quedan limpios).
            html += self._stripNonNativeStyles(content, { allowTable: true });
            html += '</table>';
            break;
          case 'image':
            if (typeof block.content === 'object' && block.content.blob) {
              // Construir atributo style con las opciones avanzadas
              var imgStyle = '';
              var adv = block.content.advanced;
              if (adv) {
                var parts = [];
                if (adv.border && adv.border.width) {
                  parts.push('border: ' + adv.border.width + 'px ' + (adv.border.style || 'solid') + ' ' + (adv.border.color || '#000000'));
                }
                var v_m_out = self._resolveImageMargin(adv.margin);
                if (v_m_out) {
                  parts.push('margin: ' + v_m_out.v + 'px ' + v_m_out.h + 'px');
                }
                if (adv.alignment === 'center') {
                  parts.push('display: block');
                  parts.push('margin-left: auto');
                  parts.push('margin-right: auto');
                } else if (adv.alignment === 'left') {
                  parts.push('float: left');
                  parts.push('margin-right: 16px');
                } else if (adv.alignment === 'right') {
                  parts.push('float: right');
                  parts.push('margin-left: 16px');
                }
                if (parts.length) imgStyle = ' style="' + parts.join('; ') + '"';
              }
              // El blob solo se emite si pasa la validación de URL de imagen;
              // tanto src como alt se escapan como atributo (anti break-out).
              // width/height se emiten SOLO si el bloque los tiene (round-trip:
              // una imagen sin dimensiones se exporta sin ellas).
              if (self._isSafeImageUrl(block.content.blob)) {
                var v_dim_attr = '';
                if (typeof block.content.width === 'number' && block.content.width > 0) {
                  v_dim_attr += ' width="' + block.content.width + '"';
                }
                if (typeof block.content.height === 'number' && block.content.height > 0) {
                  v_dim_attr += ' height="' + block.content.height + '"';
                }
                html += '<img src="' + escape_attr(block.content.blob) + '" alt="' + escape_attr(block.content.fileName || 'Imagen') + '"' + v_dim_attr + imgStyle + ' />';
              }
            }
            break;
          case 'video':
            var vInfoH = self._videoInfoFromBlock(block);
            if (vInfoH) {
              if (vInfoH.provider === 'youtube' && vInfoH.videoId) {
                html += '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vInfoH.videoId) +
                        '" frameborder="0" allowfullscreen width="' + vInfoH.width + '" height="' + vInfoH.height + '"></iframe>';
              } else if (vInfoH.provider === 'vimeo' && vInfoH.videoId) {
                html += '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(vInfoH.videoId) +
                        '" frameborder="0" allowfullscreen width="' + vInfoH.width + '" height="' + vInfoH.height + '"></iframe>';
              } else if (vInfoH.provider === 'file' && self._isSafeMediaUrl(vInfoH.url)) {
                html += '<video controls src="' + escape_attr(vInfoH.url) + '" width="' + vInfoH.width + '" height="' + vInfoH.height + '"></video>';
              }
            }
            break;
          case 'audio':
            if (typeof block.content === 'object' && block.content.url) {
              html += '<audio controls src="' + escape_attr(block.content.url) + '"></audio>';
            }
            break;
          case 'divider':
            html += '<hr>';
            break;
          case 'pageBreak':
            html += '<div class="mewyse-page-break"></div>';
            break;
          case 'callout':
            html += '<div class="mewyse-callout mewyse-callout-' +
                    (block.calloutVariant || 'info') + '">' + inline(content) + '</div>';
            break;
          case 'toggle':
            // Export portable con <details>/<summary>; open si NO está colapsado.
            html += '<details' + (block.collapsed ? '' : ' open') + '><summary>' +
                    inline(block.toggleTitle || '') + '</summary>' + inline(content) + '</details>';
            break;
          case 'toc':
            html += self._buildTocHTML(blocks);
            break;
          default:
            html += '<p' + classAttr(block) + styleAttr(block) + '>' + inline(content) + '</p>';
        }
        i++;
      }
    }

    return html;
  };

  /**
   * Obtiene el contenido como código fuente HTML (con formato inline)
   * @returns {string}
   */
  meWYSE.prototype.getHTMLSource = function() {
    var html = '';
    var self = this;
    var blocks = this.getFilteredBlocks();
    var i = 0;
    var classAttr = function(b) { return b.customClass ? ' class="' + b.customClass + '"' : ''; };
    // Sangría de párrafo (margin-inline-start) para el código fuente HTML.
    var styleAttr = function(b) {
      return (b.indent && INDENTABLE_TEXT_BLOCK_TYPES[b.type])
        ? ' style="margin-inline-start:' + (b.indent * INDENT_STEP_PX) + 'px"' : '';
    };

    // Ids de ancla en títulos si hay TOC (igual que getHTML).
    var v_has_toc = false;
    for (var v_k = 0; v_k < blocks.length; v_k++) {
      if (blocks[v_k].type === 'toc') { v_has_toc = true; break; }
    }
    var idAttr = function(b) { return v_has_toc ? ' id="mewyse-h-' + b.id + '"' : ''; };

    // Transformer del contenido inline para la vista "fuente": sanea el HTML
    // (whitelist de tags) y limpia styles no nativos, pero NO escapa las
    // entidades (a diferencia de getHTML) para mostrar el HTML como código.
    var inline_source = function(c) {
      if (typeof c !== 'string' || c === '') return c;
      var v_clean = self._sanitizeBlockContent(c);
      return self._stripNonNativeStyles(v_clean);
    };

    while (i < blocks.length) {
      var block = blocks[i];

      // Bloque de tipo DESCONOCIDO (preservado): degradar a comentario (ver getHTML).
      if (!VALID_BLOCK_TYPES[block.type]) {
        html += '<!-- mewyse:unknown-block ' + String(block.type).replace(/[^a-zA-Z0-9_-]/g, '') + ' -->';
        i++;
        continue;
      }

      // Agrupar listas consecutivas del mismo tipo (con anidación por indentLevel)
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listRes = this._buildNestedListHTML(blocks, i, classAttr, inline_source);
        html += listRes.html;
        i += listRes.consumed;
        continue;
      } else {
        // Contenido saneado (whitelist de tags), preservando el formato inline
        var content = inline_source(block.content || '');

        // Procesar bloques que no son listas
        switch (block.type) {
          case 'heading1':
            html += '<h1' + idAttr(block) + classAttr(block) + styleAttr(block) + '>' + content + '</h1>';
            break;
          case 'heading2':
            html += '<h2' + idAttr(block) + classAttr(block) + styleAttr(block) + '>' + content + '</h2>';
            break;
          case 'heading3':
            html += '<h3' + idAttr(block) + classAttr(block) + styleAttr(block) + '>' + content + '</h3>';
            break;
          case 'quote':
            html += '<blockquote' + classAttr(block) + styleAttr(block) + '>' + content + '</blockquote>';
            break;
          case 'code':
            var v_code_lang_src = (block.language && CODE_LANGUAGES.hasOwnProperty(block.language) && block.language !== '')
              ? ' class="language-' + block.language + '"' : '';
            html += '<pre><code' + v_code_lang_src + '>' + escapeHtml(block.content || '') + '</code></pre>';
            break;
          case 'table':
            // Solo incluir style si el usuario configuró propiedades de tabla;
            // el style se sanea (whitelist CSS) y se escapa como atributo
            var v_table_style = self._sanitizeStyle(block.tableStyle || '');
            if (v_table_style) {
              html += '<table style="' + escape_attr(v_table_style) + '">';
            } else {
              html += '<table>';
            }
            html += self._stripNonNativeStyles(block.content || '', { allowTable: true });
            html += '</table>';
            break;
          case 'image':
            if (typeof block.content === 'object' && block.content.blob) {
              // Construir atributo style con las opciones avanzadas
              var imgStyle = '';
              var adv = block.content.advanced;
              if (adv) {
                var parts = [];
                if (adv.border && adv.border.width) {
                  parts.push('border: ' + adv.border.width + 'px ' + (adv.border.style || 'solid') + ' ' + (adv.border.color || '#000000'));
                }
                var v_m_out = self._resolveImageMargin(adv.margin);
                if (v_m_out) {
                  parts.push('margin: ' + v_m_out.v + 'px ' + v_m_out.h + 'px');
                }
                if (adv.alignment === 'center') {
                  parts.push('display: block');
                  parts.push('margin-left: auto');
                  parts.push('margin-right: auto');
                } else if (adv.alignment === 'left') {
                  parts.push('float: left');
                  parts.push('margin-right: 16px');
                } else if (adv.alignment === 'right') {
                  parts.push('float: right');
                  parts.push('margin-left: 16px');
                }
                if (parts.length) imgStyle = ' style="' + parts.join('; ') + '"';
              }
              // El blob solo se emite si pasa la validación de URL de imagen;
              // src y alt se escapan como atributo (anti break-out). width/height
              // solo si el bloque los tiene (sin dims → sin atributos).
              if (self._isSafeImageUrl(block.content.blob)) {
                var v_dim_attr_src = '';
                if (typeof block.content.width === 'number' && block.content.width > 0) {
                  v_dim_attr_src += ' width="' + block.content.width + '"';
                }
                if (typeof block.content.height === 'number' && block.content.height > 0) {
                  v_dim_attr_src += ' height="' + block.content.height + '"';
                }
                html += '<img src="' + escape_attr(block.content.blob) + '" alt="' + escape_attr(block.content.fileName || 'Imagen') + '"' + v_dim_attr_src + imgStyle + ' />';
              }
            }
            break;
          case 'video':
            var vInfoH = self._videoInfoFromBlock(block);
            if (vInfoH) {
              if (vInfoH.provider === 'youtube' && vInfoH.videoId) {
                html += '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(vInfoH.videoId) +
                        '" frameborder="0" allowfullscreen width="' + vInfoH.width + '" height="' + vInfoH.height + '"></iframe>';
              } else if (vInfoH.provider === 'vimeo' && vInfoH.videoId) {
                html += '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(vInfoH.videoId) +
                        '" frameborder="0" allowfullscreen width="' + vInfoH.width + '" height="' + vInfoH.height + '"></iframe>';
              } else if (vInfoH.provider === 'file' && self._isSafeMediaUrl(vInfoH.url)) {
                html += '<video controls src="' + escape_attr(vInfoH.url) + '" width="' + vInfoH.width + '" height="' + vInfoH.height + '"></video>';
              }
            }
            break;
          case 'audio':
            if (typeof block.content === 'object' && block.content.url) {
              html += '<audio controls src="' + escape_attr(block.content.url) + '"></audio>';
            }
            break;
          case 'divider':
            html += '<hr>';
            break;
          case 'pageBreak':
            html += '<div class="mewyse-page-break"></div>';
            break;
          case 'callout':
            html += '<div class="mewyse-callout mewyse-callout-' +
                    (block.calloutVariant || 'info') + '">' + content + '</div>';
            break;
          case 'toggle':
            html += '<details' + (block.collapsed ? '' : ' open') + '><summary>' +
                    inline_source(block.toggleTitle || '') + '</summary>' + content + '</details>';
            break;
          case 'toc':
            html += self._buildTocHTML(blocks);
            break;
          default:
            html += '<p' + classAttr(block) + styleAttr(block) + '>' + content + '</p>';
        }
        i++;
      }
    }

    return html;
  };

  /**
   * Obtiene el contenido como JSON
   * @returns {string}
   */
  meWYSE.prototype.getJSON = function() {
    return JSON.stringify(this.getFilteredBlocks(), null, 2);
  };

  /**
   * Captura la firma del contenido actual como "línea base limpia". Se usa para
   * el dirty tracking: se llama tras cada carga inicial/explícita de contenido
   * (para que la normalización HTML→bloques NO cuente como cambio) y desde
   * markPristine() tras guardar. La firma es el JSON del modelo (determinista y
   * ya normalizado); dos estados con el mismo contenido producen la misma firma.
   */
  meWYSE.prototype._capture_pristine = function() {
    this._pristine_signature = this.getJSON();
  };

  /**
   * Indica si el contenido del editor ha cambiado respecto a la última "línea
   * base limpia" (la carga inicial, la última carga explícita loadFrom*, o la
   * última llamada a markPristine). API pública.
   *
   * Pensado para, p. ej., decidir en onBlur si guardar: si se carga un textarea
   * con HTML y el usuario entra y sale SIN tocar nada, devuelve false (la
   * conversión HTML→bloques no se considera un cambio, porque la base se captura
   * tras esa normalización).
   *
   * @returns {boolean} true si hay cambios sin "confirmar" respecto a la base.
   */
  meWYSE.prototype.isDirty = function() {
    // Si aún no hay base (editor recién construido, sin initDomEditor), no hay
    // cambios que reportar.
    if (this._pristine_signature === null) return false;
    return this.getJSON() !== this._pristine_signature;
  };

  /**
   * Alias semántico de isDirty(): ¿se han producido cambios? API pública.
   * @returns {boolean}
   */
  meWYSE.prototype.hasChanges = function() {
    return this.isDirty();
  };

  /**
   * Marca el estado ACTUAL como "limpio" (nueva línea base). Se llama tras
   * guardar el contenido, para que isDirty()/hasChanges() midan los cambios a
   * partir de este punto. API pública.
   * @returns {meWYSE} this (encadenable)
   */
  meWYSE.prototype.markPristine = function() {
    this._capture_pristine();
    return this;
  };

  /**
   * Restablece el estado de cambios: deja `isDirty()`/`hasChanges()` en `false`
   * fijando el contenido ACTUAL como nueva línea base. Alias explícito de
   * markPristine(). Pensado para llamarse, p. ej., dentro de `onBlur` tras
   * guardar, para "resetear" la detección de cambios. API pública.
   * @returns {meWYSE} this (encadenable)
   */
  meWYSE.prototype.resetDirty = function() {
    return this.markPristine();
  };

  /**
   * Convierte HTML inline a Markdown inline
   * @param {string} html - HTML con formato inline
   * @returns {string} Markdown equivalente
   */
  meWYSE.prototype.htmlToMarkdownInline = function(html) {
    if (!html) return '';

    var parser = new DOMParser();
    var doc = parser.parseFromString('<body>' + html + '</body>', 'text/html');

    function processNode(node) {
      if (node.nodeType === 3) {
        // Nodo de texto
        return node.textContent;
      }

      if (node.nodeType !== 1) return '';

      var tag = node.tagName.toLowerCase();
      var inner = '';
      for (var i = 0; i < node.childNodes.length; i++) {
        inner += processNode(node.childNodes[i]);
      }

      // Menciones: conservar como @Name
      if (tag === 'span' && node.classList.contains('mewyse-mention')) {
        return inner;
      }

      // Merge tags / variables: emitir el literal {{name}} (plantilla).
      if (tag === 'span' && node.classList.contains('mewyse-mergetag')) {
        var mn = node.getAttribute('data-merge-name');
        return mn ? ('{{' + mn + '}}') : inner;
      }

      // Estilos inline (color, background) y otros spans con style: conservar como HTML
      if (tag === 'span' && node.getAttribute('style')) {
        return '<span style="' + node.getAttribute('style') + '">' + inner + '</span>';
      }

      switch (tag) {
        case 'b':
        case 'strong':
          return '**' + inner + '**';
        case 'i':
        case 'em':
          return '*' + inner + '*';
        case 's':
        case 'del':
        case 'strike':
          return '~~' + inner + '~~';
        case 'code':
          return '`' + inner + '`';
        case 'a':
          var href = node.getAttribute('href') || '';
          return '[' + inner + '](' + href + ')';
        case 'u':
          return '<u>' + inner + '</u>';
        case 'sub':
          return '<sub>' + inner + '</sub>';
        case 'sup':
          return '<sup>' + inner + '</sup>';
        case 'mark':
          return '<mark>' + inner + '</mark>';
        case 'br':
          // Emitir <br> literal (no '\n'): un salto real partiría el párrafo en
          // varios bloques al recargar (loadFromMarkdown separa por líneas).
          return '<br>';
        default:
          return inner;
      }
    }

    var body = doc.body;
    var result = '';
    for (var i = 0; i < body.childNodes.length; i++) {
      result += processNode(body.childNodes[i]);
    }
    return result;
  };

  /**
   * Obtiene el contenido como Markdown
   * @returns {string}
   */
  meWYSE.prototype.getMarkdown = function() {
    var self = this;
    var blocks = this.getFilteredBlocks();
    var lines = [];
    var i = 0;

    while (i < blocks.length) {
      var block = blocks[i];
      var content = block.content || '';

      // Bloque de tipo DESCONOCIDO (preservado): no tiene representación Markdown;
      // se degrada a un comentario HTML (Markdown admite comentarios). El dato
      // íntegro sigue en getJSON.
      if (!VALID_BLOCK_TYPES[block.type]) {
        lines.push('<!-- mewyse:unknown-block ' + String(block.type).replace(/[^a-zA-Z0-9_-]/g, '') + ' -->');
        i++;
        continue;
      }

      // Agrupar listas consecutivas
      if (block.type === 'bulletList' || block.type === 'numberList' || block.type === 'checklist') {
        var listType = block.type;
        var num = 1;
        var listLines = [];

        while (i < blocks.length && blocks[i].type === listType) {
          var itemContent = blocks[i].content || '';
          var inlineMd = self.htmlToMarkdownInline(itemContent);

          if (listType === 'bulletList') {
            listLines.push('- ' + inlineMd);
          } else if (listType === 'numberList') {
            listLines.push(num + '. ' + inlineMd);
            num++;
          } else if (listType === 'checklist') {
            var check = blocks[i].checked ? '[x]' : '[ ]';
            listLines.push('- ' + check + ' ' + inlineMd);
          }
          i++;
        }

        lines.push(listLines.join('\n'));
      } else {
        switch (block.type) {
          case 'heading1':
            lines.push('# ' + self.htmlToMarkdownInline(content));
            break;
          case 'heading2':
            lines.push('## ' + self.htmlToMarkdownInline(content));
            break;
          case 'heading3':
            lines.push('### ' + self.htmlToMarkdownInline(content));
            break;
          case 'quote':
            lines.push('> ' + self.htmlToMarkdownInline(content));
            break;
          case 'code':
            // Unescape HTML entities en bloques de código (compat con contenido
            // antiguo que se guardó escapado; el modelo actual ya es texto plano).
            var codeContent = content
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");
            // El lenguaje (si es válido) se emite tras la valla de apertura.
            var v_md_lang = (block.language && CODE_LANGUAGES.hasOwnProperty(block.language) && block.language !== '')
              ? block.language : '';
            lines.push('```' + v_md_lang + '\n' + codeContent + '\n```');
            break;
          case 'divider':
            lines.push('---');
            break;
          case 'pageBreak':
            // Sin sintaxis Markdown estándar: comentario HTML reconocible.
            lines.push('<!-- pagebreak -->');
            break;
          case 'callout':
            // Estilo GitHub: > [!NOTE] / [!TIP] / [!WARNING] / [!CAUTION].
            var v_coMap = { info: 'NOTE', success: 'TIP', warning: 'WARNING', danger: 'CAUTION' };
            var v_coTag = v_coMap[block.calloutVariant] || 'NOTE';
            lines.push('> [!' + v_coTag + ']\n> ' + self.htmlToMarkdownInline(content));
            break;
          case 'toggle':
            // Markdown no tiene desplegable nativo: degradar a título en negrita
            // seguido del cuerpo como texto.
            lines.push('**' + self.htmlToMarkdownInline(block.toggleTitle || '') + '**');
            lines.push(self.htmlToMarkdownInline(content));
            break;
          case 'toc':
            // Índice: lista de títulos con enlaces a un ancla derivada del texto.
            var v_toc_lines = [];
            for (var v_ti = 0; v_ti < blocks.length; v_ti++) {
              var v_th = blocks[v_ti];
              if (v_th.type === 'heading1' || v_th.type === 'heading2' || v_th.type === 'heading3') {
                var v_tmp2 = document.createElement('div');
                v_tmp2.innerHTML = v_th.content || '';
                var v_ttxt = v_tmp2.textContent || '';
                // Indentación por nivel (h2 = 1 nivel, h3 = 2 niveles).
                var v_indent = (v_th.type === 'heading2') ? '  ' : (v_th.type === 'heading3' ? '    ' : '');
                v_toc_lines.push(v_indent + '- [' + v_ttxt + '](#' + self._slugify(v_ttxt) + ')');
              }
            }
            if (v_toc_lines.length) lines.push(v_toc_lines.join('\n'));
            break;
          case 'table':
            // Parsear HTML de tabla
            var tableParser = new DOMParser();
            var tableDoc = tableParser.parseFromString('<table>' + content + '</table>', 'text/html');
            var table = tableDoc.querySelector('table');
            if (table) {
              var rows = table.querySelectorAll('tr');
              var tableLines = [];
              for (var r = 0; r < rows.length; r++) {
                var cells = rows[r].querySelectorAll('th, td');
                var cellTexts = [];
                for (var c = 0; c < cells.length; c++) {
                  var cellHtml = cells[c].innerHTML;
                  var colspan = parseInt(cells[c].getAttribute('colspan')) || 1;
                  cellTexts.push(self.htmlToMarkdownInline(cellHtml));
                  // Celdas adicionales por colspan
                  for (var cs = 1; cs < colspan; cs++) {
                    cellTexts.push('');
                  }
                }
                tableLines.push('| ' + cellTexts.join(' | ') + ' |');
                // Separador después de la primera fila
                if (r === 0) {
                  var seps = [];
                  for (var s = 0; s < cellTexts.length; s++) {
                    seps.push('---');
                  }
                  tableLines.push('| ' + seps.join(' | ') + ' |');
                }
              }
              lines.push(tableLines.join('\n'));
            }
            break;
          case 'image':
            if (typeof content === 'object' && content.blob) {
              var alt = content.fileName || 'image';
              lines.push('![' + alt + '](' + content.blob + ')');
            }
            break;
          case 'video':
            var vUrlMd = (typeof content === 'string') ? content : ((content && content.url) || '');
            if (vUrlMd) {
              lines.push('[' + self.t('misc.markdownVideo') + '](' + vUrlMd + ')');
            }
            break;
          case 'audio':
            if (typeof content === 'object' && content.url) {
              lines.push('[' + self.t('misc.markdownAudio') + '](' + content.url + ')');
            }
            break;
          default:
            // paragraph
            lines.push(self.htmlToMarkdownInline(content));
        }
        i++;
      }
    }

    return lines.join('\n\n');
  };

  /**
   * Convierte Markdown inline a HTML inline
   * @param {string} text - Texto Markdown con formato inline
   * @returns {string} HTML equivalente
   */
  meWYSE.prototype.markdownInlineToHtml = function(text) {
    if (!text) return '';
    var self = this;

    // Proteger bloques de código inline con placeholders (ANTES de escapar)
    // El contenido dentro de `code` se escapa como texto también.
    var codeBlocks = [];
    text = text.replace(/`([^`]+)`/g, function(match, code) {
      var idx = codeBlocks.length;
      codeBlocks.push('<code>' + escapeHtml(code) + '</code>');
      return '\x00CODE' + idx + '\x00';
    });

    // Proteger las etiquetas HTML inline que emite htmlToMarkdownInline
    // (subrayado, sub/sup, mark, saltos <br> y spans de color). Sin esto, el
    // escapeHtml de abajo las volvería texto literal (&lt;u&gt;...) y se perdería
    // el formato en el round-trip getMarkdown -> loadFromMarkdown. Es seguro
    // restaurarlas porque loadFromMarkdown pasa el resultado por _sanitizeBlocks.
    var htmlTags = [];
    text = text.replace(/<\/?(?:u|sub|sup|mark)>|<br\s*\/?>|<span style="[^"]*">|<\/span>/gi, function(match) {
      var idx = htmlTags.length;
      htmlTags.push(match);
      return '\x00HTML' + idx + '\x00';
    });

    // Escapar HTML del texto restante ANTES de aplicar transformaciones MD
    // Esto evita que `**<img onerror=...>**` se convierta en HTML peligroso.
    text = escapeHtml(text);

    // Los marcadores de Markdown que el usuario escribió ahora están en texto plano,
    // pero los propios asteriscos/guiones no se escapan (no son HTML).
    // Los <, >, & que el usuario escribió ya están como &lt; &gt; &amp;.

    // Links: [texto](url) con validación de esquema URL
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_, linkText, url) {
      // url y linkText ya están escapados por escapeHtml, pero hay que decodificar
      // los placeholders markdown en url si los hay (no debería pero por seguridad)
      var decodedUrl = url
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      var safe = self._isSafeUrl(decodedUrl) ? decodedUrl : '#';
      // Re-escape el href final
      var safeHref = safe
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return '<a href="' + safeHref + '">' + linkText + '</a>';
    });

    // Bold: **texto** o __texto__
    text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    text = text.replace(/__(.+?)__/g, '<b>$1</b>');

    // Italic: *texto* o _texto_
    text = text.replace(/\*(.+?)\*/g, '<i>$1</i>');
    text = text.replace(/(^|[^\w])_(.+?)_([^\w]|$)/g, '$1<i>$2</i>$3');

    // Strikethrough: ~~texto~~
    text = text.replace(/~~(.+?)~~/g, '<s>$1</s>');

    // Restaurar bloques de código
    text = text.replace(/\x00CODE(\d+)\x00/g, function(match, idx) {
      return codeBlocks[parseInt(idx)];
    });

    // Restaurar las etiquetas HTML inline protegidas
    text = text.replace(/\x00HTML(\d+)\x00/g, function(match, idx) {
      return htmlTags[parseInt(idx)];
    });

    return text;
  };

  /**
   * Carga contenido desde Markdown
   * @param {string} markdown - Contenido en formato Markdown
   */
  meWYSE.prototype.loadFromMarkdown = function(markdown) {
    this.pushHistory(true);
    var self = this;
    var lines = markdown.split('\n');
    var newBlocks = [];
    var blockId = 0;
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      // Líneas vacías: separador, saltar
      if (line.trim() === '') {
        i++;
        continue;
      }

      // Bloque de código (code fence)
      if (line.trim().match(/^```/)) {
        var codeLines = [];
        i++;
        while (i < lines.length && !lines[i].trim().match(/^```/)) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // saltar el ``` de cierre
        newBlocks.push({
          id: ++blockId,
          type: 'code',
          content: escapeHtml(codeLines.join('\n'))
        });
        continue;
      }

      // Tabla: detectar línea que empieza con |
      if (line.trim().charAt(0) === '|') {
        var tableRows = [];
        while (i < lines.length && lines[i].trim().charAt(0) === '|') {
          var rowLine = lines[i].trim();
          // Ignorar fila de separadores (| --- | --- |)
          if (rowLine.match(/^\|[\s\-:|]+\|$/)) {
            i++;
            continue;
          }
          // Parsear celdas
          var cellsRaw = rowLine.split('|');
          var cells = [];
          for (var c = 1; c < cellsRaw.length - 1; c++) {
            cells.push(cellsRaw[c].trim());
          }
          tableRows.push(cells);
          i++;
        }

        // Construir HTML de tabla
        if (tableRows.length > 0) {
          var tableHtml = '';
          for (var r = 0; r < tableRows.length; r++) {
            tableHtml += '<tr>';
            for (var c = 0; c < tableRows[r].length; c++) {
              var cellTag = r === 0 ? 'th' : 'td';
              var cellContent = self.markdownInlineToHtml(tableRows[r][c]);
              tableHtml += '<' + cellTag + ' style="border:1px solid #ddd;padding:8px">' + cellContent + '</' + cellTag + '>';
            }
            tableHtml += '</tr>';
          }
          newBlocks.push({
            id: ++blockId,
            type: 'table',
            content: tableHtml
          });
        }
        continue;
      }

      // Headings
      var headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        var level = headingMatch[1].length;
        newBlocks.push({
          id: ++blockId,
          type: 'heading' + level,
          content: self.markdownInlineToHtml(headingMatch[2])
        });
        i++;
        continue;
      }

      // Quote
      var quoteMatch = line.match(/^>\s*(.*)$/);
      if (quoteMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'quote',
          content: self.markdownInlineToHtml(quoteMatch[1])
        });
        i++;
        continue;
      }

      // Checklist: - [x] o - [ ]
      var checklistMatch = line.match(/^-\s+\[([ xX])\]\s+(.*)$/);
      if (checklistMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'checklist',
          content: self.markdownInlineToHtml(checklistMatch[2]),
          checked: checklistMatch[1].toLowerCase() === 'x'
        });
        i++;
        continue;
      }

      // Bullet list: - o *
      var bulletMatch = line.match(/^[-*]\s+(.+)$/);
      if (bulletMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'bulletList',
          content: self.markdownInlineToHtml(bulletMatch[1])
        });
        i++;
        continue;
      }

      // Number list: N.
      var numberMatch = line.match(/^\d+\.\s+(.+)$/);
      if (numberMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'numberList',
          content: self.markdownInlineToHtml(numberMatch[1])
        });
        i++;
        continue;
      }

      // Divider: ---, ***, ___
      if (line.trim().match(/^(---+|\*\*\*+|___+)$/)) {
        newBlocks.push({
          id: ++blockId,
          type: 'divider',
          content: ''
        });
        i++;
        continue;
      }

      // Image: ![alt](url)
      var imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        newBlocks.push({
          id: ++blockId,
          type: 'image',
          content: {
            blob: imageMatch[2],
            fileName: imageMatch[1] || 'image',
            width: 'auto',
            height: 'auto'
          }
        });
        i++;
        continue;
      }

      // Paragraph (default)
      newBlocks.push({
        id: ++blockId,
        type: 'paragraph',
        content: self.markdownInlineToHtml(line)
      });
      i++;
    }

    // Si no hay bloques, crear uno vacío
    if (newBlocks.length === 0) {
      newBlocks.push({
        id: ++blockId,
        type: 'paragraph',
        content: ''
      });
    }

    // Pasar por sanitizer (defensa final: aunque markdownInlineToHtml ya escapa,
    // confirmamos whitelist de tags y validamos URLs/imágenes)
    this.currentBlockId = blockId;
    this.blocks = this._sanitizeBlocks(newBlocks);
    this.render();
    this.triggerChange();
    // Nueva línea base para dirty tracking (carga explícita = estado "limpio").
    this._capture_pristine();
  };

  /**
   * Carga contenido desde JSON
   * @param {string|Object} json
   */
  meWYSE.prototype.loadFromJSON = function(json) {
    this.pushHistory(true);
    var data;
    try {
      data = typeof json === 'string' ? JSON.parse(json) : json;
    } catch (e) {
      data = [];
    }
    if (!Array.isArray(data)) data = [];

    // Sanitizar contra XSS (maneja currentBlockId internamente)
    this.blocks = this._sanitizeBlocks(data);
    // Garantizar que siempre haya al menos un bloque (igual que loadFromHTML):
    // un JSON vacío o íntegramente inválido dejaría el editor sin bloques.
    if (this.blocks.length === 0) {
      this.blocks.push({ id: ++this.currentBlockId, type: 'paragraph', content: '' });
    }

    this.render();
    // Igual que loadFromHTML/loadFromMarkdown: refresca el panel de esquema si
    // está abierto, sincroniza el textarea y el contador, y dispara onChange.
    this.triggerChange();
    // Nueva línea base para dirty tracking: una carga explícita es el nuevo
    // estado "limpio" (cubre también restoreDraft, que llama aquí).
    this._capture_pristine();
  };

  /**
   * Autosave — API pública. El guardado ocurre automáticamente en triggerChange
   * si `autosave` está activo; estos métodos permiten al consumidor gestionar el
   * borrador (comprobar/restaurar/limpiar) sin auto-restauración implícita.
   */
  meWYSE.prototype.hasDraft = function() {
    try {
      return !!window.localStorage.getItem(this.autosaveKey);
    } catch (e) { return false; }
  };

  meWYSE.prototype.restoreDraft = function() {
    var v_raw;
    try {
      v_raw = window.localStorage.getItem(this.autosaveKey);
    } catch (e) { return false; }
    if (!v_raw) return false;
    // loadFromJSON pasa por _sanitizeBlocks (trust boundary intacto).
    this.loadFromJSON(v_raw);
    return true;
  };

  meWYSE.prototype.clearDraft = function() {
    try {
      window.localStorage.removeItem(this.autosaveKey);
    } catch (e) {}
  };

  /**
   * Carga contenido desde una cadena HTML.
   * Útil para migrar contenido guardado por editores WYSIWYG previos (TinyMCE, CKEditor).
   * Detecta automáticamente iframes de YouTube/Vimeo, <video>, <audio>, <img>, tablas
   * y listas, y los convierte al modelo de bloques de meWYSE.
   *
   * @param {string} html - HTML source
   */
  meWYSE.prototype.loadFromHTML = function(html) {
    this.pushHistory(true);
    var blocks = this._htmlToBlocks(html || '');
    this.blocks = this._sanitizeBlocks(blocks);
    // Garantizar que siempre haya al menos un bloque
    if (this.blocks.length === 0) {
      this.blocks.push({ id: ++this.currentBlockId, type: 'paragraph', content: '' });
    }
    this.render();
    this.triggerChange();
    // Nueva línea base para dirty tracking (carga explícita = estado "limpio").
    this._capture_pristine();
  };

  /**
   * Dispara el evento onChange
   */
  meWYSE.prototype.triggerChange = function() {
    if (!this.isUndoRedo) {
      this.pushHistory();
    }

    // Texto plano: lo usan el textarea y el elemento original. Se calcula una
    // sola vez y se cachea (antes se llamaba a getPlainText hasta 3 veces).
    var v_plain = null;

    // Actualizar textarea en modo minimal
    if (this.target.tagName === 'TEXTAREA') {
      v_plain = this.getPlainText();
      this.target.value = v_plain;

      // Si hay un elemento original (no-textarea), sincronizarlo también
      if (this.originalTarget) {
        this.originalTarget.textContent = v_plain;
      }
    }

    // Actualizar contador de palabras/caracteres si está visible
    if (this.showCharCounter) {
      this.updateCharCounter();
    }

    // Refrescar el panel de esquema si está abierto (índice en vivo)
    if (this.outlinePanel) {
      this._buildOutlineContent();
    }

    // Refrescar los bloques TOC (índice de títulos) para reflejar cambios en vivo.
    this._refreshTocBlocks();

    // Autosave: guardar el borrador (JSON) en localStorage con debounce propio,
    // independiente del de history. En readOnly no hay cambios que guardar.
    if (this.autosave && !this.readOnly) {
      var v_self = this;
      if (this._autosaveTimer) clearTimeout(this._autosaveTimer);
      this._autosaveTimer = setTimeout(function() {
        try {
          window.localStorage.setItem(v_self.autosaveKey, v_self.getJSON());
        } catch (e) {} // cuota llena / modo privado / sin localStorage
      }, 800);
    }

    // En modo readOnly no notificamos cambios — el contenido no muta y los
    // callbacks (onChange/onFocus/onBlur) deben ser inertes.
    if (this.readOnly) return;

    // Solo construir/disparar si hay un consumidor de onChange.
    if (typeof this.onChange !== 'function') return;

    // Payload PEREZOSO: html/json/markdown/hasChanges se calculan solo si el
    // consumidor los lee. Se reutiliza el `v_plain` ya calculado para el textarea
    // (si el target era textarea); el resto queda lazy.
    var v_payload = this._make_change_payload(null, { plainText: v_plain });

    if (this.onChangeDebounce > 0) {
      // Debounce: agrupa ráfagas de cambios en una sola llamada a onChange tras
      // `onChangeDebounce` ms de inactividad. El payload perezoso se evalúa al
      // dispararse (mismo estado, porque el debounce implica reposo).
      var v_self2 = this;
      if (this._onChangeTimer) clearTimeout(this._onChangeTimer);
      this._onChangeTimer = setTimeout(function() {
        v_self2._onChangeTimer = null;
        v_self2._fireChangeCallback(v_payload);
      }, this.onChangeDebounce);
    } else {
      this._fireChangeCallback(v_payload);
    }
  };

  /**
   * Dispara onChange protegido: un error del consumidor no debe romper la
   * operación de edición en curso (mismo patrón que onFocus/onBlur).
   * @param {Object} payload
   */
  meWYSE.prototype._fireChangeCallback = function(payload) {
    // Guarda por si un onChange debounced se dispara tras destroy() (carrera).
    if (this._destroyed) return;
    if (typeof this.onChange !== 'function') return;
    try {
      this.onChange(payload);
    } catch (e) {}
  };

  /**
   * Determina si un elemento pertenece a la UI de este editor (wrapper, toolbar,
   * char counter, menús flotantes, modales, pickers, tooltips, etc).
   * Usado para evitar disparar onBlur cuando el foco se mueve a UI propia del editor.
   *
   * @param {Element} el
   * @returns {boolean}
   */
  meWYSE.prototype._isPartOfEditorUI = function(el) {
    if (!el || !el.closest) return false;

    // 1. Dentro del wrapper completo del editor (incluye toolbar + container + char counter)
    if (this.editorWrapper && (this.editorWrapper === el || this.editorWrapper.contains(el))) {
      return true;
    }

    // 2. Dentro del container del editor (caso sin toolbar/wrapper)
    if (this.container && (this.container === el || this.container.contains(el))) {
      return true;
    }

    // 3. Dentro del floating handle (no está en el container, está en body)
    if (this.floatingHandle && this.floatingHandle.contains(el)) {
      return true;
    }

    // 4. Dentro de algún menú/modal/picker flotante del editor (todos en body, todos
    //    con clase prefijo mewyse-). Selector amplio que cubre todos los casos:
    var floatingSelector =
      '.mewyse-slash-menu, .mewyse-mention-menu, .mewyse-emoji-menu, ' +
      '.mewyse-format-menu, .mewyse-options-menu, .mewyse-type-menu, ' +
      '.mewyse-toolbar-menu, .mewyse-table-toolbar, ' +
      '.mewyse-color-picker, .mewyse-unified-color-picker, ' +
      '.mewyse-modal-overlay, .mewyse-find-replace, ' +
      '.mewyse-summary-tooltip, .mewyse-floating-handle, ' +
      '[class*="mewyse-"][class*="-menu"], [class*="mewyse-"][class*="-modal"], ' +
      '[class*="mewyse-"][class*="-picker"], [class*="mewyse-"][class*="-tooltip"]';
    try {
      if (el.closest(floatingSelector)) return true;
    } catch (e) {}

    return false;
  };

  /**
   * Construye el payload estándar pasado a callbacks (onChange/onFocus/onBlur).
   * Incluye el snapshot del contenido + info opcional del bloque enfocado.
   */
  /**
   * Construye el payload de eventos (onChange/onFocus/onBlur) con SERIALIZACIONES
   * PEREZOSAS: `plainText`/`html`/`json`/`markdown`/`hasChanges` se calculan SOLO
   * al acceder a ellos (getters memoizados), no de forma anticipada. Antes se
   * serializaban los 4 formatos (getHTML/getMarkdown hacen DOMParser por bloque)
   * en CADA cambio aunque el consumidor solo leyera uno → coste innecesario en
   * documentos grandes.
   *
   * @param {HTMLElement} [v_focused_el] - elemento con foco (para focusedBlock*)
   * @param {Object} [v_seed] - valores ya calculados a reutilizar (p. ej.
   *   `{ plainText }` que triggerChange calcula igualmente para el textarea).
   * @returns {Object} payload con getters perezosos
   */
  meWYSE.prototype._make_change_payload = function(v_focused_el, v_seed) {
    var self = this;
    v_seed = v_seed || {};
    // Cache de valores calculados. `undefined` = aún no calculado; un seed
    // string (incluido '') cuenta como ya calculado.
    var v_cache = {
      plainText: (typeof v_seed.plainText === 'string') ? v_seed.plainText : undefined,
      html: (typeof v_seed.html === 'string') ? v_seed.html : undefined,
      json: (typeof v_seed.json === 'string') ? v_seed.json : undefined,
      markdown: (typeof v_seed.markdown === 'string') ? v_seed.markdown : undefined
    };

    var payload = {
      // Referencia al propio editor (API accesible desde el callback sin capturar
      // la instancia en una variable externa).
      editor: this,
      blocks: this.blocks,
      focusedBlockId: null,
      focusedBlockType: null
    };

    if (v_focused_el && v_focused_el.closest) {
      var v_block_el = v_focused_el.closest('[data-block-id]');
      if (v_block_el) {
        var v_bid = parseInt(v_block_el.getAttribute('data-block-id'), 10);
        if (!isNaN(v_bid)) {
          payload.focusedBlockId = v_bid;
          payload.focusedBlockType = v_block_el.getAttribute('data-block-type') || null;
        }
      }
    }

    // Getter perezoso memoizado (Object.defineProperty es ES5; enumerable para
    // que el payload se comporte como un objeto normal al iterar/serializar).
    var v_define_lazy = function(v_key, v_compute) {
      Object.defineProperty(payload, v_key, {
        enumerable: true,
        configurable: true,
        get: function() {
          if (v_cache[v_key] === undefined) v_cache[v_key] = v_compute();
          return v_cache[v_key];
        }
      });
    };
    v_define_lazy('plainText', function() { return self.getPlainText(); });
    v_define_lazy('html', function() { return self.getHTML(); });
    v_define_lazy('json', function() { return self.getJSON(); });
    v_define_lazy('markdown', function() { return self.getMarkdown(); });

    // hasChanges: depende de `json` (comparte cache, no recalcula si ya se leyó).
    Object.defineProperty(payload, 'hasChanges', {
      enumerable: true,
      configurable: true,
      get: function() {
        if (self._pristine_signature === null) return false;
        if (v_cache.json === undefined) v_cache.json = self.getJSON();
        return v_cache.json !== self._pristine_signature;
      }
    });

    return payload;
  };

  /**
   * Payload para onFocus/onBlur (delega en el builder perezoso; añade el foco).
   */
  meWYSE.prototype._buildEventPayload = function(focusedElement) {
    return this._make_change_payload(focusedElement);
  };

  /**
   * Dispara onFocus con el payload estándar.
   */
  meWYSE.prototype._fireFocusCallback = function(focusedElement) {
    if (this.readOnly) return; // sin eventos en modo solo-visualización
    if (typeof this.onFocus !== 'function') return;
    try {
      this.onFocus(this._buildEventPayload(focusedElement));
    } catch (e) {}
  };

  /**
   * Dispara onBlur con el payload estándar.
   */
  meWYSE.prototype._fireBlurCallback = function(blurredElement) {
    if (this.readOnly) return; // sin eventos en modo solo-visualización
    if (typeof this.onBlur !== 'function') return;
    try {
      this.onBlur(this._buildEventPayload(blurredElement));
    } catch (e) {}
  };

  /**
   * Destruye el editor
   */
  meWYSE.prototype.destroy = function() {
    // Idempotencia: no destruir dos veces
    if (this._destroyed) return;

    // Cerrar menús abiertos
    this.closeSlashMenu();
    this.closeFormatMenu();
    this.closeToolbarMenu();
    this.closeMentionMenu();
    this.closeEmojiMenu();
    this.hideTableToolbar();

    // Cerrar find/replace si estaba abierto
    this.closeFindReplace();

    // Salir de fullscreen si estaba activo
    if (this.isFullscreen) {
      this.exitFullscreen();
    }

    // Limpiar barra de contador
    if (this.charCounterBar && this.charCounterBar.parentNode) {
      this.charCounterBar.remove();
      this.charCounterBar = null;
    }

    // Limpiar listener de dark mode del sistema
    if (this._darkModeMediaQuery && this._handleDarkModeChange) {
      if (this._darkModeMediaQuery.removeEventListener) {
        this._darkModeMediaQuery.removeEventListener('change', this._handleDarkModeChange);
      }
    }

    // Limpiar selección cross-block
    this.clearCrossBlockSelection();
    if (this.crossBlockOverlay && this.crossBlockOverlay.parentNode) {
      this.crossBlockOverlay.remove();
      this.crossBlockOverlay = null;
    }


    // Remover event listener de selección
    if (this.handleSelectionChange) {
      document.removeEventListener('selectionchange', this.handleSelectionChange);
    }

    // Limpiar botón de resumen
    if (this.summaryButton && this.summaryButton.parentNode) {
      this.summaryButton.remove();
    }
    this.closeOutlinePanel();
    this.hideSummaryTooltip();

    // Cerrar cualquier modal/menú registrado en el backdrop (color picker, case
    // menu, tag menu...) invocando su closeFn, para que limpien sus PROPIOS
    // listeners (scroll/resize/click). Se itera sobre una copia porque closeFn
    // suele mutar _activeBackdropModals vía _hideBackdrop.
    if (this._activeBackdropModals) {
      var v_open_modals = this._activeBackdropModals.slice();
      for (var bm = 0; bm < v_open_modals.length; bm++) {
        try {
          if (typeof v_open_modals[bm].closeFn === 'function') v_open_modals[bm].closeFn();
        } catch (e) {}
      }
      this._activeBackdropModals.length = 0;
    }
    // Cerrar también el tag-menu si sigue abierto (por si no estaba en backdrop).
    if (this.closeTagMenu) this.closeTagMenu();
    if (this.closeMergeTagMenu) this.closeMergeTagMenu();
    this._removeBackdrop();

    // Limpiar listeners y observer del scroll horizontal de la toolbar
    if (this._toolbarScrollListeners) {
      for (var tsi = 0; tsi < this._toolbarScrollListeners.length; tsi++) {
        var l = this._toolbarScrollListeners[tsi];
        if (l && l.el && l.fn) {
          l.el.removeEventListener(l.type, l.fn, l.opts || false);
        }
      }
      this._toolbarScrollListeners = null;
    }
    if (this._toolbarResizeObserver) {
      try { this._toolbarResizeObserver.disconnect(); } catch (e) {}
      this._toolbarResizeObserver = null;
    }

    // Limpiar toolbar y wrapper si existen
    if (this.toolbar && this.toolbar.parentNode) {
      // El toolbar está dentro de un wrapper, eliminar el wrapper completo.
      // Se usa classList.contains (no === className) porque el wrapper lleva más
      // clases por defecto (mewyse-editor-styled, tema, rtl...) y el === fallaba,
      // dejando el div del wrapper huérfano en el DOM.
      var wrapper = this.toolbar.parentNode;
      if (wrapper.classList && wrapper.classList.contains('mewyse-editor-wrapper')) {
        wrapper.remove();
      } else {
        this.toolbar.remove();
      }
    }

    // Eliminar container si no fue eliminado con el wrapper
    if (this.container && this.container.parentNode) {
      this.container.remove();
    }

    // Remover listeners globales de document
    if (this._handleDocMouseUp) {
      document.removeEventListener('mouseup', this._handleDocMouseUp);
    }
    if (this._handleDocMouseDown) {
      document.removeEventListener('mousedown', this._handleDocMouseDown);
    }
    if (this.imageKeydownHandler) {
      document.removeEventListener('keydown', this.imageKeydownHandler);
    }
    if (this.videoKeydownHandler) {
      document.removeEventListener('keydown', this.videoKeydownHandler);
    }
    if (this.closeToolbarMenuHandler) {
      document.removeEventListener('click', this.closeToolbarMenuHandler);
    }

    // Remove image drop handlers
    if (this.container) {
      if (this._handleScrollReposition) this.container.removeEventListener('scroll', this._handleScrollReposition);
      if (this._imageDragEnterHandler) this.container.removeEventListener('dragenter', this._imageDragEnterHandler);
      if (this._imageDragOverHandler) this.container.removeEventListener('dragover', this._imageDragOverHandler);
      if (this._imageDragLeaveHandler) this.container.removeEventListener('dragleave', this._imageDragLeaveHandler);
      if (this._imageDropHandler) this.container.removeEventListener('drop', this._imageDropHandler);
    }

    // Limpiar file input persistente
    if (this._fileInput && this._fileInput.parentNode) {
      this._fileInput.parentNode.removeChild(this._fileInput);
      this._fileInput = null;
    }

    if (this.originalTarget) {
      // Si había un elemento original no-textarea
      this.originalTarget.style.display = '';  // Restaurar visibilidad
      this.target.remove();  // Eliminar textarea interno creado
    } else if (this.target.tagName === 'TEXTAREA') {
      // Era un textarea original
      this.target.style.display = '';
    }

    // Cancelar todos los timers / animaciones pendientes para que ningún
    // callback se ejecute sobre una instancia ya desmontada
    if (this.formatMenuTimeout) { clearTimeout(this.formatMenuTimeout); this.formatMenuTimeout = null; }
    if (this.historyDebounceTimer) { clearTimeout(this.historyDebounceTimer); this.historyDebounceTimer = null; }
    if (this.summaryTooltipTimeout) { clearTimeout(this.summaryTooltipTimeout); this.summaryTooltipTimeout = null; }
    // Tooltips (toolbar + menú de formato): timer, listeners de cada contenedor
    // y elemento flotante.
    if (this._toolbarTooltipTimer) { clearTimeout(this._toolbarTooltipTimer); this._toolbarTooltipTimer = null; }
    if (this._tooltipContainers) {
      for (var tc = this._tooltipContainers.length - 1; tc >= 0; tc--) {
        var v_cont = this._tooltipContainers[tc];
        if (this._tooltipMouseOver) v_cont.removeEventListener('mouseover', this._tooltipMouseOver);
        if (this._tooltipMouseOut) v_cont.removeEventListener('mouseout', this._tooltipMouseOut);
        if (this._tooltipHide) {
          v_cont.removeEventListener('mousedown', this._tooltipHide, true);
          v_cont.removeEventListener('scroll', this._tooltipHide, true);
        }
      }
      this._tooltipContainers = null;
    }
    if (this._toolbarTooltip && this._toolbarTooltip.parentNode) {
      this._toolbarTooltip.parentNode.removeChild(this._toolbarTooltip);
      this._toolbarTooltip = null;
    }
    if (this.floatingHandleHideTimeout) { clearTimeout(this.floatingHandleHideTimeout); this.floatingHandleHideTimeout = null; }
    if (this._handleHideTimer) { clearTimeout(this._handleHideTimer); this._handleHideTimer = null; }
    if (this._autosaveTimer) { clearTimeout(this._autosaveTimer); this._autosaveTimer = null; }
    if (this._onChangeTimer) { clearTimeout(this._onChangeTimer); this._onChangeTimer = null; }
    if (this._crossBlockRafId) { cancelAnimationFrame(this._crossBlockRafId); this._crossBlockRafId = null; }

    // Red de seguridad: retirar cualquier listener de click en document que
    // quedara registrado por menús cerrados por selección/Escape
    if (this._doc_click_handlers) {
      for (var dch = 0; dch < this._doc_click_handlers.length; dch++) {
        document.removeEventListener('click', this._doc_click_handlers[dch]);
      }
      this._doc_click_handlers = null;
    }

    this._destroyed = true;
  };

  /**
   * Inicializa el menú de formato (solo en modo minimalista)
   */
  meWYSE.prototype.initFormatMenu = function() {
    var self = this;

    // Escuchar cambios en la selección
    this.handleSelectionChange = function() {
      self.onSelectionChange();
    };

    document.addEventListener('selectionchange', this.handleSelectionChange);
  };

  /**
   * Maneja cambios en la selección de texto
   */
  meWYSE.prototype.onSelectionChange = function() {
    var self = this;

    // Si estamos en modo cross-block selecting, no interferir
    if (this.isCrossBlockSelecting || this.crossBlockSelection) {
      return;
    }

    // Reflejar el estado activo de los botones de formato (bold/italic/…) en cada
    // cambio de selección/caret (inmediato, sin esperar al timeout del menú).
    this._updateFormatButtonStates();
    // Y el estado dinámico de las acciones custom (requiresSelection/isEnabled/isActive).
    this._updateCustomActionStates();

    // Limpiar timeout anterior
    if (this.formatMenuTimeout) {
      clearTimeout(this.formatMenuTimeout);
    }

    // Esperar un momento para asegurar que la selección está completa
    this.formatMenuTimeout = setTimeout(function() {
      // Reevaluar la toolbar de tabla en cada cambio de selección/caret
      self._updateTableToolbar();
      // Reflejar el tamaño de fuente del caret en el stepper (si existe).
      self._updateFontSizeStepper();
      // Habilitar/deshabilitar las herramientas de selección de la toolbar
      // (modo 'toolbar') según haya o no selección de texto.
      self._updateSelectionTools();

      var selection = window.getSelection();

      // Verificar si hay texto seleccionado (y un rango disponible)
      if (!selection || !selection.rangeCount || selection.isCollapsed || selection.toString().trim() === '') {
        self.closeFormatMenu();
        return;
      }

      // Verificar que la selección está dentro del editor
      var range = selection.getRangeAt(0);
      var container = range.commonAncestorContainer;
      var isInEditor = false;

      // Buscar si el contenedor está dentro del editor
      var node = container.nodeType === 3 ? container.parentNode : container;
      while (node) {
        if (node === self.container) {
          isInEditor = true;
          break;
        }
        node = node.parentNode;
      }

      if (!isInEditor) {
        self.closeFormatMenu();
        return;
      }

      // Verificar si la selección está dentro de una mención/emoji/tag o los contiene
      var selectionContainsSpecial = false;

      // Verificar si el contenedor común es o está dentro de una mención, emoji o tag
      var checkNode = container.nodeType === 3 ? container.parentNode : container;
      while (checkNode && checkNode !== self.container) {
        if (checkNode.classList && (
            checkNode.classList.contains('mewyse-mention') ||
            checkNode.classList.contains('mewyse-emoji') ||
            checkNode.classList.contains('mewyse-tag'))) {
          selectionContainsSpecial = true;
          break;
        }
        checkNode = checkNode.parentNode;
      }

      // Verificar si hay menciones, emojis o tags dentro del rango seleccionado
      if (!selectionContainsSpecial) {
        var fragment = range.cloneContents();
        if (fragment.querySelectorAll('.mewyse-mention').length > 0 ||
            fragment.querySelectorAll('.mewyse-emoji').length > 0 ||
            fragment.querySelectorAll('.mewyse-tag').length > 0) {
          selectionContainsSpecial = true;
        }
      }

      // No mostrar menú de formato si hay elementos especiales involucrados
      if (selectionContainsSpecial) {
        self.closeFormatMenu();
        return;
      }

      // Mientras se arrastra con el ratón pulsado (selección en curso) NO se
      // monta el menú flotante ni su backdrop: aparecerían sobre el editor y
      // desajustarían la selección nativa. Se mostrará en el mouseup (ver
      // _handleDocMouseUp, que reevalúa la selección al soltar).
      if (self._mouseSelecting) return;

      self.showFormatMenu(selection, range);
    }, 100);
  };

  /**
   * Muestra el menú de formato
   * @param {Selection} selection
   * @param {Range} range
   */
  meWYSE.prototype.showFormatMenu = function(selection, range, crossBlockReference) {
    var self = this;
    var isCrossBlock = !!crossBlockReference;

    // Con toolbar activa, el menú flotante solo se suprime en modo
    // `selectionTools: 'toolbar'` (ahí las herramientas de formato viven en la
    // propia toolbar → sería redundante). En modo 'floating' (default) las
    // herramientas de selección NO están en la toolbar, así que el menú flotante
    // SÍ debe mostrarse aunque la toolbar esté activa.
    if (this.showToolbar && this._selectionToolsMode === 'toolbar') {
      this.closeFormatMenu();
      return;
    }

    // Cerrar menú existente
    this.closeFormatMenu();

    var menu = document.createElement('div');
    menu.className = 'mewyse-format-menu';
    this.formatMenu = menu;

    // `name` = nombre PÚBLICO de la acción (el mismo de la toolbar / STANDARD_ACTION_NAMES);
    // por él pasan disabledActions/overrides vía _runAction. `action` se conserva
    // solo como data-action/estilo del botón.
    var tools = [
      { name: 'bold', action: 'bold', label: 'B', titleKey: 'tooltips.bold' },
      { name: 'italic', action: 'italic', label: 'I', titleKey: 'tooltips.italic' },
      { name: 'underline', action: 'underline', label: 'U', titleKey: 'tooltips.underline' },
      { name: 'strikethrough', action: 'strikethrough', label: 'S', titleKey: 'tooltips.strikethrough' },
      { name: 'case', action: 'caseMenu', label: 'Aa', titleKey: 'tooltips.toggleCase', type: 'caseMenu' },
      { action: 'separator', type: 'separator' },
      { name: 'link', action: 'link', label: WYSIWYG_ICONS.link, titleKey: 'tooltips.insertLink' },
      { name: 'forecolor', action: 'color', label: WYSIWYG_ICONS.palette, titleKey: 'tooltips.color', type: 'colorPicker' },
      { action: 'separator', type: 'separator' },
      { name: 'subscript', action: 'subscript', label: WYSIWYG_ICONS.subscript, titleKey: 'tooltips.subscript' },
      { name: 'superscript', action: 'superscript', label: WYSIWYG_ICONS.superscript, titleKey: 'tooltips.superscript' },
      { name: 'removeformat', action: 'removeFormat', label: WYSIWYG_ICONS.removeFormat, titleKey: 'tooltips.removeFormat' },
      { action: 'separator', type: 'separator' },
      { name: 'font', action: 'font', label: WYSIWYG_ICONS.font, titleKey: 'tooltips.font', type: 'fontMenu' }
    ];
    tools.push({ name: 'fontsize', action: 'fontSize', type: 'fontSizeStepper' });

    // La alineación es de BLOQUE (no de la selección) y, cuando hay toolbar activa,
    // ya está allí → incluir el botón de alineación en el menú flotante solo si
    // NO hay toolbar (editor sin barra: el menú flotante es su única UI).
    if (!this.showToolbar) {
      tools.push({ action: 'separator', type: 'separator' });
      tools.push({ name: 'align', action: 'alignMenu', label: WYSIWYG_ICONS.alignLeft, titleKey: 'tooltips.alignLeft', type: 'alignMenu' });
    }

    // Acciones CUSTOM con placement 'floating'|'both': se anclan por su nombre
    // público sobre los GRUPOS del menú (los separadores son los límites de grupo)
    // con el mismo algoritmo que la toolbar (_insertCustomActionsIntoRows). Se
    // trabaja con nombres y luego se reconstruye el array de tools.
    if (this._customActions && this._customActions.length) {
      var v_fl_by_name = {};
      var v_fl_rows = [[[]]]; // una fila → grupos de nombres
      for (var ti = 0; ti < tools.length; ti++) {
        if (tools[ti].type === 'separator') { v_fl_rows[0].push([]); continue; }
        v_fl_by_name[tools[ti].name] = tools[ti];
        v_fl_rows[0][v_fl_rows[0].length - 1].push(tools[ti].name);
      }
      this._insertCustomActionsIntoRows(v_fl_rows, 'floating');
      var v_tools2 = [];
      for (var gi2 = 0; gi2 < v_fl_rows[0].length; gi2++) {
        var v_grp = v_fl_rows[0][gi2];
        if (!v_grp.length) continue;
        if (v_tools2.length) v_tools2.push({ action: 'separator', type: 'separator' });
        for (var ni2 = 0; ni2 < v_grp.length; ni2++) {
          var v_nm = v_grp[ni2];
          if (v_fl_by_name[v_nm]) v_tools2.push(v_fl_by_name[v_nm]);
          else if (this._customActionsByName[v_nm]) v_tools2.push({ name: v_nm, type: 'custom', custom: this._customActionsByName[v_nm] });
        }
      }
      tools = v_tools2;
    }

    tools.forEach(function(tool) {
      // Acción desactivada por `disabledActions`: no se pinta en el flotante.
      if (tool.name && self._disabledActions[tool.name]) return;

      if (tool.type === 'separator') {
        var separator = document.createElement('div');
        separator.className = 'mewyse-format-separator';
        menu.appendChild(separator);
        return;
      }

      // Acción CUSTOM (placement floating|both): botón .mewyse-format-button que
      // despacha por _runAction; su estado (requiresSelection/isEnabled/isActive)
      // se evalúa al construir (el menú se recrea en cada selección).
      if (tool.type === 'custom') {
        menu.appendChild(self._buildCustomActionButton(tool.custom, 'floating'));
        return;
      }

      // Override con icon/tooltip propios: se reflejan también en el flotante.
      var v_ov = self._actionOverrides[tool.name];
      if (v_ov && (typeof v_ov.icon === 'string' || typeof v_ov.tooltip === 'string')) {
        tool = {
          name: tool.name, action: tool.action, type: tool.type,
          label: (typeof v_ov.icon === 'string') ? self._resolveActionIcon(v_ov.icon, v_ov.tooltip || tool.name) : tool.label,
          titleKey: tool.titleKey,
          _title: (typeof v_ov.tooltip === 'string') ? v_ov.tooltip : null
        };
      }

      // Tamaño de fuente: reutiliza el stepper [−][valor][+] (no es un botón
      // simple). Fija this._fontSizeDisplay al stepper del menú flotante.
      if (tool.type === 'fontSizeStepper') {
        menu.appendChild(self._buildFontSizeStepper());
        return;
      }

      var button = document.createElement('button');
      button.className = 'mewyse-format-button';
      button.innerHTML = tool.label;
      var v_title = tool._title || self.t(tool.titleKey);
      button.title = v_title;
      button.setAttribute('aria-label', v_title);
      button.setAttribute('data-action', tool.action);

      // Botón único de alineación: icono del valor actual (sin flecha lateral).
      if (tool.type === 'alignMenu') {
        button.innerHTML = self._alignButtonInnerHTML(self._getCurrentAlignment() || 'left');
        button.setAttribute('aria-haspopup', 'true');
      }
      // Botón de familia de fuente: abre el menú de fuente (submenú).
      if (tool.type === 'fontMenu') {
        button.setAttribute('aria-haspopup', 'true');
      }

      // Aplicar estilos especiales según el botón
      if (tool.action === 'bold') button.style.fontWeight = 'bold';
      if (tool.action === 'italic') button.style.fontStyle = 'italic';
      if (tool.action === 'underline') button.style.textDecoration = 'underline';
      if (tool.action === 'strikethrough') button.style.textDecoration = 'line-through';
      if (tool.action === 'toggleCase') { button.style.fontSize = '13px'; button.style.fontWeight = '600'; }

      // Toda la lógica (cross-block e inline) vive en _runDefaultAction; pasar
      // por _runAction aplica overrides/desactivaciones del registro de acciones.
      button.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self._runAction(tool.name, { source: 'floating', event: e, button: button });
      };

      menu.appendChild(button);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);

    // Tooltips propios también en el menú flotante de formato (se desadjunta en
    // closeFormatMenu, ya que el menú se recrea en cada selección).
    this._attachTooltips(menu);

    // Reflejar el tamaño de fuente de la selección en el stepper recién creado.
    this._updateFontSizeStepper();

    // Guardar el range para poder calcular su posición dinámicamente
    this.formatMenuRange = range;

    var rangeReference;
    if (crossBlockReference) {
      // Para selección cross-block, usar el reference proporcionado
      rangeReference = crossBlockReference;
    } else {
      // Crear un objeto que simula un elemento con getBoundingClientRect
      rangeReference = {
        getBoundingClientRect: function() {
          return range.getBoundingClientRect();
        }
      };
    }

    // Anclar el menú al range
    this.anchorMenu(menu, rangeReference, { offsetY: -65, centerX: true });

    // Evitar que se cierre al hacer clic en el menú
    menu.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this._showBackdrop('formatMenu', function() { self.closeFormatMenu(); });
  };

  /**
   * Aplica color de texto a la selección
   * @param {string} color - Color en formato hexadecimal
   */
  meWYSE.prototype.applyTextColor = function(color) {
    var self = this;
    // Si hay varios bloques seleccionados, aplicar a todos; si no, comportamiento normal.
    if (this._applyInlineAcrossSelection(function() { self.applyInlineStyle('color', color); })) return;
    this.applyInlineStyle('color', color);
    // applyInlineStyle solo muta el DOM: persistir el cambio al modelo.
    this._persistActiveBlockContent();
  };

  /**
   * Aplica color de fondo a la selección
   * @param {string} color - Color en formato hexadecimal
   */
  meWYSE.prototype.applyBackgroundColor = function(color) {
    var self = this;
    if (this._applyInlineAcrossSelection(function() { self.applyInlineStyle('backgroundColor', color); })) return;
    this.applyInlineStyle('backgroundColor', color);
    // applyInlineStyle solo muta el DOM: persistir el cambio al modelo.
    this._persistActiveBlockContent();
  };

  /**
   * Aplica un estilo inline a la selección actual
   * @param {string} styleProperty - Propiedad CSS (color, backgroundColor, etc.)
   * @param {string} styleValue - Valor del estilo
   */
  meWYSE.prototype.applyInlineStyle = function(styleProperty, styleValue) {
    var selection = window.getSelection();
    if (!selection.rangeCount || selection.isCollapsed) return;

    var range = selection.getRangeAt(0);
    var selectedText = range.toString();

    // Guardar el elemento contenedor
    var container = range.commonAncestorContainer;
    if (container.nodeType === 3) {
      container = container.parentElement;
    }

    // Verificar si ya hay un span directo que envuelve toda la selección
    var parentSpan = container.closest('span');

    if (parentSpan && parentSpan.textContent === selectedText) {
      // Si la selección es exactamente el contenido de un span, actualizar ese span
      parentSpan.style[styleProperty] = styleValue;
    } else {
      // Crear nuevo span
      var span = document.createElement('span');
      span.style[styleProperty] = styleValue;

      // Extraer contenido y envolverlo
      try {
        var fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);

        // Seleccionar el nuevo span
        range.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (e) {
        // En caso de error, revertir
        console.error('Error al aplicar estilo:', e);
      }
    }
  };

  /**
   * Elimina el color de texto del texto seleccionado
   */
  meWYSE.prototype.removeTextColor = function() {
    this.removeInlineStyle('color');
    // removeInlineStyle solo muta el DOM: persistir el cambio al modelo.
    this._persistActiveBlockContent();
  };

  /**
   * Elimina el color de fondo del texto seleccionado
   */
  meWYSE.prototype.removeBackgroundColor = function() {
    this.removeInlineStyle('backgroundColor');
    // removeInlineStyle solo muta el DOM: persistir el cambio al modelo.
    this._persistActiveBlockContent();
  };

  /**
   * Elimina un estilo inline de la selección actual
   * @param {string} styleProperty - Propiedad CSS a eliminar (color, backgroundColor, etc.)
   */
  meWYSE.prototype.removeInlineStyle = function(styleProperty) {
    var selection = window.getSelection();
    if (!selection.rangeCount) return;

    var range = selection.getRangeAt(0);
    var container = range.commonAncestorContainer;

    // Si es un nodo de texto, obtener el padre
    if (container.nodeType === 3) {
      container = container.parentElement;
    }

    // Buscar el span más cercano que contenga el estilo
    var targetSpan = container.closest('span');

    if (targetSpan && targetSpan.style[styleProperty]) {
      // Eliminar la propiedad de estilo
      targetSpan.style[styleProperty] = '';

      // Si el span no tiene más estilos, desenvolverlo
      if (!targetSpan.getAttribute('style') || targetSpan.getAttribute('style').trim() === '') {
        this.unwrapElement(targetSpan);
      }
    }

    // Buscar spans que tengan el estilo Y que INTERSECTEN la selección. Antes se
    // limpiaban todos los spans del contenedor común (todo el bloque cuando la
    // selección cruzaba varios spans), borrando el color fuera de la selección.
    var spans = [];
    if (container.querySelectorAll) {
      var allSpans = container.querySelectorAll('span');
      for (var i = 0; i < allSpans.length; i++) {
        if (allSpans[i].style[styleProperty] && this._rangeIntersectsNode(range, allSpans[i])) {
          spans.push(allSpans[i]);
        }
      }
    }

    // Limpiar todos los spans encontrados
    for (var j = 0; j < spans.length; j++) {
      spans[j].style[styleProperty] = '';

      // Si no quedan estilos, desenvolver el elemento
      if (!spans[j].getAttribute('style') || spans[j].getAttribute('style').trim() === '') {
        this.unwrapElement(spans[j]);
      }
    }
  };

  /**
   * Indica si un rango DOM se solapa (aunque sea parcialmente) con un nodo.
   * Usa compareBoundaryPoints (soporte amplio) en vez de intersectsNode.
   * @param {Range} range
   * @param {Node} node
   * @returns {boolean}
   */
  meWYSE.prototype._rangeIntersectsNode = function(range, node) {
    var v_node_range = document.createRange();
    try {
      v_node_range.selectNode(node);
    } catch (e) {
      v_node_range.selectNodeContents(node);
    }
    // Se solapan si: inicio_rango < fin_nodo  Y  fin_rango > inicio_nodo.
    return range.compareBoundaryPoints(Range.END_TO_START, v_node_range) < 0 &&
           range.compareBoundaryPoints(Range.START_TO_END, v_node_range) > 0;
  };

  /**
   * Desenvuelve un elemento, moviendo su contenido al padre y eliminando el elemento
   * @param {HTMLElement} element - Elemento a desenvolver
   */
  meWYSE.prototype.unwrapElement = function(element) {
    if (!element || !element.parentNode) return;

    var parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  };

  /**
   * Muestra un selector unificado de color para texto y fondo
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showUnifiedColorPicker = function(button) {
    var self = this;

    // Cerrar picker existente
    var existingPicker = document.querySelector('.mewyse-color-picker');
    if (existingPicker) {
      existingPicker.remove();
    }

    var picker = document.createElement('div');
    picker.className = 'mewyse-color-picker mewyse-unified-color-picker';

    // Array de colores actualizado
    var colors = [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7',
      '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
      '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
      '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
      '#795548', '#9E9E9E', '#607D8B', '#000000',
      '#FFFFFF'
    ];

    // Sección de color de texto
    var textColorSection = document.createElement('div');
    textColorSection.className = 'mewyse-color-section';

    var textColorLabel = document.createElement('div');
    textColorLabel.className = 'mewyse-color-section-label';
    textColorLabel.textContent = self.t('colors.textColor');
    textColorSection.appendChild(textColorLabel);

    var textColorGrid = document.createElement('div');
    textColorGrid.className = 'mewyse-color-grid';

    colors.forEach(function(color) {
      var colorBtn = document.createElement('button');
      colorBtn.className = 'mewyse-color-button';
      colorBtn.style.backgroundColor = color;
      colorBtn.title = color;

      // Añadir borde para color blanco
      if (color === '#FFFFFF') {
        colorBtn.style.border = '2px solid #ddd';
      }

      colorBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.applyTextColor(color);
        self.triggerChange();
        closePicker();
      };

      textColorGrid.appendChild(colorBtn);
    });

    // Botón para remover color de texto
    var removeTextBtn = document.createElement('button');
    removeTextBtn.className = 'mewyse-color-button mewyse-color-remove';
    removeTextBtn.innerHTML = WYSIWYG_ICONS.close;
    removeTextBtn.title = self.t('colors.removeTextColor');
    removeTextBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.removeTextColor();
      self.triggerChange();
      closePicker();
    };
    textColorGrid.appendChild(removeTextBtn);

    textColorSection.appendChild(textColorGrid);
    picker.appendChild(textColorSection);

    // Sección de color de fondo
    var bgColorSection = document.createElement('div');
    bgColorSection.className = 'mewyse-color-section';

    var bgColorLabel = document.createElement('div');
    bgColorLabel.className = 'mewyse-color-section-label';
    bgColorLabel.textContent = self.t('colors.backgroundColor');
    bgColorSection.appendChild(bgColorLabel);

    var bgColorGrid = document.createElement('div');
    bgColorGrid.className = 'mewyse-color-grid';

    colors.forEach(function(color) {
      var colorBtn = document.createElement('button');
      colorBtn.className = 'mewyse-color-button';
      colorBtn.style.backgroundColor = color;
      colorBtn.title = color;

      // Añadir borde para color blanco
      if (color === '#FFFFFF') {
        colorBtn.style.border = '2px solid #ddd';
      }

      colorBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.applyBackgroundColor(color);
        self.triggerChange();
        closePicker();
      };

      bgColorGrid.appendChild(colorBtn);
    });

    // Botón para remover color de fondo
    var removeBgBtn = document.createElement('button');
    removeBgBtn.className = 'mewyse-color-button mewyse-color-remove';
    removeBgBtn.innerHTML = WYSIWYG_ICONS.close;
    removeBgBtn.title = self.t('colors.removeBackgroundColor');
    removeBgBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.removeBackgroundColor();
      self.triggerChange();
      closePicker();
    };
    bgColorGrid.appendChild(removeBgBtn);

    bgColorSection.appendChild(bgColorGrid);
    picker.appendChild(bgColorSection);

    document.body.appendChild(picker);

    // Función para posicionar el picker
    var positionPicker = function() {
      var rect = button.getBoundingClientRect();
      var pickerRect = picker.getBoundingClientRect();

      var top = rect.bottom + 5;
      var left = rect.left;

      // Ajustar si se sale por la derecha del viewport
      if (left + pickerRect.width > window.innerWidth) {
        left = window.innerWidth - pickerRect.width - 10;
      }

      // Ajustar si se sale por la izquierda del viewport
      if (left < 10) {
        left = 10;
      }

      // Ajustar si se sale por abajo del viewport
      if (top + pickerRect.height > window.innerHeight) {
        top = rect.top - pickerRect.height - 5;
      }

      // Si tampoco cabe arriba, colocarlo en la parte superior visible
      if (top < 10) {
        top = 10;
      }

      picker.style.position = 'fixed';
      picker.style.top = top + 'px';
      picker.style.left = left + 'px';
    };

    // Posicionar inicialmente
    positionPicker();

    // Reposicionar durante el scroll
    var scrollHandler = function() {
      positionPicker();
    };
    window.addEventListener('scroll', scrollHandler, true);
    window.addEventListener('resize', scrollHandler);

    // Función para cerrar el picker
    var closePicker = function() {
      if (picker.parentNode) picker.remove();
      window.removeEventListener('scroll', scrollHandler, true);
      window.removeEventListener('resize', scrollHandler);
      self._remove_doc_click(clickHandler);
      self._closeColorPicker = null;
      self._hideBackdrop('colorPicker');
    };
    // Exponer el cleanup en la instancia para que otras vías de cierre
    // (closeFormatMenu, destroy) lo invoquen y no dejen listeners colgando.
    this._closeColorPicker = closePicker;

    // Cerrar al hacer clic fuera
    var clickHandler = function(e) {
      if (!picker.contains(e.target) && !button.contains(e.target)) {
        closePicker();
      }
    };

    // Registrado vía _add_doc_click para que destroy() lo barra si hiciera falta.
    setTimeout(function() {
      self._add_doc_click(clickHandler);
    }, 10);

    // Evitar que se cierre al hacer clic en el picker
    picker.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });

    this._showBackdrop('colorPicker', closePicker);
  };

  /**
   * Crea un enlace
   */
  meWYSE.prototype.createLink = function() {
    var self = this;

    // Guardar la selección actual antes de abrir el modal
    var selection = window.getSelection();
    var savedRange = null;
    if (selection.rangeCount > 0) {
      savedRange = selection.getRangeAt(0).cloneRange();
    }

    // Obtener el texto seleccionado
    var selectedText = selection.toString();

    // Verificar si ya hay un enlace seleccionado para editar
    var existingLink = null;
    var existingUrl = '';
    if (selection.anchorNode) {
      var parentElement = selection.anchorNode.parentElement;
      if (parentElement && parentElement.tagName === 'A') {
        existingLink = parentElement;
        existingUrl = parentElement.getAttribute('href') || '';
      }
    }

    // Crear el modal
    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';

    var container = document.createElement('div');
    container.className = 'mewyse-modal-container';
    self._applyMenuTheme(container); // dark mode si el editor está en oscuro

    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = existingLink ? self.t('modals.editLink') : self.t('modals.insertLink');
    container.appendChild(title);

    // Campo de URL
    var urlGroup = document.createElement('div');
    urlGroup.className = 'mewyse-modal-input-group';
    urlGroup.style.marginBottom = '16px';

    var urlLabel = document.createElement('label');
    urlLabel.textContent = self.t('modals.url');
    urlGroup.appendChild(urlLabel);

    var urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'mewyse-modal-input';
    urlInput.placeholder = self.t('placeholders.urlExample');
    urlInput.value = existingUrl;
    urlGroup.appendChild(urlInput);

    container.appendChild(urlGroup);

    // Campo de texto (opcional)
    var textGroup = document.createElement('div');
    textGroup.className = 'mewyse-modal-input-group';
    textGroup.style.marginBottom = '16px';

    var textLabel = document.createElement('label');
    textLabel.textContent = self.t('modals.linkText');
    textGroup.appendChild(textLabel);

    var textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'mewyse-modal-input';
    textInput.placeholder = self.t('placeholders.linkTextPlaceholder');
    textInput.value = selectedText || (existingLink ? existingLink.textContent : '');
    textGroup.appendChild(textInput);

    container.appendChild(textGroup);

    // Checkbox para abrir en nueva pestaña
    var checkboxGroup = document.createElement('div');
    checkboxGroup.className = 'mewyse-modal-checkbox-group';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'mewyse-link-new-tab';
    if (existingLink && existingLink.getAttribute('target') === '_blank') {
      checkbox.checked = true;
    }

    var checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', 'mewyse-link-new-tab');
    checkboxLabel.textContent = self.t('modals.openInNewTab');

    checkboxGroup.appendChild(checkbox);
    checkboxGroup.appendChild(checkboxLabel);
    container.appendChild(checkboxGroup);

    // Botones
    var buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'mewyse-modal-buttons';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelBtn.textContent = self.t('modals.cancel');

    // Botón "Quitar enlace": solo al editar un enlace existente. Desenvuelve el
    // <a> conservando su texto (antes no había forma de eliminar un enlace).
    var removeBtn = null;
    if (existingLink) {
      removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'mewyse-modal-button mewyse-modal-button-danger';
      removeBtn.textContent = self.t('modals.removeLink');
    }

    var submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.className = 'mewyse-modal-button mewyse-modal-button-primary';
    submitBtn.textContent = existingLink ? self.t('modals.update') : self.t('modals.insert');

    if (removeBtn) buttonsDiv.appendChild(removeBtn);
    buttonsDiv.appendChild(cancelBtn);
    buttonsDiv.appendChild(submitBtn);
    container.appendChild(buttonsDiv);

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Focus en el campo URL
    setTimeout(function() {
      urlInput.focus();
      urlInput.select();
    }, 50);

    // Función para cerrar el modal
    function closeModal() {
      overlay.remove();
    }

    // Función para restaurar la selección
    function restoreSelection() {
      if (savedRange) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedRange);
      }
    }

    // Función para insertar el enlace
    function insertLink() {
      var url = urlInput.value.trim();
      if (!url) {
        urlInput.focus();
        return;
      }

      // Añadir protocolo si no tiene
      if (!/^https?:\/\//i.test(url) && !/^mailto:/i.test(url)) {
        url = 'https://' + url;
      }

      var linkText = textInput.value.trim();
      var openInNewTab = checkbox.checked;

      closeModal();

      // Restaurar la selección
      restoreSelection();

      if (existingLink) {
        // Editar enlace existente
        existingLink.setAttribute('href', url);
        if (linkText) {
          existingLink.textContent = linkText;
        }
        if (openInNewTab) {
          existingLink.setAttribute('target', '_blank');
          existingLink.setAttribute('rel', 'noopener noreferrer');
        } else {
          existingLink.removeAttribute('target');
          existingLink.removeAttribute('rel');
        }
      } else {
        // Crear nuevo enlace
        if (linkText && !selectedText) {
          // No hay texto seleccionado, insertar el texto del enlace
          var link = document.createElement('a');
          link.href = url;
          link.textContent = linkText;
          if (openInNewTab) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
          }

          if (savedRange) {
            savedRange.deleteContents();
            savedRange.insertNode(link);
            // Mover cursor después del enlace
            var newRange = document.createRange();
            newRange.setStartAfter(link);
            newRange.collapse(true);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(newRange);
          }
        } else {
          // Hay texto seleccionado, usar execCommand
          document.execCommand('createLink', false, url);

          // Aplicar atributos adicionales al enlace creado
          var sel = window.getSelection();
          if (sel.anchorNode) {
            var newLink = sel.anchorNode.parentElement;
            if (newLink && newLink.tagName === 'A') {
              if (openInNewTab) {
                newLink.setAttribute('target', '_blank');
                newLink.setAttribute('rel', 'noopener noreferrer');
              }
              if (linkText) {
                newLink.textContent = linkText;
              }
            }
          }
        }
      }

      // La creación/edición del enlace muta el DOM (execCommand/insertNode/
      // setAttribute); persistir el HTML al modelo (además dispara triggerChange).
      if (!self._persistActiveBlockContent()) self.triggerChange();
    }

    // Función para quitar el enlace (desenvolver el <a> conservando el texto)
    function removeLink() {
      closeModal();
      restoreSelection();
      if (existingLink && existingLink.parentNode) {
        var v_parent = existingLink.parentNode;
        // Dejar el cursor en el texto que queda tras desenvolver, para que
        // _persistActiveBlockContent localice el bloque afectado.
        self.unwrapElement(existingLink);
        v_parent.normalize();
        var v_sel = window.getSelection();
        var v_range = document.createRange();
        v_range.selectNodeContents(v_parent);
        v_range.collapse(false);
        v_sel.removeAllRanges();
        v_sel.addRange(v_range);
      }
      if (!self._persistActiveBlockContent()) self.triggerChange();
    }

    // Event listeners
    cancelBtn.addEventListener('click', function() {
      closeModal();
      restoreSelection();
    });

    if (removeBtn) removeBtn.addEventListener('click', removeLink);

    submitBtn.addEventListener('click', insertLink);

    // Enter para enviar
    urlInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        insertLink();
      }
      if (e.key === 'Escape') {
        closeModal();
        restoreSelection();
      }
    });

    textInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        insertLink();
      }
      if (e.key === 'Escape') {
        closeModal();
        restoreSelection();
      }
    });

    // Clic fuera del modal para cerrar
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeModal();
        restoreSelection();
      }
    });
  };

  /**
   * Alterna el texto seleccionado entre mayúsculas y minúsculas
   */
  meWYSE.prototype.toggleSelectionCase = function() {
    // Mantener compatibilidad: toggle binario (smart: si tiene alguna minúscula → UPPER, si no → lower)
    this.applyCaseTransform('smart');
  };

  /**
   * Helpers puros de transformación de texto por modo.
   * Usados por applyCaseTransform para normal y cross-block selection.
   */
  // Tipos de bloque a los que aplica la alineación a nivel de bloque (texto).
  // Imágenes/tablas/media usan su propio mecanismo (advanced.alignment / tableStyle).
  var TEXT_ALIGN_BLOCK_TYPES = {
    paragraph: 1, heading1: 1, heading2: 1, heading3: 1, quote: 1,
    code: 1, bulletList: 1, numberList: 1, checklist: 1
  };

  // Bloques de TEXTO que admiten sangría de párrafo (margin-inline-start via
  // block.indent). NO incluye listas (usan indentLevel para el anidado real) ni
  // code/imagen/tabla. La sangría es independiente de la alineación.
  var INDENTABLE_TEXT_BLOCK_TYPES = {
    paragraph: 1, heading1: 1, heading2: 1, heading3: 1, quote: 1
  };
  var INDENT_STEP_PX = 40; // px de sangría por nivel
  var INDENT_MAX = 10;     // niveles máximos de sangría de párrafo

  // Nombre del icono (en WYSIWYG_ICONS) por valor de alineación. Lo usa el botón
  // único de alineación (dropdown) para pintar el icono del valor ACTUAL del
  // bloque, de modo que se identifique de un vistazo.
  var ALIGN_ICONS = {
    left: 'alignLeft', center: 'alignCenter', right: 'alignRight', justify: 'alignJustify'
  };

  // Escala de tamaños de fuente (px) que recorre el stepper [−]/[+].
  var FONT_SIZE_SCALE = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72, 96];

  // Toolbar declarativa (estilo TinyMCE). La opción `toolbar` acepta:
  //   true            → esta lista por defecto (todos los ítems)
  //   'a b | c d'     → string: ítems por espacios, `|` separa grupos
  //   ['fila1','fila2'] → array de strings: una fila cada uno
  //   false           → sin toolbar
  // Los nombres de ítem los construye _buildToolbarItem().
  var DEFAULT_TOOLBAR =
    'undo redo | blocktype fontsize | ' +
    'bold italic underline strikethrough | align outdent indent |' +
    'link forecolor table image video audio | ' +
    'font lineheight specialchars mergetags subscript superscript case pagebreak removeformat | ' +
    'find wordwrap summary showblocks sourcecode markdown print| moveup movedown | fullscreen';

  // Ítems de toolbar que DEPENDEN de una selección de texto para aplicarse.
  // Según la opción `selectionTools`:
  //  - 'floating' (default): NO se pintan en la toolbar; van al menú flotante de formato.
  //  - 'toolbar': se pintan pero deshabilitados hasta que hay selección no colapsada.
  // NO están aquí (a propósito):
  //  - bold/italic/underline/strikethrough: son "toggles de escritura" (funcionan
  //    con solo el caret, activando el formato para lo que se escriba después) →
  //    siempre en la toolbar y siempre habilitados, como en TinyMCE/Word/Docs.
  //  - align: aplica al bloque aunque no haya selección.
  var SELECTION_TOOL_NAMES = {
    subscript: 1, superscript: 1, case: 1, removeformat: 1,
    link: 1, forecolor: 1, font: 1, fontsize: 1
  };

  // Nombres PÚBLICOS de las acciones estándar (= ítems de la toolbar). Son los
  // nombres que se usan en `disabledActions`, como `name` de un override en
  // `actions`, y como ancla (`position.after/before`) de las acciones custom.
  // Todas pasan por _runAction → _runDefaultAction (toolbar, menú flotante y
  // atajos comparten así una única implementación por acción).
  var STANDARD_ACTION_NAMES = {
    undo: 1, redo: 1, blocktype: 1, fontsize: 1,
    bold: 1, italic: 1, underline: 1, strikethrough: 1, subscript: 1, superscript: 1,
    'case': 1, removeformat: 1, link: 1, forecolor: 1, font: 1, lineheight: 1,
    specialchars: 1, mergetags: 1, align: 1, outdent: 1, indent: 1,
    table: 1, image: 1, video: 1, audio: 1, pagebreak: 1,
    find: 1, wordwrap: 1, summary: 1, showblocks: 1, sourcecode: 1, markdown: 1,
    fullscreen: 1, print: 1, exportword: 1, exportpdf: 1, moveup: 1, movedown: 1
  };

  // Config de los botones de formato inline (comando execCommand o wrap de tag).
  var TOOLBAR_FORMAT_TOOLS = {
    bold:          { labelKey: 'tooltips.bold',          icon: '<strong>B</strong>', command: 'bold' },
    italic:        { labelKey: 'tooltips.italic',        icon: '<em>I</em>',         command: 'italic' },
    underline:     { labelKey: 'tooltips.underline',     icon: '<u>U</u>',           command: 'underline' },
    strikethrough: { labelKey: 'tooltips.strikethrough', icon: '<s>S</s>',           command: 'strikeThrough' },
    subscript:     { labelKey: 'tooltips.subscript',     iconName: 'subscript',      type: 'wrapTag', tag: 'sub' },
    superscript:   { labelKey: 'tooltips.superscript',   iconName: 'superscript',    type: 'wrapTag', tag: 'sup' }
  };

  var CASE_TRANSFORMERS = {
    'upper': function(s) { return s.toUpperCase(); },
    'lower': function(s) { return s.toLowerCase(); },
    'title': function(s) {
      // Primera letra de cada palabra en mayúscula, resto en minúscula
      return s.toLowerCase().replace(/\b([a-záéíóúñü])/gi, function(m) {
        return m.toUpperCase();
      });
    },
    'sentence': function(s) {
      // Primera letra de cada oración en mayúscula (inicio y tras . ? !)
      var lowered = s.toLowerCase();
      return lowered.replace(/(^|[.?!]\s+)([a-záéíóúñü])/g, function(m, prefix, letter) {
        return prefix + letter.toUpperCase();
      });
    },
    'toggle': function(s) {
      // Invierte case letra por letra
      var out = '';
      for (var i = 0; i < s.length; i++) {
        var ch = s.charAt(i);
        var up = ch.toUpperCase();
        var lo = ch.toLowerCase();
        out += (ch === up && ch !== lo) ? lo : up;
      }
      return out;
    },
    'smart': function(s) {
      // Comportamiento legacy: UPPER si tiene minúsculas, si no LOWER
      return s !== s.toUpperCase() ? s.toUpperCase() : s.toLowerCase();
    }
  };

  /**
   * Aplica una transformación de caso al texto seleccionado.
   * @param {string} mode - 'upper' | 'lower' | 'title' | 'sentence' | 'toggle' | 'smart'
   */
  meWYSE.prototype.applyCaseTransform = function(mode) {
    var transformer = CASE_TRANSFORMERS[mode];
    if (!transformer) return;

    // Selección por bloques enteros (Ctrl/Shift+clic): transformar todo el texto
    // de cada bloque preservando su HTML interno (solo los nodos de texto).
    if (this.selectedBlocks && this.selectedBlocks.length > 0) {
      this.pushHistory(true);
      for (var k = 0; k < this.selectedBlocks.length; k++) {
        var v_blk = this.getBlock(this.selectedBlocks[k]);
        if (!v_blk || typeof v_blk.content !== 'string') continue;
        v_blk.content = this._transformTextNodesHtml(v_blk.content, transformer);
      }
      this.render();
      this._reapplyBlockSelectionVisuals();
      this.triggerChange();
      return;
    }

    // Cross-block selection: aplicar bloque por bloque
    if (this.crossBlockSelection) {
      var sel = this.crossBlockSelection;
      this.pushHistory(true);
      for (var j = 0; j < sel.blockIds.length; j++) {
        var blockId = sel.blockIds[j];
        var range2 = this.getRangeForBlock(blockId, sel);
        if (!range2) continue;
        var text = range2.toString();
        if (!text) continue;
        range2.deleteContents();
        range2.insertNode(document.createTextNode(transformer(text)));
        // La mutación es solo DOM: persistir el HTML del editable al modelo,
        // igual que _applyInlineAcrossSelection (si no, se pierde al re-render).
        var v_block_el = this.getBlockElementById(blockId);
        var v_editable = v_block_el ? this.getEditableElement(v_block_el) : null;
        var v_block = this.getBlock(blockId);
        if (v_editable && v_block) v_block.content = v_editable.innerHTML;
      }
      this.clearCrossBlockSelection();
      this.closeFormatMenu();
      this.triggerChange();
      return;
    }

    // Selección normal en un bloque
    var selection = window.getSelection();
    if (!selection.rangeCount) return;
    var range = selection.getRangeAt(0);
    var selectedText = range.toString();
    if (!selectedText) return;

    this.pushHistory(true);
    range.deleteContents();
    var textNode = document.createTextNode(transformer(selectedText));
    range.insertNode(textNode);

    var newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    selection.removeAllRanges();
    selection.addRange(newRange);

    // La transformación es solo DOM: persistir el cambio al modelo.
    if (!this._persistActiveBlockContent()) this.triggerChange();
  };

  /**
   * Envuelve la selección actual en un tag inline simple (ej: <code>).
   * Si ya está envuelta en ese tag, lo desenvuelve (toggle).
   */
  meWYSE.prototype._wrapSelectionInTag = function(tagName) {
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    var range = selection.getRangeAt(0);
    if (range.collapsed) return;

    // Detectar si la selección ya está dentro de este tag → desenvolver (toggle)
    var anchorNode = selection.anchorNode;
    var ancestor = anchorNode && anchorNode.nodeType === 1 ? anchorNode : (anchorNode && anchorNode.parentNode);
    while (ancestor && ancestor.tagName) {
      if (ancestor.tagName.toLowerCase() === tagName.toLowerCase()) {
        // Desenvolver: mover hijos al padre
        var parent = ancestor.parentNode;
        while (ancestor.firstChild) parent.insertBefore(ancestor.firstChild, ancestor);
        parent.removeChild(ancestor);
        parent.normalize();
        return;
      }
      ancestor = ancestor.parentNode;
    }

    // Envolver: extraer contents y meterlos en el nuevo tag
    try {
      var wrapper = document.createElement(tagName);
      wrapper.appendChild(range.extractContents());
      range.insertNode(wrapper);
      // Restaurar selección sobre el nuevo tag
      var newRange = document.createRange();
      newRange.selectNodeContents(wrapper);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } catch (e) {}
  };

  /**
   * Autoformato inline: al pulsar espacio, si el texto justo antes del caret cierra
   * un patrón Markdown (**negrita**, *cursiva*, `código`, ~~tachado~~), lo envuelve
   * en el tag correspondiente e inserta el espacio detrás. Muta el DOM in situ (no
   * re-render) para preservar el caret. Devuelve true si transformó.
   * @param {HTMLElement} element - editable del bloque
   * @param {number} blockId
   * @returns {boolean}
   */
  meWYSE.prototype._tryInlineAutoformat = function(element, blockId) {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return false;
    var range = sel.getRangeAt(0);
    if (!range.collapsed) return false;
    var node = range.startContainer;
    if (!node || node.nodeType !== 3) return false; // solo dentro de un nodo de texto
    var offset = range.startOffset;
    var before = node.textContent.slice(0, offset);

    // Reglas (el contenido no puede empezar/terminar en espacio, salvo `código`).
    // Bold antes que italic para que **x** no dispare la regla de un solo *.
    var rules = [
      { re: /\*\*(\S|\S[^*]*\S)\*\*$/, tag: 'b' },
      { re: /~~(\S|\S[^~]*\S)~~$/, tag: 's' },
      { re: /`([^`]+)`$/, tag: 'code' },
      { re: /\*(\S|\S[^*]*\S)\*$/, tag: 'i' }
    ];
    var matched = null, tag = null;
    for (var i = 0; i < rules.length; i++) {
      var m = before.match(rules[i].re);
      if (m) { matched = m; tag = rules[i].tag; break; }
    }
    if (!matched) return false;

    var full = matched[0];        // p.ej. "**hola**"
    var innerText = matched[1];   // "hola"
    var startOffset = offset - full.length;
    if (startOffset < 0) return false;

    this.pushHistory(true); // undo atómico de la transformación

    try {
      var repl = document.createRange();
      repl.setStart(node, startOffset);
      repl.setEnd(node, offset);
      repl.deleteContents();
      var wrap = document.createElement(tag);
      wrap.textContent = innerText;
      repl.insertNode(wrap);
      // Insertar el espacio (el keydown se preventDefault en el caller) tras el tag.
      var spaceNode = document.createTextNode(' ');
      wrap.parentNode.insertBefore(spaceNode, wrap.nextSibling);
      var nr = document.createRange();
      nr.setStartAfter(spaceNode);
      nr.collapse(true);
      sel.removeAllRanges();
      sel.addRange(nr);
    } catch (e) { return false; }

    this.updateBlockContent(blockId, element.innerHTML);
    this.triggerChange();
    return true;
  };

  /**
   * Muestra el dropdown de opciones de caso (UPPER/lower/Title/Sentence/Toggle).
   * Anclado al botón "Aa" del toolbar o del format menu.
   */
  meWYSE.prototype.showCaseMenu = function(button) {
    var self = this;
    // Si ya hay uno abierto, cerrarlo (toggle)
    if (this._caseMenu && this._caseMenu.parentNode) {
      this._caseMenu.remove();
      this._caseMenu = null;
      return;
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu';
    menu.setAttribute('role', 'menu');

    var options = [
      { mode: 'upper',    label: this.t('tooltips.caseUpper'),    sample: 'AA' },
      { mode: 'lower',    label: this.t('tooltips.caseLower'),    sample: 'aa' },
      { mode: 'title',    label: this.t('tooltips.caseTitle'),    sample: 'Aa' },
      { mode: 'sentence', label: this.t('tooltips.caseSentence'), sample: 'A.' },
      { mode: 'toggle',   label: this.t('tooltips.caseToggle'),   sample: 'aA' }
    ];

    var v_case_click_handler = null;
    var closeCaseMenu = function() {
      if (self._caseMenu && self._caseMenu.parentNode) {
        self._caseMenu.remove();
      }
      self._caseMenu = null;
      if (v_case_click_handler) {
        self._remove_doc_click(v_case_click_handler);
        v_case_click_handler = null;
      }
      self._hideBackdrop('caseMenu');
    };

    options.forEach(function(opt) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item';
      item.setAttribute('role', 'menuitem');
      item.innerHTML = '<span class="icon" style="font-family: var(--mewyse-font-mono, monospace); font-weight: 600; font-size: 12px">' + opt.sample + '</span> ' + opt.label;
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Guardar selección antes de perder foco por el click
        self.applyCaseTransform(opt.mode);
        closeCaseMenu();
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this._caseMenu = menu;
    this.anchorMenu(menu, button, { offsetY: 5 });

    // Cerrar al hacer click fuera (registrado vía _add_doc_click para que
    // closeCaseMenu/destroy puedan retirarlo aunque no llegue a dispararse).
    setTimeout(function() {
      v_case_click_handler = function(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
          closeCaseMenu();
        }
      };
      self._add_doc_click(v_case_click_handler);
    }, 0);

    this._showBackdrop('caseMenu', closeCaseMenu);
  };

  // =========================================================================
  // TOOLTIPS DE LA TOOLBAR (propios, sustituyen al nativo del navegador)
  // =========================================================================

  /**
   * Adjunta el sistema de tooltips a un contenedor por DELEGACIÓN (toolbar y/o
   * menú flotante de formato). Los handlers son COMPARTIDOS entre contenedores
   * (se crean una sola vez) y usan `e.currentTarget` como contenedor de
   * referencia. Al posicionar el cursor sobre un botón/select se muestra su texto
   * (title/aria-label) tras 350 ms; migra `title` -> `data-mewyse-tip` en el
   * primer hover para suprimir el tooltip nativo (el aria-label se conserva).
   * @param {HTMLElement} containerEl
   */
  meWYSE.prototype._attachTooltips = function(containerEl) {
    var self = this;
    if (!containerEl) return;
    if (!this._tooltipContainers) this._tooltipContainers = [];
    if (this._tooltipContainers.indexOf(containerEl) !== -1) return; // ya adjunto

    // Crear los handlers UNA sola vez; se reutilizan para todos los contenedores.
    if (!this._tooltipMouseOver) {
      // Elemento "tooltipeable" (botón/select) del evento, dentro del contenedor
      // que disparó el listener (e.currentTarget).
      var v_resolve = function(e) {
        var el = e.target;
        if (!el || !el.closest) return null;
        var v_btn = el.closest('button, select');
        return (v_btn && e.currentTarget.contains(v_btn)) ? v_btn : null;
      };

      this._tooltipMouseOver = function(e) {
        var v_target = v_resolve(e);
        if (!v_target) return;
        // Ya mostrándose sobre el mismo elemento: no reprogramar.
        if (self._toolbarTooltipTarget === v_target && self._toolbarTooltip &&
            self._toolbarTooltip.classList.contains('mewyse-tooltip-visible')) {
          return;
        }
        // Migrar title -> data-mewyse-tip (suprime el nativo). Si el title cambió
        // (botones con texto dinámico, p. ej. alineación), re-migrar.
        var v_title = v_target.getAttribute('title');
        if (v_title) {
          v_target.setAttribute('data-mewyse-tip', v_title);
          v_target.removeAttribute('title');
        }
        var v_text = v_target.getAttribute('data-mewyse-tip') || v_target.getAttribute('aria-label');
        if (!v_text) return;

        self._toolbarTooltipTarget = v_target;
        if (self._toolbarTooltipTimer) clearTimeout(self._toolbarTooltipTimer);
        self._toolbarTooltipTimer = setTimeout(function() {
          self._showToolbarTooltip(v_target, v_text);
        }, 350);
      };

      this._tooltipMouseOut = function(e) {
        var el = e.target;
        var v_btn = (el && el.closest) ? el.closest('button, select') : null;
        if (!v_btn) return;
        // Si el cursor pasa a un elemento hijo del mismo botón, no ocultar.
        var v_to = e.relatedTarget;
        if (v_to && v_btn.contains(v_to)) return;
        self._hideToolbarTooltip();
      };

      // Ocultar de inmediato al pulsar (se va a ejecutar una acción / abrir menú)
      // o al desplazar el contenedor.
      this._tooltipHide = function() { self._hideToolbarTooltip(); };
    }

    containerEl.addEventListener('mouseover', this._tooltipMouseOver);
    containerEl.addEventListener('mouseout', this._tooltipMouseOut);
    containerEl.addEventListener('mousedown', this._tooltipHide, true);
    containerEl.addEventListener('scroll', this._tooltipHide, true);
    this._tooltipContainers.push(containerEl);
  };

  /**
   * Desadjunta los tooltips de un contenedor (usado con el menú flotante de
   * formato, que se recrea en cada selección). Retira sus listeners y lo saca de
   * la lista; si el tooltip visible pertenecía a él, lo oculta.
   * @param {HTMLElement} containerEl
   */
  meWYSE.prototype._detachTooltips = function(containerEl) {
    if (!containerEl || !this._tooltipContainers) return;
    var v_idx = this._tooltipContainers.indexOf(containerEl);
    if (v_idx === -1) return;
    containerEl.removeEventListener('mouseover', this._tooltipMouseOver);
    containerEl.removeEventListener('mouseout', this._tooltipMouseOut);
    containerEl.removeEventListener('mousedown', this._tooltipHide, true);
    containerEl.removeEventListener('scroll', this._tooltipHide, true);
    this._tooltipContainers.splice(v_idx, 1);
    if (this._toolbarTooltipTarget && containerEl.contains(this._toolbarTooltipTarget)) {
      this._hideToolbarTooltip();
    }
  };

  /**
   * Muestra el tooltip de la toolbar anclado al elemento con el texto dado.
   * @param {HTMLElement} target
   * @param {string} text
   */
  meWYSE.prototype._showToolbarTooltip = function(target, text) {
    if (!target || !document.body.contains(target)) return;
    // Crear el elemento una sola vez (reutilizable).
    if (!this._toolbarTooltip) {
      this._toolbarTooltip = document.createElement('div');
      this._toolbarTooltip.className = 'mewyse-toolbar-tooltip';
      this._toolbarTooltip.setAttribute('role', 'tooltip');
      document.body.appendChild(this._toolbarTooltip);
    }
    this._toolbarTooltip.textContent = text;
    // Tema (claro/oscuro) coherente con los menús flotantes.
    this._applyMenuTheme(this._toolbarTooltip);
    this._positionToolbarTooltip(target);
    this._toolbarTooltip.classList.add('mewyse-tooltip-visible');
  };

  /**
   * Posiciona el tooltip debajo del elemento (centrado), volteándolo encima si no
   * cabe, y ajustándolo a los límites del viewport.
   * @param {HTMLElement} target
   */
  meWYSE.prototype._positionToolbarTooltip = function(target) {
    var tip = this._toolbarTooltip;
    if (!tip) return;
    var v_rect = target.getBoundingClientRect();
    // Medir el tooltip (visibility hidden para no parpadear antes de colocarlo).
    tip.style.left = '0px';
    tip.style.top = '0px';
    var v_tw = tip.offsetWidth;
    var v_th = tip.offsetHeight;
    var v_gap = 8;
    var v_margin = 4;

    // Horizontal: centrado sobre el botón, clamp al viewport.
    var v_left = v_rect.left + (v_rect.width / 2) - (v_tw / 2);
    v_left = Math.max(v_margin, Math.min(v_left, window.innerWidth - v_tw - v_margin));

    // Vertical: debajo por defecto; encima si no cabe.
    var v_top = v_rect.bottom + v_gap;
    if (v_top + v_th > window.innerHeight - v_margin) {
      var v_above = v_rect.top - v_gap - v_th;
      if (v_above >= v_margin) v_top = v_above;
    }

    tip.style.left = Math.round(v_left) + 'px';
    tip.style.top = Math.round(v_top) + 'px';
  };

  /**
   * Oculta el tooltip de la toolbar y cancela el temporizador pendiente.
   */
  meWYSE.prototype._hideToolbarTooltip = function() {
    if (this._toolbarTooltipTimer) {
      clearTimeout(this._toolbarTooltipTimer);
      this._toolbarTooltipTimer = null;
    }
    this._toolbarTooltipTarget = null;
    if (this._toolbarTooltip) {
      this._toolbarTooltip.classList.remove('mewyse-tooltip-visible');
    }
  };

  // =========================================================================
  // ALINEACIÓN (botón único con menú desplegable)
  // =========================================================================

  /**
   * Devuelve la alineación EFECTIVA del bloque con foco: 'left'|'center'|'right'|
   * 'justify', o null si no hay bloque con foco o su tipo no admite alineación.
   * 'left' es el valor por defecto (no se almacena en el modelo).
   * @returns {?string}
   */
  /**
   * Bloque objetivo de la alineación. Una imagen suelta seleccionada tiene
   * prioridad (no genera caret de texto, así que _getFocusedBlockId podría
   * devolver el bloque de texto previo).
   * @returns {?number}
   */
  meWYSE.prototype._getAlignTargetBlockId = function() {
    if (this.selectedImage && this.selectedImage.blockId != null && !this.selectedImage.isInTable) {
      return this.selectedImage.blockId;
    }
    return this._getFocusedBlockId();
  };

  meWYSE.prototype._getCurrentAlignment = function() {
    var v_block_id = this._getAlignTargetBlockId();
    if (v_block_id === null) return null;
    var v_block = this.getBlock(v_block_id);
    if (!v_block) return null;
    // Imagen: la alineación vive en block.content.advanced.alignment (left/center/
    // right, sin justify). Default = left.
    if (v_block.type === 'image') {
      var v_adv = v_block.content && v_block.content.advanced;
      return (v_adv && typeof v_adv.alignment === 'string' && v_adv.alignment) ? v_adv.alignment : 'left';
    }
    if (!TEXT_ALIGN_BLOCK_TYPES[v_block.type]) return null;
    return (typeof v_block.alignment === 'string' && v_block.alignment) ? v_block.alignment : 'left';
  };

  /**
   * innerHTML del botón-dropdown de alineación: icono del valor dado + chevron.
   * @param {string} align - 'left'|'center'|'right'|'justify'
   * @returns {string}
   */
  meWYSE.prototype._alignButtonInnerHTML = function(align) {
    // Solo el icono del valor actual (sin flecha lateral): el botón ocupa el
    // ancho de un botón normal. Que abre un menú se indica vía aria-haspopup.
    return WYSIWYG_ICONS[ALIGN_ICONS[align]] || WYSIWYG_ICONS.alignLeft;
  };

  /**
   * Refresca el botón de alineación de la toolbar: pinta el icono del valor
   * actual del bloque con foco y lo deshabilita si el tipo no admite alineación.
   * Se invoca desde _updateMoveButtons (mismos disparadores de foco).
   */
  meWYSE.prototype._updateAlignButton = function() {
    if (!this.alignButton) return;
    var v_align = this._getCurrentAlignment(); // null si no soportado
    this.alignButton.disabled = (v_align === null);
    var v_effective = v_align || 'left';
    this.alignButton.innerHTML = this._alignButtonInnerHTML(v_effective);
    // El title informa del valor actual (el botón abre el menú de opciones).
    var v_label_key = (v_effective === 'justify') ? 'tooltips.justify'
      : (v_effective === 'center') ? 'tooltips.alignCenter'
      : (v_effective === 'right') ? 'tooltips.alignRight'
      : 'tooltips.alignLeft';
    var v_label = this.t(v_label_key);
    this.alignButton.title = v_label;
    this.alignButton.setAttribute('aria-label', v_label);
  };

  /**
   * Aplica una alineación al bloque con foco o a la selección múltiple, SIEMPRE
   * por el modelo (block.alignment) para que persista al re-render y el icono del
   * botón pueda reflejarla con fiabilidad.
   * @param {string} align - 'left'|'center'|'right'|'justify'
   */
  meWYSE.prototype._applyAlignment = function(align) {
    // 1) Multi-selección (bloques o cross-block): ya aplica por modelo.
    if (this.applyAlignmentToSelection(align)) {
      this._updateAlignButton();
      return;
    }

    // 2) Bloque objetivo (imagen suelta seleccionada o bloque con foco).
    var v_block_id = this._getAlignTargetBlockId();
    if (v_block_id === null) return;
    var v_block = this.getBlock(v_block_id);
    if (!v_block) return;

    // 2a) Imagen: la alineación va en block.content.advanced.alignment (left/
    // center/right; 'justify' no aplica → se trata como left). Tras el render la
    // imagen se vuelve a seleccionar para conservar selección + handle.
    if (v_block.type === 'image') {
      if (!v_block.content || typeof v_block.content !== 'object') return;
      this._suppressBlurUntil = Date.now() + 300;
      this.pushHistory(true);
      var v_align_img = (align === 'justify') ? 'left' : align;
      if (v_align_img === 'left') {
        if (v_block.content.advanced) delete v_block.content.advanced.alignment;
      } else {
        if (!v_block.content.advanced) v_block.content.advanced = {};
        v_block.content.advanced.alignment = v_align_img;
      }
      if (this.formatMenu) this.closeFormatMenu();
      this.render();
      this.triggerChange();
      var self_img = this;
      setTimeout(function() {
        var v_img = self_img.container.querySelector('[data-block-id="' + v_block_id + '"] .mewyse-image');
        if (v_img) self_img.selectImage(v_img, v_block_id);
        self_img._updateAlignButton();
      }, 0);
      return;
    }

    if (!TEXT_ALIGN_BLOCK_TYPES[v_block.type]) return;

    this.pushHistory(true);
    if (align === 'left') delete v_block.alignment; // 'left' = default, no ensuciar
    else v_block.alignment = align;

    // El menú flotante de formato (si estaba abierto) queda obsoleto.
    if (this.formatMenu) this.closeFormatMenu();

    // Render INCREMENTAL: la alineación es solo `text-align` en el elemento del
    // bloque. Se aplica DIRECTAMENTE al DOM existente (createBlockElement hace
    // lo mismo: element.style.textAlign). Sin render() → sin perder caret/foco,
    // sin flicker ni setTimeout de refoco. '' quita el estilo (= 'left' default).
    // Fallback a render() completo si por algún motivo no hay elemento.
    var v_el = this.getBlockElementById(v_block_id);
    if (v_el) {
      v_el.style.textAlign = v_block.alignment || '';
    } else {
      this._suppressBlurUntil = Date.now() + 300;
      this.render();
    }
    this.triggerChange();
    this._updateAlignButton();
  };

  /**
   * Muestra el menú desplegable de alineación (izquierda/centro/derecha/justificado)
   * anclado al botón. Marca el valor actual del bloque. Espeja showCaseMenu.
   * @param {HTMLElement} button - botón que ancla el menú
   */
  meWYSE.prototype.showAlignMenu = function(button) {
    var self = this;
    // Toggle: si ya está abierto, cerrar.
    if (this._alignMenu && this._alignMenu.parentNode) {
      this._alignMenu.remove();
      this._alignMenu = null;
      return;
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu';
    menu.setAttribute('role', 'menu');
    // No perder el caret/foco del bloque al clicar en el menú.
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });

    var v_current = this._getCurrentAlignment(); // puede ser null

    // ¿El bloque objetivo es una imagen? En ese caso no se ofrece "Justificar"
    // (no tiene sentido para una imagen).
    var v_target_id = this._getAlignTargetBlockId();
    var v_target_block = (v_target_id !== null) ? this.getBlock(v_target_id) : null;
    var v_is_image = !!(v_target_block && v_target_block.type === 'image');

    var options = [
      { align: 'left',    label: this.t('tooltips.alignLeft'),   icon: WYSIWYG_ICONS.alignLeft },
      { align: 'center',  label: this.t('tooltips.alignCenter'), icon: WYSIWYG_ICONS.alignCenter },
      { align: 'right',   label: this.t('tooltips.alignRight'),  icon: WYSIWYG_ICONS.alignRight }
    ];
    if (!v_is_image) {
      options.push({ align: 'justify', label: this.t('tooltips.justify'), icon: WYSIWYG_ICONS.alignJustify });
    }

    var v_align_click_handler = null;
    var closeAlignMenu = function() {
      if (self._alignMenu && self._alignMenu.parentNode) {
        self._alignMenu.remove();
      }
      self._alignMenu = null;
      if (v_align_click_handler) {
        self._remove_doc_click(v_align_click_handler);
        v_align_click_handler = null;
      }
      self._hideBackdrop('alignMenu');
    };

    options.forEach(function(opt) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item';
      item.setAttribute('role', 'menuitemradio');
      if (opt.align === v_current) item.classList.add('active');
      item.setAttribute('aria-checked', opt.align === v_current ? 'true' : 'false');
      item.innerHTML = '<span class="icon">' + opt.icon + '</span> ' + opt.label;
      item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self._applyAlignment(opt.align);
        closeAlignMenu();
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this._alignMenu = menu;
    this.anchorMenu(menu, button, { offsetY: 5 });

    setTimeout(function() {
      v_align_click_handler = function(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
          closeAlignMenu();
        }
      };
      self._add_doc_click(v_align_click_handler);
    }, 0);

    this._showBackdrop('alignMenu', closeAlignMenu);
  };

  /**
   * Aplica un estilo de fuente (fontFamily/fontSize/lineHeight) a la selección.
   * Reutiliza applyInlineStyle (spans inline) + _applyInlineAcrossSelection para
   * multi-bloque, y persiste al modelo. Para lineHeight expande la selección a
   * todo el bloque (una line-height sobre una selección parcial no tendría efecto).
   * @param {string} styleProp - 'fontFamily' | 'fontSize' | 'lineHeight'
   * @param {string} value
   * @param {boolean} wholeBlock
   */
  meWYSE.prototype._applyFontStyle = function(styleProp, value, wholeBlock) {
    var self = this;
    if (wholeBlock) {
      var sel = window.getSelection();
      if (sel && sel.rangeCount) {
        var node = sel.getRangeAt(0).commonAncestorContainer;
        var el = (node.nodeType === 1) ? node : node.parentElement;
        var blockEl = (el && el.closest) ? el.closest('.mewyse-block[data-block-id]') : null;
        var editable = blockEl ? self.getEditableElement(blockEl) : null;
        if (editable) {
          var r = document.createRange();
          r.selectNodeContents(editable);
          sel.removeAllRanges();
          sel.addRange(r);
        }
      }
    }
    if (self._applyInlineAcrossSelection(function() { self.applyInlineStyle(styleProp, value); })) return;
    self.applyInlineStyle(styleProp, value);
    self._persistActiveBlockContent();
  };

  /**
   * Tamaño de fuente (px, redondeado) en la posición del caret/selección, o null.
   * @returns {?number}
   */
  meWYSE.prototype._getCurrentFontSize = function() {
    if (!this.container) return null;
    var v_node = null;
    var sel = window.getSelection ? window.getSelection() : null;
    if (sel && sel.rangeCount) {
      v_node = sel.anchorNode;
      if (v_node && v_node.nodeType === 3) v_node = v_node.parentElement;
    }
    if (!v_node || !this.container.contains(v_node)) {
      // Fallback: el editable del bloque con foco.
      var v_bid = this._getFocusedBlockId();
      if (v_bid !== null) {
        var v_el = this.container.querySelector('[data-block-id="' + v_bid + '"]');
        v_node = v_el ? (this.getEditableElement(v_el) || v_el) : null;
      }
    }
    if (!v_node || v_node.nodeType !== 1 || !this.container.contains(v_node)) return null;
    var v_px = parseFloat(window.getComputedStyle(v_node).fontSize);
    return isNaN(v_px) ? null : Math.round(v_px);
  };

  /**
   * Refresca el valor mostrado en el stepper de tamaño de fuente (si existe).
   */
  meWYSE.prototype._updateFontSizeStepper = function() {
    if (!this._fontSizeDisplay) return;
    var v = this._getCurrentFontSize();
    this._fontSizeDisplay.textContent = (v != null) ? (v + 'px') : '—';
  };

  /**
   * Sube (dir>0) o baja (dir<0) el tamaño de fuente de la selección al siguiente
   * valor de FONT_SIZE_SCALE, y aplica el font-size inline.
   * @param {number} dir - +1 o -1
   */
  meWYSE.prototype._stepFontSize = function(dir) {
    var v_cur = this._getCurrentFontSize();
    if (v_cur == null) v_cur = 16;
    var v_next, i;
    if (dir > 0) {
      v_next = FONT_SIZE_SCALE[FONT_SIZE_SCALE.length - 1];
      for (i = 0; i < FONT_SIZE_SCALE.length; i++) {
        if (FONT_SIZE_SCALE[i] > v_cur) { v_next = FONT_SIZE_SCALE[i]; break; }
      }
    } else {
      v_next = FONT_SIZE_SCALE[0];
      for (i = FONT_SIZE_SCALE.length - 1; i >= 0; i--) {
        if (FONT_SIZE_SCALE[i] < v_cur) { v_next = FONT_SIZE_SCALE[i]; break; }
      }
    }
    this._applyFontStyle('fontSize', v_next + 'px', false);
    this._updateFontSizeStepper();
  };

  /**
   * Menú de fuente: familia, tamaño e interlineado. Anclado a un botón de la
   * toolbar (solo si `fontControls`). Las familias van SIN comillas (el sanitizer
   * las rechaza) y los valores son listas cerradas (evita font-size disparatados).
   */
  meWYSE.prototype.showFontMenu = function(button) {
    var self = this;
    if (this._fontMenu && this._fontMenu.parentNode) {
      this._fontMenu.remove(); this._fontMenu = null; return;
    }

    // Familias sin comillas ni nombres multi-palabra (compat con el sanitizer).
    var families = [
      { label: this.t('font.default'), value: 'inherit' },
      { label: 'Sans-serif', value: 'Arial, sans-serif' },
      { label: 'Serif', value: 'Georgia, serif' },
      { label: 'Monospace', value: 'Consolas, monospace' },
      { label: 'Verdana', value: 'Verdana, sans-serif' },
      { label: 'Tahoma', value: 'Tahoma, sans-serif' }
    ];
    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu mewyse-font-menu';
    menu.setAttribute('role', 'menu');
    // Preservar la selección del editor al interactuar (como el color picker).
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });

    var v_click_handler = null;
    var closeMenu = function() {
      if (self._fontMenu && self._fontMenu.parentNode) self._fontMenu.remove();
      self._fontMenu = null;
      if (v_click_handler) { self._remove_doc_click(v_click_handler); v_click_handler = null; }
      self._hideBackdrop('fontMenu');
    };

    var addLabel = function(text) {
      var l = document.createElement('div');
      l.className = 'mewyse-font-menu-label';
      l.textContent = text;
      menu.appendChild(l);
    };
    var addItem = function(text, onPick, styleAttr) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item';
      item.setAttribute('role', 'menuitem');
      item.textContent = text;
      if (styleAttr) item.setAttribute('style', styleAttr);
      item.onclick = function(e) {
        e.preventDefault(); e.stopPropagation();
        onPick();
        closeMenu();
      };
      menu.appendChild(item);
    };

    addLabel(this.t('font.family'));
    families.forEach(function(f) {
      addItem(f.label, function() { self._applyFontStyle('fontFamily', f.value, false); },
        f.value === 'inherit' ? null : 'font-family:' + f.value);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this._fontMenu = menu;
    this.anchorMenu(menu, button, { offsetY: 5 });

    setTimeout(function() {
      v_click_handler = function(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) closeMenu();
      };
      self._add_doc_click(v_click_handler);
    }, 0);
    this._showBackdrop('fontMenu', closeMenu);
  };

  // Valores de interlineado del menú (ratios).
  var LINE_HEIGHT_VALUES = ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '2'];

  /**
   * Quita el `line-height` inline de los spans de un editable (para no anidar
   * spans al re-aplicar). Desenvuelve el span si queda sin estilo ni clase.
   * @param {HTMLElement} editable
   */
  meWYSE.prototype._clearBlockLineHeight = function(editable) {
    if (!editable) return;
    var v_spans = editable.querySelectorAll('[style*="line-height"]');
    for (var i = 0; i < v_spans.length; i++) {
      var s = v_spans[i];
      s.style.lineHeight = '';
      if (s.tagName === 'SPAN' && !s.getAttribute('style') && !s.className && s.parentNode) {
        while (s.firstChild) s.parentNode.insertBefore(s.firstChild, s);
        s.parentNode.removeChild(s);
      }
    }
  };

  /**
   * Interlineado (line-height inline) EFECTIVO en el caret/selección: recorre
   * hacia arriba dentro del container buscando un `style.lineHeight` explícito.
   * @returns {?string} p. ej. '1.5', o null si no hay uno explícito.
   */
  meWYSE.prototype._getCurrentLineHeight = function() {
    if (!this.container) return null;
    var v_node = null;
    var sel = window.getSelection ? window.getSelection() : null;
    if (sel && sel.rangeCount) {
      v_node = sel.anchorNode;
      if (v_node && v_node.nodeType === 3) v_node = v_node.parentElement;
    }
    if (!v_node || !this.container.contains(v_node)) {
      var v_bid = this._getFocusedBlockId();
      if (v_bid !== null) {
        var v_el = this.container.querySelector('[data-block-id="' + v_bid + '"]');
        v_node = v_el ? (this.getEditableElement(v_el) || v_el) : null;
      }
    }
    // 1) Hacia arriba desde el caret (span con line-height que contiene el caret).
    var v_up = v_node;
    while (v_up && v_up !== this.container && v_up.nodeType === 1) {
      if (v_up.style && v_up.style.lineHeight) return v_up.style.lineHeight;
      v_up = v_up.parentElement;
    }
    // 2) Fallback: el line-height se aplica a TODO el bloque (wholeBlock), así que
    //    el span envolvente es un DESCENDIENTE del editable (no un ancestro del
    //    caret cuando la selección abarca todo). Buscarlo dentro del bloque.
    var v_bid = this._getFocusedBlockId();
    if (v_bid !== null) {
      var v_bel = this.container.querySelector('[data-block-id="' + v_bid + '"]');
      var v_ed = v_bel ? (this.getEditableElement(v_bel) || v_bel) : null;
      if (v_ed) {
        var v_styled = v_ed.querySelector('[style*="line-height"]');
        if (v_styled && v_styled.style && v_styled.style.lineHeight) return v_styled.style.lineHeight;
      }
    }
    return null;
  };

  /**
   * Menú desplegable de interlineado (ítem `lineheight`). Marca el valor actual
   * con un check y aplica el line-height a todo el bloque. Espeja showAlignMenu.
   * @param {HTMLElement} button
   */
  meWYSE.prototype.showLineHeightMenu = function(button) {
    var self = this;
    if (this._lineHeightMenu && this._lineHeightMenu.parentNode) {
      this._lineHeightMenu.remove(); this._lineHeightMenu = null; return;
    }

    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu';
    menu.setAttribute('role', 'menu');
    // No perder el caret/foco del bloque al clicar en el menú.
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });

    var v_current = this._getCurrentLineHeight(); // puede ser null

    var v_click_handler = null;
    var closeMenu = function() {
      if (self._lineHeightMenu && self._lineHeightMenu.parentNode) self._lineHeightMenu.remove();
      self._lineHeightMenu = null;
      if (v_click_handler) { self._remove_doc_click(v_click_handler); v_click_handler = null; }
      self._hideBackdrop('lineHeightMenu');
    };

    LINE_HEIGHT_VALUES.forEach(function(v) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item';
      item.setAttribute('role', 'menuitemradio');
      var v_active = (v === v_current);
      if (v_active) item.classList.add('active');
      item.setAttribute('aria-checked', v_active ? 'true' : 'false');
      // Etiqueta + check a la derecha para el valor activo.
      item.innerHTML = '<span>' + v + '</span>' +
        (v_active ? '<span class="mewyse-menu-check">' + (WYSIWYG_ICONS.check || '✓') + '</span>' : '');
      item.onclick = function(e) {
        e.preventDefault(); e.stopPropagation();
        // Quitar el line-height previo del bloque para no anidar spans.
        var v_bid = self._getFocusedBlockId();
        if (v_bid !== null) {
          var v_bel = self.container.querySelector('[data-block-id="' + v_bid + '"]');
          self._clearBlockLineHeight(v_bel ? (self.getEditableElement(v_bel) || v_bel) : null);
        }
        self._applyFontStyle('lineHeight', v, true);
        closeMenu();
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this._lineHeightMenu = menu;
    this.anchorMenu(menu, button, { offsetY: 5 });

    setTimeout(function() {
      v_click_handler = function(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) closeMenu();
      };
      self._add_doc_click(v_click_handler);
    }, 0);
    this._showBackdrop('lineHeightMenu', closeMenu);
  };

  /**
   * Modal de "ver/editar fuente": muestra el HTML (getHTMLSource) o el Markdown
   * (getMarkdown) del contenido en un textarea editable. Al Guardar, reimporta con
   * loadFromHTML / loadFromMarkdown (con historial → deshacible con Ctrl+Z). El
   * HTML editado pasa por el sanitizer al reimportar.
   * @param {string} mode - 'html' | 'markdown'
   */
  meWYSE.prototype._showCodeSourceModal = function(mode) {
    var self = this;
    var v_is_md = mode === 'markdown';
    var v_code = v_is_md ? this.getMarkdown() : this.getHTMLSource();

    // Estado del editor de código (independiente del tema del editor).
    var v_font = 13;          // px
    var v_wrap = false;       // salto de línea automático
    var v_dark = self._isDark();

    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';

    var container = document.createElement('div');
    container.className = 'mewyse-modal-container mewyse-code-modal';
    self._applyMenuTheme(container);

    // --- Cabecera: título + cerrar (×) ---
    var header = document.createElement('div');
    header.className = 'mewyse-code-header';
    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = self.t(v_is_md ? 'modals.markdownTitle' : 'modals.sourceCodeTitle');
    var closeX = document.createElement('button');
    closeX.type = 'button';
    closeX.className = 'mewyse-code-close';
    closeX.innerHTML = WYSIWYG_ICONS.close || '×';
    closeX.setAttribute('aria-label', self.t('modals.cancel'));
    header.appendChild(title);
    header.appendChild(closeX);
    container.appendChild(header);

    if (v_is_md) {
      var note = document.createElement('p');
      note.className = 'mewyse-modal-note';
      note.textContent = self.t('modals.markdownNote');
      container.appendChild(note);
    }

    // --- Área de edición: gutter de números + textarea (+ mirror oculto) ---
    var editorWrap = document.createElement('div');
    editorWrap.className = 'mewyse-code-editor';

    var gutter = document.createElement('div');
    gutter.className = 'mewyse-code-gutter';
    gutter.setAttribute('aria-hidden', 'true');

    var textarea = document.createElement('textarea');
    textarea.className = 'mewyse-code-textarea';
    textarea.value = v_code;
    textarea.spellcheck = false;
    textarea.wrap = 'off';
    textarea.setAttribute('aria-label', title.textContent);

    // Espejo oculto para medir la altura real de cada línea (respeta wrap/fuente),
    // así los números se alinean incluso con salto de línea automático.
    var mirror = document.createElement('div');
    mirror.className = 'mewyse-code-mirror';
    mirror.setAttribute('aria-hidden', 'true');

    editorWrap.appendChild(gutter);
    editorWrap.appendChild(textarea);
    editorWrap.appendChild(mirror);
    container.appendChild(editorWrap);

    var rebuildGutter = function() {
      var v_lines = textarea.value.split('\n');
      mirror.style.whiteSpace = v_wrap ? 'pre-wrap' : 'pre';
      mirror.style.width = textarea.clientWidth + 'px';
      var v_html = '';
      for (var i = 0; i < v_lines.length; i++) {
        mirror.textContent = v_lines[i].length ? v_lines[i] : ' ';
        v_html += '<div style="height:' + mirror.offsetHeight + 'px">' + (i + 1) + '</div>';
      }
      gutter.innerHTML = v_html;
      gutter.scrollTop = textarea.scrollTop;
    };
    var applyFont = function() {
      var v_lh = Math.round(v_font * 1.55) + 'px';
      textarea.style.fontSize = v_font + 'px'; textarea.style.lineHeight = v_lh;
      gutter.style.fontSize = v_font + 'px'; gutter.style.lineHeight = v_lh;
      mirror.style.fontSize = v_font + 'px'; mirror.style.lineHeight = v_lh;
      rebuildGutter();
    };
    var applyWrap = function() {
      textarea.style.whiteSpace = v_wrap ? 'pre-wrap' : 'pre';
      textarea.wrap = v_wrap ? 'soft' : 'off';
      wrapBtn.classList.toggle('active', v_wrap);
      wrapBtn.setAttribute('aria-pressed', v_wrap ? 'true' : 'false');
      rebuildGutter();
    };
    var applyDark = function() {
      container.classList.toggle('mewyse-code-dark', v_dark);
    };

    // Sincronizar el scroll del gutter con el textarea; recalcular al editar.
    var v_rebuild_timer = null;
    textarea.addEventListener('scroll', function() { gutter.scrollTop = textarea.scrollTop; });
    textarea.addEventListener('input', function() {
      if (v_rebuild_timer) clearTimeout(v_rebuild_timer);
      v_rebuild_timer = setTimeout(rebuildGutter, 60);
    });

    // --- Pie: herramientas (izq) + Cancelar/Guardar (der) ---
    var footer = document.createElement('div');
    footer.className = 'mewyse-code-footer';

    var tools = document.createElement('div');
    tools.className = 'mewyse-code-tools';

    var mkTool = function(html, titleKey, onClick) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mewyse-code-tool-btn';
      b.innerHTML = html;
      b.title = self.t(titleKey);
      b.setAttribute('aria-label', self.t(titleKey));
      b.onclick = onClick;
      return b;
    };
    var themeBtn = mkTool(WYSIWYG_ICONS.contrast, 'tooltips.codeTheme', function() { v_dark = !v_dark; applyDark(); });
    var fontDecBtn = mkTool('A<span class="mewyse-code-sub">−</span>', 'tooltips.codeFontDec', function() { v_font = Math.max(10, v_font - 1); applyFont(); });
    var fontIncBtn = mkTool('A<span class="mewyse-code-sup">+</span>', 'tooltips.codeFontInc', function() { v_font = Math.min(24, v_font + 1); applyFont(); });
    var wrapBtn = mkTool(WYSIWYG_ICONS.wordWrap, 'tooltips.codeWrap', function() { v_wrap = !v_wrap; applyWrap(); });

    tools.appendChild(themeBtn);
    tools.appendChild(fontDecBtn);
    tools.appendChild(fontIncBtn);
    tools.appendChild(wrapBtn);

    var buttons = document.createElement('div');
    buttons.className = 'mewyse-modal-buttons';

    // Bloqueo de scroll de la página mientras el modal está abierto.
    document.body.classList.add('mewyse-scroll-lock');
    var close = function() {
      if (v_rebuild_timer) clearTimeout(v_rebuild_timer);
      document.body.classList.remove('mewyse-scroll-lock');
      if (overlay.parentNode) document.body.removeChild(overlay);
    };
    closeX.onclick = close;

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelBtn.textContent = self.t('modals.cancel');
    cancelBtn.onclick = close;

    var saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'mewyse-modal-button mewyse-modal-button-primary';
    saveBtn.textContent = self.t('modals.save');
    saveBtn.onclick = function() {
      var v_val = textarea.value;
      if (v_is_md) self.loadFromMarkdown(v_val);
      else self.loadFromHTML(v_val);
      close();
    };

    buttons.appendChild(cancelBtn);
    buttons.appendChild(saveBtn);
    footer.appendChild(tools);
    footer.appendChild(buttons);
    container.appendChild(footer);

    overlay.appendChild(container);
    document.body.appendChild(overlay);
    overlay.onclick = function(e) { if (e.target === overlay) close(); };

    // Estado inicial (el textarea ya está en el DOM → clientWidth disponible).
    applyDark();
    applyWrap();
    applyFont();
    setTimeout(function() { textarea.focus(); rebuildGutter(); }, 0);
  };

  /**
   * Picker de caracteres especiales. Inserta el símbolo como TEXTO (execCommand
   * insertText) → sin riesgo para el sanitizer. Anclado a un botón de la toolbar.
   */
  meWYSE.prototype.showSpecialCharsMenu = function(button) {
    var self = this;
    if (this._specialCharsMenu && this._specialCharsMenu.parentNode) {
      this._specialCharsMenu.remove(); this._specialCharsMenu = null; return;
    }

    var chars = ['©','®','™','§','¶','†','‡','•','…','«','»','“','”','‘','’',
                 '–','—','±','×','÷','≈','≠','≤','≥','½','¼','¾','°','µ','€',
                 '£','¥','¢','←','→','↑','↓','✓','✗','★'];

    var menu = document.createElement('div');
    menu.className = 'mewyse-special-chars-menu';
    menu.setAttribute('role', 'menu');
    // Guardar el range actual para restaurarlo antes de insertar.
    var v_saved = null;
    var v_sel0 = window.getSelection();
    if (v_sel0 && v_sel0.rangeCount) v_saved = v_sel0.getRangeAt(0).cloneRange();
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });

    var v_click_handler = null;
    var closeMenu = function() {
      if (self._specialCharsMenu && self._specialCharsMenu.parentNode) self._specialCharsMenu.remove();
      self._specialCharsMenu = null;
      if (v_click_handler) { self._remove_doc_click(v_click_handler); v_click_handler = null; }
      self._hideBackdrop('specialCharsMenu');
    };

    chars.forEach(function(ch) {
      var b = document.createElement('button');
      b.className = 'mewyse-special-char';
      b.textContent = ch;
      b.title = ch;
      b.onclick = function(e) {
        e.preventDefault(); e.stopPropagation();
        // Restaurar la selección y insertar el carácter como texto plano.
        if (v_saved) {
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(v_saved);
        }
        document.execCommand('insertText', false, ch);
        self._persistActiveBlockContent();
        closeMenu();
      };
      menu.appendChild(b);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this._specialCharsMenu = menu;
    this.anchorMenu(menu, button, { offsetY: 5 });

    setTimeout(function() {
      v_click_handler = function(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) closeMenu();
      };
      self._add_doc_click(v_click_handler);
    }, 0);
    this._showBackdrop('specialCharsMenu', closeMenu);
  };

  /**
   * Menú de variante del bloque callout (info/warning/success/danger). Cambia
   * block.calloutVariant y re-renderiza el bloque.
   */
  meWYSE.prototype.showCalloutVariantMenu = function(blockId, button) {
    var self = this;
    if (this._calloutMenu && this._calloutMenu.parentNode) {
      this._calloutMenu.remove(); this._calloutMenu = null; return;
    }
    var variants = ['info', 'warning', 'success', 'danger'];

    var menu = document.createElement('div');
    menu.className = 'mewyse-options-menu mewyse-callout-menu';
    menu.setAttribute('role', 'menu');
    menu.addEventListener('mousedown', function(e) { e.preventDefault(); });

    var v_click_handler = null;
    var closeMenu = function() {
      if (self._calloutMenu && self._calloutMenu.parentNode) self._calloutMenu.remove();
      self._calloutMenu = null;
      if (v_click_handler) { self._remove_doc_click(v_click_handler); v_click_handler = null; }
      self._hideBackdrop('calloutMenu');
    };

    variants.forEach(function(v) {
      var item = document.createElement('div');
      item.className = 'mewyse-options-menu-item';
      item.setAttribute('role', 'menuitem');
      item.innerHTML = '<span class="mewyse-callout-swatch mewyse-callout-' + v + '"></span> ' + self.t('callout.' + v);
      item.onclick = function(e) {
        e.preventDefault(); e.stopPropagation();
        var blk = self.getBlock(blockId);
        if (blk && blk.type === 'callout') {
          blk.calloutVariant = v;
          self._suppressBlurUntil = Date.now() + 300;
          self.render(blockId);
          self.triggerChange();
        }
        closeMenu();
      };
      menu.appendChild(item);
    });

    self._applyMenuTheme(menu);
    document.body.appendChild(menu);
    this._calloutMenu = menu;
    this.anchorMenu(menu, button, { offsetY: 5 });

    setTimeout(function() {
      v_click_handler = function(e) {
        if (!menu.contains(e.target) && !button.contains(e.target)) closeMenu();
      };
      self._add_doc_click(v_click_handler);
    }, 0);
    this._showBackdrop('calloutMenu', closeMenu);
  };

  /**
   * Cierra el menú de formato
   */
  meWYSE.prototype.closeFormatMenu = function() {
    if (this.formatMenu) {
      // Cancelar la animación de anclaje antes de eliminar el menú
      if (this.formatMenu._cancelAnchor) {
        this.formatMenu._cancelAnchor();
      }
      // Retirar los listeners de tooltip de este menú (se recrea en cada selección)
      this._detachTooltips(this.formatMenu);
      this.formatMenu.remove();
      this.formatMenu = null;
    }

    // Limpiar el range guardado
    this.formatMenuRange = null;

    this._hideBackdrop('formatMenu');

    // Cerrar también el color picker si está abierto, usando su cleanup para no
    // dejar listeners de scroll/resize/click colgando (antes hacía picker.remove()
    // directo y se saltaba closePicker).
    if (this._closeColorPicker) {
      this._closeColorPicker();
    } else {
      var picker = document.querySelector('.mewyse-color-picker');
      if (picker) picker.remove();
    }
  };

  /**
   * Crea el botón de resumen
   */
  meWYSE.prototype.createSummaryButton = function() {
    var self = this;

    // Si el botón ya existe, eliminarlo primero
    if (this.summaryButton && this.summaryButton.parentNode) {
      this.summaryButton.remove();
    }

    // Crear el botón
    this.summaryButton = document.createElement('button');
    this.summaryButton.className = 'mewyse-summary-button';
    this.summaryButton.innerHTML = WYSIWYG_ICONS.summaryPanel;
    this.summaryButton.title = this.t('tooltips.summary');

    // Evento hover para mostrar tooltip con índice rápido
    this.summaryButton.addEventListener('mouseenter', function() {
      // Cancelar el timeout de cierre si existe
      if (self.summaryTooltipTimeout) {
        clearTimeout(self.summaryTooltipTimeout);
        self.summaryTooltipTimeout = null;
      }
      self.showSummaryTooltip();
    });

    this.summaryButton.addEventListener('mouseleave', function() {
      // Delay antes de cerrar para permitir mover el ratón al tooltip
      self.summaryTooltipTimeout = setTimeout(function() {
        self.hideSummaryTooltip();
      }, 300);
    });

    // Evento click: alternar el panel de esquema anclado (vista tipo Word).
    // Si no hay wrapper (summary sin toolbar), cae al modal anterior.
    this.summaryButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Ocultar el tooltip de preview para que no quede flotando al abrir/cerrar el panel.
      self.hideSummaryTooltip();
      self.toggleOutlinePanel();
    });

    // Añadir el botón como primer elemento del contenedor
    if (this.container.firstChild) {
      this.container.insertBefore(this.summaryButton, this.container.firstChild);
    } else {
      this.container.appendChild(this.summaryButton);
    }
  };

  /**
   * Obtiene el índice de encabezados
   */
  meWYSE.prototype.getHeadingsIndex = function() {
    var headings = [];

    this.getFilteredBlocks().forEach(function(block, index) {
      if (block.type === 'heading1' || block.type === 'heading2' || block.type === 'heading3') {
        var text = block.content || '';
        // Eliminar etiquetas HTML del contenido
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        var cleanText = tempDiv.textContent || tempDiv.innerText || '';

        headings.push({
          id: block.id,
          type: block.type,
          text: cleanText,
          index: index
        });
      }
    });

    return headings;
  };

  /**
   * Muestra el tooltip con índice rápido
   */
  meWYSE.prototype.showSummaryTooltip = function() {
    var self = this;

    // Cerrar tooltip anterior si existe
    this.hideSummaryTooltip();

    var headings = this.getHeadingsIndex();

    // Si no hay encabezados, no mostrar tooltip
    if (headings.length === 0) {
      return;
    }

    // Crear tooltip
    var tooltip = document.createElement('div');
    tooltip.className = 'mewyse-summary-tooltip';

    headings.forEach(function(heading) {
      var item = document.createElement('div');
      item.className = 'mewyse-summary-tooltip-item mewyse-summary-' + heading.type;
      item.textContent = heading.text;
      item.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.navigateToHeading(heading.id);
        self.hideSummaryTooltip();
      });
      tooltip.appendChild(item);
    });

    // Añadir eventos para mantener tooltip abierto
    tooltip.addEventListener('mouseenter', function() {
      // Cancelar el timeout de cierre si existe
      if (self.summaryTooltipTimeout) {
        clearTimeout(self.summaryTooltipTimeout);
        self.summaryTooltipTimeout = null;
      }
    });

    tooltip.addEventListener('mouseleave', function() {
      // Cerrar tooltip cuando el ratón sale
      self.summaryTooltipTimeout = setTimeout(function() {
        self.hideSummaryTooltip();
      }, 200);
    });

    // Añadir al DOM primero para poder medir dimensiones reales
    document.body.appendChild(tooltip);
    this.summaryTooltip = tooltip;

    // Aplicar clase de tema si procede (para CSS variables dark)
    this._applyMenuTheme && this._applyMenuTheme(tooltip);

    // Posicionar tooltip anclado al botón de summary
    var buttonRect = this.summaryButton.getBoundingClientRect();
    var tooltipRect = tooltip.getBoundingClientRect();
    var margin = 8;
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Alinear el borde derecho del tooltip al borde derecho del botón por defecto
    var left = buttonRect.right - tooltipRect.width;
    var top = buttonRect.bottom + 5;

    // Si se sale por la izquierda del viewport, alinear al borde izquierdo del botón
    if (left < margin) {
      left = Math.min(buttonRect.left, viewportWidth - tooltipRect.width - margin);
      if (left < margin) left = margin;
    }

    // Si se sale por abajo, mostrar arriba del botón
    if (top + tooltipRect.height > viewportHeight - margin) {
      top = buttonRect.top - tooltipRect.height - 5;
      if (top < margin) top = margin;
    }

    tooltip.style.position = 'fixed';
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    tooltip.style.right = 'auto';

    // Nota: NO se usa backdrop aquí. El tooltip es hover-driven (se cierra con
    // mouseleave de botón/tooltip). Un backdrop a pantalla completa (z-index 999)
    // taparía el propio botón (z-index 100) e interceptaría su clic, impidiendo
    // abrir el panel de esquema.
  };

  /**
   * Oculta el tooltip
   */
  meWYSE.prototype.hideSummaryTooltip = function() {
    if (this.summaryTooltip) {
      this.summaryTooltip.remove();
      this.summaryTooltip = null;
      this._hideBackdrop('summaryTooltip');
    }
  };

  /**
   * Alterna el panel de esquema lateral. Sin wrapper (toolbar), cae al modal.
   */
  meWYSE.prototype.toggleOutlinePanel = function() {
    if (!this.editorWrapper) {
      // Sin wrapper no se puede empujar el contenido: usar el modal de antes.
      this.showSummaryModal();
      return;
    }
    if (this.outlinePanel) {
      this.closeOutlinePanel();
    } else {
      this.openOutlinePanel();
    }
  };

  /**
   * Construye el contenido del panel de esquema (stats compactas + índice).
   */
  meWYSE.prototype._buildOutlineContent = function() {
    var self = this;
    var panel = this.outlinePanel;
    if (!panel) return;
    var body = panel.querySelector('.mewyse-outline-body');
    if (!body) return;
    body.innerHTML = '';

    // Stats compactas
    var stats = document.createElement('div');
    stats.className = 'mewyse-summary-stats';
    stats.innerHTML = '<div class="mewyse-summary-stats-grid">' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.words') + '</span> <span class="mewyse-summary-stat-value">' + this.getWordCount() + '</span></div>' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.readingTime') + '</span> <span class="mewyse-summary-stat-value">' + this.getReadingTime() + '</span></div>' +
      '</div>';
    body.appendChild(stats);

    // Índice de títulos (esquema)
    var headings = this.getHeadingsIndex();
    if (headings.length > 0) {
      var indexSection = document.createElement('div');
      indexSection.className = 'mewyse-summary-index';
      var indexTitle = document.createElement('h4');
      indexTitle.textContent = this.t('summary.index');
      indexSection.appendChild(indexTitle);
      var indexList = document.createElement('div');
      indexList.className = 'mewyse-summary-index-list';
      headings.forEach(function(heading) {
        var item = document.createElement('div');
        item.className = 'mewyse-summary-index-item mewyse-summary-' + heading.type;
        item.textContent = heading.text;
        item.addEventListener('click', function() {
          self.navigateToHeading(heading.id);
        });
        indexList.appendChild(item);
      });
      indexSection.appendChild(indexList);
      body.appendChild(indexSection);
    } else {
      var noHeadings = document.createElement('p');
      noHeadings.className = 'mewyse-summary-no-headings';
      noHeadings.textContent = this.t('summary.noHeadings');
      body.appendChild(noHeadings);
    }
  };

  /**
   * Abre el panel de esquema anclado a la derecha (empuja el contenido).
   */
  meWYSE.prototype.openOutlinePanel = function() {
    var self = this;
    if (!this.editorWrapper || this.outlinePanel) return;

    var panel = document.createElement('div');
    panel.className = 'mewyse-outline-panel';
    this._applyMenuTheme(panel);

    var header = document.createElement('div');
    header.className = 'mewyse-outline-header';
    header.innerHTML = '<span class="mewyse-outline-title">' + this.t('summary.title') + '</span>';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'mewyse-outline-close';
    closeBtn.innerHTML = WYSIWYG_ICONS.close;
    closeBtn.title = this.t('summary.close');
    closeBtn.setAttribute('aria-label', this.t('summary.close'));
    closeBtn.onclick = function(e) { e.preventDefault(); self.closeOutlinePanel(); };
    header.appendChild(closeBtn);
    panel.appendChild(header);

    var bodyEl = document.createElement('div');
    bodyEl.className = 'mewyse-outline-body';
    panel.appendChild(bodyEl);

    this.editorWrapper.appendChild(panel);
    this.editorWrapper.classList.add('mewyse-has-outline');
    this.outlinePanel = panel;

    this._setSummaryButtonsActive(true);

    this._buildOutlineContent();
  };

  /**
   * Sincroniza el estado activo (clase + aria-pressed) de los botones de resumen
   * que existan: el flotante (this.summaryButton) y el de la toolbar
   * (this.toolbarSummaryButton).
   */
  meWYSE.prototype._setSummaryButtonsActive = function(v_active) {
    var v_buttons = [this.summaryButton, this.toolbarSummaryButton];
    for (var i = 0; i < v_buttons.length; i++) {
      var v_btn = v_buttons[i];
      if (!v_btn) continue;
      v_btn.classList.toggle('active', v_active);
      v_btn.setAttribute('aria-pressed', v_active ? 'true' : 'false');
    }
  };

  /**
   * Cierra el panel de esquema y restaura el ancho del editor.
   */
  meWYSE.prototype.closeOutlinePanel = function() {
    if (this.outlinePanel && this.outlinePanel.parentNode) {
      this.outlinePanel.parentNode.removeChild(this.outlinePanel);
    }
    this.outlinePanel = null;
    if (this.editorWrapper) {
      this.editorWrapper.classList.remove('mewyse-has-outline');
    }
    this._setSummaryButtonsActive(false);
  };

  /**
   * Muestra el modal de resumen completo
   */
  meWYSE.prototype.showSummaryModal = function() {
    var self = this;

    // Crear overlay
    var overlay = document.createElement('div');
    overlay.className = 'mewyse-summary-overlay';

    // Crear modal
    var modal = document.createElement('div');
    modal.className = 'mewyse-summary-modal';
    self._applyMenuTheme(modal); // dark mode si el editor está en oscuro

    // Título del modal
    var header = document.createElement('div');
    header.className = 'mewyse-summary-modal-header';
    header.innerHTML = '<h3>' + this.t('summary.title') + '</h3>';

    // Botón cerrar
    var closeBtn = document.createElement('button');
    closeBtn.className = 'mewyse-summary-close';
    closeBtn.innerHTML = WYSIWYG_ICONS.close;
    closeBtn.addEventListener('click', function() {
      overlay.remove();
    });
    header.appendChild(closeBtn);

    modal.appendChild(header);

    // Contenido del modal
    var content = document.createElement('div');
    content.className = 'mewyse-summary-modal-content';

    // Bloque de estadísticas
    var stats = document.createElement('div');
    stats.className = 'mewyse-summary-stats';

    var wordCount = this.getWordCount();
    var charCount = this.getCharacterCount();
    var paragraphCount = this.getParagraphCount();
    var readingTime = this.getReadingTime();

    stats.innerHTML = '<div class="mewyse-summary-stats-grid">' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.words') + '</span> <span class="mewyse-summary-stat-value">' + wordCount + '</span></div>' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.characters') + '</span> <span class="mewyse-summary-stat-value">' + charCount + '</span></div>' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.paragraphs') + '</span> <span class="mewyse-summary-stat-value">' + paragraphCount + '</span></div>' +
      '<div class="mewyse-summary-stat"><span class="mewyse-summary-stat-label">' + this.t('summary.readingTime') + '</span> <span class="mewyse-summary-stat-value">' + readingTime + '</span></div>' +
      '</div>';

    content.appendChild(stats);

    // Índice de navegación
    var headings = this.getHeadingsIndex();

    if (headings.length > 0) {
      var indexSection = document.createElement('div');
      indexSection.className = 'mewyse-summary-index';

      var indexTitle = document.createElement('h4');
      indexTitle.textContent = this.t('summary.index');
      indexSection.appendChild(indexTitle);

      var indexList = document.createElement('div');
      indexList.className = 'mewyse-summary-index-list';

      headings.forEach(function(heading) {
        var item = document.createElement('div');
        item.className = 'mewyse-summary-index-item mewyse-summary-' + heading.type;
        item.textContent = heading.text;
        item.addEventListener('click', function() {
          self.navigateToHeading(heading.id);
          overlay.remove();
        });
        indexList.appendChild(item);
      });

      indexSection.appendChild(indexList);
      content.appendChild(indexSection);
    } else {
      var noHeadings = document.createElement('p');
      noHeadings.className = 'mewyse-summary-no-headings';
      noHeadings.textContent = this.t('summary.noHeadings');
      content.appendChild(noHeadings);
    }

    modal.appendChild(content);
    overlay.appendChild(modal);

    // Cerrar al hacer clic en el overlay
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.remove();
      }
    });

    document.body.appendChild(overlay);
  };

  /**
   * Navega a un encabezado específico
   */
  meWYSE.prototype.navigateToHeading = function(blockId) {
    var v_block_el = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (!v_block_el) return;

    var v_container = this.container;
    var v_offset = 8; // pequeño margen superior para que no quede pegado al borde
    // ¿El editor scrollea internamente (min/maxHeight) o es la página?
    var v_internal_scroll = v_container.scrollHeight > v_container.clientHeight + 2;

    if (v_internal_scroll) {
      // Scroll DENTRO del editor: mover solo su scroll, NUNCA la ventana (antes,
      // scrollIntoView movía también la página aunque el título ya se viera).
      var v_cont_rect = v_container.getBoundingClientRect();
      var v_el_rect = v_block_el.getBoundingClientRect();
      var v_target = v_container.scrollTop + (v_el_rect.top - v_cont_rect.top) - v_offset;
      v_target = Math.max(0, v_target);
      if (typeof v_container.scrollTo === 'function') {
        v_container.scrollTo({ top: v_target, behavior: 'smooth' });
      } else {
        v_container.scrollTop = v_target;
      }
    } else {
      // El editor no scrollea internamente (la página es el scroller). Solo mover
      // la ventana si el título NO está ya completamente visible (evita el salto
      // innecesario cuando ya se ve).
      var v_vp_h = window.innerHeight || document.documentElement.clientHeight;
      var v_r = v_block_el.getBoundingClientRect();
      var v_fully_visible = v_r.top >= 0 && v_r.bottom <= v_vp_h;
      if (!v_fully_visible) {
        v_block_el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Enfocar el bloque SIN re-scrollear (preventScroll evita que el navegador
    // vuelva a mover el scroll al enfocar el contenteditable, que causaba saltos).
    var v_editable = v_block_el.querySelector('[contenteditable="true"]');
    if (v_editable) {
      setTimeout(function() {
        try { v_editable.focus({ preventScroll: true }); }
        catch (e) { v_editable.focus(); }
      }, 400);
    }
  };

  /**
   * Rellena el contenido de un elemento TOC (tabla de contenidos) a partir de los
   * títulos actuales del documento. Se separa de _buildTocElement para poder
   * refrescar el mismo nodo sin recrear el bloque (conserva clases/atributos).
   * @param {HTMLElement} v_nav - el elemento .mewyse-toc a rellenar
   */
  meWYSE.prototype._fillTocContent = function(v_nav) {
    var self = this;
    v_nav.innerHTML = '';

    var v_title = document.createElement('div');
    v_title.className = 'mewyse-toc-title';
    v_title.textContent = this.t('toc.title');
    v_nav.appendChild(v_title);

    var v_headings = this.getHeadingsIndex();
    if (!v_headings.length) {
      var v_empty = document.createElement('div');
      v_empty.className = 'mewyse-toc-empty';
      v_empty.textContent = this.t('toc.empty');
      v_nav.appendChild(v_empty);
      return;
    }

    var v_list = document.createElement('ul');
    v_list.className = 'mewyse-toc-list';
    v_headings.forEach(function(v_h) {
      var v_li = document.createElement('li');
      // Clase por nivel (heading1/2/3) para la indentación visual.
      v_li.className = 'mewyse-toc-item mewyse-toc-' + v_h.type;
      var v_link = document.createElement('a');
      v_link.className = 'mewyse-toc-link';
      v_link.href = '#';
      v_link.textContent = v_h.text || self.t('toc.untitled');
      v_link.onclick = function(e) {
        e.preventDefault();
        self.navigateToHeading(v_h.id);
      };
      v_li.appendChild(v_link);
      v_list.appendChild(v_li);
    });
    v_nav.appendChild(v_list);
  };

  /**
   * Crea el elemento de un bloque TOC (tabla de contenidos). No editable.
   * @param {number} blockId
   * @returns {HTMLElement}
   */
  meWYSE.prototype._buildTocElement = function(blockId) {
    var v_nav = document.createElement('nav');
    v_nav.className = 'mewyse-toc';
    v_nav.setAttribute('contenteditable', 'false');
    v_nav.setAttribute('aria-label', this.t('toc.title'));
    this._fillTocContent(v_nav);
    return v_nav;
  };

  /**
   * Refresca todos los bloques TOC presentes en el DOM para reflejar los títulos
   * en vivo. Se llama desde triggerChange. No-op si no hay ninguno.
   */
  meWYSE.prototype._refreshTocBlocks = function() {
    if (!this.container) return;
    var v_tocs = this.container.querySelectorAll('.mewyse-block[data-block-type="toc"]');
    for (var i = 0; i < v_tocs.length; i++) {
      this._fillTocContent(v_tocs[i]);
    }
  };

  /**
   * Construye el HTML del índice (TOC) para el export, con enlaces a los ids de
   * ancla de los títulos (id="mewyse-h-{id}", emitidos por getHTML/getHTMLSource
   * cuando hay un TOC). Recibe la lista de bloques ya filtrada.
   * @param {Array} v_blocks
   * @returns {string}
   */
  meWYSE.prototype._buildTocHTML = function(v_blocks) {
    var v_items = '';
    for (var i = 0; i < v_blocks.length; i++) {
      var b = v_blocks[i];
      if (b.type === 'heading1' || b.type === 'heading2' || b.type === 'heading3') {
        // Extraer el texto plano del título (sin etiquetas HTML)
        var v_tmp = document.createElement('div');
        v_tmp.innerHTML = b.content || '';
        var v_txt = v_tmp.textContent || '';
        v_items += '<li class="mewyse-toc-' + b.type + '"><a href="#mewyse-h-' +
                   b.id + '">' + escapeHtml(v_txt) + '</a></li>';
      }
    }
    if (!v_items) return '<nav class="mewyse-toc"></nav>';
    return '<nav class="mewyse-toc"><ul class="mewyse-toc-list">' + v_items + '</ul></nav>';
  };

  /**
   * Convierte un texto en un slug apto para ancla (#id): minúsculas, sin acentos
   * ni caracteres especiales, espacios a guiones. Usado por el export del TOC.
   * @param {string} v_text
   * @returns {string}
   */
  meWYSE.prototype._slugify = function(v_text) {
    var v_str = (typeof v_text === 'string') ? v_text : '';
    // normalizeText: minúsculas + sin diacríticos (á→a). Reutiliza el helper.
    return this.normalizeText(v_str)
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  /**
   * Obtiene el número de palabras
   */
  meWYSE.prototype.getWordCount = function() {
    var text = this.getPlainText();
    if (!text || text.trim() === '') {
      return 0;
    }

    // Eliminar múltiples espacios y contar palabras
    var words = text.trim().split(/\s+/);
    return words.length;
  };

  /**
   * Obtiene el número de caracteres
   */
  meWYSE.prototype.getCharacterCount = function() {
    var text = this.getPlainText();
    return text.length;
  };

  /**
   * Obtiene el número de párrafos
   */
  meWYSE.prototype.getParagraphCount = function() {
    var count = 0;

    this.getFilteredBlocks().forEach(function(block) {
      // Contar solo bloques que contengan texto
      if (block.type === 'paragraph' ||
          block.type === 'heading1' ||
          block.type === 'heading2' ||
          block.type === 'heading3' ||
          block.type === 'quote' ||
          block.type === 'bulletList' ||
          block.type === 'numberList') {
        var content = block.content || '';
        if (content.trim() !== '') {
          count++;
        }
      }
    });

    return count;
  };

  /**
   * Obtiene el tiempo estimado de lectura
   */
  meWYSE.prototype.getReadingTime = function() {
    var wordCount = this.getWordCount();

    // Promedio de lectura: 200 palabras por minuto
    var minutes = Math.ceil(wordCount / 200);

    if (minutes === 0) {
      return '< 1 min';
    } else if (minutes === 1) {
      return '1 min';
    } else {
      return minutes + ' min';
    }
  };

  // ============================================
  // CROSS-BLOCK SELECTION
  // ============================================

  /**
   * Obtiene el blockId del bloque en una coordenada de pantalla
   * @param {number} clientX
   * @param {number} clientY
   * @returns {string|null}
   */
  meWYSE.prototype.getBlockIdAtPoint = function(clientX, clientY) {
    var el = document.elementFromPoint(clientX, clientY);
    while (el && el !== this.container) {
      if (el.classList && el.classList.contains('mewyse-block') && el.getAttribute('data-block-id')) {
        return parseInt(el.getAttribute('data-block-id'), 10);
      }
      el = el.parentNode;
    }
    return null;
  };

  /**
   * Obtiene información del caret en una coordenada de pantalla (cross-browser)
   * @param {number} clientX
   * @param {number} clientY
   * @returns {{ node: Node, offset: number }|null}
   */
  meWYSE.prototype.getCaretInfoAtPoint = function(clientX, clientY) {
    if (document.caretRangeFromPoint) {
      // Chrome, Safari
      var range = document.caretRangeFromPoint(clientX, clientY);
      if (range) {
        return { node: range.startContainer, offset: range.startOffset };
      }
    } else if (document.caretPositionFromPoint) {
      // Firefox
      var pos = document.caretPositionFromPoint(clientX, clientY);
      if (pos) {
        return { node: pos.offsetNode, offset: pos.offset };
      }
    }
    return null;
  };

  /**
   * Crea el overlay de selección visual si no existe
   * @returns {HTMLElement}
   */
  meWYSE.prototype.createSelectionOverlay = function() {
    if (!this.crossBlockOverlay) {
      var overlay = document.createElement('div');
      overlay.className = 'mewyse-selection-overlay';
      this.container.appendChild(overlay);
      this.crossBlockOverlay = overlay;
    }
    return this.crossBlockOverlay;
  };

  /**
   * Inicia el tracking de mouse para detectar selección cross-block
   * @param {MouseEvent} e
   * @param {number} blockId
   */
  meWYSE.prototype.startCrossBlockTracking = function(e, blockId) {
    var self = this;
    if (this.crossBlockSelection) {
      this.clearCrossBlockSelection();
    }
    var originCaret = this.getCaretInfoAtPoint(e.clientX, e.clientY);
    if (!originCaret) return;

    this.crossBlockSelectOrigin = {
      blockId: blockId,
      node: originCaret.node,
      offset: originCaret.offset,
      clientX: e.clientX,
      clientY: e.clientY
    };

    var moved = false;

    function onMouseMove(ev) {
      var currentBlockId = self.getBlockIdAtPoint(ev.clientX, ev.clientY);
      if (currentBlockId === null) return;

      if (currentBlockId !== self.crossBlockSelectOrigin.blockId) {
        if (!self.isCrossBlockSelecting) {
          // Comenzamos selección cross-block
          self.isCrossBlockSelecting = true;
          self.container.classList.add('mewyse-cross-selecting');
          // Limpiar selección nativa
          var sel = window.getSelection();
          if (sel) sel.removeAllRanges();
        }
        moved = true;
        self.updateCrossBlockSelection(ev.clientX, ev.clientY, currentBlockId);
      } else if (self.isCrossBlockSelecting) {
        // Volvió al bloque origen pero ya estaba en modo cross-block
        moved = true;
        self.updateCrossBlockSelection(ev.clientX, ev.clientY, currentBlockId);
      }
    }

    function onMouseUp(ev) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (self.isCrossBlockSelecting) {
        self.finalizeCrossBlockSelection();
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * Actualiza la selección cross-block mientras se arrastra el mouse
   * @param {number} clientX
   * @param {number} clientY
   * @param {number} currentBlockId
   */
  meWYSE.prototype.updateCrossBlockSelection = function(clientX, clientY, currentBlockId) {
    var origin = this.crossBlockSelectOrigin;
    if (!origin) return;

    var originIndex = this.getBlockIndex(origin.blockId);
    var currentIndex = this.getBlockIndex(currentBlockId);
    if (originIndex === -1 || currentIndex === -1) return;

    var startIndex = Math.min(originIndex, currentIndex);
    var endIndex = Math.max(originIndex, currentIndex);
    var forward = currentIndex >= originIndex;

    // Obtener caret en la posición actual del mouse
    var currentCaret = this.getCaretInfoAtPoint(clientX, clientY);

    // Recolectar IDs de bloques entre origen y destino
    var blockIds = [];
    for (var i = startIndex; i <= endIndex; i++) {
      blockIds.push(this.blocks[i].id);
    }

    this.crossBlockSelection = {
      blockIds: blockIds,
      forward: forward,
      originBlockId: origin.blockId,
      originNode: origin.node,
      originOffset: origin.offset,
      endBlockId: currentBlockId,
      endNode: currentCaret ? currentCaret.node : null,
      endOffset: currentCaret ? currentCaret.offset : 0
    };

    this.renderCrossBlockHighlight();
  };

  /**
   * Selecciona todo el contenido del editor (todos los bloques) usando el
   * sistema de selección cross-block. Útil para Ctrl/Cmd+A. Devuelve true si
   * estableció una selección.
   * @returns {boolean}
   */
  meWYSE.prototype.selectAllBlocks = function() {
    if (!this.blocks || this.blocks.length === 0) return false;

    var firstBlock = this.blocks[0];
    var lastBlock = this.blocks[this.blocks.length - 1];
    var firstEditable = this.getEditableElement(this.getBlockElementById(firstBlock.id));

    // Limpiar otras selecciones que pudieran competir
    if (this.selectedBlocks && this.selectedBlocks.length > 0 && this.clearSelection) {
      this.clearSelection();
    }
    this.closeFormatMenu();

    // Abarcar de blocks[0] a blocks[último] para que copiar/borrar cubran TODO.
    // endNode = null hace que getRangeForBlock seleccione el contenido completo
    // del último bloque; los bloques intermedios se seleccionan enteros.
    this.crossBlockSelectOrigin = null;
    this.crossBlockSelection = {
      blockIds: this.blocks.map(function(b) { return b.id; }),
      forward: true,
      originBlockId: firstBlock.id,
      originNode: firstEditable || null,
      originOffset: 0,
      endBlockId: lastBlock.id,
      endNode: null,
      endOffset: 0
    };

    // Quitar la selección nativa para que no compita con el overlay
    var nsel = window.getSelection();
    if (nsel) { try { nsel.removeAllRanges(); } catch (e) {} }

    this.renderCrossBlockHighlight();
    return true;
  };

  /**
   * Crea un Range nativo para la porción seleccionada de un bloque
   * @param {number} blockId
   * @param {Object} sel - El objeto crossBlockSelection
   * @returns {Range|null}
   */
  meWYSE.prototype.getRangeForBlock = function(blockId, sel) {
    var blockEl = this.getBlockElementById(blockId);
    if (!blockEl) return null;

    var editableEl = this.getEditableElement(blockEl);
    if (!editableEl) return null;

    var range = document.createRange();
    var isOrigin = (blockId === sel.originBlockId);
    var isEnd = (blockId === sel.endBlockId);

    try {
      if (isOrigin && isEnd) {
        // Selección dentro del mismo bloque (puede ocurrir si se vuelve al origen)
        if (sel.forward) {
          range.setStart(sel.originNode, sel.originOffset);
          if (sel.endNode) {
            range.setEnd(sel.endNode, sel.endOffset);
          } else {
            range.selectNodeContents(editableEl);
            range.setStart(sel.originNode, sel.originOffset);
          }
        } else {
          if (sel.endNode) {
            range.setStart(sel.endNode, sel.endOffset);
          } else {
            range.setStart(editableEl, 0);
          }
          range.setEnd(sel.originNode, sel.originOffset);
        }
      } else if (isOrigin) {
        if (sel.forward) {
          // Desde el caret origen hasta el final del bloque
          range.setStart(sel.originNode, sel.originOffset);
          range.setEndAfter(editableEl.lastChild || editableEl);
        } else {
          // Desde el inicio del bloque hasta el caret origen
          range.setStartBefore(editableEl.firstChild || editableEl);
          range.setEnd(sel.originNode, sel.originOffset);
        }
      } else if (isEnd) {
        if (sel.forward) {
          // Desde el inicio del bloque hasta el caret actual
          range.setStartBefore(editableEl.firstChild || editableEl);
          if (sel.endNode) {
            range.setEnd(sel.endNode, sel.endOffset);
          } else {
            range.selectNodeContents(editableEl);
          }
        } else {
          // Desde el caret actual hasta el final del bloque
          if (sel.endNode) {
            range.setStart(sel.endNode, sel.endOffset);
          } else {
            range.setStart(editableEl, 0);
          }
          range.setEndAfter(editableEl.lastChild || editableEl);
        }
      } else {
        // Bloque intermedio: seleccionar todo
        range.selectNodeContents(editableEl);
      }
    } catch (ex) {
      // Si hay un error de rango (nodo movido, etc.), seleccionar todo el contenido
      try {
        range.selectNodeContents(editableEl);
      } catch (ex2) {
        return null;
      }
    }

    return range;
  };

  /**
   * Renderiza el highlight visual de la selección cross-block
   */
  meWYSE.prototype.renderCrossBlockHighlight = function() {
    var self = this;
    if (this._crossBlockRafId) {
      cancelAnimationFrame(this._crossBlockRafId);
    }
    this._crossBlockRafId = requestAnimationFrame(function() {
      self._renderCrossBlockHighlightNow();
    });
  };

  /**
   * Implementación real del renderizado de highlight
   */
  meWYSE.prototype._renderCrossBlockHighlightNow = function() {
    var overlay = this.createSelectionOverlay();
    // Limpiar rectángulos anteriores
    overlay.innerHTML = '';

    if (!this.crossBlockSelection) return;

    var sel = this.crossBlockSelection;
    var containerRect = this.container.getBoundingClientRect();
    var scrollLeft = this.container.scrollLeft;
    var scrollTop = this.container.scrollTop;

    for (var i = 0; i < sel.blockIds.length; i++) {
      var blockId = sel.blockIds[i];
      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var rects = range.getClientRects();
      for (var j = 0; j < rects.length; j++) {
        var r = rects[j];
        if (r.width === 0 && r.height === 0) continue;
        var div = document.createElement('div');
        div.className = 'mewyse-cross-selection-rect';
        div.style.left = (r.left - containerRect.left + scrollLeft) + 'px';
        div.style.top = (r.top - containerRect.top + scrollTop) + 'px';
        div.style.width = r.width + 'px';
        div.style.height = r.height + 'px';
        overlay.appendChild(div);
      }
    }
  };

  /**
   * Finaliza la selección cross-block al soltar el mouse
   */
  meWYSE.prototype.finalizeCrossBlockSelection = function() {
    this.isCrossBlockSelecting = false;
    this.container.classList.remove('mewyse-cross-selecting');
    this.crossBlockSelectOrigin = null;

    if (!this.crossBlockSelection || this.crossBlockSelection.blockIds.length === 0) {
      this.clearCrossBlockSelection();
      return;
    }

    // Mostrar el menú de formato centrado sobre la selección
    var overlay = this.crossBlockOverlay;
    if (overlay && overlay.childNodes.length > 0) {
      // Calcular el bounding box de todos los rects
      var firstRect = overlay.childNodes[0];
      var lastRect = overlay.childNodes[overlay.childNodes.length - 1];

      var sel = this.crossBlockSelection;
      var self = this;

      // Crear un reference object para anclar el menú
      var rangeReference = {
        getBoundingClientRect: function() {
          // Recalcular en cada frame basándonos en los rects del overlay
          if (!self.crossBlockOverlay || self.crossBlockOverlay.childNodes.length === 0) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
          }
          var allRects = self.crossBlockOverlay.childNodes;
          var minLeft = Infinity, minTop = Infinity, maxRight = -Infinity, maxBottom = -Infinity;
          var containerRect = self.container.getBoundingClientRect();
          for (var i = 0; i < allRects.length; i++) {
            var r = allRects[i];
            var rl = parseFloat(r.style.left) + containerRect.left;
            var rt = parseFloat(r.style.top) + containerRect.top - self.container.scrollTop;
            var rr = rl + parseFloat(r.style.width);
            var rb = rt + parseFloat(r.style.height);
            if (rl < minLeft) minLeft = rl;
            if (rt < minTop) minTop = rt;
            if (rr > maxRight) maxRight = rr;
            if (rb > maxBottom) maxBottom = rb;
          }
          return {
            top: minTop,
            bottom: maxBottom,
            left: minLeft,
            right: maxRight,
            width: maxRight - minLeft,
            height: maxBottom - minTop
          };
        }
      };

      // Mostrar el menú de formato usando la lógica existente
      this.showFormatMenu(null, null, rangeReference);
    }
  };

  /**
   * Limpia toda la selección cross-block
   */
  meWYSE.prototype.clearCrossBlockSelection = function() {
    this.crossBlockSelection = null;
    this.isCrossBlockSelecting = false;
    this.crossBlockSelectOrigin = null;
    this.container.classList.remove('mewyse-cross-selecting');

    if (this._crossBlockRafId) {
      cancelAnimationFrame(this._crossBlockRafId);
      this._crossBlockRafId = null;
    }

    // Limpiar overlay
    if (this.crossBlockOverlay) {
      this.crossBlockOverlay.innerHTML = '';
    }
  };

  /**
   * Copia el contenido de la selección cross-block al clipboard
   */
  meWYSE.prototype.executeCrossBlockCopy = function() {
    if (!this.crossBlockSelection) return;

    var sel = this.crossBlockSelection;
    var textParts = [];
    var htmlParts = [];

    for (var i = 0; i < sel.blockIds.length; i++) {
      var blockId = sel.blockIds[i];
      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var cloned = range.cloneContents();
      textParts.push(range.toString());

      // Construir HTML del fragmento
      var tempDiv = document.createElement('div');
      tempDiv.appendChild(cloned);
      htmlParts.push(tempDiv.innerHTML);
    }

    var textContent = textParts.join('\n');
    var htmlContent = htmlParts.join('<br>');

    // Fallback compatible ES5: textarea temporal + execCommand. Se ejecuta solo
    // una vez (guard) tanto si falla la parte síncrona como si la promesa de
    // clipboard.write se rechaza.
    var v_fallback_done = false;
    var fallback_copy = function() {
      if (v_fallback_done) return;
      v_fallback_done = true;
      var ta = document.createElement('textarea');
      ta.value = textContent;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (ex) {
        // Silenciar error
      }
      document.body.removeChild(ta);
    };

    // Intentar usar Clipboard API primero
    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        var blob = new Blob([htmlContent], { type: 'text/html' });
        var textBlob = new Blob([textContent], { type: 'text/plain' });
        var item = new ClipboardItem({
          'text/html': blob,
          'text/plain': textBlob
        });
        var v_p = navigator.clipboard.write([item]);
        // Si la promesa se rechaza (permiso denegado, sin foco), usar el fallback
        if (v_p && typeof v_p.then === 'function') {
          v_p.then(null, function() { fallback_copy(); });
        }
        return;
      } catch (ex) {
        // Error síncrono al construir Blob/ClipboardItem → fallback
      }
    }

    fallback_copy();
  };

  /**
   * Aplica un comando de formato a la selección cross-block
   * @param {string} command - Comando execCommand (bold, italic, etc.)
   * @param {string} [value] - Valor opcional del comando
   */
  meWYSE.prototype.applyCrossBlockFormat = function(command, value) {
    if (!this.crossBlockSelection) return;

    var sel = this.crossBlockSelection;
    var nativeSel = window.getSelection();

    for (var i = 0; i < sel.blockIds.length; i++) {
      var blockId = sel.blockIds[i];
      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var blockEl = this.getBlockElementById(blockId);
      var editableEl = this.getEditableElement(blockEl);
      if (!editableEl) continue;

      // Focar el elemento editable y aplicar la selección
      editableEl.focus();
      nativeSel.removeAllRanges();
      nativeSel.addRange(range);

      // Ejecutar el comando
      document.execCommand(command, false, value || null);
    }

    // Limpiar selección nativa y estado cross-block (los nodos son stale tras execCommand)
    nativeSel.removeAllRanges();
    this.clearCrossBlockSelection();
    this.closeFormatMenu();
    this.triggerChange();
  };

  /**
   * Toggle case para la selección cross-block
   */
  meWYSE.prototype.toggleCrossBlockCase = function() {
    // Compat: toggle binario smart
    this.applyCaseTransform('smart');
  };

  /**
   * Elimina el contenido de la selección cross-block
   */
  meWYSE.prototype.deleteCrossBlockSelection = function() {
    if (!this.crossBlockSelection) return;
    this.pushHistory(true);

    var sel = this.crossBlockSelection;
    var originIndex = this.getBlockIndex(sel.originBlockId);
    var endIndex = this.getBlockIndex(sel.endBlockId);
    if (originIndex === -1 || endIndex === -1) return;

    var startIndex = Math.min(originIndex, endIndex);
    var endIdx = Math.max(originIndex, endIndex);

    // Procesar bloques en orden inverso para no alterar los índices
    var blocksToRemove = [];
    for (var i = endIdx; i >= startIndex; i--) {
      var blockId = this.blocks[i].id;
      var isFirst = (i === startIndex);
      var isLast = (i === endIdx);

      var range = this.getRangeForBlock(blockId, sel);
      if (!range) continue;

      var blockEl = this.getBlockElementById(blockId);
      var editableEl = this.getEditableElement(blockEl);
      if (!editableEl) continue;

      var fullText = editableEl.textContent || '';
      var rangeText = range.toString();

      if (!isFirst && !isLast) {
        // Bloque intermedio: eliminar completamente
        blocksToRemove.push(blockId);
      } else if (rangeText.length >= fullText.length) {
        // Bloque completamente seleccionado
        if (isFirst && isLast) {
          // Solo un bloque: vaciar contenido
          range.deleteContents();
          this.updateBlockContent(blockId, editableEl.innerHTML);
        } else if (isFirst) {
          // Primer bloque completamente seleccionado: vaciar
          range.deleteContents();
          this.updateBlockContent(blockId, editableEl.innerHTML);
        } else {
          // Último bloque completamente seleccionado: eliminar
          blocksToRemove.push(blockId);
        }
      } else {
        // Parcialmente seleccionado: reconciliar el modelo con el DOM editado
        range.deleteContents();
        this.updateBlockContent(blockId, editableEl.innerHTML);
      }
    }

    // Eliminar bloques marcados
    for (var k = 0; k < blocksToRemove.length; k++) {
      var removeId = blocksToRemove[k];
      var removeIndex = this.getBlockIndex(removeId);
      if (removeIndex !== -1) {
        this.blocks.splice(removeIndex, 1);
        var removeEl = this.getBlockElementById(removeId);
        if (removeEl) {
          // Si está en un grupo de lista, manejar correctamente
          var parent = removeEl.parentNode;
          removeEl.remove();
          if (parent && (parent.classList.contains('mewyse-list-group') || parent.classList.contains('mewyse-checklist-group'))) {
            if (parent.children.length === 0) {
              parent.remove();
            }
          }
        }
      }
    }

    this.clearCrossBlockSelection();
    this.closeFormatMenu();

    // Re-normalizar niveles de lista en el modelo (por si el borrado dejó un
    // salto de nivel). El export/siguiente render ya usan los niveles efectivos.
    this._normalizeListModel();

    // Si no quedan bloques, crear un párrafo vacío
    if (this.blocks.length === 0) {
      this.blocks.push({
        id: ++this.currentBlockId,
        type: 'paragraph',
        content: ''
      });
      this.render(this.blocks[0].id);
    }

    // Focar el primer bloque restante
    if (this.blocks.length > 0) {
      var focusIndex = Math.min(startIndex, this.blocks.length - 1);
      var focusBlock = this.blocks[focusIndex];
      var focusEl = this.getBlockElementById(focusBlock.id);
      var focusEditable = this.getEditableElement(focusEl);
      if (focusEditable) {
        focusEditable.focus();
      }
    }

    this.triggerChange();
  };

  /**
   * Guarda un snapshot del estado actual en el historial
   * @param {boolean} force - Si true, guarda inmediatamente sin debounce
   */
  /**
   * Reinicia el historial de undo/redo dejando UNA sola entrada: el contenido
   * actual como línea base. Con ello `historyIndex = 0` y el botón de deshacer
   * queda deshabilitado hasta que haya un cambio real. Se usa tras la carga
   * INICIAL del contenido (para que abrir el editor sobre un textarea con HTML
   * no active "deshacer" sin haber tocado nada). Limpia además el snapshot
   * debounced pendiente de esa carga (que, al coincidir con la base, se
   * deduplicaría igualmente).
   */
  meWYSE.prototype._reset_history = function() {
    clearTimeout(this.historyDebounceTimer);
    this.historyDebounceTimer = null;
    this.history = [JSON.parse(JSON.stringify(this.blocks))];
    this.historyIndex = 0;
    this.updateUndoRedoButtons();
  };

  meWYSE.prototype.pushHistory = function(force) {
    if (this.isUndoRedo) return;

    var self = this;

    var doSnapshot = function() {
      var snapshot = JSON.parse(JSON.stringify(self.blocks));

      // Comparar con el último snapshot para evitar duplicados
      if (self.history.length > 0) {
        var last = self.history[self.historyIndex];
        if (JSON.stringify(last) === JSON.stringify(snapshot)) return;
      }

      // Truncar futuro si estamos en medio del historial
      if (self.historyIndex < self.history.length - 1) {
        self.history = self.history.slice(0, self.historyIndex + 1);
      }

      self.history.push(snapshot);

      // Recortar si excede el límite
      if (self.history.length > self.maxHistorySize) {
        self.history = self.history.slice(self.history.length - self.maxHistorySize);
      }

      self.historyIndex = self.history.length - 1;
      self.updateUndoRedoButtons();
    };

    if (force) {
      clearTimeout(this.historyDebounceTimer);
      this.historyDebounceTimer = null;
      doSnapshot();
    } else {
      clearTimeout(this.historyDebounceTimer);
      this.historyDebounceTimer = setTimeout(function() {
        self.historyDebounceTimer = null;
        doSnapshot();
      }, 300);
    }
  };

  /**
   * Deshace el último cambio
   */
  meWYSE.prototype.undo = function() {
    // Capturar dónde está el caret ANTES de reconstruir el DOM, para devolver el
    // foco al editor después (a la misma posición si sobrevive; si no, al final
    // del bloque visible).
    var v_caret_ctx = this._captureCaretContext();

    // Flush debounce pendiente
    if (this.historyDebounceTimer) {
      clearTimeout(this.historyDebounceTimer);
      this.historyDebounceTimer = null;
      // Guardar estado actual antes de deshacer
      var snapshot = JSON.parse(JSON.stringify(this.blocks));
      if (this.history.length > 0) {
        var last = this.history[this.historyIndex];
        if (JSON.stringify(last) !== JSON.stringify(snapshot)) {
          if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
          }
          this.history.push(snapshot);
          if (this.history.length > this.maxHistorySize) {
            this.history = this.history.slice(this.history.length - this.maxHistorySize);
          }
          this.historyIndex = this.history.length - 1;
        }
      }
    }

    if (this.historyIndex <= 0) return;

    this.historyIndex--;
    this.isUndoRedo = true;
    this.blocks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));

    // Recalcular currentBlockId de forma MONÓTONA: nunca decrece, para no
    // reciclar ids ya emitidos (evita colisiones tras undo/redo + inserción).
    var maxId = 0;
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id > maxId) {
        maxId = this.blocks[i].id;
      }
    }
    this.currentBlockId = Math.max(this.currentBlockId, maxId);

    this.render();
    this.triggerChange();
    this.isUndoRedo = false;
    this.updateUndoRedoButtons();
    this._restoreCaretContext(v_caret_ctx);
  };

  /**
   * Rehace el último cambio deshecho
   */
  meWYSE.prototype.redo = function() {
    if (this.historyIndex >= this.history.length - 1) return;

    // Capturar el caret antes del render para devolver el foco después.
    var v_caret_ctx = this._captureCaretContext();

    this.historyIndex++;
    this.isUndoRedo = true;
    this.blocks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));

    // Recalcular currentBlockId de forma MONÓTONA: nunca decrece, para no
    // reciclar ids ya emitidos (evita colisiones tras undo/redo + inserción).
    var maxId = 0;
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].id > maxId) {
        maxId = this.blocks[i].id;
      }
    }
    this.currentBlockId = Math.max(this.currentBlockId, maxId);

    this.render();
    this.triggerChange();
    this.isUndoRedo = false;
    this.updateUndoRedoButtons();
    this._restoreCaretContext(v_caret_ctx);
  };

  /**
   * Actualiza el estado de los botones undo/redo en la toolbar
   */
  meWYSE.prototype.updateUndoRedoButtons = function() {
    if (this.undoButton) {
      this.undoButton.disabled = (this.historyIndex <= 0);
    }
    if (this.redoButton) {
      this.redoButton.disabled = (this.historyIndex >= this.history.length - 1);
    }
  };

  // =========================================================================
  // INYECCIÓN DE ESTILOS DE CONTENIDO
  // =========================================================================

  // =========================================================================
  // MOVER BLOQUE ARRIBA/ABAJO
  // =========================================================================

  /**
   * Obtiene el ID del bloque con foco actual
   * @returns {number|null}
   */
  meWYSE.prototype._getFocusedBlockId = function() {
    // 1) Preferir la posición del CARET (selección). En listas anidadas, los <li>
    //    son contenteditable dentro de otro contenteditable, así que activeElement
    //    apunta al <li> padre (editing host), pero el caret está en el ítem real.
    //    La selección da el bloque correcto.
    var sel = window.getSelection ? window.getSelection() : null;
    if (sel && sel.rangeCount > 0) {
      var node = sel.anchorNode;
      var selEl = (node && node.nodeType === 3) ? node.parentElement : node;
      if (selEl && selEl.closest && this.container && this.container.contains(selEl)) {
        var selBlock = selEl.closest('[data-block-id]');
        if (selBlock) return parseInt(selBlock.getAttribute('data-block-id'));
      }
    }
    // 2) Fallback: último editable enfocado / activeElement
    var el = this.lastFocusedElement || document.activeElement;
    if (!el || !el.closest) return null;
    var blockEl = el.closest('[data-block-id]');
    if (!blockEl) return null;
    return parseInt(blockEl.getAttribute('data-block-id'));
  };

  /**
   * Mueve el bloque con foco una posición arriba
   */
  meWYSE.prototype.moveBlockUp = function() {
    var blockId = this._getFocusedBlockId();
    if (blockId === null) return;
    var index = this.getBlockIndex(blockId);
    if (index <= 0) return;
    var targetId = this.blocks[index - 1].id;
    this.moveBlock(blockId, targetId);
    // Re-enfocar el bloque movido
    var self = this;
    requestAnimationFrame(function() {
      var el = self.container.querySelector('[data-block-id="' + blockId + '"] [contenteditable="true"]');
      if (el) el.focus();
    });
    this._updateMoveButtons();
  };

  /**
   * Mueve el bloque con foco una posición abajo
   */
  meWYSE.prototype.moveBlockDown = function() {
    var blockId = this._getFocusedBlockId();
    if (blockId === null) return;
    var index = this.getBlockIndex(blockId);
    if (index === -1 || index >= this.blocks.length - 1) return;
    // Para mover abajo, el target es el bloque dos posiciones adelante (o fin)
    var targetIndex = index + 2;
    if (targetIndex < this.blocks.length) {
      this.moveBlock(blockId, this.blocks[targetIndex].id);
    } else {
      // Mover al final: splice manual
      this.pushHistory(true);
      var block = this.blocks.splice(index, 1)[0];
      this.blocks.push(block);
      this.render();
      this.triggerChange();
    }
    // Re-enfocar el bloque movido
    var self = this;
    requestAnimationFrame(function() {
      var el = self.container.querySelector('[data-block-id="' + blockId + '"] [contenteditable="true"]');
      if (el) el.focus();
    });
    this._updateMoveButtons();
  };

  /**
   * Actualiza el estado enabled/disabled de los botones de mover
   */
  meWYSE.prototype._updateMoveButtons = function() {
    // Actualizar también los botones de sangría y de alineación y el stepper de
    // tamaño de fuente (comparten los disparadores de foco).
    this._updateIndentButtons();
    this._updateAlignButton();
    this._updateFontSizeStepper();
    if (!this.moveUpButton || !this.moveDownButton) return;
    var blockId = this._getFocusedBlockId();
    if (blockId === null) {
      this.moveUpButton.disabled = true;
      this.moveDownButton.disabled = true;
      return;
    }
    var index = this.getBlockIndex(blockId);
    this.moveUpButton.disabled = (index <= 0);
    this.moveDownButton.disabled = (index === -1 || index >= this.blocks.length - 1);
  };

  /**
   * Actualiza el estado enabled/disabled de los botones de sangría según el
   * bloque con foco (solo activos en ítems de lista que pueden indentar/desindentar).
   */
  meWYSE.prototype._updateIndentButtons = function() {
    if (!this.indentButton || !this.outdentButton) return;
    var blockId = this._getFocusedBlockId();
    if (blockId === null) {
      this.indentButton.disabled = true;
      this.outdentButton.disabled = true;
      return;
    }
    this.indentButton.disabled = !this._canIndent(blockId);
    this.outdentButton.disabled = !this._canOutdent(blockId);
  };

  // =========================================================================
  // HELPERS DE TEMA
  // =========================================================================

  /**
   * Aplica un tema al editor y sus elementos
   * @param {string} theme - nombre del tema (ej: 'dark')
   */
  meWYSE.prototype._applyTheme = function(theme) {
    var themeClass = 'mewyse-editor-' + theme;
    if (this.container) {
      this.container.classList.add(themeClass);
    }
    if (this.toolbar && this.toolbar.parentNode) {
      this.toolbar.parentNode.classList.add(themeClass);
    }
    this.options.theme = theme;
  };

  /**
   * Elimina un tema del editor y sus elementos
   * @param {string} theme - nombre del tema a eliminar
   */
  meWYSE.prototype._removeTheme = function(theme) {
    var themeClass = 'mewyse-editor-' + theme;
    if (this.container) {
      this.container.classList.remove(themeClass);
    }
    if (this.toolbar && this.toolbar.parentNode) {
      this.toolbar.parentNode.classList.remove(themeClass);
    }
    this.options.theme = null;
  };

  /**
   * Devuelve true si el editor está en modo dark
   */
  meWYSE.prototype._isDark = function() {
    return this.options.theme === 'dark';
  };

  // =========================================================================
  // HELPERS COMPARTIDOS DE MENÚS
  // =========================================================================

  /**
   * Aplica la clase dark a un menú flotante si el editor está en dark mode
   * @param {HTMLElement} menuElement
   */
  meWYSE.prototype._applyMenuTheme = function(menuElement) {
    if (this._isDark()) {
      menuElement.classList.add('mewyse-dark');
    }
  };

  /**
   * Cierra un menú genérico: cancela anchor, remueve del DOM, nullifica referencia
   * @param {string} menuProp - nombre de la propiedad del menú (ej: 'slashMenu')
   */
  meWYSE.prototype._closeMenu = function(menuProp) {
    var menu = this[menuProp];
    if (menu) {
      if (menu._cancelAnchor) {
        menu._cancelAnchor();
      }
      menu.remove();
      this[menuProp] = null;
    }
  };

  /**
   * Registra un listener de click en document llevando la cuenta para poder
   * limpiarlo en destroy() aunque el menú se cierre por una vía distinta al
   * clic-fuera (selección de item, Escape, etc.).
   * @param {Function} fn
   */
  meWYSE.prototype._add_doc_click = function(fn) {
    if (!this._doc_click_handlers) this._doc_click_handlers = [];
    this._doc_click_handlers.push(fn);
    document.addEventListener('click', fn);
  };

  /**
   * Elimina un listener registrado con _add_doc_click y lo saca del registro.
   * @param {Function} fn
   */
  meWYSE.prototype._remove_doc_click = function(fn) {
    document.removeEventListener('click', fn);
    if (this._doc_click_handlers) {
      var v_idx = this._doc_click_handlers.indexOf(fn);
      if (v_idx >= 0) this._doc_click_handlers.splice(v_idx, 1);
    }
  };

  /**
   * Navega un menú genérico hacia arriba o abajo con wrapping
   * @param {string} menuProp - propiedad del menú
   * @param {string} itemSelector - selector CSS de los items
   * @param {string} indexProp - propiedad del índice seleccionado
   * @param {string} updateMethod - nombre del método de actualización visual
   * @param {string} direction - 'up' o 'down'
   */
  meWYSE.prototype._navigateMenu = function(menuProp, itemSelector, indexProp, updateMethod, direction) {
    var menu = this[menuProp];
    if (!menu) return;

    var visibleItems = menu.querySelectorAll(itemSelector + ':not([style*="display: none"])');
    if (visibleItems.length === 0) return;

    if (direction === 'up') {
      this[indexProp]--;
      if (this[indexProp] < 0) {
        this[indexProp] = visibleItems.length - 1;
      }
    } else {
      this[indexProp]++;
      if (this[indexProp] >= visibleItems.length) {
        this[indexProp] = 0;
      }
    }

    this[updateMethod]();
  };

  /**
   * Traduce un índice VISUAL (posición entre los items visibles, que es lo que
   * maneja la navegación por teclado) al índice REAL en el array fuente del menú
   * (el `data-index` del item, estable aunque el filtro oculte items). Devuelve
   * -1 si no hay item visible en esa posición. Evita la ambigüedad que hacía que
   * un clic con filtro activo insertara el item equivocado.
   * @param {HTMLElement} menu
   * @param {string} itemSelector
   * @param {number} visualIndex
   * @returns {number} índice real o -1
   */
  meWYSE.prototype._resolveMenuFullIndex = function(menu, itemSelector, visualIndex) {
    if (!menu) return -1;
    var visible = menu.querySelectorAll(itemSelector + ':not([style*="display: none"])');
    var item = visible[visualIndex];
    if (!item) return -1;
    var v_full = parseInt(item.getAttribute('data-index'), 10);
    return isNaN(v_full) ? -1 : v_full;
  };

  /**
   * Enfoca el editor (primer bloque o bloque especificado)
   * @param {number} [blockId] - ID del bloque a enfocar. Sin parámetro, enfoca el primer bloque.
   */
  meWYSE.prototype.focus = function(blockId) {
    var targetId = (blockId !== undefined) ? blockId : (this.blocks.length > 0 ? this.blocks[0].id : null);
    if (targetId === null) return;

    var blockElement = this.container.querySelector('[data-block-id="' + targetId + '"]');
    if (blockElement) {
      var contentEditable = blockElement.querySelector('[contenteditable="true"]');
      if (!contentEditable && blockElement.contentEditable === 'true') {
        contentEditable = blockElement;
      }
      if (contentEditable) {
        contentEditable.focus();
      }
    }
  };

  /**
   * ============================================
   * FULLSCREEN MODE
   * ============================================
   * Alterna el modo pantalla completa del editor
   */
  meWYSE.prototype.toggleFullscreen = function() {
    if (this.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  };

  meWYSE.prototype.enterFullscreen = function() {
    // Determinar qué elemento expandir: wrapper si hay toolbar, container si no
    var target = this.editorWrapper || this.container;
    if (!target) return;

    // Reparentar a <body> para que `position: fixed` cubra TODO el viewport.
    // Si un ancestro tiene transform/filter/perspective/contain, el fixed se
    // ancla a ese ancestro y solo cubriría "el padre"; moverlo a body lo evita.
    // Guardamos la posición original con un placeholder para restaurarla al salir.
    if (target.parentNode && target.parentNode !== document.body) {
      this._fsPlaceholder = document.createComment('mewyse-fullscreen-placeholder');
      target.parentNode.insertBefore(this._fsPlaceholder, target);
      document.body.appendChild(target);
    }

    target.classList.add('mewyse-fullscreen');
    document.body.classList.add('mewyse-fullscreen-lock');
    this.isFullscreen = true;

    if (this.fullscreenButton) {
      this.fullscreenButton.innerHTML = WYSIWYG_ICONS.fullscreenExit;
      this.fullscreenButton.title = this.t('tooltips.fullscreenExit');
      this.fullscreenButton.setAttribute('aria-label', this.t('tooltips.fullscreenExit'));
      this.fullscreenButton.setAttribute('aria-pressed', 'true');
      this.fullscreenButton.classList.add('active');
    }

    // Escape para salir
    var self = this;
    this._fullscreenEscHandler = function(e) {
      if (e.key === 'Escape' && self.isFullscreen && !self.findReplaceDialog) {
        self.exitFullscreen();
      }
    };
    document.addEventListener('keydown', this._fullscreenEscHandler);
  };

  meWYSE.prototype.exitFullscreen = function() {
    var target = this.editorWrapper || this.container;
    if (!target) return;

    target.classList.remove('mewyse-fullscreen');
    document.body.classList.remove('mewyse-fullscreen-lock');
    this.isFullscreen = false;

    // Restaurar el wrapper a su posición original (donde quedó el placeholder)
    if (this._fsPlaceholder && this._fsPlaceholder.parentNode) {
      this._fsPlaceholder.parentNode.insertBefore(target, this._fsPlaceholder);
      this._fsPlaceholder.parentNode.removeChild(this._fsPlaceholder);
    }
    this._fsPlaceholder = null;

    if (this.fullscreenButton) {
      this.fullscreenButton.innerHTML = WYSIWYG_ICONS.fullscreen;
      this.fullscreenButton.title = this.t('tooltips.fullscreen');
      this.fullscreenButton.setAttribute('aria-label', this.t('tooltips.fullscreen'));
      this.fullscreenButton.setAttribute('aria-pressed', 'false');
      this.fullscreenButton.classList.remove('active');
    }

    if (this._fullscreenEscHandler) {
      document.removeEventListener('keydown', this._fullscreenEscHandler);
      this._fullscreenEscHandler = null;
    }
  };

  /**
   * ============================================
   * SHOW BLOCKS (Debug view)
   * ============================================
   * Alterna la visualización de bordes en cada bloque
   */
  meWYSE.prototype.toggleShowBlocks = function() {
    this.showingBlocks = !this.showingBlocks;
    if (this.container) {
      this.container.classList.toggle('mewyse-show-blocks', this.showingBlocks);
    }
  };

  /**
   * Alterna el ajuste de texto (wordWrap): el contenido largo envuelve dentro
   * del bloque o desborda. Refleja el estado en this.wordWrap y la clase.
   */
  meWYSE.prototype.toggleWordWrap = function() {
    this.wordWrap = !this.wordWrap;
    if (this.container) {
      this.container.classList.toggle('mewyse-word-wrap', this.wordWrap);
    }
  };

  /**
   * ============================================
   * CHARACTER COUNTER BAR
   * ============================================
   * Crea la barra inferior con contador de palabras, caracteres y tiempo de lectura
   */
  meWYSE.prototype.createCharCounterBar = function() {
    var bar = document.createElement('div');
    bar.className = 'mewyse-char-counter';
    if (this.options.theme) {
      bar.classList.add('mewyse-editor-' + this.options.theme);
    }
    bar.setAttribute('role', 'status');
    bar.setAttribute('aria-live', 'polite');

    bar.innerHTML =
      '<span class="mewyse-char-counter-item"><span class="label">' + this.t('counter.words') + ':</span> <span class="value" data-counter="words">0</span></span>' +
      '<span class="mewyse-char-counter-item"><span class="label">' + this.t('counter.characters') + ':</span> <span class="value" data-counter="chars">0</span></span>' +
      '<span class="mewyse-char-counter-item"><span class="label">' + this.t('counter.readingTime') + ':</span> <span class="value" data-counter="time">0 min</span></span>';

    return bar;
  };

  /**
   * Actualiza los valores del contador
   */
  meWYSE.prototype.updateCharCounter = function() {
    if (!this.showCharCounter || !this.charCounterBar) return;

    var words = this.getWordCount ? this.getWordCount() : 0;
    var chars = this.getCharacterCount ? this.getCharacterCount() : 0;
    var readingTime = this.getReadingTime ? this.getReadingTime() : 0;

    var wordsEl = this.charCounterBar.querySelector('[data-counter="words"]');
    var charsEl = this.charCounterBar.querySelector('[data-counter="chars"]');
    var timeEl = this.charCounterBar.querySelector('[data-counter="time"]');

    if (wordsEl) wordsEl.textContent = words;
    if (charsEl) charsEl.textContent = chars;
    // getReadingTime() ya incluye la unidad ("1 min", "< 1 min"): no volver a añadirla.
    if (timeEl) timeEl.textContent = readingTime;
  };

  /**
   * ============================================
   * FIND & REPLACE
   * ============================================
   * Muestra el diálogo de buscar y reemplazar
   */
  meWYSE.prototype.showFindReplace = function() {
    if (this.findReplaceDialog) {
      // Ya abierto: enfocar el campo
      var input = this.findReplaceDialog.querySelector('.mewyse-fr-find-input');
      if (input) input.focus();
      return;
    }

    var self = this;
    var t = function(key) { return self.t('findReplace.' + key); };

    var dialog = document.createElement('div');
    dialog.className = 'mewyse-find-replace';
    // Aplicar clase dark SOLO si el editor está en modo oscuro (no para
    // cualquier theme — `compact` u otros no implican dark). Reusa el helper
    // común que ya hace esa comprobación correctamente.
    this._applyMenuTheme(dialog);
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-label', t('title'));

    dialog.innerHTML =
      '<div class="mewyse-fr-header">' +
        '<span class="mewyse-fr-title">' + t('title') + '</span>' +
        '<button class="mewyse-fr-close" aria-label="' + t('close') + '" title="' + t('close') + '">' + WYSIWYG_ICONS.close + '</button>' +
      '</div>' +
      '<div class="mewyse-fr-row">' +
        '<input type="text" class="mewyse-fr-find-input" placeholder="' + t('findPlaceholder') + '" aria-label="' + t('findPlaceholder') + '">' +
        '<span class="mewyse-fr-counter" aria-live="polite">0</span>' +
      '</div>' +
      '<div class="mewyse-fr-row">' +
        '<input type="text" class="mewyse-fr-replace-input" placeholder="' + t('replacePlaceholder') + '" aria-label="' + t('replacePlaceholder') + '">' +
      '</div>' +
      '<div class="mewyse-fr-options">' +
        '<label><input type="checkbox" class="mewyse-fr-case"> ' + t('caseSensitive') + '</label>' +
        '<label><input type="checkbox" class="mewyse-fr-whole"> ' + t('wholeWord') + '</label>' +
      '</div>' +
      '<div class="mewyse-fr-actions">' +
        '<button class="mewyse-fr-btn mewyse-fr-prev" title="' + t('findPrev') + '" aria-label="' + t('findPrev') + '">' + WYSIWYG_ICONS.arrowUp + '</button>' +
        '<button class="mewyse-fr-btn mewyse-fr-next" title="' + t('findNext') + '" aria-label="' + t('findNext') + '">' + WYSIWYG_ICONS.arrowDown + '</button>' +
        '<button class="mewyse-fr-btn mewyse-fr-replace">' + t('replace') + '</button>' +
        '<button class="mewyse-fr-btn mewyse-fr-replace-all">' + t('replaceAll') + '</button>' +
      '</div>';

    document.body.appendChild(dialog);
    this.findReplaceDialog = dialog;
    this.findReplaceState = { matches: [], currentIndex: -1 };

    // Posicionar en top-right del editor
    this._positionFindReplace();

    // Event bindings
    var findInput = dialog.querySelector('.mewyse-fr-find-input');
    var replaceInput = dialog.querySelector('.mewyse-fr-replace-input');
    var caseInput = dialog.querySelector('.mewyse-fr-case');
    var wholeInput = dialog.querySelector('.mewyse-fr-whole');

    findInput.addEventListener('input', function() { self._searchInEditor(); });
    caseInput.addEventListener('change', function() { self._searchInEditor(); });
    wholeInput.addEventListener('change', function() { self._searchInEditor(); });

    findInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) self._findNavigate(-1);
        else self._findNavigate(1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        self.closeFindReplace();
      }
    });
    replaceInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        self._replaceCurrent();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        self.closeFindReplace();
      }
    });

    dialog.querySelector('.mewyse-fr-close').onclick = function() { self.closeFindReplace(); };
    dialog.querySelector('.mewyse-fr-prev').onclick = function() { self._findNavigate(-1); };
    dialog.querySelector('.mewyse-fr-next').onclick = function() { self._findNavigate(1); };
    dialog.querySelector('.mewyse-fr-replace').onclick = function() { self._replaceCurrent(); };
    dialog.querySelector('.mewyse-fr-replace-all').onclick = function() { self._replaceAll(); };

    setTimeout(function() { findInput.focus(); }, 10);

    this._showBackdrop('findReplace', function() { self.closeFindReplace(); });
  };

  meWYSE.prototype._positionFindReplace = function() {
    if (!this.findReplaceDialog || !this.container) return;
    var rect;
    // En fullscreen posicionar respecto al viewport
    if (this.isFullscreen) {
      this.findReplaceDialog.style.position = 'fixed';
      this.findReplaceDialog.style.top = '16px';
      this.findReplaceDialog.style.right = '16px';
      this.findReplaceDialog.style.left = 'auto';
      return;
    }
    this.findReplaceDialog.style.position = 'absolute';
    rect = this.container.getBoundingClientRect();
    this.findReplaceDialog.style.top = (rect.top + window.scrollY + 8) + 'px';
    this.findReplaceDialog.style.left = (rect.right + window.scrollX - 360) + 'px';
    this.findReplaceDialog.style.right = 'auto';
  };

  meWYSE.prototype.closeFindReplace = function() {
    this._clearSearchHighlights();
    if (this.findReplaceDialog) {
      this.findReplaceDialog.remove();
      this.findReplaceDialog = null;
    }
    this.findReplaceState = null;
    this._hideBackdrop('findReplace');
  };

  meWYSE.prototype._clearSearchHighlights = function() {
    if (!this.container) return;
    var highlights = this.container.querySelectorAll('.mewyse-search-highlight');
    for (var i = 0; i < highlights.length; i++) {
      var h = highlights[i];
      var parent = h.parentNode;
      while (h.firstChild) parent.insertBefore(h.firstChild, h);
      parent.removeChild(h);
      parent.normalize();
    }
  };

  meWYSE.prototype._searchInEditor = function() {
    if (!this.findReplaceDialog) return;
    this._clearSearchHighlights();

    var query = this.findReplaceDialog.querySelector('.mewyse-fr-find-input').value;
    var caseSensitive = this.findReplaceDialog.querySelector('.mewyse-fr-case').checked;
    var wholeWord = this.findReplaceDialog.querySelector('.mewyse-fr-whole').checked;
    var counter = this.findReplaceDialog.querySelector('.mewyse-fr-counter');

    if (!query) {
      counter.textContent = '0';
      this.findReplaceState = { matches: [], currentIndex: -1 };
      return;
    }

    // Construir regex segura
    var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (wholeWord) escaped = '\\b' + escaped + '\\b';
    var flags = caseSensitive ? 'g' : 'gi';
    var regex;
    try { regex = new RegExp(escaped, flags); } catch (e) { return; }

    // Iterar por todos los text nodes del editor y envolver matches
    var matches = [];
    var walker = document.createTreeWalker(this.container, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) {
      // No buscar dentro de elementos ya highlight
      if (n.parentNode && !n.parentNode.closest('.mewyse-search-highlight')) {
        textNodes.push(n);
      }
    }

    for (var i = 0; i < textNodes.length; i++) {
      var tn = textNodes[i];
      var text = tn.textContent;
      if (!text) continue;
      // Reutilizar la instancia de regex (reseteando lastIndex) en vez de
      // compilar una nueva por cada nodo de texto.
      var local = regex;
      local.lastIndex = 0;
      var m, lastIndex = 0;
      var parent = tn.parentNode;
      if (!parent) continue;
      var frag = document.createDocumentFragment();
      var found = false;
      while ((m = local.exec(text)) !== null) {
        if (m.index > lastIndex) {
          frag.appendChild(document.createTextNode(text.substring(lastIndex, m.index)));
        }
        var span = document.createElement('span');
        span.className = 'mewyse-search-highlight';
        span.textContent = m[0];
        frag.appendChild(span);
        matches.push(span);
        lastIndex = m.index + m[0].length;
        found = true;
        // Evitar bucle infinito con regex de match vacío
        if (m[0].length === 0) local.lastIndex++;
      }
      if (found) {
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.substring(lastIndex)));
        }
        parent.replaceChild(frag, tn);
      }
    }

    this.findReplaceState = {
      matches: matches,
      currentIndex: matches.length > 0 ? 0 : -1
    };
    this._highlightCurrentMatch();
    this._updateFindCounter();
  };

  meWYSE.prototype._highlightCurrentMatch = function() {
    if (!this.findReplaceState) return;
    var matches = this.findReplaceState.matches;
    for (var i = 0; i < matches.length; i++) {
      matches[i].classList.remove('current');
    }
    var idx = this.findReplaceState.currentIndex;
    if (idx >= 0 && idx < matches.length) {
      matches[idx].classList.add('current');
      try { matches[idx].scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {}
    }
  };

  meWYSE.prototype._updateFindCounter = function() {
    if (!this.findReplaceDialog || !this.findReplaceState) return;
    var counter = this.findReplaceDialog.querySelector('.mewyse-fr-counter');
    var total = this.findReplaceState.matches.length;
    if (total === 0) {
      counter.textContent = this.t('findReplace.noMatches');
    } else {
      counter.textContent = this.t('findReplace.matchesCount', {
        current: this.findReplaceState.currentIndex + 1,
        total: total
      });
    }
  };

  meWYSE.prototype._findNavigate = function(dir) {
    if (!this.findReplaceState || this.findReplaceState.matches.length === 0) return;
    var total = this.findReplaceState.matches.length;
    this.findReplaceState.currentIndex =
      (this.findReplaceState.currentIndex + dir + total) % total;
    this._highlightCurrentMatch();
    this._updateFindCounter();
  };

  meWYSE.prototype._replaceCurrent = function() {
    if (!this.findReplaceState || this.findReplaceState.currentIndex < 0) return;
    var idx = this.findReplaceState.currentIndex;
    var span = this.findReplaceState.matches[idx];
    if (!span || !span.parentNode) return;

    var replaceInput = this.findReplaceDialog.querySelector('.mewyse-fr-replace-input');
    var replacement = replaceInput ? replaceInput.value : '';

    this.pushHistory(true);

    // Reemplazar el span por un text node con el nuevo valor
    var parent = span.parentNode;
    var textNode = document.createTextNode(replacement);
    parent.replaceChild(textNode, span);
    parent.normalize();

    // Localizar el bloque afectado ANTES de seguir tocando el DOM.
    var blockElement = parent.closest && parent.closest('[data-block-id]');

    // Quitar los spans de resaltado que quedan (los otros matches del mismo
    // bloque): si no, al leer innerHTML se persistirían en block.content y
    // sobrevivirían a la exportación. _searchInEditor los reconstruye después.
    this._clearSearchHighlights();

    // Actualizar el bloque correspondiente en el array de blocks
    if (blockElement) {
      var blockId = parseInt(blockElement.getAttribute('data-block-id'));
      var contentEditable = blockElement.querySelector('[contenteditable="true"]') ||
                            (blockElement.getAttribute('contenteditable') === 'true' ? blockElement : null);
      if (contentEditable) {
        this.updateBlockContent(blockId, contentEditable.innerHTML);
      }
    }

    // Re-buscar para actualizar posiciones (reconstruye los resaltados)
    this._searchInEditor();
  };

  meWYSE.prototype._replaceAll = function() {
    if (!this.findReplaceState || this.findReplaceState.matches.length === 0) return;
    var replaceInput = this.findReplaceDialog.querySelector('.mewyse-fr-replace-input');
    var replacement = replaceInput ? replaceInput.value : '';
    var count = this.findReplaceState.matches.length;

    this.pushHistory(true);

    // Recolectar bloques afectados para actualizar el modelo después
    var affectedBlockIds = {};
    for (var i = 0; i < this.findReplaceState.matches.length; i++) {
      var span = this.findReplaceState.matches[i];
      if (!span || !span.parentNode) continue;

      var blockElement = span.parentNode.closest && span.parentNode.closest('[data-block-id]');
      if (blockElement) {
        affectedBlockIds[blockElement.getAttribute('data-block-id')] = blockElement;
      }

      var parent = span.parentNode;
      parent.replaceChild(document.createTextNode(replacement), span);
      parent.normalize();
    }

    // Actualizar el modelo
    for (var id in affectedBlockIds) {
      if (affectedBlockIds.hasOwnProperty(id)) {
        var el = affectedBlockIds[id];
        var ce = el.querySelector('[contenteditable="true"]') ||
                 (el.getAttribute('contenteditable') === 'true' ? el : null);
        if (ce) {
          this.updateBlockContent(parseInt(id), ce.innerHTML);
        }
      }
    }

    // Feedback al usuario via contador
    if (this.findReplaceDialog) {
      var counter = this.findReplaceDialog.querySelector('.mewyse-fr-counter');
      counter.textContent = this.t('findReplace.replacedCount', { count: count });
    }

    this.findReplaceState = { matches: [], currentIndex: -1 };
    this.triggerChange();
  };

  /**
   * ============================================
   * SANITIZACIÓN (XSS PROTECTION)
   * ============================================
   * Whitelist estricto aplicado a todo block.content que entra al modelo.
   * Ver plan en /plans/refactored-beaming-turing.md.
   */

  // Tags que se eliminan completamente (con su contenido)
  var DANGEROUS_TAGS = {
    'SCRIPT': 1, 'STYLE': 1, 'IFRAME': 1, 'OBJECT': 1, 'EMBED': 1,
    'FORM': 1, 'INPUT': 1, 'BUTTON': 1, 'TEXTAREA': 1, 'SELECT': 1,
    'OPTION': 1, 'META': 1, 'LINK': 1, 'BASE': 1, 'SVG': 1, 'MATH': 1,
    'VIDEO': 1, 'AUDIO': 1, 'SOURCE': 1, 'TRACK': 1, 'PORTAL': 1
  };

  // Tags inline permitidos en cualquier bloque
  var INLINE_TAGS = {
    'B': 1, 'STRONG': 1, 'I': 1, 'EM': 1, 'U': 1, 'S': 1, 'STRIKE': 1,
    'DEL': 1, 'CODE': 1, 'MARK': 1, 'SUB': 1, 'SUP': 1, 'BR': 1,
    'A': 1, 'SPAN': 1, 'FONT': 1
  };

  // Tags de estructura dentro de celdas de tabla
  var BLOCK_TAGS_IN_CELL = {
    'P': 1, 'H1': 1, 'H2': 1, 'H3': 1, 'H4': 1, 'H5': 1, 'H6': 1,
    'BLOCKQUOTE': 1, 'PRE': 1, 'UL': 1, 'OL': 1, 'LI': 1, 'DIV': 1
  };

  // Tags de tabla
  var TABLE_TAGS = {
    'TABLE': 1, 'TBODY': 1, 'THEAD': 1, 'TFOOT': 1, 'TR': 1,
    'TD': 1, 'TH': 1, 'COLGROUP': 1, 'COL': 1, 'CAPTION': 1
  };

  // Whitelist de atributos por tag (además de los comunes globales)
  var ATTR_WHITELIST = {
    'A': { 'href': 1, 'title': 1, 'target': 1, 'rel': 1 },
    'SPAN': { 'class': 1, 'style': 1, 'contenteditable': 1,
              'data-mention-id': 1, 'data-mention-name': 1,
              'data-tag-id': 1, 'data-tag-name': 1, 'data-tag-color': 1,
              'data-merge-name': 1,
              'data-name': 1, 'data-type': 1 },
    'FONT': { 'color': 1, 'face': 1, 'size': 1 },
    'TD': { 'colspan': 1, 'rowspan': 1, 'style': 1 },
    'TH': { 'colspan': 1, 'rowspan': 1, 'style': 1 },
    'TABLE': { 'style': 1 },
    'COL': { 'span': 1, 'style': 1 },
    'IMG': { 'src': 1, 'alt': 1, 'width': 1, 'height': 1, 'title': 1 },
    'IFRAME': { 'src': 1, 'width': 1, 'height': 1, 'frameborder': 1, 'allowfullscreen': 1, 'allow': 1, 'title': 1 },
    'VIDEO': { 'src': 1, 'width': 1, 'height': 1, 'controls': 1, 'poster': 1, 'preload': 1 },
    'AUDIO': { 'src': 1, 'controls': 1, 'preload': 1 },
    'SOURCE': { 'src': 1, 'type': 1 }
  };

  // Clases CSS permitidas en SPAN (whitelisted por meWYSE)
  var ALLOWED_SPAN_CLASSES = {
    'mewyse-mention': 1,
    'mewyse-emoji': 1,
    'mewyse-tag': 1,
    'mewyse-mergetag': 1,
    'mewyse-search-highlight': 1
  };

  // Propiedades CSS permitidas en el atributo style
  var ALLOWED_CSS_PROPS = {
    'color': 1, 'background-color': 1, 'background': 1,
    'font-weight': 1, 'font-style': 1, 'font-size': 1, 'font-family': 1,
    'text-decoration': 1, 'text-align': 1, 'line-height': 1,
    'width': 1, 'height': 1, 'min-width': 1, 'min-height': 1,
    'max-width': 1, 'max-height': 1,
    'padding': 1, 'padding-top': 1, 'padding-right': 1,
    'padding-bottom': 1, 'padding-left': 1,
    'margin': 1, 'margin-top': 1, 'margin-right': 1,
    'margin-bottom': 1, 'margin-left': 1,
    'border': 1, 'border-color': 1, 'border-width': 1, 'border-style': 1,
    'border-collapse': 1, 'border-spacing': 1,
    'vertical-align': 1
  };

  // Tipos de bloque válidos
  var VALID_BLOCK_TYPES = {
    'paragraph': 1, 'heading1': 1, 'heading2': 1, 'heading3': 1,
    'quote': 1, 'code': 1, 'bulletList': 1, 'numberList': 1,
    'checklist': 1, 'table': 1, 'image': 1, 'divider': 1,
    'video': 1, 'audio': 1, 'pageBreak': 1, 'callout': 1,
    'toggle': 1, 'toc': 1
  };

  // Variantes válidas del bloque callout (validadas en el sanitizer).
  var CALLOUT_VARIANTS = { 'info': 1, 'warning': 1, 'success': 1, 'danger': 1 };

  // Lenguajes soportados en el selector del bloque de código (set cerrado que
  // valida el sanitizer y alimenta el <select>). La clave es el id de highlight.js
  // y el valor la etiqueta visible. '' = automático (highlightAuto / sin lenguaje).
  var CODE_LANGUAGES = {
    '': 'Auto',
    'plaintext': 'Texto plano',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'json': 'JSON',
    'html': 'HTML / XML',
    'css': 'CSS',
    'sql': 'SQL',
    'python': 'Python',
    'java': 'Java',
    'csharp': 'C#',
    'cpp': 'C / C++',
    'php': 'PHP',
    'go': 'Go',
    'ruby': 'Ruby',
    'bash': 'Bash / Shell',
    'yaml': 'YAML',
    'markdown': 'Markdown'
  };

  /**
   * Valida un URL contra esquemas peligrosos (XSS via javascript:)
   * Permite: http(s), mailto, tel, relativos (/, ./, ../), anchors (#), sin protocolo
   * Bloquea: javascript:, vbscript:, data:text/html, file:
   */
  meWYSE.prototype._isSafeUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var trimmed = url.trim().toLowerCase();
    // Bloquear esquemas peligrosos (con o sin espacios/control chars al inicio)
    // Normalizar: eliminar caracteres de control (tabs, newlines) que eluden filtros
    var normalized = trimmed.replace(/[\x00-\x20]/g, '');
    if (normalized.indexOf('javascript:') === 0) return false;
    if (normalized.indexOf('vbscript:') === 0) return false;
    if (normalized.indexOf('livescript:') === 0) return false;
    // Bloquear TODO data: en enlaces (href): un data:image/svg+xml o data:text/xml
    // puede ejecutar script al navegar (vector real en IE/navegadores antiguos).
    // Las imágenes data: se validan aparte con _isSafeImageUrl.
    if (normalized.indexOf('data:') === 0) return false;
    if (normalized.indexOf('file:') === 0) return false;
    return true;
  };

  /**
   * Valida URL de imagen: solo http(s) y data:image/*
   */
  meWYSE.prototype._isSafeImageUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var normalized = url.trim().toLowerCase().replace(/[\x00-\x20]/g, '');
    if (normalized.indexOf('http://') === 0) return true;
    if (normalized.indexOf('https://') === 0) return true;
    // data:image/* permitido salvo SVG (puede contener scripts/handlers)
    if (normalized.indexOf('data:image/') === 0) {
      return normalized.indexOf('data:image/svg') !== 0;
    }
    // Rutas relativas
    if (normalized.indexOf('/') === 0 || normalized.indexOf('./') === 0 ||
        normalized.indexOf('../') === 0) return true;
    return false;
  };

  /**
   * Sanitiza un string de CSS style, devolviendo solo las propiedades seguras
   */
  meWYSE.prototype._sanitizeStyle = function(styleStr) {
    if (!styleStr || typeof styleStr !== 'string') return '';
    var parts = styleStr.split(';');
    var clean = [];
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var colonIdx = part.indexOf(':');
      if (colonIdx < 0) continue;
      var prop = part.substring(0, colonIdx).trim().toLowerCase();
      var value = part.substring(colonIdx + 1).trim();
      if (!ALLOWED_CSS_PROPS[prop]) continue;
      // Bloquear valores peligrosos
      var valueLower = value.toLowerCase();
      // Rechazar backslashes: son escapes CSS (u\72 l(...)) que se usan para
      // ofuscar url()/expression() y eludir los indexOf de abajo. Ninguna de las
      // propiedades permitidas (colores, tamaños, bordes) los necesita.
      if (value.indexOf('\\') >= 0) continue;
      if (valueLower.indexOf('url(') >= 0) continue;
      if (valueLower.indexOf('expression(') >= 0) continue;
      if (valueLower.indexOf('@import') >= 0) continue;
      if (valueLower.indexOf('javascript:') >= 0) continue;
      if (valueLower.indexOf('vbscript:') >= 0) continue;
      if (value.indexOf('<') >= 0 || value.indexOf('>') >= 0) continue;
      // Bloquear comillas (romperían el atributo style al emitir) y comentarios CSS
      if (value.indexOf('"') >= 0 || value.indexOf("'") >= 0) continue;
      if (value.indexOf('/*') >= 0 || value.indexOf('*/') >= 0) continue;
      // value razonablemente corto (anti-DoS)
      if (value.length > 200) continue;
      clean.push(prop + ': ' + value);
    }
    return clean.join('; ');
  };

  /**
   * ============================================
   * IMAGE PIPELINE
   * ============================================
   * Helpers centralizados para validación de tamaño y upload de imágenes.
   * Usados por insertImageBlock (toolbar), paste de imagen, drag&drop.
   */

  /**
   * Formatea bytes en una unidad legible (KB/MB).
   */
  meWYSE.prototype._formatFileSize = function(bytes) {
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(bytes % 1048576 === 0 ? 0 : 1) + ' MB';
    if (bytes >= 1024) return Math.round(bytes / 1024) + ' KB';
    return bytes + ' B';
  };

  /**
   * Valida que un File no supere this.imageMaxSize.
   * Si falla, muestra alert con mensaje configurable y devuelve false.
   * @returns {boolean} true si el archivo es válido
   */
  meWYSE.prototype._validateImageSize = function(file) {
    if (!this.imageMaxSize) return true;
    if (!file || typeof file.size !== 'number') return true;
    if (file.size <= this.imageMaxSize) return true;
    var msg = this.options.imageMaxSizeError ||
              this.t('alerts.imageTooLarge', { size: this._formatFileSize(this.imageMaxSize) });
    try { window.alert(msg); } catch (e) {}
    return false;
  };

  /**
   * Procesa un File de imagen: valida tamaño, obtiene URL final (upload o base64)
   * y resuelve dimensiones. Callback recibe { blob, fileName, width, height } o null si rechaza.
   *
   * Si options.onImageUpload está definido, se delega el upload al consumidor.
   * Si no, se convierte a base64 inline (comportamiento por defecto).
   */
  meWYSE.prototype._processImageFile = function(file, callback) {
    var self = this;
    if (!file) { callback(null); return; }
    if (!this._validateImageSize(file)) { callback(null); return; }

    var resolveWithDimensions = function(url, fileName, knownW, knownH) {
      if (knownW && knownH) {
        callback({ blob: url, fileName: fileName, width: knownW, height: knownH });
        return;
      }
      var tmp = new Image();
      tmp.onload = function() {
        callback({ blob: url, fileName: fileName, width: tmp.width, height: tmp.height });
      };
      tmp.onerror = function() {
        callback({ blob: url, fileName: fileName, width: 300, height: 200 });
      };
      tmp.src = url;
    };

    if (typeof this.options.onImageUpload === 'function') {
      // Hook externo: el consumidor sube al servidor y devuelve la URL.
      // Protegido: si lanza de forma síncrona, abortar con callback(null).
      try {
        this.options.onImageUpload(file, function(result) {
          if (!result || !result.url) { callback(null); return; }
          resolveWithDimensions(
            result.url,
            result.fileName || file.name,
            result.width, result.height
          );
        });
      } catch (e) {
        callback(null);
      }
    } else {
      // Comportamiento por defecto: base64 inline
      var reader = new FileReader();
      reader.onload = function(e) {
        resolveWithDimensions(e.target.result, file.name);
      };
      reader.onerror = function() { callback(null); };
      reader.readAsDataURL(file);
    }
  };

  /**
   * ============================================
   * MEDIA BLOCKS (video / audio)
   * ============================================
   * Soporta embeds de YouTube/Vimeo y archivos nativos (.mp4/.webm/.ogg para video,
   * .mp3/.ogg/.wav para audio). Sin upload local — solo URL externa.
   */

  // Whitelist estricto de hosts permitidos para iframe embeds
  var EMBED_HOSTS = {
    'www.youtube.com': 1, 'youtube.com': 1, 'youtu.be': 1,
    'www.youtube-nocookie.com': 1, 'youtube-nocookie.com': 1,
    'www.vimeo.com': 1, 'vimeo.com': 1, 'player.vimeo.com': 1
  };

  /**
   * Detecta el proveedor y extrae el ID del vídeo desde una URL.
   * @returns {Object|null} { provider: 'youtube'|'vimeo'|'file', videoId: string|null, url: string }
   */
  meWYSE.prototype._detectVideoProvider = function(url) {
    if (!url || typeof url !== 'string') return null;
    var trimmed = url.trim();
    if (!trimmed) return null;

    // YouTube: watch?v=ID, youtu.be/ID, embed/ID, v/ID, shorts/ID, live/ID
    // (acepta www./m./sin subdominio y youtube-nocookie.com).
    var ytMatch = trimmed.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) return { provider: 'youtube', videoId: ytMatch[1], url: trimmed };

    // Vimeo: vimeo.com/ID, player.vimeo.com/video/ID y URLs con ruta
    // (vimeo.com/channels/staffpicks/ID, vimeo.com/ID/hash...). Se captura el
    // último id numérico tras cualquier número de segmentos de ruta.
    var vmMatch = trimmed.match(/(?:player\.)?vimeo\.com\/(?:[^\/\s?#]+\/)*(\d+)/);
    if (vmMatch) return { provider: 'vimeo', videoId: vmMatch[1], url: trimmed };

    // Archivo de vídeo: extensiones comunes
    if (/\.(mp4|webm|ogg|ogv|mov|m4v)($|\?|#)/i.test(trimmed)) {
      return { provider: 'file', videoId: null, url: trimmed };
    }

    return null;
  };

  /**
   * Deriva la info de un bloque de vídeo de forma uniforme, aceptando el modelo
   * NUEVO (content = URL string; dimensiones en block.width/height) y el LEGACY
   * (content = { provider, videoId, url, width, height }). El provider/videoId se
   * calculan siempre desde la URL con `_detectVideoProvider`.
   * @param {Object} block
   * @returns {Object|null} { url, provider, videoId, width, height } o null si la
   *   URL no es un vídeo reconocible.
   */
  meWYSE.prototype._videoInfoFromBlock = function(block) {
    if (!block) return null;
    var c = block.content;
    var url = '', srcW, srcH;
    if (typeof c === 'string') {
      url = c;
      srcW = block.width; srcH = block.height;
    } else if (c && typeof c === 'object') {
      // Legacy: la URL y dimensiones venían en el objeto (block.width/height ganan si existen)
      url = (typeof c.url === 'string') ? c.url : '';
      srcW = (typeof block.width !== 'undefined') ? block.width : c.width;
      srcH = (typeof block.height !== 'undefined') ? block.height : c.height;
    }
    var info = this._detectVideoProvider(url);
    if (!info) return null;
    var width = parseInt(srcW, 10);
    if (isNaN(width) || width < 50) width = 640;
    width = Math.min(width, 10000);
    var height = parseInt(srcH, 10);
    if (isNaN(height) || height < 30) height = Math.round(width * 9 / 16);
    height = Math.min(height, 10000);
    return { url: url, provider: info.provider, videoId: info.videoId, width: width, height: height };
  };

  /**
   * Valida URL de iframe embed: debe ser https y host whitelisted.
   */
  meWYSE.prototype._isSafeEmbedUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var m = url.trim().match(/^https:\/\/([^\/]+)/i);
    if (!m) return false;
    return EMBED_HOSTS.hasOwnProperty(m[1].toLowerCase());
  };

  /**
   * Valida URL de media file (video/audio): http(s) o data:video/audio.
   */
  meWYSE.prototype._isSafeMediaUrl = function(url) {
    if (!url || typeof url !== 'string') return false;
    var normalized = url.trim().toLowerCase().replace(/[\x00-\x20]/g, '');
    if (normalized.indexOf('http://') === 0) return true;
    if (normalized.indexOf('https://') === 0) return true;
    if (normalized.indexOf('data:video/') === 0) return true;
    if (normalized.indexOf('data:audio/') === 0) return true;
    return false;
  };

  /**
   * Valida URL de audio file: extensiones comunes + esquema seguro.
   */
  meWYSE.prototype._isAudioUrl = function(url) {
    if (!this._isSafeMediaUrl(url)) return false;
    return /\.(mp3|ogg|oga|wav|m4a|aac|flac)($|\?|#)/i.test(url);
  };

  /**
   * Muestra un modal pidiendo URL para insertar media (video o audio).
   */
  meWYSE.prototype.showMediaUrlModal = function(type, onAccept) {
    var self = this;
    var t = function(key) { return self.t(key); };

    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';
    var modal = document.createElement('div');
    modal.className = 'mewyse-modal-container';
    self._applyMenuTheme(modal); // dark mode si el editor está en oscuro

    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = type === 'audio' ? t('modals.insertAudioTitle') : t('modals.insertVideoTitle');
    modal.appendChild(title);

    var inputsContainer = document.createElement('div');
    inputsContainer.className = 'mewyse-modal-inputs';

    var group = document.createElement('div');
    group.className = 'mewyse-modal-input-group';
    var label = document.createElement('label');
    label.textContent = type === 'audio' ? t('modals.audioUrl') : t('modals.videoUrl');
    var urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.className = 'mewyse-modal-input';
    urlInput.placeholder = type === 'audio'
      ? 'https://.../audio.mp3'
      : 'https://www.youtube.com/watch?v=...';
    group.appendChild(label);
    group.appendChild(urlInput);
    inputsContainer.appendChild(group);
    modal.appendChild(inputsContainer);

    var buttons = document.createElement('div');
    buttons.className = 'mewyse-modal-buttons';
    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelBtn.textContent = t('modals.cancel');
    cancelBtn.onclick = function() { document.body.removeChild(overlay); };
    var okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.className = 'mewyse-modal-button mewyse-modal-button-primary';
    okBtn.textContent = t('modals.insert');
    var submit = function() {
      var url = urlInput.value.trim();
      if (!url) return;
      // Validación según tipo
      if (type === 'audio') {
        if (!self._isAudioUrl(url)) {
          try { window.alert(t('alerts.invalidAudioUrl')); } catch (e) {}
          return;
        }
        document.body.removeChild(overlay);
        onAccept({ url: url });
        return;
      }
      // video
      var info = self._detectVideoProvider(url);
      // Para archivos, además de la extensión, exigir un esquema seguro
      // (http/https/data:video) — evita insertar un placeholder "no disponible"
      // con esquemas como ftp:/javascript:.
      if (!info || (info.provider === 'file' && !self._isSafeMediaUrl(info.url))) {
        try { window.alert(t('alerts.invalidVideoUrl')); } catch (e) {}
        return;
      }
      document.body.removeChild(overlay);
      onAccept(info);
    };
    okBtn.onclick = submit;
    urlInput.onkeydown = function(e) {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
      else if (e.key === 'Escape') { e.preventDefault(); document.body.removeChild(overlay); }
    };

    buttons.appendChild(cancelBtn);
    buttons.appendChild(okBtn);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    setTimeout(function() { urlInput.focus(); }, 10);
  };

  /**
   * Inserta un bloque de vídeo abriendo un modal de URL.
   */
  meWYSE.prototype.insertVideoBlock = function() {
    var self = this;
    var insertIndex = this._getInsertIndexForNewBlock();
    this.showMediaUrlModal('video', function(info) {
      self.pushHistory(true);
      // Modelo nuevo: content = SOLO la URL; dimensiones como props de bloque.
      var block = {
        id: ++self.currentBlockId,
        type: 'video',
        content: info.url,
        width: 640,
        height: 360
      };
      self.blocks.splice(insertIndex, 0, block);
      self.render();
      self.triggerChange();
    });
  };

  /**
   * Inserta un bloque de audio abriendo un modal de URL.
   */
  meWYSE.prototype.insertAudioBlock = function() {
    var self = this;
    var insertIndex = this._getInsertIndexForNewBlock();
    this.showMediaUrlModal('audio', function(info) {
      self.pushHistory(true);
      var block = {
        id: ++self.currentBlockId,
        type: 'audio',
        content: {
          url: info.url,
          title: ''
        }
      };
      self.blocks.splice(insertIndex, 0, block);
      self.render();
      self.triggerChange();
    });
  };

  /**
   * Calcula el índice donde insertar un nuevo bloque (después del último enfocado).
   */
  meWYSE.prototype._getInsertIndexForNewBlock = function() {
    var activeElem = this.lastFocusedElement || document.activeElement;
    if (activeElem && activeElem.closest) {
      var blockElement = activeElem.closest('[data-block-id]');
      if (blockElement) {
        var blockId = parseInt(blockElement.getAttribute('data-block-id'), 10);
        if (!isNaN(blockId)) return this.getBlockIndex(blockId) + 1;
      }
    }
    return this.blocks.length;
  };

  /**
   * Crea el elemento DOM para un bloque de video. Muestra una PREVISUALIZACIÓN
   * (facade) — el iframe/vídeo real solo se carga al pulsar el botón de play
   * (_loadVideoIframe). El bloque es seleccionable (handle + resize) como una
   * imagen. Dimensiones en block.width/height.
   */
  meWYSE.prototype.createVideoElement = function(block) {
    var self = this;
    var wrapper = document.createElement('div');
    wrapper.className = 'mewyse-video-wrapper';
    wrapper.contentEditable = 'false';
    wrapper.setAttribute('data-block-id', block.id);
    wrapper.setAttribute('tabindex', '0');

    var info = this._videoInfoFromBlock(block);
    if (!info) {
      var ph = document.createElement('div');
      ph.className = 'mewyse-video-placeholder';
      ph.textContent = this.t('misc.videoUnavailable');
      wrapper.appendChild(ph);
      return wrapper;
    }

    // Dimensiones fijas (px) para poder redimensionar como una imagen.
    wrapper.style.width = info.width + 'px';
    wrapper.style.height = info.height + 'px';

    // Previsualización (sin cargar el iframe todavía)
    wrapper.appendChild(this._buildVideoFacade(info, block.id));

    // Botón de editar dimensiones (visible al seleccionar, vía CSS)
    var editBtn = document.createElement('button');
    editBtn.className = 'mewyse-video-edit-btn';
    editBtn.type = 'button';
    editBtn.innerHTML = WYSIWYG_ICONS.gear;
    editBtn.title = self.t('tooltips.editDimensions');
    editBtn.onmousedown = function(e) { e.preventDefault(); };
    editBtn.onclick = function(e) {
      e.preventDefault(); e.stopPropagation();
      self.editVideoDimensions(block.id);
    };
    wrapper.appendChild(editBtn);

    // Handle de redimensionamiento (esquina) — funciona con facade o iframe
    this._attachVideoResize(wrapper, block.id);

    // Click en el bloque → seleccionar (handle + resize + borde), como imagen
    wrapper.addEventListener('click', function(e) {
      // El play/edit/resize gestionan su propio click (stopPropagation)
      self.selectVideo(wrapper, block.id);
    });

    return wrapper;
  };

  /**
   * Construye la previsualización (facade) de un vídeo: miniatura de YouTube o
   * caja genérica, con un botón de play que carga el iframe al pulsarlo.
   * @param {Object} info - { provider, videoId, url, width, height }
   * @param {number} blockId
   * @returns {HTMLElement}
   */
  meWYSE.prototype._buildVideoFacade = function(info, blockId) {
    var self = this;
    var facade = document.createElement('div');
    facade.className = 'mewyse-video-facade mewyse-video-facade-' + info.provider;

    if (info.provider === 'youtube' && info.videoId) {
      // Miniatura ligera (imagen, sin iframe ni tracking). hqdefault siempre existe.
      facade.style.backgroundImage = "url('https://i.ytimg.com/vi/" +
        encodeURIComponent(info.videoId) + "/hqdefault.jpg')";
    } else {
      // Genérico: etiqueta con el nombre del proveedor
      var label = document.createElement('span');
      label.className = 'mewyse-video-facade-label';
      label.textContent = info.provider === 'vimeo' ? 'Vimeo' : this.t('blockTypes.video');
      facade.appendChild(label);
    }

    var play = document.createElement('button');
    play.type = 'button';
    play.className = 'mewyse-video-play';
    play.setAttribute('aria-label', self.t('misc.playVideo'));
    play.title = self.t('misc.playVideo');
    play.innerHTML = WYSIWYG_ICONS.play;
    play.onmousedown = function(e) { e.preventDefault(); };
    play.onclick = function(e) {
      e.preventDefault(); e.stopPropagation();
      self._loadVideoIframe(blockId);
    };
    facade.appendChild(play);
    return facade;
  };

  /**
   * Construye el media real (iframe YouTube/Vimeo o <video> archivo) de un vídeo.
   * @param {Object} info
   * @returns {HTMLElement}
   */
  meWYSE.prototype._buildVideoMedia = function(info) {
    var media;
    if (info.provider === 'youtube' && info.videoId) {
      media = document.createElement('iframe');
      media.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(info.videoId) + '?autoplay=1';
      media.setAttribute('frameborder', '0');
      media.setAttribute('allowfullscreen', 'true');
      media.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    } else if (info.provider === 'vimeo' && info.videoId) {
      media = document.createElement('iframe');
      media.src = 'https://player.vimeo.com/video/' + encodeURIComponent(info.videoId) + '?autoplay=1';
      media.setAttribute('frameborder', '0');
      media.setAttribute('allowfullscreen', 'true');
    } else if (info.provider === 'file' && this._isSafeMediaUrl(info.url)) {
      media = document.createElement('video');
      media.controls = true;
      media.autoplay = true;
      media.src = info.url;
    } else {
      media = document.createElement('div');
      media.className = 'mewyse-video-placeholder';
      media.textContent = this.t('misc.videoUnavailable');
    }
    media.className = (media.className ? media.className + ' ' : '') + 'mewyse-video-media';
    return media;
  };

  /**
   * Carga el iframe/vídeo real reemplazando la previsualización. Añade un botón
   * para volver a la previsualización (descarga el iframe).
   * @param {number} blockId
   */
  meWYSE.prototype._loadVideoIframe = function(blockId) {
    var self = this;
    var wrapper = this.container.querySelector('.mewyse-video-wrapper[data-block-id="' + blockId + '"]');
    if (!wrapper) return;
    var block = this.getBlock(blockId);
    var info = this._videoInfoFromBlock(block);
    if (!info) return;

    var facade = wrapper.querySelector('.mewyse-video-facade');
    if (facade) wrapper.removeChild(facade);

    wrapper.appendChild(this._buildVideoMedia(info));

    // Botón para volver a la previsualización (descarga el iframe)
    if (!wrapper.querySelector('.mewyse-video-restore')) {
      var restore = document.createElement('button');
      restore.type = 'button';
      restore.className = 'mewyse-video-restore';
      restore.title = self.t('misc.closeVideo');
      restore.setAttribute('aria-label', self.t('misc.closeVideo'));
      restore.innerHTML = WYSIWYG_ICONS.close;
      restore.onmousedown = function(e) { e.preventDefault(); };
      restore.onclick = function(e) {
        e.preventDefault(); e.stopPropagation();
        self._showVideoFacade(blockId);
      };
      wrapper.appendChild(restore);
    }
  };

  /**
   * Vuelve a la previsualización de un vídeo (descarga el iframe/vídeo).
   * @param {number} blockId
   */
  meWYSE.prototype._showVideoFacade = function(blockId) {
    var wrapper = this.container.querySelector('.mewyse-video-wrapper[data-block-id="' + blockId + '"]');
    if (!wrapper) return;
    var block = this.getBlock(blockId);
    var info = this._videoInfoFromBlock(block);
    if (!info) return;
    var media = wrapper.querySelector('.mewyse-video-media');
    if (media) wrapper.removeChild(media);
    var restore = wrapper.querySelector('.mewyse-video-restore');
    if (restore) wrapper.removeChild(restore);
    if (!wrapper.querySelector('.mewyse-video-facade')) {
      wrapper.insertBefore(this._buildVideoFacade(info, blockId), wrapper.firstChild);
    }
  };

  /**
   * Engancha el handle de redimensionamiento de un vídeo (drag en la esquina).
   * Mantiene el ratio y persiste en block.width/height. Espejo del de imágenes.
   * @param {HTMLElement} wrapper
   * @param {number} blockId
   */
  meWYSE.prototype._attachVideoResize = function(wrapper, blockId) {
    var self = this;
    var handle = document.createElement('div');
    handle.className = 'mewyse-video-resize-handle';
    handle.title = self.t('tooltips.dragToResize');

    var isResizing = false, startX, startY, startWidth, ratio;

    var onMove = function(e) {
      if (!isResizing) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      var delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      var newW = startWidth + delta;
      if (newW < 120) newW = 120;
      var newH = Math.round(newW / ratio);
      wrapper.style.width = newW + 'px';
      wrapper.style.height = newH + 'px';
    };
    var onUp = function() {
      if (!isResizing) return;
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      var block = self.getBlock(blockId);
      if (block) {
        block.width = parseInt(wrapper.style.width, 10);
        block.height = parseInt(wrapper.style.height, 10);
        self.triggerChange();
      }
    };
    handle.onmousedown = function(e) {
      e.preventDefault(); e.stopPropagation();
      isResizing = true;
      startX = e.clientX; startY = e.clientY;
      startWidth = parseInt(wrapper.style.width, 10) || 640;
      var curH = parseInt(wrapper.style.height, 10) || Math.round(startWidth * 9 / 16);
      ratio = startWidth / curH;
      document.body.style.cursor = 'nwse-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      self.selectVideo(wrapper, blockId);
    };
    wrapper.appendChild(handle);
  };

  /**
   * Selecciona un bloque de vídeo: borde, handle flotante y teclado
   * (Delete/Escape/Enter). Espejo simplificado de selectImage.
   * @param {HTMLElement} wrapper
   * @param {number} blockId
   */
  meWYSE.prototype.selectVideo = function(wrapper, blockId) {
    var self = this;
    if (this.selectedImage) this.deselectImage();
    var prev = this.container.querySelector('.mewyse-video-wrapper.selected');
    if (prev && prev !== wrapper) prev.classList.remove('selected');

    wrapper.classList.add('selected');
    try { wrapper.focus(); } catch (e) {}
    this.selectedVideo = { element: wrapper, blockId: blockId };

    if (this.floatingHandle) {
      var el = this.getBlockElementById(blockId);
      if (el) this.positionFloatingHandle(el, blockId);
    }

    if (!this.videoKeydownHandler) {
      this.videoKeydownHandler = function(e) {
        if (!self.selectedVideo) return;
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
          var id = self.selectedVideo.blockId;
          self.deselectVideo();
          self.deleteBlock(id);
        } else if (e.key === 'Escape') {
          self.deselectVideo();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          var idx = self.getBlockIndex(self.selectedVideo.blockId);
          self.deselectVideo();
          self.addBlock('paragraph', idx + 1);
        }
      };
      document.addEventListener('keydown', this.videoKeydownHandler);
    }
  };

  /**
   * Deselecciona el vídeo actual.
   */
  meWYSE.prototype.deselectVideo = function() {
    if (!this.selectedVideo) return;
    if (this.selectedVideo.element) this.selectedVideo.element.classList.remove('selected');
    this.selectedVideo = null;
    // Ocultado diferido: solo esconde el handle si el foco quedó fuera del editor
    // (si pasó a un bloque de texto, ese focusin lo mantiene visible).
    this._scheduleHandleHideCheck();
  };

  /**
   * Modal para editar las dimensiones (ancho) de un vídeo. El alto sigue el ratio.
   * @param {number} blockId
   */
  meWYSE.prototype.editVideoDimensions = function(blockId) {
    var self = this;
    var block = this.getBlock(blockId);
    var info = this._videoInfoFromBlock(block);
    if (!info) return;

    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';
    var modal = document.createElement('div');
    modal.className = 'mewyse-modal-container';
    self._applyMenuTheme(modal);

    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = self.t('tooltips.editDimensions');
    modal.appendChild(title);

    var inputs = document.createElement('div');
    inputs.className = 'mewyse-modal-inputs';
    var mkField = function(labelText, value) {
      var g = document.createElement('div');
      g.className = 'mewyse-modal-input-group';
      var l = document.createElement('label'); l.textContent = labelText;
      var i = document.createElement('input'); i.type = 'number'; i.min = '120';
      i.className = 'mewyse-modal-input'; i.value = value;
      g.appendChild(l); g.appendChild(i); inputs.appendChild(g);
      return i;
    };
    var wInput = mkField(self.t('modals.width') || 'Ancho', info.width);
    var hInput = mkField(self.t('modals.height') || 'Alto', info.height);
    var ratio = info.width / info.height;
    // Mantener ratio al cambiar el ancho
    wInput.oninput = function() {
      var v = parseInt(wInput.value, 10);
      if (!isNaN(v) && v > 0) hInput.value = Math.round(v / ratio);
    };
    modal.appendChild(inputs);

    var buttons = document.createElement('div');
    buttons.className = 'mewyse-modal-buttons';
    var cancel = document.createElement('button');
    cancel.type = 'button'; cancel.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancel.textContent = self.t('modals.cancel');
    cancel.onclick = function() { document.body.removeChild(overlay); };
    var ok = document.createElement('button');
    ok.type = 'button'; ok.className = 'mewyse-modal-button mewyse-modal-button-primary';
    ok.textContent = self.t('modals.save');
    ok.onclick = function() {
      var nw = parseInt(wInput.value, 10), nh = parseInt(hInput.value, 10);
      if (isNaN(nw) || nw < 120) nw = 120;
      if (isNaN(nh) || nh < 30) nh = Math.round(nw * 9 / 16);
      var b = self.getBlock(blockId);
      if (b) { b.width = Math.min(nw, 10000); b.height = Math.min(nh, 10000); }
      document.body.removeChild(overlay);
      self.render();
      self.triggerChange();
    };
    buttons.appendChild(cancel); buttons.appendChild(ok);
    modal.appendChild(buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    setTimeout(function() { wInput.focus(); }, 10);
  };

  /**
   * Crea el elemento DOM para un bloque de audio.
   */
  meWYSE.prototype.createAudioElement = function(block) {
    var wrapper = document.createElement('div');
    wrapper.className = 'mewyse-audio-wrapper';
    wrapper.contentEditable = 'false';

    var c = block.content || {};
    if (this._isSafeMediaUrl(c.url)) {
      var audio = document.createElement('audio');
      audio.controls = true;
      audio.src = c.url;
      wrapper.appendChild(audio);
    } else {
      var placeholder = document.createElement('div');
      placeholder.className = 'mewyse-audio-placeholder';
      placeholder.textContent = this.t('misc.audioUnavailable');
      wrapper.appendChild(placeholder);
    }

    return wrapper;
  };

  /**
   * ============================================
   * REMOVE FORMAT
   * ============================================
   * Elimina todo el formato inline (bold, italic, color, etc.) de la selección actual.
   * Funciona con selección normal y cross-block selection.
   */
  meWYSE.prototype.removeFormat = function() {
    var self = this;

    // Caso 0: selección por bloques enteros → quitar formato del contenido completo
    if (this.selectedBlocks && this.selectedBlocks.length > 0) {
      this.pushHistory(true);
      for (var bi = 0; bi < this.selectedBlocks.length; bi++) {
        var blk = this.getBlock(this.selectedBlocks[bi]);
        if (!blk || typeof blk.content !== 'string') continue;
        var tmpEl = document.createElement('div');
        tmpEl.innerHTML = blk.content;
        var brList = tmpEl.querySelectorAll('br');
        for (var bj = 0; bj < brList.length; bj++) brList[bj].replaceWith('\n');
        var plain = tmpEl.textContent || '';
        blk.content = escapeHtml(plain).replace(/\n/g, '<br>');
      }
      this.render();
      this._reapplyBlockSelectionVisuals();
      this.triggerChange();
      return;
    }

    // Caso 1: selección cross-block → limpiar cada bloque seleccionado
    if (this.crossBlockSelection && this.crossBlockSelection.blockIds && this.crossBlockSelection.blockIds.length > 0) {
      this.pushHistory(true);
      var ids = this.crossBlockSelection.blockIds.slice();
      for (var i = 0; i < ids.length; i++) {
        var block = this.getBlock(ids[i]);
        if (!block || typeof block.content !== 'string') continue;
        // Convertir HTML a texto plano preservando <br> como \n
        var tmp = document.createElement('div');
        tmp.innerHTML = block.content;
        // Reemplazar <br> por saltos de línea antes de extraer texto
        var brs = tmp.querySelectorAll('br');
        for (var b = 0; b < brs.length; b++) brs[b].replaceWith('\n');
        var plainText = tmp.textContent || '';
        // Escapar HTML del texto resultante
        block.content = escapeHtml(plainText).replace(/\n/g, '<br>');
      }
      this.clearCrossBlockSelection();
      this.render();
      this.triggerChange();
      return;
    }

    // Caso 2: selección normal dentro de un bloque
    var selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    this.pushHistory(true);

    // execCommand removeFormat quita b/i/u/s/font y attrs básicos
    document.execCommand('removeFormat', false, null);

    // execCommand no quita spans con style (colores custom) ni algunas clases.
    // Iterar el bloque actual y desenvolver spans residuales con style.
    var activeElement = document.activeElement;
    var blockElement = activeElement && activeElement.closest ? activeElement.closest('[data-block-id]') : null;
    if (blockElement) {
      var editable = blockElement.querySelector('[contenteditable="true"]') ||
                     (blockElement.getAttribute('contenteditable') === 'true' ? blockElement : null);
      if (editable) {
        self._unwrapResidualFormatting(editable);

        // Persistir en modelo
        var blockId = parseInt(blockElement.getAttribute('data-block-id'), 10);
        if (!isNaN(blockId)) {
          self.updateBlockContent(blockId, editable.innerHTML);
        }
      }
    }

    this.triggerChange();
  };

  /**
   * Desenvuelve spans/fonts/marks residuales tras removeFormat
   * Preserva links (no se consideran "formato")
   */
  meWYSE.prototype._unwrapResidualFormatting = function(root) {
    // Seleccionar spans con style, font, mark, code inline (pero NO dentro de bloques de código)
    var selectors = ['span[style]', 'span.mewyse-search-highlight', 'font', 'mark'];
    for (var s = 0; s < selectors.length; s++) {
      var nodes = root.querySelectorAll(selectors[s]);
      for (var n = nodes.length - 1; n >= 0; n--) {
        var node = nodes[n];
        // Preservar mentions/emojis (tienen clase específica)
        if (node.className && (node.className.indexOf('mewyse-mention') >= 0 ||
                               node.className.indexOf('mewyse-emoji') >= 0)) continue;
        // Desenvolver: mover hijos al padre y eliminar el nodo
        var parent = node.parentNode;
        if (!parent) continue;
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        parent.removeChild(node);
      }
    }
  };

  // Clases de la UI del editor que NO deben persistir en block.content de tablas
  // (se añaden dinámicamente en createTableElement/addTableControls/enableColumnResizing)
  var EDITOR_UI_CLASSES = [
    'mewyse-table-row-control',
    'mewyse-table-col-control',
    'mewyse-table-resize-handle',
    'mewyse-table-add-row',
    'mewyse-table-add-col',
    'mewyse-cell-selected'
  ];

  /**
   * Limpia el HTML de una tabla (block.content de tipo 'table') de los controles
   * que el editor añade dinámicamente al renderizar. Este método garantiza que
   * block.content contiene solo el markup semántico de la tabla, no la UI del editor.
   *
   * Qué elimina:
   * - <button class="mewyse-table-*-control"> (botones de fila/columna con SVG hamburger)
   * - <div class="mewyse-table-resize-handle"> (handles de redimensionado)
   * - <button class="mewyse-table-add-row|col"> (botones +row/+col)
   * - atributos tabindex="-1", contenteditable="false" en controles ya eliminados
   * - style inline generado por el editor en <td>/<th> (position:relative usado por los controles)
   * - contenteditable="true" y data-placeholder en los <p> de las celdas
   *
   * Preserva:
   * - Estructura <tbody>/<tr>/<td>/<th> + colspan/rowspan
   * - Contenido de texto e inline formatting
   * - Estilos de usuario (color, background-color, border, width, height) — ver _sanitizeStyle
   */
  meWYSE.prototype._cleanTableContent = function(html) {
    if (typeof html !== 'string' || !html) return html;

    // Envolver directamente en <table> — el navegador genera/normaliza tbody según contenido.
    // Si el input ya tiene <tbody>, se usa; si no, lo genera.
    var doc;
    try {
      doc = new DOMParser().parseFromString(
        '<!DOCTYPE html><html><body><table>' + html + '</table></body></html>',
        'text/html'
      );
    } catch (e) {
      return html;
    }
    var table = doc.querySelector('table');
    if (!table) return html;
    // Obtener el tbody (generado por el navegador o presente en el input)
    var tbody = table.querySelector('tbody');
    if (!tbody) {
      // Caso raro: si no hay tbody, trabajar directamente con la tabla
      tbody = table;
    }

    // 1. Eliminar botones/divs con clases de UI del editor
    for (var i = 0; i < EDITOR_UI_CLASSES.length; i++) {
      var uiNodes = tbody.querySelectorAll('.' + EDITOR_UI_CLASSES[i]);
      for (var j = uiNodes.length - 1; j >= 0; j--) {
        if (uiNodes[j].parentNode) uiNodes[j].parentNode.removeChild(uiNodes[j]);
      }
    }

    // 2. Limpiar atributos innecesarios del editor en <td>/<th>
    var cells = tbody.querySelectorAll('td, th');
    for (var c = 0; c < cells.length; c++) {
      var cell = cells[c];
      // Limpiar style: preservar solo propiedades de usuario (background-color, border, etc.)
      // pero eliminar position:relative que pone el editor para los controles
      var styleAttr = cell.getAttribute('style');
      if (styleAttr) {
        var cleanStyle = this._sanitizeStyle(styleAttr);
        // Eliminar también position:relative que es exclusivo del editor
        cleanStyle = cleanStyle.replace(/\bposition\s*:\s*relative\s*;?/gi, '').trim();
        if (cleanStyle) {
          cell.setAttribute('style', cleanStyle);
        } else {
          cell.removeAttribute('style');
        }
      }
    }

    // 3. Limpiar atributos del editor en los <p> dentro de celdas
    var paragraphs = tbody.querySelectorAll('td > p, th > p');
    for (var p = 0; p < paragraphs.length; p++) {
      var para = paragraphs[p];
      para.removeAttribute('contenteditable');
      para.removeAttribute('data-placeholder');
      para.removeAttribute('tabindex');
      // Limpiar style: eliminar padding/margin/min-height del editor
      var pStyle = para.getAttribute('style');
      if (pStyle) {
        // Eliminar las props que el editor fuerza en los <p> de celdas
        pStyle = pStyle
          .replace(/\bpadding\s*:[^;]+;?/gi, '')
          .replace(/\bmargin\s*:[^;]+;?/gi, '')
          .replace(/\bmin-height\s*:[^;]+;?/gi, '')
          .trim();
        if (pStyle && pStyle !== ';') {
          para.setAttribute('style', pStyle);
        } else {
          para.removeAttribute('style');
        }
      }
    }

    return tbody.innerHTML;
  };

  /**
   * Sanitiza HTML string contra whitelist.
   * @param {string} html - HTML a sanitizar
   * @param {Object} opts - { allowTable, allowImg, allowMedia, tableInnards }.
   *   tableInnards=true SOLO cuando el html son hijos sueltos de tabla (tbody/tr/td);
   *   para un documento con <table> completas, dejarlo en false (evita foster parenting).
   * @returns {string} HTML sanitizado seguro para innerHTML
   */
  meWYSE.prototype._sanitizeBlockContent = function(html, opts) {
    if (typeof html !== 'string') return html; // no string: devolver tal cual
    if (html === '') return '';
    opts = opts || {};
    var allowTable = opts.allowTable === true;
    var allowImg = opts.allowImg === true;
    var allowMedia = opts.allowMedia === true;
    // tableInnards: el html es contenido INTERNO de una tabla (tbody/tr/td sueltos),
    // no un documento con <table> completas. Solo en ese caso se envuelve en <table>.
    var tableInnards = opts.tableInnards === true;
    var self = this;

    // Parsear en DOM desechable.
    // Si el contenido son hijos de tabla (tbody/tr/td), envolver en <table> porque
    // <div> no es un padre válido para ellos y el navegador los descartaría. En
    // cambio, un documento normal (con <table> completas o sin ellas) se envuelve
    // en <div>: envolverlo en <table> activaría el "foster parenting" de HTML5, que
    // expulsa de la tabla todo el contenido no-tabla (h1/p/ul/texto) y vaciaría el root.
    var doc;
    var wrapperOpen, wrapperClose, rootSelector;
    if (tableInnards) {
      wrapperOpen = '<table id="__mewyse_root__">';
      wrapperClose = '</table>';
      rootSelector = 'table#__mewyse_root__';
    } else {
      wrapperOpen = '<div id="__mewyse_root__">';
      wrapperClose = '</div>';
      rootSelector = '#__mewyse_root__';
    }
    try {
      doc = new DOMParser().parseFromString(
        '<!DOCTYPE html><html><body>' + wrapperOpen + html + wrapperClose + '</body></html>',
        'text/html'
      );
    } catch (e) {
      return '';
    }
    var root = doc.querySelector(rootSelector);
    if (!root) return '';

    // Recorrer el árbol en profundidad y sanitizar cada elemento
    // Usamos un recorrido manual para poder eliminar/unwrapp nodos con seguridad
    function processNode(node) {
      // Nodo de texto: seguro tal cual
      if (node.nodeType === 3) return;
      // Nodo de comentario: eliminar
      if (node.nodeType === 8) {
        node.parentNode.removeChild(node);
        return;
      }
      if (node.nodeType !== 1) return;

      var tag = node.tagName.toUpperCase();

      // 1. Tag peligroso: eliminar con todos sus hijos
      // Excepción: si allowMedia=true, permitir IFRAME/VIDEO/AUDIO/SOURCE con src validado
      var isMediaTag = (tag === 'IFRAME' || tag === 'VIDEO' || tag === 'AUDIO' || tag === 'SOURCE');
      if (DANGEROUS_TAGS[tag] && !(allowMedia && isMediaTag)) {
        node.parentNode.removeChild(node);
        return;
      }

      // 2. Determinar si el tag está permitido según contexto
      var isAllowed = false;
      if (INLINE_TAGS[tag]) {
        isAllowed = true;
      } else if (allowTable && (TABLE_TAGS[tag] || BLOCK_TAGS_IN_CELL[tag])) {
        isAllowed = true;
      } else if (allowImg && tag === 'IMG') {
        isAllowed = true;
      } else if (allowTable && tag === 'IMG') {
        // Permitir imágenes dentro de celdas de tabla (valida src por seguridad)
        var imgSrc = node.getAttribute('src');
        if (self._isSafeImageUrl(imgSrc)) isAllowed = true;
        if (!isAllowed) { node.parentNode.removeChild(node); return; }
      } else if (allowMedia && isMediaTag) {
        // Validar src según tipo: IFRAME solo whitelist, VIDEO/AUDIO/SOURCE URLs seguras
        var srcAttr = node.getAttribute('src');
        if (tag === 'IFRAME') {
          if (self._isSafeEmbedUrl(srcAttr)) isAllowed = true;
        } else {
          if (self._isSafeMediaUrl(srcAttr)) isAllowed = true;
        }
        if (!isAllowed) {
          // Si no pasa validación, eliminar el nodo completo
          node.parentNode.removeChild(node);
          return;
        }
      }

      // Procesar hijos primero (antes de posible unwrap del padre)
      var child = node.firstChild;
      while (child) {
        var next = child.nextSibling;
        processNode(child);
        child = next;
      }

      if (!isAllowed) {
        // Unwrap: mover hijos al padre y eliminar el nodo.
        //
        // Caso especial — tags block-level (DIV, P, H*, BLOCKQUOTE, PRE, LI,
        // UL, OL, etc.) que se desempacan en un contexto inline: si solo
        // movemos los hijos arriba se pierde el salto de línea visual. Esto
        // afecta especialmente a contenido pegado o a Shift+Enter en algunos
        // navegadores que insertan <div> en lugar de <br>. Insertamos <br>
        // antes y/o después de los hijos para preservar la separación.
        var blockUnwrap = {
          DIV: 1, P: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1,
          BLOCKQUOTE: 1, PRE: 1, LI: 1, UL: 1, OL: 1, DL: 1, DT: 1, DD: 1,
          ARTICLE: 1, SECTION: 1, ASIDE: 1, HEADER: 1, FOOTER: 1, NAV: 1
        };
        var parent = node.parentNode;
        if (parent) {
          var needsBr = blockUnwrap[tag] && !!node.firstChild;
          if (needsBr) {
            var prev = node.previousSibling;
            var prevIsBr = prev && prev.nodeType === 1 && prev.tagName === 'BR';
            if (prev && !prevIsBr) {
              parent.insertBefore(doc.createElement('br'), node);
            }
          }
          while (node.firstChild) {
            parent.insertBefore(node.firstChild, node);
          }
          if (needsBr) {
            // Tras mover los hijos, node sigue ocupando su posición original
            // (los hijos quedaron antes). Su nextSibling es el original.
            var next = node.nextSibling;
            var nextIsBr = next && next.nodeType === 1 && next.tagName === 'BR';
            if (next && !nextIsBr) {
              parent.insertBefore(doc.createElement('br'), node);
            }
          }
          parent.removeChild(node);
        }
        return;
      }

      // 3. Tag permitido: limpiar atributos
      var tagWhitelist = ATTR_WHITELIST[tag] || {};
      // Recorrer atributos a la inversa (mutación segura)
      for (var i = node.attributes.length - 1; i >= 0; i--) {
        var attr = node.attributes[i];
        var attrName = attr.name.toLowerCase();

        // Event handlers: eliminar siempre (doble seguridad)
        if (attrName.indexOf('on') === 0) {
          node.removeAttribute(attr.name);
          continue;
        }
        // xmlns: eliminar
        if (attrName.indexOf('xmlns') === 0) {
          node.removeAttribute(attr.name);
          continue;
        }
        // Atributo no whitelisteado
        if (!tagWhitelist[attrName]) {
          node.removeAttribute(attr.name);
          continue;
        }

        // Validaciones especiales
        if (tag === 'A' && attrName === 'href') {
          if (!self._isSafeUrl(attr.value)) {
            node.setAttribute('href', '#');
          }
        } else if (tag === 'IMG' && attrName === 'src') {
          if (!self._isSafeImageUrl(attr.value)) {
            node.removeAttribute(attr.name);
          }
        } else if (attrName === 'style') {
          var clean = self._sanitizeStyle(attr.value);
          if (clean) {
            node.setAttribute('style', clean);
          } else {
            node.removeAttribute(attr.name);
          }
        } else if (tag === 'SPAN' && attrName === 'class') {
          // Filtrar clases: solo whitelisteadas
          var classes = attr.value.split(/\s+/);
          var okClasses = [];
          for (var j = 0; j < classes.length; j++) {
            if (ALLOWED_SPAN_CLASSES[classes[j]]) okClasses.push(classes[j]);
          }
          if (okClasses.length > 0) {
            node.setAttribute('class', okClasses.join(' '));
          } else {
            node.removeAttribute('class');
          }
        } else if (attrName === 'contenteditable') {
          // Solo permitir "false" (para mentions/emojis)
          if (attr.value !== 'false') node.removeAttribute(attr.name);
        } else if (attrName === 'data-merge-name') {
          // Nombre de variable: solo identificadores seguros (letras, dígitos,
          // guion bajo y punto). Cualquier otra cosa se descarta.
          if (!/^[\w.]+$/.test(attr.value)) node.removeAttribute(attr.name);
        } else if (attrName === 'target') {
          // Forzar rel="noopener noreferrer" si target="_blank"
          if (attr.value === '_blank') {
            node.setAttribute('rel', 'noopener noreferrer');
          }
        } else if (attrName === 'colspan' || attrName === 'rowspan') {
          // Asegurar que sea un número positivo razonable
          var num = parseInt(attr.value, 10);
          if (isNaN(num) || num < 1 || num > 1000) {
            node.removeAttribute(attr.name);
          } else {
            node.setAttribute(attrName, String(num));
          }
        }
      }
    }

    // Procesar hijos directos de root
    var c = root.firstChild;
    while (c) {
      var n = c.nextSibling;
      processNode(c);
      c = n;
    }

    // Limpieza defensiva: spans atómicos (mention/tag/emoji) sin contenido
    // textual son residuos típicos de operaciones donde un cursor cayó dentro
    // del span y un split/borrado partió el contenido. Sin texto, la cápsula
    // se ve como un círculo de color suelto. Los eliminamos del output.
    var emptyAtomic = root.querySelectorAll('span.mewyse-tag, span.mewyse-mention');
    for (var ea = 0; ea < emptyAtomic.length; ea++) {
      if (!emptyAtomic[ea].textContent) {
        emptyAtomic[ea].parentNode.removeChild(emptyAtomic[ea]);
      }
    }

    return root.innerHTML;
  };

  /**
   * Sanitiza un bloque individual: valida type, id, content según tipo.
   * @returns {Object|null} bloque sanitizado o null si es inválido
   */
  meWYSE.prototype._sanitizeBlock = function(block, fallbackId) {
    if (!block || typeof block !== 'object') return null;

    // Validar id (se hace ANTES del tipo: la rama de preservación lo necesita)
    var id = (typeof block.id === 'number' && isFinite(block.id)) ? block.id : fallbackId;
    if (typeof id !== 'number') id = ++this.currentBlockId;
    if (id > this.currentBlockId) this.currentBlockId = id;

    // Tipo de bloque DESCONOCIDO (string no vacío que no está en VALID_BLOCK_TYPES):
    // PRESERVAR el bloque íntegro en vez de coaccionarlo a un párrafo vacío (que
    // perdería el dato). Se guarda un clon seguro (JSON: sin funciones/prototipo)
    // con el id saneado; render lo pinta como placeholder de solo lectura (NUNCA
    // innerHTML del contenido crudo) y getJSON lo re-emite intacto (round-trip
    // fiel). Así, importar un JSON con tipos de otra versión o custom no destruye
    // contenido. Si el bloque no es serializable (p. ej. circular), se degrada a
    // párrafo vacío como red de seguridad.
    if (typeof block.type === 'string' && block.type !== '' && !VALID_BLOCK_TYPES[block.type]) {
      try {
        var v_preserved = JSON.parse(JSON.stringify(block));
        v_preserved.id = id;
        return v_preserved;
      } catch (e) {
        return { id: id, type: 'paragraph', content: '' };
      }
    }

    // Validar type (tipo válido conocido, o párrafo si venía sin tipo/no-string)
    var type = VALID_BLOCK_TYPES[block.type] ? block.type : 'paragraph';

    // Construir bloque limpio (descartando cualquier propiedad no esperada)
    var clean = { id: id, type: type, content: '' };

    // Procesar content según tipo
    if (type === 'image') {
      // content debe ser objeto con blob/fileName/width/height
      var c = block.content;
      if (!c || typeof c !== 'object') return null;
      if (typeof c.blob !== 'string' || !this._isSafeImageUrl(c.blob)) return null;
      var w = parseInt(c.width, 10);
      var h = parseInt(c.height, 10);
      clean.content = {
        blob: c.blob,
        fileName: typeof c.fileName === 'string' ? c.fileName.substring(0, 200) : 'image'
      };
      // Dimensiones OPCIONALES: solo se conservan si son válidas. Sin ellas la
      // imagen se renderiza a su tamaño natural (no se fuerzan 300x200). Es lo
      // que permite importar HTML sin width/height y mantenerlo así.
      if (!isNaN(w) && w >= 1) clean.content.width = Math.min(w, 10000);
      if (!isNaN(h) && h >= 1) clean.content.height = Math.min(h, 10000);
      // Preservar opciones avanzadas (border/margin/alignment) si existen y son válidas
      if (c.advanced && typeof c.advanced === 'object') {
        var adv = {};
        if (c.advanced.border && typeof c.advanced.border === 'object') {
          var bw = parseInt(c.advanced.border.width, 10);
          if (!isNaN(bw) && bw >= 0 && bw <= 50) {
            var validStyles = { solid: 1, dashed: 1, dotted: 1, double: 1, none: 1 };
            adv.border = {
              width: bw,
              style: validStyles[c.advanced.border.style] ? c.advanced.border.style : 'solid',
              color: /^#[0-9a-fA-F]{3,6}$/.test(c.advanced.border.color) ? c.advanced.border.color : '#000000'
            };
          }
        }
        if (c.advanced.margin && typeof c.advanced.margin === 'object') {
          // Formato nuevo (vertical/horizontal) + legacy (all), cada uno 0-200.
          var v_mgn = {};
          var mv = parseInt(c.advanced.margin.vertical, 10);
          var mh = parseInt(c.advanced.margin.horizontal, 10);
          var ma = parseInt(c.advanced.margin.all, 10);
          if (!isNaN(mv) && mv >= 0 && mv <= 200) v_mgn.vertical = mv;
          if (!isNaN(mh) && mh >= 0 && mh <= 200) v_mgn.horizontal = mh;
          // 'all' solo se conserva si no vino ningún eje explícito (dato antiguo).
          if (v_mgn.vertical == null && v_mgn.horizontal == null && !isNaN(ma) && ma >= 0 && ma <= 200) {
            v_mgn.all = ma;
          }
          if (v_mgn.vertical != null || v_mgn.horizontal != null || v_mgn.all != null) {
            adv.margin = v_mgn;
          }
        }
        if (typeof c.advanced.alignment === 'string') {
          var validAligns = { left: 1, center: 1, right: 1 };
          if (validAligns[c.advanced.alignment]) {
            adv.alignment = c.advanced.alignment;
          }
        }
        if (adv.border || adv.margin || adv.alignment) {
          clean.content.advanced = adv;
        }
      }
    } else if (type === 'code') {
      // No es HTML, solo texto plano (el render lo escapa/resalta).
      clean.content = typeof block.content === 'string' ? block.content : '';
      // Preservar el lenguaje solo si está en el set cerrado (y no es el vacío).
      if (typeof block.language === 'string' && block.language &&
          CODE_LANGUAGES.hasOwnProperty(block.language)) {
        clean.language = block.language;
      }
    } else if (type === 'table') {
      // El contenido de un bloque tabla es el INNER de la tabla (tbody/tr/td),
      // por eso se marca tableInnards para que se envuelva en <table> al parsear.
      clean.content = this._sanitizeBlockContent(
        typeof block.content === 'string' ? block.content : '',
        { allowTable: true, tableInnards: true }
      );
      // Preservar estilos de tabla (aplicados vía "Propiedades de la tabla")
      if (typeof block.tableStyle === 'string' && block.tableStyle) {
        var cleanTableStyle = this._sanitizeStyle(block.tableStyle);
        if (cleanTableStyle) clean.tableStyle = cleanTableStyle;
      }
    } else if (type === 'divider') {
      clean.content = '';
    } else if (type === 'pageBreak') {
      clean.content = '';
    } else if (type === 'toc') {
      // El contenido se deriva de los títulos; no se almacena.
      clean.content = '';
    } else if (type === 'callout') {
      // Contenido inline editable (como paragraph); la variante se valida aparte.
      clean.content = this._sanitizeBlockContent(
        typeof block.content === 'string' ? block.content : ''
      );
    } else if (type === 'toggle') {
      // Cuerpo (content) y título (toggleTitle) son HTML inline saneado; el
      // estado colapsado se preserva más abajo como booleano.
      clean.content = this._sanitizeBlockContent(
        typeof block.content === 'string' ? block.content : ''
      );
      clean.toggleTitle = this._sanitizeBlockContent(
        typeof block.toggleTitle === 'string' ? block.toggleTitle : ''
      );
    } else if (type === 'video') {
      // NUEVO modelo: content = URL (string); dimensiones en block.width/height.
      // Se acepta también el LEGACY (content objeto) migrándolo. `_videoInfoFromBlock`
      // deriva provider/videoId de la URL y valida que sea un vídeo reconocible.
      var vInfo = this._videoInfoFromBlock(block);
      if (!vInfo) return null;
      if (vInfo.provider === 'file' && !this._isSafeMediaUrl(vInfo.url)) return null;
      // content queda SOLO con la URL
      clean.content = vInfo.url;
      // Dimensiones como propiedades de bloque (whitelist)
      clean.width = vInfo.width;
      clean.height = vInfo.height;
    } else if (type === 'audio') {
      // content: { url, title }
      var ac = block.content;
      if (!ac || typeof ac !== 'object') return null;
      if (!this._isSafeMediaUrl(ac.url)) return null;
      clean.content = {
        url: ac.url,
        title: (typeof ac.title === 'string') ? ac.title.substring(0, 200) : ''
      };
    } else {
      // paragraph, heading1-3, quote, bulletList, numberList, checklist
      clean.content = this._sanitizeBlockContent(
        typeof block.content === 'string' ? block.content : ''
      );
    }

    // Preservar propiedades opcionales whitelisteadas
    if (type === 'checklist' && block.checked === true) {
      clean.checked = true;
    }
    if (type === 'callout') {
      // Variante validada contra el set cerrado (default info).
      clean.calloutVariant = CALLOUT_VARIANTS[block.calloutVariant] ? block.calloutVariant : 'info';
    }
    if (type === 'toggle' && block.collapsed === true) {
      clean.collapsed = true;
    }
    if (typeof block.alignment === 'string') {
      var align = block.alignment.toLowerCase();
      if (align === 'left' || align === 'center' || align === 'right' || align === 'justify') {
        clean.alignment = align;
      }
    }
    // Preservar customClass (estilos custom via styleFormats) solo si está en el whitelist
    if (typeof block.customClass === 'string' && this._customClassWhitelist &&
        this._customClassWhitelist[block.customClass]) {
      clean.customClass = block.customClass;
    }
    // Preservar indentLevel en listas (0-5)
    if ((type === 'bulletList' || type === 'numberList' || type === 'checklist') &&
        typeof block.indentLevel === 'number') {
      var lvl = Math.floor(block.indentLevel);
      if (!isNaN(lvl) && lvl >= 0 && lvl <= 5) {
        clean.indentLevel = lvl;
      }
    }

    // Preservar sangría de párrafo (block.indent, 1-INDENT_MAX) en bloques de texto.
    if (INDENTABLE_TEXT_BLOCK_TYPES[type] && typeof block.indent === 'number') {
      var v_ind = Math.floor(block.indent);
      if (!isNaN(v_ind) && v_ind >= 1 && v_ind <= INDENT_MAX) {
        clean.indent = v_ind;
      }
    }

    return clean;
  };

  /**
   * Sanitiza un array de bloques. Filtra los inválidos.
   */
  meWYSE.prototype._sanitizeBlocks = function(blocks) {
    if (!Array.isArray(blocks)) return [];
    var result = [];
    // Primera pasada: actualizar currentBlockId con todos los ids válidos
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (b && typeof b.id === 'number' && b.id > this.currentBlockId) {
        this.currentBlockId = b.id;
      }
    }
    // Segunda pasada: sanitizar y deduplicar ids. Dos bloques con el mismo id
    // dejarían el segundo inalcanzable para getBlock/getBlockIndex, así que al
    // detectar colisión se reasigna un id fresco (currentBlockId ya está en el
    // máximo tras la primera pasada).
    var v_seen = {};
    for (var j = 0; j < blocks.length; j++) {
      var clean = this._sanitizeBlock(blocks[j], ++this.currentBlockId);
      if (clean) {
        if (v_seen[clean.id]) {
          clean.id = ++this.currentBlockId;
        }
        v_seen[clean.id] = true;
        result.push(clean);
      }
    }
    return result;
  };

  /**
   * Devuelve el HTML de salida ya sanitizado, seguro para insertar en otra app.
   */
  meWYSE.prototype.getSafeHTML = function() {
    var raw = this.getHTML();
    return this._sanitizeBlockContent(raw, { allowTable: true, allowImg: true, allowMedia: true });
  };

  /**
   * Hoja de estilos autocontenida para imprimir / exportar el documento (sin
   * el chrome del editor). Se usa en print() y exportWord().
   * @returns {string} CSS
   */
  meWYSE.prototype._documentStyles = function() {
    return [
      'body{font-family:system-ui,Segoe UI,Arial,sans-serif;color:#111;line-height:1.5;',
      'max-width:800px;margin:24px auto;padding:0 16px;}',
      'h1,h2,h3{line-height:1.25;margin:1em 0 .4em;}h1{font-size:2em}h2{font-size:1.5em}h3{font-size:1.2em}',
      'p{margin:0 0 .6em}blockquote{border-left:3px solid #ccc;margin:0 0 .6em;padding:.3em 1em;color:#444}',
      'pre{background:#f5f5f5;border:1px solid #e0e0e0;border-radius:6px;padding:.75em 1em;overflow:auto}',
      'code{font-family:Consolas,monospace;font-size:.9em}',
      'ul,ol{margin:0 0 .6em;padding-left:1.5em}',
      'table{border-collapse:collapse;width:100%;margin:0 0 .6em}td,th{border:1px solid #ccc;padding:6px 8px}',
      'img{max-width:100%;height:auto}',
      '.mewyse-callout{border-left:3px solid #2563eb;background:#eff4ff;border-radius:6px;padding:.6em .9em;margin:0 0 .6em}',
      '.mewyse-callout-warning{border-left-color:#d97706;background:#fff7ed}',
      '.mewyse-callout-success{border-left-color:#16a34a;background:#f0fdf4}',
      '.mewyse-callout-danger{border-left-color:#dc2626;background:#fef2f2}',
      '.mewyse-page-break{break-after:page;page-break-after:always;border:0}'
    ].join('');
  };

  /**
   * Imprime SOLO el documento (sin toolbar/handles/menús): el HTML fiel del
   * modelo + la hoja de estilos de documento.
   *
   * Método principal = IFRAME OCULTO en la misma página (como TinyMCE): un
   * iframe NO es un popup, así que no lo bloquea el navegador ni depende de
   * permisos, y no abre pestaña/ventana nueva. Fallback = window.open (por si
   * el contentDocument no estuviera disponible en algún sandbox/navegador
   * antiguo). Si ambos fallan, avisa en consola en vez de fallar en silencio.
   *
   * getHTML (no getSafeHTML): el modelo ya está saneado en su frontera de
   * confianza (constructor/loadFromJSON/loadFromHTML/paste), y getSafeHTML
   * aplanaría los wrappers de bloque (salto de pagina, callout, toc) y el
   * divider al re-sanear el documento completo.
   */
  meWYSE.prototype.print = function() {
    var v_doc_html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
      escapeHtml(document.title || 'Documento') + '</title><style>' +
      this._documentStyles() + '</style></head><body>' + this.getHTML() +
      '</body></html>';

    // 1) Intento principal: iframe oculto (sin popups).
    if (this._printWithIframe(v_doc_html)) return;

    // 2) Fallback: ventana nueva (puede requerir permitir popups).
    if (this._printWithWindow(v_doc_html)) return;

    // 3) Ninguna vía disponible: avisar (no fallar en silencio).
    if (window.console && console.warn) {
      console.warn('meWYSE: no se pudo imprimir (iframe y ventana bloqueados).');
    }
  };

  /**
   * Imprime el documento con un iframe oculto inyectado en la misma página.
   * Limpia el iframe tras imprimir (onafterprint) con un timeout de respaldo.
   * @param {string} v_doc_html - documento HTML completo a imprimir
   * @returns {boolean} true si pudo lanzar la impresión; false si no fue viable
   */
  meWYSE.prototype._printWithIframe = function(v_doc_html) {
    try {
      var v_iframe = document.createElement('iframe');
      // Fuera de pantalla, sin ocupar layout ni ser visible.
      v_iframe.setAttribute('aria-hidden', 'true');
      v_iframe.style.cssText =
        'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
      document.body.appendChild(v_iframe);

      var v_win = v_iframe.contentWindow;
      var v_idoc = v_iframe.contentDocument ||
        (v_win && v_win.document);
      if (!v_idoc || !v_win) {
        // No hay acceso al documento del iframe: no viable.
        if (v_iframe.parentNode) v_iframe.parentNode.removeChild(v_iframe);
        return false;
      }

      // Limpieza idempotente del iframe (una sola vez).
      var v_cleaned = false;
      var v_cleanup = function() {
        if (v_cleaned) return;
        v_cleaned = true;
        if (v_iframe.parentNode) v_iframe.parentNode.removeChild(v_iframe);
      };

      // Lanza la impresión cuando el contenido está listo.
      var v_do_print = function() {
        try {
          v_win.focus();
          // Al terminar (o cancelar) el diálogo, retirar el iframe.
          v_win.onafterprint = v_cleanup;
          v_win.print();
        } catch (e) {
          v_cleanup();
          return;
        }
        // Respaldo: si onafterprint no dispara (algunos navegadores), limpiar
        // igualmente pasado un margen amplio.
        setTimeout(v_cleanup, 60000);
      };

      v_idoc.open();
      v_idoc.write(v_doc_html);
      v_idoc.close();

      // Dar margen a que el layout/imágenes carguen antes de imprimir.
      if (v_idoc.readyState === 'complete') {
        setTimeout(v_do_print, 300);
      } else {
        v_iframe.onload = function() { setTimeout(v_do_print, 300); };
        // Respaldo por si onload no llega (documento ya escrito inline).
        setTimeout(v_do_print, 500);
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Fallback de impresión con ventana/pestaña nueva (puede requerir permitir
   * popups). Solo se usa si el iframe no fue viable.
   * @param {string} v_doc_html - documento HTML completo a imprimir
   * @returns {boolean} true si pudo abrir la ventana y lanzar print
   */
  meWYSE.prototype._printWithWindow = function(v_doc_html) {
    try {
      var v_win = window.open('', '_blank');
      if (!v_win) return false; // popup bloqueado
      var v_doc = v_win.document;
      v_doc.open();
      v_doc.write(v_doc_html);
      v_doc.close();
      v_win.focus();
      setTimeout(function() { try { v_win.print(); } catch (e) {} }, 300);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Exporta el documento a un archivo .doc (Word abre HTML con cabecera MHTML).
   * Sin librerías: parte de getSafeHTML() y descarga vía Blob.
   * @param {string} filename - nombre sin extensión (default 'documento')
   */
  meWYSE.prototype.exportWord = function(filename) {
    // getHTML (no getSafeHTML): documento fiel desde el modelo ya saneado
    // (ver nota en print). Evita perder salto de pagina/callout/toc/divider.
    var v_html = this.getHTML();
    var v_pre = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
      'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
      'xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8">' +
      '<style>' + this._documentStyles() + '</style></head><body>';
    var v_full = v_pre + v_html + '</body></html>';
    var v_name = (typeof filename === 'string' && filename ? filename : 'documento') + '.doc';
    try {
      var v_blob = new Blob(['﻿', v_full], { type: 'application/msword' });
      var v_url = URL.createObjectURL(v_blob);
      var v_a = document.createElement('a');
      v_a.href = v_url;
      v_a.download = v_name;
      document.body.appendChild(v_a);
      v_a.click();
      document.body.removeChild(v_a);
      setTimeout(function() { URL.revokeObjectURL(v_url); }, 1000);
    } catch (e) {}
  };

  /**
   * Carga un script externo una sola vez (deps OPCIONALES lazy). El callback
   * recibe true si cargó, false si falló. ES5, sin Promise.
   * @param {string} url
   * @param {Function} cb
   */
  /**
   * Devuelve el HTML resaltado de un fragmento de código. Si highlight.js está
   * disponible usa el lenguaje indicado (o auto-detección); si no, cae a texto
   * escapado. El resultado es siempre HTML seguro (hljs escapa las entidades).
   * @param {string} v_text - código en texto plano
   * @param {string} v_language - id de lenguaje (o vacío = auto)
   * @returns {string} HTML resaltado o escapado
   */
  meWYSE.prototype._highlightCode = function(v_text, v_language) {
    var v_source = (typeof v_text === 'string') ? v_text : '';
    if (window.hljs) {
      try {
        if (v_language && v_language !== 'plaintext' &&
            window.hljs.getLanguage && window.hljs.getLanguage(v_language)) {
          return window.hljs.highlight(v_source, { language: v_language }).value;
        }
        if (!v_language) {
          return window.hljs.highlightAuto(v_source).value;
        }
      } catch (e) { /* fallback a texto escapado */ }
    }
    return escapeHtml(v_source);
  };

  /**
   * Re-pinta el resaltado de un bloque de código concreto sin re-renderizar todo.
   * Se llama al perder el foco y al cambiar el lenguaje. Lee el modelo (texto
   * plano) y escribe el HTML resaltado directamente en el <code>.
   * @param {HTMLElement} v_code_el - el elemento <code> del bloque
   * @param {number} v_block_id
   */
  meWYSE.prototype._rehighlightCodeElement = function(v_code_el, v_block_id) {
    if (!this.codeHighlight || !v_code_el) return;
    var v_block = this.getBlock(v_block_id);
    if (!v_block || v_block.type !== 'code') return;
    var v_text = (typeof v_block.content === 'string') ? v_block.content : '';
    if (window.hljs) {
      v_code_el.innerHTML = this._highlightCode(v_text, v_block.language);
    } else {
      v_code_el.textContent = v_text;
    }
  };

  /**
   * Carga (lazy, una sola vez) la librería de resaltado si la feature está activa
   * y aún no está en window. Al terminar, re-pinta todos los bloques de código ya
   * renderizados. Sin lib (o error de carga) los bloques quedan en texto plano.
   */
  meWYSE.prototype._initCodeHighlight = function() {
    if (!this.codeHighlight || !this.codeHighlightUrl) return;
    if (window.hljs) return; // ya disponible: el render inicial ya resaltó
    var self = this;
    this._loadScriptOnce(this.codeHighlightUrl, function(ok) {
      if (!ok || !window.hljs || self._destroyed || !self.container) return;
      // Re-pintar los bloques de código ya presentes en el DOM
      var v_codes = self.container.querySelectorAll('code[data-mewyse-code="1"]');
      for (var i = 0; i < v_codes.length; i++) {
        var v_blk_el = v_codes[i].closest('.mewyse-block');
        if (!v_blk_el) continue;
        var v_id = parseInt(v_blk_el.getAttribute('data-block-id'), 10);
        if (!isNaN(v_id)) self._rehighlightCodeElement(v_codes[i], v_id);
      }
    });
  };

  meWYSE.prototype._loadScriptOnce = function(url, cb) {
    if (!url) { cb(false); return; }
    if (!this._loadedScripts) this._loadedScripts = {};
    var state = this._loadedScripts[url];
    if (state === 'loaded') { cb(true); return; }
    var existing = document.querySelector('script[data-mewyse-lib="' + url + '"]');
    if (existing) {
      existing.addEventListener('load', function() { cb(true); });
      existing.addEventListener('error', function() { cb(false); });
      return;
    }
    var self = this;
    var s = document.createElement('script');
    s.src = url;
    s.setAttribute('data-mewyse-lib', url);
    s.onload = function() { self._loadedScripts[url] = 'loaded'; cb(true); };
    s.onerror = function() { self._loadedScripts[url] = 'error'; cb(false); };
    this._loadedScripts[url] = 'loading';
    document.head.appendChild(s);
  };

  /**
   * Exporta a PDF. Si hay `pdfLib` (URL de html2pdf.js) la carga lazy y genera el
   * PDF desde getHTML() (documento fiel desde el modelo saneado); si no hay lib o
   * falla, cae a print() (el usuario elige "Guardar como PDF" del navegador).
   * @param {string} filename - nombre sin extensión (default 'documento')
   */
  meWYSE.prototype.exportPdf = function(filename) {
    var self = this;
    var v_name = (typeof filename === 'string' && filename ? filename : 'documento') + '.pdf';
    var v_fallback = function() { self.print(); };
    if (!this.pdfLib) { v_fallback(); return; }
    this._loadScriptOnce(this.pdfLib, function(ok) {
      if (!ok || typeof window.html2pdf === 'undefined') { v_fallback(); return; }
      try {
        var wrap = document.createElement('div');
        // getHTML (no getSafeHTML): documento fiel desde el modelo ya saneado
        // (ver nota en print). Evita perder salto de pagina/callout/toc/divider.
        wrap.innerHTML = '<style>' + self._documentStyles() + '</style>' + self.getHTML();
        window.html2pdf().set({ filename: v_name, margin: 10 }).from(wrap).save();
      } catch (e) { v_fallback(); }
    });
  };

  /**
   * ============================================
   * MODAL DE PROPIEDADES DE TABLA
   * ============================================
   * Permite editar: width, height, cell-spacing, cell-padding,
   * border (width/style/color), alignment, background-color
   */
  meWYSE.prototype.showTablePropertiesModal = function(blockId) {
    var self = this;
    var block = this.getBlock(blockId);
    if (!block || block.type !== 'table') return;

    var blockElement = this.getBlockElementById(blockId);
    if (!blockElement) return;
    var table = blockElement.querySelector('table');
    if (!table) return;

    var t = function(key) { return self.t('tableProperties.' + key); };

    // Leer valores actuales de la tabla
    var current = self._readTableProperties(table);

    // Crear overlay
    var overlay = document.createElement('div');
    overlay.className = 'mewyse-modal-overlay';

    // Contenedor
    var modal = document.createElement('div');
    modal.className = 'mewyse-modal-container mewyse-table-properties-modal';
    self._applyMenuTheme(modal); // dark mode si el editor está en oscuro

    // Título
    var title = document.createElement('h3');
    title.className = 'mewyse-modal-title';
    title.textContent = t('title');
    modal.appendChild(title);

    // Contenedor de campos (grid 2 columnas)
    var grid = document.createElement('div');
    grid.className = 'mewyse-table-properties-grid';

    // --- Ancho / Alto (aceptan px, %, auto o vacío) ---
    var widthInput = self._makeDimensionInput(current.width, '500px / 100% / auto');
    var heightInput = self._makeDimensionInput(current.height, '300px / auto');
    grid.appendChild(self._makeField(t('width'), widthInput));
    grid.appendChild(self._makeField(t('height'), heightInput));

    // --- Espacio entre celdas / Relleno de celda ---
    // Vacíos = no modificar el valor actual de las celdas / tabla
    var spacingInput = self._makeNumberInput(current.cellSpacing, 0);
    var paddingInput = self._makeNumberInput(current.cellPadding, 0);
    grid.appendChild(self._makeField(t('cellSpacing'), spacingInput));
    grid.appendChild(self._makeField(t('cellPadding'), paddingInput));

    // --- Borde: grosor / estilo / color ---
    // Vacío = no modificar el borde de las celdas
    var borderWidthInput = self._makeNumberInput(current.borderWidth, 0);
    var borderStyleSelect = document.createElement('select');
    borderStyleSelect.className = 'mewyse-modal-input';
    var styles = [
      { value: 'solid', label: t('styleSolid') },
      { value: 'dashed', label: t('styleDashed') },
      { value: 'dotted', label: t('styleDotted') },
      { value: 'double', label: t('styleDouble') },
      { value: 'none', label: t('styleNone') }
    ];
    styles.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.value;
      opt.textContent = s.label;
      if (s.value === current.borderStyle) opt.selected = true;
      borderStyleSelect.appendChild(opt);
    });
    // Border color con tracking userSet (patrón similar al bg)
    var borderColorInput = document.createElement('input');
    borderColorInput.type = 'color';
    borderColorInput.className = 'mewyse-modal-input mewyse-modal-color';
    borderColorInput.value = current.borderColor || '#dddddd';
    var borderColorWrapper = document.createElement('div');
    borderColorWrapper.className = 'mewyse-modal-color-wrap';
    borderColorWrapper.appendChild(borderColorInput);
    var borderColorClearBtn = document.createElement('button');
    borderColorClearBtn.type = 'button';
    borderColorClearBtn.className = 'mewyse-modal-btn-small';
    borderColorClearBtn.textContent = t('reset');
    borderColorClearBtn.onclick = function() {
      borderColorInput.value = '#dddddd';
      borderColorInput.dataset.userSet = 'false';
    };
    borderColorInput.oninput = function() {
      borderColorInput.dataset.userSet = 'true';
    };
    borderColorInput.dataset.userSet = current.borderColor ? 'true' : 'false';
    borderColorWrapper.appendChild(borderColorClearBtn);

    grid.appendChild(self._makeField(t('borderWidth'), borderWidthInput));
    grid.appendChild(self._makeField(t('borderStyle'), borderStyleSelect));
    grid.appendChild(self._makeField(t('borderColor'), borderColorWrapper));

    // --- Alineación ---
    var alignSelect = document.createElement('select');
    alignSelect.className = 'mewyse-modal-input';
    var aligns = [
      { value: 'left', label: t('alignLeft') },
      { value: 'center', label: t('alignCenter') },
      { value: 'right', label: t('alignRight') }
    ];
    aligns.forEach(function(a) {
      var opt = document.createElement('option');
      opt.value = a.value;
      opt.textContent = a.label;
      if (a.value === current.alignment) opt.selected = true;
      alignSelect.appendChild(opt);
    });
    grid.appendChild(self._makeField(t('alignment'), alignSelect));

    // --- Color de fondo ---
    var bgColorInput = document.createElement('input');
    bgColorInput.type = 'color';
    bgColorInput.className = 'mewyse-modal-input mewyse-modal-color';
    bgColorInput.value = current.backgroundColor || '#ffffff';
    // Checkbox para "sin fondo"
    var bgWrapper = document.createElement('div');
    bgWrapper.className = 'mewyse-modal-color-wrap';
    bgWrapper.appendChild(bgColorInput);
    var bgClearBtn = document.createElement('button');
    bgClearBtn.type = 'button';
    bgClearBtn.className = 'mewyse-modal-btn-small';
    bgClearBtn.textContent = t('reset');
    bgClearBtn.onclick = function() {
      bgColorInput.value = '#ffffff';
      bgColorInput.removeAttribute('data-user-set');
      bgColorInput.dataset.userSet = 'false';
    };
    bgColorInput.oninput = function() {
      bgColorInput.dataset.userSet = 'true';
    };
    // Marcar si había color al abrir
    bgColorInput.dataset.userSet = current.backgroundColor ? 'true' : 'false';
    bgWrapper.appendChild(bgClearBtn);
    grid.appendChild(self._makeField(t('backgroundColor'), bgWrapper));

    modal.appendChild(grid);

    // --- Botones Aplicar / Cancelar ---
    var buttons = document.createElement('div');
    buttons.className = 'mewyse-modal-buttons';

    // Cierre unificado: quita el overlay del DOM y desregistra el listener de
    // Escape, sea cual sea la vía de cierre (Cancelar/Aplicar/overlay/Escape).
    var cerrar_modal = function() {
      if (overlay.parentNode) document.body.removeChild(overlay);
      document.removeEventListener('keydown', escHandler);
    };

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'mewyse-modal-button mewyse-modal-button-cancel';
    cancelBtn.textContent = t('cancel');
    cancelBtn.onclick = function() { cerrar_modal(); };

    var applyBtn = document.createElement('button');
    applyBtn.type = 'button';
    applyBtn.className = 'mewyse-modal-button mewyse-modal-button-primary';
    applyBtn.textContent = t('apply');
    applyBtn.onclick = function() {
      self.pushHistory(true);
      self._applyTableProperties(blockId, table, {
        width: widthInput.value,
        height: heightInput.value,
        cellSpacing: spacingInput.value,
        cellPadding: paddingInput.value,
        borderWidth: borderWidthInput.value,
        borderStyle: borderStyleSelect.value,
        borderColor: borderColorInput.value,
        borderColorUserSet: borderColorInput.dataset.userSet === 'true',
        alignment: alignSelect.value,
        backgroundColor: bgColorInput.value,
        backgroundColorUserSet: bgColorInput.dataset.userSet === 'true'
      });
      cerrar_modal();
    };

    buttons.appendChild(cancelBtn);
    buttons.appendChild(applyBtn);
    modal.appendChild(buttons);

    overlay.appendChild(modal);
    // Cerrar al click fuera
    overlay.onclick = function(e) {
      if (e.target === overlay) cerrar_modal();
    };
    // Escape para cerrar
    var escHandler = function(e) {
      if (e.key === 'Escape') {
        cerrar_modal();
      }
    };
    document.addEventListener('keydown', escHandler);

    document.body.appendChild(overlay);
  };

  /**
   * Helper: crea un <input type="number"> con valor inicial
   */
  meWYSE.prototype._makeNumberInput = function(value, min) {
    var input = document.createElement('input');
    input.type = 'number';
    input.className = 'mewyse-modal-input';
    if (typeof min === 'number') input.min = String(min);
    if (value !== undefined && value !== null && value !== '') {
      input.value = String(value);
    }
    return input;
  };

  /**
   * Helper: crea un <input type="text"> para dimensiones CSS (px/%/auto/vacío)
   * Acepta: "500", "500px", "100%", "auto", "" (vacío = sin declaración)
   */
  meWYSE.prototype._makeDimensionInput = function(value, placeholder) {
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'mewyse-modal-input';
    if (placeholder) input.placeholder = placeholder;
    if (value !== undefined && value !== null && value !== '') {
      input.value = String(value);
    }
    return input;
  };

  /**
   * Normaliza un valor de dimensión del usuario a un string CSS válido.
   * - "" / null → null (no aplicar)
   * - "500" → "500px"
   * - "500px", "100%", "auto" → tal cual
   * - "abc" → null (inválido)
   */
  meWYSE.prototype._normalizeDimension = function(value) {
    if (value === undefined || value === null) return null;
    var trimmed = String(value).trim();
    if (trimmed === '') return null;
    if (/^auto$/i.test(trimmed)) return 'auto';
    if (/^\d+(\.\d+)?%$/.test(trimmed)) return trimmed;
    if (/^\d+(\.\d+)?px$/.test(trimmed)) return trimmed;
    if (/^\d+(\.\d+)?$/.test(trimmed)) return trimmed + 'px';
    return null;
  };

  /**
   * Helper: crea un <div> con label + input
   */
  meWYSE.prototype._makeField = function(labelText, inputEl) {
    var wrap = document.createElement('div');
    wrap.className = 'mewyse-modal-input-group';
    var label = document.createElement('label');
    label.textContent = labelText;
    wrap.appendChild(label);
    wrap.appendChild(inputEl);
    return wrap;
  };

  /**
   * Lee las propiedades visuales actuales de una tabla
   * @returns {Object} { width, height, cellSpacing, cellPadding,
   *                     borderWidth, borderStyle, borderColor,
   *                     alignment, backgroundColor }
   */
  meWYSE.prototype._readTableProperties = function(table) {
    var self = this;
    var result = {
      width: '', height: '',
      cellSpacing: '', cellPadding: '',
      borderWidth: '', borderStyle: 'solid', borderColor: '',
      alignment: 'left', backgroundColor: ''
    };

    // Ancho/alto: preservar la unidad original (px, %, auto) si está declarada inline
    var inlineStyle = table.getAttribute('style') || '';
    var widthMatch = inlineStyle.match(/\bwidth\s*:\s*([^;]+)/i);
    var heightMatch = inlineStyle.match(/\bheight\s*:\s*([^;]+)/i);
    if (widthMatch) {
      result.width = widthMatch[1].trim();
    }
    if (heightMatch) {
      result.height = heightMatch[1].trim();
    }

    // Border-collapse y spacing
    var bc = inlineStyle.match(/\bborder-collapse\s*:\s*([^;]+)/i);
    var collapsed = !bc || /collapse/i.test(bc[1]);
    if (!collapsed) {
      var sp = inlineStyle.match(/\bborder-spacing\s*:\s*([^;]+)/i);
      if (sp) result.cellSpacing = parseInt(sp[1], 10) || 0;
    }

    // Cell padding: leer del primer <td>/<th>
    var firstCell = table.querySelector('td, th');
    if (firstCell) {
      var cellInline = firstCell.getAttribute('style') || '';
      var padMatch = cellInline.match(/\bpadding\s*:\s*([^;]+)/i);
      if (padMatch) {
        result.cellPadding = parseInt(padMatch[1], 10) || 0;
      }
    }

    // Borde: leer del primer <td>/<th> (preferencia) o de la tabla
    var borderTarget = firstCell || table;
    var btInline = borderTarget.getAttribute('style') || '';
    var borderShort = btInline.match(/\bborder\s*:\s*([^;]+)/i);
    if (borderShort) {
      var bv = borderShort[1];
      var wm = bv.match(/(\d+)px/);
      var sm = bv.match(/\b(solid|dashed|dotted|double|none)\b/);
      var cm = bv.match(/#[0-9a-fA-F]{3,6}|rgb\([^)]+\)/);
      if (wm) result.borderWidth = parseInt(wm[1], 10);
      if (sm) result.borderStyle = sm[1];
      if (cm) result.borderColor = self._colorToHex(cm[0]);
    } else {
      var bw = btInline.match(/\bborder-width\s*:\s*(\d+)/i);
      var bs = btInline.match(/\bborder-style\s*:\s*([a-z]+)/i);
      var bcl = btInline.match(/\bborder-color\s*:\s*([^;]+)/i);
      if (bw) result.borderWidth = parseInt(bw[1], 10);
      if (bs) result.borderStyle = bs[1];
      if (bcl) result.borderColor = self._colorToHex(bcl[1].trim());
    }

    // Alineación: margin-left: auto & margin-right: auto → center. float → left/right.
    var ma = inlineStyle.match(/\bmargin\s*:\s*([^;]+)/i);
    var mLeft = inlineStyle.match(/\bmargin-left\s*:\s*([^;]+)/i);
    var mRight = inlineStyle.match(/\bmargin-right\s*:\s*([^;]+)/i);
    var flt = inlineStyle.match(/\bfloat\s*:\s*([^;]+)/i);
    if (flt) {
      if (/left/i.test(flt[1])) result.alignment = 'left';
      else if (/right/i.test(flt[1])) result.alignment = 'right';
    } else if ((mLeft && /auto/i.test(mLeft[1]) && mRight && /auto/i.test(mRight[1])) ||
               (ma && /auto/i.test(ma[1]))) {
      result.alignment = 'center';
    } else {
      result.alignment = 'left';
    }

    // Background color
    var bgMatch = inlineStyle.match(/\bbackground-color\s*:\s*([^;]+)/i);
    if (bgMatch) {
      result.backgroundColor = self._colorToHex(bgMatch[1].trim());
    }

    return result;
  };

  /**
   * Convierte color CSS (rgb, nombre, hex3) a hex6
   */
  meWYSE.prototype._colorToHex = function(color) {
    if (!color) return '';
    color = color.trim();
    if (color.indexOf('#') === 0) {
      if (color.length === 4) {
        // #abc → #aabbcc
        return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
      }
      return color.toLowerCase();
    }
    var rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (rgbMatch) {
      var toHex = function(n) {
        var h = parseInt(n, 10).toString(16);
        return h.length === 1 ? '0' + h : h;
      };
      return '#' + toHex(rgbMatch[1]) + toHex(rgbMatch[2]) + toHex(rgbMatch[3]);
    }
    // Nombres CSS: usar un div temporal para que el navegador los normalice
    var tmp = document.createElement('div');
    tmp.style.color = color;
    document.body.appendChild(tmp);
    var computed = window.getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    var computedMatch = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (computedMatch) {
      var toHex2 = function(n) {
        var h = parseInt(n, 10).toString(16);
        return h.length === 1 ? '0' + h : h;
      };
      return '#' + toHex2(computedMatch[1]) + toHex2(computedMatch[2]) + toHex2(computedMatch[3]);
    }
    return '';
  };

  /**
   * Aplica las propiedades seleccionadas a la tabla del DOM y actualiza el modelo.
   * Los estilos del <table> se guardan en block.tableStyle (persistido en el modelo);
   * los estilos de las celdas van en el innerHTML como hasta ahora.
   */
  meWYSE.prototype._applyTableProperties = function(blockId, table, props) {
    // Construir style string para la tabla (se guarda en block.tableStyle)
    // Reglas: si un campo está vacío, se omite la declaración CSS correspondiente.
    var tableStyles = [];

    // Width: normalizar unidad (px/%/auto). Vacío → no declarar.
    var normWidth = this._normalizeDimension(props.width);
    if (normWidth) tableStyles.push('width: ' + normWidth);

    var normHeight = this._normalizeDimension(props.height);
    if (normHeight) tableStyles.push('height: ' + normHeight);

    // Cell spacing — si vacío, no declarar border-collapse/spacing
    var spacingStr = (props.cellSpacing || '').toString().trim();
    if (spacingStr !== '') {
      var spacing = parseInt(spacingStr, 10);
      if (!isNaN(spacing) && spacing > 0) {
        tableStyles.push('border-collapse: separate');
        tableStyles.push('border-spacing: ' + spacing + 'px');
      } else {
        tableStyles.push('border-collapse: collapse');
      }
    }

    // Alineación: solo generar declaración si != 'left' (default del navegador)
    if (props.alignment === 'center') {
      tableStyles.push('margin-left: auto');
      tableStyles.push('margin-right: auto');
    } else if (props.alignment === 'right') {
      tableStyles.push('margin-left: auto');
      tableStyles.push('margin-right: 0');
    }
    // alignment === 'left' → no añadir margins (es el comportamiento default)

    // Background color: solo si userSet=true
    if (props.backgroundColorUserSet && props.backgroundColor) {
      tableStyles.push('background-color: ' + props.backgroundColor);
    }

    var tableStyleStr = tableStyles.join('; ');

    // ---- Aplicar a celdas ----
    // Semántica: si borderWidth/cellPadding están VACÍOS, preservar el valor
    // inline actual de cada celda. Solo si el usuario puso un valor explícito,
    // sobreescribir. Para borderColor: si userSet=false, preservar el color actual.
    var cells = table.querySelectorAll('td, th');
    var borderWidthStr = (props.borderWidth || '').toString().trim();
    var cellPaddingStr = (props.cellPadding || '').toString().trim();
    var borderWidth = parseInt(borderWidthStr, 10);
    var cellPadding = parseInt(cellPaddingStr, 10);
    var hasBorderWidth = borderWidthStr !== '' && !isNaN(borderWidth);
    var hasCellPadding = cellPaddingStr !== '' && !isNaN(cellPadding);
    var borderStyleChanged = !!props.borderStyle;

    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var existingStyle = cell.getAttribute('style') || '';

      // Extraer declaraciones existentes
      var existingMap = this._parseStyleMap(existingStyle);

      // Aplicar border solo si el usuario puso width o cambió color (userSet)
      if (hasBorderWidth || props.borderColorUserSet ||
          (borderStyleChanged && existingMap.border)) {
        // Componer el border nuevo, mezclando user values con defaults razonables
        var useWidth = hasBorderWidth ? borderWidth :
          (this._extractBorderWidth(existingMap.border) || 1);
        var useStyle = props.borderStyle || 'solid';
        var useColor = props.borderColorUserSet ? props.borderColor :
          (this._extractBorderColor(existingMap.border) || '#dddddd');

        if (useStyle === 'none' || useWidth === 0) {
          existingMap.border = 'none';
        } else {
          existingMap.border = useWidth + 'px ' + useStyle + ' ' + useColor;
        }
      }

      // Aplicar padding solo si el usuario puso valor
      if (hasCellPadding) {
        existingMap.padding = cellPadding + 'px';
      }

      // Reconstruir style string (conservando otras props como background-color
      // que pudieran estar ya definidas por el color-picker de celda)
      cell.setAttribute('style', this._serializeStyleMap(existingMap));
    }

    // Guardar el estilo de la tabla en el modelo
    var block = this.getBlock(blockId);
    if (block) {
      if (tableStyleStr) {
        block.tableStyle = tableStyleStr;
      } else {
        delete block.tableStyle;
      }
    }

    // Guardar innerHTML con los estilos de celdas (updateBlockContent limpia controles)
    this.updateBlockContent(blockId, table.innerHTML);

    // Re-renderizar para aplicar todos los estilos y regenerar controles del editor
    this.render();
  };

  /**
   * Parsea un string CSS inline a un objeto { prop: value }.
   * Las keys se guardan en lowercase para comparación consistente.
   */
  meWYSE.prototype._parseStyleMap = function(styleStr) {
    var map = {};
    if (!styleStr) return map;
    var parts = styleStr.split(';');
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var colonIdx = part.indexOf(':');
      if (colonIdx < 0) continue;
      var prop = part.substring(0, colonIdx).trim().toLowerCase();
      var value = part.substring(colonIdx + 1).trim();
      if (prop && value) map[prop] = value;
    }
    return map;
  };

  /**
   * Serializa un objeto { prop: value } a un string CSS inline.
   */
  meWYSE.prototype._serializeStyleMap = function(map) {
    var parts = [];
    for (var prop in map) {
      if (map.hasOwnProperty(prop)) {
        parts.push(prop + ': ' + map[prop]);
      }
    }
    return parts.join('; ');
  };

  /**
   * Extrae el width de una declaración border shorthand (ej. "2px dashed #ff0000")
   */
  meWYSE.prototype._extractBorderWidth = function(borderValue) {
    if (!borderValue) return null;
    var m = borderValue.match(/(\d+)px/);
    return m ? parseInt(m[1], 10) : null;
  };

  /**
   * Extrae el color de una declaración border shorthand
   */
  meWYSE.prototype._extractBorderColor = function(borderValue) {
    if (!borderValue) return null;
    var m = borderValue.match(/#[0-9a-fA-F]{3,6}|rgb\([^)]+\)/);
    return m ? m[0] : null;
  };

  /**
   * Coloca el cursor en un offset de TEXTO dentro de un elemento contenteditable.
   * Camina los nodos de texto descendientes hasta consumir `offset` caracteres y
   * coloca el cursor allí. Si el offset excede el texto disponible, queda al final.
   *
   * Lo usa `_mergeBlockIntoPrevious` para situar el cursor en la frontera entre
   * el contenido previo y el contenido recién concatenado.
   */
  meWYSE.prototype._setCursorAtTextOffset = function(element, offset) {
    if (!element) return;
    try {
      element.focus();
      var range = document.createRange();
      var sel = window.getSelection();
      var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      var charsLeft = Math.max(0, offset);
      var targetNode = null;
      var targetOffset = 0;
      var node;
      while ((node = walker.nextNode())) {
        var len = node.textContent.length;
        if (charsLeft <= len) {
          targetNode = node;
          targetOffset = charsLeft;
          break;
        }
        charsLeft -= len;
      }
      if (targetNode) {
        range.setStart(targetNode, targetOffset);
      } else {
        // No hay text nodes (o offset > total): cursor al final del elemento.
        range.selectNodeContents(element);
        range.collapse(false);
      }
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {}
  };

  /**
   * Fusiona el bloque indicado con el bloque anterior. Inverso del split:
   * el contenido del bloque se concatena al final del anterior, el bloque
   * actual se elimina del modelo, y el cursor queda en la frontera (donde
   * empezaba el contenido absorbido).
   *
   * El TIPO del bloque resultante es el del anterior — coherente con el
   * comportamiento clásico de editores: backspace al inicio de un párrafo
   * tras un heading lo fusiona en el heading.
   *
   * Síncrono dentro del gesto del usuario para no perder el teclado virtual
   * en móvil (mismo motivo que en `_focusBlockSync`).
   */
  meWYSE.prototype._mergeBlockIntoPrevious = function(blockId) {
    var index = this.getBlockIndex(blockId);
    if (index <= 0) return;
    var currentBlock = this.getBlock(blockId);
    var prevBlock = this.blocks[index - 1];
    if (!currentBlock || !prevBlock) return;

    // El render() destruye el contenteditable actual y enfocamos el del bloque
    // previo. En móvil esa transición pasa un instante por document.body —
    // suprimimos onBlur durante 300ms para que esa transición no se reporte
    // como un blur real.
    this._suppressBlurUntil = Date.now() + 300;

    this.pushHistory(true);

    // Longitud de TEXTO del contenido previo: futura posición del cursor
    // (carácter justo después del último char del bloque anterior original).
    var probe = document.createElement('div');
    probe.innerHTML = prevBlock.content || '';
    var prevTextLen = probe.textContent.length;

    // Concatenar HTML crudo y pasarlo por el sanitizador (también unifica
    // `<div>` accidentales en `<br>` gracias al fix reciente del unwrap).
    var mergedRaw = (prevBlock.content || '') + (currentBlock.content || '');
    prevBlock.content = this._sanitizeBlockContent(mergedRaw);

    // Quitar el bloque actual del modelo
    this.blocks.splice(index, 1);

    // Re-renderizar todo (manera más simple de manejar correctamente la
    // re-agrupación de listas: si bloques de lista del mismo tipo quedan
    // ahora consecutivos, deben unirse en el mismo `<ul>/<ol>`).
    // Saltamos el focus async del render para no romper el gesto.
    this._skipAutoFocus = true;
    this.render();
    this._skipAutoFocus = false;

    // Cursor síncrono en la frontera (dentro del bloque previo).
    var prevElement = this.container.querySelector('[data-block-id="' + prevBlock.id + '"]');
    if (prevElement) {
      var ce = prevElement.querySelector('[contenteditable="true"]');
      if (!ce && prevElement.getAttribute('contenteditable') === 'true') ce = prevElement;
      if (ce) this._setCursorAtTextOffset(ce, prevTextLen);
    }

    // Si era una lista numerada, refrescar la numeración consecutiva.
    if (prevBlock.type === 'numberList' || currentBlock.type === 'numberList') {
      this.updateConsecutiveNumberLists(Math.max(0, index - 1));
    }

    this.triggerChange();
  };

  /**
   * Foco SÍNCRONO sobre el contenteditable de un bloque, con cursor al inicio.
   *
   * Existe como complemento a `focusNewBlock` (que es asíncrono — usa
   * setTimeout + 3×rAF). Este es síncrono porque el handler de Enter lo
   * invoca dentro del propio gesto del usuario: si focus() ocurre fuera del
   * gesto, iOS y Android ocultan el teclado virtual al crear un bloque nuevo.
   *
   * No reemplaza a `focusNewBlock` para el resto de callers; sólo lo usa el
   * Enter handler, en combinación con el flag `_skipAutoFocus` que evita el
   * focus asíncrono de fondo cuando ya hicimos el síncrono.
   */
  meWYSE.prototype._focusBlockSync = function(blockId) {
    if (!blockId || !this.container) return;
    var blockElement = this.container.querySelector('[data-block-id="' + blockId + '"]');
    if (!blockElement) return;
    var ce = blockElement.querySelector('[contenteditable="true"]');
    if (!ce && blockElement.getAttribute('contenteditable') === 'true') {
      ce = blockElement;
    }
    if (!ce) return;
    ce.focus();
    try {
      var range = document.createRange();
      var sel = window.getSelection();
      if (ce.firstChild && ce.firstChild.nodeType === 3) {
        range.setStart(ce.firstChild, 0);
      } else {
        range.setStart(ce, 0);
      }
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (e) {}
  };

  /**
   * Backdrop / overlay invisible para menús flotantes y modales.
   *
   * Cuando un menú/modal se abre, llama a `_showBackdrop(name, closeFn)`. Si era el
   * primero del stack, se inserta un <div.mewyse-overlay> en body que intercepta
   * clicks y la tecla Escape. Click u Escape llaman al `closeFn` del top del stack.
   *
   * Cuando el menú se cierra por sus propios medios, debe llamar `_hideBackdrop(name)`
   * para sacar su entrada del stack y, si era la última, retirar el overlay.
   *
   * El overlay es transparente (z-index 10000) — se sitúa por encima del wrapper
   * de fullscreen (9998) para que los menús (10001+, insertados en <body>) no
   * queden tapados en pantalla completa, y por debajo de los propios menús y de
   * los modales (10020+). Ver la "ESCALERA DE CAPAS" documentada en mewyse.css
   * (regla .mewyse-overlay).
   */
  meWYSE.prototype._showBackdrop = function(name, closeFn) {
    if (!name || typeof closeFn !== 'function') return;
    // Eliminar entrada previa con el mismo nombre (re-aperturas no apilan).
    for (var i = this._activeBackdropModals.length - 1; i >= 0; i--) {
      if (this._activeBackdropModals[i].name === name) {
        this._activeBackdropModals.splice(i, 1);
      }
    }
    this._activeBackdropModals.push({ name: name, closeFn: closeFn });
    this._ensureBackdrop();
  };

  meWYSE.prototype._hideBackdrop = function(name) {
    if (!name || !this._activeBackdropModals) return;
    for (var i = this._activeBackdropModals.length - 1; i >= 0; i--) {
      if (this._activeBackdropModals[i].name === name) {
        this._activeBackdropModals.splice(i, 1);
        break;
      }
    }
    if (!this._activeBackdropModals.length) this._removeBackdrop();
  };

  meWYSE.prototype._ensureBackdrop = function() {
    if (this._backdropEl) return;
    var self = this;

    var el = document.createElement('div');
    el.className = 'mewyse-overlay';
    // mousedown (no click) para ganar la carrera contra otros listeners que
    // pudieran inspeccionar selección o foco al click. preventDefault evita que
    // el editor pierda la selección al hacer click en el overlay.
    this._backdropMouseDownHandler = function(e) {
      e.preventDefault();
      e.stopPropagation();
      self._closeTopmostBackdropModal();
    };
    el.addEventListener('mousedown', this._backdropMouseDownHandler);
    document.body.appendChild(el);
    this._backdropEl = el;

    // Capture phase: nos colamos antes que listeners de bloque/teclado del editor.
    this._backdropEscHandler = function(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        self._closeTopmostBackdropModal();
      }
    };
    document.addEventListener('keydown', this._backdropEscHandler, true);
  };

  meWYSE.prototype._removeBackdrop = function() {
    if (this._backdropEl && this._backdropEl.parentNode) {
      this._backdropEl.parentNode.removeChild(this._backdropEl);
    }
    this._backdropEl = null;
    this._backdropMouseDownHandler = null;
    if (this._backdropEscHandler) {
      document.removeEventListener('keydown', this._backdropEscHandler, true);
      this._backdropEscHandler = null;
    }
  };

  meWYSE.prototype._closeTopmostBackdropModal = function() {
    if (!this._activeBackdropModals || !this._activeBackdropModals.length) return;
    var entry = this._activeBackdropModals[this._activeBackdropModals.length - 1];
    // Llamar al closeFn primero. Se espera que limpie llamando _hideBackdrop;
    // si no lo hace (defensivo), forzamos la limpieza después.
    try { entry.closeFn(); } catch (e) {}
    for (var i = this._activeBackdropModals.length - 1; i >= 0; i--) {
      if (this._activeBackdropModals[i] === entry) {
        this._activeBackdropModals.splice(i, 1);
        break;
      }
    }
    if (!this._activeBackdropModals.length) this._removeBackdrop();
  };

  /**
   * Configura el comportamiento de scroll horizontal de la toolbar cuando se
   * usa toolbarOverflow: 'scroll'. Cablea:
   *  - Indicadores de overflow (clases has-overflow-start/end en .mewyse-toolbar-scroll-area)
   *  - Wheel vertical → scroll horizontal
   *  - focusin → scrollIntoView del botón con foco
   *  - Click en flechas prev/next → scroll suave por ~70% del ancho visible
   *  - ResizeObserver (con fallback a window.resize) para recalcular en cambios de tamaño
   *
   * Las referencias a los elementos viven en this._toolbarScroll (creado en createToolbar).
   * Los listeners se guardan en this._toolbarScrollListeners para poder limpiarlos en destroy().
   */
  meWYSE.prototype._setupToolbarScroll = function() {
    var ts = this._toolbarScroll;
    if (!ts || !ts.track) return;
    var self = this;
    var track = ts.track;
    var area = ts.area;

    var listeners = [];
    this._toolbarScrollListeners = listeners;

    // Calcula si hay contenido oculto en cada extremo y togglea las clases.
    // Las clases controlan visibilidad de fades y flechas en CSS.
    function updateOverflow() {
      // En RTL la lógica es la misma con scrollLeft normalizado en navegadores modernos:
      // scrollLeft 0 = inicio (visualmente derecha en RTL); scrollWidth - clientWidth = final.
      var max = track.scrollWidth - track.clientWidth;
      var sl = Math.abs(track.scrollLeft); // abs por si algún navegador devuelve negativo en RTL
      var hasStart = sl > 1;
      var hasEnd = sl < max - 1;
      area.classList.toggle('has-overflow-start', hasStart);
      area.classList.toggle('has-overflow-end', hasEnd);
    }
    this._updateToolbarOverflow = updateOverflow;

    // Wheel vertical → scroll horizontal. Si el usuario hace scroll predominantemente
    // vertical encima del track, lo redirigimos a horizontal. Movimiento horizontal
    // explícito (touchpads, shift+wheel) se respeta sin alterar.
    function onWheel(e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        var max = track.scrollWidth - track.clientWidth;
        if (max <= 0) return; // nada que scrollear
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    }
    track.addEventListener('wheel', onWheel, { passive: false });
    listeners.push({ el: track, type: 'wheel', fn: onWheel, opts: { passive: false } });

    // Mantener el botón con foco (Tab) visible dentro del track.
    function onFocusIn(e) {
      var btn = e.target;
      if (!btn || typeof btn.getBoundingClientRect !== 'function') return;
      var trackRect = track.getBoundingClientRect();
      var btnRect = btn.getBoundingClientRect();
      if (btnRect.left < trackRect.left || btnRect.right > trackRect.right) {
        // scrollIntoView con inline:nearest desplaza solo lo necesario y respeta block actual.
        try {
          btn.scrollIntoView({ inline: 'nearest', block: 'nearest' });
        } catch (err) {
          // Navegadores muy antiguos sin opciones de scrollIntoView: fallback básico.
          btn.scrollIntoView();
        }
      }
    }
    track.addEventListener('focusin', onFocusIn);
    listeners.push({ el: track, type: 'focusin', fn: onFocusIn });

    // Listener de scroll: recalcular indicadores.
    function onScroll() { updateOverflow(); }
    track.addEventListener('scroll', onScroll, { passive: true });
    listeners.push({ el: track, type: 'scroll', fn: onScroll, opts: { passive: true } });

    // Flechas prev/next: scrollBy ~70% del ancho visible. behavior:smooth si está soportado.
    function scrollByDir(dir) {
      var step = Math.max(120, Math.floor(track.clientWidth * 0.7));
      try {
        track.scrollBy({ left: dir * step, behavior: 'smooth' });
      } catch (err) {
        track.scrollLeft += dir * step;
      }
    }
    if (ts.prev) {
      ts.prev.addEventListener('click', function(e) {
        e.preventDefault();
        // En RTL la flecha "prev" sigue significando "el lado de inicio", lo cual visualmente
        // es la derecha. scrollBy con left negativo ya respeta dir=rtl en navegadores modernos.
        scrollByDir(-1);
      });
    }
    if (ts.next) {
      ts.next.addEventListener('click', function(e) {
        e.preventDefault();
        scrollByDir(1);
      });
    }

    // ResizeObserver: recalcular cuando cambia el ancho disponible (responsive, fullscreen).
    // Fallback a window.resize si no está disponible.
    if (typeof window.ResizeObserver === 'function') {
      var ro = new window.ResizeObserver(function() { updateOverflow(); });
      ro.observe(track);
      this._toolbarResizeObserver = ro;
    } else {
      var onWinResize = function() { updateOverflow(); };
      window.addEventListener('resize', onWinResize);
      listeners.push({ el: window, type: 'resize', fn: onWinResize });
    }

    // Primer cálculo. requestAnimationFrame asegura que el layout esté listo
    // (el toolbar puede no estar aún en el DOM cuando se llama desde createToolbar).
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(updateOverflow);
    } else {
      setTimeout(updateOverflow, 0);
    }
  };

  /**
   * Reescribe un fragmento de HTML aplicando escape estricto de los 5 caracteres
   * de entidad HTML (`&` `<` `>` `"` `'`) sobre los nodos de TEXTO. Los
   * elementos y sus atributos se preservan; sólo cambia el texto humano.
   *
   * Convención al estilo Quill: el HTML resultante es siempre válido y robusto
   * incluso si el contenido del bloque contenía caracteres especiales sin
   * escapar (típico al cargar contenido vía `loadFromJSON` con texto crudo).
   *
   * El round-trip por `DOMParser` ya normaliza muchos casos, pero el browser
   * NO escapa `"` ni `'` en text nodes (sólo en atributos), así que este
   * serializador escribe el HTML manualmente para forzar las cinco entidades.
   */
  meWYSE.prototype._emitInlineHTMLWithEscape = function(html) {
    if (typeof html !== 'string' || html === '') return html || '';
    var doc;
    try {
      doc = new DOMParser().parseFromString(
        '<!DOCTYPE html><html><body><div id="__mewyse_root__">' + html + '</div></body></html>',
        'text/html'
      );
    } catch (e) {
      return html;
    }
    var root = doc.querySelector('#__mewyse_root__');
    if (!root) return html;
    var out = '';
    var c = root.firstChild;
    while (c) {
      out += this._serializeNodeWithEntityEscape(c);
      c = c.nextSibling;
    }
    return out;
  };

  // void elements de HTML5 (no llevan </tag>)
  var VOID_ELEMENTS = {
    AREA: 1, BASE: 1, BR: 1, COL: 1, EMBED: 1, HR: 1, IMG: 1,
    INPUT: 1, LINK: 1, META: 1, PARAM: 1, SOURCE: 1, TRACK: 1, WBR: 1
  };

  meWYSE.prototype._serializeNodeWithEntityEscape = function(node) {
    if (!node) return '';
    if (node.nodeType === 3) {
      // text node — escape los 5 entities
      return this._escapeTextEntities(node.nodeValue);
    }
    if (node.nodeType === 8) return ''; // comments: drop
    if (node.nodeType !== 1) return '';

    var tag = node.tagName;
    var tagLower = tag.toLowerCase();
    var attrs = '';
    for (var i = 0; i < node.attributes.length; i++) {
      var a = node.attributes[i];
      // Atributos: aplicar el mismo encoder que para text nodes (5 entities y,
      // si htmlNumericEntities está activo, también `\` y non-ASCII numérico).
      // Sobre-escapar `<`/`>`/`'` en atributos delimitados por `"` es legal
      // y mantiene un único criterio en todo el output.
      var val = this._escapeTextEntities(a.value);
      attrs += ' ' + a.name + '="' + val + '"';
    }
    if (VOID_ELEMENTS[tag]) return '<' + tagLower + attrs + '>';

    var inner = '';
    var c = node.firstChild;
    while (c) {
      inner += this._serializeNodeWithEntityEscape(c);
      c = c.nextSibling;
    }
    return '<' + tagLower + attrs + '>' + inner + '</' + tagLower + '>';
  };

  meWYSE.prototype._escapeTextEntities = function(text) {
    if (text == null) return '';
    var s = String(text);

    // Modo extendido (TinyMCE-compat): además de las 5 entities, escapar `\`
    // como `&#92;` y todo char no-ASCII (incluidos pares de subrogados Unicode
    // > U+FFFF) como referencia numérica.
    if (this.htmlNumericEntities) {
      var out = '';
      for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        var code = s.charCodeAt(i);
        // Detectar pair de subrogados → recombinar al codepoint real
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < s.length) {
          var low = s.charCodeAt(i + 1);
          if (low >= 0xDC00 && low <= 0xDFFF) {
            var cp = ((code - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
            out += '&#' + cp + ';';
            i++; // saltar el low surrogate
            continue;
          }
        }
        if (c === '&') out += '&amp;';
        else if (c === '<') out += '&lt;';
        else if (c === '>') out += '&gt;';
        else if (c === '"') out += '&quot;';
        else if (c === "'") out += '&#39;';
        else if (c === '\\') out += '&#92;';
        else if (code >= 128) out += '&#' + code + ';';
        else out += c;
      }
      return out;
    }

    // Modo Quill: solo las 5 entities HTML.
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  /**
   * Whitelist de elementos donde el atributo `style` es inherente al editor.
   * Sobre el resto de elementos `style` se elimina al hacer getHTML/copy
   * (típicamente spans con colores aplicados ad-hoc, párrafos pegados con
   * estilos heredados, etc.).
   */
  var STYLE_NATIVE_TAGS = {
    TABLE: 1, TD: 1, TH: 1, COL: 1, IMG: 1, IFRAME: 1, VIDEO: 1, AUDIO: 1
  };

  /**
   * Propiedades CSS "de contenido" que SÍ conservamos en elementos genéricos
   * (spans de color de la toolbar) al hacer getHTML/copy. Todo lo demás (márgenes,
   * font-size, font-family... típica basura de Word) se descarta.
   */
  var CONTENT_STYLE_PROPS = {
    'color': 1, 'background-color': 1,
    'font-family': 1, 'font-size': 1, 'line-height': 1
  };

  meWYSE.prototype._isStyleNativeElement = function(el) {
    if (!el || el.nodeType !== 1) return false;
    if (STYLE_NATIVE_TAGS[el.tagName]) return true;
    // Spans atómicos del editor: la cápsula del tag lleva su color en style.
    if (el.tagName === 'SPAN' && el.classList && el.classList.contains('mewyse-tag')) {
      return true;
    }
    return false;
  };

  /**
   * Recorre `html` y elimina `style` de cualquier elemento que no sea nativo
   * del editor (ver `_isStyleNativeElement`). Usado por `getHTML` y por el
   * handler de `copy` para que el output que sale del editor venga limpio
   * de estilos inline arrastrados (paste de Word, color picker, etc.).
   *
   * @param {string} html
   * @param {Object} opts - opcional. opts.allowTable=true parsea el contenido
   *   envuelto en <table> para que tr/td/th no sean descartados por DOMParser.
   * @returns {string}
   */
  meWYSE.prototype._stripNonNativeStyles = function(html, opts) {
    if (typeof html !== 'string' || !html) return html || '';
    var allowTable = !!(opts && opts.allowTable);
    var open = allowTable ? '<table id="__root__">' : '<div id="__root__">';
    var close = allowTable ? '</table>' : '</div>';
    var doc;
    try {
      doc = new DOMParser().parseFromString(
        '<!DOCTYPE html><html><body>' + open + html + close + '</body></html>',
        'text/html'
      );
    } catch (e) { return html; }
    var root = doc.querySelector(allowTable ? 'table#__root__' : '#__root__');
    if (!root) return html;
    var styled = root.querySelectorAll('[style]');
    for (var i = 0; i < styled.length; i++) {
      if (!this._isStyleNativeElement(styled[i])) {
        // En elementos genéricos (p.ej. spans de color de la toolbar) no borramos
        // el style entero: conservamos solo color/fondo y descartamos el resto,
        // para no perder el color aplicado por el usuario en el export HTML.
        var v_filtered = this._filterContentStyle(styled[i].getAttribute('style'));
        if (v_filtered) styled[i].setAttribute('style', v_filtered);
        else styled[i].removeAttribute('style');
      }
    }
    return root.innerHTML;
  };

  /**
   * Filtra un string de style dejando SOLO las propiedades de contenido
   * (color/background-color) y validando sus valores con _sanitizeStyle.
   * @param {string} styleStr
   * @returns {string} style filtrado (o '' si no queda nada seguro)
   */
  meWYSE.prototype._filterContentStyle = function(styleStr) {
    if (!styleStr || typeof styleStr !== 'string') return '';
    var v_parts = styleStr.split(';');
    var v_kept = [];
    for (var i = 0; i < v_parts.length; i++) {
      var v_colon = v_parts[i].indexOf(':');
      if (v_colon < 0) continue;
      var v_prop = v_parts[i].substring(0, v_colon).trim().toLowerCase();
      var v_value = v_parts[i].substring(v_colon + 1).trim();
      if (!CONTENT_STYLE_PROPS[v_prop] || !v_value) continue;
      v_kept.push(v_prop + ': ' + v_value);
    }
    if (v_kept.length === 0) return '';
    // _sanitizeStyle bloquea valores peligrosos (url(), expression(), comillas...)
    return this._sanitizeStyle(v_kept.join('; '));
  };

  // ============================================
  // Acciones de toolbar sobre selección de varios bloques
  // ============================================

  /**
   * Devuelve la selección múltiple activa: bloques enteros (Ctrl/Shift+clic)
   * tienen prioridad sobre la selección cross-block (arrastre de texto).
   * @returns {{mode: 'blocks'|'cross'|'none', ids: number[]}}
   */
  meWYSE.prototype._getActiveBlockSelection = function() {
    var self = this;
    if (this.selectedBlocks && this.selectedBlocks.length > 0) {
      // Ordenar por posición en el documento para un recorrido coherente
      var v_ids = this.selectedBlocks.slice().sort(function(a, b) {
        return self.getBlockIndex(a) - self.getBlockIndex(b);
      });
      return { mode: 'blocks', ids: v_ids };
    }
    if (this.crossBlockSelection && this.crossBlockSelection.blockIds &&
        this.crossBlockSelection.blockIds.length > 0) {
      return { mode: 'cross', ids: this.crossBlockSelection.blockIds.slice() };
    }
    return { mode: 'none', ids: [] };
  };

  /**
   * Re-aplica la clase visual de selección a los bloques seleccionados.
   * Necesario tras un render(), que no la conserva.
   */
  meWYSE.prototype._reapplyBlockSelectionVisuals = function() {
    if (!this.selectedBlocks) return;
    for (var i = 0; i < this.selectedBlocks.length; i++) {
      this.updateBlockSelectionVisual(this.selectedBlocks[i], true);
    }
  };

  /**
   * Transforma solo los nodos de texto de un string HTML con la función dada,
   * preservando las etiquetas (negrita, enlaces, menciones...). Usado por
   * mayúsculas/minúsculas sobre bloques enteros.
   * @param {string} html
   * @param {Function} transformer - (text) => text
   * @returns {string}
   */
  meWYSE.prototype._transformTextNodesHtml = function(html, transformer) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var walker = document.createTreeWalker(tmp, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].nodeValue = transformer(nodes[i].nodeValue);
    }
    return tmp.innerHTML;
  };

  /**
   * Aplica un formato inline (negrita, cursiva, color...) a la selección
   * múltiple activa. La función applyFn opera sobre la selección NATIVA, que
   * este método fija bloque a bloque:
   *  - 'cross': la porción parcial de cada bloque (getRangeForBlock).
   *  - 'blocks': el contenido completo de cada bloque.
   * @param {Function} applyFn - p.ej. function(){ document.execCommand('bold'); }
   * @returns {boolean} true si actuó (había multi-selección); false si no.
   */
  meWYSE.prototype._applyInlineAcrossSelection = function(applyFn) {
    var info = this._getActiveBlockSelection();
    if (info.mode === 'none') return false;

    this.pushHistory(true);
    var nativeSel = window.getSelection();
    var v_cross = this.crossBlockSelection;

    for (var i = 0; i < info.ids.length; i++) {
      var v_id = info.ids[i];
      var blockEl = this.getBlockElementById(v_id);
      if (!blockEl) continue;
      var editableEl = this.getEditableElement(blockEl);
      if (!editableEl) continue;

      var range;
      if (info.mode === 'cross') {
        range = this.getRangeForBlock(v_id, v_cross);
      } else {
        range = document.createRange();
        range.selectNodeContents(editableEl);
      }
      if (!range) continue;

      editableEl.focus();
      nativeSel.removeAllRanges();
      nativeSel.addRange(range);

      applyFn(); // opera sobre la selección nativa recién fijada

      // execCommand/applyInlineStyle mutan el editable directamente: persistir.
      var v_block = this.getBlock(v_id);
      if (v_block) v_block.content = editableEl.innerHTML;
    }

    nativeSel.removeAllRanges();

    if (info.mode === 'cross') {
      this.clearCrossBlockSelection();
      this.closeFormatMenu();
    }

    this.render();
    if (info.mode === 'blocks') this._reapplyBlockSelectionVisuals();
    this.triggerChange();
    return true;
  };

  /**
   * Cambia el tipo de bloque de todos los bloques de la selección múltiple.
   * Omite bloques no convertibles (tabla/imagen/divider/media).
   * @returns {boolean} true si actuó; false si no había multi-selección.
   */
  meWYSE.prototype.applyBlockTypeToSelection = function(type, customClass) {
    var info = this._getActiveBlockSelection();
    if (info.mode === 'none') return false;

    if (type === 'blockquote') type = 'quote'; // alias

    this.pushHistory(true);
    var v_validClass = (customClass && this._customClassWhitelist &&
                        this._customClassWhitelist[customClass]) ? customClass : null;
    var v_nonConvertible = { table: 1, image: 1, divider: 1, pageBreak: 1, video: 1, audio: 1, toc: 1 };

    // ¿Involucra listas? (tipo destino lista, o algún bloque convertible es lista).
    // Si sí, el cambio de tipo reestructura la agrupación → render() completo. Si
    // no, se puede parchear cada bloque en su sitio (texto↔texto).
    var v_involves_list = this._isListBlockType(type);
    var v_convertible_ids = [];
    for (var i = 0; i < info.ids.length; i++) {
      var v_block = this.getBlock(info.ids[i]);
      if (!v_block || v_nonConvertible[v_block.type]) continue;
      if (this._isListBlockType(v_block.type)) v_involves_list = true;
      v_convertible_ids.push(info.ids[i]);
      v_block.type = type;
      if (v_validClass) v_block.customClass = v_validClass;
      else delete v_block.customClass;
    }

    if (info.mode === 'cross') { this.clearCrossBlockSelection(); this.closeFormatMenu(); }

    var v_all_patched = false;
    if (!v_involves_list) {
      v_all_patched = true;
      for (var j = 0; j < v_convertible_ids.length; j++) {
        if (!this._patch_block(v_convertible_ids[j])) { v_all_patched = false; break; }
      }
    }
    if (!v_all_patched) this.render();

    if (info.mode === 'blocks') this._reapplyBlockSelectionVisuals();
    this.triggerChange();
    return true;
  };

  /**
   * Aplica alineación (text-align) a todos los bloques de texto de la selección
   * múltiple, vía el modelo (block.alignment) para que persista en el render.
   * @returns {boolean} true si actuó; false si no había multi-selección.
   */
  meWYSE.prototype.applyAlignmentToSelection = function(alignment) {
    var info = this._getActiveBlockSelection();
    if (info.mode === 'none') return false;

    this.pushHistory(true);
    // Render INCREMENTAL (Fase 6): la alineación es solo `text-align`; se aplica
    // DIRECTAMENTE al elemento de cada bloque seleccionado (sin render → sin
    // perder la selección de bloques ni el caret). Fallback a render() si a algún
    // bloque le falta el elemento.
    var v_missing_el = false;
    for (var i = 0; i < info.ids.length; i++) {
      var v_block = this.getBlock(info.ids[i]);
      if (!v_block || !TEXT_ALIGN_BLOCK_TYPES[v_block.type]) continue;
      // 'left' es el valor por defecto: no ensuciar el modelo con él.
      if (alignment === 'left') delete v_block.alignment;
      else v_block.alignment = alignment;
      var v_el = this.getBlockElementById(info.ids[i]);
      if (v_el) v_el.style.textAlign = v_block.alignment || '';
      else v_missing_el = true;
    }

    if (info.mode === 'cross') { this.clearCrossBlockSelection(); this.closeFormatMenu(); }
    if (v_missing_el) {
      this.render();
      if (info.mode === 'blocks') this._reapplyBlockSelectionVisuals();
    }
    this.triggerChange();
    return true;
  };

  // =========================================================================
  // REGISTRO CENTRAL DE ACCIONES (toolbar · menú flotante · atajos)
  // =========================================================================

  /**
   * Inicializa el registro de acciones a partir de las opciones del constructor:
   *  - `actions: [ {name, ...}, ... ]` → nombre ESTÁNDAR = override; nuevo = custom.
   *  - `disabledActions: ['print', ...]` → se quitan de toolbar/flotante y su
   *    atajo queda anulado.
   * El array se recorre en orden (anclaje determinista de los customs).
   */
  meWYSE.prototype._initActionRegistry = function() {
    this._customActions = [];        // defs custom, en orden de declaración
    this._customActionsByName = {};  // nombre → def custom
    this._actionOverrides = {};      // nombre estándar → def override
    this._disabledActions = {};      // nombre → true
    var v_defs = this.options.actions;
    if (Object.prototype.toString.call(v_defs) === '[object Array]') {
      for (var i = 0; i < v_defs.length; i++) this._registerActionDef(v_defs[i]);
    }
    var v_dis = this.options.disabledActions;
    if (Object.prototype.toString.call(v_dis) === '[object Array]') {
      for (var j = 0; j < v_dis.length; j++) {
        if (typeof v_dis[j] === 'string' && v_dis[j]) this._disabledActions[v_dis[j]] = true;
      }
    }
  };

  /**
   * Valida y guarda una definición de acción. Devuelve true si se registró.
   *  - Estándar (STANDARD_ACTION_NAMES): override → solo requiere `name`; puede
   *    traer onClick (con ctx.callDefault), icon, tooltip, isEnabled, isActive.
   *    `fontsize` (stepper) no admite override (usar disabledActions).
   *  - Custom: requiere `onClick`. Se normalizan placement ('toolbar' por
   *    defecto | 'floating' | 'both'), tooltip y requiresSelection.
   * @param {Object} def
   * @returns {boolean}
   */
  meWYSE.prototype._registerActionDef = function(def) {
    if (!def || typeof def.name !== 'string' || !def.name) {
      console.warn('meWYSE: acción sin `name` válido', def);
      return false;
    }
    var v_name = def.name;
    if (STANDARD_ACTION_NAMES[v_name]) {
      if (v_name === 'fontsize') {
        console.warn('meWYSE: la acción `fontsize` (stepper) no admite override; usa disabledActions');
        return false;
      }
      this._actionOverrides[v_name] = def;
      return true;
    }
    if (typeof def.onClick !== 'function') {
      console.warn('meWYSE: la acción custom `' + v_name + '` necesita `onClick`');
      return false;
    }
    var v_pl = def.placement;
    if (v_pl !== 'toolbar' && v_pl !== 'floating' && v_pl !== 'both') v_pl = 'toolbar';
    var v_norm = {
      name: v_name,
      icon: def.icon,
      tooltip: (typeof def.tooltip === 'string') ? def.tooltip : v_name,
      placement: v_pl,
      position: def.position,
      onClick: def.onClick,
      isEnabled: (typeof def.isEnabled === 'function') ? def.isEnabled : null,
      isActive: (typeof def.isActive === 'function') ? def.isActive : null,
      requiresSelection: def.requiresSelection === true
    };
    if (this._customActionsByName[v_name]) {
      // Re-registro: sustituir en su posición actual del array
      for (var i = 0; i < this._customActions.length; i++) {
        if (this._customActions[i].name === v_name) { this._customActions[i] = v_norm; break; }
      }
    } else {
      this._customActions.push(v_norm);
    }
    this._customActionsByName[v_name] = v_norm;
    return true;
  };

  /**
   * Construye el contexto que reciben los callbacks de acción. Parte del payload
   * perezoso de onChange (editor, blocks, html/json/markdown/plainText/hasChanges,
   * focusedBlockId/Type) y añade: action, source ('toolbar'|'floating'|'shortcut'|
   * 'api'), event, button (ancla), selection {has, isCollapsed, text, range},
   * block {id, type, content} y callDefault() (lo fija _runAction en overrides).
   * @param {string} v_name
   * @param {Object} v_opts - { source, event, button }
   * @returns {Object}
   */
  meWYSE.prototype._makeActionContext = function(v_name, v_opts) {
    v_opts = v_opts || {};
    var v_active = document.activeElement;
    var v_focused = (v_active && this.container && this.container.contains(v_active)) ? v_active : null;
    var ctx = this._make_change_payload(v_focused);
    ctx.action = v_name;
    ctx.source = v_opts.source || 'api';
    ctx.event = v_opts.event || null;
    ctx.button = v_opts.button || null;

    var sel = window.getSelection();
    var v_has_range = !!(sel && sel.rangeCount);
    ctx.selection = {
      has: this._hasUsableSelection(),
      isCollapsed: v_has_range ? sel.isCollapsed : true,
      text: v_has_range ? sel.toString() : '',
      range: v_has_range ? sel.getRangeAt(0) : null
    };

    var v_bid = (ctx.focusedBlockId != null) ? ctx.focusedBlockId : this._getFocusedBlockId();
    var v_blk = (v_bid != null) ? this.getBlock(v_bid) : null;
    ctx.block = v_blk ? { id: v_blk.id, type: v_blk.type, content: v_blk.content } : null;
    ctx.callDefault = function() {}; // sin efecto salvo en overrides
    return ctx;
  };

  /**
   * Despachador único de acciones. Lo llaman los botones de la toolbar, el menú
   * flotante y los atajos de teclado. Orden: desactivada → no-op; override →
   * onClick(ctx) con ctx.callDefault() = comportamiento original; custom →
   * onClick(ctx); si no → _runDefaultAction. Los callbacks del consumidor van
   * en try/catch (un error suyo no rompe el editor); los defaults no se
   * envuelven (sus errores deben verse tal cual).
   * @param {string} v_name
   * @param {Object} v_opts - { source, event, button }
   * @returns {boolean} false si estaba desactivada o el editor destruido
   */
  meWYSE.prototype._runAction = function(v_name, v_opts) {
    if (this._destroyed) return false;
    if (this._disabledActions && this._disabledActions[v_name]) return false;
    var self = this;
    var ctx = this._makeActionContext(v_name, v_opts);
    var v_override = this._actionOverrides ? this._actionOverrides[v_name] : null;
    var v_custom = this._customActionsByName ? this._customActionsByName[v_name] : null;

    if (v_override) {
      ctx.callDefault = function() { self._runDefaultAction(v_name, ctx); };
      if (typeof v_override.onClick === 'function') {
        try { v_override.onClick(ctx); }
        catch (e) { console.error('meWYSE: error en el override de `' + v_name + '`', e); }
      } else {
        this._runDefaultAction(v_name, ctx);
      }
      return true;
    }
    if (v_custom) {
      try { v_custom.onClick(ctx); }
      catch (e2) { console.error('meWYSE: error en la acción `' + v_name + '`', e2); }
      return true;
    }
    this._runDefaultAction(v_name, ctx);
    return true;
  };

  /**
   * Implementación por defecto de cada acción estándar (única para toolbar,
   * menú flotante y atajos). Los desplegables necesitan el botón ancla
   * (ctx.button; para blocktype/align hay fallback a la ref de la toolbar).
   * @param {string} v_name
   * @param {Object} ctx
   */
  meWYSE.prototype._runDefaultAction = function(v_name, ctx) {
    var v_btn = ctx && ctx.button ? ctx.button : null;
    var v_id;
    switch (v_name) {
      case 'undo': this.undo(); break;
      case 'redo': this.redo(); break;
      case 'blocktype':
        v_btn = v_btn || this._blockTypeButton;
        if (v_btn) this.showToolbarBlockTypeMenu(v_btn);
        break;
      case 'fontsize': break; // stepper: sus botones [−]/[+] tienen su propia lógica
      case 'bold': this._applyInlineFormatCommand('bold'); break;
      case 'italic': this._applyInlineFormatCommand('italic'); break;
      case 'underline': this._applyInlineFormatCommand('underline'); break;
      case 'strikethrough': this._applyInlineFormatCommand('strikeThrough'); break;
      case 'subscript': this._applyInlineWrapTag('sub'); break;
      case 'superscript': this._applyInlineWrapTag('sup'); break;
      case 'case': if (v_btn) this.showCaseMenu(v_btn); break;
      case 'removeformat': this.removeFormat(); break;
      case 'link':
        // Enlaces no soportados en selección cross-block (comportamiento previo
        // del menú flotante).
        if (!this.crossBlockSelection) this.createLink();
        break;
      case 'forecolor': if (v_btn) this.showUnifiedColorPicker(v_btn); break;
      case 'font': if (v_btn) this.showFontMenu(v_btn); break;
      case 'lineheight': if (v_btn) this.showLineHeightMenu(v_btn); break;
      case 'specialchars': if (v_btn) this.showSpecialCharsMenu(v_btn); break;
      case 'mergetags': this._openMergeTagMenuFromSelection(); break;
      case 'align':
        v_btn = v_btn || this.alignButton;
        if (v_btn) this.showAlignMenu(v_btn);
        break;
      case 'outdent':
        v_id = this._getFocusedBlockId();
        if (v_id !== null) this.indentBlock(v_id, -1);
        break;
      case 'indent':
        v_id = this._getFocusedBlockId();
        if (v_id !== null) this.indentBlock(v_id, 1);
        break;
      case 'table': this.insertTableBlock(); break;
      case 'image': this.insertImageBlock(); break;
      case 'video': this.insertVideoBlock(); break;
      case 'audio': this.insertAudioBlock(); break;
      case 'pagebreak': this.insertPageBreak(); break;
      case 'find': this.showFindReplace(); break;
      case 'wordwrap': this.toggleWordWrap(); break;
      case 'summary': this.toggleOutlinePanel(); break;
      case 'showblocks': this.toggleShowBlocks(); break;
      case 'sourcecode': this._showCodeSourceModal('html'); break;
      case 'markdown': this._showCodeSourceModal('markdown'); break;
      case 'fullscreen': this.toggleFullscreen(); break;
      case 'print': this.print(); break;
      case 'exportword': this.exportWord(); break;
      case 'exportpdf': this.exportPdf(); break;
      case 'moveup': this.moveBlockUp(); break;
      case 'movedown': this.moveBlockDown(); break;
      default: break; // nombre no estándar sin custom: nada que hacer
    }
  };

  /**
   * Aplica un comando inline (bold/italic/underline/strikeThrough) sobre la
   * selección: primero intenta la vía cross-block/multi-bloque
   * (_applyInlineAcrossSelection); si no aplica, execCommand sobre la selección
   * nativa y persistencia del bloque activo (cubre toolbar, flotante y atajos).
   * @param {string} v_cmd
   */
  meWYSE.prototype._applyInlineFormatCommand = function(v_cmd) {
    var v_applied = this._applyInlineAcrossSelection(function() { document.execCommand(v_cmd, false, null); });
    if (!v_applied) {
      document.execCommand(v_cmd, false, null);
      if (!this._persistActiveBlockContent()) this.triggerChange();
    }
  };

  /**
   * Envuelve/desenvuelve la selección en una etiqueta inline (sub/sup) con la
   * misma estrategia cross-block → inline que _applyInlineFormatCommand.
   * @param {string} v_tag
   */
  meWYSE.prototype._applyInlineWrapTag = function(v_tag) {
    var self = this;
    var v_applied = this._applyInlineAcrossSelection(function() { self._wrapSelectionInTag(v_tag); });
    if (!v_applied) {
      this._wrapSelectionInTag(v_tag);
      if (!this._persistActiveBlockContent()) this.triggerChange();
    }
  };

  /**
   * Abre el menú de merge tags para el bloque que contiene la selección (antes
   * inline en el botón `mergetags` de la toolbar).
   */
  meWYSE.prototype._openMergeTagMenuFromSelection = function() {
    var sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    var v_node = sel.getRangeAt(0).commonAncestorContainer;
    var v_el = (v_node.nodeType === 1) ? v_node : v_node.parentElement;
    var v_block_el = (v_el && v_el.closest) ? v_el.closest('.mewyse-block[data-block-id]') : null;
    if (!v_block_el) return;
    var v_editable = this.getEditableElement(v_block_el);
    var v_bid = parseInt(v_block_el.getAttribute('data-block-id'), 10);
    if (v_editable) this.showMergeTagMenu(v_bid, v_editable);
  };

  /**
   * Inserta las acciones CUSTOM de una superficie en el spec normalizado
   * `v_rows` = [fila][grupo][nombres] según su `position`:
   *  - `{ after|before: 'X' }`           → dentro del grupo de X (sin separador).
   *  - `{ after|before: 'X', group:'new' }` → grupo PROPIO pegado al de X; los
   *    customs consecutivos con la misma ancla+dirección comparten ese grupo.
   *  - `'start'` / `'end'` (o sin position) → grupo propio al inicio / al final.
   *  - Ancla inexistente en esta superficie → 'end'.
   * Si el nombre ya está en el spec (p. ej. en el string `toolbar`), manda el spec.
   * Se recorre `this._customActions` en orden (determinista).
   * @param {Array} v_rows
   * @param {string} v_surface - 'toolbar' | 'floating'
   */
  meWYSE.prototype._insertCustomActionsIntoRows = function(v_rows, v_surface) {
    if (!this._customActions || !this._customActions.length || !v_rows || !v_rows.length) return;
    var v_created = {}; // clave de anclaje → grupo (array) ya creado, para compartirlo
    var v_find = function(v_name) {
      for (var r = 0; r < v_rows.length; r++) {
        for (var g = 0; g < v_rows[r].length; g++) {
          for (var n = 0; n < v_rows[r][g].length; n++) {
            if (v_rows[r][g][n] === v_name) return { r: r, g: g, n: n };
          }
        }
      }
      return null;
    };
    for (var i = 0; i < this._customActions.length; i++) {
      var def = this._customActions[i];
      var v_ok = (v_surface === 'toolbar')
        ? (def.placement === 'toolbar' || def.placement === 'both')
        : (def.placement === 'floating' || def.placement === 'both');
      if (!v_ok) continue;
      if (v_find(def.name)) continue; // ya colocado por el spec

      var pos = def.position;
      var v_mode = 'end', v_anchor = null, v_dir = 'after', v_new = false;
      if (pos === 'start') {
        v_mode = 'start';
      } else if (pos && typeof pos === 'object') {
        if (typeof pos.after === 'string') { v_anchor = pos.after; v_dir = 'after'; v_mode = 'rel'; }
        else if (typeof pos.before === 'string') { v_anchor = pos.before; v_dir = 'before'; v_mode = 'rel'; }
        v_new = pos.group === 'new';
      }
      var v_loc = (v_mode === 'rel') ? v_find(v_anchor) : null;
      if (v_mode === 'rel' && !v_loc) v_mode = 'end';

      if (v_mode === 'rel' && !v_new) {
        // Mismo grupo que el ancla, justo después/antes de ella.
        v_rows[v_loc.r][v_loc.g].splice(v_dir === 'after' ? v_loc.n + 1 : v_loc.n, 0, def.name);
        continue;
      }
      // Grupo propio (start / end / rel+new), compartido por customs consecutivos.
      var v_key = (v_mode === 'rel') ? ('rel|' + v_anchor + '|' + v_dir) : v_mode;
      var v_group = v_created[v_key];
      if (!v_group) {
        v_group = [];
        if (v_mode === 'start') v_rows[0].unshift(v_group);
        else if (v_mode === 'end') v_rows[v_rows.length - 1].push(v_group);
        else v_rows[v_loc.r].splice(v_dir === 'after' ? v_loc.g + 1 : v_loc.g, 0, v_group);
        v_created[v_key] = v_group;
      }
      v_group.push(def.name);
    }
  };

  /**
   * Resuelve el `icon` de una acción custom a HTML: string que empieza por '<'
   * → SVG/HTML tal cual; clave de WYSIWYG_ICONS → ese SVG; otro texto → etiqueta
   * escapada. Sin icono → tooltip escapado como etiqueta.
   * @param {string} v_icon
   * @param {string} v_fallback
   * @returns {string}
   */
  meWYSE.prototype._resolveActionIcon = function(v_icon, v_fallback) {
    if (typeof v_icon === 'string' && v_icon) {
      if (v_icon.charAt(0) === '<') return v_icon;
      if (WYSIWYG_ICONS[v_icon]) return WYSIWYG_ICONS[v_icon];
      return '<span class="mewyse-action-label">' + escapeHtml(v_icon) + '</span>';
    }
    return '<span class="mewyse-action-label">' + escapeHtml(v_fallback || '?') + '</span>';
  };

  /**
   * Construye el botón de una acción CUSTOM para una superficie: en la toolbar
   * es un .mewyse-toolbar-button (onmousedown+preventDefault para no perder el
   * caret) y se registra para el estado dinámico; en el flotante es un
   * .mewyse-format-button con el estado evaluado al construir.
   * @param {Object} def
   * @param {string} v_source - 'toolbar' | 'floating'
   * @returns {HTMLButtonElement}
   */
  meWYSE.prototype._buildCustomActionButton = function(def, v_source) {
    var self = this;
    var v_icon = this._resolveActionIcon(def.icon, def.tooltip);
    var v_safe = String(def.name).replace(/[^a-zA-Z0-9_-]/g, '');
    var btn;
    if (v_source === 'floating') {
      btn = document.createElement('button');
      btn.className = 'mewyse-format-button mewyse-custom-action';
      btn.innerHTML = v_icon;
      btn.title = def.tooltip;
      btn.setAttribute('aria-label', def.tooltip);
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        self._runAction(def.name, { source: 'floating', event: e, button: btn });
      };
      this._applyCustomActionState(btn, def);
    } else {
      btn = this._makeToolbarButton({
        icon: v_icon, title: def.tooltip, className: 'mewyse-custom-action',
        onmousedown: function(e) { e.preventDefault(); },
        onclick: function(e) {
          e.preventDefault();
          e.stopPropagation();
          self._runAction(def.name, { source: 'toolbar', event: e, button: e.currentTarget });
          self._updateCustomActionStates();
        }
      });
      if (def.requiresSelection || def.isEnabled || def.isActive) {
        this._customStateButtons.push({ el: btn, def: def });
      }
    }
    btn.setAttribute('data-action', def.name);
    if (v_safe) btn.classList.add('mewyse-action-' + v_safe);
    return btn;
  };

  /**
   * Aplica a un botón custom su estado: disabled si `requiresSelection` sin
   * selección o si `isEnabled(ctx)` devuelve false; clase `active` según
   * `isActive(ctx)`. Los predicados del consumidor van en try/catch.
   * @param {HTMLElement} v_el
   * @param {Object} def
   */
  meWYSE.prototype._applyCustomActionState = function(v_el, def) {
    var v_enabled = true;
    if (def.requiresSelection && !this._hasUsableSelection()) v_enabled = false;
    var ctx = null;
    if (v_enabled && def.isEnabled) {
      try {
        ctx = this._makeActionContext(def.name, { source: 'state' });
        v_enabled = !!def.isEnabled(ctx);
      } catch (e) { console.error('meWYSE: error en isEnabled de `' + def.name + '`', e); }
    }
    v_el.disabled = !v_enabled;
    if (def.isActive) {
      try {
        if (!ctx) ctx = this._makeActionContext(def.name, { source: 'state' });
        v_el.classList.toggle('active', !!def.isActive(ctx));
      } catch (e2) { console.error('meWYSE: error en isActive de `' + def.name + '`', e2); }
    }
  };

  /**
   * Reevalúa el estado dinámico de todos los botones custom de la toolbar. Se
   * llama en focusin, en cada onSelectionChange, tras pulsar un custom y al
   * crear la toolbar. (Los del flotante se evalúan al construir el menú.)
   */
  meWYSE.prototype._updateCustomActionStates = function() {
    if (!this._customStateButtons || !this._customStateButtons.length) return;
    for (var i = 0; i < this._customStateButtons.length; i++) {
      var v_it = this._customStateButtons[i];
      if (v_it && v_it.el) this._applyCustomActionState(v_it.el, v_it.def);
    }
  };

  /**
   * Si `v_name` tiene un override con `icon` y/o `tooltip` propios, los aplica
   * sobre el botón estándar ya construido (su onclick ya pasa por _runAction).
   * No aplica a ítems COMPUESTOS (stepper `fontsize`, `blocktype`: su innerHTML
   * incluye el nombre del tipo/flecha y repintarlo lo rompería).
   * @param {string} v_name
   * @param {HTMLElement} v_el
   */
  meWYSE.prototype._applyOverrideAppearance = function(v_name, v_el) {
    var def = this._actionOverrides ? this._actionOverrides[v_name] : null;
    if (!def || !v_el || v_name === 'fontsize' || v_name === 'blocktype') return;
    if (v_el.tagName !== 'BUTTON') return;
    if (typeof def.icon === 'string' && def.icon) {
      v_el.innerHTML = this._resolveActionIcon(def.icon, def.tooltip || v_name);
    }
    if (typeof def.tooltip === 'string' && def.tooltip) {
      v_el.title = def.tooltip;
      v_el.setAttribute('aria-label', def.tooltip);
      // El tooltip propio migra `title` a data-mewyse-tip en el primer hover;
      // si ya se migró, refrescarlo para que no quede el texto antiguo.
      if (v_el.getAttribute('data-mewyse-tip')) v_el.setAttribute('data-mewyse-tip', def.tooltip);
    }
  };

  /**
   * Reconstruye la toolbar EN SU SITIO tras cambiar el registro de acciones
   * (registerAction/unregisterAction/setActionDisabled). Crea una toolbar nueva,
   * sustituye el nodo anterior y reaplica los estados por foco. No hace nada si
   * el editor no tiene toolbar.
   */
  meWYSE.prototype._rebuildToolbar = function() {
    if (!this.showToolbar || !this.toolbar || !this.toolbar.parentNode) return;
    // Cerrar menús/tooltips que apunten a botones de la toolbar vieja.
    this._detachTooltips(this.toolbar);
    if (this._toolbarScroll && this._toolbarScroll.area) {
      // Quitar los listeners del track anterior (los re-crea _setupToolbarScroll).
      if (this._toolbarScrollListeners) {
        for (var i = 0; i < this._toolbarScrollListeners.length; i++) {
          var l = this._toolbarScrollListeners[i];
          try { l.el.removeEventListener(l.type, l.fn, l.opts); } catch (e) {}
        }
        this._toolbarScrollListeners = null;
      }
      this._toolbarScroll = null;
    }
    var v_old = this.toolbar;
    var v_new = this.createToolbar();
    v_old.parentNode.replaceChild(v_new, v_old);
    this.toolbar = v_new;
    // Reaplicar estados que dependen del foco/selección actual.
    this._updateMoveButtons();
    this._updateFormatButtonStates();
    this._updateSelectionTools();
    this._updateCustomActionStates();
  };

  /**
   * Registra (o sustituye) una acción en RUNTIME y repinta la toolbar.
   * Nombre estándar → override; nombre nuevo → acción custom (requiere onClick).
   * @param {Object} def - misma forma que los ítems de la opción `actions`
   * @returns {boolean} true si se registró
   */
  meWYSE.prototype.registerAction = function(def) {
    if (this._destroyed) return false;
    if (!this._registerActionDef(def)) return false;
    this._rebuildToolbar();
    this.closeFormatMenu(); // se reconstruirá con la nueva acción
    return true;
  };

  /**
   * Elimina una acción registrada en runtime: una custom desaparece de toolbar y
   * menú flotante; un override se retira y la acción estándar vuelve a su
   * comportamiento por defecto. No afecta a `disabledActions`.
   * @param {string} v_name
   * @returns {boolean} true si existía
   */
  meWYSE.prototype.unregisterAction = function(v_name) {
    if (this._destroyed || typeof v_name !== 'string') return false;
    var v_found = false;
    if (this._actionOverrides[v_name]) { delete this._actionOverrides[v_name]; v_found = true; }
    if (this._customActionsByName[v_name]) {
      delete this._customActionsByName[v_name];
      for (var i = 0; i < this._customActions.length; i++) {
        if (this._customActions[i].name === v_name) { this._customActions.splice(i, 1); break; }
      }
      v_found = true;
    }
    if (v_found) { this._rebuildToolbar(); this.closeFormatMenu(); }
    return v_found;
  };

  /**
   * Activa/desactiva una acción en runtime (equivale a `disabledActions`): al
   * desactivarla desaparece de la toolbar y del menú flotante y su atajo de
   * teclado queda anulado.
   * @param {string} v_name
   * @param {boolean} v_disabled - true desactiva, false reactiva
   * @returns {boolean}
   */
  meWYSE.prototype.setActionDisabled = function(v_name, v_disabled) {
    if (this._destroyed || typeof v_name !== 'string' || !v_name) return false;
    if (v_disabled === false) delete this._disabledActions[v_name];
    else this._disabledActions[v_name] = true;
    this._rebuildToolbar();
    this.closeFormatMenu();
    return true;
  };

  /**
   * Función auxiliar para escapar HTML
   * @param {string} text
   * @returns {string}
   */
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Escapa un valor para usarlo de forma segura DENTRO de un atributo HTML
   * (alt, src, style, etc.). A diferencia de escapeHtml, también escapa las
   * comillas dobles y simples, evitando el "break-out" de atributos que
   * permitiría inyectar handlers como onerror=.
   * @param {*} v_text
   * @returns {string}
   */
  function escape_attr(v_text) {
    return String(v_text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Exportar el constructor. UMD-lite + SSR-safe:
  //  - CommonJS/bundlers (React, Next, Vite, webpack): module.exports
  //  - Navegador clásico (<script>): global window.meWYSE
  // En SSR (import en servidor) no hay window; no debe petar en tiempo de import.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = meWYSE;
  } else if (typeof window !== 'undefined') {
    window.meWYSE = meWYSE;
  }

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
