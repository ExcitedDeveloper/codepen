import { writable } from "svelte/store";
import { OpenState } from "./utils/openState";

export const DraggingStore = writable({
  isCSSEditorResizerDragging: false,
  isJSEditorResizerDragging: false,
});

export const HTMLEditorOpenStore = writable(OpenState.Open);
export const HTMLEditorContent = writable("");
export const CSSEditorOpenStore = writable(OpenState.Open);
export const JSEditorOpenStore = writable(OpenState.Open);
