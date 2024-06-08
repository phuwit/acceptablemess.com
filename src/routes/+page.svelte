<!-- <svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head> -->

<script lang="ts">
  import ScrabbleTile from '$lib/components/scrabble/scrabble-tile.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-8">
  <div class="flex space-x-4">
    {#each 'acceptable'.split('') as character}
      <ScrabbleTile {character} randomRotation hoverEffect />
    {/each}
  </div>
  <div class="flex space-x-4">
    {#each 'mess'.split('') as character}
      <ScrabbleTile {character} randomRotation hoverEffect />
    {/each}
  </div>
  <div class="flex space-x-4">
    {#each 'dotcom'.split('') as character}
      <ScrabbleTile {character} randomRotation hoverEffect />
    {/each}
  </div>

  <h1 class="sr-only">acceptable mess dot com</h1>

  <h2 class="text-2xl font-bold">fail. spectacularly.</h2>
</div>

<style>
  :root {
    background-color: white;
  }
</style>
