<!-- https://stackoverflow.com/questions/46931103/making-a-dragbar-to-resize-divs-inside-css-grids -->
<script lang="ts">
  import { DraggingStore } from "../../stores";
  import { get } from "svelte/store";

  const setCursor = (cursor: string) => {
    const content = document.getElementById("content");
    if (!content) return;
    content.style.cursor = cursor;
  };

  const startJSEditorResizerDrag = () => {
    DraggingStore.update(() => ({
      isJSEditorResizerDragging: true,
      isCSSEditorResizerDragging: false,
    }));
    setCursor("ew-resize");
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  id="js-editor-resizer"
  on:mousedown={startJSEditorResizerDrag}
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
