/**
 * LibraEditor — componente React (wrapper NO controlado).
 *
 * Envuelve el núcleo ES5 (../libraeditor.js). Sin build: ESM + React.createElement.
 * - No controlado: `defaultValue` fija el contenido inicial; los cambios se
 *   notifican por `onChange`. Cambiar `defaultValue` después NO recarga (usa la
 *   API imperativa por ref: loadFromJSON / loadFromHTML / clear...).
 * - SSR-safe: el editor solo se crea en el cliente (useEffect); importar en
 *   servidor no toca el DOM.
 *
 * Uso:
 *   import { LibraEditor } from 'libraeditor/react';
 *   import 'libraeditor/style.css';
 *   <LibraEditor toolbar theme="dark" defaultValue={blocks} onChange={d => ...} />
 */
import { createElement, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
// El núcleo (../libraeditor.js) exporta vía CommonJS (`module.exports`) y, en el
// navegador, como global (`window.LibraEditor`). Import defensivo que cubre:
//  - Bundlers (Vite/webpack/Next): `_core.default` (interop CJS→ESM).
//  - ESM nativo en navegador: el propio import ejecuta el IIFE, que setea el
//    global; caemos a `globalThis.LibraEditor`.
import * as _core from '../libraeditor.js';
var LibraEditor =
  (_core && (_core.default || _core.LibraEditor)) ||
  (typeof globalThis !== 'undefined' && globalThis.LibraEditor) ||
  (typeof window !== 'undefined' && window.LibraEditor);

// Claves que consume el wrapper (no se pasan como opciones al núcleo).
var WRAPPER_KEYS = {
  defaultValue: 1, onChange: 1, onFocus: 1, onBlur: 1,
  className: 1, style: 1, children: 1
};

// Normaliza el contenido inicial: array de bloques o string JSON.
function toBlocks(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.trim()) {
    try {
      var p = JSON.parse(v);
      return Array.isArray(p) ? p : undefined;
    } catch (e) { return undefined; }
  }
  return undefined;
}

export var LibraEditor = forwardRef(function LibraEditor(props, ref) {
  var hostRef = useRef(null);
  var edRef = useRef(null);
  // Siempre el último `props` (para llamar a los callbacks actuales sin re-crear
  // el editor en cada render).
  var propsRef = useRef(props);
  propsRef.current = props;

  useEffect(function () {
    var p = propsRef.current;

    // Resto de props → opciones del núcleo (toolbar, theme, readOnly, rtl,
    // minHeight, maxHeight, autoExpand, mentions, codeHighlight, ...).
    var options = {};
    for (var k in p) {
      if (!Object.prototype.hasOwnProperty.call(p, k)) continue;
      if (WRAPPER_KEYS[k]) continue;
      options[k] = p[k];
    }
    options.target = hostRef.current;

    var blocks = toBlocks(p.defaultValue);
    if (blocks) options.blocks = blocks;

    // Callbacks vía propsRef → siempre el handler más reciente.
    options.onChange = function (data) { var f = propsRef.current.onChange; if (f) f(data); };
    options.onFocus = function (data) { var f = propsRef.current.onFocus; if (f) f(data); };
    options.onBlur = function (data) { var f = propsRef.current.onBlur; if (f) f(data); };

    var editor = new LibraEditor(options);
    edRef.current = editor;

    // Limpieza en unmount (compatible con StrictMode: destroy() es idempotente).
    return function () {
      try { editor.destroy(); } catch (e) { /* noop */ }
      edRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API imperativa por ref.
  useImperativeHandle(ref, function () {
    var call = function (name, arg, fallback) {
      var ed = edRef.current;
      return (ed && typeof ed[name] === 'function') ? ed[name](arg) : fallback;
    };
    return {
      getEditor: function () { return edRef.current; },
      getHTML: function () { return call('getHTML', undefined, ''); },
      getSafeHTML: function () { return call('getSafeHTML', undefined, ''); },
      getJSON: function () { return call('getJSON', undefined, '[]'); },
      getMarkdown: function () { return call('getMarkdown', undefined, ''); },
      getPlainText: function () { return call('getPlainText', undefined, ''); },
      loadFromJSON: function (v) { return call('loadFromJSON', v); },
      loadFromHTML: function (h) { return call('loadFromHTML', h); },
      loadFromMarkdown: function (m) { return call('loadFromMarkdown', m); },
      clear: function () { return call('loadFromJSON', []); },
      focus: function () { return call('focusFirstBlock'); }
    };
  }, []);

  // Div externo (className/style del consumidor) + host interno que el editor
  // usa como target (se oculta y el editor monta su wrapper como hermano).
  return createElement(
    'div',
    { className: props.className, style: props.style },
    createElement('div', { ref: hostRef })
  );
});

export default LibraEditor;
