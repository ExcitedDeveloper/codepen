<script>
</script>

<div id="html-editor" class="editor html-editor">
  <div class="editor-powers">
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

  .editor-powers {
    height: var(--editor-action-height);
    display: flex;
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
  }

  .file-type-icon {
    width: 17px;
    height: 17px;
    -webkit-margin-end: 0.4rem;
    margin-inline-end: 0.4rem;
  }

  .editor-actions {
    background: var(--app-background);
    flex: 1;
  }

  .editor-code {
    height: calc(100% - var(--editor-action-height));
  }
</style>
