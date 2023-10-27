<!-- https://stackoverflow.com/questions/46931103/making-a-dragbar-to-resize-divs-inside-css-grids -->
<script lang="ts">
  import { DraggingStore } from "../../stores";
  import { setCursor } from "../../utils/setCursor";

  const startCssEditorResizerDrag = () => {
    DraggingStore.update(() => ({
      isCSSEditorResizerDragging: true,
      isJSEditorResizerDragging: false,
    }));
    setCursor("ew-resize");
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
