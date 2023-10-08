<script>
  import HTMLEditorResizer from "./HTMLEditorResizer.svelte";
  import HtmlEditor from "./HTMLEditor.svelte";
  import CSSEditorResizer from "./CSSEditorResizer.svelte";
  import CSSEditor from "./CSSEditor.svelte";
  import JSEditorResizer from "./JSEditorResizer.svelte";
  import JsEditor from "./JSEditor.svelte";
  import EditorResizer from "./EditorResizer.svelte";
</script>

<div class="editors">
  <HTMLEditorResizer />
  <HtmlEditor />
  <CSSEditorResizer />
  <CSSEditor />
  <JSEditorResizer />
  <!-- <EditorResizer editorId={"css-editor"} /> -->
  <JsEditor />
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
