<script>
</script>

<div id="css-editor" class="editor css-editor">
  <div class="editor-powers">
    <h2 class="editor-title">
      <svg viewBox="0 0 15 15" class="file-type-icon" id="icon-file-css">
        <rect fill="#0EBEFF" width="15" height="15" rx="4"></rect><path
          d="M8 8.366l1.845 1.065a.507.507 0 0 0 .686-.181.507.507 0 0 0-.186-.685L8.5 7.5l1.845-1.065a.507.507 0 0 0 .186-.685.507.507 0 0 0-.686-.181L8 6.634v-2.13A.507.507 0 0 0 7.5 4c-.268 0-.5.225-.5.503v2.131L5.155 5.569a.507.507 0 0 0-.686.181.507.507 0 0 0 .186.685L6.5 7.5 4.655 8.565a.507.507 0 0 0-.186.685c.134.232.445.32.686.181L7 8.366v2.13c0 .271.224.504.5.504.268 0 .5-.225.5-.503V8.366z"
          fill="#282828"
        ></path>
      </svg>
      <span>CSS</span>
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

  .css-editor {
    grid-area: csseditor;
  }

  .editor-powers {
    container: csstitle / inline-size;
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
