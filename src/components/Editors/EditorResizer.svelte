<!-- https://stackoverflow.com/questions/46931103/making-a-dragbar-to-resize-divs-inside-css-grids -->
<script lang="ts">
  import { DraggingStore } from "../../stores";
  import { setCursor } from "../../utils/setCursor";

  export let resizerType: "css" | "js";

  const startDrag = () => {
    const dragState = {
      isCSSEditorResizerDragging: resizerType === "css",
      isJSEditorResizerDragging: resizerType === "js",
    };
    
    DraggingStore.update(() => dragState);
    setCursor("ew-resize");
  };

  const gridArea = resizerType === "css" ? "cssdragbar" : "jsdragbar";
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  id="{resizerType}-editor-resizer"
  on:mousedown={startDrag}
  class="editor-resizer"
  style="grid-area: {gridArea};"
  role="separator"
></div>

<style>
  .editor-resizer {
    width: 18px;
    padding: 0;
    cursor: col-resize;
  }
</style>