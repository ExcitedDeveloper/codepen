<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { OpenState, toggleOpenState } from "../../utils/openState";
  import { collapseJSEditor } from "../../utils/expandCollapse";
  import type { NullableHTMLElement } from "../../utils/types";
  import { JSEditorOpenStore } from "../../stores";
  import * as monaco from "monaco-editor";
  import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
  import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
  import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
  import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
  import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

  let editorElement: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let model: monaco.editor.ITextModel;

  let content: NullableHTMLElement;
  let cssEditor: NullableHTMLElement;
  let htmlEditor: NullableHTMLElement;

  function loadCode(code: string, language: string) {
    model = monaco.editor.createModel(code, language);

    editor.setModel(model);
  }

  onMount(async () => {
    content = document.getElementById("content");
    cssEditor = document.getElementById("css-editor");
    htmlEditor = document.getElementById("html-editor");

    self.MonacoEnvironment = {
      getWorker: function (_: any, label: string) {
        if (label === "json") {
          return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
          return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
          return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
          return new tsWorker();
        }
        return new editorWorker();
      },
    };

    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

    editor = monaco.editor.create(editorElement, {
      automaticLayout: true,
      theme: "vs-dark",
      minimap: { enabled: false },
    });

    editor.onDidChangeModelContent((e) => {
      console.log(editor.getValue());
    });

    loadCode("", "javascript");
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  });

  const handleClick = () => {
    JSEditorOpenStore.update(() => toggleOpenState(get(JSEditorOpenStore)));

    if (get(JSEditorOpenStore) === OpenState.Closed) {
      collapseJSEditor(content, htmlEditor, cssEditor);
    }
  };
</script>

<div id="js-editor" class="editor js-editor">
  <div class="editor-powers">
    <div class="editor-powers-left">
      <h2 class="editor-title">
        <svg viewBox="0 0 15 15" class="file-type-icon" id="icon-file-js">
          <rect fill="#FF3C41" width="15" height="15" rx="4"></rect>
          <path
            d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
            fill="#28282B"
          ></path>
        </svg>
        <span>JS</span>
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
  .editor-collapse-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  .editor {
    --editor-action-height: 36px;
    --editor-background: rgb(29, 30, 34);
    background: var(--editor-background);
  }

  .js-editor {
    grid-area: jseditor;
  }

  .editor-powers {
    container: jstitle / inline-size;
    height: var(--editor-action-height);
    display: flex;
  }

  .editor-powers-left {
    flex: 1 1 auto;
    background: var(--app-background);
    min-width: 96px;
  }

  .editor-title {
    background: var(--editor-background);
    width: 96px;

    font-family: var(--cp-font-family);
    border-top: 3px solid transparent;
    white-space: nowrap;
    font-weight: 700;
    color: var(--cp-color-8);
    margin: 0;
    font-size: 1.1rem;
    line-height: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 9px 12px;

    margin-left: 1px;
    -webkit-transition: -webkit-transform 0.2s;
    transition: -webkit-transform 0.2s;
    transition: transform 0.2s;
    transition:
      transform 0.2s,
      -webkit-transform 0.2s;
    -webkit-transform-origin: left center;
    transform-origin: left center;
  }

  @container jstitle (max-width: 165px) {
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
    padding-right: 5px;
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
