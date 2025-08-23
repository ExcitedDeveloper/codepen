import { dragbarWidth } from "./constants";
import type { NullableHTMLElement } from "./types";
import { get } from "svelte/store";
import {
  HTMLEditorOpenStore,
  CSSEditorOpenStore,
  JSEditorOpenStore,
} from "../stores";
import { OpenState } from "../utils/openState";

type EditorType = "html" | "css" | "js";

const getEditorStores = () => ({
  html: HTMLEditorOpenStore,
  css: CSSEditorOpenStore,
  js: JSEditorOpenStore,
});

const calculateColumnWidths = (
  collapsedEditor: EditorType,
  content: HTMLElement,
  editorElements: { [key in EditorType]: NullableHTMLElement }
) => {
  const stores = getEditorStores();
  const otherEditors = (["html", "css", "js"] as EditorType[]).filter(
    type => type !== collapsedEditor
  );
  
  const isCollapsed = (type: EditorType) => get(stores[type]) === OpenState.Closed;
  const otherEditorsCollapsed = otherEditors.map(isCollapsed);

  // If both other editors are collapsed, don't collapse this one
  if (otherEditorsCollapsed.every(collapsed => collapsed)) return null;

  const widths = { html: 0, css: 0, js: 0 };
  widths[collapsedEditor] = 0;

  const [editor1, editor2] = otherEditors;
  const [isEditor1Collapsed, isEditor2Collapsed] = otherEditorsCollapsed;

  if (!isEditor1Collapsed && !isEditor2Collapsed) {
    // Neither of the other editors are collapsed - split space between them
    const editor1Element = editorElements[editor1];
    const editor2Element = editorElements[editor2];
    
    if (editor1Element && editor2Element) {
      widths[editor1] = editor1Element.getBoundingClientRect().width +
        editor2Element.getBoundingClientRect().width / 2 +
        (collapsedEditor === "html" ? 40 : 0);
      widths[editor2] = content.clientWidth - dragbarWidth * 3 - widths[editor1];
    }
  } else if (isEditor1Collapsed) {
    // First editor is collapsed - give all space to second editor
    widths[editor2] = content.clientWidth - dragbarWidth * 3;
  } else {
    // Second editor is collapsed - give all space to first editor
    widths[editor1] = content.clientWidth - dragbarWidth * 3;
  }

  return [
    dragbarWidth,
    widths.html,
    dragbarWidth,
    widths.css,
    dragbarWidth,
    widths.js,
  ];
};

export const collapseEditor = (
  editorType: EditorType,
  content: NullableHTMLElement,
  ...otherEditorElements: NullableHTMLElement[]
) => {
  if (!content || otherEditorElements.some(el => !el)) return;

  const editorElements = {
    html: editorType === "html" ? null : otherEditorElements.find(el => el?.id?.includes("html")),
    css: editorType === "css" ? null : otherEditorElements.find(el => el?.id?.includes("css")),
    js: editorType === "js" ? null : otherEditorElements.find(el => el?.id?.includes("js")),
  };

  // Fill in missing references by finding them in the DOM
  Object.keys(editorElements).forEach(type => {
    if (!editorElements[type as EditorType]) {
      editorElements[type as EditorType] = document.getElementById(`${type}-editor`);
    }
  });

  const cols = calculateColumnWidths(editorType, content as HTMLElement, editorElements);
  if (!cols) return;

  const newColDefn = cols.map(c => c.toString() + "px").join(" ");
  content.style.gridTemplateColumns = newColDefn;
};

// Legacy functions for backwards compatibility
export const collapseHTMLEditor = (
  content: NullableHTMLElement,
  cssEditor: NullableHTMLElement,
  jsEditor: NullableHTMLElement,
) => collapseEditor("html", content, cssEditor, jsEditor);

export const collapseCSSEditor = (
  content: NullableHTMLElement,
  htmlEditor: NullableHTMLElement,
  jsEditor: NullableHTMLElement,
) => collapseEditor("css", content, htmlEditor, jsEditor);

export const collapseJSEditor = (
  content: NullableHTMLElement,
  htmlEditor: NullableHTMLElement,
  cssEditor: NullableHTMLElement,
) => collapseEditor("js", content, htmlEditor, cssEditor);
