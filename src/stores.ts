import { writable, get, derived } from "svelte/store";
import { OpenState } from "./utils/openState";

export const DraggingStore = writable({
  isCSSEditorResizerDragging: false,
  isJSEditorResizerDragging: false,
});

export const HTMLEditorOpenStore = writable(OpenState.Open);
export const HTMLContentStore = writable("");
export const CSSEditorOpenStore = writable(OpenState.Open);
export const CSSContentStore = writable("");
export const JSEditorOpenStore = writable(OpenState.Open);
export const JSContentStore = writable("");

// Derived store that automatically updates when any content changes
export const SourceDocStore = derived(
  [HTMLContentStore, CSSContentStore, JSContentStore],
  ([$html, $css, $js], set) => {
    let timeout: number | undefined;
    
    const update = () => {
      set(`
    <html>
      <body>${$html}</body>
      <style>${$css}</style>
      <script>${$js}</script>
    </html>
  `);
    };

    clearTimeout(timeout);
    timeout = setTimeout(update, 250);

    return () => clearTimeout(timeout);
  },
  ""
);