import { writable } from "svelte/store";

export const DraggingStore = writable({
  isCSSEditorResizerDragging: false,
  isJSEditorResizerDragging: false,
});
