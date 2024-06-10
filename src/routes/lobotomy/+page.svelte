<script lang="ts">
  import SettingsForm from './settings-form.svelte';
  import type { PageData } from '../$types';
  export let data: any;
  import { browser } from '$app/environment';

  const URLS_LIST_URL = 'https://raw.githubusercontent.com/phuwit/web-resources/main/urls.json';
  let title: string = 'loading page...';
  let settingsHover: boolean = false;
  let randomUrlPromise = getRandomUrl();

  $: settingsHover, redirectToRandomUrl();

  async function getUrlsList() {
    const responsePromise = fetch(URLS_LIST_URL);
    title = 'loading url list...';
    const response = await responsePromise;
    const urlsList = await response.json();
    return await urlsList;
  }

  async function getRandomUrl() {
    const randomUrlList = await getUrlsList();
    title = 'randomizing...';
    const url = randomUrlList[Math.floor(Math.random()*randomUrlList.length)];
    // console.log(url);
    return url;
  }

  async function redirectToRandomUrl() {
    // console.log(browser, settingsHover);
    if (!browser || settingsHover) {
      title = 'pausing while hoving on settings'
      return;
    }
    const randomUrl = await randomUrlPromise;
    title = `taking you to ${randomUrl}...`;
    // window.location.href = randomUrl;
  }
</script>

<div class="flex flex-col items-center justify-center h-full w-full space-y-6">
  <div role="region" tabindex="-1" on:mouseenter={() => settingsHover = true} on:mouseleave={() => settingsHover = false} >
    <SettingsForm data={data.form} />
  </div>

  <h1 class="text-2xl font-semibold">{title}</h1>
</div>