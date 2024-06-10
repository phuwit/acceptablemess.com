<script lang="ts">
  import 'vidstack/bundle';
  // import SettingsForm from './settings-form.svelte';
  // export let data: any;
  import { browser } from '$app/environment';
  import Button from '$lib/components/ui/button/button.svelte';

  const URLS_LIST_URL = 'https://cdn.jsdelivr.net/gh/phuwit/web-resources@main/urls.json';
  let settingsHover: boolean = false;
  let randomUrl: string = '';
  let title: string = '';

  randomizeUrl();
  $: settingsHover, redirectToRandomUrl();

  $: if (!browser || settingsHover) {
      title = 'pausing while hoving on settings';
    } else {
      title = `taking you to ${randomUrl}...`;
    }

  $: console.log(`randomUrl ${randomUrl}`)

  async function getUrlsList(): Promise<string[]> {
    const responsePromise = fetch(URLS_LIST_URL);
    title = 'loading url list...';
    const response = await responsePromise;
    const urlsList = await response.json();
    return await urlsList;
  }

  async function getRandomUrl() {
    const randomUrlList = await getUrlsList();
    title = 'randomizing...';
    const url = randomUrlList[Math.floor(Math.random() * randomUrlList.length)];
    // const url = 'https://www.youtube.com/watch?v=roOSWTT0pYQ';
    // console.log(url);
    return url;
  }

  async function randomizeUrl() {
    randomUrl = await getRandomUrl();
    title = `taking you to ${randomUrl}...`;
  }

  async function redirectToRandomUrl() {
    // console.log(browser, settingsHover);
    // if (!browser || settingsHover) {
    //   title = 'pausing while hoving on settings';
    //   return;
    // }
    // window.location.href = randomUrl;
  }

  function isYoutube(url: string): boolean {
    const regexYoutube = /youtu(?:be\.com|\.be)/gim;
    // const regexYoutubeId = /youtu(?:be\.com\/watch\?v=|\.be\/)(?<id>\w{11})/gmi;
    return regexYoutube.test(url);
  }
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-6">
  <h1 class="text-2xl font-semibold">{title}</h1>

  <!-- <div
    role="region"
    tabindex="-1"
    on:mouseenter={() => (settingsHover = true)}
    on:mouseleave={() => (settingsHover = false)}
  >
    <SettingsForm data={data.form} />
  </div> -->

  {#if isYoutube(randomUrl)}
    <div>
      <Button on:click={() => randomizeUrl()}>randomize</Button>
      <Button variant="link" href={randomUrl}>open on youtube.com</Button>
    </div>

    <media-player src={randomUrl} playsInline>
      <media-provider></media-provider>
      <media-audio-layout></media-audio-layout>
      <media-video-layout></media-video-layout>
    </media-player>
  {/if}
</div>
