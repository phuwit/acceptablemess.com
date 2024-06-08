<script>
  import 'inter-ui/inter-variable.css';
  import '../app.css';
  import Nav from '$lib/components/nav/nav.svelte';
  import { ModeWatcher } from 'mode-watcher';
</script>

<div class="h-dvh w-full">
  <ModeWatcher />

  <header>
    <Nav class="h-14" />
  </header>

  <main class="mx-auto h-[calc(100%-3.5rem)] max-w-screen-lg">
    <slot />
  </main>

  <!-- <footer>
    <p>footer</p>
  </footer> -->
</div>

<style>
  :root {
    font-family: Inter, sans-serif;
    font-feature-settings:
      'liga' 1,
      'calt' 1; /* fix for Chrome */
  }

  @supports (font-variation-settings: normal) {
    :root {
      font-family: InterVariable, sans-serif;
    }
  }
</style>
