<script lang="ts">
  import { get } from "svelte/store";
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
    overflow-y: auto;
  }

  .output iframe {
    height: auto;
  }

  @media (max-width: 766px) {
    .output {
      flex: 3;
    }
  }

  @media (max-width: 486px) {
    .output {
      flex: 2;
    }
  }
</style>
