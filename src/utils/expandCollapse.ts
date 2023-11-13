import { dragbarWidth } from "./constants";
import type { NullableHTMLElement } from "./types";

export const collapseHTMLEditor = (
  content: NullableHTMLElement,
  cssEditor: NullableHTMLElement,
  jsEditor: NullableHTMLElement,
) => {
  if (!content || !cssEditor || !jsEditor) return;

  const htmlEditorColWidth = 0;
  const cssEditorColWidth =
    cssEditor?.getBoundingClientRect().width +
    jsEditor?.getBoundingClientRect().width / 2;
  const jsEditorColWidth =
    content?.clientWidth - dragbarWidth * 3 - htmlEditorColWidth;

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

export const collapseCSSEditor = (
  content: NullableHTMLElement,
  htmlEditor: NullableHTMLElement,
  cssEditor: NullableHTMLElement,
) => {
  if (!content || !htmlEditor || !cssEditor) return;

  const htmlEditorColWidth =
    htmlEditor?.getBoundingClientRect().width +
    cssEditor?.getBoundingClientRect().width / 2;
  const cssEditorColWidth = 0;
  const jsEditorColWidth =
    content?.clientWidth - dragbarWidth * 3 - htmlEditorColWidth;

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

export const collapseJSEditor = (
  content: NullableHTMLElement,
  htmlEditor: NullableHTMLElement,
  jsEditor: NullableHTMLElement,
) => {
  if (!content || !htmlEditor || !jsEditor) return;

  const htmlEditorColWidth =
    htmlEditor?.getBoundingClientRect().width +
    jsEditor?.getBoundingClientRect().width / 2;
  const cssEditorColWidth =
    content?.clientWidth - dragbarWidth * 3 - htmlEditorColWidth;
  const jsEditorColWidth = 0;

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
