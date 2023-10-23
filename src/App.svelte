<script lang="ts">
  // import Toolbar from "./components/Toolbar.svelte";
  import Editors from "./components/Editors/Editors.svelte";
  import Output from "./components/Output.svelte";
  import { DraggingStore } from "./stores";
  import { get } from "svelte/store";
  import HTMLEditorResizer from "./components/Editors/HTMLEditorResizer.svelte";
  import HTMLEditor from "./components/Editors/HTMLEditor.svelte";
  import CSSEditorResizer from "./components/Editors/CSSEditorResizer.svelte";
  import CSSEditor from "./components/Editors/CSSEditor.svelte";
  import JSEditorResizer from "./components/Editors/JSEditorResizer.svelte";
  import JSEditor from "./components/Editors/JSEditor.svelte";

  const resetColumnSizes = () => {
    // when content resizes return to default col sizes
    const content = document.getElementById("content");
    if (!content) return;
    content.style.gridTemplateColumns = "18px 1fr 18px 1fr 18px 1fr";
  };

  const setCursor = (cursor: string) => {
    const content = document.getElementById("content");
    if (!content) return;
    content.style.cursor = cursor;
  };

  const endDrag = () => {
    console.log(`endDrag`);
    DraggingStore.set({
      isCSSEditorResizerDragging: false,
      isJSEditorResizerDragging: false,
    });

    setCursor("auto");
  };

  // const onDrag = (event: MouseEvent) => {
  //   if (
  //     get(DraggingStore).isCSSEditorResizerDragging ||
  //     get(DraggingStore).isJSEditorResizerDragging
  //   ) {
  //     console.log(`onDrag dragging`);
  //     const content = document.getElementById("content");
  //     const htmlEditor = document.getElementById("html-editor");
  //     const jsEditor = document.getElementById("js-editor");

  //     if (!content || !htmlEditor || !jsEditor) return;
  //     console.log(`onDrag found all elements`);

  //     const htmlEditorColWidth = get(DraggingStore).isCSSEditorResizerDragging
  //       ? event.clientX
  //       : htmlEditor.clientWidth;
  //     const jsEditorColWidth = get(DraggingStore).isJSEditorResizerDragging
  //       ? content.clientWidth - event.clientX
  //       : jsEditor.clientWidth;
  //     console.log(`onDrag htmlEditorColWidth`, htmlEditorColWidth);
  //     console.log(`onDrag jsEditorColWidth`, jsEditorColWidth);

  //     let dragbarWidth = 18;

  //     let cols = [
  //       dragbarWidth,
  //       htmlEditorColWidth,
  //       dragbarWidth,
  //       content.clientWidth -
  //         2 * dragbarWidth -
  //         htmlEditorColWidth -
  //         jsEditorColWidth,
  //       dragbarWidth,
  //       jsEditorColWidth,
  //     ];

  //     let newColDefn = cols.map((c) => c.toString() + "px").join(" ");

  //     console.log(`onDrag newColDefn`, newColDefn);
  //     content.style.gridTemplateColumns = newColDefn;

  //     event.preventDefault();
  //   }
  // };

  const onDragCSSEditorResizer = (event: MouseEvent) => {
    console.log(
      `onDragCSSEditorResizer isCSSEditorResizerDragging`,
      get(DraggingStore).isCSSEditorResizerDragging,
    );
    if (!get(DraggingStore).isCSSEditorResizerDragging) {
      event.preventDefault();
      return;
    }

    console.log(`onDrag css resizer dragging`);
    const content = document.getElementById("content");
    const htmlEditor = document.getElementById("html-editor");
    const cssEditor = document.getElementById("css-editor");
    const jsEditorResizer = document.getElementById("js-editor-resizer");
    const jsEditor = document.getElementById("js-editor");

    if (!content || !htmlEditor || !cssEditor || !jsEditorResizer || !jsEditor)
      return;
    console.log(`onDrag css resizer found all elements`);

    let dragbarWidth = 18;

    const htmlEditorColWidth = event.clientX - dragbarWidth;
    const cssEditorColWidth =
      jsEditorResizer.getBoundingClientRect().left -
      event.clientX -
      dragbarWidth;
    const jsEditorColWidth =
      content.clientWidth -
      jsEditorResizer.getBoundingClientRect().left -
      dragbarWidth;
    console.log(`event.clientX`, event.clientX);
    console.log(`onDrag htmlEditorColWidth`, htmlEditorColWidth);
    console.log(`onDrag cssEditorColWidth`, cssEditorColWidth);
    console.log(`onDrag jsEditorColWidth`, jsEditorColWidth);

    let cols = [
      dragbarWidth,
      htmlEditorColWidth,
      dragbarWidth,
      cssEditorColWidth,
      dragbarWidth,
      jsEditorColWidth,
    ];

    let newColDefn = cols.map((c) => c.toString() + "px").join(" ");

    console.log(`onDrag newColDefn`, newColDefn);
    content.style.gridTemplateColumns = newColDefn;

    event.preventDefault();
  };

  const onDrag = (event: MouseEvent) => {
    if (get(DraggingStore).isCSSEditorResizerDragging) {
      onDragCSSEditorResizer(event);
    } else {
      //
    }
  };
</script>

<main on:resize={resetColumnSizes}>
  <!-- <Toolbar /> -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div
    id="content"
    class="content"
    role="main"
    on:mouseup={endDrag}
    on:mousemove={onDrag}
  >
    <HTMLEditorResizer />
    <HTMLEditor />
    <CSSEditorResizer />
    <CSSEditor />
    <JSEditorResizer />
    <JSEditor />
    <!-- <Output /> -->
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
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 18px 1fr 18px 1fr 18px 1fr;
  }

  @media (max-width: 766px) {
    .content {
      flex-direction: row;
    }
  }

  @media (max-width: 486px) {
    .content {
      flex-direction: column;
    }
  }
</style>
