<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { OpenState, toggleOpenState } from "../../utils/openState";
  import type { NullableHTMLElement } from "../../utils/types";
  import * as monaco from "monaco-editor";
  import { getWorker } from "./common";

  export let editorType: "html" | "css" | "js";
  export let language: string;
  export let store: any;
  export let openStore: any;
  export let collapseFunction: (content: NullableHTMLElement, ...editors: NullableHTMLElement[]) => void;
  export let otherEditors: string[];

  let editorElement: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let model: monaco.editor.ITextModel;

  let content: NullableHTMLElement;
  let editorElements: NullableHTMLElement[] = [];

  const editorConfig = {
    html: {
      title: "HTML",
      gridArea: "htmleditor",
      containerName: "htmltitle"
    },
    css: {
      title: "CSS",
      gridArea: "csseditor",
      containerName: "csstitle"
    },
    js: {
      title: "JS",
      gridArea: "jseditor",
      containerName: "jstitle"
    }
  };

  const config = editorConfig[editorType];

  function loadCode(code: string, language: string) {
    model = monaco.editor.createModel(code, language);
    editor.setModel(model);
  }

  onMount(async () => {
    content = document.getElementById("content");
    
    // Get references to other editor elements
    otherEditors.forEach(editorId => {
      const element = document.getElementById(editorId);
      if (element) {
        editorElements.push(element);
      }
    });

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
      store.set(editor.getValue());
    });

    loadCode("", language);
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  });

  const handleClick = () => {
    openStore.update(() => toggleOpenState(get(openStore)));

    if (get(openStore) === OpenState.Closed) {
      collapseFunction(content, ...editorElements);
    }
  };
</script>

<div id="{editorType}-editor" class="editor {editorType}-editor">
  <div class="editor-powers">
    <div class="editor-powers-left">
      <h2 class="editor-title">
        {#if editorType === "html"}
          <svg viewBox="0 0 15 15" class="file-type-icon" id="icon-file-html">
            <rect fill="#FF3C41" width="15" height="15" rx="4"></rect>
            <path
              d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
              fill="#28282B"
            ></path>
          </svg>
        {:else if editorType === "css"}
          <svg viewBox="0 0 15 15" class="file-type-icon" id="icon-file-css">
            <rect fill="#FF3C41" width="15" height="15" rx="4"></rect>
            <path
              d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
              fill="#28282B"
            ></path>
          </svg>
        {:else if editorType === "js"}
          <svg viewBox="0 0 15 15" class="file-type-icon" id="icon-file-js">
            <rect fill="#FF3C41" width="15" height="15" rx="4"></rect>
            <path
              d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
              fill="#28282B"
            ></path>
          </svg>
        {/if}
        <span>{config.title}</span>
      </h2>
    </div>
    <div class="editor-actions">
      <button
        type="button"
        class="editor-collapse-button"
        on:click={handleClick}
        ><i class="fas fa-compress-alt fa-lg"></i></button
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

  .css-editor {
    grid-area: csseditor;
  }

  .js-editor {
    grid-area: jseditor;
  }

  .editor-powers {
    height: var(--editor-action-height);
    display: flex;
  }

  .html-editor .editor-powers {
    container: htmltitle / inline-size;
  }

  .css-editor .editor-powers {
    container: csstitle / inline-size;
  }

  .js-editor .editor-powers {
    container: jstitle / inline-size;
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

  @container csstitle (max-width: 165px) {
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
  }

  .js-editor .editor-actions {
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