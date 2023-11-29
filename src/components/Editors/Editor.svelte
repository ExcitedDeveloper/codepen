<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { gutter, lineNumbers } from "@codemirror/gutter";

  export let changeHandler;

  let value = "";
</script>

<div class="editor-code">
  <CodeMirror
    bind:value
    lang={javascript()}
    theme={oneDark}
    on:change={() => changeHandler(value)}
    styles={{
      "&": {
        maxHeight: "100%",
        height: "100%",
      },
    }}
  />
</div>

<style>
  .editor-code {
    height: calc(100% - var(--editor-action-height));
    overflow-y: auto;
  }
</style>
