<script lang="ts">
  import CategoryTabs from './lib/components/CategoryTabs.svelte'
  import FullscreenPrompt from './lib/components/FullscreenPrompt.svelte'
  import InfoDialog from './lib/components/InfoDialog.svelte'
  import TileGrid from './lib/components/TileGrid.svelte'
  import TopBar from './lib/components/TopBar.svelte'
  import UrlLauncher from './lib/components/UrlLauncher.svelte'
  import type { Category } from './lib/data/services'
  import { i18n } from './lib/i18n.svelte'
  import { getUrlParam, isLikelyNotFullscreen } from './lib/tesla'

  let query = $state('')
  let category = $state<Category | 'all'>('all')

  // ?url=<encoded> opens the launcher pre-filled (deep-link support)
  const sharedUrl = getUrlParam('url')

  let showInfo = $state(false)
  let showUrlLauncher = $state(sharedUrl !== null)
  // skip the fullscreen nag when deep-linking straight into the URL launcher
  let showFullscreenPrompt = $state(sharedUrl === null && isLikelyNotFullscreen())

  $effect(() => {
    document.documentElement.lang = i18n.locale
  })
</script>

<main>
  <TopBar bind:query onShowInfo={() => (showInfo = true)} />
  <CategoryTabs bind:active={category} />
  <TileGrid {category} {query} onLaunchUrl={() => (showUrlLauncher = true)} />
</main>

<UrlLauncher bind:open={showUrlLauncher} initialUrl={sharedUrl ?? ''} />
<InfoDialog bind:open={showInfo} />
<FullscreenPrompt bind:open={showFullscreenPrompt} />

<style>
  main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px 28px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
