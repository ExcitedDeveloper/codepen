<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { OpenState, toggleOpenState } from "../../utils/openState";
  import { collapseHTMLEditor } from "../../utils/expandCollapse";
  import type { NullableHTMLElement } from "../../utils/types";
  import { HTMLEditorOpenStore, HTMLContentStore } from "../../stores";
  import * as monaco from "monaco-editor";
  import { getWorker } from "./common";

  let editorElement: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let model: monaco.editor.ITextModel;

  let content: NullableHTMLElement;
  let cssEditor: NullableHTMLElement;
  let jsEditor: NullableHTMLElement;

  function loadCode(code: string, language: string) {
    model = monaco.editor.createModel(code, language);

    editor.setModel(model);
  }

  onMount(async () => {
    content = document.getElementById("content");
    cssEditor = document.getElementById("css-editor");
    jsEditor = document.getElementById("js-editor");

    self.MonacoEnvironment = {
      getWorker,
    };

    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

    editor = monaco.editor.create(editorElement, {
      automaticLayout: true,
      theme: "vs-dark",
      minimap: { enabled: false },
    });

    editor.onDidChangeModelContent((e) => {
      HTMLContentStore.set(editor.getValue());
    });

    loadCode("", "html");
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  });

  const handleClick = () => {
    HTMLEditorOpenStore.update(() => toggleOpenState(get(HTMLEditorOpenStore)));

    if (get(HTMLEditorOpenStore) === OpenState.Closed) {
      collapseHTMLEditor(content, cssEditor, jsEditor);
    }
  };
</script>

<div id="html-editor" class="editor html-editor">
  <div class="editor-powers">
    <div class="editor-powers-left">
      <h2 class="editor-title">
        <svg viewBox="0 0 15 15" class="file-type-icon" id="icon-file-html">
          <rect fill="#FF3C41" width="15" height="15" rx="4"></rect>
          <path
            d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
            fill="#28282B"
          ></path>
        </svg>
        <span>HTML</span>
      </h2>
    </div>
    <div class="editor-actions">
      <button
        type="button"
        class="editor-collapse-button"
        on:click={handleClick}><i class="fas fa-compress-alt fa-lg"></i></button
      >
    </div>
  </div>
  <div class="editor-code" bind:this={editorElement} />
</div>

<style>
  @import "./Editor.scss";

  .html-editor {
    grid-area: htmleditor;
  }

  .editor-powers {
    container: htmltitle / inline-size;
    height: var(--editor-action-height);
    display: flex;
  }

  @container htmltitle (max-width: 165px) {
    .editor-title {
      -webkit-transform: translate(-8px, -19px) rotate(90deg) scale(0.66);
      transform: translate(-8px, -19px) rotate(90deg) scale(0.66);

      background: none;
      position: absolute;
      left: 0;
      top: 20px;
      padding: 10px 0 0 0;
      z-index: 2;
      pointer-events: none;
      -webkit-transition: -webkit-transform 0.2s;
      transition: -webkit-transform 0.2s;
      transition: transform 0.2s;
      transition:
        transform 0.2s,
        -webkit-transform 0.2s;
      -webkit-transform-origin: left center;
      transform-origin: left center;
    }
  }

  .file-type-icon {
    width: 17px;
    height: 17px;
    -webkit-margin-end: 0.4rem;
    margin-inline-end: 0.4rem;
  }

  .editor-actions {
    background: var(--app-background);
    margin-left: auto;
  }

  .editor-actions button {
    float: right;
    height: 100%;
  }

  .editor-code {
    height: calc(100% - var(--editor-action-height));
    overflow-y: hidden;
  }
</style>
