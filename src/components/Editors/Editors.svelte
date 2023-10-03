<script>
  import CSSEditor from "./CSSEditor.svelte";
  import EditorResizer from "./EditorResizer.svelte";
  import HtmlEditor from "./HTMLEditor.svelte";
  import JsEditor from "./JSEditor.svelte";
</script>

<div class="editors">
  <EditorResizer />
  <HtmlEditor />
  <EditorResizer />
  <JsEditor />
  <EditorResizer />
  <CSSEditor />
</div>

<style>
  .editors {
    border: 1px solid green;
    height: 100%;
    width: 100%;
    flex: 3;
    display: flex;
  }
</style>
