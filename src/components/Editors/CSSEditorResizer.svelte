<!-- https://stackoverflow.com/questions/46931103/making-a-dragbar-to-resize-divs-inside-css-grids -->
<script lang="ts">
  import { DraggingStore } from "../../stores";
  import { get } from "svelte/store";

  const setCursor = (cursor: string) => {
    const content = document.getElementById("content");
    if (!content) return;
    content.style.cursor = cursor;
  };

  const startCssEditorResizerDrag = () => {
    console.log(`startCssEditorResizerDrag`);
    DraggingStore.update((curr) => ({
      ...curr,
      isCSSEditorResizerDragging: true,
      isJSEditorResizerDragging: false,
    }));
    setCursor("ew-resize");
  };

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
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  id="css-editor-resizer"
  on:mousedown={startCssEditorResizerDrag}
  class="editor-resizer"
  role="separator"
></div>

<style>
  .editor-resizer {
    width: 18px;
    padding: 0;
    cursor: col-resize;
    grid-area: cssdragbar;
    border: 1px solid purple;
  }
</style>
