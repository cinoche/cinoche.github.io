<script lang="ts">
  import { matchesQuery, services, type Category } from '../data/services'
  import { i18n } from '../i18n.svelte'
  import Tile from './Tile.svelte'

  let {
    category,
    query,
    onLaunchUrl,
  }: {
    category: Category | 'all'
    query: string
    onLaunchUrl: () => void
  } = $props()

  const filtered = $derived(
    services.filter(
      (s) =>
        (category === 'all' || s.category === category) && matchesQuery(s, query),
    ),
  )

  const showCustomUrlTile = $derived(category === 'all' || category === 'tools')
</script>

<div class="grid">
  {#each filtered as service (service.id)}
    <Tile {service} />
  {/each}
  {#if showCustomUrlTile && !query.trim()}
    <button class="tile custom" onclick={onLaunchUrl}>
      <img src="logos/chromium.png" alt="" loading="lazy" />
      <span>{i18n.t('tile.customUrl')}</span>
    </button>
  {/if}
</div>

{#if filtered.length === 0 && query.trim()}
  <p class="empty">{i18n.t('noResults')}</p>
{/if}

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  /* the custom-URL button mirrors Tile.svelte's anchor styling */
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 22px 14px 16px;
    min-height: 170px;
    background: var(--surface);
    border: 1px dashed var(--border);
    border-radius: var(--radius);
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .tile:hover,
  .tile:focus-visible {
    background: var(--surface-raised);
    border-color: var(--accent);
    transform: translateY(-3px);
    outline: none;
  }

  .tile:active {
    transform: scale(0.96);
  }

  .tile img {
    width: 110px;
    height: 78px;
    object-fit: contain;
  }

  .tile span {
    font-size: 15px;
    color: var(--muted);
  }

  .empty {
    text-align: center;
    color: var(--muted);
    font-size: 18px;
    margin: 48px 0;
  }
</style>
