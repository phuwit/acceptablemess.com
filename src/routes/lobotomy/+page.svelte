<script lang="ts">
  // import SettingsForm from './settings-form.svelte';
  // export let data: any;
  import 'vidstack/bundle';
  import { browser } from '$app/environment';
  import Button from '$lib/components/ui/button/button.svelte';
  import { onMount } from 'svelte';
  import { get, writable, type Writable } from 'svelte/store';
  import psl from 'psl';
  import { Hotel } from 'lucide-svelte';

  let settingsHover: boolean = false;
  let randomUrl: string = 'https://youtu.be/S6wOPFrAWpw';
  let title: string = '';
  let showVideoPlayer: boolean = false;

  const sources = [
    'https://raw.githubusercontent.com/phuwit/acceptablemess.com-resources/main/lobotomy/videos.json',
  ];
  const cobaltServicesConfig =
    'https://raw.githubusercontent.com/imputnet/cobalt/current/src/modules/processing/servicesConfig.json';

  const urlsList: Writable<string[]> = writable([]);
  const cobaltCompatibleServices: Writable<any> = writable();

  onMount(async () => {
    await loadSources(sources);
    await loadCobaltCompatibleServices();
    randomizeUrl();
  });

  $: settingsHover, redirectToRandomUrl();

  $: if (!browser) {
    title = 'loading...';
  }

  $: if (settingsHover) {
    title = 'pausing while hovering on settings';
  } else {
    title = `taking you to ${randomUrl} ->`;
  }

  function loadSources(urls: string[]) {
    return Promise.all(
      urls.map(async (url) => {
        const responsePromise = fetch(url);
        const response = await responsePromise;
        const responseJson = await response.json();
        urlsList.update((list) => [...new Set([...list, ...responseJson])]);
      }),
    );
  }

  async function getRandomUrl() {
    title = 'randomizing...';
    const list = get(urlsList);
    const url = list[Math.floor(Math.random() * list.length)];
    showVideoPlayer = !!isCobaltCompatible(url);
    return url;
  }

  async function randomizeUrl() {
    randomUrl = await getRandomUrl();
    title = `taking you to ${randomUrl} ->`;
  }

  async function redirectToRandomUrl() {
    // console.log(browser, settingsHover);
    // if (!browser || settingsHover) {
    //   title = 'pausing while hoving on settings';
    //   return;
    // }
    // window.location.href = randomUrl;
  }

  async function loadCobaltCompatibleServices() {
    const responsePromise = fetch(cobaltServicesConfig);
    const response = await responsePromise;
    cobaltCompatibleServices.set(await response.json());
    return responsePromise;
  }

  function isYoutube(url: string): boolean {
    const regexYoutube = /youtu(?:be\.com|\.be)/gim;
    // const regexYoutubeId = /youtu(?:be\.com\/watch\?v=|\.be\/)(?<id>\w{11})/gmi;
    return regexYoutube.test(url);
  }

  function isCobaltCompatible(url: string) {
    try {
      const host = psl.parse(new URL(url).hostname);
      if (host.error) return;

      const service = get(cobaltCompatibleServices).config[host.sld || 0];
      if (!service) return;
      if ((service.tld ?? 'com') !== host.tld) return;

      const anySubdomainAllowed = service.subdomains === '*';
      const validSubdomain = [
        null,
        'www',
        ...(service.subdomains ?? []),
      ].includes(host.subdomain);
      if (!validSubdomain && !anySubdomainAllowed) return;

      return host.sld;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  cobaltCompatibleServices.subscribe((services) => {
    try {
      const host = psl.parse(new URL(randomUrl).hostname);
      if (host.error) return;

      const service = services.config[host.sld || ''];
      if (!service) return;
      if ((service.tld ?? 'com') !== host.tld) return;

      const anySubdomainAllowed = service.subdomains === '*';
      const validSubdomain = [
        null,
        'www',
        ...(service.subdomains ?? []),
      ].includes(host.subdomain);
      if (!validSubdomain && !anySubdomainAllowed) return;

      return host.sld;
    } catch (error) {
      console.error(error);
      return null;
    }
  });
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-6">
  <div class="text-center">
    <h2 class="text-lg">curated brainrot.</h2>
    <h1 class="text-2xl font-semibold">{title}</h1>
  </div>

  <!-- <div
    role="region"
    tabindex="-1"
    on:mouseenter={() => (settingsHover = true)}
    on:mouseleave={() => (settingsHover = false)}
  >
    <SettingsForm data={data.form} />
  </div> -->

  {#if isYoutube(randomUrl) || isCobaltCompatible(randomUrl)}
    <div>
      <Button on:click={() => randomizeUrl()}>randomize</Button>
      <Button variant="link" href={randomUrl}>open on youtube.com</Button>
    </div>

    <div class="flex w-full justify-center">
      <media-player
        class="w-5/6"
        src={randomUrl}
        playsInline
        storage="vidstack-preferences"
        load="eager"
        autoPlay
        on:ended={() => randomizeUrl()}
      >
        <media-provider></media-provider>
        <media-audio-layout></media-audio-layout>
        <media-video-layout></media-video-layout>
      </media-player>
    </div>
  {/if}
</div>
