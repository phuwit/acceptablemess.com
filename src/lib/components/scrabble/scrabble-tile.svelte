<script lang="ts">
  import { getScrabbleScore } from './scrabble-scores';
  import { cn } from '$lib/utils';

  export let character: string;

  function getRandomRotation() {
    const rotations = ['rotate-1', 'rotate-2', 'rotate-3', '-rotate-1', '-rotate-2', '-rotate-3']
    return rotations[Math.floor(Math.random() * rotations.length)];
  }
</script>

<div
  class={
    cn(
      'relative h-20 w-20 items-center justify-center rounded-md bg-yellow-100 text-4xl text-black transition-transform hover:scale-125 drop-shadow-md',
      getRandomRotation(),
      `hover:${getRandomRotation()}`
    )
  }
>
  <div class="absolute flex h-full w-full items-center justify-center text-3xl">
    {character}
  </div>
  <div class="absolute flex h-full w-full items-end justify-end px-2 py-1 text-xs">
    {getScrabbleScore(character)}
  </div>
</div>
