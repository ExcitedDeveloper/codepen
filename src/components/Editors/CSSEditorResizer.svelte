<script lang="ts">
  const handler = document.querySelector(".editor-resizer");
  const wrapper = handler?.closest(".wrapper");
  const htmlEditor = wrapper?.querySelector("#html-editor");
  let isHandlerDragging = false;

  document.addEventListener("mousedown", function (e) {
    // If mousedown event is fired from .handler, toggle flag to true
    if (e.target === handler) {
      isHandlerDragging = true;
    }
  });

  document.addEventListener("mousemove", function (e) {
    // Don't do anything if dragging flag is false
    if (!isHandlerDragging) {
      return false;
    }

    // Get offset
    var containerOffsetLeft = (wrapper as HTMLElement)?.offsetLeft;

    // Get x-coordinate of pointer relative to container
    var pointerRelativeXpos = e.clientX - containerOffsetLeft;

    // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
    var boxAminWidth = 60;

    // Resize box A
    // * 8px is the left/right spacing between .handler and its inner pseudo-element
    // * Set flex-grow to 0 to prevent it from growing
    (htmlEditor as HTMLElement).style.width =
      Math.max(boxAminWidth, pointerRelativeXpos - 8) + "px";
    (htmlEditor as HTMLElement).style.flexGrow = "0";
  });

  document.addEventListener("mouseup", function (e) {
    // Turn off dragging flag when user mouse is up
    isHandlerDragging = false;
  });
</script>

<div class="editor-resizer"></div>

<style>
  .editor-resizer {
    position: relative;
    z-index: 2;
    width: 18px;
    flex: 1 1 auto;
    border: 1px solid purple;
  }
</style>
