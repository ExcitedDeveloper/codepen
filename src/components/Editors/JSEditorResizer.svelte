<!-- https://stackoverflow.com/questions/46931103/making-a-dragbar-to-resize-divs-inside-css-grids -->
<script lang="ts">
  import { DraggingStore } from "../../stores";
  import { get } from "svelte/store";

  const setCursor = (cursor: string) => {
    const content = document.getElementById("content");
    if (!content) return;
    content.style.cursor = cursor;
  };

  const startJsEditorResizerDrag = () => {
    console.log(`startJsEditorResizerDrag`);
    DraggingStore.update((curr) => ({
      ...curr,
      isJSEditorResizerDragging: true,
      isCSSEditorResizerDragging: false,
    }));
    setCursor("ew-resize");
  };

  const onDragJsEditorResizer = (event: MouseEvent) => {
    if (!get(DraggingStore).isJSEditorResizerDragging) return;

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

    const htmlEditorColWidth = htmlEditor.clientWidth;
    const jsEditorColWidth = content.clientWidth - event.clientX - dragbarWidth;
    const cssEditorColWidth =
      content.clientWidth -
      htmlEditorColWidth -
      jsEditorColWidth -
      3 * dragbarWidth;

    console.log(`onDrag htmlEditorColWidth`, htmlEditorColWidth);
    console.log(`onDrag cssEditorColWidth`, cssEditorColWidth);

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
  id="js-editor-resizer"
  on:mousedown={startJsEditorResizerDrag}
  on:mousemove={onDragJsEditorResizer}
  class="editor-resizer"
  role="separator"
></div>

<style>
  .editor-resizer {
    width: 18px;
    padding: 0;
    cursor: col-resize;
    grid-area: jsdragbar;
    border: 1px solid purple;
  }
</style>
