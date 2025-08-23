<script lang="ts">
  import { onMount } from "svelte";
  import Output from "./components/Output.svelte";
  import {
    DraggingStore,
    HTMLEditorOpenStore,
    CSSEditorOpenStore,
    JSEditorOpenStore,
    HTMLContentStore,
    CSSContentStore,
    JSContentStore,
  } from "./stores";
  import { get } from "svelte/store";
  import HTMLEditorResizer from "./components/Editors/HTMLEditorResizer.svelte";
  import CodeEditor from "./components/Editors/CodeEditor.svelte";
  import EditorResizer from "./components/Editors/EditorResizer.svelte";
  import { setCursor } from "./utils/setCursor";
  import type { NullableHTMLElement } from "./utils/types";
  import { dragbarWidth } from "./utils/constants";
  import { OpenState } from "./utils/openState";
  import { collapseEditor } from "./utils/expandCollapse";
  import "@fortawesome/fontawesome-free/css/all.min.css";

  let content: NullableHTMLElement;
  let htmlEditorResizer: NullableHTMLElement;
  let htmlEditor: NullableHTMLElement;
  let cssEditorResizer: NullableHTMLElement;
  let cssEditor: NullableHTMLElement;
  let jsEditorResizer: NullableHTMLElement;
  let jsEditor: NullableHTMLElement;

  onMount(() => {
    content = document.getElementById("content");
    htmlEditorResizer = document.getElementById("html-editor-resizer");
    htmlEditor = document.getElementById("html-editor");
    cssEditorResizer = document.getElementById("css-editor-resizer");
    cssEditor = document.getElementById("css-editor");
    jsEditorResizer = document.getElementById("js-editor-resizer");
    jsEditor = document.getElementById("js-editor");
  });

  const resetColumnSizes = () => {
    // when content resizes return to default col sizes
    const content = document.getElementById("content");
    if (!content) return;
    content.style.gridTemplateColumns = "18px 1fr 18px 1fr 18px 1fr";
  };

  const endDrag = () => {
    DraggingStore.set({
      isCSSEditorResizerDragging: false,
      isJSEditorResizerDragging: false,
    });

    setCursor("auto");
  };

  const isDragging = () => {
    return (
      get(DraggingStore).isCSSEditorResizerDragging ||
      get(DraggingStore).isJSEditorResizerDragging
    );
  };

  const getColWidths = (event: MouseEvent) => {
    if (
      !content ||
      !htmlEditor ||
      !cssEditor ||
      !jsEditorResizer ||
      !jsEditor ||
      !cssEditorResizer ||
      !htmlEditorResizer ||
      !isDragging()
    )
      return null;

    const leftHtmlResizer = htmlEditorResizer.getBoundingClientRect().left;
    const leftCssResizer = cssEditorResizer.getBoundingClientRect().left;
    const leftJsResizer = jsEditorResizer.getBoundingClientRect().left;

    const htmlEditorColWidth = get(DraggingStore).isCSSEditorResizerDragging
      ? event.clientX - dragbarWidth * 1.5
      : leftCssResizer - leftHtmlResizer - dragbarWidth;
    const cssEditorColWidth = get(DraggingStore).isCSSEditorResizerDragging
      ? leftJsResizer - event.clientX - dragbarWidth * 0.5
      : event.clientX - leftCssResizer - dragbarWidth * 1.5;
    const jsEditorColWidth = get(DraggingStore).isCSSEditorResizerDragging
      ? content.clientWidth - leftJsResizer - dragbarWidth
      : content.clientWidth - event.clientX - dragbarWidth * 0.5;

    HTMLEditorOpenStore.update(() =>
      htmlEditorColWidth <= 0 ? OpenState.Closed : OpenState.Open,
    );

    CSSEditorOpenStore.update(() =>
      cssEditorColWidth <= 0 ? OpenState.Closed : OpenState.Open,
    );

    JSEditorOpenStore.update(() =>
      jsEditorColWidth <= 0 ? OpenState.Closed : OpenState.Open,
    );

    return {
      htmlEditorColWidth,
      cssEditorColWidth,
      jsEditorColWidth,
    };
  };

  const onDrag = (event: MouseEvent) => {
    const colWidths = getColWidths(event);

    if (!colWidths || !content || !isDragging()) return;

    let cols = [
      dragbarWidth,
      colWidths.htmlEditorColWidth,
      dragbarWidth,
      colWidths.cssEditorColWidth,
      dragbarWidth,
      colWidths.jsEditorColWidth,
    ];

    let newColDefn = cols.map((c) => c.toString() + "px").join(" ");

    content.style.gridTemplateColumns = newColDefn;

    event.preventDefault();
  };
</script>

<main on:resize={resetColumnSizes}>
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div
    id="content"
    class="content"
    role="main"
    on:mouseup={endDrag}
    on:mousemove={onDrag}
  >
    <HTMLEditorResizer />
    <CodeEditor
      editorType="html"
      language="html"
      store={HTMLContentStore}
      openStore={HTMLEditorOpenStore}
      collapseFunction={(content, ...editors) => collapseEditor("html", content, ...editors)}
      otherEditors={["css-editor", "js-editor"]}
    />
    <EditorResizer resizerType="css" />
    <CodeEditor
      editorType="css"
      language="css"
      store={CSSContentStore}
      openStore={CSSEditorOpenStore}
      collapseFunction={(content, ...editors) => collapseEditor("css", content, ...editors)}
      otherEditors={["html-editor", "js-editor"]}
    />
    <EditorResizer resizerType="js" />
    <CodeEditor
      editorType="js"
      language="javascript"
      store={JSContentStore}
      openStore={JSEditorOpenStore}
      collapseFunction={(content, ...editors) => collapseEditor("js", content, ...editors)}
      otherEditors={["html-editor", "css-editor"]}
    />
    <Output />
  </div>
</main>

<style>
  main {
    height: 100%;
  }

  .content {
    height: 100%;
    display: grid;
    grid-template-areas: "htmldragbar htmleditor cssdragbar csseditor jsdragbar jseditor" "output output output output output output";
    grid-template-rows: minmax(250px, 1fr) minmax(250px, 1fr);
    grid-template-columns: 18px 1fr 18px 1fr 18px 1fr;
  }
</style>
