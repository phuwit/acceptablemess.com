<script>
  import 'inter-ui/inter-variable.css';
  import '../app.css';
  import Nav from '$lib/components/nav/nav.svelte';
</script>

<div class="h-screen w-full">
  <header>
    <Nav />
  </header>

  <main class="mx-auto max-w-screen-lg">
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
