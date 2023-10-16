<!-- https://stackoverflow.com/questions/46931103/making-a-dragbar-to-resize-divs-inside-css-grids -->
<script lang="ts">
  import { onMount } from "svelte";
  import { writable, type Unsubscriber } from "svelte/store";

  let handler: HTMLElement;
  let isHandlerDragging = false;
  let unsubscribe: Unsubscriber;

  const mousemoveCache = writable<{ x: number; y: number }[]>([]);

  onMount(() => {
    const wrapper = handler?.closest(".editors");
    const htmlEditor = document.getElementById("html-editor");
    const resizer = document.getElementById("css-editor-resizer");

    resizer?.addEventListener("mousedown", function (e) {
      console.log(`CSSEditorResizer mousedown`);
      // If mousedown event is fired from .handler, toggle flag to true
      if (e.target === handler) {
        console.log(`CSSEditorResizer mousedown handler is dragging`);
        isHandlerDragging = true;

        unsubscribe = mousemoveCache.subscribe((value) => {
          console.log(`mousemove cache`, value);
        });
      }
    });

    resizer?.addEventListener("mousemove", function (e) {
      console.log(`CSSEditorResizer mousemove`);
      // Don't do anything if dragging flag is false
      if (!isHandlerDragging) {
        console.log(`CSSEditorResizer mousemove handler is not dragging`);
        return false;
      }

      // Get offset
      var containerOffsetLeft = (htmlEditor as HTMLElement)?.offsetLeft;
      console.log(`CSSEditorResizer x = ${e.clientX}, y = ${e.clientY}`);

      // Get x-coordinate of pointer relative to container
      var pointerRelativeXpos = e.clientX - containerOffsetLeft;
      mousemoveCache.update((val) => [...val, { x: e.clientX, y: e.clientY }]);

      // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
      var boxAminWidth = 60;

      // Resize box A
      // * 8px is the left/right spacing between .handler and its inner pseudo-element
      // * Set flex-grow to 0 to prevent it from growing
      (htmlEditor as HTMLElement).style.width =
        Math.max(boxAminWidth, pointerRelativeXpos - 8) + "px";
      (htmlEditor as HTMLElement).style.flexGrow = "0";
      console.log(
        `CSSEditorResizer mousemove width`,
        Math.max(boxAminWidth, pointerRelativeXpos - 8) + "px",
      );
    });

    resizer?.addEventListener("mouseup", function (e) {
      console.log(`CSSEditorResizer mouseup is not dragging`);
      // Turn off dragging flag when user mouse is up
      isHandlerDragging = false;
      unsubscribe();
    });
  });
</script>

<div id="css-editor-resizer" bind:this={handler} class="editor-resizer"></div>

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
