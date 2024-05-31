<script lang="ts">
  import { getScrabbleScore } from './scrabble-scores';
  export let character: string;
</script>

<div
  class="relative h-20 w-20 items-center justify-center rounded-md bg-yellow-100 text-4xl text-black transition-transform hover:rotate-3 hover:scale-125"
>
  <div class="absolute flex h-full w-full items-center justify-center text-3xl">
    {character}
  </div>
  <div class="absolute flex h-full w-full items-end justify-end px-2 py-1 text-xs">
    {getScrabbleScore(character)}
  </div>
</div>
