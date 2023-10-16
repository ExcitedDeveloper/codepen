<!-- https://stackoverflow.com/questions/46931103/making-a-dragbar-to-resize-divs-inside-css-grids -->
<script lang="ts">
  import { onMount } from "svelte";

  let handler: HTMLElement;
  let isHandlerDragging = false;

  onMount(() => {
    // const wrapper = handler?.closest(".editors");
    const cssEditor = document.getElementById("css-editor");
    const resizer = document.getElementById("js-editor-resizer");

    resizer?.addEventListener("mousedown", function (e) {
      // console.log(`JSEditorResizer mousedown`);
      // If mousedown event is fired from .handler, toggle flag to true
      if (e.target === handler) {
        // console.log(`JSEditorResizer mousedown handler is dragging`);
        isHandlerDragging = true;
      }
    });

    resizer?.addEventListener("mousemove", function (e) {
      // console.log(`JSEditorResizer mousemove`);
      // Don't do anything if dragging flag is false
      if (!isHandlerDragging) {
        // console.log(`JSEditorResizer mousemove handler is not dragging`);
        return false;
      }

      // Get offset
      var containerOffsetLeft = (cssEditor as HTMLElement)?.offsetLeft;
      // console.log(`JSEditorResizer x = ${e.clientX}, y = ${e.clientY}`);

      // Get x-coordinate of pointer relative to container
      var pointerRelativeXpos = e.clientX - containerOffsetLeft;

      // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
      var boxAminWidth = 60;

      // Resize box A
      // * 8px is the left/right spacing between .handler and its inner pseudo-element
      // * Set flex-grow to 0 to prevent it from growing
      (cssEditor as HTMLElement).style.width =
        Math.max(boxAminWidth, pointerRelativeXpos - 8) + "px";
      (cssEditor as HTMLElement).style.flexGrow = "0";
      // console.log(
      //   `JSEditorResizer mousemove width`,
      //   Math.max(boxAminWidth, pointerRelativeXpos - 8) + "px",
      // );
    });

    resizer?.addEventListener("mouseup", function (e) {
      // console.log(`JSEditorResizer mouseup is not dragging`);
      // Turn off dragging flag when user mouse is up
      isHandlerDragging = false;
      unsubscribe();
    });
  });
</script>

<div id="js-editor-resizer" bind:this={handler} class="editor-resizer"></div>

<style>
  .editor-resizer {
    width: 18px;
    padding: 0;
    cursor: col-resize;
    flex: 0 0 auto;
    border: 1px solid purple;
  }

  .editor-resizer::before {
    content: "";
    display: block;
    width: 4px;
    height: 100%;
    margin: 0 auto;
  }
</style>
