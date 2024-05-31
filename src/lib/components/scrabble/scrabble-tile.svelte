<script lang="ts">
  import { getScrabbleScore } from './scrabble-scores';
  import { cn } from '$lib/utils';
  import type { ClassValue } from 'clsx';

  export let character: string;

  function getRandomRotation(): ClassValue {
    const rotations = ['rotate-2', 'rotate-3', 'rotate-0', '-rotate-2', '-rotate-3'];
    return rotations[Math.floor(Math.random() * rotations.length)];
  }
</script>

<div
  class={cn(
    'relative h-20 w-20 items-center justify-center rounded-md bg-yellow-100 text-4xl text-black drop-shadow-md transition-transform hover:scale-125',
    getRandomRotation(),
    `hover:${getRandomRotation()}`
  )}
>
  <div class="absolute flex h-full w-full items-center justify-center text-3xl">
    {character}
  </div>
  <div class="absolute flex h-full w-full items-end justify-end px-2 py-1 text-xs">
    {getScrabbleScore(character)}
  </div>
</div>
