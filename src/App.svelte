<script lang="ts">
  import Toolbar from "./components/Toolbar.svelte";
  import Editors from "./components/Editors/Editors.svelte";
  import Output from "./components/Output.svelte";
</script>

<main>
  <Toolbar />
  <div class="content">
    <Editors />
    <Output />
  </div>
</main>

<style>
  main {
    height: 100%;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 766px) {
    .content {
      flex-direction: row;
    }
  }

  @media (max-width: 486px) {
    .content {
      flex-direction: column;
    }
  }
</style>
