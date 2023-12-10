<script lang="ts">
  import { onMount } from "svelte";
  import CodeMirror from "svelte-codemirror-editor";
  import { javascript } from "@codemirror/lang-javascript";
  import { html } from "@codemirror/lang-html";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { gutter, lineNumbers } from "@codemirror/gutter";
  import { EditorView, basicSetup } from "codemirror";

  export let changeHandler;

  let value = "";
  let editor: NullableHTMLElement;

  const view = new EditorView({
    doc: 'console.log("Hello world")',
    extensions: [basicSetup, javascript()],
    parent: document.body,
  });

  onMount(() => {
    editor = document.getElementById("editor-code").appendChild(view.dom);
  });
</script>

<div id="editor-code" class="editor-code">
  <!-- <CodeMirror
    bind:value
    lang={html()}
    theme={oneDark}
    on:change={() => changeHandler(value)}
    basic={true}
    styles={{
      "&": {
        maxHeight: "100%",
        height: "100%",
      },
    }}
  /> -->
</div>

<style>
  .editor-code {
    height: calc(100% - var(--editor-action-height));
    overflow-y: auto;
  }
</style>
