<script>
  import HTMLEditorResizer from "./HTMLEditorResizer.svelte";
  import HTMLEditor from "./HTMLEditor.svelte";
  import CSSEditorResizer from "./CSSEditorResizer.svelte";
  import CSSEditor from "./CSSEditor.svelte";
  import JSEditorResizer from "./JSEditorResizer.svelte";
  import JSEditor from "./JSEditor.svelte";
  import EditorResizer from "./EditorResizer.svelte";
</script>

<div class="editors">
  <HTMLEditorResizer />
  <HTMLEditor />
  <CSSEditorResizer />
  <CSSEditor />
  <JSEditorResizer />
  <!-- <EditorResizer editorId={"css-editor"} /> -->
  <JSEditor />
</div>

<style>
  .editors {
    border: 1px solid green;
    height: 100%;
    width: 100%;
    flex: 3;
    display: flex;
    -webkit-user-select: none;
    user-select: none;
  }
</style>
