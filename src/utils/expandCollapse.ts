import { dragbarWidth } from "./constants";
import type { NullableHTMLElement } from "./types";

export const expandHTMLEditor = () => {
  //
};

export const collapseHTMLEditor = (
  content: NullableHTMLElement,
  jsEditorResizer: NullableHTMLElement,
  jsEditor: NullableHTMLElement,
) => {
  if (!content || !jsEditorResizer || !jsEditor) return null;

  const htmlEditorColWidth = 0;
  const cssEditorColWidth =
    jsEditorResizer.getBoundingClientRect().left - dragbarWidth * 2;
  const jsEditorColWidth = jsEditor.getBoundingClientRect().width;

  let cols = [
    dragbarWidth,
    htmlEditorColWidth,
    dragbarWidth,
    cssEditorColWidth,
    dragbarWidth,
    jsEditorColWidth,
  ];

  let newColDefn = cols.map((c) => c.toString() + "px").join(" ");

  content.style.gridTemplateColumns = newColDefn;
};

export const expandCSSEditor = () => {
  //
};

export const collapseCSSEditor = () => {
  //
};

export const expandJSEditor = () => {
  //
};

export const collapseJSEditor = () => {
  //
};
