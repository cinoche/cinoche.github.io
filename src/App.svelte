<script lang="ts">
  import Background from './lib/components/Background.svelte'
  import CategoryRow from './lib/components/CategoryRow.svelte'
  import CategoryTabs from './lib/components/CategoryTabs.svelte'
  import Hero from './lib/components/Hero.svelte'
  import InfoDialog from './lib/components/InfoDialog.svelte'
  import TopBar from './lib/components/TopBar.svelte'
  import UrlLauncher from './lib/components/UrlLauncher.svelte'
  import { categories, matchesQuery, services, type Category } from './lib/data/services'
  import { i18n } from './lib/i18n.svelte'
  import { getUrlParam } from './lib/tesla'

  let query = $state('')
  let category = $state<Category | 'all'>('all')

  // ?url=<encoded> opens the launcher pre-filled (deep-link support)
  const sharedUrl = getUrlParam('url')

  let showInfo = $state(false)
  let showUrlLauncher = $state(sharedUrl !== null)
  const visibleCategories = $derived(
    category === 'all' ? categories : [category],
  )

  const anyMatch = $derived(
    services.some(
      (s) =>
        (category === 'all' || s.category === category) && matchesQuery(s, query),
    ),
  )

  $effect(() => {
    document.documentElement.lang = i18n.locale
  })
</script>

<Background />

<main>
  <TopBar bind:query onShowInfo={() => (showInfo = true)} />
  <CategoryTabs bind:active={category} />

  {#if category === 'all' && !query.trim()}
    <Hero />
  {/if}

  {#each visibleCategories as cat (cat)}
    <CategoryRow
      category={cat}
      {query}
      layout={category === 'all' ? 'row' : 'grid'}
      onLaunchUrl={() => (showUrlLauncher = true)}
    />
  {/each}

  {#if !anyMatch && query.trim()}
    <p class="empty">{i18n.t('noResults')}</p>
  {/if}
</main>

<UrlLauncher bind:open={showUrlLauncher} initialUrl={sharedUrl ?? ''} />
<InfoDialog bind:open={showInfo} />

<style>
  main {
    max-width: 2200px;
    margin: 0 auto;
    padding: 24px clamp(20px, 2.5vw, 48px) 48px;
    display: flex;
    flex-direction: column;
    gap: 26px;
  }

  .empty {
    text-align: center;
    color: var(--muted);
    font-size: 18px;
    margin: 48px 0;
  }
</style>
