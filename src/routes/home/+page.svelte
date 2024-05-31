<!-- <svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head> -->

<script lang="ts">
  import ScrabbleTile from '../../components/scrabble/scrabble-tile.svelte';
</script>

<div class="my-8 flex space-x-4">
  {#each 'Acceptable'.split('') as character}
    <ScrabbleTile {character} />
  {/each}
</div>
<div class="my-8 flex space-x-4">
  {#each 'Mess'.split('') as character}
    <ScrabbleTile {character} />
  {/each}
</div>
<div class="my-8 flex space-x-4">
  {#each 'dot com'.split('') as character}
    <ScrabbleTile {character} />
  {/each}
</div>

<style>
  :root {
    background-color: white;
  }
</style>
