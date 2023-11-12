import { dragbarWidth } from "./constants";
import type { NullableHTMLElement } from "./types";

export const expandHTMLEditor = () => {
  //
};

export const collapseHTMLEditor = (
  content: NullableHTMLElement,
  cssEditor: NullableHTMLElement,
  jsEditorResizer: NullableHTMLElement,
  jsEditor: NullableHTMLElement,
) => {
  if (!content || !cssEditor || !jsEditorResizer || !jsEditor) return null;

  const cssEditorRect = cssEditor.getBoundingClientRect();

  const htmlEditorColWidth = 0;

  // If cssEditorRect.width > 0, the css editor is not collapsed.
  // Collapse the css editor and leave the js editor at it's
  // current width.
  // Else cssEditorReact is already collapsed.  Give the js editor
  // the remaining content width.
  const cssEditorColWidth =
    cssEditorRect.width > 0
      ? jsEditorResizer.getBoundingClientRect().left - dragbarWidth * 2
      : 0;
  const jsEditorColWidth =
    cssEditorRect.width > 0
      ? jsEditor.getBoundingClientRect().width
      : content.clientWidth - dragbarWidth * 3;

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
