import { writable, get } from "svelte/store";
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
export const SourceDocStore = writable("");

/**
 * @type {number | undefined}
 */
let timeout;

HTMLContentStore.subscribe((c) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const html = c;
    const css = get(CSSContentStore);
    const js = get(JSContentStore);

    SourceDocStore.set(`
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `);
  }, 250);
});

CSSContentStore.subscribe((c) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const html = get(HTMLContentStore);
    const css = c;
    const js = get(JSContentStore);

    SourceDocStore.set(`
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `);
  }, 250);
});

JSContentStore.subscribe((c) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const html = get(HTMLContentStore);
    const css = get(CSSContentStore);
    const js = c;

    SourceDocStore.set(`
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `);
  }, 250);
});
