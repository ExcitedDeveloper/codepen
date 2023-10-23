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

<div {id} class={`editor ${classes}`}></div>

<style>
  .editor {
    border: 1px solid teal;
    background: rgb(29, 30, 34);
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
</style>
