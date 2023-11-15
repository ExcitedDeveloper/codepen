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
      content.clientWidth - dragbarWidth * 3 - cssEditorColWidth;
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
  jsEditor: NullableHTMLElement,
) => {
  if (!content || !htmlEditor || !jsEditor) return;

  const htmlEditorIsCollapsed = get(HTMLEditorOpenStore) === OpenState.Closed;
  const jsEditorIsCollapsed = get(JSEditorOpenStore) === OpenState.Closed;

  // If html and js editors are collapses, then don't
  // collapse css editor
  if (htmlEditorIsCollapsed && jsEditorIsCollapsed) return;

  const cssEditorColWidth = 0;
  let htmlEditorColWidth;
  let jsEditorColWidth;

  if (!htmlEditorIsCollapsed && !jsEditorIsCollapsed) {
    // Neither the html or the js editor are collapsed.
    // Give each editor half of the available space.
    htmlEditorColWidth =
      htmlEditor?.getBoundingClientRect().width +
      jsEditor?.getBoundingClientRect().width / 2;
    jsEditorColWidth =
      content.clientWidth - dragbarWidth * 3 - htmlEditorColWidth;
  } else if (htmlEditorIsCollapsed) {
    // The html editor is collapsed.  Give the js editor all of the
    // available space.
    htmlEditorColWidth = 0;
    jsEditorColWidth = content.clientWidth - dragbarWidth * 3;
  } else {
    // The js editor is collapsed.  Give the html editor all of the
    // available space.
    htmlEditorColWidth = content.clientWidth - dragbarWidth * 3;
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

export const collapseJSEditor = (
  content: NullableHTMLElement,
  htmlEditor: NullableHTMLElement,
  cssEditor: NullableHTMLElement,
) => {
  if (!content || !cssEditor || !htmlEditor) return;

  const cssEditorIsCollapsed = get(CSSEditorOpenStore) === OpenState.Closed;
  const htmlEditorIsCollapsed = get(HTMLEditorOpenStore) === OpenState.Closed;

  // If css and html editors are collapses, then don't
  // collapse js editor
  if (cssEditorIsCollapsed && htmlEditorIsCollapsed) return;

  const jsEditorColWidth = 0;
  let cssEditorColWidth;
  let htmlEditorColWidth;

  if (!cssEditorIsCollapsed && !htmlEditorIsCollapsed) {
    // Neither the css or the html editor are collapsed.
    // Give each editor half of the available space.
    cssEditorColWidth =
      cssEditor?.getBoundingClientRect().width +
      htmlEditor?.getBoundingClientRect().width / 2;
    htmlEditorColWidth =
      content.clientWidth - dragbarWidth * 3 - cssEditorColWidth;
  } else if (cssEditorIsCollapsed) {
    // The css editor is collapsed.  Give the html editor all of the
    // available space.
    cssEditorColWidth = 0;
    htmlEditorColWidth = content.clientWidth - dragbarWidth * 3;
  } else {
    // The html editor is collapsed.  Give the css editor all of the
    // available space.
    cssEditorColWidth = content.clientWidth - dragbarWidth * 3;
    htmlEditorColWidth = 0;
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
