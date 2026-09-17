import * as React from 'react';
import LibraEditor, { LibraEditorOptions, LibraEditorBlock, LibraEditorChangePayload } from '../libraeditor';

/** Props del componente <LibraEditor> (wrapper NO controlado). Acepta todas las
 *  opciones del núcleo excepto `target`/`blocks` (gestionadas por el wrapper). */
export interface LibraEditorProps
  extends Partial<Omit<LibraEditorOptions, 'target' | 'blocks' | 'onChange' | 'onFocus' | 'onBlur'>> {
  /** Contenido inicial: array de bloques o string JSON. No controlado. */
  defaultValue?: LibraEditorBlock[] | string;
  onChange?: (data: LibraEditorChangePayload) => void;
  onFocus?: (data: LibraEditorChangePayload) => void;
  onBlur?: (data: LibraEditorChangePayload) => void;
  className?: string;
  style?: React.CSSProperties;
}

/** API imperativa expuesta por el ref del componente. */
export interface LibraEditorHandle {
  getEditor(): LibraEditor | null;
  getHTML(): string;
  getSafeHTML(): string;
  getJSON(): string;
  getMarkdown(): string;
  getPlainText(): string;
  loadFromJSON(value: string | LibraEditorBlock[]): void;
  loadFromHTML(html: string): void;
  loadFromMarkdown(md: string): void;
  clear(): void;
  focus(): void;
}

export declare const LibraEditor: React.ForwardRefExoticComponent<
  LibraEditorProps & React.RefAttributes<LibraEditorHandle>
>;
export default LibraEditor;

export { LibraEditorBlock, LibraEditorChangePayload } from '../libraeditor';
