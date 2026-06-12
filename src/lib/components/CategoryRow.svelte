<script lang="ts">
  import { matchesQuery, services, type Category } from '../data/services'
  import { i18n } from '../i18n.svelte'
  import Card from './Card.svelte'

  let {
    category,
    query,
    layout = 'row',
    onLaunchUrl,
  }: {
    category: Category
    query: string
    layout?: 'row' | 'grid'
    onLaunchUrl: () => void
  } = $props()

  const filtered = $derived(
    services.filter((s) => s.category === category && matchesQuery(s, query)),
  )

  const showCustomUrlCard = $derived(category === 'tools' && !query.trim())
</script>

{#if filtered.length > 0 || showCustomUrlCard}
  <section>
    <h2>{i18n.t(`cat.${category}`)}</h2>
    <div class={layout}>
      {#each filtered as service (service.id)}
        <Card {service} />
      {/each}
      {#if showCustomUrlCard}
        <button class="card custom" onclick={onLaunchUrl}>
          <img class="art" src="cards/chromium.jpg" alt="" loading="lazy" />
          <div class="scrim"></div>
          <div class="caption">
            <img class="logo" src="logos/chromium.png" alt="" loading="lazy" />
            <span>{i18n.t('tile.customUrl')}</span>
          </div>
        </button>
      {/if}
    </div>
  </section>
{/if}

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }

  h2 {
    margin: 0;
    font-size: 21px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  .row :global(.card) {
    width: clamp(220px, 16vw, 360px);
  }

  .row {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    padding: 6px 4px 14px;
    margin: -6px -4px 0;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    padding: 6px 4px;
    margin: -6px -4px;
  }

  /* custom-URL button mirrors Card.svelte's anchor styling */
  .card {
    position: relative;
    flex: 0 0 auto;
    width: clamp(220px, 16vw, 360px);
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-card);
    overflow: hidden;
    border: 1px dashed var(--border);
    background: var(--surface);
    scroll-snap-align: start;
    padding: 0;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .grid .card {
    width: auto;
  }

  .card:hover,
  .card:focus-visible {
    transform: scale(1.035);
    border-color: var(--accent);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.65);
    outline: none;
    z-index: 1;
  }

  .card:active {
    transform: scale(0.98);
  }

  .art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.55;
  }

  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(5, 8, 14, 0.88) 0%,
      rgba(5, 8, 14, 0.25) 38%,
      rgba(5, 8, 14, 0) 60%
    );
  }

  .caption {
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  .caption span {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
  }
</style>
