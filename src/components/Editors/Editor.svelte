<script>
  /**
   * @type {string}
   */
  export let id;
  /**
   * @type {string}
   */
  export let classes;
</script>

<div {id} class={`editor ${classes}`}>
  <div class="editor-powers">
    <div class="editor-title"></div>
    <div class="editor-actions"></div>
  </div>
  <div class="editor-code"></div>
</div>

<style>
  .editor {
    border: 1px solid teal;
    --editor-action-height: 36px;
    --editor-background: rgb(29, 30, 34);
    background: var(--editor-background);
  }

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

  .editor-title {
    background: var(--editor-background);
    width: 96px;
  }

  .editor-actions {
    background: var(--app-background);
    flex: 1;
  }

  .editor-code {
    height: calc(100% - var(--editor-action-height));
  }
</style>
