<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { OpenState, toggleOpenState } from "../../utils/openState";
  import { collapseJSEditor } from "../../utils/expandCollapse";
  import { JSEditorOpenStore } from "../../stores";
  import type { NullableHTMLElement } from "../../utils/types";
  import Editor from "./Editor.svelte";

  let content: NullableHTMLElement;
  let htmlEditor: NullableHTMLElement;
  let jsEditor: NullableHTMLElement;

  onMount(() => {
    content = document.getElementById("content");
    htmlEditor = document.getElementById("html-editor");
    jsEditor = document.getElementById("js-editor");
  });

  const handleClick = () => {
    JSEditorOpenStore.update(() => toggleOpenState(get(JSEditorOpenStore)));

    if (get(JSEditorOpenStore) === OpenState.Closed) {
      collapseJSEditor(content, htmlEditor, jsEditor);
    }
  };
</script>

<div id="js-editor" class="editor js-editor">
  <div class="editor-powers">
    <div class="editor-powers-left">
      <h2 class="editor-title">
        <svg viewBox="0 0 15 15" class="file-type-icon" id="icon-file-js">
          <rect fill="#FCD000" width="15" height="15" rx="4"></rect>
          <path
            d="M6.554 3.705c0 .267-.19.496-.452.543-1.2.217-2.12 1.61-2.12 3.275 0 1.665.92 3.057 2.12 3.274a.554.554 0 0 1-.205 1.087c-1.733-.322-3.022-2.175-3.022-4.361 0-2.187 1.289-4.04 3.022-4.362a.554.554 0 0 1 .657.544zm1.892 0c0-.347.316-.607.657-.544 1.733.322 3.022 2.175 3.022 4.362 0 2.186-1.289 4.04-3.022 4.361a.554.554 0 0 1-.205-1.087c1.2-.217 2.12-1.61 2.12-3.274 0-1.665-.92-3.058-2.12-3.275a.551.551 0 0 1-.452-.543z"
            fill="#282828"
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
  <Editor changeHandler={(value) => console.log(`JSEditor changed`, value)} />
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
  }

  .editor-actions button {
    float: right;
    height: 100%;
  }

  .editor-code {
    height: calc(100% - var(--editor-action-height));
  }
</style>
