import { dragbarWidth } from "./constants";
import type { NullableHTMLElement } from "./types";
import { get } from "svelte/store";
import {
  HTMLEditorOpenStore,
  CSSEditorOpenStore,
  JSEditorOpenStore,
} from "../stores";
import { OpenState } from "../utils/openState";

export const collapseHTMLEditor = (
  content: NullableHTMLElement,
  cssEditor: NullableHTMLElement,
  jsEditor: NullableHTMLElement,
) => {
  if (!content || !cssEditor || !jsEditor) return;

  const cssEditorIsCollapsed = get(CSSEditorOpenStore) === OpenState.Closed;
  const jsEditorIsCollapsed = get(JSEditorOpenStore) === OpenState.Closed;

  // If css and js editors are collapses, then don't
  // collapse html editor
  if (cssEditorIsCollapsed && jsEditorIsCollapsed) return;

  const htmlEditorColWidth = 0;
  let cssEditorColWidth;
  let jsEditorColWidth;

  if (!cssEditorIsCollapsed && !jsEditorIsCollapsed) {
    // Neither the css or the js editor are collapsed.
    // Give each editor half of the available space.
    cssEditorColWidth =
      cssEditor?.getBoundingClientRect().width +
      jsEditor?.getBoundingClientRect().width / 2;
    jsEditorColWidth =
      content.clientWidth - dragbarWidth * 3 - htmlEditorColWidth;
  } else if (cssEditorIsCollapsed) {
    // The css editor is collapsed.  Give the js editor all of the
    // available space.
    cssEditorColWidth = 0;
    jsEditorColWidth = content.clientWidth - dragbarWidth * 3;
  } else {
    // The js editor is collapsed.  Give the css editor all of the
    // available space.
    cssEditorColWidth = content.clientWidth - dragbarWidth * 3;
    jsEditorColWidth = 0;
  }

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
