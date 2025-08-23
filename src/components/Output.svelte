<script lang="ts">
  import { SourceDocStore } from "../stores";
  import { onMount } from "svelte";

  let srcdoc: string;

  onMount(() => {
    SourceDocStore.subscribe((d: string) => {
      srcdoc = d;
    });
  });
</script>

<div class="output">
  <iframe
    {srcdoc}
    title="output"
    sandbox="allow-scripts"
    frameborder="0"
    width="100%"
    height="100%"
  />
</div>

<style>
  .output {
    height: 100%;
    width: 100%;
    background: white;
    grid-area: output;
    overflow: hidden;
  }

  .output iframe {
    height: 100%;
  }
</style>
