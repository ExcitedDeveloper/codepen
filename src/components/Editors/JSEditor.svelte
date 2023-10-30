<script>
</script>

<div id="js-editor" class="editor js-editor">
  <div class="editor-powers">
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
